(function () {
  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function category(id) {
    const found = window.SHOP.categories.find((item) => item.id === id);
    return found ? found.label : id;
  }

  function modelName(id) {
    const model = window.SHOP.models.find((item) => item.id === id);
    if (!model) return id;
    const brand = window.SHOP.brands.find((item) => item.id === model.brand);
    return (brand ? brand.label + " " : "") + model.label;
  }

  function compatPreview(product) {
    const names = product.compat.map(modelName);
    if (names.length <= 2) return names.join(" · ");
    return names.slice(0, 2).join(" · ") + " · +" + (names.length - 2);
  }

  function stock(product) {
    if (product.stock <= 0) return '<p class="stock is-out">Esaurito</p>';
    if (product.stock <= 5) return '<p class="stock is-low">Ultimi ' + product.stock + " pezzi</p>";
    return '<p class="stock is-ok">Disponibile</p>';
  }

  function card(product) {
    const soldOut = product.stock <= 0;
    const badge = soldOut ? "Esaurito" : product.badge;
    const oldPrice = product.oldPrice
      ? '<span class="price-old">' + esc(window.formatEuro(product.oldPrice)) + "</span>"
      : "";
    return (
      '<article class="product-card">' +
      '<a class="product-media" href="prodotto.html?id=' +
      esc(product.id) +
      '">' +
      window.PartArt.render(product.art) +
      (badge ? '<span class="product-badge">' + esc(badge) + "</span>" : "") +
      "</a>" +
      '<div class="product-body">' +
      (product.line === "performance"
        ? '<a class="line-tag" href="catalogo.html?linea=performance">Top Performance</a>'
        : "") +
      '<p class="product-cat">' +
      esc(category(product.category)) +
      " · " +
      esc(product.sku) +
      "</p>" +
      "<h3><a href=\"prodotto.html?id=" +
      esc(product.id) +
      '">' +
      esc(product.name) +
      "</a></h3>" +
      '<p class="compat-line">' +
      esc(compatPreview(product)) +
      "</p>" +
      stock(product) +
      '<div class="price-row"><span class="price">' +
      esc(window.formatEuro(product.price)) +
      "</span>" +
      oldPrice +
      "</div>" +
      '<button class="add-btn" type="button" data-add="' +
      esc(product.id) +
      '"' +
      (soldOut ? " disabled" : "") +
      ">" +
      (soldOut ? "Esaurito" : "Aggiungi al carrello") +
      "</button>" +
      "</div></article>"
    );
  }

  window.ShopUI = {
    esc: esc,
    category: category,
    modelName: modelName,
    compatPreview: compatPreview,
    stock: stock,
    card: card,
  };
})();
