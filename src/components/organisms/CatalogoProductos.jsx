import {
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Button
} from 'react-bootstrap';

import TarjetaProducto from '../molecules/TarjetaProducto';
import { useCarrito } from '../../context/CartContext';
import { useProductos } from '../../context/ProductosContext';

function CatalogoProductos(props) {
  const {
    productos: productosGuardados,
    cargando,
    error,
    cargarProductos
  } = useProductos();

  const productos = props.productos || productosGuardados;

  const { agregarAlCarrito } = useCarrito();

  if (cargando) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">
          Cargando productos...
        </p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">
          <Alert.Heading>
            No se pudo cargar el catÃ¡logo
          </Alert.Heading>

          <p>{error}</p>

          <Button
            variant="outline-danger"
            onClick={() => cargarProductos().catch(() => {})}
          >
            Reintentar
          </Button>
        </Alert>
      </Container>
    );
  }

  if (productos.length === 0) {
    return (
      <Container className="my-5 text-center">
        <p className="text-muted">
          No hay productos disponibles.
        </p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {productos.map((producto) => (
          <Col key={producto.id}>
            <TarjetaProducto
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              stock={producto.stock}
              imagen={producto.imagen}
              onVerDetalle={() =>
                props.onVerDetalle(producto.id)
              }
              onAgregarCarrito={() =>
                agregarAlCarrito(producto)
              }
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CatalogoProductos;