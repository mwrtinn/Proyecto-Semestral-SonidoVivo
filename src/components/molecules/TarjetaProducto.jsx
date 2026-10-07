import { Card, Button } from 'react-bootstrap';
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
        
        <Button
          variant="dark"
          className="w-100"
          disabled={stock <= 0}
        >
          <i className="bi bi-cart-plus me-2"></i>
          {stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;