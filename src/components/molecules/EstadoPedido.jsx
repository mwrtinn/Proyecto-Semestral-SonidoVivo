function EstadoPedido({ idPedido, estado, fecha }) {
  const colorEstado = estado === 'Entregado' ? 'bg-success' : estado === 'Enviado' ? 'bg-primary' : 'bg-warning text-dark';

  return (
    <div className="d-flex justify-content-between align-items-center border p-3 rounded shadow-sm mb-3">
      <div>
        <h6 className="mb-1 fw-bold">Pedido #{idPedido}</h6>
        <small className="text-muted">Fecha: {fecha}</small>
      </div>
      <div>
        <span className={`badge ${colorEstado} px-3 py-2 fs-6`}>
          {estado}
        </span>
      </div>
    </div>
  );
}

export default EstadoPedido;