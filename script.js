const PRODUCTS = [
  {
    id: "nk-01",
    name: "Maglietta Nike Club Nero",
    brand: "Nike",
    category: "uomo",
    tags: ["maglietta", "nike", "t-shirt", "cotone", "nero", "streetwear", "esposizione"],
    price: 35,
    oldPrice: null,
    badge: "esposizione",
    image: "assets/nike-tee-nero.svg",
    hue: "linear-gradient(160deg, #2a2a2a, #111)",
  },
  {
    id: "nk-02",
    name: "Maglietta Nike Club Bianco",
    brand: "Nike",
    category: "donna",
    tags: ["maglietta", "nike", "t-shirt", "cotone", "bianco", "streetwear", "esposizione"],
    price: 35,
    oldPrice: null,
    badge: "esposizione",
    image: "assets/nike-tee-bianco.svg",
    hue: "linear-gradient(160deg, #f4efe6, #c9c0b2)",
  },
  {
    id: "nk-03",
    name: "Maglietta Nike Dri-FIT Navy",
    brand: "Nike",
    category: "uomo",
    tags: ["maglietta", "nike", "t-shirt", "dri-fit", "navy", "blu", "streetwear", "esposizione"],
    price: 45,
    oldPrice: null,
    badge: "esposizione",
    image: "assets/nike-tee-navy.svg",
    hue: "linear-gradient(160deg, #243352, #121a2b)",
  },
  {
    id: "nk-04",
    name: "Maglietta Nike Air Grigio",
    brand: "Nike",
    category: "donna",
    tags: ["maglietta", "nike", "t-shirt", "air", "grigio", "streetwear", "esposizione"],
    price: 40,
    oldPrice: null,
    badge: "esposizione",
    image: "assets/nike-tee-grigio.svg",
    hue: "linear-gradient(160deg, #d5d2cc, #8d8982)",
  },
  {
    id: "sw-01",
    name: "T-shirt Oversize Street Club",
    brand: "Mercurius",
    category: "uomo",
    tags: ["maglietta", "t-shirt", "oversize", "nero", "streetwear", "cotone", "nuovo"],
    price: 39,
    oldPrice: null,
    badge: "nuovo",
    image: "assets/street-tee-nera-oversize.svg",
    hue: "linear-gradient(160deg, #2a2a2a, #0b0b0b)",
  },
  {
    id: "sw-02",
    name: "T-shirt Boxy Downtown",
    brand: "Mercurius",
    category: "donna",
    tags: ["maglietta", "t-shirt", "boxy", "sabbia", "beige", "streetwear", "cotone"],
    price: 42,
    oldPrice: null,
    badge: null,
    image: "assets/street-tee-sabbia-boxy.svg",
    hue: "linear-gradient(160deg, #e6d9c2, #b09f7e)",
  },
  {
    id: "sw-03",
    name: "T-shirt Grafica N.7 Oliva",
    brand: "Mercurius",
    category: "uomo",
    tags: ["maglietta", "t-shirt", "grafica", "verde", "oliva", "streetwear", "cotone"],
    price: 45,
    oldPrice: 55,
    badge: "-18%",
    image: "assets/street-tee-verde-grafica.svg",
    hue: "linear-gradient(160deg, #6a7355, #2f3524)",
  },
  {
    id: "sw-04",
    name: "T-shirt Vintage Bordeaux",
    brand: "Mercurius",
    category: "donna",
    tags: ["maglietta", "t-shirt", "vintage", "bordeaux", "streetwear", "cotone", "nuovo"],
    price: 44,
    oldPrice: null,
    badge: "nuovo",
    image: "assets/street-tee-bordeaux-vintage.svg",
    hue: "linear-gradient(160deg, #8c3a44, #3e1319)",
  },
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
    tags: ["sneakers", "bianche", "nuovo", "streetwear"],
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
const toast = document.getElementById("toast");
const headerInput = document.getElementById("header-query");
const heroInput = document.getElementById("hero-query");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
function matches(product) {
  const q = state.query.trim().toLowerCase();
  const catOk =
    state.category === "all" ||
    (state.category === "nuovi"
      ? product.badge === "nuovo" || product.tags.includes("nuovo")
      : state.category === "streetwear"
        ? product.tags.includes("streetwear")
        : product.category === state.category);

  if (!catOk) return false;
  if (!q) return true;

  const hay = [product.name, product.brand || "", product.category, ...product.tags]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

function render() {
  if (!grid) return;
  const items = PRODUCTS.filter(matches);
  grid.innerHTML = items
    .map(
      (p) => `
      <article class="product-card">
        <div class="product-media" style="background:${p.hue}">
          ${
            p.image
              ? `<img src="${p.image}" alt="${p.name}" width="480" height="640" />`
              : ""
          }
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        </div>
        <div class="product-body">
          <p class="product-cat">${p.brand ? `${p.brand} · ` : ""}${p.category}</p>
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

  if (empty) empty.hidden = items.length > 0;
  if (!meta) return;
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
  document.getElementById("prodotti").scrollIntoView({ behavior: "smooth" });
}

function applyQuery(value) {
  state.query = value;
  if (headerInput) headerInput.value = value;
  if (heroInput) heroInput.value = value;
  render();
}

function showToast(message) {
  toast.hidden = false;
  toast.textContent = message;
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  state.cartCount += 1;
  showToast(`${product.name} aggiunto al carrello`);
}

function setMobileMenu(open) {
  if (!menuToggle || !mobileNav) return;
  mobileNav.classList.toggle("is-open", open);
  mobileNav.hidden = !open;
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  menuToggle.setAttribute("aria-label", open ? "Chiudi menu" : "Apri menu");
}

document.querySelectorAll(".header-search, .hero-search").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    applyQuery(input.value);
    document.getElementById("prodotti").scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
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

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    setMobileMenu(open);
  });
}

if (mobileNav) {
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMobileMenu(false));
  });
}

render();
