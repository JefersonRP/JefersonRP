# Rafael

Sitio web de **Rafael**, tienda de chocolate orgánico del Cuzco. Construido con HTML, CSS y JavaScript puros, sin dependencias de build.

## Descripción

Tienda escaparate peruana con home dinámica, fichas de producto individuales, galería multi-imagen y carrito persistente que termina en un pedido por WhatsApp. Los productos viven en `assets/products.js` y las imágenes se referencian por el ID / slug del producto.

## Secciones

- **Home (`index.html`)** — Hero, catálogo, sobre nosotros, proceso, contacto, carrito lateral y WhatsApp flotante.
- **Página de producto (`producto/*.html`)** — Una por cada chocolate, con:
  - Galería de hasta 6 fotos (principal + miniaturas).
  - Precio, stock, selector de cantidad.
  - Dos CTAs: *Comprar por WhatsApp* y *Añadir al carrito*.
  - Pestañas: Descripción · Ingredientes y alérgenos · Origen del cacao · Notas de cata y maridajes · Información nutricional y conservación.
  - Sección de productos relacionados.

## Cómo ver el sitio

- Local: abre `index.html` en cualquier navegador (o sirve la carpeta con `python3 -m http.server`).
- Web: publicado en **GitHub Pages** sobre `main`.

## Estructura

```
.
├── index.html                       # Home
├── producto/
│   ├── chocolate-100.html           # Ficha Chocolate 100%
│   ├── chocolate-80.html            # Ficha Chocolate 80%
│   └── chocolate-70.html            # Ficha Chocolate 70%
├── assets/
│   ├── styles.css                   # Estilos compartidos
│   ├── products.js                  # Catálogo enriquecido (fuente de verdad)
│   ├── cart.js                      # Carrito con localStorage
│   └── detail.js                    # Render de las páginas de producto
├── img/
│   ├── 1.webp                       # Chocolate 100% (foto principal)
│   ├── 2.webp                       # Chocolate 80% (foto principal)
│   └── 3.webp                       # Chocolate 70% (foto principal)
├── Catalogo.csv                     # Catálogo original
└── README.md
```

### Añadir más fotos a un producto

Guarda las imágenes adicionales en `img/` siguiendo el patrón:

```
img/<id>-2.webp
img/<id>-3.webp
img/<id>-4.webp
img/<id>-5.webp
img/<id>-6.webp
```

La galería de cada ficha detecta automáticamente qué imágenes existen y las muestra. No es necesario tocar código.

## Tecnologías

- HTML5, CSS3 (variables, grid, flex, animaciones), JavaScript vanilla (ES6+).
- Tipografías: Playfair Display + Inter (Google Fonts).
- Carrito con `localStorage` (clave `rafael_cart_v1`).
- Sin dependencias de build ni librerías externas.
