import { useNavigate } from 'react-router-dom'; 
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

function FormularioLogin() {
  const navigate = useNavigate(); 

  const manejarSubmit = (e) => {
    e.preventDefault(); 
    
    console.log("Iniciando sesión en Sonido Vivo...");

    navigate('/'); 
  };

  return (
    <form onSubmit={manejarSubmit} className="p-4 border rounded shadow-sm bg-white">
      <h3 className="mb-4 text-center">Iniciar Sesión</h3>
      
      <CampoFormulario 
        etiqueta="Correo Electrónico"
        tipo="email"
        placeholder="tu@correo.com"
      />
      
      <CampoFormulario 
        etiqueta="Contraseña"
        tipo="password"
        placeholder="******"
      />
      
      <div className="d-grid mt-4">
        <Boton type="submit" texto="Entrar a Sonido Vivo" variante="dark" />
      </div>
    </form>
  );
}

export default FormularioLogin;