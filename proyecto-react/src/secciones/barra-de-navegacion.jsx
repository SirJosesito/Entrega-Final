import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom';
import logo from '/logo.png';
import '../css/navbar.css';

function BarraDeNavegacion() {
    return ( <nav className="barra-de-navegacion">
        <div className="contenedor-logo-nav">
                <Link to="/"><img id='logo-airbnb' src={logo} alt="Logo Airbnb"></img></Link>
        </div>
        <div className="botonera-nav">
            <ul>
                <li><Link to="/contacto">Contacto</Link></li>
                <li><Link to="/quienes-somos">Quiénes somos</Link></li>
                <li><Link to="/tipoAlojamiento">Administracion</Link></li>
            </ul>
        </div>
        <div className='inicio-sesion-nav'>
            <a href='#'>Iniciar sesión</a>
        </div>
        
</nav> );
}

export default BarraDeNavegacion;