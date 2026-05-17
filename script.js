'use strict';

/* ── PRODUCT DATA ─────────────────────────────────────────────────── */
const products = [
  {
    id: 1, brand: 'Nike', name: 'Air Force 1 \'07', price: 110, img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80',
    badge: 'popular', colors: ['#f0f0f0', '#111', '#c0392b'], sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 11]
  },
  {
    id: 2, brand: 'Jordan', name: 'Air Jordan 1 Retro High OG', price: 180, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    badge: 'new', colors: ['#c0392b', '#f0f0f0', '#111'], sizes: [7, 8, 9, 10, 11, 12]
  },
  {
    id: 3, brand: 'Adidas', name: 'Ultraboost 22', price: 190, img: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=600&q=80',
    badge: null, colors: ['#111', '#4a90e2', '#f0f0f0'], sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11]
  },
  {
    id: 4, brand: 'New Balance', name: '990v6 Made in USA', price: 200, img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80',
    badge: 'new', colors: ['#9e9e9e', '#111'], sizes: [7, 8, 9, 10, 11, 12]
  },
  {
    id: 5, brand: 'Nike', name: 'Dunk Low Retro', price: 115, img: 'https://images.unsplash.com/photo-1552346154-21d32383afe9?w=600&q=80',
    badge: null, colors: ['#2c5f2e', '#f0f0f0'], sizes: [7, 7.5, 8, 8.5, 9, 10, 11]
  },
  {
    id: 6, brand: 'Puma', name: 'Suede Classic XXI', price: 75, img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
    badge: 'popular', colors: ['#111', '#8b0000', '#4a90e2'], sizes: [7, 8, 9, 10, 11]
  },
  {
    id: 7, brand: 'Reebok', name: 'Classic Leather Legacy', price: 85, img: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80',
    badge: null, colors: ['#f0f0f0', '#111'], sizes: [7, 8, 9, 10, 11, 12]
  },
  {
    id: 8, brand: 'Adidas', name: 'Stan Smith Lux', price: 130, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    badge: 'new', colors: ['#f0f0f0', '#2c5f2e'], sizes: [6, 7, 8, 9, 10, 11]
  },
];

const saleProducts = [
  {
    id: 101, brand: 'Nike', name: 'React Infinity Run 3', price: 89, originalPrice: 160, img: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80',
    badge: 'sale', colors: ['#4a90e2', '#111'], sizes: [8, 9, 10, 11]
  },
  {
    id: 102, brand: 'Adidas', name: 'NMD R1 V2', price: 99, originalPrice: 140, img: 'https://images.unsplash.com/photo-1585232350009-03d1c48af5e7?w=600&q=80',
    badge: 'sale', colors: ['#111', '#e74c3c'], sizes: [7, 8, 9, 10, 11]
  },
  {
    id: 103, brand: 'Puma', name: 'RS-X³ Puzzle', price: 59, originalPrice: 110, img: 'https://images.unsplash.com/photo-1556906781-9a412961a5bd?w=600&q=80',
    badge: 'sale', colors: ['#f39c12', '#111', '#f0f0f0'], sizes: [7, 8, 9, 10]
  },
  {
    id: 104, brand: 'Reebok', name: 'Club C 85', price: 49, originalPrice: 80, img: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&q=80',
    badge: 'sale', colors: ['#f0f0f0', '#111'], sizes: [7, 8, 9, 10, 11, 12]
  },
];

/* ── CART STATE ─────────────────────────────────────────────────────── */
let cart = [];

/* ── RENDER PRODUCTS ─────────────────────────────────────────────── */
function renderProducts(list, containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = list.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge === 'sale' ? 'Sale' : p.badge === 'new' ? 'New' : 'Popular'}</span>` : ''}
        <button class="quick-add" data-id="${p.id}">+ Quick Add</button>
      </div>
      <div class="product-info">
        <p class="product-brand">${p.brand}</p>
        <p class="product-name">${p.name}</p>
        <div class="product-colors">
          ${p.colors.map(c => `<span class="color-dot" style="background:${c}" title="${c}"></span>`).join('')}
        </div>
        <div class="product-price">
          <span class="price-current ${p.originalPrice ? 'price-sale' : ''}">$${p.price}</span>
          ${p.originalPrice ? `<span class="price-original">$${p.originalPrice}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.quick-add').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      const product = [...products, ...saleProducts].find(p => p.id === id);
      if (product) addToCart(product);
    });
  });
}

/* ── CART ─────────────────────────────────────────────────────────── */
function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1, size: product.sizes[Math.floor(product.sizes.length / 2)] });
  }
  updateCartUI();
  showToast(`${product.name} added to bag`);
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const countEl = document.getElementById('cart-count');
  const itemCountEl = document.getElementById('cart-item-count');
  const subtotalEl = document.getElementById('cart-subtotal');
  const cartItemsEl = document.getElementById('cart-items');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartFooterEl = document.getElementById('cart-footer');

  if (countEl) {
    countEl.textContent = total;
    countEl.classList.toggle('hidden', total === 0);
  }
  if (itemCountEl) itemCountEl.textContent = total;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (cartFooterEl) cartFooterEl.style.display = cart.length ? '' : 'none';
  if (cartEmptyEl) cartEmptyEl.style.display = cart.length ? 'none' : 'flex';

  if (cartItemsEl) {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}" />
        <div class="cart-item-info">
          <p class="cart-item-brand">${item.brand}</p>
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-size">Size: ${item.size} · Qty: ${item.qty}</p>
          <p class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</p>
        </div>
        <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove">✕</button>
      </div>
    `).join('');

    cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(Number(btn.dataset.id)));
    });
  }
}

function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── TOAST ────────────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── HERO SLIDER ─────────────────────────────────────────────────── */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let autoTimer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  document.getElementById('hero-prev')?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  document.getElementById('hero-next')?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));

  startAuto();
}

/* ── STICKY HEADER ───────────────────────────────────────────────── */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── SEARCH ───────────────────────────────────────────────────────── */
function initSearch() {
  const toggle = document.getElementById('search-toggle');
  const bar = document.getElementById('search-bar');
  const close = document.getElementById('search-close');
  const input = document.getElementById('search-input');

  toggle?.addEventListener('click', () => {
    bar.classList.toggle('open');
    if (bar.classList.contains('open')) input.focus();
  });
  close?.addEventListener('click', () => bar.classList.remove('open'));
}

/* ── MOBILE NAV ──────────────────────────────────────────────────── */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav-main');
  const closeBtn = document.getElementById('nav-close');

  hamburger?.addEventListener('click', () => nav.classList.add('open'));
  closeBtn?.addEventListener('click', () => nav.classList.remove('open'));
}

/* ── NEWSLETTER ──────────────────────────────────────────────────── */
function initNewsletter() {
  document.getElementById('newsletter-form')?.addEventListener('submit', e => {
    e.preventDefault();
    showToast('You\'re subscribed! Welcome to the F Fam.');
    e.target.reset();
  });
}

/* ── INIT ─────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products, 'product-grid');
  renderProducts(saleProducts, 'sale-grid');
  updateCartUI();
  initHeroSlider();
  initStickyHeader();
  initSearch();
  initMobileNav();
  initNewsletter();

  document.getElementById('cart-btn')?.addEventListener('click', openCart);
  document.getElementById('cart-close')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
});
