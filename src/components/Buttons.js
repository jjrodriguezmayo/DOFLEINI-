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
import { LoadingButton } from '@mui/lab';


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

  let [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleClickOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setError('');}
  const [error, setError] = useState('');

  const handleDelete = () =>{
    try{
    axios.delete('http://localhost:5000/author/delete/'+props.id).then((res) =>{
    handleCloseDelete()
    props.loadData(0,'','')

    })}
    catch (e) {
      setError(e.message);
    }
  }

  const handleFormSubmit = async (values) => {
    setLoading(true);
    const formData = Object.keys(values).reduce((acc, key) => {
      if (values[key] !== initialValues[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {});
    try{
      await axios.patch('http://localhost:5000/author/update/'+props.id, formData)
      handleCloseEdit();
      props.loadData(0,'','');
      setLoading(false);}
      
      catch (e) {
        setLoading(false);
      }
  };
   
  const initialValues = {
    firstName: props.firstName,
    lastName: props.lastName,
    language:props.language,
    //remember: true,
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name required'),
    lastName: Yup.string().required('Last Name(s) required'),
    language: Yup.string().required('Native Language required')
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
        Edit Author
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
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit,dirty, isSubmitting  }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      type="string"
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.firstName}
                      onChange={handleChange}
                      helperText={touched.firstName && errors.firstName}
                      error={Boolean(errors.firstName && touched.firstName)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      name="lastName"
                      type="string"
                      label="Last Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.lastName}
                      onChange={handleChange}
                      helperText={touched.lastName && errors.lastName}
                      error={Boolean(errors.lastName && touched.lastName)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      name="language"
                      type="string"
                      label="Language"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.language}
                      onChange={handleChange}
                      helperText={touched.language && errors.language}
                      error={Boolean(errors.language && touched.language)}
                      sx={{ mb: 3 }}
                    />
                     <MuiDialogActions sx={{padding:0}}>
                    <Button  color="primary"  variant='contained'onClick={handleCloseEdit}>
                      Cancel
                    </Button>
                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading || isSubmitting}
                      variant="contained"
                      disabled={!dirty || isSubmitting}
                      sx={{ my: 2 }}
                    >
                      Save
                    </LoadingButton>
                    </MuiDialogActions>
                  </form>
                )}
              </Formik>

        </MuiDialogContent>
    
      </Dialog> 

      <Dialog onClose={handleCloseDelete} aria-labelledby="customized-dialog-title" open={openDelete}>
    <DialogTitle id="customized-dialog-title" onClose={handleCloseDelete}>
    Delete Author
    </DialogTitle>

    <DialogContent dividers>
    {error ? error : `Are you sure you want to delete the author ${props.firstName} ${props.lastName}?`}
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