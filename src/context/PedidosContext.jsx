// PedidosContext: guarda los pedidos de la sesión en el estado de React, para que la
// página "Mis pedidos" pueda mostrarlos. Vive en memoria: al recargar la página
// se pierden (igual que el carrito). Más adelante se puede conectar con un service.
import { createContext, useContext, useState } from 'react';
import { ESTADO_INICIAL } from '../utils/pedidos';

const PedidosContext = createContext(null);

export function PedidosProvider(props) {
  const [pedidos, setPedidos] = useState([]);

  // Guarda un pedido nuevo y lo devuelve, ya con su número, su fecha y su estado.
  function crearPedido(datos) {
    const nuevo = {
      ...datos,
      id: pedidos.length + 1,
      fecha: new Date().toISOString(),
      estado: ESTADO_INICIAL
    };
    setPedidos([...pedidos, nuevo]);
    return nuevo;
  }

  return (
    <PedidosContext.Provider value={{ pedidos, crearPedido }}>
      {props.children}
    </PedidosContext.Provider>
  );
}

// usePedidos: hook propio que abre la caja. Uso: const { pedidos } = usePedidos()
export function usePedidos() {
  const contexto = useContext(PedidosContext);
  if (!contexto) {
    throw new Error('usePedidos debe usarse dentro de un PedidosProvider');
  }
  return contexto;
}
