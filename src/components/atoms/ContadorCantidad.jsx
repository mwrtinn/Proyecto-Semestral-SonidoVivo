function ContadorCantidad(props) {
  const cantidad = props.cantidad || 0;
  const clasesExtra = props.className || "";

  return (
    <div className={`d-flex align-items-center gap-2 ${clasesExtra}`}>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={props.onDecrementar}
        disabled={cantidad <= 1} 
      >
        -
      </button>
      <span className="fw-bold px-2">{cantidad}</span>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={props.onIncrementar}
      >
        +
      </button>
    </div>
  );
}

export default ContadorCantidad;