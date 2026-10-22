// Funciones puras de pedidos: no usan React, así que se pueden probar solas.

// Todo pedido nuevo parte en este estado.
export const ESTADO_INICIAL = 'En preparación';

// Ordena del más reciente al más antiguo (el número más alto es el último pedido).
export function ordenarRecientes(pedidos) {
  return [...pedidos].sort((a, b) => b.id - a.id);
}

// Convierte la fecha guardada (texto ISO) en algo legible: 20-10-2026, 14:30.
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
