"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import {
  createOrderNumber,
  emptyShipping,
  saveOrder,
  validateShipping,
  type ShippingDetails,
  type ShippingErrors,
} from "@/lib/order";
import { formatEur } from "@/lib/products";
import styles from "./CheckoutForm.module.css";

const FIELDS: { key: keyof ShippingDetails; label: string; autoComplete: string; type?: string }[] =
  [
    { key: "name", label: "Full name", autoComplete: "name" },
    { key: "email", label: "Email", autoComplete: "email", type: "email" },
    { key: "address", label: "Address", autoComplete: "street-address" },
    { key: "city", label: "City", autoComplete: "address-level2" },
    { key: "postalCode", label: "Postal code", autoComplete: "postal-code" },
    { key: "country", label: "Country", autoComplete: "country-name" },
  ];

export function CheckoutForm() {
  const router = useRouter();
  const { ready, lines, total, clear } = useCart();
  const [values, setValues] = useState<ShippingDetails>(emptyShipping);
  const [errors, setErrors] = useState<ShippingErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update(key: keyof ShippingDetails, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function placeOrder() {
    const nextErrors = validateShipping(values);
    setErrors(nextErrors);
    setSubmitted(true);
    const firstInvalid = FIELDS.find((field) => nextErrors[field.key]);
    if (firstInvalid) {
      document.getElementById(firstInvalid.key)?.focus();
      return;
    }
    if (lines.length === 0) return;

    const shipping = {
      name: values.name.trim(),
      email: values.email.trim(),
      address: values.address.trim(),
      city: values.city.trim(),
      postalCode: values.postalCode.trim(),
      country: values.country.trim(),
    };
    const orderNumber = createOrderNumber();
    saveOrder({
      orderNumber,
      placedAt: new Date().toISOString(),
      items: lines.map((line) => ({
        id: line.product.id,
        name: line.product.name,
        quantity: line.quantity,
        lineTotal: line.lineTotal,
      })),
      total,
      shipping,
    });
    clear();
    router.push(`/checkout/confirmation?order=${encodeURIComponent(orderNumber)}`);
  }

  if (!ready) {
    return <p className="lede">Loading checkout…</p>;
  }

  if (lines.length === 0) {
    return (
      <div>
        <header className={styles.intro}>
          <p className="eyebrow">Checkout</p>
          <h1>Nothing to ship</h1>
        </header>
        <div className="empty" style={{ marginTop: 28 }}>
          <h2>Your cart is empty</h2>
          <p>Add something from the catalog before checkout.</p>
          <Link href="/catalog" className="btn btnPrimary">
            Browse the catalog
          </Link>
        </div>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <div>
      <header className={styles.intro}>
        <p className="eyebrow">Checkout</p>
        <h1>Shipping details</h1>
        <p className="lede">Review the order, then tell us where to send it. Nothing is charged.</p>
      </header>
      <div className={styles.layout}>
        <form
          className={styles.panel}
          id="checkout-form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            placeOrder();
          }}
        >
          <h2>Where it goes</h2>
          {submitted && errorCount > 0 ? (
            <p className={styles.alert} role="alert">
              Check the form. Every shipping field is required, and the email must be valid.
            </p>
          ) : null}
          <div className={styles.fields}>
            {FIELDS.map((field) => {
              const error = errors[field.key];
              const errorId = `${field.key}-error`;
              return (
                <div className={styles.field} key={field.key}>
                  <label htmlFor={field.key}>{field.label}</label>
                  <input
                    id={field.key}
                    name={field.key}
                    type={field.type ?? "text"}
                    autoComplete={field.autoComplete}
                    value={values[field.key]}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    onChange={(event) => update(field.key, event.target.value)}
                  />
                  {error ? (
                    <p className={styles.error} id={errorId}>
                      {error}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </form>
        <aside className={styles.summary} aria-label="Order summary">
          <h2>Order summary</h2>
          <ul className={styles.items}>
            {lines.map((line) => (
              <li key={line.product.id}>
                <span>
                  {line.product.name} × {line.quantity}
                </span>
                <span>{formatEur(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <p className={styles.row}>
            <span>Shipping</span>
            <span>{formatEur(0)}</span>
          </p>
          <p className={styles.total}>
            <span>Total</span>
            <span>{formatEur(total)}</span>
          </p>
          <button type="submit" form="checkout-form" className="btn btnPrimary">
            Place order
          </button>
          <p className={styles.note}>Demonstration only. No payment is taken.</p>
        </aside>
      </div>
    </div>
  );
}
