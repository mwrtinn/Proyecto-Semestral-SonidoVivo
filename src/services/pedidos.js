import { peticion } from './api';
import { crearPedidoDto, estadoPedidoDto, pedidoResponseDto } from '../dto/pedidos.dto';
export const listarPedidos = async signal => (await peticion('/pedidos', { signal })).map(pedidoResponseDto);
export const obtenerPedido = async id => pedidoResponseDto(await peticion(`/pedidos/${id}`));
export const crearPedido = async datos => pedidoResponseDto(await peticion('/pedidos', { metodo: 'POST', cuerpo: crearPedidoDto(datos) }));
export const cambiarEstadoPedido = async (id, estado) => pedidoResponseDto(await peticion(`/pedidos/${id}/estado`, { metodo: 'PATCH', cuerpo: estadoPedidoDto(estado) }));