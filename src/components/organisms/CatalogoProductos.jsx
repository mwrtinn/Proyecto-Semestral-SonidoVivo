import TarjetaProducto from '../molecules/TarjetaProducto';
import { Container, Row, Col } from 'react-bootstrap';

function CatalogoProductos() {
  const productosBD = [
    { id: 1, nombre: "Guitarra Acústica", precio: 150000, categoria: "Cuerdas" },
    { id: 2, nombre: "Batería Eléctrica", precio: 450000, categoria: "Percusión" },
    { id: 3, nombre: "Teclado MIDI", precio: 120000, categoria: "Teclados" },
    { id: 4, nombre: "Bajo Eléctrico", precio: 220000, categoria: "Cuerdas" },
    { id: 5, nombre: "Micrófono Condensador", precio: 85000, categoria: "Audio" },
    { id: 6, nombre: "Amplificador 15W", precio: 95000, categoria: "Audio" }
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Nuestro Catálogo</h2>
      <Row className="g-4">
        {productosBD.map((producto) => (
          <Col xs={12} md={6} lg={4} key={producto.id}>
            <TarjetaProducto
              nombre={producto.nombre}
              precio={producto.precio}
              categoria={producto.categoria}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CatalogoProductos;