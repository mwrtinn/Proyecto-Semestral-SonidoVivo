import { peticion } from './api';

export const login = (dto) =>
  peticion('/auth/login', {
    metodo: 'POST',
    cuerpo: dto,
    conToken: false
  });

export const obtenerPerfil = () =>
  peticion('/auth/me');

export const registrarUsuario = (dto) =>
  peticion('/auth/register', {
    metodo: 'POST',
    cuerpo: dto,
    conToken: false
  });