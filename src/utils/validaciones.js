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

// Campo obligatorio genérico: rechaza texto vacío o solo con espacios.
// El mensaje se pasa completo: validarObligatorio(valor, 'El nombre es obligatorio.')
export function validarObligatorio(valor, mensaje) {
  if (valor.trim() === '') return mensaje;
  return '';
}

// Celular chileno: 9 dígitos que empiezan con 9, con o sin el +56 delante.
// Se aceptan espacios y guiones (+56 9 1234 5678, 9-1234-5678).
export function validarTelefono(telefono) {
  if (telefono.trim() === '') return 'El teléfono es obligatorio.';
  const soloNumeros = telefono.replace(/[\s-]/g, '');
  if (!/^(\+?56)?9\d{8}$/.test(soloNumeros)) {
    return 'Ingresa un celular válido, por ejemplo +56 9 1234 5678.';
  }
  return '';
}

// La confirmación debe estar escrita y ser idéntica a la contraseña.
export function validarConfirmacion(clave, confirmacion) {
  if (confirmacion.trim() === '') return 'Debes confirmar la contraseña.';
  if (clave !== confirmacion) return 'Las contraseñas no coinciden.';
  return '';
}
