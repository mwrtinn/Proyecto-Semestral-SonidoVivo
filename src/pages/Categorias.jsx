import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FiltroCategoria from '../components/molecules/FiltroCategoria';
import TarjetaProducto from '../components/molecules/TarjetaProducto';
import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CartContext';

function Categorias() {
  const { productos } = useProductos();
  const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];
  const [categoriaActiva, setCategoriaActiva] = useState("");
  
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();

  const manejarCambio = (e) => {
    setCategoriaActiva(e.target.value);
  };

  const productosFiltrados = categoriaActiva 
    ? productos.filter(p => p.categoria === categoriaActiva)
    : productos;

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
                  imagen={producto.imagen}
                  onVerDetalle={() => navigate(`/producto/${producto.id}`)}
                  onAgregarCarrito={() => agregarAlCarrito(producto)}
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