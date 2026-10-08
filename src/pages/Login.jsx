import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FormularioLogin from '../components/organisms/FormularioLogin';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Login() {
  const navigate = useNavigate();
  useTituloPagina("Ingresar");

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <FormularioLogin onEnviar={() => navigate('/catalogo')} />
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Login;