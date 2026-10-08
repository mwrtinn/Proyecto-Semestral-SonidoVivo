import { Form } from 'react-bootstrap';

function CampoFormulario(props) {
  const clasesExtra = props.className || "";
  const error = props.error || "";

  return (
    <Form.Group className={clasesExtra}>
      <Form.Label className="fw-bold">{props.etiqueta}</Form.Label>
      <Form.Control
        type={props.tipo}
        placeholder={props.placeholder}
        value={props.valor}
        onChange={(e) => props.onChange(e.target.value)}
        isInvalid={error !== ''}
      />
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default CampoFormulario;