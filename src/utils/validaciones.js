export function validarEmail(email) {
  if (email.trim() === '') return 'El correo es obligatorio.';
  if (!email.includes('@') || !email.includes('.')) return 'Debes ingresar un correo válido.';
  return '';
}

export function validarClave(clave) {
  if (clave.trim() === '') return 'La contraseña es obligatoria.';
  if (clave.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  return '';
}