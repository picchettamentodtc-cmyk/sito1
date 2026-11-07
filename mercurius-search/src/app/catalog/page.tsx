import { Suspense } from "react";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import styles from "@/components/CartView.module.css";

export const metadata = {
  title: "Catalog",
  description: "Browse clothes, perfumes, apparel, and streetwear.",
};

export default function CatalogPage() {
  return (
    <main className="page">
      <div className="wrap">
        <header className={styles.intro}>
          <p className="eyebrow">Catalog</p>
          <h1>Everything in the search.</h1>
          <p className="lede">
            Filter by Clothes, Perfumes, Apparel, or Streetwear, or search by name.
          </p>
        </header>
        <Suspense fallback={<p className="lede">Loading catalog…</p>}>
          <CatalogBrowser />
        </Suspense>
      </div>
    </main>
  );
}
