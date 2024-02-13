import { Box, styled } from "@mui/material";
import { Card,IconButton } from '@mui/material';
import {
  Button
} from "@mui/material";

import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import AuthorTable from "./AuthorTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';

const CardRoot = styled(Card)(() => ({
    height: '100%',
    padding: '20px 24px',
  }));

  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

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
  
  const Author = () => {
    let [authorList, setAuthorList] = useState([]);
    let [total, setTotal] = useState();
    let [page, setPage] = useState(1);
    let [limit, setLimit] = useState(5);
    let [search, setSearch] = useState('');
    let [loading, setLoading] = useState(false);
    
    ///////////////dialog
    const [openAdd, setOpenAdd] = useState(false);
    const handleClickOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);


    function loadData(page,limit,search){
      
   
      axios.get('http://localhost:5000/author/list?search='+search+'&page='+page+'&limit='+limit).then((res) =>{
        setAuthorList(res.data.data);
        setTotal(res.data.total)
      })
    }
  
      useEffect(()=>{
        /*const form={
          "title":"Test Book",
          "resume":"sample Bookfor test",
          "genre":{"_id":"65cbe1ba32ca8706deb8b02f", "name":"Test Genre"},
          "author":{"_id":"65cbcff032ca8706deb8afe6", "firstName":"RomiTest","lastName":"Test"},
          "canBorrow":true
        }
        axios.post('http://localhost:5000/book/create',form).then((res) =>{
        console.log(res)
      })*/
        loadData(page,limit,search);
      },[]);


    //////////////form
    const handleFormSubmit = async (values) => {
      setLoading(true);
     const formData = {firstName:values.name,lastName:values.lastName, language: values.language}
      try{
        await axios.post('http://localhost:5000/author/create', formData)
        handleCloseAdd();
        loadData(page,limit,search);
        setLoading(false);}
        
        catch (e) {
          setLoading(false);
        }
    };
    
     
    const initialValues = {
      name: '',
      lastName: '',
      language:'',
      //remember: true,
    };
    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Name required'),
      lastName: Yup.string().required('Last Name(s) required'),
      language: Yup.string().required('Native Language required')
    });
    


    return (
    <>
      <Container >
        <CardRoot elevation={6}>
        <Box sx={{display: 'flex',flexDirection: 'row',justifyContent: 'flex-end', margin: 0}}>
        <Tooltip title="Add Author">
            <Button variant="contained" color="primary" onClick={handleClickOpenAdd} loadData={loadData} 
            startIcon={<AddIcon />}>
            Add Author
            </Button>
            </Tooltip>
        </Box>
        <Container sx={{display: 'flex',flexDirection: 'row',justifyContent: 'flex-end', margin: 0, marginBottom: 0}}>
        <AuthorTable authorList={authorList} loadData={loadData} />
        </Container>
      </CardRoot>
      </Container>

      <Dialog  aria-labelledby="customized-dialog-title" open={openAdd}>
      <MuiDialogTitle id="customized-dialog-title" onClose={handleCloseAdd}  sx={{display:'flex',justifyContent: 'space-between',alignItems: 'center'}}>
      Add Author
      <IconButton aria-label="Close" className="closeButton" onClick={handleCloseAdd}>
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
                    name="name"
                    label="Name"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.name}
                    onChange={handleChange}
                    helperText={touched.name && errors.name}
                    error={Boolean(errors.name && touched.name)}
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
                  <Button  color="primary"  variant='contained'onClick={handleCloseAdd}>
                    Cancel
                  </Button>
                  <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Add
                    </LoadingButton>
                  </MuiDialogActions>
                </form>
              )}
            </Formik>

      </MuiDialogContent>
  
    </Dialog> 
    </>
    );
  };
  
  export default Author;