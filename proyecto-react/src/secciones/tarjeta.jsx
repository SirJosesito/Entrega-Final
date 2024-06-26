import React from 'react';
import '../css/tarjeta.css';

function Tarjeta({ titulo, descripcion, precio, imagen, latitud, longitud, disponibilidad }) {
    return (
        <div className='tarjeta'>
            <div className='contenedor-imagen-tarjeta'>
                <img src={imagen.RutaArchivo} alt={titulo} />
            </div>
            <div className='contenedor-texto-tarjeta'>
                <h3 className='titulo-tarjeta'>{titulo}</h3>
                <p id='precioTarjeta'>${precio}</p>
                <p><strong>Ubicación:</strong> {latitud}, {longitud}</p>
                <p id='disponibilidadTarjeta' className={disponibilidad}>{disponibilidad}</p>
            </div>
        </div>
    );
}

export default Tarjeta;
