import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Container, Row, Col, Alert, Stack } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import ResumenCompra from '../components/organisms/ResumenCompra';
import Boton from '../components/atoms/Boton';
import { useTituloPagina } from '../hooks/useTituloPagina';


function ResultadoCompra() {
  const navigate = useNavigate();
  const location = useLocation();
  const datos = location.state || {};

  useTituloPagina("Compra exitosa");

  
  if (!datos.pedido) {
    return <Navigate to="/catalogo" replace />;
  }

  const pedido = datos.pedido;

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={7}>
            <Alert variant="success" className="mb-4">
              <Alert.Heading>¡Compra exitosa!</Alert.Heading>
              <p className="mb-0">
                Gracias, {pedido.nombre}.{' '}
                {pedido.entrega === 'retiro'
                  ? 'Te esperamos en nuestra tienda de Viña del Mar.'
                  : `Lo enviaremos a ${pedido.direccion}.`}
              </p>
            </Alert>
            <ResumenCompra
              className="mb-4"
              productos={pedido.items}
              total={pedido.total}
            />
            <Stack direction="horizontal" gap={2} className="justify-content-center">
              <Boton texto="Seguir comprando" variante="dark" onClick={() => navigate('/catalogo')} />
            </Stack>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default ResultadoCompra;
