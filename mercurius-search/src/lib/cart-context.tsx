"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getProduct, type Product } from "@/lib/products";

const STORAGE_KEY = "mercurius-search-cart";

type CartLine = {
  productId: string;
  quantity: number;
};

type CartSnapshot = {
  ready: boolean;
  lines: CartLine[];
};

export type DetailedLine = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

const serverSnapshot: CartSnapshot = { ready: false, lines: [] };
let snapshot: CartSnapshot = serverSnapshot;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  if (typeof window !== "undefined" && !snapshot.ready) {
    snapshot = { ready: true, lines: readCart() };
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return serverSnapshot;
}

function ensureReady() {
  if (typeof window === "undefined" || snapshot.ready) return;
  snapshot = { ready: true, lines: readCart() };
}

function commit(lines: CartLine[]) {
  ensureReady();
  snapshot = { ready: true, lines };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  emit();
}

function add(productId: string) {
  ensureReady();
  if (!getProduct(productId)) return;
  const existing = snapshot.lines.find((line) => line.productId === productId);
  const lines = existing
    ? snapshot.lines.map((line) =>
        line.productId === productId
          ? { ...line, quantity: Math.min(99, line.quantity + 1) }
          : line,
      )
    : [...snapshot.lines, { productId, quantity: 1 }];
  commit(lines);
}

function setQuantity(productId: string, quantity: number) {
  ensureReady();
  if (!getProduct(productId)) return;
  const next = Math.floor(quantity);
  if (!Number.isInteger(next) || next < 1) return;
  const capped = Math.min(99, next);
  const existing = snapshot.lines.find((line) => line.productId === productId);
  const lines = existing
    ? snapshot.lines.map((line) =>
        line.productId === productId ? { ...line, quantity: capped } : line,
      )
    : [...snapshot.lines, { productId, quantity: capped }];
  commit(lines);
}

function remove(productId: string) {
  ensureReady();
  commit(snapshot.lines.filter((line) => line.productId !== productId));
}

function clear() {
  commit([]);
}

export function useCart() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return useMemo(() => {
    const lines = current.lines.flatMap((line) => {
      const product = getProduct(line.productId);
      if (!product) return [];
      return [
        {
          product,
          quantity: line.quantity,
          lineTotal: product.price * line.quantity,
        },
      ];
    });
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);

    return {
      ready: current.ready,
      lines,
      count,
      total,
      add,
      setQuantity,
      remove,
      clear,
      quantityOf(productId: string) {
        return current.lines.find((line) => line.productId === productId)?.quantity ?? 0;
      },
    };
  }, [current]);
}

function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const record = item as { productId?: unknown; quantity?: unknown };
      if (typeof record.productId !== "string" || !getProduct(record.productId)) return [];
      if (
        typeof record.quantity !== "number" ||
        !Number.isInteger(record.quantity) ||
        record.quantity < 1
      ) {
        return [];
      }
      return [{ productId: record.productId, quantity: Math.min(99, record.quantity) }];
    });
  } catch {
    return [];
  }
}
