import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Login from "./pages/Login";
import Categorias from "./pages/Categorias";  
import Ofertas from "./pages/Ofertas";
import DetalleProducto from './pages/DetalleProducto';
import Carrito from "./pages/Carrito"; 
import Checkout from "./pages/Checkout";
import ResultadoCompra from "./pages/ResultadoCompra";
import NoEncontrada from "./pages/NoEncontrada";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta principal: Muestra la página de Inicio */}
          <Route path="/" element={<Inicio />} />
          
          {/* Ruta del Catálogo */}
          <Route path="/catalogo" element={<Catalogo />} />
          
          {/* Ruta del Login */}
          <Route path="/login" element={<Login />} />

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

          {/* Ruta de Compra exitosa */}
          <Route path="/compra-exitosa" element={<ResultadoCompra />} />

          {/*Ruta de Pagina no encontrada 404*/}
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
 
export default App;
