import type { Product } from "@/lib/products";
import styles from "./ProductSwatch.module.css";

export function ProductSwatch({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const initials = product.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("");

  return (
    <div
      className={[styles.swatch, className].filter(Boolean).join(" ")}
      style={{ background: `linear-gradient(155deg, ${product.from}, ${product.to})` }}
      aria-hidden="true"
    >
      <span className={styles.initials}>{initials}</span>
    </div>
  );
}
