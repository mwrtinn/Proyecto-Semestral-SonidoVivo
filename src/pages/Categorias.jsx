import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FiltroCategoria from '../components/molecules/FiltroCategoria';
import TarjetaProducto from '../components/molecules/TarjetaProducto';
import productosBD from '../data/productos.json';

function Categorias() {

  const categoriasUnicas = [...new Set(productosBD.map(p => p.categoria))];

  const [categoriaActiva, setCategoriaActiva] = useState("");

  const manejarCambio = (e) => {
    setCategoriaActiva(e.target.value);
  };

  const productosFiltrados = categoriaActiva 
    ? productosBD.filter(p => p.categoria === categoriaActiva)
    : productosBD;

  return (
    <PlantillaPublica>
      <Container className="my-5">
        <h2 className="text-center mb-4">Explorar por Categorías</h2>
        
        <FiltroCategoria 
          className="mb-4"
          categorias={categoriasUnicas}
          categoriaSeleccionada={categoriaActiva}
          onCambiarCategoria={manejarCambio}
        />

        <Row className="g-4 mt-2">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <Col xs={12} md={6} lg={4} key={producto.id}>
                <TarjetaProducto
                  nombre={producto.nombre}
                  descripcion={producto.descripcion}
                  precio={producto.precio}
                  stock={producto.stock}
                />
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center text-muted">No se encontraron productos.</p>
            </Col>
          )}
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Categorias;