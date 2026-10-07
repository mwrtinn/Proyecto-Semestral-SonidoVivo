function Selector(props) {
  const opciones = props.opciones || [];
  const clasesExtra = props.className || "";
  const textoPorDefecto = props.textoPorDefecto || "Selecciona una opción...";

  return (
    <select
      className={`form-select ${clasesExtra}`}
      value={props.valorSeleccionado}
      onChange={props.onChange}
    >
      <option value="">{textoPorDefecto}</option>
      
      {opciones.map((opcion, index) => (
        <option key={index} value={opcion}>
          {opcion}
        </option>
      ))}
    </select>
  );
}

export default Selector;