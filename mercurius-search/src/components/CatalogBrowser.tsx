"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, isCategory, products, type Category } from "@/lib/products";
import styles from "./CatalogBrowser.module.css";

export function CatalogBrowser() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlQuery = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category");
  const category = isCategory(categoryParam) ? categoryParam : null;
  const [query, setQuery] = useState(urlQuery);

  useEffect(() => {
    function syncFromHistory() {
      const next = new URLSearchParams(window.location.search).get("q") ?? "";
      setQuery(next);
    }
    window.addEventListener("popstate", syncFromHistory);
    return () => window.removeEventListener("popstate", syncFromHistory);
  }, []);

  function writeUrl(nextQuery: string, nextCategory: Category | null) {
    const currentQuery = searchParams.get("q") ?? "";
    const currentCategory = isCategory(searchParams.get("category"))
      ? searchParams.get("category")
      : null;
    if (nextQuery === currentQuery && nextCategory === currentCategory) return;
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    if (nextCategory) params.set("category", nextCategory);
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      if (category && product.category !== category) return false;
      if (!needle) return true;
      const haystack = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [category, query]);

  const summary = [
    `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`,
    category ? `in ${category}` : null,
    query.trim() ? `for “${query.trim()}”` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <div className={styles.toolbar}>
        <form
          className={styles.search}
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            writeUrl(query, category);
          }}
        >
          <label className="eyebrow" htmlFor="catalog-search">
            Search
          </label>
          <input
            id="catalog-search"
            type="search"
            value={query}
            placeholder="Overcoat, vetiver, hoodie…"
            onChange={(event) => {
              const next = event.target.value;
              setQuery(next);
              writeUrl(next, category);
            }}
          />
          <button type="submit" className="btn btnPrimary">
            Search
          </button>
        </form>
        <div className={styles.filters} role="group" aria-label="Category">
          <button
            type="button"
            aria-pressed={category === null}
            onClick={() => writeUrl(query, null)}
          >
            All
          </button>
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => writeUrl(query, item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className={styles.count} aria-live="polite">
        {summary}
      </p>
      {filtered.length === 0 ? (
        <div className="empty">
          <h2>No products found</h2>
          <p>
            {query.trim()
              ? `Nothing matches “${query.trim()}”${category ? ` in ${category}` : ""}.`
              : "Nothing in this category yet."}
          </p>
          <button
            type="button"
            className="btn btnGhost"
            onClick={() => {
              setQuery("");
              writeUrl("", null);
            }}
          >
            Clear search
          </button>
        </div>
      ) : (
        <ul className={styles.grid}>
          {filtered.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
