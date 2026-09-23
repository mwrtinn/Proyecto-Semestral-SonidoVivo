import { Container, Row, Col } from 'react-bootstrap';
import FormularioLogin from '../components/organisms/FormularioLogin';

function Login() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <FormularioLogin />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;