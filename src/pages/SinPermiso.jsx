import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import { useTituloPagina } from '../hooks/useTituloPagina';

function SinPermiso() {
  const navigate = useNavigate();
  useTituloPagina("Acceso denegado");

  return (
    <PlantillaPublica>
      <Container className="my-5 text-center py-5">
        <h1 className="display-1 fw-bold text-danger">403</h1>
        <h2 className="mb-4">Acceso denegado</h2>
        <p className="lead text-muted mb-5">
          Tu cuenta no tiene permisos para ver esta página.
        </p>
        <Boton variante="dark" texto="Volver al Inicio" onClick={() => navigate('/')} />
      </Container>
    </PlantillaPublica>
  );
}

export default SinPermiso;
