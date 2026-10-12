import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { validarObligatorio, validarEmail, validarTelefono } from '../../utils/validaciones';


function FormularioCheckout(props) {
  const clasesExtra = props.className || "";

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [entrega, setEntrega] = useState('despacho');
  const [direccion, setDireccion] = useState('');
  const [errores, setErrores] = useState({ nombre: '', email: '', telefono: '', direccion: '' });

  const esDespacho = entrega === 'despacho';

 
  const cambiarEntrega = (valor) => {
    setEntrega(valor);
    setErrores({ ...errores, direccion: '' });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    // la dirección solo es obligatoria en caso que el pedido se despache a domicilio
    const nuevosErrores = {
      nombre: validarObligatorio(nombre, 'El nombre es obligatorio.'),
      email: validarEmail(email),
      telefono: validarTelefono(telefono),
      direccion: esDespacho ? validarObligatorio(direccion, 'La dirección es obligatoria.') : ''
    };
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some((mensaje) => mensaje !== '');
    if (!hayErrores && props.onEnviar) {
      props.onEnviar({
        nombre: nombre,
        email: email,
        telefono: telefono,
        entrega: entrega,
        direccion: esDespacho ? direccion : ''
      });
    }
  };

  return (
    <Card className={`shadow-sm ${clasesExtra}`}>
      <Card.Header as="h5" className="fw-bold bg-white">
        Datos de entrega
      </Card.Header>
      <Card.Body>
        <Form onSubmit={manejarSubmit} noValidate>
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
            etiqueta="Teléfono"
            tipo="tel"
            placeholder="+56 9 1234 5678"
            valor={telefono}
            onChange={setTelefono}
            error={errores.telefono}
          />

          <Form.Group as="fieldset" className="mb-3">
            <Form.Label as="legend" className="fw-bold fs-6">
              Forma de entrega
            </Form.Label>
            <Form.Check
              type="radio"
              id="entrega-despacho"
              name="entrega"
              label="Despacho a domicilio"
              checked={esDespacho}
              onChange={() => cambiarEntrega('despacho')}
            />
            <Form.Check
              type="radio"
              id="entrega-retiro"
              name="entrega"
              label="Retiro en tienda"
              checked={!esDespacho}
              onChange={() => cambiarEntrega('retiro')}
            />
          </Form.Group>

          {esDespacho ? (
            <CampoFormulario
              className="mb-4"
              etiqueta="Dirección de despacho"
              tipo="text"
              placeholder="Calle, número, comuna"
              valor={direccion}
              onChange={setDireccion}
              error={errores.direccion}
            />
          ) : (
            <Form.Text as="p" className="mb-4">
              Retirarás tu pedido en nuestra tienda de Viña del Mar.
            </Form.Text>
          )}

          <Boton type="submit" texto="Confirmar pedido" variante="dark" className="w-100" />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default FormularioCheckout;
