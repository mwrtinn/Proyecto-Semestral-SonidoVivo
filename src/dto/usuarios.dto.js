export const ROLES = ['Administrador', 'Vendedor', 'Cliente'];
export function registroUsuarioDto({ nombre, email, clave }) {
  return { nombre: nombre.trim(), email: email.trim().toLowerCase(), clave };
}
export function loginDto({ email, clave }) {
  return { email: email.trim().toLowerCase(), clave };
}
export function crearUsuarioDto(datos) {
  return { ...registroUsuarioDto(datos), rol: datos.rol };
}
export function actualizarUsuarioDto(datos) {
  const dto = {};
  if (datos.nombre !== undefined) dto.nombre = datos.nombre.trim();
  if (datos.rol !== undefined) dto.rol = datos.rol;
  if (datos.activo !== undefined) {
    if (typeof datos.activo !== 'boolean') throw new Error('Activo debe ser booleano');
    dto.activo = datos.activo;
  }
  return dto;
}