import { createContext, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useProductos } from './ProductosContext';

const CartContext = createContext();

export function CartProvider(props) {
  const [carrito, setCarrito] = useState([]);
  const { productos } = useProductos();

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find((item) => item.id === producto.id);
      
      const productoOriginal = productos.find((p) => p.id === producto.id);
      const stockMaximo = productoOriginal ? productoOriginal.stock : 0;
      
      if (productoExistente) {
        if (productoExistente.cantidad >= stockMaximo) {
          Swal.fire({
            icon: 'warning',
            title: 'Límite de stock',
            text: `¡No puedes agregar más! Solo tenemos ${stockMaximo} en stock.`,
            confirmButtonColor: '#212529' 
          });
          return carritoActual; 
        }

        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'success',
          title: 'Cantidad actualizada en el carrito',
          showConfirmButton: false,
          timer: 1500
        });

        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      
      if (stockMaximo <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Producto Agotado',
          text: 'Lo sentimos, este producto ya no tiene stock.',
          confirmButtonColor: '#dc3545' 
        });
        return carritoActual;
      }

      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: '¡Producto agregado al carrito!',
        showConfirmButton: false,
        timer: 1500
      });

      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalFisico = carrito.reduce((total, item) => total + item.cantidad, 0);
  const totalDinero = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  return (
    <CartContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      vaciarCarrito,
      totalFisico,
      totalDinero
    }}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CartContext);
}