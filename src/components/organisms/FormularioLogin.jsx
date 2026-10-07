import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

function FormularioLogin(props) {
  const navigate = useNavigate();
  const clasesExtra = props.className || "";

  const manejarSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <Form onSubmit={manejarSubmit} className={`p-4 border rounded shadow-sm bg-white ${clasesExtra}`}>
      <h3 className="mb-4 text-center">Iniciar Sesión</h3>
      <CampoFormulario
        etiqueta="Correo Electrónico"
        tipo="email"
        placeholder="tu@correo.com"
      />
      <CampoFormulario
        etiqueta="Contraseña"
        tipo="password"
        placeholder="********"
      />
      <div className="d-grid mt-4">
        <Boton type="submit" texto="Entrar a Sonido Vivo" variante="dark" />
      </div>
    </Form>
  );
}

export default FormularioLogin;