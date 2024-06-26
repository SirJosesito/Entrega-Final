import React from 'react';
import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom';
import '../css/footer.css'

 function Footer() {
  return (
    <>
    <div className='separador'></div>
    <footer>
        <div className="botonera-footer">
            <Link to="/contacto">Contacto</Link>
            <Link to="/quienes-somos">Quienes somos</Link>
            <Link to="/tipoAlojamiento">Administracion</Link>
        </div>
        <p className="copyright"> &copy; 2024 IDW - Nelida Vera | José Romanoli | Syra Moran </p>
    </footer>
    </>
  )
}

export default Footer