import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';

function Inicio() {
  return (
    <PlantillaPublica>
      <Container className="my-5">
        <Row className="justify-content-center text-center">
          <Col xs={12} md={10} lg={8} className="p-5 bg-light rounded-3 shadow-sm border">
            <h1 className="display-4 fw-bold">Bienvenido a Sonido Vivo</h1>
            <p className="lead mt-3 text-muted">
              Tu tienda especializada en instrumentos musicales, equipos de sonido y accesorios en Viña del Mar.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
              <Button as={Link} to="/catalogo" variant="dark" size="lg" className="px-4 fw-bold">
                Explorar Catálogo
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Inicio;