import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Login from "./pages/Login";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;