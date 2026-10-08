import { Navbar as BarraBootstrap, Nav, Container, Badge, Button } from 'react-bootstrap';

function Navbar(props) {
  const clasesExtra = props.className || "";

  function ir(evento, ruta) {
    evento.preventDefault();
    if (props.onNavegar) {
      props.onNavegar(ruta);
    }
  }

  return (
    <BarraBootstrap bg="dark" variant="dark" expand="lg" className={`shadow-sm ${clasesExtra}`}>
      <Container>
        <BarraBootstrap.Brand href="/" onClick={(e) => ir(e, '/')} className="fw-bold fs-4">
          Sonido Vivo
        </BarraBootstrap.Brand>
        <BarraBootstrap.Toggle aria-controls="menu-navegacion" />
        <BarraBootstrap.Collapse id="menu-navegacion">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link href="/" onClick={(e) => ir(e, '/')}>Inicio</Nav.Link>
            <Nav.Link href="/catalogo" onClick={(e) => ir(e, '/catalogo')}>Catálogo</Nav.Link>
            <Nav.Link href="/categorias" onClick={(e) => ir(e, '/categorias')}>Categorías</Nav.Link>
            <Nav.Link href="/ofertas" onClick={(e) => ir(e, '/ofertas')}>Ofertas</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-4 mt-3 mt-lg-0">
            <a href="/login" onClick={(e) => ir(e, '/login')} className="text-light text-decoration-none small fw-bold">
              <i className="bi bi-person-circle me-1"></i> Iniciar Sesión
            </a>
            <Button variant="outline-light" className="position-relative">
              <i className="bi bi-cart3 me-2"></i>
              Carrito
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                0
              </Badge>
            </Button>
          </div>
        </BarraBootstrap.Collapse>
      </Container>
    </BarraBootstrap>
  );
}

export default Navbar;