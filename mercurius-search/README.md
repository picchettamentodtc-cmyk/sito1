# Mercurius Search

Demonstration shop for clothes, perfumes, apparel, and streetwear. The catalog is in-app data. The cart is stored in the browser. Checkout collects shipping details and shows a fake order number. No payment, account, or database.

The existing site at the repository root is unchanged. This app lives in `mercurius-search/`.

## Run

```bash
cd mercurius-search
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` — home, search, and category entry points
- `/catalog` — browse, text search (`?q=`), and category filter (`?category=Clothes`, `Perfumes`, `Apparel`, or `Streetwear`)
- `/cart` — quantities, line totals, and cart total
- `/checkout` — shipping details and order summary
- `/checkout/confirmation` — fake order number
