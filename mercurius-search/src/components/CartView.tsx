"use client";

import Link from "next/link";
import { ProductSwatch } from "@/components/ProductSwatch";
import { useCart } from "@/lib/cart-context";
import { formatEur } from "@/lib/products";
import styles from "./CartView.module.css";

export function CartView() {
  const { ready, lines, total, setQuantity, remove } = useCart();

  return (
    <div>
      <header className={styles.intro}>
        <p className="eyebrow">Cart</p>
        <h1>Your selection</h1>
        <p className="lede">Change a quantity or remove a piece. The total updates here.</p>
      </header>
      {!ready ? (
        <p className="lede" style={{ marginTop: 28 }}>
          Loading cart…
        </p>
      ) : lines.length === 0 ? (
        <div className="empty" style={{ marginTop: 28 }}>
          <h2>Your cart is empty</h2>
          <p>Browse the catalog and add clothes, perfume, apparel, or streetwear.</p>
          <Link href="/catalog" className="btn btnPrimary">
            Browse the catalog
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <ul className={styles.list}>
            {lines.map((line) => (
              <li key={line.product.id} className={styles.line}>
                <ProductSwatch product={line.product} className={styles.thumb} />
                <div>
                  <p className={styles.category}>{line.product.category}</p>
                  <h2 className={styles.name}>{line.product.name}</h2>
                  <p className={styles.unit}>{formatEur(line.product.price)} each</p>
                  <div className={styles.controls}>
                    <div className={styles.stepper}>
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${line.product.name}`}
                        onClick={() => setQuantity(line.product.id, line.quantity - 1)}
                        disabled={line.quantity <= 1}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={99}
                        inputMode="numeric"
                        aria-label={`Quantity of ${line.product.name}`}
                        value={line.quantity}
                        onChange={(event) => {
                          const next = Number.parseInt(event.target.value, 10);
                          if (!Number.isInteger(next)) return;
                          setQuantity(line.product.id, next);
                        }}
                      />
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${line.product.name}`}
                        onClick={() => setQuantity(line.product.id, line.quantity + 1)}
                        disabled={line.quantity >= 99}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn btnGhost"
                      onClick={() => remove(line.product.id)}
                    >
                      Remove
                    </button>
                    <p className={styles.lineTotal}>{formatEur(line.lineTotal)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className={styles.summary} aria-label="Cart summary">
            <h2>Summary</h2>
            <p className={styles.row}>
              <span>Items</span>
              <span>{formatEur(total)}</span>
            </p>
            <p className={styles.row}>
              <span>Shipping</span>
              <span>{formatEur(0)}</span>
            </p>
            <p className={styles.total}>
              <span>Total</span>
              <span>{formatEur(total)}</span>
            </p>
            <Link href="/checkout" className="btn btnPrimary">
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
