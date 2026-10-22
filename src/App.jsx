import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductosProvider } from './context/ProductosContext';
import { PedidosProvider } from './context/PedidosContext';
import { CartProvider } from './context/CartContext';
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Categorias from "./pages/Categorias";  
import Ofertas from "./pages/Ofertas";
import DetalleProducto from './pages/DetalleProducto';
import Carrito from "./pages/Carrito"; 
import Checkout from "./pages/Checkout";
import ResultadoCompra from "./pages/ResultadoCompra";
import MisPedidos from "./pages/MisPedidos";
import NoEncontrada from "./pages/NoEncontrada";

function App() {
  return (
    // El orden importa: CartProvider usa los productos (para revisar el stock),
    // así que ProductosProvider tiene que envolverlo.
    <ProductosProvider>
      <PedidosProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Ruta principal: Muestra la página de Inicio */}
              <Route path="/" element={<Inicio />} />
          
              {/* Ruta del Catálogo */}
              <Route path="/catalogo" element={<Catalogo />} />
          
              {/* Ruta del Login */}
              <Route path="/login" element={<Login />} />

              {/* Ruta del Registro */}
            <Route path="/registro" element={<Registro />} />

            {/* Ruta de Categorias */}
              <Route path="/categorias" element={<Categorias />} />

              {/* Ruta de Ofertas */}
              <Route path="/ofertas" element={<Ofertas />} />

              {/* Ruta de Detalle de Producto */}
              <Route path="/producto/:id" element={<DetalleProducto />} />

              {/* Ruta de Carrito */}
              <Route path="/carrito" element={<Carrito />} />

              {/* Ruta de Checkout */}
              <Route path="/checkout" element={<Checkout />} />

              {/* Resultado de la compra: la misma página con dos resultados */}
              <Route path="/compra-exitosa" element={<ResultadoCompra exito={true} />} />
              <Route path="/pago-fallido" element={<ResultadoCompra exito={false} />} />

              {/* Pedidos realizados */}
              <Route path="/mis-pedidos" element={<MisPedidos />} />

              {/*Ruta de Pagina no encontrada 404*/}
              <Route path="*" element={<NoEncontrada />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </PedidosProvider>
    </ProductosProvider>
  );
}
 
export default App;
