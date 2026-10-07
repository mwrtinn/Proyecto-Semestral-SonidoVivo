import Selector from '../atoms/Selector';

function FiltroCategoria(props) {
  const clasesExtra = props.className || "";

  return (
    <div className={`d-flex align-items-center gap-3 p-3 bg-light rounded shadow-sm ${clasesExtra}`}>
      <span className="fw-bold mb-0">Filtrar por categoría:</span>
      <div style={{ minWidth: '200px' }}>
        <Selector
          opciones={props.categorias}
          valorSeleccionado={props.categoriaSeleccionada}
          onChange={props.onCambiarCategoria}
        />
      </div>
    </div>
  );
}

export default FiltroCategoria;