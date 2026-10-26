import "./common.js";
import {
  apparelSizes,
  categories,
  colorOptions,
  filterProducts,
  formatPrice,
  fragranceFormats,
  priceBounds,
} from "./products.js";
import { productCard, escapeHtml } from "./ui.js";

const bounds = priceBounds();
const filtersRoot = document.querySelector("#filters");
const grid = document.querySelector("#product-grid");
const chips = document.querySelector("#active-filters");
const backdrop = document.querySelector("#filter-backdrop");
const openButton = document.querySelector("#open-filters");
const leads = {
  Profumi: "Estratti della casa. Formati da 30, 50 e 100 ml. Il sigillo deve restare integro per un reso.",
  "Vestiti da sposa": "Abiti minimi per un giorno solo, nel taglio Mercury Search. Le modifiche escludono il reso.",
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function stateFromUrl() {
  const params = new URLSearchParams(location.search);
  let min = Number(params.get("min") ?? bounds.min);
  let max = Number(params.get("max") ?? bounds.max);
  if (!Number.isFinite(min)) min = bounds.min;
  if (!Number.isFinite(max)) max = bounds.max;
  min = clamp(min, bounds.min, bounds.max);
  max = clamp(max, bounds.min, bounds.max);
  if (min > max) [min, max] = [max, min];
  return {
    cats: params.getAll("cat"),
    sizes: params.getAll("size"),
    formats: params.getAll("format"),
    colors: params.getAll("color"),
    min,
    max,
    q: params.get("q") || "",
    sort: params.get("sort") || "consigliati",
  };
}

function writeUrl(state) {
  const params = new URLSearchParams();
  state.cats.forEach((value) => params.append("cat", value));
  state.sizes.forEach((value) => params.append("size", value));
  state.formats.forEach((value) => params.append("format", value));
  state.colors.forEach((value) => params.append("color", value));
  if (state.min > bounds.min) params.set("min", String(state.min));
  if (state.max < bounds.max) params.set("max", String(state.max));
  if (state.q) params.set("q", state.q);
  if (state.sort && state.sort !== "consigliati") params.set("sort", state.sort);
  const query = params.toString();
  history.replaceState(null, "", query ? `negozio.html?${query}` : "negozio.html");
}

function readControls() {
  const selected = (name) => [...filtersRoot.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
  let min = Number(document.querySelector("#price-min").value);
  let max = Number(document.querySelector("#price-max").value);
  if (!Number.isFinite(min)) min = bounds.min;
  if (!Number.isFinite(max)) max = bounds.max;
  min = clamp(min, bounds.min, bounds.max);
  max = clamp(max, bounds.min, bounds.max);
  if (min > max) [min, max] = [max, min];
  return {
    cats: selected("cat"),
    sizes: selected("size"),
    formats: selected("format"),
    colors: selected("color"),
    min,
    max,
    q: document.querySelector("#shop-q").value,
    sort: document.querySelector("#sort").value,
  };
}

function markPresets(state) {
  document.querySelectorAll("[data-preset]").forEach((button) => {
    const on = state.min === Number(button.dataset.min) && state.max === Number(button.dataset.max);
    button.classList.toggle("is-selected", on);
    button.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function syncControls(state) {
  filtersRoot.querySelectorAll("input[type=checkbox]").forEach((input) => {
    const group = input.name === "cat" ? state.cats : input.name === "size" ? state.sizes : input.name === "format" ? state.formats : state.colors;
    input.checked = group.includes(input.value);
  });
  document.querySelector("#price-min").value = state.min;
  document.querySelector("#price-max").value = state.max;
  const query = document.querySelector("#shop-q");
  if (query && document.activeElement !== query) query.value = state.q;
  document.querySelector("#sort").value = state.sort;
  markPresets(state);
}

function optionList(name, values, labelOf = (value) => value) {
  return values
    .map(
      (value) =>
        `<label class="filter-option"><input type="checkbox" name="${name}" value="${escapeHtml(value)}" /><span>${escapeHtml(labelOf(value))}</span></label>`
    )
    .join("");
}

function renderFilters() {
  const colors = colorOptions()
    .map(
      (color) =>
        `<label class="filter-option"><input type="checkbox" name="color" value="${escapeHtml(color.id)}" /><span class="swatch" style="background:${color.hex}"></span><span>${escapeHtml(color.name)}</span></label>`
    )
    .join("");
  filtersRoot.innerHTML = `
    <div class="filters-head"><h2>Filtri</h2><button type="button" class="text-btn filters-close" id="close-filters">Chiudi</button></div>
    <fieldset class="filter-group"><legend>Categoria</legend>${optionList("cat", categories())}</fieldset>
    <fieldset class="filter-group"><legend>Taglia</legend>${optionList("size", apparelSizes())}</fieldset>
    <fieldset class="filter-group"><legend>Formato</legend>${optionList("format", fragranceFormats())}</fieldset>
    <fieldset class="filter-group"><legend>Colore</legend>${colors}</fieldset>
    <div class="filter-group">
      <h2>Prezzo</h2>
      <div class="presets">
        <button type="button" class="preset" data-preset data-min="${bounds.min}" data-max="${bounds.max}">Tutti</button>
        <button type="button" class="preset" data-preset data-min="${bounds.min}" data-max="200">Fino a 200 €</button>
        <button type="button" class="preset" data-preset data-min="200" data-max="400">200–400 €</button>
        <button type="button" class="preset" data-preset data-min="400" data-max="1000">400–1000 €</button>
        <button type="button" class="preset" data-preset data-min="1000" data-max="${bounds.max}">Oltre 1000 €</button>
      </div>
      <div class="price-fields">
        <label>Da <input id="price-min" type="number" inputmode="numeric" min="${bounds.min}" max="${bounds.max}" step="1" /></label>
        <label>A <input id="price-max" type="number" inputmode="numeric" min="${bounds.min}" max="${bounds.max}" step="1" /></label>
      </div>
    </div>
    <button type="button" class="btn btn-full filters-apply" id="apply-filters">Mostra i capi</button>`;
}

function capoLabel(count) {
  return count === 1 ? "1 capo" : `${count} capi`;
}

function chip(kind, value, label) {
  return `<button type="button" class="chip" data-clear="${kind}" data-value="${escapeHtml(value)}">${escapeHtml(label)} ×</button>`;
}

function renderResults() {
  const state = stateFromUrl();
  const list = filterProducts(state);
  const title = document.querySelector("#shop-title");
  const lead = document.querySelector("#shop-lead");
  if (title) title.textContent = state.cats.length === 1 ? state.cats[0] : "La collezione";
  if (lead) {
    lead.textContent =
      state.cats.length === 1 && leads[state.cats[0]]
        ? leads[state.cats[0]]
        : "Lana, nylon e argento. Filtra per categoria, taglia, colore e prezzo.";
  }
  document.title = state.q ? `Ricerca “${state.q}” — Mercury Search` : `${title?.textContent || "Negozio"} — Mercury Search`;
  document.querySelector("#result-count").textContent = capoLabel(list.length);
  const apply = document.querySelector("#apply-filters");
  if (apply) apply.textContent = `Mostra ${capoLabel(list.length)}`;
  if (openButton) openButton.textContent = `Filtri · ${capoLabel(list.length)}`;
  const colorName = (id) => colorOptions().find((color) => color.id === id)?.name || id;
  const pieces = [];
  state.cats.forEach((value) => pieces.push(chip("cat", value, value)));
  state.sizes.forEach((value) => pieces.push(chip("size", value, value)));
  state.formats.forEach((value) => pieces.push(chip("format", value, value)));
  state.colors.forEach((value) => pieces.push(chip("color", value, colorName(value))));
  if (state.min > bounds.min || state.max < bounds.max) pieces.push(chip("price", "", `${formatPrice(state.min)} – ${formatPrice(state.max)}`));
  if (state.q) pieces.push(chip("q", "", `“${state.q}”`));
  if (pieces.length) pieces.push(`<button type="button" class="chip" data-clear="all">Azzera</button>`);
  chips.innerHTML = pieces.join("");
  grid.innerHTML = list.length
    ? list.map(productCard).join("")
    : `<div class="empty"><p>Nessun capo con questi filtri.</p><button type="button" class="btn" id="reset-filters">Azzera filtri</button></div>`;
  document.querySelectorAll('input[name="q"]').forEach((input) => {
    if (input.id !== "shop-q" && document.activeElement !== input) input.value = state.q;
  });
}

function commit(state) {
  writeUrl(state);
  syncControls(state);
  renderResults();
}

function resetState() {
  return { cats: [], sizes: [], formats: [], colors: [], min: bounds.min, max: bounds.max, q: "", sort: "consigliati" };
}

function clearOne(state, kind, value) {
  if (kind === "all") return resetState();
  if (kind === "cat") state.cats = state.cats.filter((item) => item !== value);
  if (kind === "size") state.sizes = state.sizes.filter((item) => item !== value);
  if (kind === "format") state.formats = state.formats.filter((item) => item !== value);
  if (kind === "color") state.colors = state.colors.filter((item) => item !== value);
  if (kind === "price") {
    state.min = bounds.min;
    state.max = bounds.max;
  }
  if (kind === "q") state.q = "";
  return state;
}

function setDrawer(open) {
  filtersRoot.classList.toggle("is-open", open);
  backdrop.hidden = !open;
  openButton?.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-lock", open);
}

renderFilters();
syncControls(stateFromUrl());
renderResults();

filtersRoot.addEventListener("change", (event) => {
  if (!event.target.matches("input")) return;
  commit(readControls());
});
filtersRoot.addEventListener("click", (event) => {
  const preset = event.target.closest("[data-preset]");
  if (!preset) return;
  document.querySelector("#price-min").value = preset.dataset.min;
  document.querySelector("#price-max").value = preset.dataset.max;
  commit(readControls());
});
document.querySelector("#shop-search").addEventListener("submit", (event) => {
  event.preventDefault();
  commit(readControls());
});
document.querySelector("#shop-q").addEventListener("input", () => {
  const state = readControls();
  writeUrl(state);
  renderResults();
});
document.querySelector("#sort").addEventListener("change", () => commit(readControls()));
chips.addEventListener("click", (event) => {
  const button = event.target.closest("[data-clear]");
  if (!button) return;
  commit(clearOne(stateFromUrl(), button.dataset.clear, button.dataset.value || ""));
});
grid.addEventListener("click", (event) => {
  if (event.target.closest("#reset-filters")) commit(resetState());
});
openButton?.addEventListener("click", () => setDrawer(true));
backdrop?.addEventListener("click", () => setDrawer(false));
document.querySelector("#close-filters")?.addEventListener("click", () => setDrawer(false));
document.querySelector("#apply-filters")?.addEventListener("click", () => setDrawer(false));
window.addEventListener("popstate", () => {
  syncControls(stateFromUrl());
  renderResults();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setDrawer(false);
});
