function EtiquetaStock(props) {
  const cantidad = props.cantidad || 0;
  const clasesExtra = props.className || "";
  const hayStock = cantidad > 0;

  return (
    <span className={`badge ${hayStock ? 'bg-success' : 'bg-danger'} ${clasesExtra}`}>
      {hayStock ? `En stock: ${cantidad}` : 'Agotado'}
    </span>
  );
}

export default EtiquetaStock;