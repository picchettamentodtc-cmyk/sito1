(function () {
  const flow = document.getElementById("checkout-flow");
  const done = document.getElementById("order-done");
  if (!flow || !done) return;

  const form = document.getElementById("checkout-form");
  const summary = document.getElementById("checkout-summary");
  const empty = document.getElementById("checkout-empty");

  function selected(name) {
    const node = form.querySelector('input[name="' + name + '"]:checked');
    return node ? node.value : "";
  }

  function renderSummary() {
    const lines = window.Cart.lines();
    const costs = window.quote(window.Cart.subtotal(), selected("spedizione"), selected("pagamento"));
    if (!lines.length) {
      summary.innerHTML = "";
      return;
    }
    const items = lines
      .map(
        (line) =>
          "<li><span>" +
          window.ShopUI.esc(line.qty + " × " + line.name) +
          "</span><span>" +
          window.ShopUI.esc(window.formatEuro(line.line)) +
          "</span></li>"
      )
      .join("");
    summary.innerHTML =
      "<h2>Il tuo ordine</h2><ul class=\"sum-lines\">" +
      items +
      "</ul><dl><div><dt>Subtotale</dt><dd>" +
      window.ShopUI.esc(window.formatEuro(costs.subtotal)) +
      "</dd></div><div><dt>Spedizione</dt><dd>" +
      window.ShopUI.esc(costs.shipping === 0 ? "Gratis" : window.formatEuro(costs.shipping)) +
      "</dd></div><div><dt>Contrassegno</dt><dd>" +
      window.ShopUI.esc(costs.cod === 0 ? "—" : window.formatEuro(costs.cod)) +
      '</dd></div><div class="sum-total"><dt>Totale</dt><dd>' +
      window.ShopUI.esc(window.formatEuro(costs.total)) +
      "</dd></div></dl>";
  }

  function showCart() {
    const lines = window.Cart.lines();
    const hasItems = lines.length > 0;
    empty.hidden = hasItems;
    form.hidden = !hasItems;
    summary.hidden = !hasItems;
    if (hasItems) renderSummary();
  }

  function showOrder() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("ordine");
    if (!id) return false;
    let order = null;
    try {
      order = JSON.parse(sessionStorage.getItem("banco50-order") || "null");
    } catch (error) {
      order = null;
    }
    flow.hidden = true;
    done.hidden = false;
    if (!order || order.id !== id) {
      done.innerHTML =
        '<div class="empty-panel"><h1>Ordine non trovato</h1><p>Il riepilogo resta solo in questo browser e non risulta per questo numero.</p><a class="cta" href="catalogo.html">Torna al catalogo</a></div>';
      return true;
    }
    const rows = order.lines
      .map(
        (line) =>
          "<li><span>" +
          window.ShopUI.esc(line.qty + " × " + line.name) +
          "</span><span>" +
          window.ShopUI.esc(window.formatEuro(line.line)) +
          "</span></li>"
      )
      .join("");
    done.innerHTML =
      '<p class="eyebrow">Conferma</p><h1>Ordine ' +
      window.ShopUI.esc(order.id) +
      " registrato</h1><p class=\"detail-lead\">Grazie " +
      window.ShopUI.esc(order.customer.nome) +
      ". Questo checkout è dimostrativo: nessun pagamento è stato addebitato e l’ordine non è stato trasmesso. Il riepilogo resta in questo browser.</p>" +
      '<div class="confirm-grid"><section><h2>Spedizione</h2><p>' +
      window.ShopUI.esc(
        order.customer.nome +
          " " +
          order.customer.cognome +
          " · " +
          order.customer.indirizzo +
          ", " +
          order.customer.cap +
          " " +
          order.customer.citta +
          " (" +
          order.customer.provincia +
          ")"
      ) +
      "</p><p>" +
      window.ShopUI.esc(order.customer.email) +
      "</p><p>Pagamento scelto: " +
      window.ShopUI.esc(order.paymentLabel) +
      ".</p></section><section><h2>Totali</h2><ul class=\"sum-lines\">" +
      rows +
      '</ul><p class="price">' +
      window.ShopUI.esc(window.formatEuro(order.total)) +
      '</p></section></div><a class="cta" href="catalogo.html">Continua lo shopping</a>';
    document.title = "Ordine confermato — Banco 50";
    return true;
  }

  if (showOrder()) return;

  form.addEventListener("change", renderSummary);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const lines = window.Cart.lines();
    if (!lines.length) {
      showCart();
      window.toast("Il carrello è vuoto.");
      return;
    }
    const data = new FormData(form);
    const costs = window.quote(window.Cart.subtotal(), data.get("spedizione"), data.get("pagamento"));
    const paymentLabels = {
      carta: "Carta simulata",
      bonifico: "Bonifico",
      contrassegno: "Contrassegno",
    };
    const now = new Date();
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    const id =
      "B50-" +
      String(now.getFullYear()).slice(2) +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      "-" +
      rand;
    const order = {
      id: id,
      createdAt: now.toISOString(),
      customer: {
        nome: String(data.get("nome")).trim(),
        cognome: String(data.get("cognome")).trim(),
        email: String(data.get("email")).trim(),
        telefono: String(data.get("telefono") || "").trim(),
        indirizzo: String(data.get("indirizzo")).trim(),
        cap: String(data.get("cap")).trim(),
        citta: String(data.get("citta")).trim(),
        provincia: String(data.get("provincia")).trim().toUpperCase(),
        note: String(data.get("note") || "").trim(),
      },
      payment: data.get("pagamento"),
      paymentLabel: paymentLabels[data.get("pagamento")] || "Pagamento",
      shippingMethod: data.get("spedizione"),
      lines: lines.map((line) => ({ id: line.id, name: line.name, qty: line.qty, line: line.line })),
      total: costs.total,
    };
    sessionStorage.setItem("banco50-order", JSON.stringify(order));
    window.Cart.clear();
    window.location.href = "checkout.html?ordine=" + encodeURIComponent(order.id);
  });

  window.addEventListener("cart:change", showCart);
  showCart();
})();
