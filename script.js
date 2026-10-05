const PRODUCTS = [
  {
    id: "ms-01",
    name: "Cappotto Lana Aurora",
    category: "donna",
    tags: ["cappotto", "lana", "autunno", "nuovo"],
    price: 289,
    oldPrice: null,
    badge: "nuovo",
    hue: "linear-gradient(160deg, #6b3f38, #d7b48a)",
  },
  {
    id: "ms-02",
    name: "Blazer Notte",
    category: "uomo",
    tags: ["blazer", "elegante", "navy"],
    price: 219,
    oldPrice: 259,
    badge: "-15%",
    hue: "linear-gradient(160deg, #1c2433, #6d7a8c)",
  },
  {
    id: "ms-03",
    name: "Gonna Seta Lucente",
    category: "donna",
    tags: ["gonna", "seta", "sera"],
    price: 148,
    oldPrice: null,
    badge: null,
    hue: "linear-gradient(160deg, #3a1f2a, #c48a9a)",
  },
  {
    id: "ms-04",
    name: "Sneakers Mercurio",
    category: "scarpe",
    tags: ["sneakers", "bianche", "nuovo"],
    price: 129,
    oldPrice: null,
    badge: "nuovo",
    hue: "linear-gradient(160deg, #ece6dc, #8a8074)",
  },
  {
    id: "ms-05",
    name: "Borsa Cuoio Orsa",
    category: "accessori",
    tags: ["borsa", "cuoio", "oro"],
    price: 198,
    oldPrice: 240,
    badge: "-18%",
    hue: "linear-gradient(160deg, #4a2f18, #c4a574)",
  },
  {
    id: "ms-06",
    name: "Camicia Oxford",
    category: "uomo",
    tags: ["camicia", "cotone", "quotidiano"],
    price: 89,
    oldPrice: null,
    badge: null,
    hue: "linear-gradient(160deg, #d9d2c5, #6a736f)",
  },
  {
    id: "ms-07",
    name: "Stivali Caviglia Nera",
    category: "scarpe",
    tags: ["stivali", "pelle", "nero"],
    price: 176,
    oldPrice: null,
    badge: null,
    hue: "linear-gradient(160deg, #111, #5a463c)",
  },
  {
    id: "ms-08",
    name: "Orecchini Filo d’Oro",
    category: "accessori",
    tags: ["orecchini", "oro", "nuovo"],
    price: 64,
    oldPrice: null,
    badge: "nuovo",
    hue: "linear-gradient(160deg, #2a2418, #e8d5a3)",
  },
];

const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const state = {
  query: "",
  category: "all",
  cartCount: 0,
};

const grid = document.getElementById("product-grid");
const empty = document.getElementById("empty-state");
const meta = document.getElementById("results-meta");
const cartBadge = document.querySelector("[data-cart-count]");
const toast = document.getElementById("toast");
const headerInput = document.getElementById("header-query");
const heroInput = document.getElementById("hero-query");

function matches(product) {
  const q = state.query.trim().toLowerCase();
  const catOk =
    state.category === "all" ||
    (state.category === "nuovi"
      ? product.badge === "nuovo" || product.tags.includes("nuovo")
      : product.category === state.category);

  if (!catOk) return false;
  if (!q) return true;

  const hay = [product.name, product.category, ...product.tags]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

function render() {
  const items = PRODUCTS.filter(matches);
  grid.innerHTML = items
    .map(
      (p) => `
      <article class="product-card">
        <div class="product-media" style="background:${p.hue}">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        </div>
        <div class="product-body">
          <p class="product-cat">${p.category}</p>
          <h3>${p.name}</h3>
          <div class="price-row">
            <span class="price">${euro.format(p.price)}</span>
            ${p.oldPrice ? `<span class="price-old">${euro.format(p.oldPrice)}</span>` : ""}
          </div>
          <button class="add-btn" type="button" data-add="${p.id}">Aggiungi al carrello</button>
        </div>
      </article>`
    )
    .join("");

  empty.hidden = items.length > 0;
  const extra = state.query ? ` per “${state.query.trim()}”` : "";
  if (items.length === 1) {
    meta.textContent = `1 pezzo selezionato${extra}`;
  } else {
    meta.textContent = `${items.length} pezzi selezionati${extra}`;
  }
}

function setCategory(category) {
  state.category = category || "all";
  document.querySelectorAll(".category-card").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.category === state.category);
  });
  render();
}

function applyQuery(value) {
  state.query = value;
  if (headerInput) headerInput.value = value;
  if (heroInput) heroInput.value = value;
  render();
}

function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  state.cartCount += 1;
  cartBadge.hidden = false;
  cartBadge.textContent = String(state.cartCount);
  toast.hidden = false;
  toast.textContent = `${product.name} aggiunto al carrello`;
  window.clearTimeout(addToCart._t);
  addToCart._t = window.setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

document.querySelectorAll(".header-search, .hero-search").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    applyQuery(input.value);
    document.getElementById("prodotti").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-category]").forEach((btn) => {
  btn.addEventListener("click", () => setCategory(btn.dataset.category));
});

document.querySelectorAll("[data-nav-category]").forEach((link) => {
  link.addEventListener("click", () => setCategory(link.dataset.navCategory));
});

grid.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-add]");
  if (btn) addToCart(btn.dataset.add);
});

render();
