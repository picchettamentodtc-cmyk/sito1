(function () {
  const KEY = "banco50-cart";

  function round2(value) {
    return Math.round(value * 100) / 100;
  }

  function read() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(data)) return [];
      return data
        .filter((row) => row && typeof row.id === "string")
        .map((row) => ({ id: row.id, qty: Math.floor(Number(row.qty)) }))
        .filter((row) => Number.isFinite(row.qty) && row.qty > 0);
    } catch (error) {
      return [];
    }
  }

  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("cart:change"));
  }

  function product(id) {
    return window.SHOP.products.find((item) => item.id === id) || null;
  }

  function detailed(items) {
    return items
      .map((row) => {
        const item = product(row.id);
        if (!item || item.stock <= 0) return null;
        const qty = Math.min(row.qty, item.stock);
        if (qty <= 0) return null;
        return Object.assign({}, item, { qty: qty, line: round2(item.price * qty) });
      })
      .filter(Boolean);
  }

  function lines() {
    const items = read();
    const next = detailed(items);
    const changed =
      next.length !== items.length ||
      next.some((line, index) => items[index].id !== line.id || items[index].qty !== line.qty);
    if (changed) {
      write(next.map((line) => ({ id: line.id, qty: line.qty })));
    }
    return next;
  }

  window.formatEuro = function formatEuro(value) {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  window.quote = function quote(subtotal, method, payment) {
    const shop = window.SHOP;
    let shipping = 0;
    if (subtotal > 0) {
      shipping = method === "express" ? shop.shipping.express : subtotal >= shop.freeShippingFrom ? 0 : shop.shipping.standard;
    }
    const cod = payment === "contrassegno" && subtotal > 0 ? shop.codFee : 0;
    return {
      subtotal: round2(subtotal),
      shipping: round2(shipping),
      cod: round2(cod),
      total: round2(subtotal + shipping + cod),
    };
  };

  window.Cart = {
    lines: lines,
    count: function count() {
      return lines().reduce((sum, line) => sum + line.qty, 0);
    },
    subtotal: function subtotal() {
      return round2(lines().reduce((sum, line) => sum + line.line, 0));
    },
    add: function add(id, qty) {
      const item = product(id);
      const amount = Math.max(1, Math.floor(Number(qty) || 1));
      if (!item) return { ok: false, message: "Prodotto non trovato." };
      if (item.stock <= 0) return { ok: false, message: "Questo pezzo è esaurito." };
      const items = read();
      const row = items.find((entry) => entry.id === id);
      const nextQty = (row ? row.qty : 0) + amount;
      if (nextQty > item.stock) {
        return { ok: false, message: "Disponibili solo " + item.stock + " pezzi." };
      }
      if (row) row.qty = nextQty;
      else items.push({ id: id, qty: amount });
      write(items);
      return { ok: true, message: item.name + " aggiunto al carrello." };
    },
    setQty: function setQty(id, qty) {
      const item = product(id);
      if (!item) return;
      const items = read().filter((entry) => entry.id !== id);
      const nextQty = Math.floor(Number(qty) || 0);
      if (nextQty > 0 && item.stock > 0) {
        items.push({ id: id, qty: Math.min(nextQty, item.stock) });
      }
      write(items);
    },
    remove: function remove(id) {
      write(read().filter((entry) => entry.id !== id));
    },
    clear: function clear() {
      write([]);
    },
  };
})();
