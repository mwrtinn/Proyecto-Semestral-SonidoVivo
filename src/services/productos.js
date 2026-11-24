import { peticion } from './api';

export const listarProductos = () =>
  peticion('/productos', { conToken: false });

export const obtenerProducto = (id) =>
  peticion(`/productos/${id}`, { conToken: false });

export const crearProducto = (dto) =>
  peticion('/productos', {
    metodo: 'POST',
    cuerpo: dto
  });

export const modificarProducto = (id, dto) =>
  peticion(`/productos/${id}`, {
    metodo: 'PATCH',
    cuerpo: dto
  });

export const eliminarProducto = (id) =>
  peticion(`/productos/${id}`, {
    metodo: 'DELETE'
  });