export type ShippingDetails = {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type ShippingErrors = Partial<Record<keyof ShippingDetails, string>>;

export type StoredOrderItem = {
  id: string;
  name: string;
  quantity: number;
  lineTotal: number;
};

export type StoredOrder = {
  orderNumber: string;
  placedAt: string;
  items: StoredOrderItem[];
  total: number;
  shipping: ShippingDetails;
};

const ORDER_KEY = "mercurius-search-order";

type OrderSnapshot = {
  ready: boolean;
  order: StoredOrder | null;
};

const serverOrderSnapshot: OrderSnapshot = { ready: false, order: null };
let orderSnapshot: OrderSnapshot = serverOrderSnapshot;
const orderListeners = new Set<() => void>();

function emitOrder() {
  orderListeners.forEach((listener) => listener());
}

export function subscribeOrder(listener: () => void) {
  if (typeof window !== "undefined" && !orderSnapshot.ready) {
    orderSnapshot = { ready: true, order: loadOrder() };
  }
  orderListeners.add(listener);
  return () => {
    orderListeners.delete(listener);
  };
}

export function getOrderSnapshot() {
  return orderSnapshot;
}

export function getOrderServerSnapshot() {
  return serverOrderSnapshot;
}

const EMPTY_SHIPPING: ShippingDetails = {
  name: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

export function emptyShipping(): ShippingDetails {
  return { ...EMPTY_SHIPPING };
}

export function validateShipping(input: ShippingDetails): ShippingErrors {
  const errors: ShippingErrors = {};

  if (!input.name.trim()) {
    errors.name = "Enter your full name.";
  }

  const email = input.email.trim();
  if (!email) {
    errors.email = "Enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!input.address.trim()) {
    errors.address = "Enter a street address.";
  }

  if (!input.city.trim()) {
    errors.city = "Enter a city.";
  }

  if (!input.postalCode.trim()) {
    errors.postalCode = "Enter a postal code.";
  } else if (input.postalCode.trim().length < 3) {
    errors.postalCode = "Enter a valid postal code.";
  }

  if (!input.country.trim()) {
    errors.country = "Enter a country.";
  }

  return errors;
}

export function createOrderNumber(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint32Array(6);
  crypto.getRandomValues(bytes);
  let suffix = "";
  for (const byte of bytes) {
    suffix += alphabet[byte % alphabet.length];
  }
  return `MS-${suffix}`;
}

export function saveOrder(order: StoredOrder): void {
  sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
  orderSnapshot = { ready: true, order };
  emitOrder();
}

export function loadOrder(): StoredOrder | null {
  try {
    const raw = sessionStorage.getItem(ORDER_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isStoredOrder(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function isStoredOrder(value: unknown): value is StoredOrder {
  if (!value || typeof value !== "object") return false;
  const order = value as Partial<StoredOrder>;
  if (typeof order.orderNumber !== "string" || typeof order.placedAt !== "string") {
    return false;
  }
  if (typeof order.total !== "number" || !Array.isArray(order.items)) return false;
  if (!order.shipping || typeof order.shipping !== "object") return false;
  const shipping = order.shipping as Partial<ShippingDetails>;
  return (
    typeof shipping.name === "string" &&
    typeof shipping.email === "string" &&
    typeof shipping.address === "string" &&
    typeof shipping.city === "string" &&
    typeof shipping.postalCode === "string" &&
    typeof shipping.country === "string"
  );
}
