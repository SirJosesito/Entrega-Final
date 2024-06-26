// tipoAlojamientoService.js
const BASE_URL = 'http://localhost:3001/tiposAlojamiento';

export const obtenerTiposAlojamiento = async () => {
  try {
    const respuestaTipos = await fetch(`${BASE_URL}/getTiposAlojamiento`);
    if (respuestaTipos.ok) {
      const datosTipo = await respuestaTipos.json();
      return datosTipo;
    } else {
      console.error('Error al obtener tipos de alojamiento');
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const crearTipoAlojamiento = async (descripcion) => {
  try {
    const json = {
      Descripcion: descripcion.toLocaleUpperCase()
    };
    const response = await fetch(`${BASE_URL}/createTipoAlojamiento`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    });
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
