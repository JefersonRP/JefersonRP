// ============================================================
//  Render de página de detalle (PDP) Rafael
//  Lee window.PRODUCT_SLUG definido en cada producto/*.html
//  y dibuja galería, ficha técnica y productos relacionados.
// ============================================================
(function () {
    const slug = window.PRODUCT_SLUG;
    if (!slug) { console.warn('PRODUCT_SLUG no definido'); return; }
    const products = window.PRODUCTS || [];
    const CURRENCY_SYMBOL = window.CURRENCY_SYMBOL || { Soles: "S/" };
    const WA_NUMBER = '51995557841';

    const product = products.find(p => p.slug === slug);
    if (!product) {
        console.warn('Producto no encontrado:', slug);
        return;
    }

    // Update <title> & meta description
    document.title = `${product.name} · Rafael`;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', product.shortDescription);

    // Path prefix (we are in /producto/, imgs are at ../img/)
    const P = '../';

    // ---------- Gallery ----------
    // Filter to images that actually exist (try to load each; keep only those that load).
    function testImage(src) {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    async function buildGallery() {
        const gallery = product.gallery || [product.image];
        const existing = [];
        await Promise.all(
            gallery.map(async (src, i) => {
                const ok = await testImage(P + src);
                if (ok) existing[i] = src;
            })
        );
        const available = existing.filter(Boolean);
        if (available.length === 0) available.push(product.image);

        const main = document.getElementById('galleryMain');
        const thumbs = document.getElementById('thumbs');
        main.innerHTML = `
            <span class="gallery-badge">${product.badge}</span>
            <img id="galleryMainImg" src="${P + available[0]}" alt="${product.name}" loading="eager">
        `;
        thumbs.innerHTML = available.map((src, i) => `
            <button class="${i === 0 ? 'active' : ''}" data-src="${P + src}" aria-label="Ver imagen ${i + 1}">
                <img src="${P + src}" alt="${product.name} - foto ${i + 1}" loading="lazy">
            </button>
        `).join('');

        thumbs.addEventListener('click', e => {
            const btn = e.target.closest('button');
            if (!btn) return;
            thumbs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const img = document.getElementById('galleryMainImg');
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = btn.dataset.src;
                img.style.opacity = '1';
            }, 150);
        });
    }
    buildGallery();

    // ---------- Info panel ----------
    const info = document.getElementById('pdpInfo');
    const stockClass = product.stock <= 6 ? 'low' : '';
    const stockText = product.stock <= 6
        ? `Últimas ${product.stock} unidades`
        : `En stock (${product.stock} disponibles)`;
    // El mensaje se arma en el momento del clic para incluir la cantidad
    // actual del selector. Usamos un href placeholder para mantener la
    // semántica de enlace y evitar que se abra WhatsApp con datos obsoletos.

    info.innerHTML = `
        <span class="eyebrow"><span class="dot"></span>${product.badge}</span>
        <h1>${product.name}</h1>
        <p class="pdp-shortdesc">${product.shortDescription}</p>
        <div class="pdp-pricerow">
            <span class="pdp-price">${CURRENCY_SYMBOL[product.currency]} ${product.price}</span>
            <span class="pdp-weight">${product.weight}</span>
            <span class="pdp-stock ${stockClass}">${stockText}</span>
        </div>
        <div class="pdp-buy-box">
            <div class="qty-row">
                <label for="qtyVal">Cantidad</label>
                <div class="qty-input">
                    <button type="button" id="qtyDec" aria-label="Menos">−</button>
                    <span id="qtyVal">1</span>
                    <button type="button" id="qtyInc" aria-label="Más">+</button>
                </div>
            </div>
            <div class="buy-actions">
                <button type="button" class="btn btn-whatsapp" id="pdpBuyNowBtn">
                    <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M19.1 17.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.4 1.7 6.3L3 29l6.8-1.7c1.8 1 3.9 1.6 6.2 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.6c-2.1 0-4-.6-5.6-1.5l-.4-.2-4 1 1.1-3.9-.3-.4C5.7 20 5 18.1 5 16c0-6.1 4.9-11 11-11s11 4.9 11 11-4.9 10.6-11 10.6z"/>
                    </svg>
                    Comprar por WhatsApp
                </button>
                <button class="btn btn-primary" id="pdpAddBtn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                    Añadir al carrito
                </button>
            </div>
            <div class="trust-row">
                <div class="trust-item"><span class="ico">🌱</span>100% orgánico</div>
                <div class="trust-item"><span class="ico">🇵🇪</span>Origen Cuzco</div>
                <div class="trust-item"><span class="ico">🤝</span>Comercio justo</div>
            </div>
        </div>
    `;

    // Qty controls
    let qty = 1;
    const qtyVal = document.getElementById('qtyVal');
    document.getElementById('qtyInc').addEventListener('click', () => {
        if (qty < product.stock) { qty++; qtyVal.textContent = qty; }
    });
    document.getElementById('qtyDec').addEventListener('click', () => {
        if (qty > 1) { qty--; qtyVal.textContent = qty; }
    });
    document.getElementById('pdpAddBtn').addEventListener('click', () => {
        if (window.Cart && typeof window.Cart.add === 'function') {
            window.Cart.add(product.id, qty);
        }
    });
    document.getElementById('pdpBuyNowBtn').addEventListener('click', () => {
        if (window.Cart && typeof window.Cart.buyNow === 'function') {
            window.Cart.buyNow(product, qty);
        }
    });

    // ---------- Tabs ----------
    const tabs = [
        {
            id: 'desc',
            label: 'Descripción',
            content: `
                <h3>Sobre este chocolate</h3>
                <p>${product.longDescription}</p>
            `
        },
        {
            id: 'ingr',
            label: 'Ingredientes y alérgenos',
            content: `
                <h3>Ingredientes</h3>
                <p>${product.ingredients}</p>
                <h3 style="margin-top:2rem;">Alérgenos</h3>
                <p>${product.allergens}</p>
            `
        },
        {
            id: 'origen',
            label: 'Origen del cacao',
            content: `
                <h3>De dónde viene el cacao</h3>
                <p>Cada lote se selecciona personalmente en las chacras cuzqueñas. Trabajamos directamente con las comunidades productoras, sin intermediarios, para garantizar la trazabilidad del grano y un pago justo al agricultor.</p>
                <div class="specs-grid">
                    <div class="spec"><div class="spec-label">Región</div><div class="spec-value">${product.origin.region}</div></div>
                    <div class="spec"><div class="spec-label">Comunidad</div><div class="spec-value">${product.origin.community}</div></div>
                    <div class="spec"><div class="spec-label">Altitud</div><div class="spec-value">${product.origin.altitude}</div></div>
                    <div class="spec"><div class="spec-label">Variedad</div><div class="spec-value">${product.origin.variety}</div></div>
                    <div class="spec" style="grid-column: 1 / -1;"><div class="spec-label">Postcosecha</div><div class="spec-value">${product.origin.harvest}</div></div>
                </div>
            `
        },
        {
            id: 'cata',
            label: 'Notas de cata y maridajes',
            content: `
                <h3>Notas de cata</h3>
                <p>Aromas y sabores que podrás percibir en cada bocado:</p>
                <div class="pill-row">
                    ${product.tasting.notes.map(n => `<span class="pill tasting">${n}</span>`).join('')}
                </div>
                <h3 style="margin-top:2rem;">Maridajes sugeridos</h3>
                <p>Acompáñalo con:</p>
                <div class="pill-row">
                    ${product.tasting.pairings.map(m => `<span class="pill">${m}</span>`).join('')}
                </div>
            `
        },
        {
            id: 'nutri',
            label: 'Nutrición y conservación',
            content: `
                <h3>Información nutricional</h3>
                <p>Valores medios por 100 g de producto.</p>
                <table class="nutri-table">
                    <thead><tr><th>Por 100 g</th><th style="text-align:right;">Cantidad</th></tr></thead>
                    <tbody>
                        ${product.nutrition.map(n => `<tr><td>${n.label}</td><td>${n.value}</td></tr>`).join('')}
                    </tbody>
                </table>
                <h3 style="margin-top:2.5rem;">Conservación</h3>
                <p>${product.conservation}</p>
                <h3 style="margin-top:2rem;">Consumo preferente</h3>
                <p>${product.shelfLife}</p>
            `
        }
    ];
    const tablist = document.getElementById('tablist');
    const tabPanels = document.getElementById('tabPanels');
    tablist.innerHTML = tabs.map((t, i) => `<button class="tab-btn ${i === 0 ? 'active' : ''}" data-tab="${t.id}">${t.label}</button>`).join('');
    tabPanels.innerHTML = tabs.map((t, i) => `<div class="tab-panel ${i === 0 ? 'active' : ''}" id="panel-${t.id}">${t.content}</div>`).join('');
    tablist.addEventListener('click', e => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;
        tablist.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        tabPanels.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    });

    // ---------- Related ----------
    const related = products.filter(p => p.slug !== slug);
    const relatedGrid = document.getElementById('relatedGrid');
    if (relatedGrid) {
        relatedGrid.innerHTML = related.map(p => `
            <article class="product-card">
                <a href="${p.slug}.html" class="product-image" aria-label="Ver ${p.name}">
                    <span class="product-badge">${p.badge}</span>
                    <img src="${P + p.image}" alt="${p.name}" loading="lazy">
                </a>
                <div class="product-body">
                    <a href="${p.slug}.html" style="color:inherit;text-decoration:none;">
                        <h3 class="product-title">${p.name}</h3>
                    </a>
                    <p class="product-desc">${p.shortDescription}</p>
                    <div class="product-meta">
                        <div class="price">${CURRENCY_SYMBOL[p.currency]} ${p.price}<small>/ ${p.weight}</small></div>
                        <span class="weight">${p.weight}</span>
                    </div>
                    <div class="product-actions">
                        <a href="${p.slug}.html" class="add-btn btn-detail">Ver detalle</a>
                        <button class="add-btn" data-add-to-cart="${p.id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                            Añadir
                        </button>
                    </div>
                </div>
            </article>
        `).join('');
    }

    // ---------- Breadcrumb ----------
    const bc = document.getElementById('breadcrumb');
    if (bc) {
        bc.innerHTML = `
            <a href="../index.html">Inicio</a>
            <span class="sep">›</span>
            <a href="../index.html#productos">Productos</a>
            <span class="sep">›</span>
            <span class="current">${product.name}</span>
        `;
    }

    // ---------- Nav scroll ----------
    const nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 24);
        });
    }
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    // ---------- Year ----------
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
