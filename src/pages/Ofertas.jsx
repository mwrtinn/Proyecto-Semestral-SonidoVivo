import { Container, Row, Col, Badge } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import TarjetaProducto from '../components/molecules/TarjetaProducto';
import productosBD from '../data/productos.json';

function Ofertas() {
  const productosEnOferta = productosBD.filter(
    (producto) => producto.enOferta === true || (producto.descuento && producto.descuento > 0)
  );

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">🔥 Ofertas Especiales</h2>
          <p className="text-muted fs-5">
            Aprovecha los descuentos exclusivos de la semana en instrumentos y equipos seleccionados.
          </p>
        </div>

        <Row className="g-4">
          {productosEnOferta.length > 0 ? (
            productosEnOferta.map((producto) => {
              const precioCalculado = producto.descuento
                ? Math.round(producto.precio * (1 - producto.descuento / 100))
                : producto.precio;

              return (
                <Col xs={12} md={6} lg={4} key={producto.id}>
                  <div className="position-relative">
                    {producto.descuento && (
                      <Badge
                        bg="danger"
                        className="position-absolute top-0 end-0 m-3 z-3 fs-6 shadow-sm"
                      >
                        -{producto.descuento}% OFF
                      </Badge>
                    )}

                    <TarjetaProducto
                      nombre={producto.nombre}
                      descripcion={producto.descripcion}
                      precio={precioCalculado}
                      stock={producto.stock}
                      imagenUrl={producto.imagenUrl}
                    />
                  </div>
                </Col>
              );
            })
          ) : (
            <Col xs={12}>
              <p className="text-center text-muted fs-5 my-5">
                No hay productos en oferta por esta semana. ¡Vuelve pronto!
              </p>
            </Col>
          )}
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Ofertas;