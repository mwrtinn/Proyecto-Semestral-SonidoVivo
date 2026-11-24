import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FormularioRegistro from '../components/organisms/FormularioRegistro';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Registro() {
  const navigate = useNavigate();
  useTituloPagina("Crear cuenta");

  // Por ahora el registro es una simulación: valida el formulario pero no guarda la
  // cuenta (eso llega con la próxima etapa). Se manda al login con un aviso de éxito.
  const manejarRegistro = () => {
    navigate('/login', { state: { registrado: true } });
  };

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <FormularioRegistro onEnviar={manejarRegistro} />
            <p className="text-center mt-3 mb-0">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Registro;
