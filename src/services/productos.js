import { peticion } from './api';

import {
  crearProductoDto,
  actualizarProductoDto,
  productoResponseDto
} from '../dto/productos.dto';

export async function listarProductos() {
  const respuesta = await peticion('/productos', {
    metodo: 'GET',
    conToken: false
  });

  return respuesta.map(productoResponseDto);
}

export async function listarProductosAdmin() {
  const respuesta = await peticion('/productos/admin', {
    metodo: 'GET'
  });

  return respuesta.map(productoResponseDto);
}

export async function obtenerProducto(id) {
  const respuesta = await peticion(`/productos/${id}`, {
    metodo: 'GET',
    conToken: false
  });

  return productoResponseDto(respuesta);
}

export async function crearProducto(datos) {
  const respuesta = await peticion('/productos', {
    metodo: 'POST',
    cuerpo: crearProductoDto(datos)
  });

  return productoResponseDto(respuesta);
}

export async function modificarProducto(id, datos) {
  const respuesta = await peticion(`/productos/${id}`, {
    metodo: 'PATCH',
    cuerpo: actualizarProductoDto(datos)
  });

  return productoResponseDto(respuesta);
}

export async function eliminarProducto(id) {
  return peticion(`/productos/${id}`, {
    metodo: 'DELETE'
  });
}

export async function reactivarProducto(id) {
  return modificarProducto(id, {
    activo: true
  });
}