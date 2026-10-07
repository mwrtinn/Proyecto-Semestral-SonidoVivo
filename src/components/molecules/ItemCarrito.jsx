import Precio from '../atoms/Precio';
import ContadorCantidad from '../atoms/ContadorCantidad';

function ItemCarrito(props) {
  const clasesExtra = props.className || "";
  const precioUnitario = props.precioUnitario || 0;
  const cantidad = props.cantidad || 0;

  return (
    <div className={`d-flex align-items-center justify-content-between border-bottom py-3 ${clasesExtra}`}>
      <div>
        <h6 className="mb-0 fw-bold">{props.nombre}</h6>
        <Precio valor={precioUnitario} />
      </div>

      <div className="d-flex align-items-center gap-4">
        <ContadorCantidad
          cantidad={cantidad}
          onIncrementar={props.onIncrementar}
          onDecrementar={props.onDecrementar}
        />
        <div className="text-end" style={{ minWidth: '90px' }}>
          <Precio valor={precioUnitario * cantidad} />
        </div>
        <button className="btn btn-outline-danger btn-sm" onClick={props.onEliminar}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default ItemCarrito;