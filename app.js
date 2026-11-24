/* ===================================================================
   ALMA & ORIGEN - INTERACTIVE APPLICATION LOGIC
   Café de Origen - Norte del Cauca
   =================================================================== */

// Product catalog database based on the business plan
const productsData = {
  'drip-10g': {
    id: 'drip-10g',
    line: 'Línea 1',
    name: 'Filtro Portátil (Drip) de 10 g',
    category: 'Monodosis & Amenity',
    tag: 'Filtro Práctico',
    statusClass: 'status-maintains',
    img: 'assets/images/drip-10g.jpg',
    presentations: ['Sobre individual hermético', 'Caja de 5 unidades', 'Caja de 10 unidades', 'Caja de 20 unidades'],
    bestFor: 'Viajes • Habitaciones de hotel • Oficina • En cualquier lugar sin cafetera',
    rationale: 'Una taza fresca de café de especialidad lista en solo 2 minutos sin cafetera ni molino. Abre el filtro, sujétalo a tu taza favorita, vierte agua caliente y disfruta del sabor auténtico del Norte del Cauca donde estés.',
    profile: {
      origen: 'Norte del Cauca (1.750 msnm)',
      variedad: 'Castillo y Caturra',
      beneficio: 'Lavado con fermentación controlada',
      notas: 'Caramelo dulce, cítricos suaves y chocolate con leche',
      tueste: 'Medio balanceado'
    },
    prepSteps: [
      'Abre el sobre individual y rasga el filtro por la línea punteada.',
      'Extiende las asas de cartón y sujétalas firmemente a los bordes de tu taza favorita.',
      'Vierte 150 ml de agua caliente (90°C) lentamente en forma circular y deja gotear. ¡Disfruta en 2 minutos!'
    ],
    priceBase: 3800, // COP por unidad
    unitLabel: 'sobre (10g)'
  },
  'cafe-kilo': {
    id: 'cafe-kilo',
    line: 'Línea 2',
    name: 'Café en Grano o Molido por Kilo (1 kg)',
    category: 'Alto Rendimiento',
    tag: 'Mayor Rendimiento',
    statusClass: 'status-maintains',
    img: 'assets/images/cafe-kilo.jpg',
    presentations: ['Bolsa de 1 kg en Grano', 'Bolsa de 1 kg Molienda Media', 'Bolsa de 1 kg Molienda Fina'],
    bestFor: 'Hogares • Cafeterías • Desayunos de hotel • Métodos de filtrado y espresso',
    rationale: 'Formato de alto rendimiento en grano seleccionado o molienda fresca. Su balance de notas acarameladas, nuez tostada y cuerpo sedoso lo convierten en la opción perfecta para el consumo diario.',
    profile: {
      origen: 'Norte del Cauca (1.650 - 1.850 msnm)',
      variedad: '100% Arábica de alta montaña',
      beneficio: 'Lavado tradicional con secado solar',
      notas: 'Cuerpo sedoso, notas a panela, nuez tostada y cacao fino',
      tueste: 'Medio - Oscuro (versátil para espresso y filtro)'
    },
    prepSteps: [
      'Muele al instante o dosifica de 8 a 10 g por taza según tu método preferido.',
      'Usa agua fresca filtrada entre 90°C y 93°C.',
      'Rendimiento promedio garantizado: entre 100 y 120 tazas aromáticas por kilo.'
    ],
    priceBase: 48000, // COP por bolsa 1kg
    unitLabel: 'bolsa de 1 kg'
  },
  'cafe-natural-454g': {
    id: 'cafe-natural-454g',
    line: 'Línea 3',
    name: 'Libra de Café Natural (454 g)',
    category: 'Edición Especial de Autor',
    tag: 'Edición Especial',
    statusClass: 'status-maintains',
    img: 'assets/images/cafe-natural-454g.jpg',
    presentations: ['Bolsa 454 g con válvula (Grano)', 'Bolsa 454 g con válvula (Molido artesanal)'],
    bestFor: 'Amantes del café especial • Filtrados manuales (V60, Chemex, Prensa) • Regalo de origen',
    rationale: 'Edición especial de autor con proceso natural: secado al sol en camas africanas con la cereza entera. Ofrece una explosión de notas frutales, miel y una exquisita acidez pensada para paladares exigentes.',
    profile: {
      origen: 'Micro-lotes seleccionados del Norte del Cauca (1.800 msnm)',
      variedad: 'Colombia y Caturra Selección',
      beneficio: 'Natural (secado con cereza entera)',
      notas: 'Intensas notas a frutos rojos, ciruela pasa, miel silvestre y acidez vinosa exquisita',
      tueste: 'Medio artesanal'
    },
    prepSteps: [
      'Ideal para métodos de filtrado manual: V60, Chemex, Prensa Francesa o Aeropress.',
      'Recomendamos una relación de 1:15 (20 g de café por 300 ml de agua).',
      'Experimenta la evolución de aromas a medida que la temperatura desciende.'
    ],
    priceBase: 34000, // COP por 454g
    unitLabel: 'bolsa de 454 g (1 libra)'
  },
  'cafe-125g': {
    id: 'cafe-125g',
    line: '',
    name: 'Bolsa de Café de 125 g con Válvula',
    category: 'Edición Viajera & Degustación',
    tag: 'Formato Práctico',
    statusClass: '',
    img: 'assets/images/cafe-125g.jpg',
    presentations: ['Bolsa de 125 g con válvula (Grano)', 'Bolsa de 125 g con válvula (Molido)'],
    bestFor: 'Viajes • Regalo o souvenir • Degustación • Oficina',
    rationale: 'El tamaño perfecto para llevar de viaje, consentirte en la oficina o regalar como recuerdo de origen. Empacado con válvula desgasificadora para preservar intactos sus aromas dulces a frutas y chocolate.',
    profile: {
      origen: 'Norte del Cauca (1.700 msnm)',
      variedad: '100% Arábica de Altura',
      beneficio: 'Lavado con fermentación prolongada',
      notas: 'Dulce acanalado, frutas amarillas y chocolate amargo',
      tueste: 'Medio versátil'
    },
    prepSteps: [
      'Perfecto para llevar en la maleta o tener en el escritorio de la oficina.',
      'Conserva intacta su frescura gracias a la válvula desgasificadora unidireccional.',
      'Rinde aproximadamente de 12 a 15 tazas de café de especialidad.'
    ],
    priceBase: 14000, // COP por bolsa 125g
    unitLabel: 'bolsa de 125 g'
  }
};

// Pricing configurations for the interactive calculator
const segmentMultipliers = {
  'hotel': { discount: 0.18, minQty: 5, label: 'Hotelero (Tarifa B2B con beneficio por volumen)' },
  'institucion': { discount: 0.15, minQty: 4, label: 'Institucional (Colegios, Universidades y Empresas)' },
  'hogar': { discount: 0.0, minQty: 1, label: 'Hogar (Consumo Personal y Familiar)' }
};

let currentSelectedProduct = 'drip-10g';
let currentSegment = 'hotel';

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSegmentTabs();
  initPortfolioFilters();
  initCalculator();
  initModalListeners();
  initContactForm();
  initCartSystem();
  initCoffeeReelPlayer();
});

// 1. Sticky Navbar styling on scroll
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu button & drawer controller
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    const toggleMenu = (forceState) => {
      const isCurrentlyOpen = navLinks.classList.contains('open');
      const shouldOpen = typeof forceState === 'boolean' ? forceState : !isCurrentlyOpen;

      navLinks.classList.toggle('open', shouldOpen);
      mobileBtn.classList.toggle('active', shouldOpen);
      mobileBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    };

    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking any nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }
}

// 2. Segment Switcher Tabs
function initSegmentTabs() {
  const tabBtns = document.querySelectorAll('.segment-tab-btn');
  if (!tabBtns || tabBtns.length === 0) return;
  const panels = document.querySelectorAll('.segment-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = btn.getAttribute('data-target');
      const activePanel = document.getElementById(target);
      if (activePanel) {
        activePanel.classList.add('active');
      }

      // Also sync with the calculator segment
      const segmentType = btn.getAttribute('data-segment');
      if (segmentType) {
        const calcSelect = document.getElementById('calcSegment');
        if (calcSelect) {
          calcSelect.value = segmentType;
          updateCalculator();
        }
      }
    });
  });
}

// 3. Product Portfolio Filters
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'flex';
        } else {
          const cardType = card.getAttribute('data-product-id');
          if (cardType === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}

// 4. Interactive Calculator Logic
function initCalculator() {
  const segmentSelect = document.getElementById('calcSegment');
  if (!segmentSelect) return;
  const productOptionBtns = document.querySelectorAll('.product-option-btn');
  const qtyInput = document.getElementById('calcQty');
  const btnMinus = document.getElementById('qtyMinus');
  const btnPlus = document.getElementById('qtyPlus');
  const presentationSelect = document.getElementById('calcPresentation');
  if (!qtyInput || !btnMinus || !btnPlus || !presentationSelect) return;

  // Segment Change
  segmentSelect.addEventListener('change', (e) => {
    currentSegment = e.target.value;
    updateCalculator();
  });

  // Product Selection Buttons
  productOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      productOptionBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentSelectedProduct = btn.getAttribute('data-product');
      updatePresentationDropdown();
      updateCalculator();
    });
  });

  // Quantity controls
  btnMinus.addEventListener('click', () => {
    let current = parseInt(qtyInput.value) || 1;
    if (current > 1) {
      qtyInput.value = current - 1;
      updateCalculator();
    }
  });

  btnPlus.addEventListener('click', () => {
    let current = parseInt(qtyInput.value) || 1;
    qtyInput.value = current + 1;
    updateCalculator();
  });

  qtyInput.addEventListener('input', () => {
    if (parseInt(qtyInput.value) < 1 || isNaN(parseInt(qtyInput.value))) {
      qtyInput.value = 1;
    }
    updateCalculator();
  });

  presentationSelect.addEventListener('change', () => {
    updateCalculator();
  });

  updatePresentationDropdown();
  updateCalculator();
}

function updatePresentationDropdown() {
  const presentationSelect = document.getElementById('calcPresentation');
  const prod = productsData[currentSelectedProduct];
  if (!prod) return;

  presentationSelect.innerHTML = '';
  prod.presentations.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    presentationSelect.appendChild(opt);
  });
}

function updateCalculator() {
  const prod = productsData[currentSelectedProduct];
  const seg = segmentMultipliers[currentSegment] || segmentMultipliers['hotel'];
  const qtyInput = document.getElementById('calcQty');
  const presentationSelect = document.getElementById('calcPresentation');
  const qty = parseInt(qtyInput.value) || 1;

  if (!prod) return;

  // Multiplier calculation depending on presentation box sizes if drip
  let unitFactor = 1;
  const selectedPres = presentationSelect.value || prod.presentations[0];
  if (currentSelectedProduct === 'drip-10g') {
    if (selectedPres.includes('5 unidades')) unitFactor = 4.8;
    if (selectedPres.includes('10 unidades')) unitFactor = 9.2;
    if (selectedPres.includes('20 unidades')) unitFactor = 17.5;
  }

  const basePriceUnit = prod.priceBase * unitFactor;
  const discountedUnit = Math.round(basePriceUnit * (1 - seg.discount));
  const subtotal = discountedUnit * qty;

  // Approximate cups calculation
  let cupsYield = 0;
  if (currentSelectedProduct === 'drip-10g') {
    let bagsCount = 1;
    if (selectedPres.includes('5')) bagsCount = 5;
    else if (selectedPres.includes('10')) bagsCount = 10;
    else if (selectedPres.includes('20')) bagsCount = 20;
    cupsYield = bagsCount * qty;
  } else if (currentSelectedProduct === 'cafe-kilo') {
    cupsYield = qty * 110;
  } else if (currentSelectedProduct === 'cafe-natural-454g') {
    cupsYield = qty * 50;
  } else if (currentSelectedProduct === 'cafe-125g') {
    cupsYield = qty * 14;
  }

  // Update DOM elements
  document.getElementById('summarySegmentLabel').textContent = seg.label;
  document.getElementById('summaryProductLabel').textContent = prod.name;
  document.getElementById('summaryPresentationLabel').textContent = selectedPres;
  document.getElementById('summaryQtyLabel').textContent = `${qty} ${qty === 1 ? 'unidad/paquete' : 'unidades/paquetes'}`;
  document.getElementById('summaryCupsYield').textContent = `~${cupsYield} tazas de café fresco de origen`;
  document.getElementById('summaryUnitPrice').textContent = `$${discountedUnit.toLocaleString('es-CO')} COP`;
  document.getElementById('summaryTotalPrice').textContent = `$${subtotal.toLocaleString('es-CO')} COP`;

  // Dynamic WhatsApp link configuration
  const whatsappNumber = '573155551234'; // Replaceable with client number
  const message = encodeURIComponent(
    `¡Hola, Alma & Origen! 👋\n` +
    `Quisiera cotizar café de origen del Norte del Cauca:\n\n` +
    `• Segmento: ${seg.label}\n` +
    `• Producto: ${prod.name}\n` +
    `• Presentación: ${selectedPres}\n` +
    `• Cantidad: ${qty} unidades\n` +
    `• Rendimiento estimado: ~${cupsYield} tazas\n` +
    `• Valor aproximado cotizado: $${subtotal.toLocaleString('es-CO')} COP\n\n` +
    `Me gustaría recibir asesoría para despacho hacia Cali / Norte del Cauca.`
  );

  const btnOrder = document.getElementById('calcSendWhatsAppBtn');
  if (btnOrder) {
    btnOrder.href = `https://wa.me/${whatsappNumber}?text=${message}`;
  }
}

// 5. Product Detail Modal
function initModalListeners() {
  const modal = document.getElementById('productModal');
  if (!modal) return;
  const closeBtn = document.getElementById('modalCloseBtn');

  // Trigger buttons
  document.querySelectorAll('.btn-view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prodId = btn.getAttribute('data-product-id');
      openProductModal(prodId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });
}

function openProductModal(prodId) {
  const prod = productsData[prodId];
  if (!prod) return;
  currentSelectedProduct = prodId;

  const modal = document.getElementById('productModal');
  if (!modal) return;

  const setSafeText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text || '';
  };

  const imgEl = document.getElementById('modalImage');
  if (imgEl) {
    imgEl.src = prod.img;
    imgEl.alt = prod.name;
  }

  const tagEl = document.getElementById('modalTag');
  if (tagEl) {
    if (prod.tag) {
      tagEl.textContent = prod.tag;
      tagEl.style.display = 'inline-block';
      tagEl.className = `product-status-tag ${prod.statusClass || ''}`;
    } else {
      tagEl.style.display = 'none';
    }
  }

  const lineEl = document.getElementById('modalLine');
  if (lineEl) {
    if (prod.line) {
      lineEl.textContent = prod.line;
      lineEl.style.display = 'inline-block';
    } else {
      lineEl.style.display = 'none';
    }
  }
  setSafeText('modalTitle', prod.name);
  setSafeText('modalRationale', prod.rationale);
  setSafeText('modalOrigen', prod.profile ? prod.profile.origen : 'Norte del Cauca');
  setSafeText('modalVariedad', prod.profile ? prod.profile.variedad : '100% Arábica');
  setSafeText('modalNotas', prod.profile ? prod.profile.notas : 'Notas dulces y balanceadas');
  setSafeText('modalTueste', prod.profile ? prod.profile.tueste : 'Medio');
  setSafeText('modalBestFor', prod.bestFor || '');
  setSafeText('modalPrice', `${formatCOP(prod.priceBase)} / ${prod.unitLabel}`);

  // Presentations list
  const presContainer = document.getElementById('modalPresentations');
  if (presContainer) {
    presContainer.innerHTML = '';
    if (prod.presentations && Array.isArray(prod.presentations)) {
      prod.presentations.forEach(p => {
        const badge = document.createElement('span');
        badge.className = 'spec-chip';
        badge.textContent = p;
        presContainer.appendChild(badge);
      });
    }
  }

  // Steps
  const stepsList = document.getElementById('modalSteps');
  if (stepsList) {
    stepsList.innerHTML = '';
    if (prod.prepSteps && Array.isArray(prod.prepSteps)) {
      prod.prepSteps.forEach((step, idx) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.gap = '10px';
        li.style.marginBottom = '8px';
        li.style.fontSize = '0.85rem';
        li.style.color = '#554A44';
        li.innerHTML = `<strong style="color: #C5A059;">${idx + 1}.</strong> <span>${step}</span>`;
        stepsList.appendChild(li);
      });
    }
  }

  // WhatsApp quick button inside modal
  const modalWaBtn = document.getElementById('modalWhatsAppBtn');
  if (modalWaBtn) {
    const msg = encodeURIComponent(`Hola Alma & Origen, quiero más información y cotización del producto: *${prod.name}* (${prod.line}).`);
    modalWaBtn.href = `https://wa.me/573155551234?text=${msg}`;
  }

  modal.classList.add('open');
}

// 6. Contact Form feedback
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('contactName').value;
    const entidad = document.getElementById('contactEntity').value;
    const telefono = document.getElementById('contactPhone').value;
    const ciudad = document.getElementById('contactCity').value;
    const mensaje = document.getElementById('contactMessage').value;

    const waMsg = encodeURIComponent(
      `Nuevo mensaje desde la página web de Alma & Origen:\n\n` +
      `• Nombre: ${nombre}\n` +
      `• Organización / Hotel / Institución: ${entidad}\n` +
      `• Ciudad / Municipio: ${ciudad}\n` +
      `• Teléfono: ${telefono}\n` +
      `• Mensaje: ${mensaje}`
    );

    window.open(`https://wa.me/573155551234?text=${waMsg}`, '_blank');

    const feedback = document.getElementById('contactFeedback');
    feedback.style.display = 'block';
    feedback.innerHTML = `✅ ¡Gracias ${nombre}! Se ha preparado tu mensaje para atención prioritaria vía WhatsApp.`;
    form.reset();
  });
}

/* ===================================================================
   7. SHOPPING CART SYSTEM & WHATSAPP CHECKOUT
   =================================================================== */
const CART_STORAGE_KEY = 'alma_origen_cart_v1';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Error saving cart', e);
  }
}

function addToCart(productId, quantity = 1) {
  const prod = productsData[productId];
  if (!prod) return;

  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: prod.id,
      name: prod.name,
      line: prod.line,
      price: prod.priceBase,
      unit: prod.unitLabel,
      img: prod.img,
      quantity: quantity
    });
  }

  saveCart(cart);
  updateCartBadge();
  renderCartDrawer();
  openCartDrawer();
  showCartToast(prod.name);
}

function updateCartItemQty(productId, delta) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
    updateCartBadge();
    renderCartDrawer();
  }
}

function removeCartItem(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartBadge();
  renderCartDrawer();
}

function clearCart() {
  saveCart([]);
  updateCartBadge();
  renderCartDrawer();
}

function getCartTotal(cart) {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartItemCount(cart) {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

function formatCOP(num) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(num);
}

function updateCartBadge() {
  const cart = getCart();
  const count = getCartItemCount(cart);
  const badges = document.querySelectorAll('.cart-badge-count');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.add('pop');
    setTimeout(() => badge.classList.remove('pop'), 200);
  });
}

function openCartDrawer() {
  renderCartDrawer();
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartDrawer() {
  const cart = getCart();
  const cartBody = document.getElementById('cartBody');
  const cartTotalAmount = document.getElementById('cartTotalAmount');
  const cartFooter = document.getElementById('cartFooter');
  if (!cartBody) return;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">
          <svg width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        </div>
        <h4>Tu carrito esta vacio</h4>
        <p>Aun no has agregado cafes de nuestra Coleccion de Autor. Descubre nuestros perfiles y armemos tu pedido.</p>
        <a href="portafolio.html" class="btn btn-primary" onclick="closeCartDrawer()">Explorar Productos</a>
      </div>
    `;
    if (cartTotalAmount) cartTotalAmount.textContent = '$0 COP';
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }

  if (cartFooter) cartFooter.style.display = 'block';

  let html = '';
  cart.forEach(item => {
    html += `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-name" title="${item.name}">${item.name}</div>
          <div class="cart-item-unit">${item.unit}</div>
          <div class="cart-item-price">${formatCOP(item.price)}</div>
        </div>
        <div class="cart-qty-controls">
          <button class="cart-qty-btn btn-qty-minus" data-id="${item.id}" aria-label="Disminuir cantidad">&minus;</button>
          <span class="cart-qty-display">${item.quantity}</span>
          <button class="cart-qty-btn btn-qty-plus" data-id="${item.id}" aria-label="Aumentar cantidad">&plus;</button>
        </div>
        <button class="cart-remove-btn" data-id="${item.id}" aria-label="Eliminar producto" title="Eliminar">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    `;
  });

  cartBody.innerHTML = html;
  if (cartTotalAmount) cartTotalAmount.textContent = formatCOP(getCartTotal(cart));

  // Wire up quantity & remove buttons
  cartBody.querySelectorAll('.btn-qty-minus').forEach(btn => {
    btn.addEventListener('click', () => updateCartItemQty(btn.getAttribute('data-id'), -1));
  });
  cartBody.querySelectorAll('.btn-qty-plus').forEach(btn => {
    btn.addEventListener('click', () => updateCartItemQty(btn.getAttribute('data-id'), 1));
  });
  cartBody.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => removeCartItem(btn.getAttribute('data-id')));
  });
}

function showCartToast(productName) {
  let toast = document.getElementById('cartToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cartToast';
    toast.className = 'cart-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span style="color: #25D366; font-size: 1.1rem; font-weight: bold;">&#10003;</span>
    <div style="flex: 1; font-size: 0.88rem;">
      <strong>${productName}</strong> agregado al carrito.
    </div>
    <button class="cart-toast-btn" onclick="openCartDrawer()">Ver Carrito</button>
  `;

  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function checkoutViaWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) return;

  const total = formatCOP(getCartTotal(cart));
  let msg = `Hola Alma & Origen 👋, deseo formalizar el siguiente pedido desde su tienda web:\n\n`;

  cart.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.name}*\n`;
    msg += `   • Cantidad: ${item.quantity} ${item.unit}\n`;
    msg += `   • Subtotal: ${formatCOP(item.price * item.quantity)}\n\n`;
  });

  msg += `☕ *TOTAL ESTIMADO: ${total}*\n\n`;
  msg += `Por favor confirmenme disponibilidad, datos para el pago y coordinacion de envio (Cali / Norte del Cauca). ¡Muchas gracias!`;

  const url = `https://wa.me/573155551234?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function initCartSystem() {
  updateCartBadge();

  // Trigger buttons in navbar
  document.querySelectorAll('.cart-trigger-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  const closeBtn = document.getElementById('cartCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);

  const overlay = document.getElementById('cartOverlay');
  if (overlay) overlay.addEventListener('click', closeCartDrawer);

  const clearBtn = document.getElementById('cartClearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('¿Deseas vaciar tu carrito de compras?')) {
        clearCart();
      }
    });
  }

  const checkoutBtn = document.getElementById('cartCheckoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', checkoutViaWhatsApp);

  // Add to cart buttons on product cards
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prodId = btn.getAttribute('data-product-id');
      addToCart(prodId, 1);

      // Micro-animation on button
      const originalHTML = btn.innerHTML;
      btn.classList.add('added');
      btn.innerHTML = `<span>&#10003; Agregado</span>`;
      setTimeout(() => {
        btn.classList.remove('added');
        btn.innerHTML = originalHTML;
      }, 1400);
    });
  });

  // Modal Add-to-cart button
  const modalAddCartBtn = document.getElementById('modalAddToCartBtn');
  if (modalAddCartBtn) {
    modalAddCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentSelectedProduct) {
        addToCart(currentSelectedProduct, 1);
        const modal = document.getElementById('productModal');
        if (modal) modal.classList.remove('open');
        openCartDrawer();
      }
    });
  }

  // ESC key to close drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const drawer = document.getElementById('cartDrawer');
      if (drawer && drawer.classList.contains('open')) {
        closeCartDrawer();
      }
    }
  });
}

// 8. Continuous Instagram/TikTok-style Reel Player
function initCoffeeReelPlayer() {
  const player = document.getElementById('coffeeReelPlayer');
  if (!player) return;

  const slides = player.querySelectorAll('.reel-slide');
  const segmentBars = player.querySelectorAll('.reel-segment-bar');
  const chapterItems = document.querySelectorAll('.reel-chapter-item');
  const chapterLabel = document.getElementById('reelChapterLabel');
  const captionTitle = document.getElementById('reelCaptionTitle');
  const captionText = document.getElementById('reelCaptionText');
  const playIndicator = document.getElementById('reelPlayIndicator');
  const mainPlayBtn = document.getElementById('reelMainPlayBtn');
  const playBtnText = document.getElementById('reelPlayBtnText');
  const likeBtn = document.getElementById('reelLikeBtn');
  const likeCount = document.getElementById('reelLikeCount');
  const soundBtn = document.getElementById('reelSoundBtn');
  const tapPrev = document.getElementById('reelTapPrev');
  const tapToggle = document.getElementById('reelTapToggle');
  const tapNext = document.getElementById('reelTapNext');

  const chaptersData = [
    {
      label: 'Capítulo 01 • 1.750 msnm',
      title: 'Las Montañas del Cauca',
      desc: 'El viaje comienza en las cumbres andinas del Cauca. Suelos volcánicos y nieblas frías crean el microclima perfecto para un café de altura.',
      duration: 4500
    },
    {
      label: 'Capítulo 02 • Cosecha Manual',
      title: 'Cosecha Selectiva en Rama',
      desc: 'Manos campesinas recolectan grano a grano únicamente las cerezas en su punto óptimo de maduración y grados de dulzura natural.',
      duration: 4500
    },
    {
      label: 'Capítulo 03 • Tostión de Autor',
      title: 'Tueste Artesanal de Precisión',
      desc: 'En el bombo de tostión artesanal, curvas térmicas calibradas despiertan notas dulces a panela, caña y frutos amarillos sin amargor invasivo.',
      duration: 4500
    },
    {
      label: 'Capítulo 04 • Ritual Drip Bag',
      title: 'Preparación Drip Bag Alma y Origen',
      desc: 'El ritual definitivo: sin cafetera ni molino, agua caliente a 92°C en espiral revela la floración y el aroma intacto directo en tu taza.',
      duration: 5500
    }
  ];

  let currentIndex = 0;
  let isPlaying = true;
  let startTime = Date.now();
  let elapsedBeforePause = 0;
  let animationFrameId = null;

  // Sound generator using Web Audio API for organic ambient cafe sound
  let audioCtx = null;
  let isSoundOn = false;
  let masterGain = null;

  function initAmbientAudio() {
    if (audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      // Warm ambient harmonic drone
      const freqs = [110, 164.81, 220, 329.63]; // A major 9th warm chord
      freqs.forEach(f => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime);
        g.gain.setValueAtTime(0.02, audioCtx.currentTime);
        osc.connect(g);
        g.connect(masterGain);
        osc.start();
      });
    } catch (e) {
      console.log('Web Audio not supported');
    }
  }

  function toggleSound() {
    if (!audioCtx) initAmbientAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    isSoundOn = !isSoundOn;
    if (masterGain) {
      masterGain.gain.setTargetAtTime(isSoundOn ? 0.08 : 0.0001, audioCtx.currentTime, 0.2);
    }
    if (soundBtn) {
      soundBtn.style.color = isSoundOn ? 'var(--color-gold)' : '#fff';
      soundBtn.style.borderColor = isSoundOn ? 'var(--color-gold)' : 'rgba(197, 160, 89, 0.3)';
    }
  }

  function switchScene(index) {
    currentIndex = (index + chaptersData.length) % chaptersData.length;
    elapsedBeforePause = 0;
    startTime = Date.now();

    // 1. Update slides
    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add('active');
        const img = slide.querySelector('img');
        if (img) {
          img.style.animation = 'none';
          void img.offsetHeight; // trigger reflow
          img.style.animation = '';
        }
      } else {
        slide.classList.remove('active');
      }
    });

    // 2. Update segment progress bars
    segmentBars.forEach((bar, idx) => {
      const fill = bar.querySelector('.reel-segment-fill');
      if (idx < currentIndex) {
        bar.classList.add('completed');
        if (fill) fill.style.width = '100%';
      } else if (idx === currentIndex) {
        bar.classList.remove('completed');
        if (fill) fill.style.width = '0%';
      } else {
        bar.classList.remove('completed');
        if (fill) fill.style.width = '0%';
      }
    });

    // 3. Update captions
    const data = chaptersData[currentIndex];
    if (chapterLabel) chapterLabel.textContent = data.label;
    if (captionTitle) captionTitle.textContent = data.title;
    if (captionText) captionText.textContent = data.desc;

    // 4. Update side chapters
    chapterItems.forEach((item, idx) => {
      if (idx === currentIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function tick() {
    if (!isPlaying) return;

    const currentDuration = chaptersData[currentIndex].duration;
    const elapsed = Date.now() - startTime + elapsedBeforePause;
    const pct = Math.min(100, (elapsed / currentDuration) * 100);

    const currentBar = segmentBars[currentIndex];
    if (currentBar) {
      const fill = currentBar.querySelector('.reel-segment-fill');
      if (fill) fill.style.width = `${pct}%`;
    }

    if (elapsed >= currentDuration) {
      switchScene(currentIndex + 1);
    }

    animationFrameId = requestAnimationFrame(tick);
  }

  function play() {
    if (isPlaying) return;
    isPlaying = true;
    startTime = Date.now();
    if (playIndicator) playIndicator.classList.remove('visible');
    if (playBtnText) playBtnText.textContent = 'Pausar Video';
    animationFrameId = requestAnimationFrame(tick);
  }

  function pause() {
    if (!isPlaying) return;
    isPlaying = false;
    elapsedBeforePause += Date.now() - startTime;
    cancelAnimationFrame(animationFrameId);
    if (playIndicator) playIndicator.classList.add('visible');
    if (playBtnText) playBtnText.textContent = 'Continuar Video';
  }

  function togglePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  // Event Listeners
  if (tapToggle) tapToggle.addEventListener('click', togglePlay);
  if (tapPrev) tapPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    switchScene(currentIndex - 1);
  });
  if (tapNext) tapNext.addEventListener('click', (e) => {
    e.stopPropagation();
    switchScene(currentIndex + 1);
  });

  if (mainPlayBtn) mainPlayBtn.addEventListener('click', togglePlay);

  chapterItems.forEach((item) => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      switchScene(idx);
      if (!isPlaying) play();
    });
  });

  segmentBars.forEach((bar) => {
    bar.addEventListener('click', () => {
      const idx = parseInt(bar.getAttribute('data-index'), 10);
      switchScene(idx);
      if (!isPlaying) play();
    });
  });

  // Like button
  let liked = false;
  if (likeBtn) {
    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      liked = !liked;
      likeBtn.classList.toggle('liked', liked);
      if (likeCount) {
        likeCount.textContent = liked ? '843' : '842';
      }
    });
  }

  // Sound button
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSound();
    });
  }

  // Start initial scene & loop
  switchScene(0);
  animationFrameId = requestAnimationFrame(tick);
}

