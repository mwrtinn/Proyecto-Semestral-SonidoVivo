import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FormularioLogin from '../components/organisms/FormularioLogin';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  useTituloPagina("Ingresar");

  // La página de registro envía { registrado: true } al navegar hasta aquí.
  const registrado = location.state && location.state.registrado;

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            {registrado && (
              <Alert variant="success" className="mb-3">
                Registro completado. Ahora puedes iniciar sesión.
              </Alert>
            )}
            <FormularioLogin onEnviar={() => navigate('/catalogo')} />
            <p className="text-center mt-3 mb-0">
              ¿Aún no tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Login;