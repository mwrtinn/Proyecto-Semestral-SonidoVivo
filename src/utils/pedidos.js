
export const ESTADO_INICIAL = 'En preparación';

export function ordenarRecientes(pedidos) {
  return [...pedidos].sort((a, b) => b.id - a.id);
}


export function formatearFecha(iso) {
  const fecha = new Date(iso);
  if (isNaN(fecha.getTime())) return '';
  return fecha.toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}
