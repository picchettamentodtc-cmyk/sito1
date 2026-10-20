import "./common.js";
import { formatPrice } from "./products.js";
import { cartTotals, FREE_SHIPPING_FROM } from "./store.js";
import { cartLineMarkup, escapeHtml } from "./ui.js";

const root = document.querySelector("#cart-root");

function note(subtotal) {
  if (subtotal <= 0) return "";
  if (subtotal >= FREE_SHIPPING_FROM) return "Spedizione standard gratuita.";
  return `Ti mancano ${formatPrice(FREE_SHIPPING_FROM - subtotal)} per la spedizione gratuita.`;
}

function render() {
  const totals = cartTotals("standard");
  if (!totals.lines.length) {
    root.innerHTML = `<div class="empty"><p>Il carrello è vuoto.</p><a class="btn" href="negozio.html">Vai al negozio</a></div>`;
    return;
  }
  root.innerHTML = `<div class="cart-layout">
    <div>${totals.lines.map(cartLineMarkup).join("")}</div>
    <aside class="summary">
      <h2>Riepilogo</h2>
      <p class="ship-note">${escapeHtml(note(totals.subtotal))}</p>
      <div class="summary-row"><span>Subtotale</span><span>${formatPrice(totals.subtotal)}</span></div>
      <div class="summary-row"><span>Spedizione</span><span>${totals.shipping === 0 ? "Gratis" : formatPrice(totals.shipping)}</span></div>
      <div class="summary-row total"><span>Totale</span><span>${formatPrice(totals.total)}</span></div>
      <a class="btn btn-full" href="checkout.html">Vai al checkout</a>
    </aside>
  </div>`;
}

window.addEventListener("cart:change", render);
render();
