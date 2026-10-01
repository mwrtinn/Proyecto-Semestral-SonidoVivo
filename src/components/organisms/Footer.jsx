import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <Container>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <h5 className="fw-bold">Sonido Vivo</h5>
            <p className="text-white-50 small">
              Tienda especializada en instrumentos musicales, equipos de sonido y accesorios. 11 años de experiencia acompañando tu talento.
            </p>
          </Col>
         
          <Col xs={12} md={4}>
            <h5 className="fw-bold">Categorías</h5>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-1">Guitarras y Bajos</li>
              <li className="mb-1">Baterías y Teclados</li>
              <li className="mb-1">Amplificadores y Micrófonos</li>
              <li className="mb-1">Accesorios y Repuestos</li>
            </ul>
          </Col>
         
          <Col xs={12} md={4}>
            <h5 className="fw-bold">Contacto</h5>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-1"><i className="bi bi-geo-alt me-2"></i>Viña del Mar, Región de Valparaíso</li>
              <li className="mb-1"><i className="bi bi-whatsapp me-2"></i>Pedidos por WhatsApp</li>
              <li className="mb-1"><i className="bi bi-instagram me-2"></i>@sonidovivo</li>
            </ul>
          </Col>
        </Row>
       
        <hr className="border-secondary my-4" />
       
        <div className="text-center text-white-50 small">
          &copy; 2026 Sonido Vivo. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;