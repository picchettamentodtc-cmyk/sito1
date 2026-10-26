import { formatPrice, variantLabel } from "./products.js";

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function safeHex(hex) {
  return /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : "#161616";
}

export function productCard(product) {
  const color = product.colors[0];
  const label = variantLabel(product);
  const only = product.sizes.length === 1;
  const sizes = product.sizes
    .map(
      (size) =>
        `<button type="button" class="size-pick${only ? " is-selected" : ""}" data-size="${escapeHtml(size)}" role="radio" aria-checked="${only ? "true" : "false"}">${escapeHtml(size)}</button>`
    )
    .join("");
  const tag = product.tag ? `<span class="badge">${escapeHtml(product.tag)}</span>` : "";
  return `<article class="card">
    <a class="card-link" href="prodotto.html?id=${encodeURIComponent(product.id)}">
      <div class="card-media">
        ${tag}
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" width="900" height="1200" />
      </div>
      <div class="card-info">
        <div class="card-row">
          <h3>${escapeHtml(product.name)}</h3>
          <p class="price">${formatPrice(product.price)}</p>
        </div>
        <p class="card-sub"><span class="dot" style="background:${safeHex(color.hex)}"></span>${escapeHtml(product.category)} · ${escapeHtml(color.name)}</p>
      </div>
    </a>
    <form class="quick-add" data-id="${escapeHtml(product.id)}">
      <div class="size-picks" role="radiogroup" aria-label="${escapeHtml(label)}">${sizes}</div>
      <p class="quick-error" hidden></p>
      <button type="submit" class="btn btn-small">Aggiungi</button>
    </form>
  </article>`;
}

export function cartLineMarkup(line) {
  const key = `${line.id}__${line.size}__${line.color.id}`;
  return `<article class="cart-line">
    <a href="prodotto.html?id=${encodeURIComponent(line.id)}"><img src="${escapeHtml(line.product.image)}" alt="" width="96" height="128" /></a>
    <div>
      <h2><a href="prodotto.html?id=${encodeURIComponent(line.id)}">${escapeHtml(line.product.name)}</a></h2>
      <p class="card-sub">${escapeHtml(line.color.name)} · ${escapeHtml(line.size)}</p>
      <button type="button" class="text-btn" data-cart-action="remove" data-id="${escapeHtml(line.id)}" data-size="${escapeHtml(line.size)}" data-color="${escapeHtml(line.color.id)}">Rimuovi</button>
    </div>
    <div class="qty">
      <button type="button" aria-label="Diminuisci quantità" data-cart-action="dec" data-focus-key="dec__${escapeHtml(key)}" data-id="${escapeHtml(line.id)}" data-size="${escapeHtml(line.size)}" data-color="${escapeHtml(line.color.id)}">−</button>
      <input data-qty-input aria-label="Quantità" data-id="${escapeHtml(line.id)}" data-size="${escapeHtml(line.size)}" data-color="${escapeHtml(line.color.id)}" type="number" min="1" max="5" value="${line.qty}" />
      <button type="button" aria-label="Aumenta quantità" data-cart-action="inc" data-focus-key="inc__${escapeHtml(key)}" data-id="${escapeHtml(line.id)}" data-size="${escapeHtml(line.size)}" data-color="${escapeHtml(line.color.id)}">+</button>
    </div>
    <p class="line-price">${formatPrice(line.lineTotal)}</p>
  </article>`;
}
