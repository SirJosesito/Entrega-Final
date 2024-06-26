import React from 'react';
import './App.css';
import './css/tabla.css';

import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom';

import BarraDeBusqueda from './secciones/barra-de-busqueda';
import Portada from './secciones/portada';
import Contacto from './secciones/contacto';
import QuienesSomos from './secciones/quienes-somos';
import Administracion from './secciones/administracion';
import Footer from './secciones/footer';
import BarraDeNavegacion from './secciones/barra-de-navegacion';

function App() {


  return (
    <Router>
      <BarraDeNavegacion/>
      <BarraDeBusqueda/>
      <main>
        <Routes>
          <Route path="/" element={<Portada/>}/>
          <Route path="/contacto" element={<Contacto/>}/>
          <Route path="/quienes-somos" element={<QuienesSomos/>}/>
          <Route path="/tipoAlojamiento" element={<Administracion/>}/>
        </Routes>
      </main>
      <Footer/>
    </Router>
  )
}

export default App
