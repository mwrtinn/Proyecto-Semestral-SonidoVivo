import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import EstadoPedido from '../components/molecules/EstadoPedido';
import ResumenCompra from '../components/organisms/ResumenCompra';
import Boton from '../components/atoms/Boton';
import { usePedidos } from '../context/PedidosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { ordenarRecientes, formatearFecha } from '../utils/pedidos';

function MisPedidos() {
  const navigate = useNavigate();
  const { pedidos } = usePedidos();
  useTituloPagina("Mis pedidos");

  const lista = ordenarRecientes(pedidos);

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <h2 className="mb-4">Mis pedidos</h2>

        {lista.length === 0 ? (
          <section className="text-center my-5">
            <p className="text-muted mb-4">Aún no has realizado pedidos en esta sesión.</p>
            <Boton texto="Explorar el catálogo" variante="dark" onClick={() => navigate('/catalogo')} />
          </section>
        ) : (
          lista.map((pedido) => (
            <section key={pedido.id} className="mb-4">
              <EstadoPedido
                className="mb-2 bg-white"
                idPedido={pedido.id}
                fecha={formatearFecha(pedido.fecha)}
                estado={pedido.estado}
              />
              <ResumenCompra
                titulo="Detalle del pedido"
                productos={pedido.items}
                total={pedido.total}
              />
            </section>
          ))
        )}
      </Container>
    </PlantillaPublica>
  );
}

export default MisPedidos;
