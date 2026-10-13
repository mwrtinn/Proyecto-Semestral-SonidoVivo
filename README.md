# JOMATE

## Integrantes
- Martin Faundez (ma.faundezd@duocuc.cl)
- Joaquín Orellana (joa.orellanag@duocuc.cl)
- Vicente Vega (vi.vegaa@duocuc.cl)

## Caso
Sonido Vivo

## Descripción del caso
Tienda en línea dedicada a la venta de instrumentos musicales y accesorios de audio.

## Estructura del proyecto

```text
src/
├── components/
│   ├── atoms/
│   │   ├── Boton.jsx
│   │   ├── ContadorCantidad.jsx
│   │   ├── EtiquetaStock.jsx
│   │   ├── InputTexto.jsx
│   │   ├── Precio.jsx
│   │   └── Selector.jsx
│   ├── molecules/
│   │   ├── CampoFormulario.jsx
│   │   ├── EstadoPedido.jsx
│   │   ├── FiltroCategoria.jsx
│   │   ├── ItemCarrito.jsx
│   │   └── TarjetaProducto.jsx
│   ├── organisms/
│   │   ├── Carrito.jsx
│   │   ├── CatalogoProductos.jsx
│   │   ├── Footer.jsx
│   │   ├── FormularioLogin.jsx
│   │   └── Navbar.jsx
│   └── templates/
│       └── PlantillaPublica.jsx
├── context/
│   └── CartContext.jsx
├── data/
│   └── productos.json
├── hooks/
│   └── useTituloPagina.js
├── pages/
│   ├── Carrito.jsx
│   ├── Catalogo.jsx
│   ├── Categorias.jsx
│   ├── DetalleProducto.jsx
│   ├── Inicio.jsx
│   ├── Login.jsx
│   ├── NoEncontrada.jsx
│   └── Ofertas.jsx
├── utils/
│   └── validaciones.js
├── App.jsx
└── main.jsx
```

## Tecnologías
- React + Vite
- React Bootstrap
- React Router DOM
- SweetAlert2 (Gestor de notificaciones UI)

## Cómo ejecutar el proyecto
1. Instalar las dependencias:
   `npm install`
2. Iniciar el servidor de desarrollo:
   `npm run dev`

## Material complementario
Carpeta de Drive con documentos del semestre (ERS y otros):
*(Link-drive)*

---

## 👥 Bitácora de Desarrollo y Aportes del Equipo (Metodología Atomic Design)

El desarrollo de este proyecto se distribuyó aplicando la metodología de Atomic Design y el flujo de trabajo en Git. A continuación, el detalle de los aportes basados en el historial del repositorio:

*   **Martín Faundez (`mwrtinn`)**
    *   **Estructura Base:** Inicialización del proyecto y configuración de Atomic Design.
    *   **Átomos y Moléculas:** Desarrollo de componentes esenciales (`Precio`, `EtiquetaStock`, `ContadorCantidad`, `Selector`, `Boton` con soporte para tipo `submit`, `ItemCarrito`, `FiltroCategoria`, `TarjetaProducto` genérica y `EstadoPedido`).
    *   **Páginas Principales:** Creación y conexión de las vistas de `Inicio`, `Catálogo`, `Categorías`, y finalización de la página `DetalleProducto`.
    *   **Motor del Carrito:** Implementación del contexto global (`CartContext.jsx`), lógica de validación de stock máximo, integración de notificaciones visuales con `SweetAlert2`, y creación de la página/organismo `Carrito`.
    *   **Ruteo y Validaciones:** Creación de la vista de error 404 (`NoEncontrada`), adición de hook personalizado para títulos (`useTituloPagina`), y configuración de validación básica de login aislando el enrutamiento (`useNavigate`) hacia las Páginas.
    *   **Mantenimiento:** Creación de data JSON simulada para inventario, correcciones de errores de sintaxis y limpieza general de código CSS.

*   **Vicente Vega (`vishoyo`)**
    *   **Estructura de Organismos:** Creación de la estructura base para los organismos de navegación y visualización: `Navbar`, `Footer` y `CatalogoProductos`.
    *   **Creacion de Organismos:** Creacion de Organismo `TablaProductos`.
    *   **Plantillas (Templates):** Desarrollo de la plantilla principal (`PlantillaPublica`), responsable de envolver el contenido y unificar la navegación.
    *   **Vistas Promocionales:** Creación de la página dedicada de `Ofertas` de la Semana 9.
    *   **Cracion de pagina:** Creacion de pagina `ResultadoCompra`.
    *   **Mantenimiento:** Actualizacion de pagina `checkout.jsx` y Documento `App`.

*   **Joaquín Orellana (`CIGGY-1`)**
    *   **Organismos y Páginas de Checkout:** Creación de los componentes organizacionales `FormularioCheckout.jsx` y `ResumenCompra.jsx`, junto con la página   principal de `Checkout.jsx` y su respectiva ruta                     para el flujo de pago.
    *   **Validaciones y Lógica:** Implementación del módulo de validaciones (`validaciones.js`) para asegurar el ingreso correcto de campos obligatorios y formato de teléfono en el proceso de compra.
