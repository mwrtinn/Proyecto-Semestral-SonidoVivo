function Precio({ valor }) {
  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valor);

  return (
    <span className="fw-bold fs-5 text-primary">
      {precioFormateado}
    </span>
  );
}

export default Precio;