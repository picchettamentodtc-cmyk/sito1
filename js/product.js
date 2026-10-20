import "./common.js";
import { getProduct, products, formatPrice, variantLabel } from "./products.js";
import { addToCart } from "./store.js";
import { openCart } from "./common.js";
import { productCard, escapeHtml } from "./ui.js";

const root = document.querySelector("#product-root");
const params = new URLSearchParams(location.search);
const product = getProduct(params.get("id"));

if (!product) {
  document.title = "Capo non trovato — Mercury Search";
  root.innerHTML = `<div class="empty"><h1>Capo non trovato</h1><p>Questo pezzo non è nella collezione.</p><a class="btn" href="negozio.html">Torna al negozio</a></div>`;
} else {
  document.title = `${product.name} — Mercury Search`;
  const label = variantLabel(product);
  let size = product.sizes.length === 1 ? product.sizes[0] : "";
  let color = product.colors[0].id;
  let qty = 1;
  const related = [
    ...products.filter((item) => item.id !== product.id && item.category === product.category),
    ...products.filter((item) => item.id !== product.id && item.category !== product.category),
  ].slice(0, 4);

  root.innerHTML = `<article class="product-layout">
    <div class="product-photo"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" width="900" height="1200" /></div>
    <div class="product-info">
      <nav class="crumbs" aria-label="Percorso"><a href="home.html">Home</a><a href="negozio.html">Negozio</a><a href="negozio.html?cat=${encodeURIComponent(product.category)}">${escapeHtml(product.category)}</a></nav>
      <p class="eyebrow">${escapeHtml(product.category)}</p>
      <h1>${escapeHtml(product.name)}</h1>
      <p class="product-price">${formatPrice(product.price)}</p>
      <p>${escapeHtml(product.description)}</p>
      <form class="buy-form" novalidate>
        <fieldset class="buy-group">
          <legend>Colore</legend>
          <div class="color-list" role="radiogroup">${product.colors
            .map(
              (item) =>
                `<button type="button" class="color-btn${item.id === color ? " is-selected" : ""}" data-color="${escapeHtml(item.id)}"><span class="swatch" style="background:${item.hex}"></span>${escapeHtml(item.name)}</button>`
            )
            .join("")}</div>
        </fieldset>
        <fieldset class="buy-group">
          <legend>${escapeHtml(label)}</legend>
          <div class="size-list" role="radiogroup">${product.sizes
            .map(
              (item) =>
                `<button type="button" class="size-btn${item === size ? " is-selected" : ""}" data-size="${escapeHtml(item)}" aria-checked="${item === size ? "true" : "false"}">${escapeHtml(item)}</button>`
            )
            .join("")}</div>
          <p class="field-error" id="size-error" hidden>Seleziona una ${label === "Formato" ? "formato" : "taglia"}.</p>
        </fieldset>
        <div class="buy-row">
          <div class="qty">
            <button type="button" id="qty-dec" aria-label="Diminuisci quantità">−</button>
            <input id="qty" aria-label="Quantità" type="number" min="1" max="5" value="1" />
            <button type="button" id="qty-inc" aria-label="Aumenta quantità">+</button>
          </div>
          <button class="btn" type="submit">Aggiungi al carrello</button>
        </div>
        <p class="ship-note">Spedizione gratuita oltre 180 €. Reso gratuito entro 14 giorni. <a href="resi/">Leggi la politica resi</a>.</p>
      </form>
      <dl class="specs">${product.details.map((detail) => `<div><dt>Dettaglio</dt><dd>${escapeHtml(detail)}</dd></div>`).join("")}</dl>
    </div>
  </article>
  <section class="section">
    <div class="section-head"><h2>Della stessa ricerca</h2></div>
    <div class="product-grid">${related.map(productCard).join("")}</div>
  </section>`;

  const form = root.querySelector(".buy-form");
  root.querySelectorAll(".size-btn").forEach((button) => {
    button.addEventListener("click", () => {
      size = button.dataset.size;
      root.querySelectorAll(".size-btn").forEach((item) => {
        const on = item === button;
        item.classList.toggle("is-selected", on);
        item.setAttribute("aria-checked", on ? "true" : "false");
      });
      root.querySelector("#size-error").hidden = true;
    });
  });
  root.querySelectorAll(".color-btn").forEach((button) => {
    button.addEventListener("click", () => {
      color = button.dataset.color;
      root.querySelectorAll(".color-btn").forEach((item) => item.classList.toggle("is-selected", item === button));
    });
  });
  const qtyInput = root.querySelector("#qty");
  const setQuantity = (value) => {
    qty = Math.min(5, Math.max(1, value));
    qtyInput.value = String(qty);
  };
  root.querySelector("#qty-dec").addEventListener("click", () => setQuantity(qty - 1));
  root.querySelector("#qty-inc").addEventListener("click", () => setQuantity(qty + 1));
  qtyInput.addEventListener("change", () => setQuantity(Number(qtyInput.value)));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!size) {
      const error = root.querySelector("#size-error");
      error.hidden = false;
      root.querySelector(".size-list").scrollIntoView({ block: "nearest" });
      return;
    }
    addToCart({ id: product.id, size, color, qty });
    openCart();
  });
}
