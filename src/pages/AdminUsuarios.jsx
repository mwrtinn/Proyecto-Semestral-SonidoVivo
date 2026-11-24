import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Badge, Form, Alert, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import ModalUsuario, { ROLES } from '../components/organisms/ModalUsuario';
import Boton from '../components/atoms/Boton';
import { useAuth } from '../context/AuthContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { listarUsuarios, crearUsuario, modificarUsuario, desactivarUsuario } from '../services/usuarios';

const FILTROS_VACIOS = { buscar: '', rol: '', activo: '' };

function AdminUsuarios() {
  useTituloPagina("Administrar usuarios");
  const { usuario: yo } = useAuth();

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [borrador, setBorrador] = useState(FILTROS_VACIOS); // lo que el admin escribe
  const [filtros, setFiltros] = useState(FILTROS_VACIOS);   // lo que se envió a la API
  const [recarga, setRecarga] = useState(0);                // subir el número vuelve a pedir la lista
  const [modal, setModal] = useState(null);                 // null | { modo: 'crear' } | { modo: 'editar', usuario }

  useEffect(() => {
    let vigente = true;
    setCargando(true);
    listarUsuarios(filtros)
      .then((datos) => {
        if (vigente) {
          setUsuarios(datos);
          setError('');
        }
      })
      .catch((err) => {
        if (vigente) setError(err.message);
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });
    return () => {
      vigente = false;
    };
  }, [filtros, recarga]);

  const aplicarFiltros = (e) => {
    e.preventDefault();
    setFiltros(borrador);
  };

  const limpiarFiltros = () => {
    setBorrador(FILTROS_VACIOS);
    setFiltros(FILTROS_VACIOS);
  };

  const avisarExito = (titulo) =>
    Swal.fire({ icon: 'success', title: titulo, timer: 1500, showConfirmButton: false });

  const avisarError = (titulo, err) => Swal.fire({ icon: 'error', title: titulo, text: err.message });

  const guardar = async (datos) => {
    if (modal.modo === 'crear') {
      await crearUsuario(datos);
    } else {
      await modificarUsuario(modal.usuario.id_usuario, datos);
    }
    const titulo = modal.modo === 'crear' ? 'Usuario creado' : 'Usuario actualizado';
    setModal(null);
    setRecarga((n) => n + 1);
    avisarExito(titulo);
  };

  const desactivar = async (u) => {
    const respuesta = await Swal.fire({
      title: '¿Desactivar cuenta?',
      text: `${u.nombre} ya no podrá iniciar sesión.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    });
    if (!respuesta.isConfirmed) return;
    try {
      await desactivarUsuario(u.id_usuario);
      setRecarga((n) => n + 1);
      avisarExito('Cuenta desactivada');
    } catch (err) {
      avisarError('No se pudo desactivar', err);
    }
  };

  const reactivar = async (u) => {
    try {
      await modificarUsuario(u.id_usuario, { activo: true });
      setRecarga((n) => n + 1);
      avisarExito('Cuenta reactivada');
    } catch (err) {
      avisarError('No se pudo reactivar', err);
    }
  };

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <Row className="align-items-center mb-4">
          <Col>
            <h2 className="mb-0">Administración de usuarios</h2>
          </Col>
          <Col xs="auto">
            <Boton variante="dark" texto="Crear usuario" onClick={() => setModal({ modo: 'crear' })} />
          </Col>
        </Row>

        <Form onSubmit={aplicarFiltros} className="row g-2 mb-4">
          <Col md={5}>
            <Form.Control
              placeholder="Buscar por nombre o correo"
              value={borrador.buscar}
              onChange={(e) => setBorrador({ ...borrador, buscar: e.target.value })}
            />
          </Col>
          <Col md={2}>
            <Form.Select value={borrador.rol} onChange={(e) => setBorrador({ ...borrador, rol: e.target.value })}>
              <option value="">Todos los roles</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Select value={borrador.activo} onChange={(e) => setBorrador({ ...borrador, activo: e.target.value })}>
              <option value="">Todos los estados</option>
              <option value="true">Activos</option>
              <option value="false">Desactivados</option>
            </Form.Select>
          </Col>
          <Col md="auto">
            <Boton type="submit" variante="dark" texto="Filtrar" />
          </Col>
          <Col md="auto">
            <Boton variante="outline-secondary" texto="Limpiar" onClick={limpiarFiltros} />
          </Col>
        </Form>

        {error && <Alert variant="danger">{error}</Alert>}

        {cargando ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando usuarios...</span>
            </Spinner>
          </div>
        ) : (
          <Table responsive hover className="align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">No hay usuarios que coincidan.</td>
                </tr>
              )}
              {usuarios.map((u) => (
                <tr key={u.id_usuario}>
                  <td>{u.id_usuario}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td><Badge bg="secondary">{u.rol}</Badge></td>
                  <td>
                    <Badge bg={u.activo ? 'success' : 'danger'}>{u.activo ? 'Activo' : 'Desactivado'}</Badge>
                  </td>
                  <td className="text-end">
                    <div className="d-inline-flex gap-2">
                      <Boton variante="outline-dark" texto="Editar" onClick={() => setModal({ modo: 'editar', usuario: u })} />
                      {u.activo ? (
                        <Boton
                          variante="outline-danger"
                          texto="Desactivar"
                          disabled={u.id_usuario === yo.id_usuario}
                          onClick={() => desactivar(u)}
                        />
                      ) : (
                        <Boton variante="outline-success" texto="Reactivar" onClick={() => reactivar(u)} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>

      {modal && (
        <ModalUsuario
          modo={modal.modo}
          usuario={modal.usuario}
          onCerrar={() => setModal(null)}
          onGuardar={guardar}
        />
      )}
    </PlantillaPublica>
  );
}

export default AdminUsuarios;
