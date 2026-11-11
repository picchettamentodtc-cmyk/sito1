(function () {
  const marca = document.getElementById("finder-marca");
  const modello = document.getElementById("finder-modello");
  const grid = document.getElementById("featured-grid");
  const performanceGrid = document.getElementById("performance-grid");
  const count = document.getElementById("stat-count");

  if (count) count.textContent = String(window.SHOP.products.length);

  function fillBrands() {
    if (!marca) return;
    window.SHOP.brands.forEach((brand) => {
      const option = document.createElement("option");
      option.value = brand.id;
      option.textContent = brand.label;
      marca.appendChild(option);
    });
  }

  function fillModels() {
    if (!modello) return;
    const current = modello.value;
    modello.replaceChildren();
    const all = document.createElement("option");
    all.value = "";
    all.textContent = "Tutti i modelli";
    modello.appendChild(all);
    window.SHOP.models
      .filter((model) => !marca.value || model.brand === marca.value)
      .forEach((model) => {
        const option = document.createElement("option");
        option.value = model.id;
        option.textContent = model.label;
        modello.appendChild(option);
      });
    if (current && modello.querySelector('option[value="' + current + '"]')) {
      modello.value = current;
    }
  }

  if (marca && modello) {
    fillBrands();
    fillModels();
    marca.addEventListener("change", fillModels);
  }

  if (grid) {
    grid.innerHTML = window.SHOP.products
      .filter((product) => product.featured)
      .map((product) => window.ShopUI.card(product))
      .join("");
  }

  if (performanceGrid) {
    performanceGrid.innerHTML = window.SHOP.products
      .filter((product) => product.line === "performance")
      .map((product) => window.ShopUI.card(product))
      .join("");
  }
})();
