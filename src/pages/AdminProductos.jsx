import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Alert,
  Badge,
  Card,
  Spinner
} from 'react-bootstrap';

import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { useProductos } from '../context/ProductosContext';

import {
  listarProductosAdmin,
  crearProducto,
  modificarProducto,
  eliminarProducto,
  reactivarProducto
} from '../services/productos';

const formularioInicial = {
  codigo: '',
  categoria: '',
  nombre: '',
  marca: '',
  modelo: '',
  stock: 0,
  precio: 0,
  descripcion: '',
  imagen: '',
  enOferta: false,
  descuento: 0
};

function AdminProductos() {
  useTituloPagina('Administración de productos');

  const { cargarProductos } = useProductos();

  const [productos, setProductos] = useState([]);
  const [formulario, setFormulario] = useState({
    ...formularioInicial
  });

  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [buscar, setBuscar] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  const cargarListado = useCallback(async () => {
    setCargando(true);

    try {
      const datos = await listarProductosAdmin();

      setProductos(datos);
    } catch (err) {
      setError(
        err.message || 'No se pudieron cargar los productos.'
      );

      throw err;
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarListado().catch(() => {});
  }, [cargarListado]);

  const limpiarFormulario = () => {
    setFormulario({ ...formularioInicial });
    setEditando(null);
    setMostrarFormulario(false);
  };

  const nuevoProducto = () => {
    setFormulario({ ...formularioInicial });
    setEditando(null);
    setError('');
    setMensaje('');
    setMostrarFormulario(true);
  };

  const editarProducto = (producto) => {
    setFormulario({
      codigo: producto.codigo,
      categoria: producto.categoria,
      nombre: producto.nombre,
      marca: producto.marca || '',
      modelo: producto.modelo || '',
      stock: producto.stock,
      precio: producto.precio,
      descripcion: producto.descripcion || '',
      imagen: producto.imagen || '',
      enOferta: producto.enOferta,
      descuento: producto.descuento
    });

    setEditando(producto.id);
    setError('');
    setMensaje('');
    setMostrarFormulario(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;

    setFormulario(actual => ({
      ...actual,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'enOferta' && !checked
        ? { descuento: 0 }
        : {})
    }));
  };

  const sincronizarCatalogo = async () => {
    const resultados = await Promise.allSettled([
      cargarListado(),
      cargarProductos()
    ]);

    if (resultados.some(r => r.status === 'rejected')) {
      setError(
        'El cambio fue guardado, pero no se pudo actualizar todo el catálogo. Recarga la página.'
      );
    }
  };

  const guardarProducto = async (e) => {
    e.preventDefault();

    if (guardando) return;

    setGuardando(true);
    setError('');
    setMensaje('');

    try {
      const datos = {
        ...formulario,
        descuento: formulario.enOferta
          ? formulario.descuento
          : 0
      };

      if (editando !== null) {
        await modificarProducto(editando, datos);

        setMensaje('Producto modificado correctamente.');
      } else {
        await crearProducto(datos);

        setMensaje('Producto creado correctamente.');
      }

      limpiarFormulario();

      await sincronizarCatalogo();

    } catch (err) {
      setError(
        err.message || 'No se pudo guardar el producto.'
      );
    } finally {
      setGuardando(false);
    }
  };

  const cambiarEstado = async (producto) => {
    if (guardando) return;

    const accion = producto.activo
      ? 'desactivar'
      : 'reactivar';

    const confirmar = window.confirm(
      `¿Deseas ${accion} el producto "${producto.nombre}"?`
    );

    if (!confirmar) return;

    setGuardando(true);
    setError('');
    setMensaje('');

    try {
      if (producto.activo) {
        await eliminarProducto(producto.id);

        setMensaje('Producto desactivado correctamente.');
      } else {
        await reactivarProducto(producto.id);

        setMensaje('Producto reactivado correctamente.');
      }

      limpiarFormulario();

      await sincronizarCatalogo();

    } catch (err) {
      setError(
        err.message || 'No se pudo cambiar el estado.'
      );
    } finally {
      setGuardando(false);
    }
  };

  const productosFiltrados = productos.filter(producto => {
    const texto = buscar.trim().toLowerCase();

    const coincideBusqueda = [
      producto.codigo,
      producto.nombre,
      producto.categoria,
      producto.marca
    ].some(valor =>
      String(valor || '').toLowerCase().includes(texto)
    );

    const coincideEstado =
      filtroEstado === 'todos' ||
      (filtroEstado === 'activos' && producto.activo) ||
      (filtroEstado === 'inactivos' && !producto.activo);

    return coincideBusqueda && coincideEstado;
  });

  const formatearPrecio = (precio) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);

  return (
    <PlantillaPublica>
      <Container className="my-5">

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

          <div>
            <h2 className="mb-1">
              Administración de productos
            </h2>

            <p className="text-muted mb-0">
              Gestiona el catálogo de SonidoVivo.
            </p>
          </div>

          <div className="d-flex flex-wrap gap-2">

            <Button
              as={Link}
              to="/admin/usuarios"
              variant="outline-dark"
            >
              Administrar usuarios
            </Button>

            <Button
              variant="dark"
              onClick={nuevoProducto}
              disabled={guardando || cargando}
            >
              + Nuevo producto
            </Button>

          </div>
        </div>

        {error && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        {mensaje && (
          <Alert
            variant="success"
            dismissible
            onClose={() => setMensaje('')}
          >
            {mensaje}
          </Alert>
        )}

        <Row className="g-3 mb-4">

          <Col xs={12} md={4}>
            <Card className="shadow-sm text-center">
              <Card.Body>
                <p className="text-muted mb-1">
                  Total de productos
                </p>

                <h3>{productos.length}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="shadow-sm text-center">
              <Card.Body>
                <p className="text-muted mb-1">
                  Productos activos
                </p>

                <h3 className="text-success">
                  {productos.filter(p => p.activo).length}
                </h3>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="shadow-sm text-center">
              <Card.Body>
                <p className="text-muted mb-1">
                  Productos inactivos
                </p>

                <h3 className="text-danger">
                  {productos.filter(p => !p.activo).length}
                </h3>
              </Card.Body>
            </Card>
          </Col>

        </Row>

        {mostrarFormulario && (
          <Card className="mb-4 shadow-sm">

            <Card.Header className="fw-bold">
              {editando !== null
                ? 'Editar producto'
                : 'Crear nuevo producto'}
            </Card.Header>

            <Card.Body>

              <Form onSubmit={guardarProducto}>

                <fieldset disabled={guardando}>

                  <Row className="g-3">

                    {[
                      ['codigo', 'Código', 30, true],
                      ['nombre', 'Nombre', 150, true],
                      ['categoria', 'Categoría', 100, true],
                      ['marca', 'Marca', 100, false],
                      ['modelo', 'Modelo', 100, false]
                    ].map(([campo, etiqueta, maximo, requerido]) => (

                      <Col
                        xs={12}
                        md={6}
                        key={campo}
                      >
                        <Form.Group controlId={`producto-${campo}`}>

                          <Form.Label>
                            {etiqueta}
                          </Form.Label>

                          <Form.Control
                            name={campo}
                            value={formulario[campo]}
                            onChange={manejarCambio}
                            maxLength={maximo}
                            required={requerido}
                          />

                        </Form.Group>
                      </Col>

                    ))}

                    <Col xs={12} md={6}>
                      <Form.Group controlId="producto-precio">

                        <Form.Label>
                          Precio (CLP)
                        </Form.Label>

                        <Form.Control
                          type="number"
                          name="precio"
                          min="0"
                          max="2147483647"
                          step="1"
                          value={formulario.precio}
                          onChange={manejarCambio}
                          required
                        />

                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="producto-stock">

                        <Form.Label>Stock</Form.Label>

                        <Form.Control
                          type="number"
                          name="stock"
                          min="0"
                          max="2147483647"
                          step="1"
                          value={formulario.stock}
                          onChange={manejarCambio}
                          required
                        />

                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="producto-descripcion">

                        <Form.Label>Descripción</Form.Label>

                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="descripcion"
                          maxLength={10000}
                          value={formulario.descripcion}
                          onChange={manejarCambio}
                        />

                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="producto-imagen">

                        <Form.Label>
                          URL de imagen (opcional)
                        </Form.Label>

                        <Form.Control
                          name="imagen"
                          maxLength={2000}
                          value={formulario.imagen}
                          onChange={manejarCambio}
                          placeholder="https://..."
                        />

                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>

                      <Form.Check
                        type="checkbox"
                        id="producto-oferta"
                        label="Producto en oferta"
                        name="enOferta"
                        checked={formulario.enOferta}
                        onChange={manejarCambio}
                      />

                    </Col>

                    {formulario.enOferta && (

                      <Col xs={12} md={6}>
                        <Form.Group controlId="producto-descuento">

                          <Form.Label>
                            Descuento (%)
                          </Form.Label>

                          <Form.Control
                            type="number"
                            name="descuento"
                            min="0"
                            max="100"
                            step="1"
                            value={formulario.descuento}
                            onChange={manejarCambio}
                            required
                          />

                        </Form.Group>
                      </Col>

                    )}

                  </Row>

                  <div className="d-flex gap-2 mt-4">

                    <Button
                      type="submit"
                      variant="dark"
                      disabled={guardando}
                    >
                      {guardando
                        ? 'Guardando...'
                        : 'Guardar producto'}
                    </Button>

                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={limpiarFormulario}
                    >
                      Cancelar
                    </Button>

                  </div>

                </fieldset>

              </Form>

            </Card.Body>

          </Card>
        )}

        <Card className="shadow-sm">

          <Card.Body>

            <Row className="g-3 mb-4">

              <Col xs={12} md={6}>

                <Form.Control
                  type="search"
                  placeholder="Buscar por nombre, código o categoría"
                  aria-label="Buscar productos"
                  value={buscar}
                  onChange={e => setBuscar(e.target.value)}
                />

              </Col>

              <Col xs={12} md={4}>

                <Form.Select
                  aria-label="Filtrar estado"
                  value={filtroEstado}
                  onChange={e =>
                    setFiltroEstado(e.target.value)
                  }
                >
                  <option value="todos">
                    Todos los productos
                  </option>

                  <option value="activos">
                    Solo activos
                  </option>

                  <option value="inactivos">
                    Solo inactivos
                  </option>
                </Form.Select>

              </Col>

              <Col xs={12} md={2}>

                <Button
                  variant="outline-dark"
                  className="w-100"
                  disabled={cargando || guardando}
                  onClick={() => {
                    setError('');
                    cargarListado().catch(() => {});
                  }}
                >
                  Actualizar
                </Button>

              </Col>

            </Row>

            {cargando ? (

              <div className="text-center py-5">

                <Spinner
                  animation="border"
                  role="status"
                />

                <p className="mt-3">
                  Cargando productos...
                </p>

              </div>

            ) : (

              <Table
                responsive
                striped
                bordered
                hover
                className="align-middle"
              >

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>

                </thead>

                <tbody>

                  {productosFiltrados.length === 0 && (

                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-4"
                      >
                        No se encontraron productos.
                      </td>
                    </tr>

                  )}

                  {productosFiltrados.map(producto => (

                    <tr key={producto.id}>

                      <td>{producto.id}</td>

                      <td>{producto.codigo}</td>

                      <td>{producto.nombre}</td>

                      <td>{producto.categoria}</td>

                      <td>
                        {formatearPrecio(producto.precio)}
                      </td>

                      <td>{producto.stock}</td>

                      <td>

                        <Badge
                          bg={
                            producto.activo
                              ? 'success'
                              : 'secondary'
                          }
                        >
                          {producto.activo
                            ? 'Activo'
                            : 'Inactivo'}
                        </Badge>

                      </td>

                      <td>

                        <div className="d-flex flex-wrap gap-2">

                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() =>
                              editarProducto(producto)
                            }
                            disabled={guardando}
                          >
                            Editar
                          </Button>

                          <Button
                            size="sm"
                            variant={
                              producto.activo
                                ? 'outline-danger'
                                : 'outline-success'
                            }
                            onClick={() =>
                              cambiarEstado(producto)
                            }
                            disabled={guardando}
                          >
                            {producto.activo
                              ? 'Desactivar'
                              : 'Reactivar'}
                          </Button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </Table>

            )}

            {!cargando && (
              <p className="text-muted mb-0">
                Mostrando {productosFiltrados.length} de{' '}
                {productos.length} productos.
              </p>
            )}

          </Card.Body>

        </Card>

      </Container>
    </PlantillaPublica>
  );
}

export default AdminProductos;