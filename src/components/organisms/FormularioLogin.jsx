
import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { validarEmail, validarClave } from '../../utils/validaciones';

function FormularioLogin(props) {
  const clasesExtra = props.className || "";

  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');

  const [errores, setErrores] = useState({
    email: '',
    clave: ''
  });

  const manejarSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {
      email: validarEmail(email),
      clave: validarClave(clave)
    };

    setErrores(nuevosErrores);

    if (
      nuevosErrores.email === '' &&
      nuevosErrores.clave === '' &&
      !props.cargando &&
      props.onEnviar
    ) {
      props.onEnviar({
        email: email.trim(),
        clave
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
        Iniciar Sesión
      </h3>

      {props.error && (
        <Alert variant="danger">
          {props.error}
        </Alert>
      )}

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
        className="mb-4"
        etiqueta="Contraseña"
        tipo="password"
        placeholder="********"
        valor={clave}
        onChange={setClave}
        error={errores.clave}
      />

      <div className="d-grid">
        <Boton
          type="submit"
          texto={
            props.cargando
              ? 'Iniciando sesión...'
              : 'Entrar a Sonido Vivo'
          }
          variante="dark"
          disabled={props.cargando}
        />
      </div>
    </Form>
  );
}

export default FormularioLogin;
