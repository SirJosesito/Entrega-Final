import React, { useState, useEffect } from 'react';
import { obtenerTiposAlojamiento, crearTipoAlojamiento } from '../cruds/crud-tipo-alojamiento';
import '../css/addTipoAlojamiento.css'

function AddTipoAlojamiento() {
    const [descripcion, setDescripcion] = useState('');
    const [tiposAlojamiento, setTiposAlojamiento] = useState([]);

    
    useEffect(() => {
        const fetchTiposAlojamiento = async () => {
            const datos = await obtenerTiposAlojamiento();
            setTiposAlojamiento(datos);
        };
        fetchTiposAlojamiento();
    }, []);


    const enviar = async (e) => {
        e.preventDefault();

        // Comprobar si el tipo de alojamiento ya existe
        const tipoExistente = tiposAlojamiento.find(tipo => tipo.Descripcion.toUpperCase() === descripcion.toUpperCase());

        if (tipoExistente) {
            alert('Ya existe un tipo de alojamiento con esa descripción.');
            return;
        }

        try {
            const response = await crearTipoAlojamiento(descripcion);
            if (response.ok) {
                alert('Se creó correctamente el tipo de alojamiento.');
                setDescripcion('');
            } else {
                alert('Error al crear el tipo de alojamiento.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo establecer el servicio.');
        }
    };

    return (
        <>
        <br></br>
        <div className='contenedorAddAlojamiento'>
            <div className='formulario-contenedor'>
                <h2>Alta tipo de alojamiento</h2>
                <form className='formulario' onSubmit={enviar}>
                    <div>
                        <input
                            onChange={e => setDescripcion(e.target.value)}
                            type='text'
                            id='descripcion'
                            value={descripcion}
                            placeholder='Ingrese el tipo de alojamiento'
                        />
                    </div>
                    <button type='submit'>Enviar</button>
                </form>
            </div>
        </div>
        <br></br>
        </>
    );
}

export default AddTipoAlojamiento;