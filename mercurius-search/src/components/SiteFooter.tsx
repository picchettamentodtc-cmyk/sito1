import Link from "next/link";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div>
          <p className={styles.brand}>Mercurius Search</p>
          <p>Demonstration checkout. No payment is taken.</p>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/catalog">Catalog</Link>
          <Link href="/cart">Cart</Link>
        </nav>
      </div>
    </footer>
  );
}
