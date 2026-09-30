function Selector({ opciones, valorSeleccionado, onChange }) {
  return (
    <select 
      className="form-select" 
      value={valorSeleccionado} 
      onChange={onChange}
    >
      <option value="">Selecciona una categoría...</option>
      
      {/* Recorremos la lista de opciones que llegue desde afuera */}
      {opciones.map((opcion, index) => (
        <option key={index} value={opcion}>
          {opcion}
        </option>
      ))}
    </select>
  );
}

export default Selector;