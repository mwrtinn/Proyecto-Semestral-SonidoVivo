import { Form } from 'react-bootstrap';
import InputTexto from '../atoms/InputTexto';

function CampoFormulario(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">{props.etiqueta}</Form.Label>
      <InputTexto
        tipo={props.tipo}
        placeholder={props.placeholder}
      />
    </Form.Group>
  );
}

export default CampoFormulario;