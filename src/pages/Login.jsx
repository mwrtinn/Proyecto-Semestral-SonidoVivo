import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FormularioLogin from '../components/organisms/FormularioLogin';
import { useAuth } from '../context/AuthContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { iniciarSesion } = useAuth();
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  useTituloPagina("Ingresar");

  // La página de registro envía { registrado: true }; RutaProtegida envía { desde, aviso }.
  const estado = location.state || {};
  const destino = estado.desde || '/catalogo';

  const manejarLogin = async ({ email, clave }) => {
    setEnviando(true);
    setError('');
    try {
      await iniciarSesion(email, clave);
      navigate(destino, { replace: true });
    } catch (err) {
      setError(err.message);
      setEnviando(false);
    }
  };
  useTituloPagina("Ingresar");

  // La página de registro envía { registrado: true } al navegar hasta aquí.
  const registrado = location.state && location.state.registrado;

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            {estado.registrado && (
            {registrado && (
              <Alert variant="success" className="mb-3">
                Registro completado. Ahora puedes iniciar sesión.
              </Alert>
            )}
            {estado.aviso && (
              <Alert variant="warning" className="mb-3">
                {estado.aviso}
              </Alert>
            )}
            <FormularioLogin onEnviar={manejarLogin} error={error} cargando={enviando} />
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
