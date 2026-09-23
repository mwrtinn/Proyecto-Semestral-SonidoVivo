import InputTexto from "../atoms/InputTexto";

function CampoFormulario(props) {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold">{props.etiqueta}</label>
      <InputTexto 
        tipo={props.tipo} 
        placeholder={props.placeholder} 
      />
    </div>
  );
}

export default CampoFormulario;