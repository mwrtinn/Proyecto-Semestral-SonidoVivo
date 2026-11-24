export function loginRequestDto(formulario) {
  return {
    email: formulario.email.trim().toLowerCase(),
    clave: formulario.clave
  };
}

export function registroRequestDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    email: formulario.email.trim().toLowerCase(),
    clave: formulario.clave
  };
}