import React from 'react'
import {
    IconButton,
    TableCell,
    styled,
    Button
  } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';


const DialogTitleRoot = styled(MuiDialogTitle)(({ theme }) => ({
    margin: 0,
    padding: theme.spacing(2),
    '& .closeButton': {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  }));
  
  const DialogTitle = (props) => {
    const { children, onClose } = props;
    return (
      <DialogTitleRoot disableTypography>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="Close" className="closeButton" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitleRoot>
    );
  };
  
  const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
    '&.root': { padding: theme.spacing(2) },
  }));
  
  const DialogActions = styled(MuiDialogActions)(({ theme }) => ({
    '&.root': { margin: 0, padding: theme.spacing(1) },
  }));
  

const Buttons=(props)=> {
    //console.log(props)

  const navigate = useNavigate();
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = () => setOpenEdit(true);

  const handleCloseEdit = () => setOpenEdit(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleClickOpenDelete = () => setOpenDelete(true);

  const handleCloseDelete = () => setOpenDelete(false);
  const handleDelete = () =>{
    // ejemplo de peticion axios.delete(Services.sources.sourcesService+'/'+props.id).then((res) 
    handleCloseDelete()
    // ejemplo de recargar los datos props.reloadData()

  }

  const handleFormSubmit = async (values) => {
   
    ///Ejemplo de submit
    // setLoading(true);
   /* const formData = {name:values.nombre,url:values.url, description: values.description}
    try{
      await axios.put(Services.sources.sourcesService+'/'+props.id, formData)
      handleCloseEditar();
      props.reloadData()
      setLoading(false);}
      
      catch (e) {
        setLoading(false);
      }*/
  };
  
   
  const initialValues = {
    nombre: props.name,
    description: props.description,
    url:props.url,
    //remember: true,
  };
  const validationSchema = Yup.object().shape({
    url: Yup.string().url('Ingrese una URL válida').required('Escriba la URL'),
    nombre: Yup.string().required('Escriba el nombre'),
    description: Yup.string()
    .min(10, '¡La descripción debe tener mas de 255 caracteres!')
  });
  

return (
  <>
    <TableCell align="right" sx={{ 'display': 'flex','flex-direction': 'row','flex-wrap': 'nowrap'}}>
     <Tooltip title="Edit">
      <IconButton color="primary"  onClick={handleClickOpenEdit}  className="button" aria-label="visibility">
      <EditIcon/>
    </IconButton>
    </Tooltip>
    <Tooltip title="Delete">
      <IconButton color="primary"  onClick={handleClickOpenDelete}  className="button" aria-label="visibility">
      <DeleteIcon/>
    </IconButton>
    </Tooltip>
  </TableCell>

  <Dialog  aria-labelledby="customized-dialog-title" open={openEdit}>
        <MuiDialogTitle id="customized-dialog-title" onClose={handleCloseEdit}  sx={{display:'flex',justifyContent: 'space-between',alignItems: 'center'}}>
        Edit Sample
        <IconButton aria-label="Close" className="closeButton" onClick={handleCloseEdit}>
          <CloseIcon />
        </IconButton>
        </MuiDialogTitle>
    
        <MuiDialogContent sx={{display: 'flex',flexDirection: 'column', justifyContent: 'center',width:'500px', padding:'10px 24px'}} dividers>
        <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      type="string"
                      name="nombre"
                      label="Nombre"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.nombre}
                      onChange={handleChange}
                      helperText={touched.nombre && errors.nombre}
                      error={Boolean(errors.nombre && touched.nombre)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      name="description"
                      type="string"
                      label="Descripción"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.description}
                      onChange={handleChange}
                      helperText={touched.description && errors.description}
                      error={Boolean(errors.description && touched.description)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      name="url"
                      type="string"
                      label="URL"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.url}
                      onChange={handleChange}
                      helperText={touched.url && errors.url}
                      error={Boolean(errors.url && touched.url)}
                      sx={{ mb: 3 }}
                    />
                     <MuiDialogActions sx={{padding:0}}>
                    <Button  color="primary"  variant='contained'onClick={handleCloseEdit}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Save
                    </Button>
                    </MuiDialogActions>
                  </form>
                )}
              </Formik>

        </MuiDialogContent>
    
      </Dialog> 

      <Dialog onClose={handleCloseDelete} aria-labelledby="customized-dialog-title" open={openDelete}>
    <DialogTitle id="customized-dialog-title" onClose={handleCloseDelete}>
    Delete sample
    </DialogTitle>

    <DialogContent dividers>
    Are you sure you want to delete the contents of "Sample"?
    </DialogContent>

    <DialogActions>
      <Button onClick={handleCloseDelete} variant="contained" color="primary">
        Cancel
      </Button>
      <Button onClick={handleDelete} variant="contained" color="primary">
        Accept
      </Button>
    </DialogActions>
  </Dialog>


  </>
  );
}



export default Buttons