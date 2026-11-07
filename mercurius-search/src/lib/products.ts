export const CATEGORIES = [
  "Clothes",
  "Perfumes",
  "Apparel",
  "Streetwear",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  from: string;
  to: string;
};

export const products: Product[] = [
  {
    id: "mercury-wool-overcoat",
    name: "Mercury Wool Overcoat",
    price: 289,
    description: "Double-breasted charcoal wool with a quiet silver lining.",
    category: "Clothes",
    from: "#2c2824",
    to: "#7a6a58",
  },
  {
    id: "ivory-silk-shirt",
    name: "Ivory Silk Shirt",
    price: 129,
    description: "Fluid silk shirt cut with a sharp collar and covered placket.",
    category: "Clothes",
    from: "#f6f1e6",
    to: "#c9b28a",
  },
  {
    id: "tailored-black-trousers",
    name: "Tailored Black Trousers",
    price: 159,
    description: "Creased wool trousers with a clean ankle and side adjusters.",
    category: "Clothes",
    from: "#141414",
    to: "#4a4a4a",
  },
  {
    id: "cinnabar-evening-dress",
    name: "Cinnabar Evening Dress",
    price: 240,
    description: "Column dress in a deep vermilion silk that catches the light.",
    category: "Clothes",
    from: "#8c2f24",
    to: "#e7b2a6",
  },
  {
    id: "nocturne-eau-de-parfum",
    name: "Nocturne Eau de Parfum",
    price: 98,
    description: "Night jasmine, amber, and a cool metallic edge. 50 ml.",
    category: "Perfumes",
    from: "#1b2430",
    to: "#6d5b8a",
  },
  {
    id: "citrus-archive",
    name: "Citrus Archive",
    price: 72,
    description: "Bitter orange, petitgrain, and white musk. 50 ml.",
    category: "Perfumes",
    from: "#f0c85a",
    to: "#e07a32",
  },
  {
    id: "vetiver-room",
    name: "Vetiver Room",
    price: 84,
    description: "Smoked vetiver, cedar, and a dry iris note. 50 ml.",
    category: "Perfumes",
    from: "#3c4a36",
    to: "#a3b18a",
  },
  {
    id: "silver-letter",
    name: "Silver Letter",
    price: 110,
    description: "Aldehydes, pear skin, and soft suede. 30 ml.",
    category: "Perfumes",
    from: "#d5dbe3",
    to: "#7f8b9a",
  },
  {
    id: "merino-crew-knit",
    name: "Merino Crew Knit",
    price: 119,
    description: "Fine merino in warm ivory, light enough to layer all year.",
    category: "Apparel",
    from: "#f3eadc",
    to: "#c4b49a",
  },
  {
    id: "cotton-poplin-dress",
    name: "Cotton Poplin Dress",
    price: 149,
    description: "Shirt dress with a belted waist, patch pockets, and pearl buttons.",
    category: "Apparel",
    from: "#f7f4ef",
    to: "#9aada8",
  },
  {
    id: "linen-summer-set",
    name: "Linen Summer Set",
    price: 179,
    description: "Relaxed shirt and trouser in stone-washed linen.",
    category: "Apparel",
    from: "#ead9c4",
    to: "#8d7b64",
  },
  {
    id: "ribbed-tank",
    name: "Ribbed Tank",
    price: 48,
    description: "Close-cut cotton rib in ink black, finished with a bound neck.",
    category: "Apparel",
    from: "#111111",
    to: "#5c5c5c",
  },
  {
    id: "search-logo-hoodie",
    name: "Search Logo Hoodie",
    price: 95,
    description: "Heavyweight fleece hoodie with a small chest mark.",
    category: "Streetwear",
    from: "#243028",
    to: "#7d8f78",
  },
  {
    id: "cargo-track-pants",
    name: "Cargo Track Pants",
    price: 110,
    description: "Tapered nylon cargos with hidden zip pockets.",
    category: "Streetwear",
    from: "#2c3338",
    to: "#8aa0a8",
  },
  {
    id: "distressed-cap",
    name: "Distressed Cap",
    price: 42,
    description: "Washed cotton cap with a curved brim and an unmarked crown.",
    category: "Streetwear",
    from: "#c9b59a",
    to: "#6b5344",
  },
  {
    id: "mercury-runner",
    name: "Mercury Runner",
    price: 135,
    description: "Low-profile sneaker in chalk leather with a cinnabar heel tab.",
    category: "Streetwear",
    from: "#f2efe9",
    to: "#b8432f",
  },
];

export function isCategory(value: string | null | undefined): value is Category {
  return CATEGORIES.some((category) => category === value);
}

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function formatEur(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
