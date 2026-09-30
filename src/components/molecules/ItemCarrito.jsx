import Precio from '../atoms/Precio';
import ContadorCantidad from '../atoms/ContadorCantidad';

function ItemCarrito({ nombre, precioUnitario, cantidad, onIncrementar, onDecrementar, onEliminar }) {
  return (
    <div className="d-flex align-items-center justify-content-between border-bottom py-3">
      <div>
        <h6 className="mb-0 fw-bold">{nombre}</h6>
        <Precio valor={precioUnitario} />
      </div>
      
      <div className="d-flex align-items-center gap-4">
        <ContadorCantidad 
          cantidad={cantidad} 
          onIncrementar={onIncrementar} 
          onDecrementar={onDecrementar} 
        />
        <div className="text-end" style={{ minWidth: '90px' }}>
          <Precio valor={precioUnitario * cantidad} />
        </div>
        <button className="btn btn-outline-danger btn-sm" onClick={onEliminar}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default ItemCarrito;