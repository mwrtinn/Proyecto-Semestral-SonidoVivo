import Selector from '../atoms/Selector';

function FiltroCategoria({ categorias, categoriaSeleccionada, onCambiarCategoria }) {
  return (
    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded shadow-sm mb-4">
      <span className="fw-bold mb-0">Filtrar por categoría:</span>
      <div style={{ minWidth: '200px' }}>
        <Selector 
          opciones={categorias} 
          valorSeleccionado={categoriaSeleccionada}
          onChange={onCambiarCategoria} 
        />
      </div>
    </div>
  );
}

export default FiltroCategoria;