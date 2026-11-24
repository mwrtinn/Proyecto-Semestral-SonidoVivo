
import { Alert, Container } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from '../hooks/useTituloPagina';

function MisPedidos() {

  useTituloPagina('Mis pedidos');

  return (
    <PlantillaPublica>
      <Container className="my-5">

        <h2>Mis pedidos</h2>

        <Alert variant="warning">
          El historial aún no está conectado a la API.
        </Alert>

      </Container>
    </PlantillaPublica>
  );
}

export default MisPedidos;
