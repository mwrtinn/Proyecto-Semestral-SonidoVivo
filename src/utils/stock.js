// Regla de negocio: el stock baja al confirmar el pedido.
// Es una función pura (no usa React): recibe la lista de productos y los items del
// carrito, y devuelve una lista NUEVA con el stock descontado. No modifica la original.
export function descontarStock(productos, items) {
  for (const item of items) {
    const producto = productos.find((p) => p.id === item.id);

    if (!producto) {
      return { ok: false, mensaje: `El producto "${item.nombre}" ya no está disponible.`, productos: productos };
    }
    if (producto.stock < item.cantidad) {
      return {
        ok: false,
        mensaje: `No hay stock suficiente de "${item.nombre}". Quedan ${producto.stock} unidades.`,
        productos: productos
      };
    }
  }

  const actualizados = productos.map((p) => {
    const item = items.find((i) => i.id === p.id);
    return item ? { ...p, stock: p.stock - item.cantidad } : p;
  });
  return { ok: true, productos: actualizados };
}
