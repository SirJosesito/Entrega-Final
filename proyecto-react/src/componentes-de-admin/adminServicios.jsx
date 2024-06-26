import React, { useState, useEffect } from 'react';
import AddServicio from './addServicio';
import '../css/adminServicios.css'

function AdminServicios() {
    const datos = 'http://localhost:3001/alojamiento/getAlojamientos';
    const [relacionServicioAlojamiento, setRelacionServicioAlojamiento] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [alojamientos, setAlojamientos] = useState([]);
    const [editando, setEditando] = useState(null);
    const [servicio, setServicio] = useState({});


    const obtenerServicios = async () => {
        try {
            const respuesta = await fetch('http://localhost:3001/servicio/getAllServicios');
            if (respuesta.ok) {
                const data = await respuesta.json();
                setServicios(data);
            } else {
                console.log('Error al obtener servicios');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const obtenerRelacionesServicios = async () => {
        try {
            const respuesta = await fetch('http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios');
            if (respuesta.ok) {
                const data = await respuesta.json();
                setRelacionServicioAlojamiento(data);
            } else {
                console.log('Error al obtener relaciones de servicios');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const obtenerAlojamientos = async () => {
        try {
            const respuestaAlojamientos = await fetch(datos);
            if (respuestaAlojamientos.ok) {
                const datosAlojamientos = await respuestaAlojamientos.json();
                setAlojamientos(datosAlojamientos);
            } else {
                console.log('La respuesta no fue ok');
            }
        } catch (error) {
            console.log('Error en el fetch del alojamiento');
        }
    };

    useEffect(() => {
        obtenerServicios();
        obtenerAlojamientos();
        obtenerRelacionesServicios();
    }, []);

    const handleEditarServicio = (item) => {
        obtenerServicios();
        setEditando(item.idAlojamiento);
        const serviciosRelacionados = relacionServicioAlojamiento
            .filter(relacion => relacion.idAlojamiento === item.idAlojamiento)
            .map(relacion => relacion.idServicio);
        setServicio(Object.fromEntries(serviciosRelacionados.map(id => [id, true])));
    };

    const handleGuardarServicio = async (alojamiento) => {
        const serviciosSeleccionados = Object.keys(servicio).filter(id => servicio[id]);
        try {
            const relacionesExistentes = relacionServicioAlojamiento.filter(relacion => relacion.idAlojamiento === alojamiento.idAlojamiento);
            for (const relacion of relacionesExistentes) {
                await fetch(`http://localhost:3001/alojamientosServicios/deleteAlojamientoServicio/${relacion.idAlojamientoServicio}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            for (const idServicio of serviciosSeleccionados) {
                const datos = {
                    idAlojamiento: alojamiento.idAlojamiento,
                    idServicio: parseInt(idServicio)
                };
                await fetch(`http://localhost:3001/alojamientosServicios/createAlojamientoServicio`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                });
            }
            await obtenerRelacionesServicios();
            setEditando(null);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEliminarServicio = async (idRelacion) => {
        try {
            const response = await fetch(`http://localhost:3001/alojamientosServicios/deleteAlojamientoServicio/${idRelacion}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                await obtenerRelacionesServicios();
            } else {
                throw new Error('Error al borrar la imagen');
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    

    const handleCheckboxChange = (idServicio) => {
        setServicio(prev => ({ ...prev, [idServicio]: !prev[idServicio] }));
    };

    return (
        <>
            <AddServicio />
            <br></br>
            <div className='contenedorTabla'>
                <table>
                    <thead>
                        <tr>
                            <th>Alojamiento</th>
                            <th>Servicio</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alojamientos.map((item, index) => (
                            <tr key={index}>
                                <td>{item.Titulo}</td>
                                <td>
                                    {relacionServicioAlojamiento
                                        .filter(relacion => relacion.idAlojamiento === item.idAlojamiento)
                                        .map(relacion => {
                                            const servicio = servicios.find(serv => serv.idServicio === relacion.idServicio);
                                            return servicio ? (
                                                <div key={relacion.idServicio} className='contenedor-servicio'>
                                                    {servicio.Nombre}
                                                    <button className='tachito' onClick={() => handleEliminarServicio(relacion.idAlojamientoServicio)}><span class="material-symbols-outlined">
                                                        delete_forever
                                                    </span></button>
                                                </div>
                                            ) : null;
                                        })}
                                </td>
                                <td>
                                    {editando === item.idAlojamiento ? (
                                        <div>
                                            {servicios.map((serv, index) => (
                                                <div key={index}>
                                                    <label>{serv.Nombre}</label>
                                                    <input
                                                        type="checkbox"
                                                        checked={!!servicio[serv.idServicio]}
                                                        onChange={() => handleCheckboxChange(serv.idServicio)}
                                                    />
                                                </div>
                                            ))}
                                            <button className='btn-tabla' onClick={() => handleGuardarServicio(item)}>Guardar</button>
                                        </div>
                                    ) : (
                                        <button className='btn-tabla' onClick={() => handleEditarServicio(item)}>Editar</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br></br>
        </>
    );
}

export default AdminServicios;
