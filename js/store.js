import { getProduct } from "./products.js";

export const FREE_SHIPPING_FROM = 180;
export const STANDARD_SHIPPING = 8;
export const EXPRESS_SHIPPING = 18;
const KEY = "mercury-search-cart";
const MAX_QTY = 5;

function read() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart:change"));
}

export function getCart() {
  return read();
}

export function cartCount() {
  return read().reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
}

export function addToCart({ id, size, color, qty = 1 }) {
  const items = read();
  const amount = Math.max(1, Math.min(MAX_QTY, Number(qty) || 1));
  const existing = items.find((item) => item.id === id && item.size === size && item.color === color);
  let capped = false;
  if (existing) {
    const next = existing.qty + amount;
    capped = next > MAX_QTY;
    existing.qty = Math.min(MAX_QTY, next);
  } else {
    items.push({ id, size, color, qty: amount });
  }
  write(items);
  return { capped };
}

export function setQty(id, size, color, qty) {
  const next = Math.floor(Number(qty));
  if (!Number.isFinite(next) || next <= 0) {
    removeLine(id, size, color);
    return;
  }
  const items = read().map((item) =>
    item.id === id && item.size === size && item.color === color ? { ...item, qty: Math.min(MAX_QTY, next) } : item
  );
  write(items);
}

export function removeLine(id, size, color) {
  write(read().filter((item) => !(item.id === id && item.size === size && item.color === color)));
}

export function clearCart() {
  write([]);
}

export function cartLines() {
  return getCart()
    .map((line) => {
      const product = getProduct(line.id);
      if (!product) return null;
      const color = product.colors.find((item) => item.id === line.color) || product.colors[0];
      return { ...line, product, color, lineTotal: product.price * line.qty };
    })
    .filter(Boolean);
}

export function shippingCost(subtotal, method = "standard") {
  if (subtotal <= 0) return 0;
  if (method === "express") return EXPRESS_SHIPPING;
  return subtotal >= FREE_SHIPPING_FROM ? 0 : STANDARD_SHIPPING;
}

export function cartTotals(method = "standard") {
  const lines = cartLines();
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const shipping = shippingCost(subtotal, method);
  return {
    lines,
    subtotal,
    shipping,
    total: subtotal + shipping,
    count: lines.reduce((sum, line) => sum + line.qty, 0),
  };
}
