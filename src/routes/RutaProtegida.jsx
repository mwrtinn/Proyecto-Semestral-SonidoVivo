import { Navigate, useLocation } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function RutaProtegida(props) {
  const { usuario, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Verificando sesión...</span>
        </Spinner>
      </Container>
    );
  }

  if (!usuario) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ desde: location.pathname, aviso: 'Debes iniciar sesión para ver esa página.' }}
      />
    );
  }

  if (props.roles && !props.roles.includes(usuario.rol)) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return props.children;
}

export default RutaProtegida;
