function InputTexto(props) {
  return (
    <input
      type={props.tipo || "text"}
      className="form-control"
      placeholder={props.placeholder}
    />
  );
}

export default InputTexto;