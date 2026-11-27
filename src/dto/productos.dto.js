export function productoResponseDto(datos) {
  return {
    ...datos,
    id: Number(datos.id ?? datos.id_producto),
    codigo: datos.codigo,
    categoria: datos.categoria,
    nombre: datos.nombre,
    marca: datos.marca ?? '',
    modelo: datos.modelo ?? '',
    stock: Number(datos.stock),
    precio: Number(datos.precio),
    descripcion: datos.descripcion ?? '',
    imagen: datos.imagen ?? null,
    enOferta: datos.enOferta ?? datos.en_oferta ?? false,
    descuento: Number(datos.descuento ?? 0),
    activo: datos.activo ?? true
  };
}

export function crearProductoDto(datos) {
  return actualizarProductoDto(datos);
}

export function actualizarProductoDto(datos) {
  const dto = {};

  const textos = [
    'codigo',
    'categoria',
    'nombre',
    'marca',
    'modelo',
    'descripcion',
    'imagen'
  ];

  for (const campo of textos) {
    if (datos[campo] !== undefined) {
      dto[campo] =
        typeof datos[campo] === 'string'
          ? datos[campo].trim()
          : datos[campo];
    }
  }

  for (const campo of ['precio', 'stock', 'descuento']) {
    if (datos[campo] !== undefined) {
      if (
        datos[campo] === '' ||
        datos[campo] === null ||
        !Number.isInteger(Number(datos[campo]))
      ) {
        throw new Error(`${campo} debe ser un nÃºmero entero.`);
      }

      dto[campo] = Number(datos[campo]);
    }
  }

  for (const campo of ['enOferta', 'activo']) {
    if (datos[campo] !== undefined) {
      if (typeof datos[campo] !== 'boolean') {
        throw new Error(`${campo} debe ser true o false.`);
      }

      dto[campo] = datos[campo];
    }
  }

  return dto;
}