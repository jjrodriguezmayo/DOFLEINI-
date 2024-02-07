import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Author from './views/Author';
import Books from './views/Books';
import Genre from './views/Genre';
import Loan from './views/Loan';
import Reader from './views/Reader';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import "./App.css"

function App() {
  const drawerWidth = 240; 

  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }, // Ajusta el margen izquierdo para el ancho del drawer
        }}
      >
        {/* Espacio debajo de la barra de herramientas para evitar que el contenido se oculte detrás del AppBar */}
        <Toolbar />
        <Routes>
          <Route path="/Author" element={<Author />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/Genre" element={<Genre />} />
          <Route path="/Loan" element={<Loan />} />
          <Route path="/Reader" element={<Reader />} />
          
          {/* Configura las rutas para los demás módulos aquí */}
        </Routes>
      </Box>

    </Router>
  );
}

export default App;
