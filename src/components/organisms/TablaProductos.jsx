import { Table, Badge } from 'react-bootstrap';
import Boton from '../atoms/Boton';
import Precio from '../atoms/Precio';
import EtiquetaStock from '../atoms/EtiquetaStock';


function TablaProductos(props) {
  const clasesExtra = props.className || "";
  const productos = props.productos || [];

  if (productos.length === 0) {
    return (
      <p className={`text-center text-muted my-5 ${clasesExtra}`}>
        No hay productos registrados.
      </p>
    );
  }

  return (
    <Table responsive hover className={`align-middle ${clasesExtra}`}>
      <thead className="table-light">
        <tr>
          <th>Código</th>
          <th>Producto</th>
          <th>Categoría</th>
          <th className="text-end">Precio</th>
          <th className="text-center">Stock</th>
          <th className="text-center">Oferta</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.codigo}</td>
            <td className="fw-bold">
              {producto.nombre}
              <small className="d-block text-muted fw-normal">
                {producto.marca} {producto.modelo}
              </small>
            </td>
            <td>{producto.categoria}</td>
            <td className="text-end"><Precio valor={producto.precio} /></td>
            <td className="text-center"><EtiquetaStock cantidad={producto.stock} /></td>
            <td className="text-center">
              {producto.descuento > 0
                ? <Badge bg="danger">-{producto.descuento}%</Badge>
                : <span className="text-muted">—</span>}
            </td>
            <td className="text-center text-nowrap">
              <Boton
                variante="outline-dark"
                className="btn-sm me-2"
                texto="Editar"
                onClick={() => props.onEditar(producto)}
              />
              <Boton
                variante="outline-danger"
                className="btn-sm"
                texto="Eliminar"
                onClick={() => props.onEliminar(producto)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TablaProductos;
