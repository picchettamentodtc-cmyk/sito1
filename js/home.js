import "./common.js";
import { products, categories } from "./products.js";
import { productCard, escapeHtml } from "./ui.js";

const featured = document.querySelector("#featured");
if (featured) {
  featured.innerHTML = products.filter((product) => product.featured).map(productCard).join("");
}

const list = document.querySelector("#category-list");
if (list) {
  list.innerHTML = categories()
    .map((category) => {
      const count = products.filter((product) => product.category === category).length;
      return `<a href="negozio.html?cat=${encodeURIComponent(category)}"><span>${escapeHtml(category)}</span><span>${count}</span></a>`;
    })
    .join("");
}
