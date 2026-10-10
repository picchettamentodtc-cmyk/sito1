(function () {
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const toastEl = document.createElement("div");
  toastEl.className = "toast";
  toastEl.setAttribute("role", "status");
  toastEl.setAttribute("aria-live", "polite");
  toastEl.hidden = true;
  document.body.appendChild(toastEl);

  function setMenu(open) {
    if (!toggle || !mobileNav) return;
    mobileNav.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Chiudi menu" : "Apri menu");
  }

  function refreshCart() {
    const count = window.Cart.count();
    document.querySelectorAll("[data-cart-count]").forEach((node) => {
      node.textContent = String(count);
    });
  }

  let toastTimer = 0;
  window.toast = function toast(message, href) {
    toastEl.replaceChildren();
    const text = document.createElement("span");
    text.textContent = message;
    toastEl.appendChild(text);
    if (href) {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = "Vedi carrello";
      toastEl.appendChild(link);
    }
    toastEl.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl.hidden = true;
    }, 2800);
  };

  document.addEventListener("click", function (event) {
    const add = event.target.closest("[data-add]");
    if (!add || add.disabled) return;
    const qtyInput = document.querySelector('[data-qty-for="' + add.dataset.add + '"]');
    const qty = qtyInput ? Number(qtyInput.value) : 1;
    const result = window.Cart.add(add.dataset.add, qty);
    window.toast(result.message, result.ok ? "carrello.html" : "");
  });

  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
  }

  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });

  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");
  if (query) {
    document.querySelectorAll('input[name="q"]').forEach((input) => {
      if (!input.value) input.value = query;
    });
  }

  window.addEventListener("cart:change", refreshCart);
  window.addEventListener("storage", refreshCart);
  refreshCart();
})();
