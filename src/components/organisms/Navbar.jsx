import { Navbar as BarraBootstrap, Nav, Container, Badge, Button } from 'react-bootstrap';
import { useCarrito } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

function Navbar(props) {
  const clasesExtra = props.className || "";
  const { totalFisico } = useCarrito();
  const { usuario, cerrarSesion, tieneRol } = useAuth();

  function ir(evento, ruta) {
    evento.preventDefault();
    if (props.onNavegar) {
      props.onNavegar(ruta);
    }
  }

  function salir() {
    cerrarSesion();
    if (props.onNavegar) {
      props.onNavegar('/');
    }
  }

  return (
    <BarraBootstrap bg="dark" variant="dark" expand="lg" className={`shadow-sm ${clasesExtra}`}>
      <Container>

        <BarraBootstrap.Brand
          href="/"
          onClick={(e) => ir(e, '/')}
          className="fw-bold fs-4"
        >
          Sonido Vivo
        </BarraBootstrap.Brand>

        <BarraBootstrap.Toggle aria-controls="menu-navegacion" />

        <BarraBootstrap.Collapse id="menu-navegacion">

          <Nav className="me-auto mb-2 mb-lg-0">

            <Nav.Link href="/" onClick={(e) => ir(e, '/')}>
              Inicio
            </Nav.Link>

            <Nav.Link href="/catalogo" onClick={(e) => ir(e, '/catalogo')}>
              Catálogo
            </Nav.Link>

            <Nav.Link href="/categorias" onClick={(e) => ir(e, '/categorias')}>
              Categorías
            </Nav.Link>

            <Nav.Link href="/ofertas" onClick={(e) => ir(e, '/ofertas')}>
              Ofertas
            </Nav.Link>

            <Nav.Link href="/mis-pedidos" onClick={(e) => ir(e, '/mis-pedidos')}>
              Mis pedidos
            </Nav.Link>

            {/* Opciones exclusivas del Administrador */}
            {tieneRol('Administrador') && (
              <>
                <Nav.Link
                  href="/admin/usuarios"
                  onClick={(e) => ir(e, '/admin/usuarios')}
                >
                  Usuarios
                </Nav.Link>

                <Nav.Link
                  href="/admin/productos"
                  onClick={(e) => ir(e, '/admin/productos')}
                >
                  Productos
                </Nav.Link>
              </>
            )}

          </Nav>

          <div className="d-flex align-items-center gap-4 mt-3 mt-lg-0">

            {usuario ? (

              <div className="d-flex align-items-center gap-2 text-light small">

                <span className="fw-bold">
                  {usuario.nombre}
                </span>

                <Badge bg="secondary">
                  {usuario.rol}
                </Badge>

                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={salir}
                >
                  Cerrar sesión
                </Button>

              </div>

            ) : (

              <a
                href="/login"
                onClick={(e) => ir(e, '/login')}
                className="text-light text-decoration-none small fw-bold"
              >
                <i className="bi bi-person-circle me-1"></i>
                Iniciar Sesión
              </a>

            )}

            <Button
              variant="outline-light"
              className="position-relative"
              onClick={(e) => ir(e, '/carrito')}
            >

              <i className="bi bi-cart3 me-2"></i>

              Carrito

              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
              >
                {totalFisico}
              </Badge>

            </Button>

          </div>

        </BarraBootstrap.Collapse>

      </Container>
    </BarraBootstrap>
  );
}

export default Navbar;