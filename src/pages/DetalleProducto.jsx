import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Precio from '../components/atoms/Precio';
import EtiquetaStock from '../components/atoms/EtiquetaStock';
import Boton from '../components/atoms/Boton';
import productosBD from '../data/productos.json';
import imagenGenerica from '../assets/img/Productos.webp';
import { useTituloPagina } from '../hooks/useTituloPagina';

function DetalleProducto() {
  const params = useParams();
  const navigate = useNavigate();
  
  const id = Number(params.id);
  const producto = productosBD.find((p) => p.id === id);

  useTituloPagina(producto ? producto.nombre : "Producto no encontrado");

  if (!producto) {
    return (
      <PlantillaPublica>
        <Container className="my-5 text-center">
          <h2 className="mb-4">Producto no encontrado</h2>
          <p>No existe un producto con el código "{params.id}".</p>
          <Boton 
            texto="Ir al catálogo" 
            variante="dark" 
            onClick={() => navigate('/catalogo')} 
          />
        </Container>
      </PlantillaPublica>
    );
  }

  const rutaImagen = producto.imagen || imagenGenerica;

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <Boton 
          className="mb-4" 
          texto="← Volver atrás" 
          variante="outline-secondary" 
          onClick={() => navigate(-1)} 
        />
        
        <Row className="g-5 align-items-center">
          <Col xs={12} md={6}>
            <img 
              src={rutaImagen} 
              alt={producto.nombre} 
              className="img-fluid rounded shadow-sm w-100"
              style={{ objectFit: "cover", maxHeight: "500px" }}
            />
          </Col>
          
          <Col xs={12} md={6}>
            <span className="text-uppercase text-muted small fw-bold">
              {producto.categoria}
            </span>
            <h1 className="display-5 fw-bold mb-3">{producto.nombre}</h1>
            
            <p className="lead text-muted mb-4">
              {producto.descripcion}
            </p>
            
            <div className="d-flex align-items-center gap-4 mb-4">
              <Precio className="fs-3 text-primary" valor={producto.precio} />
              <EtiquetaStock cantidad={producto.stock} />
            </div>
            
            <hr className="my-4" />
            
            <div className="d-grid">
              <Boton 
                className="py-3 fs-5" 
                texto={producto.stock > 0 ? "Agregar al Carrito" : "Agotado"} 
                variante="dark"
                disabled={producto.stock <= 0}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default DetalleProducto;