
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FormularioRegistro from '../components/organisms/FormularioRegistro';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { peticion } from '../services/api';

function Registro() {
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  useTituloPagina('Crear cuenta');

  // Registro real mediante la API REST
  const manejarRegistro = async (datos) => {
    if (cargando) return;

    setError('');
    setCargando(true);

    try {
      if (!datos?.nombre || !datos?.email || !datos?.clave) {
        throw new Error('Completa todos los campos del registro.');
      }

      await peticion('/auth/register', {
        metodo: 'POST',
        cuerpo: {
          nombre: datos.nombre.trim(),
          email: datos.email.trim(),
          clave: datos.clave
        },
        conToken: false
      });

      // Redirigir solamente si el registro fue exitoso
      navigate('/login', {
        state: { registrado: true }
      });

    } catch (err) {
      setError(
        err.message || 'No se pudo registrar el usuario.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>

            {error && (
              <Alert variant="danger">
                {error}
              </Alert>
            )}

            <FormularioRegistro
              onEnviar={manejarRegistro}
              cargando={cargando}
            />

            <p className="text-center mt-3 mb-0">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login">Inicia sesión</Link>
            </p>

          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Registro;
