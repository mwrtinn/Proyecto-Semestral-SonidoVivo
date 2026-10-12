import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FormularioCheckout from '../components/organisms/FormularioCheckout';
import ResumenCompra from '../components/organisms/ResumenCompra';
import Boton from '../components/atoms/Boton';
import { useCarrito } from '../context/CartContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Checkout() {
  const navigate = useNavigate();
  const { carrito, totalDinero, vaciarCarrito } = useCarrito();

  useTituloPagina("Confirmar pedido");

  const confirmarPedido = (datos) => {
    vaciarCarrito();
    Swal.fire({
      icon: 'success',
      title: '¡Pedido recibido!',
      text: datos.entrega === 'retiro'
        ? `Gracias, ${datos.nombre}. Te esperamos en la tienda de Viña del Mar.`
        : `Gracias, ${datos.nombre}. Lo enviaremos a ${datos.direccion}.`,
      confirmButtonColor: '#212529'
    });
    navigate('/catalogo');
  };

  if (carrito.length === 0) {
    return (
      <PlantillaPublica>
        <Container className="my-5 text-center">
          <h2 className="mb-3">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">Agrega productos para poder confirmar tu pedido.</p>
          <Boton texto="Ir al catálogo" variante="dark" onClick={() => navigate('/catalogo')} />
        </Container>
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <h2 className="mb-4">Confirmar pedido</h2>
        <Row className="g-4">
          <Col xs={12} lg={7}>
            <FormularioCheckout onEnviar={confirmarPedido} />
          </Col>
          <Col xs={12} lg={5}>
            <ResumenCompra productos={carrito} total={totalDinero} />
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Checkout;
