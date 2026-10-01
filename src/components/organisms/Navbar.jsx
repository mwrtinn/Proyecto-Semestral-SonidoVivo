import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4" href="/">
          Sonido Vivo
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#menuNavegacion"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="menuNavegacion">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/catalogo">Catálogo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/luthier">Servicio de Luthier</a>
            </li>
          </ul>
          
          <div className="d-flex align-items-center gap-4">
            {/* Enlace para cumplir con el requisito de Autenticación de la capa de Seguridad */}
            <a href="/login" className="text-light text-decoration-none small fw-bold">
              <i className="bi bi-person-circle me-1"></i> Iniciar Sesión
            </a>
            
            <button className="btn btn-outline-light position-relative">
              <i className="bi bi-cart3 me-2"></i>
              Carrito
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;