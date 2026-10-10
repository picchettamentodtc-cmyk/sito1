(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = [
      "Nome: " + data.get("nome"),
      "Email: " + data.get("email"),
      "Modello: " + (data.get("modello") || "non indicato"),
      "",
      String(data.get("messaggio")),
    ].join("\n");
    window.location.href =
      "mailto:smlbresciani@gmail.com?subject=" +
      encodeURIComponent("Richiesta Banco 50") +
      "&body=" +
      encodeURIComponent(body);
  });
})();
