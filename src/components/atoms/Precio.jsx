function Precio(props) {
  const valor = props.valor || 0;
  const clasesExtra = props.className || "";

  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valor);

  return (
    <span className={`fw-bold ${clasesExtra}`}>
      {precioFormateado}
    </span>
  );
}

export default Precio;