// === FLAVOURHUB — SHARED JS ===

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('fh-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('fh-theme', next);
    updateToggleIcon(next);
  });
}

function updateToggleIcon(theme) {
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    const expanded = hamburger.classList.contains('open');
    hamburger.setAttribute('aria-expanded', expanded);
  });
}

// Active nav link
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Cart count from localStorage
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('fh-cart') || '[]');
  const badge = document.getElementById('cartBadge');
  if (badge) {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  }
}
updateCartBadge();

// Add to cart
function addToCart(name, price, emoji) {
  let cart = JSON.parse(localStorage.getItem('fh-cart') || '[]');
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, emoji, qty: 1 });
  }
  localStorage.setItem('fh-cart', JSON.stringify(cart));
  updateCartBadge();
  showToast(`${emoji} ${name} added to cart!`);
}

// Toast
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// On-page text search
function initPageSearch(inputId, btnId, scope) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  if (!input) return;

  function doSearch() {
    const q = input.value.trim().toLowerCase();
    // Remove old highlights
    document.querySelectorAll('.highlight').forEach(el => {
      el.outerHTML = el.innerHTML;
    });
    if (!q) return;
    const container = document.querySelector(scope || 'main');
    if (!container) return;
    highlight(container, q);
  }

  if (btn) btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
}

function highlight(node, q) {
  if (node.nodeType === 3) {
    const idx = node.textContent.toLowerCase().indexOf(q);
    if (idx >= 0) {
      const span = document.createElement('mark');
      span.className = 'highlight';
      const after = node.splitText(idx);
      after.splitText(q.length);
      const match = after.cloneNode(true);
      span.appendChild(match);
      after.parentNode.replaceChild(span, after);
    }
    return;
  }
  if (['SCRIPT','STYLE','INPUT','TEXTAREA','BUTTON'].includes(node.nodeName)) return;
  [...node.childNodes].forEach(child => highlight(child, q));
}

// Nav search bar
const navSearchInput = document.getElementById('navSearchInput');
const navSearchBtn = document.getElementById('navSearchBtn');
if (navSearchInput && navSearchBtn) {
  navSearchBtn.addEventListener('click', () => {
    const q = navSearchInput.value.trim();
    if (q) window.location.href = `menu.html?search=${encodeURIComponent(q)}`;
  });
  navSearchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') navSearchBtn.click();
  });
}

// Category filter
function filterMenu(cat) {
    document.querySelectorAll('.social-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('#menuGrid .card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'block' : 'none';
    });
}
// On-page search
initPageSearch('menuSearchInput', 'menuSearchBtn', '#menuGrid');

// Handle URL search param
const params = new URLSearchParams(window.location.search);
const sq = params.get('search');
if (sq) {
    document.getElementById('menuSearchInput').value = sq;
    setTimeout(() => document.getElementById('menuSearchBtn').click(), 300);
}

// On-page search for about content
initPageSearch('aboutSearchInput', 'aboutSearchBtn', 'main');

function submitContact() {
const name = document.getElementById('contactName').value.trim();
const email = document.getElementById('contactEmail').value.trim();
const msg = document.getElementById('contactMsg').value.trim();
if (!name || !email || !msg) { showToast('Please fill in all required fields.'); return; }
document.getElementById('contactForm').style.display = 'none';
document.getElementById('contactSuccess').style.display = 'block';
}

// Show branding on large screens
if (window.innerWidth > 768) {
    document.querySelector('.signup-brand').style.display = 'block';
}
window.addEventListener('resize', () => {
    document.querySelector('.signup-brand').style.display = window.innerWidth > 768 ? 'block' : 'none';
});

function submitSignup() {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const pw = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    const terms = document.getElementById('terms').checked;

    if (!name || !email || !pw) { showToast('Please fill in all required fields.'); return; }
    if (pw.length < 8) { showToast('Password must be at least 8 characters.'); return; }
    if (pw !== confirm) { showToast('Passwords do not match.'); return; }
    if (!terms) { showToast('Please agree to the Terms of Service.'); return; }

    document.getElementById('signupBox').style.display = 'none';
    document.getElementById('signupSuccess').style.display = 'block';
}

    function renderCart() {
    const cart = JSON.parse(localStorage.getItem('fh-cart') || '[]');
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');

    if (cart.length === 0) {
    emptyCart.style.display = 'block';
    cartContent.style.display = 'none';
    return;
    }

    emptyCart.style.display = 'none';
    cartContent.style.display = 'grid';

    cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" role="listitem" aria-label="${item.name}">
        <div class="cart-item-img" aria-hidden="true">${item.emoji}</div>
        <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">GHS ${item.price}</div>
        </div>
        <div class="qty-control" aria-label="Quantity controls for ${item.name}">
        <button class="qty-btn" onclick="changeQty('${item.name}', -1)" aria-label="Remove one ${item.name}">−</button>
        <span style="font-weight:600; min-width:20px; text-align:center;" aria-label="${item.qty} items">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.name}', 1)" aria-label="Add one more ${item.name}">+</button>
        </div>
        <button onclick="removeItem('${item.name}')" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:1.2rem; padding:4px;" aria-label="Remove ${item.name} from cart">✕</button>
    </div>
    `).join('');

    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    document.getElementById('summarySubtotal').textContent = `GHS ${subtotal}`;
    document.getElementById('summaryTotal').textContent = `GHS ${subtotal + 12 + 3}`;
}

function changeQty(name, delta) {
    let cart = JSON.parse(localStorage.getItem('fh-cart') || '[]');
    const item = cart.find(i => i.name === name);
    if (item) {
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
    }
    localStorage.setItem('fh-cart', JSON.stringify(cart));
    renderCart();
    updateCartBadge();
}

function removeItem(name) {
    let cart = JSON.parse(localStorage.getItem('fh-cart') || '[]');
    cart = cart.filter(i => i.name !== name);
    localStorage.setItem('fh-cart', JSON.stringify(cart));
    renderCart();
    updateCartBadge();
    showToast('Item removed from cart.');
}

function clearCart() {
    localStorage.removeItem('fh-cart');
    renderCart();
    updateCartBadge();
}

function applyPromo() {
    const code = document.getElementById('promoCode').value.trim().toUpperCase();
    if (code === 'FIRST20') { showToast('✅ GHS 20 discount applied!'); }
    else { showToast('❌ Invalid promo code.'); }
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('fh-cart') || '[]');
    if (cart.length === 0) { showToast('Your cart is empty!'); return; }
    localStorage.removeItem('fh-cart');
    document.getElementById('cartContent').style.display = 'none';
    document.getElementById('emptyCart').style.display = 'none';
    document.getElementById('checkoutSuccess').style.display = 'block';
    document.getElementById('orderNum').textContent = Math.floor(10000 + Math.random() * 90000);
    updateCartBadge();
}

renderCart();