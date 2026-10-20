import { getProduct, formatPrice, variantLabel, FREE_SHIPPING_FROM } from "./products.js";
import { addToCart, cartCount, cartLines, cartTotals, getCart, removeLine, setQty, FREE_SHIPPING_FROM as FREE } from "./store.js";
import { cartLineMarkup, escapeHtml } from "./ui.js";

function refreshCount() {
  const count = cartCount();
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = String(count);
  });
}

function shippingNotes() {
  const label = `Spedizione gratuita oltre ${formatPrice(FREE_SHIPPING_FROM)}`;
  document.querySelectorAll("[data-shipping-note]").forEach((node) => {
    node.textContent = label;
  });
}

function markNav() {
  const here = new URL(location.href);
  const hereFile = here.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const url = new URL(link.getAttribute("href"), location.href);
    const linkFile = url.pathname.split("/").pop() || "index.html";
    if (linkFile !== hereFile) return;
    const linkCat = url.searchParams.get("cat");
    const hereCat = here.searchParams.get("cat");
    if (linkCat) {
      if (linkCat === hereCat) link.setAttribute("aria-current", "page");
    } else if (!hereCat) {
      link.setAttribute("aria-current", "page");
    }
  });
  if (hereFile === "carrello.html") {
    document.querySelector("#open-cart")?.setAttribute("aria-current", "page");
  }
  if (here.pathname.includes("/resi")) {
    document.querySelectorAll('a[href="resi/"]').forEach((link) => link.setAttribute("aria-current", "page"));
  }
}

function closeMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-nav");
  if (!toggle || !menu) return;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Apri menu");
  menu.hidden = true;
}

function bindMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-nav");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Apri menu" : "Chiudi menu");
    menu.hidden = open;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function ensureDrawer() {
  if (document.querySelector("#cart-drawer")) return;
  const backdrop = document.createElement("div");
  backdrop.id = "drawer-backdrop";
  backdrop.className = "drawer-backdrop";
  backdrop.hidden = true;
  const drawer = document.createElement("aside");
  drawer.id = "cart-drawer";
  drawer.className = "cart-drawer";
  drawer.setAttribute("aria-hidden", "true");
  drawer.setAttribute("aria-label", "Carrello");
  drawer.innerHTML = `<div class="drawer-head"><h2 id="drawer-title">Carrello</h2><button type="button" class="text-btn" id="close-drawer">Chiudi</button></div><div id="drawer-body"></div><div id="drawer-foot"></div>`;
  document.body.append(backdrop, drawer);
  backdrop.addEventListener("click", closeCart);
  drawer.querySelector("#close-drawer").addEventListener("click", closeCart);
  document.querySelector("#open-cart")?.addEventListener("click", () => openCart());
}

export function openCart() {
  ensureDrawer();
  closeMenu();
  const drawer = document.querySelector("#cart-drawer");
  const backdrop = document.querySelector("#drawer-backdrop");
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  backdrop.hidden = false;
  document.body.classList.add("nav-lock");
  renderDrawer();
  drawer.querySelector("#close-drawer")?.focus();
}

function closeCart() {
  const drawer = document.querySelector("#cart-drawer");
  const backdrop = document.querySelector("#drawer-backdrop");
  if (!drawer) return;
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  backdrop.hidden = true;
  document.body.classList.remove("nav-lock");
}

function shipNote(subtotal) {
  if (subtotal <= 0) return "";
  if (subtotal >= FREE) return "Spedizione standard gratuita.";
  return `Ti mancano ${formatPrice(FREE - subtotal)} per la spedizione gratuita.`;
}

export function renderDrawer() {
  const body = document.querySelector("#drawer-body");
  const foot = document.querySelector("#drawer-foot");
  const title = document.querySelector("#drawer-title");
  if (!body || !foot) return;
  const focusKey = document.activeElement?.dataset?.focusKey || "";
  const totals = cartTotals("standard");
  if (title) title.textContent = totals.count ? `Carrello (${totals.count})` : "Carrello";
  if (!totals.lines.length) {
    body.innerHTML = `<p class="empty-copy">Il carrello è vuoto.</p><a class="btn" href="negozio.html">Vai al negozio</a>`;
    foot.innerHTML = "";
    return;
  }
  body.innerHTML = totals.lines.map(cartLineMarkup).join("");
  foot.innerHTML = `<p class="ship-note">${escapeHtml(shipNote(totals.subtotal))}</p>
    <div class="summary-row"><span>Subtotale</span><span>${formatPrice(totals.subtotal)}</span></div>
    <div class="summary-row"><span>Spedizione</span><span>${totals.shipping === 0 ? "Gratis" : formatPrice(totals.shipping)}</span></div>
    <div class="summary-row total"><span>Totale</span><span>${formatPrice(totals.total)}</span></div>
    <a class="btn btn-full" href="checkout.html">Checkout</a>
    <a class="btn btn-ghost btn-full" href="carrello.html">Vedi il carrello</a>`;
  if (focusKey && window.CSS?.escape) {
    body.querySelector(`[data-focus-key="${CSS.escape(focusKey)}"]`)?.focus();
  }
}

function bindCartActions() {
  document.addEventListener("click", (event) => {
    const pick = event.target.closest(".size-pick");
    if (pick) {
      const group = pick.closest(".size-picks");
      group.querySelectorAll(".size-pick").forEach((button) => {
        const on = button === pick;
        button.classList.toggle("is-selected", on);
        button.setAttribute("aria-checked", on ? "true" : "false");
      });
      const error = pick.closest(".quick-add")?.querySelector(".quick-error");
      if (error) error.hidden = true;
    }
    const action = event.target.closest("[data-cart-action]");
    if (!action) return;
    const { cartAction, id, size, color } = action.dataset;
    const line = getCart().find((item) => item.id === id && item.size === size && item.color === color);
    const qty = line ? line.qty : 1;
    if (cartAction === "inc") setQty(id, size, color, qty + 1);
    if (cartAction === "dec") setQty(id, size, color, qty - 1);
    if (cartAction === "remove") removeLine(id, size, color);
  });
  document.addEventListener("change", (event) => {
    const input = event.target.closest("[data-qty-input]");
    if (!input) return;
    setQty(input.dataset.id, input.dataset.size, input.dataset.color, Number(input.value));
  });
  document.addEventListener("submit", (event) => {
    const form = event.target.closest(".quick-add");
    if (!form) return;
    event.preventDefault();
    const product = getProduct(form.dataset.id);
    const selected = form.querySelector(".size-pick.is-selected");
    const error = form.querySelector(".quick-error");
    if (!product) return;
    if (!selected) {
      error.hidden = false;
      error.textContent = product.category === "Profumi" ? "Scegli un formato." : "Scegli una taglia.";
      return;
    }
    const { capped } = addToCart({
      id: product.id,
      size: selected.dataset.size,
      color: product.colors[0].id,
      qty: 1,
    });
    if (capped) {
      error.hidden = false;
      error.textContent = "Quantità massima: 5.";
    } else if (error) error.hidden = true;
    openCart();
  });
}

function init() {
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
  shippingNotes();
  refreshCount();
  markNav();
  bindMenu();
  ensureDrawer();
  bindCartActions();
  window.addEventListener("cart:change", () => {
    refreshCount();
    if (document.querySelector("#cart-drawer")?.classList.contains("is-open")) renderDrawer();
  });
  window.addEventListener("storage", refreshCount);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCart();
  });
}

if (typeof document !== "undefined") init();

export { variantLabel };
