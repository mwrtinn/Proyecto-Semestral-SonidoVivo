import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Login from "./pages/Login";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";
import DetalleProducto from './pages/DetalleProducto'

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;