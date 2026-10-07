import { Container, Row, Col } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FormularioLogin from '../components/organisms/FormularioLogin';

function Login() {
  return (
    <PlantillaPublica>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <FormularioLogin />
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Login;