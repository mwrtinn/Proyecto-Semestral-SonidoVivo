import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';

function BarraNavegacion(props) {
  const clasesExtra = props.className || "";

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={`shadow-sm ${clasesExtra}`}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          Sonido Vivo
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="menu-navegacion" />
        
        <Navbar.Collapse id="menu-navegacion">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={Link} to="/ofertas">Ofertas</Nav.Link>
          </Nav>
          
          <div className="d-flex align-items-center gap-4 mt-3 mt-lg-0">
            <Link to="/login" className="text-light text-decoration-none small fw-bold">
              <i className="bi bi-person-circle me-1"></i> Iniciar Sesión
            </Link>
            
            <Button variant="outline-light" className="position-relative">
              <i className="bi bi-cart3 me-2"></i>
              Carrito
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                0
              </Badge>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraNavegacion;