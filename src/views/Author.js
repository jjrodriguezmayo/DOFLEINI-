import { Box, styled } from "@mui/material";
import { Card } from '@mui/material';
import {
  Button
} from "@mui/material";

import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import AuthorTable from "./AuthorTable";

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
  const Author = () => {

    return (
      <Container >
        <CardRoot elevation={6}>
        <Box sx={{display: 'flex',flexDirection: 'row',justifyContent: 'flex-end', margin: 0}}>
        <Tooltip title="Add Author">
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add Author
            </Button>
            </Tooltip>
        </Box>
        <Container sx={{display: 'flex',flexDirection: 'row',justifyContent: 'flex-end', margin: 0, marginBottom: 0}}>
        <AuthorTable></AuthorTable>
        </Container>
      </CardRoot>
      </Container>
    );
  };
  
  export default Author;