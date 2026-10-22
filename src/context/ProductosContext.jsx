// ProductosContext: guarda la lista de productos en el estado de React para que el
// catálogo, las categorías, las ofertas, el detalle y el carrito muestren siempre el
// mismo stock, y para poder descontarlo al confirmar una compra.
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
    return { ok: resultado.ok, mensaje: resultado.mensaje };
  }

  return (
    <ProductosContext.Provider value={{ productos, descontarStock }}>
      {props.children}
    </ProductosContext.Provider>
  );
}

// useProductos: hook propio que abre la caja. Uso: const { productos } = useProductos()
export function useProductos() {
  const contexto = useContext(ProductosContext);
  if (!contexto) {
    throw new Error('useProductos debe usarse dentro de un ProductosProvider');
  }
  return contexto;
}
