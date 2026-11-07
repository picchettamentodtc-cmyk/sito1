"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import {
  getOrderServerSnapshot,
  getOrderSnapshot,
  subscribeOrder,
} from "@/lib/order";
import { formatEur } from "@/lib/products";
import styles from "./CheckoutForm.module.css";

export function OrderConfirmation() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("order");
  const { ready, order } = useSyncExternalStore(
    subscribeOrder,
    getOrderSnapshot,
    getOrderServerSnapshot,
  );

  if (!ready) {
    return <p className="lede">Loading confirmation…</p>;
  }

  if (!order || (requested && order.orderNumber !== requested)) {
    return (
      <div>
        <header className={styles.intro}>
          <p className="eyebrow">Confirmation</p>
          <h1>No order to show</h1>
        </header>
        <div className="empty" style={{ marginTop: 28 }}>
          <h2>This session has no matching order</h2>
          <p>
            {requested
              ? `Order ${requested} is not stored in this browser session.`
              : "Place an order from your cart to receive a confirmation number."}
          </p>
          <Link href="/catalog" className="btn btnPrimary">
            Browse the catalog
          </Link>
        </div>
      </div>
    );
  }

  const placed = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(order.placedAt));

  return (
    <div>
      <header className={styles.intro}>
        <p className="eyebrow">Confirmation</p>
        <h1>Order {order.orderNumber}</h1>
        <p className="lede">
          Thank you, {order.shipping.name}. This is a demonstration order placed {placed}. Nothing
          was charged.
        </p>
      </header>
      <div className={styles.layout}>
        <section className={styles.panel} aria-label="Shipping details">
          <h2>Shipping to</h2>
          <p>{order.shipping.name}</p>
          <p>{order.shipping.email}</p>
          <p>{order.shipping.address}</p>
          <p>
            {order.shipping.postalCode} {order.shipping.city}
          </p>
          <p>{order.shipping.country}</p>
        </section>
        <aside className={styles.summary} aria-label="Order summary">
          <h2>Order summary</h2>
          <ul className={styles.items}>
            {order.items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatEur(item.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <p className={styles.total}>
            <span>Total</span>
            <span>{formatEur(order.total)}</span>
          </p>
          <Link href="/catalog" className="btn btnPrimary">
            Back to catalog
          </Link>
        </aside>
      </div>
    </div>
  );
}
