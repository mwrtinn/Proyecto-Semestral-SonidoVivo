import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FormularioCheckout from '../components/organisms/FormularioCheckout';
import ResumenCompra from '../components/organisms/ResumenCompra';
import Boton from '../components/atoms/Boton';
import { useCarrito } from '../context/CartContext';
import { useProductos } from '../context/ProductosContext';
import { usePedidos } from '../context/PedidosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Checkout() {
  const navigate = useNavigate();
  const { carrito, totalDinero, vaciarCarrito } = useCarrito();
  const { descontarStock } = useProductos();
  const { crearPedido } = usePedidos();

  useTituloPagina("Confirmar pedido");

  const confirmarPedido = (datos) => {
    // 1) El stock baja al confirmar. Si no alcanza para algún producto, la compra
    //    NO se realiza: se muestra la página de pago fallido y el carrito queda como estaba.
    const resultado = descontarStock(carrito);
    if (!resultado.ok) {
      navigate('/pago-fallido', { state: { motivo: resultado.mensaje } });
      return;
    }

    // 2) Se guarda el pedido con lo que se compró y los datos de entrega.
    const pedido = crearPedido({
      nombre: datos.nombre,
      email: datos.email,
      telefono: datos.telefono,
      entrega: datos.entrega,
      direccion: datos.direccion,
      items: carrito.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad
      })),
      total: totalDinero
    });

    // 3) Se vacía el carrito y se muestra la página de compra exitosa.
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
