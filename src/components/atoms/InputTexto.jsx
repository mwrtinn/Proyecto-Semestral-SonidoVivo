function InputTexto(props) {
  const tipo = props.type || "text";
  const clasesExtra = props.className || "";

  return (
    <input
      type={tipo}
      className={`form-control ${clasesExtra}`}
      placeholder={props.placeholder}
      value={props.valor}
      onChange={props.onChange}
      disabled={props.disabled}
      readOnly={props.readOnly}
    />
  );
}

export default InputTexto;