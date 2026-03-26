import axios from 'axios';

//process.env.NEXT_PUBLIC_API_URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // si usas cookies / sesiones
});

// Interceptor opcional (tokens, logs, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      console.warn('Recurso no encontrado (404). Retornando data vacía.');
      return Promise.resolve({ data: [] });
    }

    const message =
      error.response?.data?.message ||
      error.response?.data ||
      'Error inesperado del servidor';

    return Promise.reject(message);
  }
);

export default api;
