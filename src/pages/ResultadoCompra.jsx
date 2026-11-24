import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Container, Row, Col, Alert, Stack } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import ResumenCompra from '../components/organisms/ResumenCompra';
import Boton from '../components/atoms/Boton';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Una sola página para los dos resultados: App.jsx la usa en dos rutas,
// /compra-exitosa (exito={true}) y /pago-fallido (exito={false}).
// Los datos del resultado llegan desde Checkout por el "state" de la navegación.
function ResultadoCompra(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const exito = props.exito === true;
  const datos = location.state || {};

  useTituloPagina(exito ? "Compra exitosa" : "Pago fallido");

  // Si alguien escribe /compra-exitosa a mano, no hay compra que mostrar.
  if (exito && !datos.pedido) {
    return <Navigate to="/catalogo" replace />;
  }

  if (!exito) {
    return (
      <PlantillaPublica>
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={7}>
              <Alert variant="danger" className="mb-4">
                <Alert.Heading>No pudimos completar tu pago</Alert.Heading>
                <p className="mb-0">
                  {datos.motivo || 'Ocurrió un problema al procesar tu pedido.'} No se realizó ningún cobro y tu carrito sigue guardado.
                </p>
              </Alert>
              <Stack direction="horizontal" gap={2} className="justify-content-center flex-wrap">
                <Boton texto="Volver al carrito" variante="dark" onClick={() => navigate('/carrito')} />
                <Boton texto="Seguir comprando" variante="outline-dark" onClick={() => navigate('/catalogo')} />
              </Stack>
            </Col>
          </Row>
        </Container>
      </PlantillaPublica>
    );
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
                Gracias, {pedido.nombre}. Tu pedido #{pedido.id} fue recibido y está <strong>{pedido.estado}</strong>.{' '}
                {pedido.entrega === 'retiro'
                  ? 'Te esperamos en nuestra tienda de Viña del Mar.'
                  : `Lo enviaremos a ${pedido.direccion}.`}
              </p>
            </Alert>
            <ResumenCompra
              className="mb-4"
              titulo="Detalle del pedido"
              productos={pedido.items}
              total={pedido.total}
            />
            <Stack direction="horizontal" gap={2} className="justify-content-center flex-wrap">
              <Boton texto="Ver mis pedidos" variante="dark" onClick={() => navigate('/mis-pedidos')} />
              <Boton texto="Seguir comprando" variante="outline-dark" onClick={() => navigate('/catalogo')} />
            </Stack>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default ResultadoCompra;
