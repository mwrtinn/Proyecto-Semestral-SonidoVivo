function EtiquetaStock({ cantidad }) {
  const hayStock = cantidad > 0;

  return (
    <span className={`badge ${hayStock ? 'bg-success' : 'bg-danger'}`}>
      {hayStock ? `En stock: ${cantidad}` : 'Agotado'}
    </span>
  );
}

export default EtiquetaStock;