import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import CatalogoProductos from '../components/organisms/CatalogoProductos';

function Catalogo() {
  const navigate = useNavigate(); 

  return (
    <PlantillaPublica>
      <div className="text-center my-4">
        <h2>Nuestro Catálogo</h2>
      </div>
      
      <CatalogoProductos 
        onVerDetalle={(id) => navigate(`/producto/${id}`)}
      />
    </PlantillaPublica>
  );
}

export default Catalogo;