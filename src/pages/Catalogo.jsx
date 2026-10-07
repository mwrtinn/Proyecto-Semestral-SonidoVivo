import PlantillaPublica from '../components/templates/PlantillaPublica';
import CatalogoProductos from '../components/organisms/CatalogoProductos';

function Catalogo() {
  return (
    <PlantillaPublica>
      <CatalogoProductos className="my-5" />
    </PlantillaPublica>
  );
}

export default Catalogo;