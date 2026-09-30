function ContadorCantidad({ cantidad, onIncrementar, onDecrementar }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <button 
        className="btn btn-outline-secondary btn-sm" 
        onClick={onDecrementar}
        disabled={cantidad <= 1} // Evita que bajen a 0 o negativo desde aquí
      >
        -
      </button>
      
      <span className="fw-bold px-2">{cantidad}</span>
      
      <button 
        className="btn btn-outline-secondary btn-sm" 
        onClick={onIncrementar}
      >
        +
      </button>
    </div>
  );
}

export default ContadorCantidad;