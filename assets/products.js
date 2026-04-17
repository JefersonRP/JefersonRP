// ============================================================
//  Catálogo de productos Rafael — fuente única de verdad
//  Para añadir más fotos a un producto, guárdalas en /img con
//  el nombre img/<id>-2.webp, img/<id>-3.webp … hasta -6.webp.
//  La galería solo muestra las imágenes que existan realmente.
// ============================================================
window.PRODUCTS = [
    {
        id: 1,
        slug: "chocolate-100",
        name: "Chocolate 100%",
        shortDescription: "Chocolate al 100% de pureza desde el Cuzco, totalmente orgánico sin aditivos ni edulcorantes.",
        longDescription:
            "Una tableta sin concesiones: sólo pasta pura de cacao cuzqueño tostado y concheado lentamente en nuestro pequeño obrador. " +
            "Intenso, amargo y complejo, pensado para quien busca el chocolate en su estado más honesto. " +
            "Cada barra se elabora en tiradas pequeñas a partir de granos cuidadosamente seleccionados.",
        weight: "250 gr",
        price: 25,
        currency: "Soles",
        stock: 10,
        image: "img/1.webp",
        badge: "Insignia",
        gallery: ["img/1.webp", "img/1-2.webp", "img/1-3.webp", "img/1-4.webp", "img/1-5.webp", "img/1-6.webp"],
        ingredients: "100% pasta pura de cacao orgánico peruano.",
        allergens: "Sin azúcar añadida, sin gluten, sin soja, sin lácteos. Elaborado en obrador que también trabaja frutos secos; puede contener trazas.",
        origin: {
            region: "Valle de La Convención, Cuzco",
            community: "Comunidades de pequeños productores",
            altitude: "800 – 1.200 msnm",
            variety: "Cacao criollo y trinitario peruano",
            harvest: "Fermentación en cajones 5-7 días, secado al sol 6 días"
        },
        tasting: {
            notes: ["Frutos rojos secos", "Tabaco suave", "Madera noble", "Final largo y cacaotero"],
            pairings: ["Café de filtro", "Vino tinto con cuerpo", "Queso añejo", "Ron añejo"]
        },
        nutrition: [
            { label: "Valor energético", value: "580 kcal / 2.420 kJ" },
            { label: "Grasas", value: "52 g" },
            { label: "— de las cuales saturadas", value: "32 g" },
            { label: "Hidratos de carbono", value: "12 g" },
            { label: "— de los cuales azúcares", value: "1 g" },
            { label: "Fibra alimentaria", value: "15 g" },
            { label: "Proteínas", value: "12 g" },
            { label: "Sal", value: "< 0,01 g" }
        ],
        conservation: "Conservar en lugar fresco y seco, entre 15 °C y 20 °C, lejos de la luz directa y de olores fuertes.",
        shelfLife: "Consumir preferentemente antes de 12 meses desde la fecha de elaboración."
    },
    {
        id: 2,
        slug: "chocolate-80",
        name: "Chocolate 80%",
        shortDescription: "Chocolate al 80% de pureza desde el Cuzco, totalmente orgánico sin aditivos ni edulcorantes.",
        longDescription:
            "La tableta más golosa de nuestros chocolates intensos: 80% de pasta de cacao cuzqueño y un toque justo de azúcar de caña orgánico. " +
            "Para quienes buscan la profundidad del cacao puro con una punta dulce que abre paso a las notas aromáticas del grano. " +
            "Perfecta para iniciarse en los chocolates altos en cacao.",
        weight: "60 gr",
        price: 10,
        currency: "Soles",
        stock: 23,
        image: "img/2.webp",
        badge: "Intenso",
        gallery: ["img/2.webp", "img/2-2.webp", "img/2-3.webp", "img/2-4.webp", "img/2-5.webp", "img/2-6.webp"],
        ingredients: "Pasta de cacao orgánico peruano (80%), azúcar de caña orgánico, manteca de cacao.",
        allergens: "Sin gluten, sin soja, sin lácteos. Elaborado en obrador que también trabaja frutos secos; puede contener trazas.",
        origin: {
            region: "Valle de La Convención, Cuzco",
            community: "Comunidades de pequeños productores",
            altitude: "800 – 1.200 msnm",
            variety: "Cacao criollo y trinitario peruano",
            harvest: "Fermentación en cajones 5-7 días, secado al sol 6 días"
        },
        tasting: {
            notes: ["Cereza madura", "Chocolate oscuro clásico", "Nuez tostada", "Final aterciopelado"],
            pairings: ["Café espresso", "Vino de uva malbec", "Fresas frescas", "Whisky suave"]
        },
        nutrition: [
            { label: "Valor energético", value: "555 kcal / 2.320 kJ" },
            { label: "Grasas", value: "44 g" },
            { label: "— de las cuales saturadas", value: "27 g" },
            { label: "Hidratos de carbono", value: "28 g" },
            { label: "— de los cuales azúcares", value: "19 g" },
            { label: "Fibra alimentaria", value: "11 g" },
            { label: "Proteínas", value: "9 g" },
            { label: "Sal", value: "< 0,01 g" }
        ],
        conservation: "Conservar en lugar fresco y seco, entre 15 °C y 20 °C, lejos de la luz directa y de olores fuertes.",
        shelfLife: "Consumir preferentemente antes de 12 meses desde la fecha de elaboración."
    },
    {
        id: 3,
        slug: "chocolate-70",
        name: "Chocolate 70%",
        shortDescription: "Chocolate al 70% de pureza desde el Cuzco, totalmente orgánico sin aditivos ni edulcorantes.",
        longDescription:
            "Nuestra tableta más equilibrada: 70% de cacao cuzqueño con un dulzor sutil que realza las notas florales y afrutadas del grano. " +
            "Un chocolate accesible, sedoso y muy aromático, ideal para degustar, cocinar o compartir. " +
            "La puerta de entrada perfecta al universo Rafael.",
        weight: "60 gr",
        price: 10,
        currency: "Soles",
        stock: 6,
        image: "img/3.webp",
        badge: "Equilibrado",
        gallery: ["img/3.webp", "img/3-2.webp", "img/3-3.webp", "img/3-4.webp", "img/3-5.webp", "img/3-6.webp"],
        ingredients: "Pasta de cacao orgánico peruano (70%), azúcar de caña orgánico, manteca de cacao.",
        allergens: "Sin gluten, sin soja, sin lácteos. Elaborado en obrador que también trabaja frutos secos; puede contener trazas.",
        origin: {
            region: "Valle de La Convención, Cuzco",
            community: "Comunidades de pequeños productores",
            altitude: "800 – 1.200 msnm",
            variety: "Cacao criollo y trinitario peruano",
            harvest: "Fermentación en cajones 5-7 días, secado al sol 6 días"
        },
        tasting: {
            notes: ["Flores blancas", "Frutos tropicales maduros", "Caramelo suave", "Final redondo y brillante"],
            pairings: ["Café de filtro suave", "Té negro", "Plátano asado", "Frutas cítricas"]
        },
        nutrition: [
            { label: "Valor energético", value: "530 kcal / 2.215 kJ" },
            { label: "Grasas", value: "39 g" },
            { label: "— de las cuales saturadas", value: "24 g" },
            { label: "Hidratos de carbono", value: "34 g" },
            { label: "— de los cuales azúcares", value: "26 g" },
            { label: "Fibra alimentaria", value: "9 g" },
            { label: "Proteínas", value: "7,5 g" },
            { label: "Sal", value: "< 0,01 g" }
        ],
        conservation: "Conservar en lugar fresco y seco, entre 15 °C y 20 °C, lejos de la luz directa y de olores fuertes.",
        shelfLife: "Consumir preferentemente antes de 12 meses desde la fecha de elaboración."
    }
];

window.CURRENCY_SYMBOL = { "Soles": "S/" };
