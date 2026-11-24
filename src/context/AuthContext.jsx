import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { peticion, guardarToken, leerToken, borrarToken, registrarAlExpirar } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider(props) {
  const [usuario, setUsuario] = useState(null);
  // Si hay token, hay que esperar a que /auth/me responda antes de decidir si hay sesión.
  const [cargando, setCargando] = useState(() => leerToken() !== null);

  const cerrarSesion = useCallback(() => {
    borrarToken();
    setUsuario(null);
  }, []);

  useEffect(() => {
    registrarAlExpirar(cerrarSesion);
    if (leerToken() === null) return undefined;

    let vigente = true;
    peticion('/auth/me')
      .then((perfil) => {
        if (vigente) setUsuario(perfil);
      })
      .catch(() => {
        if (vigente) cerrarSesion();
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });
    return () => {
      vigente = false;
    };
  }, [cerrarSesion]);

  async function iniciarSesion(email, clave) {
    const { accessToken } = await peticion('/auth/login', { metodo: 'POST', cuerpo: { email, clave }, conToken: false });
    guardarToken(accessToken);
    const perfil = await peticion('/auth/me');
    setUsuario(perfil);
    return perfil;
  }

  // El registro público siempre crea un Cliente (lo decide el backend).
  function registrar(nombre, email, clave) {
    return peticion('/auth/register', { metodo: 'POST', cuerpo: { nombre, email, clave }, conToken: false });
  }

  const tieneRol = (...roles) => usuario !== null && roles.includes(usuario.rol);

  return (
    <AuthContext.Provider value={{ usuario, cargando, iniciarSesion, cerrarSesion, registrar, tieneRol }}>
      {props.children}
    </AuthContext.Provider>
  );
}

// useAuth: hook propio. Uso: const { usuario, iniciarSesion } = useAuth()
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return contexto;
}
