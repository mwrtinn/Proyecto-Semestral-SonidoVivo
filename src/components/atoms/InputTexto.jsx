import { Form } from 'react-bootstrap';

function InputTexto(props) {
  return (
    <Form.Control
      type={props.tipo || "text"}
      placeholder={props.placeholder}
    />
  );
}

export default InputTexto;