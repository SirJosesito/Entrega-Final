import React, { useState, useEffect } from 'react';

function NuevaTablaAlojamientos() {
    const datos = 'http://localhost:3001/alojamiento/getAlojamientos';
    const [alojamientos, setAlojamientos] = useState([]);
    const [masDetalles, setMasDetalles] = useState(null);
    const [editaDetalles, setEditaDetalles] = useState(null);
    const [nuevoAlojamiento, setNuevoAlojamiento] = useState({});
    const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
    const [tipoSeleccionado, setSelectedTipoAlojamiento] = useState('');
    const [estadoSeleccionado, setSelectedEstado] = useState('');
    const [precioSeleccionado, setSelectedPrecio] = useState({ maximo: null, minimo: null });
    const [dormitoriosSeleccionado, setSelectedDormitorios] = useState(null);
    const [baniosSeleccionado, setSelectedBanios] = useState(null);

    useEffect(() => {
        obtenerAlojamientos();
        obtenerTiposAlojamiento();
    }, []);

    const obtenerAlojamientos = async () => {
        try {
            const respuestaAlojamientos = await fetch(datos);
            if (respuestaAlojamientos.ok) {
                const datosAlojamientos = await respuestaAlojamientos.json();

                const alojamientosConTipos = await Promise.all(
                    datosAlojamientos.map(async (alojamiento) => {
                        try {
                            const respuestaTipo = await fetch(`http://localhost:3001/tiposAlojamiento/getTipoAlojamiento/${alojamiento.idTipoAlojamiento}`);
                            if (respuestaTipo.ok) {
                                const datosTipo = await respuestaTipo.json();
                                return {
                                    ...alojamiento,
                                    tipoAlojamientoDescripcion: datosTipo.Descripcion
                                };
                            } else {
                                console.log('Error al obtener el tipo de alojamiento');
                                return alojamiento;
                            }
                        } catch (error) {
                            console.error('Error en un fetch tipo de alojamiento', error);
                            return alojamiento;
                        }
                    })
                );
                setAlojamientos(alojamientosConTipos);
            } else {
                console.log('Error al obtener alojamientos. Estado de respuesta:', respuestaAlojamientos.status);
            }
        } catch (error) {
            console.error('Error de red al obtener alojamientos:', error);
        }
    };

    const obtenerTiposAlojamiento = async () => {
        try {
            const respuestaTipos = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
            if (respuestaTipos.ok) {
                const datosTipo = await respuestaTipos.json();
                setTiposAlojamiento(datosTipo);
            } else {
                console.log('Error al obtener tipos de alojamiento');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const enviarEdicion = async (id) => {
        const datosActualizados = {
            Titulo: nuevoAlojamiento.Titulo,
            Descripcion: nuevoAlojamiento.Descripcion,
            idTipoAlojamiento: nuevoAlojamiento.idTipoAlojamiento,
            Latitud: nuevoAlojamiento.Latitud,
            Longitud: nuevoAlojamiento.Longitud,
            PrecioPorDia: nuevoAlojamiento.PrecioPorDia,
            CantidadDormitorios: nuevoAlojamiento.CantidadDormitorios,
            CantidadBanios: nuevoAlojamiento.CantidadBanios,
            Estado: nuevoAlojamiento.Estado
        };
        try {
            const response = await fetch(`http://localhost:3001/alojamiento/putAlojamiento/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosActualizados),
            });

            if (response.ok) {
                setEditaDetalles(null);
                alert('Se editó correctamente el alojamiento');
                obtenerAlojamientos();
            } else {
                throw new Error('Error al editar el alojamiento');
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setNuevoAlojamiento({
            ...nuevoAlojamiento,
            [name]: value,
        });
    };

    const verDetalles = (alojamiento) => {
        console.log("Ver detalles de:", alojamiento); // Debugging
        setMasDetalles(alojamiento.idAlojamiento);
        setNuevoAlojamiento(alojamiento);
        console.log("Estado después de ver detalles:", { masDetalles: alojamiento.idAlojamiento, nuevoAlojamiento: alojamiento });
    };

    const editarDetalles = (alojamiento) => {
        console.log("Editar detalles de:", alojamiento); // Debugging
        setEditaDetalles(alojamiento.idAlojamiento);
    };

    const borrarAlojamiento = (id) => {
        console.log("Borrar alojamiento con ID:", id); // Debugging
        fetch(`http://localhost:3001/alojamiento/deleteAlojamiento/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => {
                alert('El alojamiento se borró correctamente.');
                obtenerAlojamientos();
            })
            .catch(error => console.error('Error:', error));
    };

    const filterAlojamientos = alojamientos.filter(alojamiento =>
        (tipoSeleccionado === '' || alojamiento.idTipoAlojamiento === parseInt(tipoSeleccionado)) &&
        (estadoSeleccionado === '' || alojamiento.Estado === estadoSeleccionado) &&
        (precioSeleccionado.minimo === null || alojamiento.PrecioPorDia >= precioSeleccionado.minimo) &&
        (precioSeleccionado.maximo === null || alojamiento.PrecioPorDia <= precioSeleccionado.maximo) &&
        (dormitoriosSeleccionado === null || alojamiento.CantidadDormitorios === parseInt(dormitoriosSeleccionado)) &&
        (baniosSeleccionado === null || alojamiento.CantidadBanios === parseInt(baniosSeleccionado))
    );

    const cambiarTipoAlojamiento = (e) => {
        setSelectedTipoAlojamiento(e.target.value);
    };

    const cambiarEstado = (e) => {
        setSelectedEstado(e.target.value);
    };

    const cambiarRangoDePrecios = (e) => {
        const { id, value } = e.target;
        setSelectedPrecio({
            ...precioSeleccionado,
            [id]: value !== '' ? parseInt(value) : null
        });
    };

    const cambiarCantDormitorios = (e) => {
        setSelectedDormitorios(e.target.value !== '' ? parseInt(e.target.value) : null);
    };

    const cambiarCantBanios = (e) => {
        setSelectedBanios(e.target.value !== '' ? parseInt(e.target.value) : null);
    };

    return (
        <>
            <div className='contenedor-filtrado'>
                <div className='filtro-grupo'>
                    <label htmlFor='tipoAlojamiento'>Filtrar por tipo de alojamiento:</label>
                    <select id="tipoAlojamiento" value={tipoSeleccionado} onChange={cambiarTipoAlojamiento}>
                        <option value="">Todos</option>
                        {tiposAlojamiento.map(tipo => (
                            <option key={tipo.idTipoAlojamiento} value={tipo.idTipoAlojamiento}>{tipo.Descripcion}</option>
                        ))}
                    </select>
                </div>

                <div className='filtro-grupo'>
                    <label htmlFor='disponibilidad'>Filtrar por disponibilidad:</label>
                    <select id="estadoAlojamiento" value={estadoSeleccionado} onChange={cambiarEstado}>
                        <option value="">Todos</option>
                        <option value="Reservado">Reservado</option>
                        <option value="Disponible">Disponible</option>
                    </select>
                </div>

                <div className='filtro-grupo'>
                    <label htmlFor='precioMinimo'>Filtrar por precio:</label>
                    <div className='precio-rango'>
                        <input type='number' id="minimo" placeholder='Precio mínimo' onChange={cambiarRangoDePrecios}></input>
                        <input type='number' id="maximo" placeholder='Precio máximo' onChange={cambiarRangoDePrecios}></input>
                    </div>
                </div>

                <div className='filtro-grupo'>
                    <label>Filtrar por cantidad de dormitorios</label>
                    <input type='number' id='dormitorios' placeholder='Ingrese cantidad de dormitorios' value={dormitoriosSeleccionado || ''} onChange={cambiarCantDormitorios}></input>
                </div>

                <div className='filtro-grupo'>
                    <label>Filtrar por cantidad de baños</label>
                    <input type='number' id='banios' placeholder='Ingrese cantidad de baños' value={baniosSeleccionado || ''} onChange={cambiarCantBanios}></input>
                </div>
            </div>

            <div className='contenedorTabla'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterAlojamientos.map((item, index) => (
                            <tr key={index}>
                                <td>{item.idAlojamiento}</td>
                                <td>{item.Titulo}</td>
                                <td>
                                    <button onClick={() => verDetalles(item)}>Ver detalles</button>
                                    <button onClick={() => borrarAlojamiento(item.idAlojamiento)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {masDetalles && (
                <div className='detalles'>
                    <h3>Detalles del Alojamiento</h3>
                    {editaDetalles === masDetalles ? (
                        <div>
                            <label>Título: </label>
                            <input type="text" name="Titulo" value={nuevoAlojamiento.Titulo} onChange={manejarCambio} /><br />
                            <label>Descripción: </label>
                            <input type="text" name="Descripcion" value={nuevoAlojamiento.Descripcion} onChange={manejarCambio} /><br />
                            <label>Tipo: </label>
                            <select name="idTipoAlojamiento" value={nuevoAlojamiento.idTipoAlojamiento} onChange={manejarCambio}>
                                {tiposAlojamiento.map(tipo => (
                                    <option key={tipo.idTipoAlojamiento} value={tipo.idTipoAlojamiento}>{tipo.Descripcion}</option>
                                ))}
                            </select><br />
                            <label>Latitud: </label>
                            <input type="text" name="Latitud" value={nuevoAlojamiento.Latitud} onChange={manejarCambio} /><br />
                            <label>Longitud: </label>
                            <input type="text" name="Longitud" value={nuevoAlojamiento.Longitud} onChange={manejarCambio} /><br />
                            <label>Precio por Día: </label>
                            <input type="number" name="PrecioPorDia" value={nuevoAlojamiento.PrecioPorDia} onChange={manejarCambio} /><br />
                            <label>Cantidad de Dormitorios: </label>
                            <input type="number" name="CantidadDormitorios" value={nuevoAlojamiento.CantidadDormitorios} onChange={manejarCambio} /><br />
                            <label>Cantidad de Baños: </label>
                            <input type="number" name="CantidadBanios" value={nuevoAlojamiento.CantidadBanios} onChange={manejarCambio} /><br />
                            <label>Estado: </label>
                            <input type="text" name="Estado" value={nuevoAlojamiento.Estado} onChange={manejarCambio} /><br />
                            <button onClick={() => enviarEdicion(masDetalles)}>Guardar</button>
                        </div>
                    ) : (
                        <div>
                            <ul>
                                <li>Título: {nuevoAlojamiento.Titulo}</li>
                                <li>Descripción: {nuevoAlojamiento.Descripcion}</li>
                                <li>Tipo: {nuevoAlojamiento.tipoAlojamientoDescripcion}</li>
                                <li>Latitud: {nuevoAlojamiento.Latitud}</li>
                                <li>Longitud: {nuevoAlojamiento.Longitud}</li>
                                <li>Precio por Día: {nuevoAlojamiento.PrecioPorDia}</li>
                                <li>Cantidad de Dormitorios: {nuevoAlojamiento.CantidadDormitorios}</li>
                                <li>Cantidad de Baños: {nuevoAlojamiento.CantidadBanios}</li>
                                <li>Estado: {nuevoAlojamiento.Estado}</li>
                            </ul>
                            <button onClick={() => editarDetalles(nuevoAlojamiento)}>Editar</button>
                        </div>
                    )}
                    <button onClick={() => setMasDetalles(null)}>Cerrar</button>
                </div>
            )}
        </>
    );
}

export default NuevaTablaAlojamientos;
