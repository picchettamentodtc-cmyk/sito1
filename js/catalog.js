(function () {
  const grid = document.getElementById("product-grid");
  const empty = document.getElementById("empty-state");
  const meta = document.getElementById("results-meta");
  const form = document.getElementById("filters");
  if (!grid || !form) return;

  const params = new URLSearchParams(window.location.search);
  const state = {
    q: params.get("q") || "",
    cat: params.get("cat") || "all",
    marca: params.get("marca") || "all",
    modello: params.get("modello") || "all",
    sort: params.get("sort") || "consigliati",
    max: params.get("max") || "all",
    linea: params.get("linea") === "performance" ? "performance" : "all",
  };

  const qInput = document.getElementById("catalog-q");
  const sortSelect = document.getElementById("sort");
  const catBox = document.getElementById("cat-filters");
  const brandBox = document.getElementById("brand-filters");
  const modelBox = document.getElementById("model-filters");
  const priceBox = document.getElementById("price-filters");
  const lineBox = document.getElementById("line-filters");
  const lineBanner = document.getElementById("line-banner");

  function radio(name, value, label, checked) {
    return (
      '<label class="check"><input type="radio" name="' +
      name +
      '" value="' +
      window.ShopUI.esc(value) +
      '"' +
      (checked ? " checked" : "") +
      "> <span>" +
      window.ShopUI.esc(label) +
      "</span></label>"
    );
  }

  function renderFilters() {
    catBox.innerHTML =
      radio("cat", "all", "Tutte", state.cat === "all") +
      window.SHOP.categories
        .map((category) => radio("cat", category.id, category.label, state.cat === category.id))
        .join("");

    brandBox.innerHTML =
      radio("marca", "all", "Tutte le marche", state.marca === "all") +
      window.SHOP.brands
        .map((brand) => radio("marca", brand.id, brand.label, state.marca === brand.id))
        .join("");

    const models =
      state.marca === "all"
        ? window.SHOP.models
        : window.SHOP.models.filter((model) => model.brand === state.marca);
    if (!models.some((model) => model.id === state.modello)) state.modello = "all";
    modelBox.innerHTML =
      radio("modello", "all", "Tutti i modelli", state.modello === "all") +
      models
        .map((model) => radio("modello", model.id, window.ShopUI.modelName(model.id), state.modello === model.id))
        .join("");

    const prices = [
      ["all", "Tutti i prezzi"],
      ["20", "Fino a 20 €"],
      ["50", "Da 20 a 50 €"],
      ["over", "Oltre 50 €"],
    ];
    priceBox.innerHTML = prices.map((entry) => radio("max", entry[0], entry[1], state.max === entry[0])).join("");
    if (lineBox) {
      lineBox.innerHTML =
        radio("linea", "all", "Tutte le linee", state.linea === "all") +
        radio("linea", "performance", "Top Performance", state.linea === "performance");
    }
    if (qInput) qInput.value = state.q;
    if (sortSelect) sortSelect.value = state.sort;
  }

  function matches(product) {
    if (state.linea === "performance" && product.line !== "performance") return false;
    if (state.cat !== "all" && product.category !== state.cat) return false;
    if (state.marca !== "all") {
      const ids = window.SHOP.models.filter((model) => model.brand === state.marca).map((model) => model.id);
      if (!product.compat.some((id) => ids.includes(id))) return false;
    }
    if (state.modello !== "all" && !product.compat.includes(state.modello)) return false;
    if (state.max === "20" && product.price > 20) return false;
    if (state.max === "50" && (product.price <= 20 || product.price > 50)) return false;
    if (state.max === "over" && product.price <= 50) return false;
    const terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return true;
    const hay = [
      product.name,
      product.sku,
      product.lead,
      window.ShopUI.category(product.category),
      product.compat.map((id) => window.ShopUI.modelName(id)).join(" "),
      product.line === "performance" ? "top performance" : "",
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => hay.includes(term));
  }

  function sorted(items) {
    const copy = items.slice();
    if (state.sort === "prezzo-asc") copy.sort((a, b) => a.price - b.price);
    else if (state.sort === "prezzo-desc") copy.sort((a, b) => b.price - a.price);
    else if (state.sort === "nome") copy.sort((a, b) => a.name.localeCompare(b.name, "it"));
    else copy.sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "it"));
    return copy;
  }

  function syncUrl() {
    const next = new URLSearchParams();
    if (state.q) next.set("q", state.q);
    if (state.cat !== "all") next.set("cat", state.cat);
    if (state.marca !== "all") next.set("marca", state.marca);
    if (state.modello !== "all") next.set("modello", state.modello);
    if (state.sort !== "consigliati") next.set("sort", state.sort);
    if (state.max !== "all") next.set("max", state.max);
    if (state.linea !== "all") next.set("linea", state.linea);
    const qs = next.toString();
    history.replaceState(null, "", qs ? "catalogo.html?" + qs : "catalogo.html");
  }

  function render() {
    const items = sorted(window.SHOP.products.filter(matches));
    grid.innerHTML = items.map((product) => window.ShopUI.card(product)).join("");
    empty.hidden = items.length > 0;
    const extra = state.q ? " per “" + state.q + "”" : "";
    const lineLabel = state.linea === "performance" ? " Top Performance" : "";
    meta.textContent = (items.length === 1 ? "1 ricambio" : items.length + " ricambi") + lineLabel + extra;
    if (lineBanner) lineBanner.hidden = state.linea !== "performance";
    syncUrl();
  }

  form.addEventListener("change", function (event) {
    const target = event.target;
    if (target.name === "cat") state.cat = target.value;
    if (target.name === "marca") {
      state.marca = target.value;
      state.modello = "all";
      renderFilters();
    }
    if (target.name === "modello") state.modello = target.value;
    if (target.name === "max") state.max = target.value;
    if (target.name === "linea") state.linea = target.value;
    render();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    state.q = qInput.value.trim();
    render();
  });

  if (qInput) {
    qInput.addEventListener("input", function () {
      state.q = qInput.value.trim();
      render();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      state.sort = sortSelect.value;
      render();
    });
  }

  document.getElementById("reset-filters").addEventListener("click", function () {
    state.q = "";
    state.cat = "all";
    state.marca = "all";
    state.modello = "all";
    state.max = "all";
    state.linea = "all";
    state.sort = "consigliati";
    renderFilters();
    render();
  });

  const drawer = document.getElementById("filter-drawer");
  if (drawer && window.matchMedia("(max-width: 980px)").matches) drawer.open = false;

  renderFilters();
  render();
})();
