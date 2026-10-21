import { useState } from 'react';
import { Form } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import {
  validarObligatorio,
  validarEmail,
  validarClave,
  validarConfirmacion
} from '../../utils/validaciones';


function FormularioRegistro(props) {
  const clasesExtra = props.className || "";

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [errores, setErrores] = useState({ nombre: '', email: '', clave: '', confirmacion: '' });

  const manejarSubmit = (e) => {
    e.preventDefault();

   
    const nuevosErrores = {
      nombre: validarObligatorio(nombre, 'El nombre es obligatorio.'),
      email: validarEmail(email),
      clave: validarClave(clave),
      confirmacion: validarConfirmacion(clave, confirmacion)
    };
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some((mensaje) => mensaje !== '');
    if (!hayErrores && props.onEnviar) {
      props.onEnviar({ nombre: nombre, email: email, clave: clave });
    }
  };

  return (
    <Form onSubmit={manejarSubmit} className={`p-4 border rounded shadow-sm bg-white ${clasesExtra}`} noValidate>
      <h3 className="mb-4 text-center">Crear cuenta</h3>
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
        placeholder="Mínimo 6 caracteres"
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
      <Boton type="submit" texto="Crear mi cuenta" variante="dark" className="w-100" />
    </Form>
  );
}

export default FormularioRegistro;
