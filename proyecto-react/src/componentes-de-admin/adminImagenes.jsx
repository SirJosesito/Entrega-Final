import React, { useState, useEffect } from 'react';
import '../css/adminImagenes.css'

function AdminImagenes() {
    const datos = 'http://localhost:3001/alojamiento/getAlojamientos';
    const imagenes = 'http://localhost:3001/imagen/getAllImagenes';
    const [alojamientos, setAlojamientos] = useState([]);
    const [imagenesLista, setImagenesLista] = useState([]);
    const [editando, setEditando] = useState(null);
    const [nuevaUrl, setNuevaUrl] = useState('');

    const obtenerAlojamientos = async () => {
        try {
            const respuestaAlojamientos = await fetch(datos);
            if (respuestaAlojamientos.ok) {
                const datosAlojamientos = await respuestaAlojamientos.json();
                setAlojamientos(datosAlojamientos);
            } else {
                console.log('La respuesta no fue ok')
            }
        } catch (error) {
            console.log('error en el fetch del alojamiento');
        }
    };

    const obtenerImagenes = async () => {
        try {
            const respuestaImagenes = await fetch(imagenes);
            if (respuestaImagenes.ok) {
                const datosImagenes = await respuestaImagenes.json();
                setImagenesLista(datosImagenes);
            } else {
                console.log('La respuesta no fue ok')
            }
        } catch (error) {
            console.log('error en el fetch del alojamiento');
        }
    };

    useEffect(() => {
        obtenerAlojamientos();
        obtenerImagenes();
    }, []);

    const handleEditarImagen = (item) => {
        const imagenExistente = imagenesLista.find(img => img.idAlojamiento === item.idAlojamiento);
        setEditando(item.idAlojamiento);
        setNuevaUrl(imagenExistente ? imagenExistente.RutaArchivo : '');
    };

    const handleGuardarUrl = async (alojamiento) => {
        const imagenExistente = imagenesLista.find(img => img.idAlojamiento === alojamiento.idAlojamiento);
        const imagenActualizada = {
            idAlojamiento: alojamiento.idAlojamiento,
            RutaArchivo: nuevaUrl
        };

        try {
            let response;
            if (imagenExistente) {
                response = await fetch(`http://localhost:3001/imagen/updateImagen/${imagenExistente.idImagen}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(imagenActualizada),
                });
            } else {
                response = await fetch('http://localhost:3001/imagen/createImagen', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(imagenActualizada),
                });
            }

            if (response.ok) {
                setEditando(null);
                setNuevaUrl('');
                alert('Imagen guardada correctamente');
                obtenerImagenes();
            } else {
                throw new Error('Error al guardar la imagen');
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    const borrarImagen = async (imagen) => {
        try {
            const response = await fetch(`http://localhost:3001/imagen/deleteImagen/${imagen.idImagen}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Imagen borrada correctamente');
                obtenerImagenes();
            } else {
                throw new Error('Error al borrar la imagen');
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    return (<>
        <br></br>
        <div className='contenedorTabla'>
            <table>
                <thead>
                    <tr>
                        <th>Alojamiento</th>
                        <th>Imagen</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {alojamientos.map((item, index) => {
                        const imagenCorrespondiente = imagenesLista.find(imagen => imagen.idAlojamiento === item.idAlojamiento);
                        return (
                            <tr key={index}>
                                <td>{item.Titulo}</td>
                                <td>
                                    {imagenCorrespondiente ?
                                        (<img src={imagenCorrespondiente.RutaArchivo} alt={`Imagen de ${item.Titulo}`} width="100" />) :
                                        (<p>No hay imagen para mostrar</p>)
                                    }

                                </td>
                                <td>
                                    {editando === item.idAlojamiento ? (
                                        <>
                                            <input
                                            className='input-imagen'
                                                type="text"
                                                value={nuevaUrl}
                                                onChange={(e) => setNuevaUrl(e.target.value)}
                                            />
                                            <button className='btn-tabla' onClick={() => handleGuardarUrl(item)}>Guardar</button>
                                        </>
                                    ) : (
                                        <button className='btn-tabla' onClick={() => handleEditarImagen(item)}>Editar</button>
                                    )}
                                </td>
                                <td>
                                    <button className='btn-tabla' onClick={() => borrarImagen(imagenCorrespondiente)}>Borrar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <br></br>
    </>);
}

export default AdminImagenes;