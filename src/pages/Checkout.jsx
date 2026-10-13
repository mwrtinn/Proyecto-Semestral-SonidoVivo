import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
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
    // Siguiente pieza: aquí se registrará el pedido con pedidoService y bajará el stock.
    // Por ahora se arma el resumen con lo que hay en el carrito, se vacía el carrito
    // y se muestra la página de compra exitosa.
    const pedido = {
      nombre: datos.nombre,
      entrega: datos.entrega,
      direccion: datos.direccion,
      items: carrito.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad
      })),
      total: totalDinero
    };
    vaciarCarrito();
    navigate('/compra-exitosa', { state: { pedido: pedido } });
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