import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, products } from "@/lib/products";
import styles from "./page.module.css";

const tileStyles: Record<(typeof CATEGORIES)[number], { background: string; blurb: string }> = {
  Clothes: {
    background: "linear-gradient(160deg, #3a332c, #8a6a52)",
    blurb: "Tailoring and evening pieces",
  },
  Perfumes: {
    background: "linear-gradient(160deg, #5c2e4a, #c46b8a)",
    blurb: "Small bottles, long notes",
  },
  Apparel: {
    background: "linear-gradient(160deg, #1f3d38, #6d9a8a)",
    blurb: "Knits, dresses, and linen",
  },
  Streetwear: {
    background: "linear-gradient(160deg, #2a2420, #b8432f)",
    blurb: "Hoodies, cargos, runners",
  },
};

export default function Home() {
  const featured = CATEGORIES.map(
    (category) => products.find((product) => product.category === category)!,
  );

  return (
    <main className="page">
      <div className="wrap">
        <section className={styles.hero}>
          <div className={styles.copy}>
            <p className="eyebrow">Clothes · Perfumes · Apparel · Streetwear</p>
            <h1>Mercurius Search</h1>
            <p className="lede">
              A catalog for what you wear, and what you wear in the air. Search the pieces, keep a
              cart for this browser, and check out without a charge.
            </p>
            <form className={styles.search} action="/catalog" method="get" role="search">
              <label className={styles.visuallyHidden} htmlFor="home-search">
                Search the catalog
              </label>
              <input
                id="home-search"
                name="q"
                type="search"
                placeholder="Overcoat, vetiver, hoodie…"
              />
              <button type="submit" className="btn btnPrimary">
                Search
              </button>
            </form>
          </div>
          <div className={styles.tiles}>
            {CATEGORIES.map((category) => {
              const count = products.filter((product) => product.category === category).length;
              const tile = tileStyles[category];
              return (
                <Link
                  key={category}
                  href={`/catalog?category=${encodeURIComponent(category)}`}
                  className={styles.tile}
                  style={{ background: tile.background }}
                >
                  <strong>{category}</strong>
                  <span>
                    {tile.blurb}
                    <br />
                    {count} pieces
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
        <section className={styles.section} aria-labelledby="featured-heading">
          <div className={styles.sectionHead}>
            <h2 id="featured-heading">From each shelf</h2>
            <Link href="/catalog" className="btn btnGhost">
              Full catalog
            </Link>
          </div>
          <ul className={styles.grid}>
            {featured.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
