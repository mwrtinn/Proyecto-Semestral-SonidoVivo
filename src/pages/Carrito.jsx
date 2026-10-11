import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import OrganismoCarrito from '../components/organisms/Carrito';
import { useCarrito } from '../context/CartContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Carrito() {
  const navigate = useNavigate();
  const { carrito, eliminarDelCarrito } = useCarrito();
  
  useTituloPagina("Mi Carrito");

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <h2 className="mb-4">Mi Carrito de Compras</h2>
        <OrganismoCarrito 
          productos={carrito}
          onEliminar={eliminarDelCarrito}
          onVolverCatalogo={() => navigate('/catalogo')}
          onIrAPagar={() => navigate('/checkout')}
        />
      </Container>
    </PlantillaPublica>
  );
}

export default Carrito;