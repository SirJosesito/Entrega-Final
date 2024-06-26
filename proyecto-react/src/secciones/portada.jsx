import React, { useState, useEffect } from 'react';
import Tarjeta from '../secciones/tarjeta';
import '../css/portada.css'


function Portada() {
    const datos = 'http://localhost:3001/alojamiento/getAlojamientos';
    const [alojamientos, setAlojamientos] = useState([]);
    const imagenes = 'http://localhost:3001/imagen/getAllImagenes';
    const [imagenesLista, setImagenesLista] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tiposAlojamiento, setTiposAlojamiento] = useState([]);

    const [tipoSeleccionado, setSelectedTipoAlojamiento] = useState('');
    const [estadoSeleccionado, setSelectedEstado] = useState('');
    const [precioSeleccionado, setSelectedPrecio] = useState({ maximo: null, minimo: null })
    const [dormitoriosSeleccionado, setSelectedDormitorios] = useState(null);
    const [baniosSeleccionado, setSelectedBanios] = useState(null);



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
    }

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
        } finally {
            setLoading(false);
        }
    }

    const obtenerTiposAlojamiento = async () => {
        try {
            const respuestaTipos = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
            if (respuestaTipos.ok) {
                const datosTipo = await respuestaTipos.json();
                setTiposAlojamiento(datosTipo);
            } else {
                console.log('error al obtener tipos de alojamiento');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        obtenerAlojamientos();
        obtenerImagenes();
        obtenerTiposAlojamiento();

    }, []);

    //FILTRADO
    const filterAlojamientos = alojamientos.filter(alojamiento =>
        (tipoSeleccionado === '' || alojamiento.idTipoAlojamiento === parseInt(tipoSeleccionado)) &&
        (estadoSeleccionado == '' || alojamiento.Estado === estadoSeleccionado) &&
        (precioSeleccionado.minimo == null || alojamiento.PrecioPorDia >= precioSeleccionado.minimo) &&
        (precioSeleccionado.maximo == null || alojamiento.PrecioPorDia <= precioSeleccionado.maximo) &&
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
            [id]: value !== '' ? parseInt(value) : null
        });
    };
    const cambiarCantDormitorios = (e) => {
        setSelectedDormitorios(e.target.value !== '' ? parseInt(e.target.value) : null);
    };
    const cambiarCantBanios = (e) => {
        setSelectedBanios(e.target.value !== '' ? parseInt(e.target.value) : null);
    };
    if (loading) {
        return <p>Cargando...</p>;
    }

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
                    <input type='number' id='dormitorios' placeholder='Ingrese cantidad de dormitorios' value={dormitoriosSeleccionado} onChange={cambiarCantDormitorios}></input>
                </div>

                <div className='filtro-grupo'>
                    <label>Filtrar por cantidad de baños</label>
                    <input type='number' id="banios" placeholder='Baños' value={baniosSeleccionado} onChange={cambiarCantBanios}></input>
                </div>
            </div>

            <div className='contenedor-tarjetas'>
                {filterAlojamientos.map(item => {
                    const imagenCorrespondiente = imagenesLista.find(imagen => imagen.idAlojamiento === item.idAlojamiento);
                    const imagen = imagenCorrespondiente || { RutaArchivo: "No se encontró imagen" };
                    return (
                        <Tarjeta
                            key={item.idAlojamiento}
                            titulo={item.Titulo}
                            descripcion={item.Descripcion}
                            precio={item.PrecioPorDia}
                            imagen={imagen}
                            latitud={item.Latitud}
                            longitud={item.Longitud}
                            disponibilidad={item.Estado}
                        />
                    );
                })}
            </div>
        </>

    );
}

export default Portada;