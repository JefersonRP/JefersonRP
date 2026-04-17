# Las Cosas de Héctor

SPA (Single Page Application) inspirada en [lascosasdehector.com](https://www.lascosasdehector.com), construida con HTML, CSS y JavaScript puros en un único archivo.

## Descripción

Tienda escaparate de chocolate orgánico peruano con catálogo dinámico, carrito de compra funcional y diseño totalmente responsive. Los productos se cargan desde `Catalogo.csv` y cada imagen se referencia por el ID del producto (`img/<ID>.webp`).

## Secciones

- **Hero** — presentación de marca con imagen destacada.
- **Productos** — tarjetas generadas a partir del catálogo (3 tabletas de chocolate).
- **Sobre nosotros** — historia y valores del obrador.
- **Nuestro proceso** — los cuatro pasos del grano a la tableta.
- **Contacto** — formulario y datos directos.
- **Carrito lateral** — añadir/quitar productos, cálculo de total, resumen y checkout.

## Cómo ver el sitio

- Local: abre `index.html` en cualquier navegador.
- Web: publicado en **GitHub Pages** en este mismo repositorio.

## Estructura

```
.
├── index.html       # SPA completa (HTML + CSS + JS)
├── Catalogo.csv     # Catálogo de productos (fuente de la data)
├── img/
│   ├── 1.webp       # Chocolate 100%
│   ├── 2.webp       # Chocolate 80%
│   └── 3.webp       # Chocolate 70%
└── README.md
```

## Tecnologías

- HTML5, CSS3 (variables, grid, flex, animaciones), JavaScript vanilla (ES6+)
- Tipografías: Playfair Display + Inter (Google Fonts)
- Sin dependencias de build ni librerías externas.
