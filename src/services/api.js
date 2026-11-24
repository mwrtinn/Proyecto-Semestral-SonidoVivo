
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1').replace(/\/$/, '');
const CLAVE_TOKEN = 'sv_token';

// sessionStorage: el token sobrevive a recargar la página, pero se borra al cerrar la pestaña.
export const guardarToken = (token) => sessionStorage.setItem(CLAVE_TOKEN, token);
export const leerToken = () => sessionStorage.getItem(CLAVE_TOKEN);
export const borrarToken = () => sessionStorage.removeItem(CLAVE_TOKEN);

// Error con el estado HTTP y los detalles que manda el backend ({ mensaje, detalles }).
export class ApiError extends Error {
  constructor(status, mensaje, detalles = []) {
    super(mensaje);
    this.status = status;
    this.detalles = detalles;
  }
}

let alExpirar = null;
export const registrarAlExpirar = (funcion) => {
  alExpirar = funcion;
};

export async function peticion(ruta, { metodo = 'GET', cuerpo, conToken = true } = {}) {
  const headers = {};
  if (cuerpo !== undefined) headers['Content-Type'] = 'application/json';
  const token = leerToken();
  if (conToken && token) headers.Authorization = `Bearer ${token}`;

  let respuesta;
  try {
    respuesta = await fetch(`${BASE_URL}${ruta}`, {
      method: metodo,
      headers,
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined
    });
  } catch {
    throw new ApiError(0, 'No se pudo conectar con el servidor.');
  }

  if (respuesta.status === 204) return null;

  let datos = null;
  try {
    datos = await respuesta.json();
  } catch {
    datos = null;
  }

  if (!respuesta.ok) {
    if (respuesta.status === 401 && conToken && token && alExpirar) alExpirar();
    throw new ApiError(respuesta.status, (datos && datos.mensaje) || 'Error inesperado del servidor.', (datos && datos.detalles) || []);
  }
  return datos;
}
