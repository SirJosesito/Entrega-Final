import React, { useState, useEffect } from 'react';
import './../css/nuevoAlojamiento.css'


function AddHotelForm() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoAlojamiento, setTipoAlojamiento] = useState('');
    const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [precioPorDia, setPrecioPorDia] = useState('');
    const [cantidadDormitorios, setCantidadDormitorios] = useState('');
    const [cantidadBanios, setCantidadBanios] = useState('');
    const [estado, setEstado] = useState('Disponible');

    useEffect(() => {
        const fetchTiposAlojamiento = async () => {
            try {
                const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
                if (response.ok) {
                    const data = await response.json();
                    setTiposAlojamiento(data);
                    
                } else {
                    console.error('Error al obtener los tipos de alojamiento. ');
                }
            } catch (error) {
                console.error('Error al conectarse con la API: ', error);
            }
        };
        fetchTiposAlojamiento();
        
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            Titulo: titulo,
            Descripcion: descripcion,
            idTipoAlojamiento: parseInt(tipoAlojamiento),
            Latitud: parseFloat(latitud),
            Longitud: parseFloat(longitud),
            PrecioPorDia: parseFloat(precioPorDia),
            CantidadDormitorios: parseInt(cantidadDormitorios, 10),
            CantidadBanios: parseInt(cantidadBanios, 10),
            Estado: estado,
        };

        try {
            const response = await fetch('http://localhost:3001/alojamiento/createAlojamiento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Alojamiento creado exitosamente.');
                setTitulo('');
                setDescripcion('');
                setTipoAlojamiento('');
                setLatitud('');
                setLongitud('');
                setPrecioPorDia('');
                setCantidadDormitorios('');
                setCantidadBanios('');
                setEstado('Disponible')

            } else {
                console.error('Error al crear el alojamiento.');
                alert('Error al crear el alojamiento.');
            }
        } catch (error) {
            console.error('Error al conectarse con la API:', error);
            alert('Error al conectar con la API. ');
        }
    };


    return (
    
    <div className="form-container">
        <h2>Nuevo Alojamiento</h2>
        <form className="tablero" onSubmit={handleSubmit}>
            <div className="title">
                <label htmlFor="titulo" className="titulares">Titulo:</label>
                <input className="cajas" 
                    type="text"
                    id="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </div>
            <div className="description">
                <label htmlFor="descripcion" className="titulares">Descripción:</label>
                <textarea className="cajas textificadora"
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </div>
            <div className="Alojamiento">
                <label htmlFor="tipoAlojamiento" className="titulares">Tipo de Alojamento:</label>
                <select className="cajas"
                    id="tipoAlojamiento"
                    value={tipoAlojamiento}
                    onChange={(e) => setTipoAlojamiento(e.target.value)}
                >
                    <option value="" className='texto'>Seleccione tipo de alojamiento:</option>
                    {tiposAlojamiento.map((tipo) => (
                        <option key={tipo.idTipoAlojamiento} value={tipo.idTipoAlojamiento}>
                            {tipo.Descripcion}
                        </option>
                    ))}
                </select>
            </div>
            <div className="Latitude">
                <label htmlFor="Latitud" className="titulares">Latitud:</label>
                <input className="cajas"
                    type="text"
                    id="latitud"
                    value={latitud}
                    onChange={(e) => setLatitud(e.target.value)}
                />
            </div>
            <div className="Longitude">
                <label htmlFor="Longitud" className="titulares">Longitud:</label>
                <input className="cajas"
                    type="text"
                    id="longitud"
                    value={longitud}
                    onChange={(e) => setLongitud(e.target.value)}
                />
            </div>
            <div className="price">
                <label htmlFor="precioPorDia" className="titulares">Precio por día:</label>
                <input className="cajas"
                    type="text"
                    id="precioPorDia"
                    value={precioPorDia}
                    onChange={(e) => setPrecioPorDia(e.target.value)}
                />
            </div>
            <div className="dormQuantity">
                <label htmlFor="cantidadDormitorios" className="titulares">Cantidad de dormitorios:</label>
                <input className="cajas"
                    type="number"
                    id="cantidadDormitorios"
                    value={cantidadDormitorios}
                    onChange={(e) => setCantidadDormitorios(e.target.value)}
                />
            </div>
            <div className="bathQuantity">
                <label htmlFor="cantidadBanios" className="titulares">Cantidad de Baños:</label>
                <input className="cajas"
                    type="number"
                    id="cantidadBanios"
                    value={cantidadBanios}
                    onChange={(e) => setCantidadBanios(e.target.value)}
                />
            </div>
            <div className="status">
                <label htmlFor="estado" className="titulares">Estado</label>
                <select className="cajas"
                    id="estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                >
                    <option value="Disponible" className='texto'>Disponible</option>
                    <option value="Reservado" className='texto'>Reservado</option>
                </select>
            </div>
            <button className="boton" type="submit">Agregar</button>
        </form>
    </div>);
}

export default AddHotelForm;