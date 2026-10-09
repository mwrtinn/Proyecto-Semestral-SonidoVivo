import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import CatalogoProductos from '../components/organisms/CatalogoProductos';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Catalogo() {
  const navigate = useNavigate();
  useTituloPagina("Catálogo");

  return (
    <PlantillaPublica>
      <CatalogoProductos 
        className="my-5" 
        onVerDetalle={(id) => navigate(`/producto/${id}`)}
      />
    </PlantillaPublica>
  );
}

export default Catalogo;