"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const catalogCurrent = pathname === "/catalog" ? "page" : undefined;
  const cartCurrent = pathname === "/cart" ? "page" : undefined;

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true">
            <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
              <circle cx="16" cy="12.5" r="4.2" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M11.2 17.2c.4 3.2 2.3 5.3 4.8 5.3s4.4-2.1 4.8-5.3"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path d="M9.5 12.5h13" stroke="#e07a68" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
          <span className={styles.wordmark}>Mercurius Search</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          <Link href="/catalog" aria-current={catalogCurrent}>
            Catalog
          </Link>
          <Link href="/cart" aria-current={cartCurrent}>
            Cart
            {ready && count > 0 ? <span className={styles.badge}>{count}</span> : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}
