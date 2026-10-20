import "./common.js";
import { formatPrice } from "./products.js";
import { cartTotals, clearCart, EXPRESS_SHIPPING, FREE_SHIPPING_FROM, shippingCost, STANDARD_SHIPPING } from "./store.js";
import { escapeHtml } from "./ui.js";

const ORDER_KEY = "mercury-search-order";
const root = document.querySelector("#checkout-root");
const heading = document.querySelector("#checkout-heading");

function money(value) {
  return value === 0 ? "Gratis" : formatPrice(value);
}

function readOrder() {
  try {
    return JSON.parse(sessionStorage.getItem(ORDER_KEY) || "null");
  } catch {
    return null;
  }
}

function showOrder(id) {
  const order = readOrder();
  if (!order || order.id !== id) {
    root.innerHTML = `<div class="empty"><h2>Ordine non disponibile</h2><p>Il riepilogo resta solo in questa sessione del browser.</p><a class="btn" href="negozio.html">Torna al negozio</a></div>`;
    return;
  }
  if (heading) heading.textContent = "Ordine confermato";
  document.title = `Ordine ${order.id} — Mercury Search`;
  root.innerHTML = `<section class="confirm">
    <p class="eyebrow">Mercury Search</p>
    <h2>Grazie, ${escapeHtml(order.customer.nome)}.</h2>
    <p>L'ordine <strong>${escapeHtml(order.id)}</strong> è registrato in questo browser. Nessun pagamento è stato addebitato e nessun dato è stato inviato a un server.</p>
    <div class="summary">
      ${order.lines
        .map(
          (line) =>
            `<div class="summary-row"><span>${escapeHtml(line.name)} · ${escapeHtml(line.size)} × ${line.qty}</span><span>${formatPrice(line.price * line.qty)}</span></div>`
        )
        .join("")}
      <div class="summary-row"><span>Spedizione</span><span>${money(order.shipping)}</span></div>
      <div class="summary-row total"><span>Totale</span><span>${formatPrice(order.total)}</span></div>
      <p class="ship-note">${escapeHtml(order.customer.indirizzo)}, ${escapeHtml(order.customer.cap)} ${escapeHtml(order.customer.citta)} (${escapeHtml(order.customer.provincia)})</p>
    </div>
    <a class="btn" href="negozio.html">Continua nel negozio</a>
  </section>`;
}

function field(name, label, value, error, extra = "") {
  return `<label class="field ${extra}">
    <span>${label}</span>
    <input name="${name}" value="${escapeHtml(value || "")}" ${error ? `aria-invalid="true" aria-describedby="err-${name}"` : ""} />
    ${error ? `<small id="err-${name}" class="field-error">${escapeHtml(error)}</small>` : ""}
  </label>`;
}

function renderForm(values, errors) {
  const totals = cartTotals(values.spedizione || "standard");
  if (!totals.lines.length) {
    root.innerHTML = `<div class="empty"><p>Il carrello è vuoto.</p><a class="btn" href="negozio.html">Vai al negozio</a></div>`;
    return;
  }
  const standard = shippingCost(totals.subtotal, "standard");
  root.innerHTML = `<form id="checkout-form" class="checkout-layout" novalidate>
    <div>
      ${Object.keys(errors).length ? `<p class="form-error" role="alert">Controlla i campi evidenziati.</p>` : ""}
      <div class="form-grid">
        ${field("nome", "Nome", values.nome, errors.nome)}
        ${field("cognome", "Cognome", values.cognome, errors.cognome)}
        ${field("email", "Email", values.email, errors.email, "field-wide")}
        ${field("telefono", "Telefono", values.telefono, errors.telefono)}
        ${field("indirizzo", "Indirizzo", values.indirizzo, errors.indirizzo, "field-wide")}
        ${field("cap", "CAP", values.cap, errors.cap)}
        ${field("citta", "Città", values.citta, errors.citta)}
        ${field("provincia", "Provincia", values.provincia, errors.provincia)}
        <label class="field field-wide"><span>Note per il corriere</span><input name="note" value="${escapeHtml(values.note || "")}" />${errors.note ? `<small class="field-error">${escapeHtml(errors.note)}</small>` : ""}</label>
      </div>
      <fieldset class="buy-group">
        <legend>Spedizione</legend>
        <label class="choice"><input type="radio" name="spedizione" value="standard" ${values.spedizione !== "express" ? "checked" : ""} /><span><strong>Standard</strong><small>${standard === 0 ? "Gratis su questo ordine" : `${formatPrice(STANDARD_SHIPPING)}, gratis oltre ${formatPrice(FREE_SHIPPING_FROM)}`}</small></span></label>
        <label class="choice"><input type="radio" name="spedizione" value="express" ${values.spedizione === "express" ? "checked" : ""} /><span><strong>Express</strong><small>${formatPrice(EXPRESS_SHIPPING)}, consegna prioritaria</small></span></label>
      </fieldset>
      <fieldset class="buy-group">
        <legend>Pagamento</legend>
        <label class="choice"><input type="radio" name="pagamento" value="contrassegno" ${values.pagamento !== "carta" ? "checked" : ""} /><span><strong>Contrassegno</strong><small>Paghi alla consegna. In questa demo non c'è addebito.</small></span></label>
        <label class="choice"><input type="radio" name="pagamento" value="carta" ${values.pagamento === "carta" ? "checked" : ""} /><span><strong>Carta</strong><small>Simulata. Il numero non viene salvato.</small></span></label>
        <div id="card-fields" class="form-grid" ${values.pagamento === "carta" ? "" : "hidden"}>
          ${field("carta", "Numero carta", values.carta, errors.carta, "field-wide")}
          ${field("scadenza", "Scadenza MM/AA", values.scadenza, errors.scadenza)}
          ${field("cvc", "CVC", values.cvc, errors.cvc)}
        </div>
      </fieldset>
    </div>
    <aside class="summary">
      <h2>Ordine</h2>
      ${totals.lines.map((line) => `<div class="summary-row"><span>${escapeHtml(line.product.name)} × ${line.qty}</span><span>${formatPrice(line.lineTotal)}</span></div>`).join("")}
      <div class="summary-row"><span>Spedizione</span><span>${money(totals.shipping)}</span></div>
      <div class="summary-row total"><span>Totale</span><span>${formatPrice(totals.total)}</span></div>
      <button class="btn btn-full" type="submit">Conferma ordine</button>
      <p class="ship-note">Mercury Search non addebita la carta e non invia i dati a un server.</p>
    </aside>
  </form>`;

  const form = root.querySelector("#checkout-form");
  const syncPay = () => {
    const card = form.querySelector("input[name=pagamento]:checked")?.value === "carta";
    form.querySelector("#card-fields").hidden = !card;
  };
  form.querySelectorAll("input[name=pagamento], input[name=spedizione]").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.name === "pagamento") syncPay();
      if (input.name === "spedizione") {
        const next = { ...valuesFrom(form), spedizione: input.value };
        renderForm(next, errors);
      }
    });
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const next = valuesFrom(form);
    const problems = validate(next);
    if (Object.keys(problems).length) {
      renderForm(next, problems);
      root.querySelector("[aria-invalid='true']")?.focus();
      return;
    }
    const finalTotals = cartTotals(next.spedizione);
    const order = {
      id: `MS-${Math.floor(10000 + Math.random() * 90000)}`,
      customer: {
        nome: next.nome.trim(),
        cognome: next.cognome.trim(),
        email: next.email.trim(),
        telefono: next.telefono.trim(),
        indirizzo: next.indirizzo.trim(),
        cap: next.cap.trim(),
        citta: next.citta.trim(),
        provincia: next.provincia.trim().toUpperCase(),
        note: next.note.trim(),
      },
      paymentMethod: next.pagamento,
      lines: finalTotals.lines.map((line) => ({
        name: line.product.name,
        size: line.size,
        qty: line.qty,
        price: line.product.price,
      })),
      shipping: finalTotals.shipping,
      total: finalTotals.total,
    };
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
    clearCart();
    location.href = `checkout.html?ordine=${encodeURIComponent(order.id)}`;
  });
}

function valuesFrom(form) {
  const data = new FormData(form);
  return {
    nome: data.get("nome") || "",
    cognome: data.get("cognome") || "",
    email: data.get("email") || "",
    telefono: data.get("telefono") || "",
    indirizzo: data.get("indirizzo") || "",
    cap: data.get("cap") || "",
    citta: data.get("citta") || "",
    provincia: data.get("provincia") || "",
    note: data.get("note") || "",
    spedizione: data.get("spedizione") || "standard",
    pagamento: data.get("pagamento") || "contrassegno",
    carta: data.get("carta") || "",
    scadenza: data.get("scadenza") || "",
    cvc: data.get("cvc") || "",
  };
}

function validate(values) {
  const errors = {};
  if (values.nome.trim().length < 2) errors.nome = "Inserisci il nome.";
  if (values.cognome.trim().length < 2) errors.cognome = "Inserisci il cognome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Inserisci un'email valida.";
  if (values.telefono.replace(/\D/g, "").length < 6) errors.telefono = "Inserisci un telefono valido.";
  if (values.indirizzo.trim().length < 5) errors.indirizzo = "Inserisci l'indirizzo.";
  if (!/^\d{5}$/.test(values.cap.trim())) errors.cap = "Il CAP ha 5 cifre.";
  if (values.citta.trim().length < 2) errors.citta = "Inserisci la città.";
  if (!/^[A-Za-z]{2}$/.test(values.provincia.trim())) errors.provincia = "Usa la sigla, per esempio MI.";
  if (values.note.length > 240) errors.note = "Massimo 240 caratteri.";
  if (values.pagamento === "carta") {
    if (!/^\d{16}$/.test(values.carta.replace(/\s/g, ""))) errors.carta = "Inserisci 16 cifre.";
    if (!/^\d{2}\/\d{2}$/.test(values.scadenza.trim())) errors.scadenza = "Usa il formato MM/AA.";
    else {
      const [month, year] = values.scadenza.split("/").map(Number);
      const expiry = new Date(2000 + year, month, 0);
      if (month < 1 || month > 12 || expiry < new Date()) errors.scadenza = "Carta scaduta o data non valida.";
    }
    if (!/^\d{3}$/.test(values.cvc.trim())) errors.cvc = "Inserisci 3 cifre.";
  }
  return errors;
}

const ordine = new URLSearchParams(location.search).get("ordine");
if (ordine) showOrder(ordine);
else {
  renderForm(
    {
      nome: "",
      cognome: "",
      email: "",
      telefono: "",
      indirizzo: "",
      cap: "",
      citta: "",
      provincia: "",
      note: "",
      spedizione: "standard",
      pagamento: "contrassegno",
      carta: "",
      scadenza: "",
      cvc: "",
    },
    {}
  );
}
