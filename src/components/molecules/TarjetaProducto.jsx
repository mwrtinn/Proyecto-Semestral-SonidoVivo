import Precio from '../atoms/Precio';
import EtiquetaStock from '../atoms/EtiquetaStock';

function TarjetaProducto({ nombre, descripcion, precio, stock, imagenUrl }) {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img 
        src={imagenUrl || "https://via.placeholder.com/300x200?text=Instrumento"} 
        className="card-img-top" 
        alt={nombre} 
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{nombre}</h5>
        <p className="card-text text-muted small">{descripcion}</p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Precio valor={precio} />
            <EtiquetaStock cantidad={stock} />
          </div>
          <button 
            className="btn btn-dark w-100" 
            disabled={stock <= 0}
          >
            <i className="bi bi-cart-plus me-2"></i>
            {stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TarjetaProducto;