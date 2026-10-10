(function () {
  const root = document.getElementById("product-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const product = window.SHOP.products.find((item) => item.id === params.get("id"));

  if (!product) {
    document.title = "Prodotto non trovato — Banco 50";
    root.innerHTML =
      '<div class="empty-panel"><h1>Ricambio non trovato</h1><p>Il codice non è nel catalogo oppure il link è incompleto.</p><a class="cta" href="catalogo.html">Torna al catalogo</a></div>';
    return;
  }

  document.title = product.name + " — Banco 50";
  const soldOut = product.stock <= 0;
  const specs = product.specs
    .map((row) => "<tr><th>" + window.ShopUI.esc(row[0]) + "</th><td>" + window.ShopUI.esc(row[1]) + "</td></tr>")
    .join("");
  const models = product.compat
    .map((id) => '<li><a href="catalogo.html?modello=' + window.ShopUI.esc(id) + '">' + window.ShopUI.esc(window.ShopUI.modelName(id)) + "</a></li>")
    .join("");
  const oldPrice = product.oldPrice ? '<span class="price-old">' + window.ShopUI.esc(window.formatEuro(product.oldPrice)) + "</span>" : "";
  const related = window.SHOP.products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);
  const relatedHtml = related.length
    ? '<section class="related"><div class="section-head"><h2>Della stessa categoria</h2><a href="catalogo.html?cat=' +
      window.ShopUI.esc(product.category) +
      '">Vedi tutti</a></div><div class="product-grid">' +
      related.map((item) => window.ShopUI.card(item)).join("") +
      "</div></section>"
    : "";

  root.innerHTML =
    '<nav class="crumbs" aria-label="Percorso"><a href="index.html">Home</a><a href="catalogo.html">Catalogo</a><a href="catalogo.html?cat=' +
    window.ShopUI.esc(product.category) +
    '">' +
    window.ShopUI.esc(window.ShopUI.category(product.category)) +
    '</a><span aria-current="page">' +
    window.ShopUI.esc(product.name) +
    "</span></nav>" +
    '<article class="product-detail">' +
    '<div class="product-detail-media">' +
    window.PartArt.render(product.art) +
    "</div>" +
    "<div>" +
    '<p class="product-cat">' +
    window.ShopUI.esc(window.ShopUI.category(product.category)) +
    " · " +
    window.ShopUI.esc(product.sku) +
    "</p>" +
    "<h1>" +
    window.ShopUI.esc(product.name) +
    "</h1>" +
    '<p class="detail-lead">' +
    window.ShopUI.esc(product.lead) +
    "</p>" +
    '<div class="price-row price-row-lg"><span class="price">' +
    window.ShopUI.esc(window.formatEuro(product.price)) +
    "</span>" +
    oldPrice +
    '<span class="iva">IVA inclusa</span></div>' +
    window.ShopUI.stock(product) +
    '<form class="buy-row">' +
    '<label class="qty-label">Quantità <span class="qty"><button type="button" data-step="-1" aria-label="Diminuisci">−</button>' +
    '<input id="detail-qty" data-qty-for="' +
    window.ShopUI.esc(product.id) +
    '" type="number" min="1" max="' +
    product.stock +
    '" value="1"' +
    (soldOut ? " disabled" : "") +
    ">" +
    '<button type="button" data-step="1" aria-label="Aumenta">+</button></span></label>' +
    '<button class="cta" type="button" data-add="' +
    window.ShopUI.esc(product.id) +
    '"' +
    (soldOut ? " disabled" : "") +
    ">" +
    (soldOut ? "Esaurito" : "Aggiungi al carrello") +
    "</button></form>" +
    "<p>" +
    window.ShopUI.esc(product.description) +
    "</p>" +
    '<h2>Dati tecnici</h2><table class="spec-table"><tbody>' +
    specs +
    "</tbody></table>" +
    "<h2>Compatibile con</h2><ul class=\"compat-list\">" +
    models +
    "</ul></div></article>" +
    relatedHtml;

  const buyForm = root.querySelector(".buy-row");
  if (buyForm) {
    buyForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }

  const qty = document.getElementById("detail-qty");
  root.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", function () {
      if (!qty || qty.disabled) return;
      const max = Number(qty.max) || 1;
      const next = Math.min(max, Math.max(1, Number(qty.value || 1) + Number(button.dataset.step)));
      qty.value = String(next);
    });
  });
})();
