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


// si estan mal se borra de aqui hacia abajo :| (con el mensaje incluido)

export function validarObligatorio(valor, mensaje) {
  if (valor.trim() === '') return mensaje;
  return '';
}
 
// celula un numero de telefono chileno 9 dígitos que empiezan con 9 y con o sin el +56 delante
// Se aceptan espacios y guiones
export function validarTelefono(telefono) {
  if (telefono.trim() === '') return 'El teléfono es obligatorio.';
  const soloNumeros = telefono.replace(/[\s-]/g, '');
  if (!/^(\+?56)?9\d{8}$/.test(soloNumeros)) {
    return 'Ingresa un celular válido, por ejemplo +56 9 1234 5678.';
  }
  return '';
}