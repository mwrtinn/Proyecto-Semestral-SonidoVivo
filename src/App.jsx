import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ProductosProvider } from './context/ProductosContext';
import { PedidosProvider } from './context/PedidosContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import RutaProtegida from './routes/RutaProtegida';

import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import ResultadoCompra from './pages/ResultadoCompra';
import MisPedidos from './pages/MisPedidos';
import NoEncontrada from './pages/NoEncontrada';
import SinPermiso from './pages/SinPermiso';
import AdminUsuarios from './pages/AdminUsuarios';
import AdminProductos from './pages/AdminProductos';

function App() {
  return (
    <AuthProvider>
      <ProductosProvider>
        <PedidosProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>

                {/* Página de inicio */}
                <Route
                  path="/"
                  element={<Inicio />}
                />

                {/* Catálogo */}
                <Route
                  path="/catalogo"
                  element={<Catalogo />}
                />

                {/* Inicio de sesión */}
                <Route
                  path="/login"
                  element={<Login />}
                />

                {/* Registro de usuarios */}
                <Route
                  path="/registro"
                  element={<Registro />}
                />

                {/* Categorías */}
                <Route
                  path="/categorias"
                  element={<Categorias />}
                />

                {/* Ofertas */}
                <Route
                  path="/ofertas"
                  element={<Ofertas />}
                />

                {/* Detalle de producto */}
                <Route
                  path="/producto/:id"
                  element={<DetalleProducto />}
                />

                {/* Carrito de compras */}
                <Route
                  path="/carrito"
                  element={<Carrito />}
                />

                {/* Confirmación de compra */}
                <Route
                  path="/checkout"
                  element={
                    <RutaProtegida>
                      <Checkout />
                    </RutaProtegida>
                  }
                />

                {/* Compra exitosa */}
                <Route
                  path="/compra-exitosa"
                  element={
                    <ResultadoCompra exito={true} />
                  }
                />

                {/* Pago fallido */}
                <Route
                  path="/pago-fallido"
                  element={
                    <ResultadoCompra exito={false} />
                  }
                />

                {/* Historial de pedidos */}
                <Route
                  path="/mis-pedidos"
                  element={
                    <RutaProtegida>
                      <MisPedidos />
                    </RutaProtegida>
                  }
                />

                {/* Administración de usuarios */}
                <Route
                  path="/admin/usuarios"
                  element={
                    <RutaProtegida roles={['Administrador']}>
                      <AdminUsuarios />
                    </RutaProtegida>
                  }
                />

                {/* Administración de productos */}
                <Route
                  path="/admin/productos"
                  element={
                    <RutaProtegida roles={['Administrador']}>
                      <AdminProductos />
                    </RutaProtegida>
                  }
                />

                {/* Acceso sin permisos */}
                <Route
                  path="/sin-permiso"
                  element={<SinPermiso />}
                />

                {/* Página no encontrada */}
                <Route
                  path="*"
                  element={<NoEncontrada />}
                />

              </Routes>
            </BrowserRouter>
          </CartProvider>
        </PedidosProvider>
      </ProductosProvider>
    </AuthProvider>
  );
}

export default App;