import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { leerToken } from '../services/api';
import * as service from '../services/pedidos';
const PedidosContext = createContext(null);
export function PedidosProvider(props) {
  const { usuario } = useAuth();
  const token = usuario ? leerToken() : null;
  const [estado, setEstado] = useState({ token: null, pedidos: [], cargando: false, error: '' });
  useEffect(() => {
    const c = new AbortController();
    setEstado({ token, pedidos: [], cargando: !!token, error: '' });
    if (token) service.listarPedidos(c.signal)
      .then(pedidos => { if (!c.signal.aborted && leerToken() === token) setEstado({ token, pedidos, cargando: false, error: '' }); })
      .catch(err => { if (!c.signal.aborted && leerToken() === token) setEstado({ token, pedidos: [], cargando: false, error: err.message }); });
    return () => c.abort();
  }, [token]);
  const pedidos = estado.token === token ? estado.pedidos : [];
  function guardar(pedido) {
    if (!token || leerToken() !== token) return;
    setEstado(actual => ({ ...actual, pedidos: [pedido, ...actual.pedidos.filter(p => p.id !== pedido.id)] }));
  }
  async function crearPedido(datos) { const pedido = await service.crearPedido(datos); guardar(pedido); return pedido; }
  async function cambiarEstadoPedido(id, valor) { const pedido = await service.cambiarEstadoPedido(id, valor); guardar(pedido); return pedido; }
  return <PedidosContext.Provider value={{ pedidos, cargando: !!token && (estado.token !== token || estado.cargando), error: estado.token === token ? estado.error : '', crearPedido, obtenerPedido: service.obtenerPedido, cambiarEstadoPedido }}>{props.children}</PedidosContext.Provider>;
}
export function usePedidos() {
  const contexto = useContext(PedidosContext);
  if (!contexto) throw new Error('usePedidos debe usarse dentro de un PedidosProvider');
  return contexto;
}