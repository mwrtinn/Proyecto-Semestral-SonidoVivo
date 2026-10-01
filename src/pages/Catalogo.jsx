import { Container, Row, Col } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import CatalogoProductos from '../components/organisms/CatalogoProductos';

function Catalogo() {
  return (
    <PlantillaPublica>
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col xs={12}>
            <CatalogoProductos />
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Catalogo;