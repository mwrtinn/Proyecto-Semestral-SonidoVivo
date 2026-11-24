import { peticion } from './api';

export function listarUsuarios({ buscar, rol, activo } = {}) {
  const params = new URLSearchParams();
  if (buscar) params.set('buscar', buscar);
  if (rol) params.set('rol', rol);
  if (activo !== undefined && activo !== '') params.set('activo', activo);
  const consulta = params.toString();
  return peticion(`/usuarios${consulta ? `?${consulta}` : ''}`);
}

export const crearUsuario = (datos) => peticion('/usuarios', { metodo: 'POST', cuerpo: datos });
export const modificarUsuario = (id, datos) => peticion(`/usuarios/${id}`, { metodo: 'PATCH', cuerpo: datos });
export const desactivarUsuario = (id) => peticion(`/usuarios/${id}`, { metodo: 'DELETE' });
