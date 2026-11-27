
import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

import {
  validarObligatorio,
  validarEmail,
  validarClaveRegistro,
  validarConfirmacion
} from '../../utils/validaciones';

function FormularioRegistro(props) {
  const clasesExtra = props.className || '';

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [confirmacion, setConfirmacion] = useState('');

  const [errores, setErrores] = useState({
    nombre: '',
    email: '',
    clave: '',
    confirmacion: ''
  });

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (props.cargando) return;

    const nuevosErrores = {
      nombre: validarObligatorio(
        nombre.trim(),
        'El nombre es obligatorio.'
      ),
      email: validarEmail(email.trim()),
      clave: validarClaveRegistro(clave),
      confirmacion: validarConfirmacion(
        clave,
        confirmacion
      )
    };

    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores)
      .some((mensaje) => mensaje !== '');

    if (!hayErrores && props.onEnviar) {
      props.onEnviar({
        nombre: nombre.trim(),
        email: email.trim(),
        clave: clave
      });
    }
  };

  return (
    <Form
      onSubmit={manejarSubmit}
      className={`p-4 border rounded shadow-sm bg-white ${clasesExtra}`}
      noValidate
    >
      <h3 className="mb-4 text-center">
        Crear cuenta
      </h3>

      {props.error && (
        <Alert variant="danger">
          {props.error}
        </Alert>
      )}

      <CampoFormulario
        className="mb-3"
        etiqueta="Nombre completo"
        tipo="text"
        placeholder="Tu nombre"
        valor={nombre}
        onChange={setNombre}
        error={errores.nombre}
      />

      <CampoFormulario
        className="mb-3"
        etiqueta="Correo Electrónico"
        tipo="email"
        placeholder="tu@correo.com"
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

      <CampoFormulario
        className="mb-4"
        etiqueta="Confirmar contraseña"
        tipo="password"
        placeholder="Repite tu contraseña"
        valor={confirmacion}
        onChange={setConfirmacion}
        error={errores.confirmacion}
      />

      <Boton
        type="submit"
        texto={
          props.cargando
            ? 'Registrando...'
            : 'Crear mi cuenta'
        }
        disabled={props.cargando}
        variante="dark"
        className="w-100"
      />
    </Form>
  );
}

export default FormularioRegistro;
