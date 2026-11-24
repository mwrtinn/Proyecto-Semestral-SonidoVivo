
import { createContext, useContext, useState } from 'react';
import productosIniciales from '../data/productos.json';
import { descontarStock as descontar } from '../utils/stock';

const ProductosContext = createContext(null);

export function ProductosProvider(props) {

  const [productos, setProductos] = useState(productosIniciales);

  function descontarStock(items) {
    const resultado = descontar(productos, items);

    if (resultado.ok) {
      setProductos(resultado.productos);
    }

    return {
      ok: resultado.ok,
      mensaje: resultado.mensaje
    };
  }

  return (
    <ProductosContext.Provider
      value={{ productos, descontarStock }}
    >
      {props.children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  const contexto = useContext(ProductosContext);

  if (!contexto) {
    throw new Error(
      'useProductos debe usarse dentro de un ProductosProvider'
    );
  }

  return contexto;
}
