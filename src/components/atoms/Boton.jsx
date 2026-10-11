function Boton(props) {
  const variante = props.variante || "dark";
  const tipo = props.type || "button"; 
  const clasesExtra = props.className || "";
  
  return (
    <button 
      type={tipo} 
      className={`btn btn-${variante} ${clasesExtra}`} 
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.texto}
    </button>
  );
}

export default Boton;