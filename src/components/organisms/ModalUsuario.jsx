import { useState } from 'react';
import { Modal, Form, Alert } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { validarObligatorio, validarEmail, validarClaveRegistro } from '../../utils/validaciones';

export const ROLES = ['Administrador', 'Vendedor', 'Cliente'];

function ModalUsuario(props) {
  const editando = props.modo === 'editar';
  const inicial = editando ? props.usuario : null;

  const [nombre, setNombre] = useState(inicial ? inicial.nombre : '');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [rol, setRol] = useState(inicial ? inicial.rol : 'Cliente');
  const [activo, setActivo] = useState(inicial ? inicial.activo : true);
  const [errores, setErrores] = useState({ nombre: '', email: '', clave: '' });
  const [errorApi, setErrorApi] = useState('');
  const [enviando, setEnviando] = useState(false);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const nuevos = {
      nombre: validarObligatorio(nombre, 'El nombre es obligatorio.'),
      email: editando ? '' : validarEmail(email),
      clave: editando ? '' : validarClaveRegistro(clave)
    };
    setErrores(nuevos);
    if (Object.values(nuevos).some((mensaje) => mensaje !== '')) return;

    setEnviando(true);
    setErrorApi('');
    try {
      await props.onGuardar(editando ? { nombre, rol, activo } : { nombre, email, clave, rol });
    } catch (err) {
      setErrorApi([err.message, ...(err.detalles || [])].join('. '));
      setEnviando(false);
    }
  };

  return (
    <Modal show onHide={props.onCerrar} centered>
      <Form onSubmit={manejarSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>{editando ? 'Editar usuario' : 'Crear usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorApi && <Alert variant="danger">{errorApi}</Alert>}
          <CampoFormulario
            className="mb-3"
            etiqueta="Nombre completo"
            tipo="text"
            valor={nombre}
            onChange={setNombre}
            error={errores.nombre}
          />
          {editando ? (
            <p className="text-muted">Correo: {inicial.email}</p>
          ) : (
            <>
              <CampoFormulario
                className="mb-3"
                etiqueta="Correo Electrónico"
                tipo="email"
                valor={email}
                onChange={setEmail}
                error={errores.email}
              />
              <CampoFormulario
                className="mb-3"
                etiqueta="Contraseña"
                tipo="password"
                placeholder="Mínimo 8 caracteres"
                valor={clave}
                onChange={setClave}
                error={errores.clave}
              />
            </>
          )}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Rol</Form.Label>
            <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Form.Select>
          </Form.Group>
          {editando && (
            <Form.Check
              type="switch"
              id="usuario-activo"
              label="Cuenta activa"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Boton variante="outline-secondary" texto="Cancelar" onClick={props.onCerrar} />
          <Boton type="submit" variante="dark" texto={enviando ? 'Guardando...' : 'Guardar'} disabled={enviando} />
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalUsuario;
