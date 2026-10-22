import { Card, ListGroup } from 'react-bootstrap';
import Precio from '../atoms/Precio';

// Organismo: muestra el detalle de una compra (productos, cantidades y total).
// Es solo de lectura y no conoce el router ni el context: la página le entrega
// los datos por props (por ejemplo, productos={carrito} total={totalDinero}).
function ResumenCompra(props) {
  const clasesExtra = props.className || "";
  const productos = props.productos || [];
  const titulo = props.titulo || "Resumen de tu compra";

  // Si la página no envía el total, se calcula aquí a partir de los productos.
  const total = props.total !== undefined
    ? props.total
    : productos.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  return (
    <Card className={`shadow-sm ${clasesExtra}`}>
      <Card.Header as="h5" className="fw-bold bg-white">
        {titulo}
      </Card.Header>

      {productos.length === 0 ? (
        <Card.Body as="p" className="text-muted mb-0">
          No hay productos en tu compra.
        </Card.Body>
      ) : (
        <>
          <ListGroup as="ul" variant="flush">
            {productos.map((item) => (
              <ListGroup.Item
                as="li"
                key={item.id}
                className="d-flex justify-content-between align-items-start gap-3"
              >
                <span>
                  <strong className="d-block">{item.nombre}</strong>
                  <small className="text-muted">Cantidad: {item.cantidad}</small>
                </span>
                <Precio valor={item.precio * item.cantidad} />
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Card.Footer className="d-flex justify-content-between align-items-center bg-white">
            <span className="fs-5 fw-bold">Total</span>
            <Precio className="fs-4" valor={total} />
          </Card.Footer>
        </>
      )}
    </Card>
  );
}

export default ResumenCompra;
