import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";

function FormularioLogin() {
  return (
    <form className="p-4 border rounded shadow-sm bg-white">
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
        <Boton texto="Entrar a Sonido Vivo" variante="dark" />
      </div>
    </form>
  );
}

export default FormularioLogin;