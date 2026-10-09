import TarjetaProducto from '../molecules/TarjetaProducto';
import { Container, Row, Col } from 'react-bootstrap';
import productosBD from '../../data/productos.json';

function CatalogoProductos(props) {
  const clasesExtra = props.className || "";

  return (
    <Container className={clasesExtra}>
      <h2 className="text-center mb-4">Nuestro Catálogo</h2>
      <Row className="g-4">
        {productosBD.map((producto) => (
          <Col xs={12} md={6} lg={4} key={producto.id}>
            <TarjetaProducto
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              stock={producto.stock}
              categoria={producto.categoria}
              imagen={producto.imagen}
              onVerDetalle={() => props.onVerDetalle(producto.id)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CatalogoProductos;