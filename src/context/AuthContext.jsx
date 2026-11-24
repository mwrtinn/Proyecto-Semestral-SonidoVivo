import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { guardarToken, leerToken, borrarToken, registrarAlExpirar } from '../services/api';
import { login, obtenerPerfil, registrarUsuario } from '../services/auth';
const AuthContext = createContext(null);
export function AuthProvider(props) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(() => leerToken() !== null);
  const cerrarSesion = useCallback(() => {
    borrarToken(); setUsuario(null); setCargando(false);
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    registrarAlExpirar(cerrarSesion);
    const token = leerToken();
    if (token) {
      obtenerPerfil(controller.signal)
        .then(perfil => { if (!controller.signal.aborted && leerToken() === token) setUsuario(perfil); })
        .catch(() => { if (!controller.signal.aborted && leerToken() === token) cerrarSesion(); })
        .finally(() => { if (!controller.signal.aborted) setCargando(false); });
    }
    return () => { controller.abort(); registrarAlExpirar(null); };
  }, [cerrarSesion]);
  async function iniciarSesion(email, clave) {
    const { accessToken } = await login({ email, clave });
    if (!accessToken) throw new Error('La API no devolvió un JWT.');
    guardarToken(accessToken);
    try {
      const perfil = await obtenerPerfil();
      if (leerToken() !== accessToken) throw new Error('La sesión cambió.');
      setUsuario(perfil);
      return perfil;
    } catch (error) {
      if (leerToken() === accessToken) cerrarSesion();
      throw error;
    }
  }
  const registrar = (nombre, email, clave) => registrarUsuario({ nombre, email, clave });
  const tieneRol = (...roles) => !!usuario && roles.includes(usuario.rol);
  return <AuthContext.Provider value={{ usuario, cargando, iniciarSesion, cerrarSesion, registrar, tieneRol }}>{props.children}</AuthContext.Provider>;
}
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return contexto;
}