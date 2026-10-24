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
│   │   ├── Boton.test.jsx
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
│   │   ├── TarjetaProducto.jsx
│   │   └── TarjetaProducto.test.jsx
│   ├── organisms/
│   │   ├── Carrito.jsx
│   │   ├── CatalogoProductos.jsx
│   │   ├── Footer.jsx
│   │   ├── FormularioCheckout.jsx
│   │   ├── FormularioLogin.jsx
│   │   ├── FormularioLogin.test.jsx
│   │   ├── FormularioRegistro.jsx
│   │   ├── Navbar.jsx
│   │   ├── ResumenCompra.jsx
│   │   └── TablaProductos.jsx
│   └── templates/
│       ├── PlantillaPublica.jsx
│       └── PlantillaPublica.test.jsx
├── context/
│   ├── CartContext.jsx
│   ├── PedidosContext.jsx
│   └── ProductosContext.jsx
├── data/
│   └── productos.json
├── hooks/
│   ├── useTituloPagina.js
│   └── useTituloPagina.test.js
├── pages/
│   ├── Carrito.jsx
│   ├── Catalogo.jsx
│   ├── Categorias.jsx
│   ├── Checkout.jsx
│   ├── DetalleProducto.jsx
│   ├── Inicio.jsx
│   ├── Inicio.test.jsx
│   ├── Login.jsx
│   ├── MisPedidos.jsx
│   ├── MisPedidos.test.jsx
│   ├── NoEncontrada.jsx
│   ├── NoEncontrada.test.jsx
│   ├── Ofertas.jsx
│   ├── Registro.jsx
│   └── ResultadoCompra.jsx
├── utils/
│   ├── pedidos.js
│   ├── stock.js
│   ├── validaciones.js
│   └── validaciones.test.js
├── App.jsx
└── main.jsx
```

## Tecnologías
-React + Vite
-React Bootstrap
-React Router DOM
-SweetAlert2 (Gestor de notificaciones UI)
-Vitest & React Testing Library (Framework de pruebas unitarias e integración)

## Cómo ejecutar el proyecto
1. Instalar las dependencias:
   `npm install`
2. Iniciar el servidor de desarrollo:
   `npm run dev`

## Pruebas Unitarias y Cobertura
El proyecto cuenta con una suite completa de pruebas unitarias y de integración configurada con Vitest, React Testing Library y JSDOM

Comandos de Testing disponibles:

Ejecutar pruebas en modo interactivo (watch):
`npm test`
Ejecutar pruebas una sola vez:
`npm run test:run`
Generar reporte de cobertura de código:
`npm run test:cov`

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
    *    **Testing y Calidad:**(Parcial 2): Configuración completa del entorno de pruebas con Vitest, desarrollo de la suite de 18 pruebas unitarias e integración (cubriendo átomos, moléculas, organismos, templates, hooks, utilidades y páginas), y redacción del Informe          de Cobertura de Testing.

*   **Vicente Vega (`vishoyo`)**
    *   **Estructura de Organismos:** Creación de la estructura base para los organismos de navegación y visualización: `Navbar`, `Footer` y `CatalogoProductos`.
    *   **Creacion de Organismos:** Creacion de Organismo `TablaProductos` y `FormularioRefistro.jsx`
    *   **Plantillas (Templates):** Desarrollo de la plantilla principal (`PlantillaPublica`), responsable de envolver el contenido y unificar la navegación.
    *   **Vistas Promocionales:** Creación de la página dedicada de `Ofertas` de la Semana 9.
    *   **Creacion de pagina:** Creacion de pagina `ResultadoCompra`, `MisPedidos.jsx` y `Registro.jsx` 
    *   **Mantenimiento:** Actualizacion de pagina `checkout.jsx` y Documento `App`.
    *   **creacion de context:** Creacion de `PedidosContext.jsx`
    *   **creacion de utils:** creacion de `pedidos.js`

*   **Joaquín Orellana (`CIGGY-1`)**
    *   **Gestión de contexto:** implementación de los contextos globales `CartContext.jsx`, `PedidosContext.jsx` y `ProductosContext.jsx` para el manejo centralizado de estado de aplicacion.
    *   **Componentes y organismos:** desarrollo de los componentes organizacionales `CatalogoProducto.jsx`, `FormularioRegistro.jsx`, `NavBar.jsx` y `ResumenCompra.jsx`
    *   **Paginas y vistas:** Creación de las paginas de navegación y flujos de usuario incluyendo `Categorias.jsx`, `Checkout.jsx`, `DetalleProducto.jsx`, `Login.jsx`, `MisPedidos.jsx`,
    *   `Ofertas.jsx` y `ResultadoCompra.jsx`
    *   **Utilidades y validaciones:** configuración de modúlos de lógica y soporte `pedidos.js`, `stock.js` y `validaciones.js` para asegurar el correcto funcionamiento de el negocio y
    *   validacion de datos
