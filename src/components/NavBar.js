import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DrawIcon from '@mui/icons-material/Draw';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';
// Importar más iconos según sea necesario

const drawerWidth = 240;

function NavBar() {
  return (
    <Drawer
    sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#263238', // Color de fondo de la barra de navegación
          color: '#FFF', // Color del texto
        },
      }}
      variant="permanent"
      anchor="left"
    >
       <Toolbar>
       <img
        src={`${process.env.PUBLIC_URL}/Dofleini-logo.png`}
        alt="Logo de la empresa"
        style={{ width: '80%', marginTop: '16px' }}
      />
        {/*<Typography variant="h6" noWrap component="div" sx={{ color: '#FFF' }}>
        DOFLEINI
    </Typography>*/}
      </Toolbar>
      <List>
        {/* Elemento de Lista para Módulo 1 */}
        <ListItem button component="a" href="/Author" sx={{ '&:hover': { backgroundColor: '#37474f' } }}>
          <ListItemIcon>
          <DrawIcon sx={{ color: '#FFF' }} />
          </ListItemIcon>
          <ListItemText primary="Author" />
        </ListItem>
        <ListItem button component="a" href="/Books" sx={{ '&:hover': { backgroundColor: '#37474f' } }}>
          <ListItemIcon>
          <ImportContactsIcon sx={{ color: '#FFF' }} />
          </ListItemIcon>
          <ListItemText primary="Books" />
        </ListItem>
        <ListItem button component="a" href="/Genre" sx={{ '&:hover': { backgroundColor: '#37474f' } }}>
          <ListItemIcon>
          <EventNoteIcon sx={{ color: '#FFF' }} />
          </ListItemIcon>
          <ListItemText primary="Genre" />
        </ListItem>
        <ListItem button component="a" href="/Loan" sx={{ '&:hover': { backgroundColor: '#37474f' } }}>
          <ListItemIcon>
          <CreditScoreIcon sx={{ color: '#FFF' }} />
          </ListItemIcon>
          <ListItemText primary="Loan" />
        </ListItem>
        <ListItem button component="a" href="/Reader" sx={{ '&:hover': { backgroundColor: '#37474f' } }}>
          <ListItemIcon>
          <PersonIcon sx={{ color: '#FFF' }} />
          </ListItemIcon>
          <ListItemText primary="Reader" />
        </ListItem>
        {/* Repite para otros módulos, cambiando href y texto según corresponda */}
      </List>
    </Drawer>
  );
}

export default NavBar;
