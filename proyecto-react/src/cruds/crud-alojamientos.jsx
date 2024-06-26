const BASE_URL = 'http://localhost:3001/alojamiento';

export const crearAlojamiento = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/createTipoAlojamiento`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };