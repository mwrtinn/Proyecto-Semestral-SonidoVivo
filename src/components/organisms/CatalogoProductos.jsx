import { Container, Row, Col } from 'react-bootstrap';
import TarjetaProducto from '../molecules/TarjetaProducto';
import { useCarrito } from '../../context/CartContext';
import productosBD from '../../data/productos.json'; 

function CatalogoProductos(props) {
  const productos = props.productos || productosBD; 
  const { agregarAlCarrito } = useCarrito(); 

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