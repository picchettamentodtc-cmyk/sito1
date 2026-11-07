"use client";

import { useCart } from "@/lib/cart-context";
import { formatEur, type Product } from "@/lib/products";
import { ProductSwatch } from "@/components/ProductSwatch";
import styles from "./ProductCard.module.css";

export function ProductCard({ product }: { product: Product }) {
  const { add, quantityOf, ready } = useCart();
  const quantity = ready ? quantityOf(product.id) : 0;

  return (
    <article className={styles.card}>
      <ProductSwatch product={product} className={styles.media} />
      <div className={styles.body}>
        <p className={styles.category}>{product.category}</p>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <p className={styles.price}>{formatEur(product.price)}</p>
          <button type="button" className="btn btnPrimary" onClick={() => add(product.id)}>
            Add to cart
          </button>
        </div>
        <p className={styles.note} aria-live="polite">
          {quantity > 0 ? `${quantity} in cart` : ""}
        </p>
      </div>
    </article>
  );
}
