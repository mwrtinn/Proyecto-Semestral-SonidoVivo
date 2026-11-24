
import { Container, Row, Col } from 'react-bootstrap';
import TarjetaProducto from '../molecules/TarjetaProducto';
import { useCarrito } from '../../context/CartContext';
import { useProductos } from '../../context/ProductosContext';

function CatalogoProductos(props) {
  const { productos: productosGuardados } = useProductos();
  const productos = props.productos || productosGuardados;
  const { agregarAlCarrito } = useCarrito();

  console.log('Productos del Context:', productosGuardados.length);
  console.log('Productos del catálogo:', productos.length);
  console.log('Primer producto:', productos[0]);

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
              onVerDetalle={() => props.onVerDetalle(producto.id)}
              onAgregarCarrito={() => agregarAlCarrito(producto)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CatalogoProductos;
