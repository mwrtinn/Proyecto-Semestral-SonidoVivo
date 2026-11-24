// Contrato propuesto: POST/PATCH /productos. No existe aún en el backend original.
const camposTexto = ['codigo', 'categoria', 'nombre', 'marca', 'modelo', 'descripcion', 'imagen'];
function entero(valor, campo, max = Number.MAX_SAFE_INTEGER) {
  if (valor === '' || valor == null || (typeof valor === 'string' && !valor.trim())) throw new Error(`${campo} es obligatorio`);
  const n = Number(valor);
  if (!Number.isSafeInteger(n) || n < 0 || n > max) throw new Error(`${campo} inválido`);
  return n;
}
export function actualizarProductoDto(formulario) {
  const dto = {};
  for (const campo of camposTexto) if (formulario[campo] !== undefined) dto[campo] = String(formulario[campo] ?? '').trim();
  for (const campo of ['precio', 'stock', 'descuento']) if (formulario[campo] !== undefined) dto[campo] = entero(formulario[campo], campo, campo === 'descuento' ? 100 : undefined);
  if (formulario.enOferta !== undefined) {
    if (typeof formulario.enOferta !== 'boolean') throw new Error('enOferta debe ser booleano');
    dto.enOferta = formulario.enOferta;
  }
  return dto;
}
export function crearProductoDto(formulario) {
  const dto = actualizarProductoDto({ descuento: 0, enOferta: false, ...formulario });
  for (const campo of ['codigo', 'categoria', 'nombre', 'marca', 'modelo', 'descripcion']) if (!dto[campo]) throw new Error(`${campo} es obligatorio`);
  for (const campo of ['precio', 'stock']) if (dto[campo] === undefined) throw new Error(`${campo} es obligatorio`);
  return dto;
}
export function productoResponseDto(datos) {
  return { ...datos, id: entero(datos.id ?? datos.id_producto, 'id'), precio: entero(datos.precio, 'precio'), stock: entero(datos.stock, 'stock'), descuento: entero(datos.descuento ?? 0, 'descuento', 100), enOferta: datos.enOferta ?? datos.en_oferta ?? false };
}