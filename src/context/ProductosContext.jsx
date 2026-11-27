import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

import * as service from '../services/productos';

const ProductosContext = createContext(null);

export function ProductosProvider(props) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const solicitudActual = useRef(0);

  const cargarProductos = useCallback(async () => {
    const solicitud = ++solicitudActual.current;

    setCargando(true);
    setError('');

    try {
      const datos = await service.listarProductos();

      if (solicitud === solicitudActual.current) {
        setProductos(datos);
      }

      return datos;

    } catch (err) {
      if (solicitud === solicitudActual.current) {
        setProductos([]);
        setError(
          err.message || 'No se pudo cargar el catÃ¡logo.'
        );
      }

      throw err;

    } finally {
      if (solicitud === solicitudActual.current) {
        setCargando(false);
      }
    }
  }, []);

  useEffect(() => {
    cargarProductos().catch(() => {});

    return () => {
      solicitudActual.current += 1;
    };
  }, [cargarProductos]);

  async function crearProducto(datos) {
    const producto = await service.crearProducto(datos);

    await cargarProductos().catch(() => {});

    return producto;
  }

  async function modificarProducto(id, datos) {
    const producto = await service.modificarProducto(id, datos);

    await cargarProductos().catch(() => {});

    return producto;
  }

  async function eliminarProducto(id) {
    await service.eliminarProducto(id);

    await cargarProductos().catch(() => {});
  }

  async function reactivarProducto(id) {
    const producto = await service.reactivarProducto(id);

    await cargarProductos().catch(() => {});

    return producto;
  }

  return (
    <ProductosContext.Provider
      value={{
        productos,
        cargando,
        error,
        cargarProductos,
        crearProducto,
        modificarProducto,
        eliminarProducto,
        reactivarProducto
      }}
    >
      {props.children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  const contexto = useContext(ProductosContext);

  if (!contexto) {
    throw new Error(
      'useProductos debe usarse dentro de ProductosProvider'
    );
  }

  return contexto;
}