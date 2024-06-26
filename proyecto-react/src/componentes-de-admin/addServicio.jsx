import React, { useState, useEffect } from 'react';
import '../css/addServicio.css'

function AddServicio() {
    const [nombre, setNombre] = useState('');

    const enviar = async (e) => {
        e.preventDefault();
        const json = {
            Nombre: nombre
        };

        //conexion con la api
        try {
            const response = await fetch('http://localhost:3001/servicio/createServicio', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(json),
            });

            if (response.ok){
                alert('Se creó correctamente el servicio');
            }
            else {
                alert('Error al crear el alojamiento tipo');
            }
        } catch (error) {
            console.error('Error', error);
            alert('error no pudo establecer el servicio');
        }
    };


    return ( <>
    <br></br>
        <div className='formulario-servicio-contenedor'>
            <h2>Alta Servicio</h2>
            <p>Importante: agregar servicios para que aparezcan en la tabla</p>
            <form className='formulario-servicio' onSubmit={enviar}>
                <div>
                    <input
                        onChange={e => setNombre(e.target.value)}
                        type='text'
                        id='nombre-servicio'
                        value={nombre}
                        placeholder='Ingrese el servicio'
                    />
                </div>
                <button type='submit'>Enviar</button>
            </form>
        </div>
        <br></br>
    </> );
}

export default AddServicio;