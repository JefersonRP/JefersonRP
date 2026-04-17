// ============================================================
//  Carrito compartido Rafael
//  Persiste el estado en localStorage y se reutiliza en
//  index.html y en cada página de producto.
// ============================================================
(function () {
    const CART_KEY = 'rafael_cart_v1';
    const WA_NUMBER = '51995557841';
    const CURRENCY_SYMBOL = window.CURRENCY_SYMBOL || { "Soles": "S/" };

    function loadCart() {
        try {
            const raw = localStorage.getItem(CART_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) { return {}; }
    }
    function saveCart(cart) {
        try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
    }

    function cartCount(cart) {
        return Object.values(cart).reduce((a, b) => a + b, 0);
    }

    // Ensure a cart drawer + overlay + toast exist in the DOM.
    function ensureDom() {
        if (document.getElementById('drawer')) return;

        const overlay = document.createElement('div');
        overlay.className = 'drawer-overlay';
        overlay.id = 'drawerOverlay';
        document.body.appendChild(overlay);

        const drawer = document.createElement('aside');
        drawer.className = 'drawer';
        drawer.id = 'drawer';
        drawer.setAttribute('aria-label', 'Carrito');
        drawer.innerHTML = `
            <div class="drawer-head">
                <h3>Tu carrito</h3>
                <button class="close-drawer" id="closeDrawer" aria-label="Cerrar">×</button>
            </div>
            <div class="drawer-body" id="drawerBody">
                <div class="cart-empty" id="cartEmpty">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🍫</div>
                    <p>Tu carrito está vacío.</p>
                    <p style="font-size: 0.85rem; margin-top: 0.5rem;">Añade una tableta para empezar.</p>
                </div>
            </div>
            <div class="drawer-foot" id="drawerFoot" style="display:none;">
                <div class="total-row">
                    <span>Total</span>
                    <strong id="totalAmount">S/ 0</strong>
                </div>
                <button class="checkout-btn" id="checkoutBtn">
                    Pedir por WhatsApp
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
            </div>
        `;
        document.body.appendChild(drawer);

        if (!document.getElementById('toast')) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.id = 'toast';
            document.body.appendChild(toast);
        }
    }

    function showToast(msg) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toast._t);
        toast._t = setTimeout(() => toast.classList.remove('show'), 2200);
    }

    // Resolve product data from window.PRODUCTS or a provided lookup.
    function getProduct(id) {
        const list = window.PRODUCTS || [];
        return list.find(p => p.id === +id);
    }

    // For product pages: expose the image path relative to current page.
    // If we're inside /producto/*, prefix '../' so img/xx.webp resolves.
    function imgPath(rel) {
        if (!rel) return rel;
        if (/^https?:/i.test(rel)) return rel;
        const isNested = /\/producto\//.test(location.pathname);
        return isNested ? '../' + rel : rel;
    }

    function render() {
        const cart = loadCart();
        const count = cartCount(cart);
        const countEl = document.getElementById('cartCount');
        if (countEl) countEl.textContent = count;

        const body = document.getElementById('drawerBody');
        const foot = document.getElementById('drawerFoot');
        const empty = document.getElementById('cartEmpty');
        const total = document.getElementById('totalAmount');
        if (!body || !foot || !empty || !total) return;

        [...body.querySelectorAll('.cart-item')].forEach(el => el.remove());

        if (count === 0) {
            empty.style.display = 'block';
            foot.style.display = 'none';
            return;
        }
        empty.style.display = 'none';
        foot.style.display = 'block';

        let sum = 0;
        Object.keys(cart).forEach(id => {
            const p = getProduct(id);
            if (!p) return;
            const qty = cart[id];
            sum += p.price * qty;
            const item = document.createElement('div');
            item.className = 'cart-item';
            item.innerHTML = `
                <img src="${imgPath(p.image)}" alt="${p.name}">
                <div>
                    <div class="cart-item-title">${p.name}</div>
                    <div class="cart-item-price">${CURRENCY_SYMBOL[p.currency]} ${p.price} · ${p.weight}</div>
                    <div class="qty-controls">
                        <button class="qty-btn" data-act="dec" data-id="${p.id}" aria-label="Quitar">−</button>
                        <span>${qty}</span>
                        <button class="qty-btn" data-act="inc" data-id="${p.id}" aria-label="Añadir">+</button>
                        <button class="remove-item" data-act="del" data-id="${p.id}">eliminar</button>
                    </div>
                </div>
                <div style="font-weight:600;">${CURRENCY_SYMBOL[p.currency]} ${p.price * qty}</div>
            `;
            body.appendChild(item);
        });
        total.textContent = `S/ ${sum}`;
    }

    function addToCart(id, qty = 1) {
        const cart = loadCart();
        const p = getProduct(id);
        if (!p) return;
        cart[id] = (cart[id] || 0) + qty;
        if (cart[id] > p.stock) { cart[id] = p.stock; showToast('Stock máximo alcanzado'); }
        else { showToast(`${p.name} añadido al carrito`); }
        saveCart(cart);
        render();
    }

    function modifyQty(id, act) {
        const cart = loadCart();
        if (act === 'inc') cart[id] = (cart[id] || 0) + 1;
        if (act === 'dec') {
            cart[id] = Math.max(0, (cart[id] || 0) - 1);
            if (cart[id] === 0) delete cart[id];
        }
        if (act === 'del') delete cart[id];
        saveCart(cart);
        render();
    }

    function openDrawer() {
        document.getElementById('drawer')?.classList.add('active');
        document.getElementById('drawerOverlay')?.classList.add('active');
    }
    function closeDrawer() {
        document.getElementById('drawer')?.classList.remove('active');
        document.getElementById('drawerOverlay')?.classList.remove('active');
    }

    function buildCheckoutMessage() {
        const cart = loadCart();
        const lines = ['Hola Rafael, quiero hacer este pedido:'];
        let sum = 0;
        Object.keys(cart).forEach(id => {
            const p = getProduct(id);
            if (!p) return;
            const qty = cart[id];
            const sub = p.price * qty;
            sum += sub;
            lines.push(`- ${qty} × ${p.name} (${p.weight}) — S/ ${sub}`);
        });
        lines.push(`Total: S/ ${sum}`);
        return lines.join('\n');
    }

    function checkout() {
        const cart = loadCart();
        if (cartCount(cart) === 0) {
            showToast('Tu carrito está vacío');
            return;
        }
        const text = encodeURIComponent(buildCheckoutMessage());
        window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank', 'noopener');
    }

    // Public API
    window.Cart = {
        add: addToCart,
        open: openDrawer,
        close: closeDrawer,
        render,
        count: () => cartCount(loadCart()),
        load: loadCart,
        save: saveCart
    };

    // Init
    document.addEventListener('DOMContentLoaded', () => {
        ensureDom();
        render();

        // Global click handler for cart interactions
        document.addEventListener('click', (e) => {
            const cartBtn = e.target.closest('#cartBtn, [data-cart-open]');
            if (cartBtn) { openDrawer(); return; }
            const closeBtn = e.target.closest('#closeDrawer');
            if (closeBtn) { closeDrawer(); return; }
            const ov = e.target.closest('#drawerOverlay');
            if (ov) { closeDrawer(); return; }
            const co = e.target.closest('#checkoutBtn');
            if (co) { checkout(); return; }

            const qty = e.target.closest('.qty-btn, .remove-item');
            if (qty && qty.dataset.id) {
                modifyQty(qty.dataset.id, qty.dataset.act);
                return;
            }
            const add = e.target.closest('[data-add-to-cart]');
            if (add) { addToCart(add.dataset.addToCart); return; }
        });
    });
})();
