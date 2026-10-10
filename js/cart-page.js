(function () {
  const list = document.getElementById("cart-list");
  const summary = document.getElementById("cart-summary");
  if (!list || !summary) return;

  function render() {
    const lines = window.Cart.lines();
    if (!lines.length) {
      list.innerHTML =
        '<div class="empty-panel"><h2>Il carrello è vuoto</h2><p>Cerca il ricambio per modello e aggiungilo da qui.</p><a class="cta" href="catalogo.html">Apri il catalogo</a></div>';
      summary.hidden = true;
      return;
    }
    summary.hidden = false;
    list.innerHTML = lines
      .map((line) => {
        return (
          '<article class="cart-row">' +
          '<a class="cart-thumb" href="prodotto.html?id=' +
          window.ShopUI.esc(line.id) +
          '">' +
          window.PartArt.render(line.art) +
          "</a>" +
          "<div><p class=\"product-cat\">" +
          window.ShopUI.esc(line.sku) +
          "</p><h2><a href=\"prodotto.html?id=" +
          window.ShopUI.esc(line.id) +
          '">' +
          window.ShopUI.esc(line.name) +
          "</a></h2><p class=\"compat-line\">" +
          window.ShopUI.esc(window.ShopUI.compatPreview(line)) +
          '</p><button class="text-btn" type="button" data-remove="' +
          window.ShopUI.esc(line.id) +
          '">Rimuovi</button></div>' +
          '<div class="cart-row-side"><label class="qty-label">Qtà <span class="qty"><button type="button" data-step="-1" data-id="' +
          window.ShopUI.esc(line.id) +
          '" aria-label="Diminuisci">−</button><input data-qty="' +
          window.ShopUI.esc(line.id) +
          '" type="number" min="1" max="' +
          line.stock +
          '" value="' +
          line.qty +
          '"><button type="button" data-step="1" data-id="' +
          window.ShopUI.esc(line.id) +
          '" aria-label="Aumenta">+</button></span></label><p class="price">' +
          window.ShopUI.esc(window.formatEuro(line.line)) +
          "</p></div></article>"
        );
      })
      .join("");

    const subtotal = window.Cart.subtotal();
    const missing = window.SHOP.freeShippingFrom - subtotal;
    const shipNote =
      missing > 0
        ? "Ti mancano " + window.formatEuro(missing) + " per la spedizione standard gratuita."
        : "Hai la spedizione standard gratuita.";
    summary.innerHTML =
      "<h2>Riepilogo</h2><dl><div><dt>Subtotale</dt><dd>" +
      window.ShopUI.esc(window.formatEuro(subtotal)) +
      "</dd></div><div><dt>Spedizione</dt><dd>Calcolata al checkout</dd></div></dl><p>" +
      window.ShopUI.esc(shipNote) +
      '</p><a class="cta" href="checkout.html">Vai al checkout</a><a class="cta cta-ghost" href="catalogo.html">Continua gli acquisti</a>';
  }

  list.addEventListener("click", function (event) {
    const remove = event.target.closest("[data-remove]");
    if (remove) {
      window.Cart.remove(remove.dataset.remove);
      return;
    }
    const step = event.target.closest("[data-step]");
    if (!step) return;
    const input = list.querySelector('[data-qty="' + step.dataset.id + '"]');
    if (!input) return;
    const next = Math.min(Number(input.max), Math.max(1, Number(input.value) + Number(step.dataset.step)));
    window.Cart.setQty(step.dataset.id, next);
  });

  list.addEventListener("change", function (event) {
    const input = event.target.closest("[data-qty]");
    if (!input) return;
    window.Cart.setQty(input.dataset.qty, input.value);
  });

  window.addEventListener("cart:change", render);
  render();
})();
