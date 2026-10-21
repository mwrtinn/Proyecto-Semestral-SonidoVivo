
import { createContext, useContext, useState } from 'react';
import { ESTADO_INICIAL } from '../utils/pedidos';

const PedidosContext = createContext(null);

export function PedidosProvider(props) {
  const [pedidos, setPedidos] = useState([]);

  
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


export function usePedidos() {
  const contexto = useContext(PedidosContext);
  if (!contexto) {
    throw new Error('usePedidos debe usarse dentro de un PedidosProvider');
  }
  return contexto;
}
