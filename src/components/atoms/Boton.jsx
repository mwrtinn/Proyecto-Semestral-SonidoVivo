function Boton(props) {
  const variante = props.variante || "dark";
  return (
    <button className={`btn btn-${variante}`} onClick={props.onClick}>
      {props.texto}
    </button>
  );
}

export default Boton;