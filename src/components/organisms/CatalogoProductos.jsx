import TarjetaProducto from '../molecules/TarjetaProducto';

function CatalogoProductos() {
  const productosBD = [
    { 
      id: 'GA001', 
      nombre: 'Yamaha F310 - Acústica Folk', 
      descripcion: 'Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.', 
      precio: 129990, 
      stock: 8 
    },
    { 
      id: 'GA002', 
      nombre: 'Fender CD-60S - Acústica Dreadnought', 
      descripcion: 'Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado.', 
      precio: 189990, 
      stock: 5 
    },
    { 
      id: 'GA003', 
      nombre: 'Yamaha C40 - Clásica 4/4', 
      descripcion: 'Nailon, tapa de abeto. Ideal para estudio y flamenco.', 
      precio: 89990, 
      stock: 10 
    },
    { 
      id: 'GA004', 
      nombre: 'Takamine GN20CE - Electroacústica', 
      descripcion: 'Pickup integrado, afinador incorporado.', 
      precio: 349990, 
      stock: 3 
    },
    { 
      id: 'GE001', 
      nombre: 'Squier Affinity Strat - Eléctrica', 
      descripcion: 'Cuerpo de álamo, mástil de arce, pastillas SSS.', 
      precio: 249990, 
      stock: 5 
    },
    { 
      id: 'GE002', 
      nombre: 'Epiphone Les Paul Std - Eléctrica', 
      descripcion: 'Cuerpo caoba, tapa arce, pastillas humbucker.', 
      precio: 329990, 
      stock: 4 
    }
  ];

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">Catálogo de Instrumentos</h2>
      
      <div className="row g-4">
        {productosBD.map((producto) => (
          <div key={producto.id} className="col-12 col-md-6 col-lg-4">
            <TarjetaProducto 
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              stock={producto.stock}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogoProductos;