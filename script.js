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
  {
    id: "ms-09",
    name: "T-shirt Heavy Bianca",
    category: "streetwear",
    tags: ["t-shirt", "tee", "bianca", "cotone", "streetwear", "nuovo"],
    price: 49,
    oldPrice: null,
    badge: "nuovo",
    image: "assets/streetwear/tee-bianca.jpg",
    hue: "linear-gradient(160deg, #f4efe6, #8a8074)",
  },
  {
    id: "ms-10",
    name: "T-shirt Heavy Nera",
    category: "streetwear",
    tags: ["t-shirt", "tee", "nera", "cotone", "streetwear"],
    price: 49,
    oldPrice: null,
    badge: null,
    image: "assets/streetwear/tee-nera.jpg",
    hue: "linear-gradient(160deg, #111, #3a3a3a)",
  },
  {
    id: "ms-11",
    name: "T-shirt Boxy Sabbia",
    category: "streetwear",
    tags: ["t-shirt", "tee", "sabbia", "boxy", "oversize", "streetwear", "nuovo"],
    price: 59,
    oldPrice: null,
    badge: "nuovo",
    image: "assets/streetwear/tee-sabbia.jpg",
    hue: "linear-gradient(160deg, #d9cbb6, #8a7560)",
  },
  {
    id: "ms-12",
    name: "T-shirt Crop Grafica",
    category: "streetwear",
    tags: ["t-shirt", "tee", "crop", "grafica", "nera", "streetwear"],
    price: 55,
    oldPrice: 69,
    badge: "-20%",
    image: "assets/streetwear/tee-crop.jpg",
    hue: "linear-gradient(160deg, #1a1a1a, #c98b8b)",
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
const streetGrid = document.getElementById("streetwear-grid");
const streetSection = document.getElementById("streetwear");
const productsSection = document.querySelector(".products");
const empty = document.getElementById("empty-state");
const meta = document.getElementById("results-meta");
const cartBadge = document.querySelector("[data-cart-count]");
const toast = document.getElementById("toast");
const headerInput = document.getElementById("header-query");
const heroInput = document.getElementById("hero-query");

const params = new URLSearchParams(window.location.search);
if (params.get("categoria")) state.category = params.get("categoria");
if (params.get("q")) state.query = params.get("q");

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

function cardHtml(product) {
  const photo = product.image
    ? `<img src="${product.image}" alt="${product.name}" />`
    : "";
  return `
      <article class="product-card">
        <div class="product-media" style="background:${product.hue}">
          ${photo}
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        </div>
        <div class="product-body">
          <p class="product-cat">${product.category}</p>
          <h3>${product.name}</h3>
          <div class="price-row">
            <span class="price">${euro.format(product.price)}</span>
            ${product.oldPrice ? `<span class="price-old">${euro.format(product.oldPrice)}</span>` : ""}
          </div>
          <button class="add-btn" type="button" data-add="${product.id}">Aggiungi al carrello</button>
        </div>
      </article>`;
}

function render() {
  const items = PRODUCTS.filter(matches);
  const street = items.filter((product) => product.category === "streetwear");
  const rest = items.filter((product) => product.category !== "streetwear");

  if (streetGrid) streetGrid.innerHTML = street.map(cardHtml).join("");
  if (streetSection) streetSection.hidden = street.length === 0;
  if (grid) grid.innerHTML = rest.map(cardHtml).join("");
  if (productsSection) {
    productsSection.hidden = items.length > 0 && rest.length === 0;
  }

  if (empty) empty.hidden = items.length > 0;
  const extra = state.query ? ` per “${state.query.trim()}”` : "";
  if (meta) {
    if (items.length === 1) {
      meta.textContent = `1 pezzo selezionato${extra}`;
    } else {
      meta.textContent = `${items.length} pezzi selezionati${extra}`;
    }
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
    const street = document.getElementById("streetwear");
    const catalog = document.getElementById("prodotti");
    const target = street && !street.hidden ? street : catalog;
    target?.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-category]").forEach((btn) => {
  btn.addEventListener("click", () => setCategory(btn.dataset.category));
});

document.querySelectorAll("[data-nav-category]").forEach((link) => {
  link.addEventListener("click", () => setCategory(link.dataset.navCategory));
});

document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-add]");
  if (btn) addToCart(btn.dataset.add);
});

if (state.query) applyQuery(state.query);
else render();

if (state.category !== "all") setCategory(state.category);
if (state.category === "streetwear") {
  document.getElementById("streetwear")?.scrollIntoView();
}
