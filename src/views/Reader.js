import { Box, styled } from "@mui/material";
import { Card } from '@mui/material';
import {
  Button
} from "@mui/material";

import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import ReaderTable from "./ReaderTable";

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
  const Reader = () => {

    //const fuentes = fuentesList.map(el => {return { id: el.id, name: el.name, path: el.path, url: el.url, active: el.is_active}})
    //console.log(fuentes)
     
      /*let {user} = useAuth();
     
      const permited=(resourceName)=>{
        return user.is_active && (user.is_superuser || (user.resources.includes('resource.'+resourceName)));
       }*/
    return (
      <Container >
        <CardRoot elevation={6}>
        <Box sx={{display: 'flex',flexDirection: 'row',justifyContent: 'flex-end', margin: 0}}>
            <Tooltip title="Add Reader">
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add Reader
            </Button>
            </Tooltip>
        </Box>
        <Container sx={{display: 'flex',flexDirection: 'row',justifyContent: 'flex-end', margin: 0, marginBottom: 0}}>
        <ReaderTable/>
        </Container>
      </CardRoot>
      </Container>
    );
  };
  
  export default Reader;