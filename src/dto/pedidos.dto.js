// No enviar precio, total ni id_usuario: el servidor calcula y obtiene el dueño del JWT.
export function crearPedidoDto(datos) {
  if (!['despacho', 'retiro'].includes(datos.entrega)) throw new Error('Entrega inválida');
  const nombre = datos.nombre.trim(), email = datos.email.trim().toLowerCase(), telefono = datos.telefono.trim();
  const direccion = datos.entrega === 'despacho' ? datos.direccion.trim() : '';
  if (!nombre || !email || !telefono || (datos.entrega === 'despacho' && !direccion)) throw new Error('Completa los datos de entrega');
  if (!Array.isArray(datos.items) || !datos.items.length) throw new Error('El carrito está vacío');
  const items = datos.items.map(item => {
    const id_producto = Number(item.id_producto ?? item.id), cantidad = Number(item.cantidad);
    if (!Number.isSafeInteger(id_producto) || id_producto < 1 || !Number.isSafeInteger(cantidad) || cantidad < 1) throw new Error('Producto o cantidad inválida');
    return { id_producto, cantidad };
  });
  if (new Set(items.map(i => i.id_producto)).size !== items.length) throw new Error('Hay productos repetidos');
  return { nombre, email, telefono, entrega: datos.entrega, direccion, items };
}
export const ESTADOS_PEDIDO = ['En preparación', 'Enviado', 'Entregado'];
export function estadoPedidoDto(estado) {
  if (!ESTADOS_PEDIDO.includes(estado)) throw new Error('Estado inválido');
  return { estado };
}
export function pedidoResponseDto(datos) {
  return { ...datos, id: Number(datos.id ?? datos.id_pedido), total: Number(datos.total),
    ...(Array.isArray(datos.items) ? { items: datos.items.map(i => ({ ...i, id: Number(i.id ?? i.id_producto), precio: Number(i.precio ?? i.precio_unitario), cantidad: Number(i.cantidad) })) } : {}) };
}