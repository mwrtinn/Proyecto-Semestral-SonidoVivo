
import axios from 'axios';

const CLAVE_TOKEN = 'sv_token';

// Gestion del token JWT
export const guardarToken = (token) =>
  sessionStorage.setItem(CLAVE_TOKEN, token);

export const leerToken = () =>
  sessionStorage.getItem(CLAVE_TOKEN);

export const borrarToken = () =>
  sessionStorage.removeItem(CLAVE_TOKEN);

// Clase para gestionar errores de la API
export class ApiError extends Error {
  constructor(status, mensaje, detalles = []) {
    super(mensaje);
    this.name = 'ApiError';
    this.status = status;
    this.detalles = detalles;
  }
}

// Gestion de sesiones expiradas
let alExpirar = null;

export const registrarAlExpirar = (funcion) => {
  alExpirar = funcion;
};

// Configuracion de la URL del backend
const API_URL = (
  import.meta.env.VITE_API_URL ||
  'http://localhost:3000/api/v1'
).trim().replace(/\/+$/, '');

// Instancia centralizada de Axios
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Funcion centralizada para realizar solicitudes HTTP
export async function peticion(
  ruta,
  { metodo = 'GET', cuerpo, conToken = true } = {}
) {
  const token = leerToken();

  try {
    const respuesta = await api.request({
      url: ruta,
      method: metodo,
      data: cuerpo,
      headers: conToken && token
        ? { Authorization: `Bearer ${token}` }
        : {}
    });

    return respuesta.status === 204
      ? null
      : respuesta.data;

  } catch (error) {
    const status = error.response?.status || 0;

    // Diagnostico sin exponer contrasenas ni tokens
    console.error('Error de API:', {
      codigo: error.code,
      estado: status,
      url: error.config
        ? api.getUri(error.config)
        : undefined,
      metodo: metodo
    });

    // Eliminar token cuando la sesion no es valida
    if (status === 401 && conToken && token) {
      borrarToken();
      alExpirar?.();
    }

    let mensaje =
      error.response?.data?.mensaje ||
      'No se pudo completar la solicitud.';

    if (
      error.code === 'ECONNABORTED' ||
      error.code === 'ETIMEDOUT'
    ) {
      mensaje = 'La API tardó demasiado en responder.';
    } else if (error.code === 'ERR_NETWORK') {
      mensaje = 'No se pudo conectar con el servidor.';
    } else if (status === 401) {
      mensaje = error.response?.data?.mensaje
        || 'Credenciales inválidas.';
    } else if (status === 403) {
      mensaje = 'No tienes permisos para realizar esta acción.';
    } else if (status === 404) {
      mensaje = 'El recurso solicitado no existe.';
    } else if (status >= 500) {
      mensaje = 'Error interno del servidor.';
    }

    throw new ApiError(
      status,
      mensaje,
      error.response?.data?.detalles || []
    );
  }
}
