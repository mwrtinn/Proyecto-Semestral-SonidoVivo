import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import { useTituloPagina } from '../hooks/useTituloPagina';

function NoEncontrada() {
  const navigate = useNavigate();
  useTituloPagina("Página no encontrada");

  return (
    <PlantillaPublica>
      <Container className="my-5 text-center py-5">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mb-4">Página no encontrada</h2>
        <p className="lead text-muted mb-5">
          Lo sentimos, la página que intentas buscar no existe o fue movida.
        </p>
        <Boton
          variante="dark"
          texto="Volver al Inicio"
          onClick={() => navigate('/')}
        />
      </Container>
    </PlantillaPublica>
  );
}

export default NoEncontrada;