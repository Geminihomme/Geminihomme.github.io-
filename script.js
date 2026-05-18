/* ============================================================
   PLIMSOLL - Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Cart State ── */
  let cart = JSON.parse(localStorage.getItem('plimsoll_cart') || '[]');

  function saveCart() {
    localStorage.setItem('plimsoll_cart', JSON.stringify(cart));
  }

  function getCartCount() {
    return cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function getCartTotal() {
    return cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
  }

  function updateCartBadges() {
    var count = getCartCount();
    document.querySelectorAll('.cart-count').forEach(function (el) {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  function addToCart(product) {
    var existing = cart.find(function (item) {
      return item.id === product.id && item.size === product.size && item.color === product.color;
    });
    if (existing) {
      existing.qty += product.qty || 1;
    } else {
      cart.push(Object.assign({ qty: 1 }, product));
    }
    saveCart();
    updateCartBadges();
    showToast(product.name + ' added to cart!');
  }

  function removeFromCart(id, size, color) {
    cart = cart.filter(function (item) {
      return !(item.id === id && item.size === size && item.color === color);
    });
    saveCart();
    updateCartBadges();
    renderCartPage();
  }

  function updateCartQty(id, size, color, qty) {
    var item = cart.find(function (i) {
      return i.id === id && i.size === size && i.color === color;
    });
    if (item) {
      item.qty = Math.max(1, qty);
      saveCart();
      updateCartBadges();
      renderCartPage();
    }
  }

  /* ── Toast Notification ── */
  function showToast(msg) {
    var existing = document.getElementById('plimsoll-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'plimsoll-toast';
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '28px',
      right: '28px',
      background: '#222',
      color: '#fff',
      padding: '14px 22px',
      borderRadius: '6px',
      fontSize: '.875rem',
      fontWeight: '600',
      fontFamily: 'Inter, sans-serif',
      zIndex: '9999',
      boxShadow: '0 8px 24px rgba(0,0,0,.25)',
      transform: 'translateY(16px)',
      opacity: '0',
      transition: 'transform .3s, opacity .3s',
      maxWidth: '320px',
      lineHeight: '1.4',
    });
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(function () {
      toast.style.transform = 'translateY(16px)';
      toast.style.opacity = '0';
      setTimeout(function () { toast.remove(); }, 350);
    }, 2800);
  }

  /* ── Mobile Menu ── */
  function initMobileMenu() {
    var hamburger = document.querySelector('.hamburger');
    var mobileNav = document.querySelector('.mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
  }

  /* ── Sticky Header Shadow ── */
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 4
        ? '0 4px 16px rgba(0,0,0,.4)'
        : '0 2px 8px rgba(0,0,0,.3)';
    }, { passive: true });
  }

  /* ── Search Bar ── */
  function initSearch() {
    var input = document.querySelector('.header-search input');
    var btn   = document.querySelector('.header-search button');
    if (!input) return;

    function doSearch() {
      var q = input.value.trim();
      if (q) {
        window.location.href = 'products.html?q=' + encodeURIComponent(q);
      }
    }

    btn && btn.addEventListener('click', doSearch);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSearch();
    });
  }

  /* ── Quick Add (Homepage + Products page) ── */
  function initQuickAdd() {
    document.querySelectorAll('.quick-add-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var card = btn.closest('.product-card');
        if (!card) return;
        addToCart({
          id:    card.dataset.id,
          name:  card.dataset.name,
          brand: card.dataset.brand,
          price: parseFloat(card.dataset.price),
          color: card.dataset.color || 'Default',
          size:  'M 8 / W 9.5',
          bg:    card.dataset.bg,
        });
      });
    });
  }

  /* ── Product Card Click → Detail Page ── */
  function initCardNavigation() {
    document.querySelectorAll('.product-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('.quick-add-btn') || e.target.closest('.wishlist-btn')) return;
        var id = card.dataset.id;
        if (id) window.location.href = 'product-detail.html?id=' + id;
      });
    });
  }

  /* ── Hero CTA ── */
  function initHeroCTA() {
    var btn = document.querySelector('.hero-shop-now');
    if (btn) {
      btn.addEventListener('click', function () {
        window.location.href = 'products.html';
      });
    }
  }

  /* ── Category Click ── */
  function initCategoryCards() {
    document.querySelectorAll('.category-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var cat = card.dataset.category;
        window.location.href = 'products.html?category=' + encodeURIComponent(cat);
      });
    });
  }

  /* ── Filter Accordions (Products Page) ── */
  function initFilterAccordions() {
    document.querySelectorAll('.filter-group-title').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.closest('.filter-group');
        group.classList.toggle('open');
        var opts = group.querySelector('.filter-options');
        if (opts) opts.style.display = group.classList.contains('open') ? '' : 'none';
      });
      // default open first two
      var group = btn.closest('.filter-group');
      var opts = group.querySelector('.filter-options');
      if (opts) opts.style.display = '';
      group.classList.add('open');
    });
  }

  /* ── Filter Checkbox → Active Chips ── */
  function initFilterCheckboxes() {
    var activeContainer = document.querySelector('.active-filters');
    if (!activeContainer) return;

    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        updateActiveFilters();
        filterProducts();
      });
    });

    function updateActiveFilters() {
      activeContainer.innerHTML = '';
      document.querySelectorAll('.filter-option input[type="checkbox"]:checked').forEach(function (cb) {
        var label = cb.closest('.filter-option').querySelector('.filter-label');
        var text  = label ? label.textContent.trim() : cb.value;
        var chip  = document.createElement('div');
        chip.className = 'active-filter-chip';
        chip.innerHTML = '<span>' + text + '</span>' +
          '<button aria-label="Remove filter">&#x2715;</button>';
        chip.querySelector('button').addEventListener('click', function () {
          cb.checked = false;
          updateActiveFilters();
          filterProducts();
        });
        activeContainer.appendChild(chip);
      });
    }

    var clearBtn = document.querySelector('.clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(function (cb) {
          cb.checked = false;
        });
        updateActiveFilters();
        filterProducts();
      });
    }
  }

  /* ── Size Chips (Products Page sidebar) ── */
  function initSizeChips() {
    document.querySelectorAll('.size-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        chip.classList.toggle('selected');
        filterProducts();
      });
    });
  }

  /* ── Filter Logic ── */
  function filterProducts() {
    var checkedBrands = Array.from(
      document.querySelectorAll('.filter-brand input:checked')
    ).map(function (cb) { return cb.value.toLowerCase(); });

    var cards = document.querySelectorAll('.products-grid .product-card');
    cards.forEach(function (card) {
      var brand = (card.dataset.brand || '').toLowerCase();
      var show = !checkedBrands.length || checkedBrands.includes(brand);
      card.style.display = show ? '' : 'none';
    });

    updateProductCount();
  }

  function updateProductCount() {
    var countEl = document.querySelector('.listing-count');
    if (!countEl) return;
    var visible = document.querySelectorAll('.products-grid .product-card:not([style*="display: none"])').length;
    countEl.textContent = visible + ' Products';
  }

  /* ── Sort Dropdown (Products Page) ── */
  function initSort() {
    var select = document.querySelector('.sort-select');
    if (!select) return;
    select.addEventListener('change', function () {
      var val = select.value;
      var grid = document.querySelector('.products-grid');
      if (!grid) return;
      var cards = Array.from(grid.querySelectorAll('.product-card'));

      cards.sort(function (a, b) {
        var pa = parseFloat(a.dataset.price) || 0;
        var pb = parseFloat(b.dataset.price) || 0;
        var na = (a.dataset.name || '').toLowerCase();
        var nb = (b.dataset.name || '').toLowerCase();

        if (val === 'price-asc')  return pa - pb;
        if (val === 'price-desc') return pb - pa;
        if (val === 'name-asc')   return na < nb ? -1 : na > nb ? 1 : 0;
        if (val === 'name-desc')  return nb < na ? -1 : nb > na ? 1 : 0;
        return 0;
      });

      cards.forEach(function (card) { grid.appendChild(card); });
    });
  }

  /* ── View Toggle (Products Page) ── */
  function initViewToggle() {
    var btns = document.querySelectorAll('.view-btn');
    var grid = document.querySelector('.products-grid');
    if (!btns.length || !grid) return;

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        if (btn.dataset.view === 'list') {
          grid.style.gridTemplateColumns = '1fr';
        } else {
          grid.style.gridTemplateColumns = '';
        }
      });
    });
  }

  /* ── Pagination ── */
  function initPagination() {
    var pageBtns = document.querySelectorAll('.page-btn[data-page]');
    if (!pageBtns.length) return;

    pageBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        pageBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* ── Product Detail: Image Gallery ── */
  function initGallery() {
    var thumbs   = document.querySelectorAll('.gallery-thumb');
    var mainImg  = document.querySelector('.gallery-main-img');
    if (!thumbs.length || !mainImg) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        thumbs.forEach(function (t) { t.classList.remove('active'); });
        thumb.classList.add('active');

        var bg = thumb.dataset.bg;
        var gradient = thumb.dataset.gradient;
        if (gradient) {
          mainImg.style.background = gradient;
        } else if (bg) {
          mainImg.style.background = bg;
        }
      });
    });
  }

  /* ── Product Detail: Color Selector ── */
  function initColorSelector() {
    var options = document.querySelectorAll('.color-option');
    if (!options.length) return;

    options.forEach(function (opt) {
      opt.addEventListener('click', function () {
        options.forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');

        var colorName = document.querySelector('.selected-color-name');
        if (colorName) colorName.textContent = opt.dataset.name || '';
      });
    });
  }

  /* ── Product Detail: Size Selector ── */
  function initSizeSelector() {
    var options = document.querySelectorAll('.size-option');
    if (!options.length) return;

    options.forEach(function (opt) {
      if (opt.classList.contains('unavailable')) return;
      opt.addEventListener('click', function () {
        options.forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');

        var selectedSize = document.querySelector('.selected-size-display');
        if (selectedSize) selectedSize.textContent = opt.textContent.trim();
      });
    });
  }

  /* ── Product Detail: Add to Cart ── */
  function initDetailAddToCart() {
    var btn = document.querySelector('.add-to-cart-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var selectedSize = document.querySelector('.size-option.selected');
      if (!selectedSize) {
        showToast('Please select a size first.');
        document.querySelector('.size-picker').style.animation = 'none';
        setTimeout(function () {
          var picker = document.querySelector('.size-picker');
          if (picker) {
            picker.style.outline = '2px solid #c8102e';
            setTimeout(function () { picker.style.outline = ''; }, 1500);
          }
        }, 10);
        return;
      }

      var selectedColor = document.querySelector('.color-option.selected');
      var body = document.querySelector('body');

      addToCart({
        id:    body.dataset.productId || 'detail-1',
        name:  body.dataset.productName || 'Sneaker',
        brand: body.dataset.productBrand || 'Brand',
        price: parseFloat(body.dataset.productPrice) || 0,
        size:  selectedSize.textContent.trim(),
        color: selectedColor ? (selectedColor.dataset.name || 'Default') : 'Default',
        bg:    body.dataset.productBg || '#e8e8e8',
      });
    });
  }

  /* ── Product Detail: Accordion ── */
  function initAccordions() {
    document.querySelectorAll('.accordion-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var content = btn.nextElementSibling;
        if (!content) return;
        var isOpen = content.classList.contains('open');

        // Close all
        document.querySelectorAll('.accordion-content.open').forEach(function (c) {
          c.classList.remove('open');
        });

        if (!isOpen) {
          content.classList.add('open');
        }

        var chevron = btn.querySelector('.acc-chevron');
        document.querySelectorAll('.acc-chevron').forEach(function (c) {
          c.style.transform = 'rotate(0deg)';
        });
        if (!isOpen && chevron) chevron.style.transform = 'rotate(180deg)';
      });
    });
  }

  /* ── Cart Page ── */
  function renderCartPage() {
    var itemsContainer = document.querySelector('.cart-items');
    var emptyCart      = document.querySelector('.empty-cart');
    var cartContent    = document.querySelector('.cart-content');
    if (!itemsContainer) return;

    if (cart.length === 0) {
      if (emptyCart) emptyCart.style.display = 'block';
      if (cartContent) cartContent.style.display = 'none';
      return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (cartContent) cartContent.style.display = '';

    itemsContainer.innerHTML = '';

    cart.forEach(function (item) {
      var el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = [
        '<div class="cart-item-img">',
        '  <div class="product-card-img-bg" style="width:100%;height:100%;background:' + (item.bg || '#e8e8e8') + ';">',
        '    <div class="shoe-art">',
        '      <div class="shoe-art-upper"></div>',
        '      <div class="shoe-art-tongue"></div>',
        '      <div class="shoe-art-sole"></div>',
        '    </div>',
        '  </div>',
        '</div>',
        '<div class="cart-item-details">',
        '  <div class="cart-item-brand">' + (item.brand || '') + '</div>',
        '  <div class="cart-item-name">'  + (item.name  || '') + '</div>',
        '  <div class="cart-item-meta">Size: ' + (item.size || '') + ' &nbsp;|&nbsp; Color: ' + (item.color || '') + '</div>',
        '  <div class="cart-item-qty">',
        '    <button class="qty-btn" data-action="dec">&#8722;</button>',
        '    <div class="qty-display">' + item.qty + '</div>',
        '    <button class="qty-btn" data-action="inc">&#43;</button>',
        '  </div>',
        '</div>',
        '<div class="cart-item-actions">',
        '  <div class="cart-item-price">$' + (item.price * item.qty).toFixed(2) + '</div>',
        '  <button class="cart-remove">Remove</button>',
        '</div>',
      ].join('');

      el.querySelector('[data-action="dec"]').addEventListener('click', function () {
        if (item.qty <= 1) {
          removeFromCart(item.id, item.size, item.color);
        } else {
          updateCartQty(item.id, item.size, item.color, item.qty - 1);
        }
      });

      el.querySelector('[data-action="inc"]').addEventListener('click', function () {
        updateCartQty(item.id, item.size, item.color, item.qty + 1);
      });

      el.querySelector('.cart-remove').addEventListener('click', function () {
        removeFromCart(item.id, item.size, item.color);
      });

      itemsContainer.appendChild(el);
    });

    // Update summary
    var subtotal  = getCartTotal();
    var shipping  = subtotal >= 75 ? 0 : 9.99;
    var tax       = subtotal * 0.08;
    var total     = subtotal + shipping + tax;

    var setVal = function (sel, val) {
      var el = document.querySelector(sel);
      if (el) el.textContent = val;
    };

    setVal('.summary-subtotal',  '$' + subtotal.toFixed(2));
    setVal('.summary-shipping',  shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2));
    setVal('.summary-tax',       '$' + tax.toFixed(2));
    setVal('.summary-total',     '$' + total.toFixed(2));
  }

  function initCartPage() {
    renderCartPage();

    var promoBtn = document.querySelector('.promo-input-row button');
    if (promoBtn) {
      promoBtn.addEventListener('click', function () {
        var input = document.querySelector('.promo-input-row input');
        if (input && input.value.toUpperCase() === 'PLIMSOLL10') {
          showToast('Promo code applied! 10% off your order.');
        } else {
          showToast('Invalid promo code. Try PLIMSOLL10.');
        }
      });
    }

    var checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function () {
        if (cart.length === 0) {
          showToast('Your cart is empty!');
          return;
        }
        showToast('Checkout coming soon! Thank you for shopping at Plimsoll.');
      });
    }
  }

  /* ── Wishlist Toggle ── */
  function initWishlist() {
    document.querySelectorAll('.wishlist-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isActive = btn.classList.toggle('active');
        btn.innerHTML = isActive
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
        if (isActive) {
          btn.style.background = '#c8102e';
          btn.style.color = '#fff';
        } else {
          btn.style.background = '';
          btn.style.color = '';
        }
      });
    });
  }

  /* ── Newsletter Form ── */
  function initNewsletter() {
    var forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          showToast('Thanks for subscribing to Plimsoll updates!');
          input.value = '';
        }
      });

      var btn = form.querySelector('button');
      if (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var input = form.querySelector('input[type="email"]');
          if (input && input.value) {
            showToast('Thanks for subscribing to Plimsoll updates!');
            input.value = '';
          } else {
            showToast('Please enter a valid email address.');
          }
        });
      }
    });
  }

  /* ── Color Swatches (sidebar, products page) ── */
  function initColorSwatches() {
    document.querySelectorAll('.color-swatches .color-swatch').forEach(function (sw) {
      sw.addEventListener('click', function () {
        sw.classList.toggle('selected');
      });
    });
  }

  /* ── Scroll Animations ── */
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    var items = document.querySelectorAll('.product-card, .category-card, .brand-tile');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = entry.target.style.transform.replace('translateY(24px)', '');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach(function (item) {
      item.style.opacity = '0';
      item.style.transition = 'opacity .4s ease, transform .4s ease';
      observer.observe(item);
    });
  }

  /* ── Init by Page ── */
  function init() {
    updateCartBadges();
    initMobileMenu();
    initStickyHeader();
    initSearch();
    initQuickAdd();
    initCardNavigation();
    initHeroCTA();
    initCategoryCards();
    initWishlist();
    initNewsletter();

    var body = document.body;

    if (body.classList.contains('page-products')) {
      initFilterAccordions();
      initFilterCheckboxes();
      initSizeChips();
      initSort();
      initViewToggle();
      initPagination();
      initColorSwatches();
      updateProductCount();
    }

    if (body.classList.contains('page-detail')) {
      initGallery();
      initColorSelector();
      initSizeSelector();
      initDetailAddToCart();
      initAccordions();
    }

    if (body.classList.contains('page-cart')) {
      initCartPage();
    }

    // Slight delay for scroll animations to avoid flash
    setTimeout(initScrollAnimations, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
