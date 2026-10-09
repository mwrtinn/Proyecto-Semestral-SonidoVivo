import { Card } from 'react-bootstrap'; 
import Boton from '../atoms/Boton'; 
import Precio from '../atoms/Precio';
import EtiquetaStock from '../atoms/EtiquetaStock';
import imagenGenerica from '../../assets/img/Productos.webp';

function TarjetaProducto(props) {
  const clasesExtra = props.className || "";
  const stock = props.stock || 0;
  const rutaImagen = props.imagen || imagenGenerica;

  return (
    <Card className={`h-100 shadow-sm border-0 ${clasesExtra}`}>
      <div style={{ height: "200px", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={rutaImagen}
          alt={props.nombre}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-5 fw-bold">{props.nombre}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {props.descripcion}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mb-3 mt-auto">
          <Precio valor={props.precio} />
          <EtiquetaStock cantidad={stock} />
        </div>
        
        <div className="d-grid gap-2 mt-auto">
          <Boton
            variante="outline-dark"
            onClick={props.onVerDetalle}
            texto="Ver Detalle"
          />
          
          <Boton
            variante="dark"
            disabled={stock <= 0}
            texto={stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;