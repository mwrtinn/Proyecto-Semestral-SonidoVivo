import { Table } from 'react-bootstrap';
import Boton from '../atoms/Boton';
import Precio from '../atoms/Precio';

function Carrito(props) {
  const clasesExtra = props.className || "";
  const productos = props.productos || [];

  if (productos.length === 0) {
    return (
      <div className={`text-center p-5 bg-light rounded ${clasesExtra}`}>
        <h4 className="text-muted">Tu carrito está vacío</h4>
        <Boton 
          variante="dark" 
          texto="Volver al catálogo" 
          onClick={props.onVolverCatalogo} 
          className="mt-4"
        />
      </div>
    );
  }

  return (
    <div className={clasesExtra}>
      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th className="text-center">Cantidad</th>
            <th className="text-end">Subtotal</th>
            <th className="text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((item) => (
            <tr key={item.id}>
              <td className="fw-bold">{item.nombre}</td>
              <td><Precio valor={item.precio} /></td>
              <td className="text-center">{item.cantidad}</td>
              <td className="text-end fw-bold">
                <Precio valor={item.precio * item.cantidad} />
              </td>
              <td className="text-center">
                <Boton 
                  variante="outline-danger" 
                  texto="Quitar" 
                  onClick={() => props.onEliminar(item.id)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-4">
        <Boton 
          variante="success" 
          texto="Ir a Pagar" 
          className="px-5 py-2 fs-5"
          onClick={props.onIrAPagar} 
        />
      </div>
    </div>
  );
}

export default Carrito;