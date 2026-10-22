export const FREE_SHIPPING_FROM = 180;

const nero = { id: "nero", name: "Nero", hex: "#161616" };
const osso = { id: "osso", name: "Osso", hex: "#e6e0d4" };
const argento = { id: "argento", name: "Argento", hex: "#b7bcc4" };
const sabbia = { id: "sabbia", name: "Sabbia", hex: "#cbbba4" };
const avorio = { id: "avorio", name: "Avorio", hex: "#f4efe6" };
const bianco = { id: "bianco", name: "Bianco", hex: "#f5f5f5" };
const cammello = { id: "cammello", name: "Cammello", hex: "#c4a574" };
const denim = { id: "denim", name: "Denim", hex: "#6d88a8" };
const giallo = { id: "giallo", name: "Giallo", hex: "#e2b100" };

export const categoryOrder = [
  "Cappotti",
  "Giacche",
  "Felpe",
  "Maglie",
  "Camicie",
  "T-shirt",
  "Pantaloni",
  "Gonne",
  "Abiti",
  "Vestiti da sposa",
  "Profumi",
];

export const products = [
  {
    id: "cappotto-ombra",
    name: "Cappotto Ombra",
    price: 680,
    category: "Cappotti",
    colors: [nero],
    sizes: ["S", "M", "L", "XL"],
    image: "assets/products/cappotto-ombra.jpg",
    featured: true,
    tag: "Novità",
    description:
      "Cappotto in lana vergine, spalla caduta e lunghezza al ginocchio. Due bottoni, volume largo, peso da città.",
    details: ["100% lana vergine", "Fodera in cupro", "Due bottoni", "Vestibilità ampia"],
  },
  {
    id: "felpa-mass",
    name: "Felpa Bianca",
    price: 180,
    category: "Felpe",
    colors: [bianco],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "assets/products/felpa-mass.jpg",
    featured: true,
    tag: "Essenziale",
    description: "Felpa da uomo senza marchio. Cappuccio, tascone e fondo a costine, in bianco pieno.",
    details: ["Senza logo", "Cappuccio", "Tascone", "Costine"],
  },
  {
    id: "camicia-lamina",
    name: "Camicia Lamina",
    price: 230,
    category: "Camicie",
    colors: [argento],
    sizes: ["XS", "S", "M"],
    image: "assets/products/camicia-lamina.jpg",
    featured: false,
    tag: "",
    description: "Camicia in seta opaca color argento. Colletto aperto, bottoni tono su tono, manica morbida.",
    details: ["Seta opaca", "Bottoni coperti dal tono", "Vestibilità rilassata", "Lavare a secco"],
  },
  {
    id: "pantalone-asse",
    name: "Pantalone Nero",
    price: 220,
    category: "Pantaloni",
    colors: [nero],
    sizes: ["S", "M", "L", "XL"],
    image: "assets/products/pantalone-asse.jpg",
    featured: false,
    tag: "",
    description: "Pantalone da uomo senza marchio, nero, gamba dritta e vita regolare.",
    details: ["Senza logo", "Gamba dritta", "Nero pieno", "Vita regolare"],
  },
  {
    id: "blazer-quadro",
    name: "Giacca Nera",
    price: 540,
    category: "Giacche",
    colors: [nero],
    sizes: ["XS", "S", "M", "L"],
    image: "assets/products/blazer-quadro.jpg",
    featured: true,
    tag: "Icona",
    description: "Giacca da uomo senza marchio, nera, spalla strutturata e un bottone.",
    details: ["Senza logo", "Nero pieno", "Un bottone", "Rever classico"],
  },
  {
    id: "tee-modulo",
    name: "T-shirt Modulo",
    price: 85,
    category: "T-shirt",
    colors: [osso],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "assets/products/tee-modulo.jpg",
    featured: false,
    tag: "",
    description: "T-shirt boxy in jersey compatto color osso. Manica scesa, collo basso, orlo dritto.",
    details: ["Jersey compatto", "Manica scesa", "Orlo dritto", "Collo a costina"],
  },
  {
    id: "bomber-velo",
    name: "Giacca Cammello",
    price: 380,
    category: "Giacche",
    colors: [cammello],
    sizes: ["M", "L", "XL"],
    image: "assets/products/bomber-velo.jpg",
    featured: false,
    tag: "",
    description: "Giacca da uomo senza marchio, color cammello, rever largo e lunghezza sotto il fianco.",
    details: ["Senza logo", "Color cammello", "Rever largo", "Vestibilità morbida"],
  },
  {
    id: "giacca-vento",
    name: "Giacca Vento",
    price: 320,
    category: "Giacche",
    colors: [nero],
    sizes: ["S", "M", "L", "XL"],
    image: "assets/products/giacca-vento.jpg",
    featured: false,
    tag: "Street",
    description: "Giacca a vento da strada, senza marchio. Nylon nero, interno giallo, cappuccio e banda chiara sulla manica.",
    details: ["Senza logo", "Nylon", "Cappuccio", "Interno a contrasto"],
  },
  {
    id: "giacca-denim",
    name: "Giacca Denim",
    price: 260,
    category: "Giacche",
    colors: [denim],
    sizes: ["S", "M", "L", "XL"],
    image: "assets/products/giacca-denim.jpg",
    featured: false,
    tag: "Street",
    description: "Camicia-giacca in denim, senza marchio. Tasche sul petto, manica rimboccata, da portare aperta.",
    details: ["Senza logo", "Denim", "Tasche petto", "Manica rimboccata"],
  },
  {
    id: "giacca-trapunta",
    name: "Giacca Trapunta",
    price: 290,
    category: "Giacche",
    colors: [nero],
    sizes: ["S", "M", "L", "XL"],
    image: "assets/products/giacca-trapunta.jpg",
    featured: true,
    tag: "Street",
    description: "Bomber trapuntato nero, senza marchio. Zip a vista, volume corto, da mettere sulla felpa.",
    details: ["Senza logo", "Trapuntata", "Zip a vista", "Volume corto"],
  },
  {
    id: "felpa-gialla",
    name: "Felpa Gialla",
    price: 160,
    category: "Felpe",
    colors: [giallo],
    sizes: ["XS", "S", "M", "L"],
    image: "assets/products/felpa-gialla.jpg",
    featured: false,
    tag: "Street",
    description: "Felpa cropped gialla, senza marchio. Cappuccio, coulisse e fondo a costine. Il giallo è pieno.",
    details: ["Senza logo", "Cappuccio", "Cropped", "Coulisse"],
  },
  {
    id: "tee-ossa",
    name: "T-shirt Ossa",
    price: 75,
    category: "T-shirt",
    colors: [nero],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "assets/products/tee-ossa.jpg",
    featured: false,
    tag: "Street",
    description: "T-shirt nera da strada, senza marchio. Stampa chiara sul petto, taglio corto, spalla scesa.",
    details: ["Senza logo", "Stampa sul petto", "Taglio corto", "Jersey nero"],
  },
  {
    id: "dolcevita-nord",
    name: "Dolcevita Nord",
    price: 190,
    category: "Maglie",
    colors: [argento],
    sizes: ["XS", "S", "M", "L"],
    image: "assets/products/dolcevita-nord.jpg",
    featured: false,
    tag: "",
    description: "Dolcevita in merino extrafine color argento. Collo alto, spalla rilassata, costine corte.",
    details: ["Merino extrafine", "Collo alto", "Costine", "Lavare a mano"],
  },
  {
    id: "gonna-stecca",
    name: "Gonna Stecca",
    price: 260,
    category: "Gonne",
    colors: [sabbia],
    sizes: ["XS", "S", "M"],
    image: "assets/products/gonna-stecca.jpg",
    featured: false,
    tag: "",
    description: "Gonna midi color sabbia, vita alta e plissé fitto. Si muove come una maglia, resta in piega.",
    details: ["Maglia plissettata", "Vita alta", "Lunghezza midi", "Elastico interno"],
  },
  {
    id: "abito-colonna",
    name: "Abito Colonna",
    price: 490,
    category: "Abiti",
    colors: [nero],
    sizes: ["XS", "S", "M", "L"],
    image: "assets/products/abito-colonna.jpg",
    featured: true,
    tag: "Novità",
    description: "Abito colonna in crepe nero. Spalline sottili, scollo morbido, lunghezza alla caviglia.",
    details: ["Crepe fluido", "Spalline sottili", "Fodera leggera", "Lunghezza caviglia"],
  },
  {
    id: "estratto-ombra",
    name: "Estratto Ombra",
    price: 148,
    category: "Profumi",
    colors: [nero],
    sizes: ["30 ml", "50 ml", "100 ml"],
    image: "assets/products/estratto-ombra.svg",
    featured: false,
    tag: "Novità",
    description: "Profumo estratto. Legno bruciato, pepe e iris. Il nero della casa, in flacone.",
    details: ["Famiglia: legnosa", "Testa: pepe", "Cuore: iris", "Fondo: cedro e fumo"],
  },
  {
    id: "vapore-osso",
    name: "Vapore Osso",
    price: 118,
    category: "Profumi",
    colors: [osso],
    sizes: ["30 ml", "50 ml"],
    image: "assets/products/vapore-osso.svg",
    featured: false,
    tag: "",
    description: "Profumo leggero. Muschio bianco, tè e pelle pulita. Resta vicino alla pelle.",
    details: ["Famiglia: muschiata", "Testa: tè", "Cuore: muschio", "Fondo: pelle"],
  },
  {
    id: "freddo-argento",
    name: "Freddo Argento",
    price: 162,
    category: "Profumi",
    colors: [argento],
    sizes: ["50 ml", "100 ml"],
    image: "assets/products/freddo-argento.svg",
    featured: false,
    tag: "",
    description: "Profumo metallico e freddo. Aldeidi, violetta e ambra grigia. Una catena, non un fiore.",
    details: ["Famiglia: aldeidata", "Testa: aldeidi", "Cuore: violetta", "Fondo: ambra grigia"],
  },
  {
    id: "abito-velato",
    name: "Abito Velato",
    price: 2800,
    category: "Vestiti da sposa",
    colors: [avorio],
    sizes: ["S", "M", "L"],
    image: "assets/products/abito-velato.svg",
    featured: false,
    tag: "Sposa",
    description: "Abito da sposa in crepe avorio con velo staccabile. Linea a colonna, spalline sottili, niente ricamo.",
    details: ["Crepe avorio", "Velo staccabile", "Chiusura nascosta", "Non modificabile dopo la prova"],
  },
  {
    id: "abito-linea",
    name: "Abito Linea",
    price: 2400,
    category: "Vestiti da sposa",
    colors: [avorio],
    sizes: ["XS", "S", "M", "L"],
    image: "assets/products/abito-linea.svg",
    featured: false,
    tag: "",
    description: "Abito da sposa minimale, scollo a barca e gonna dritta. Avorio caldo, nessun strascico.",
    details: ["Mikado leggero", "Scollo a barca", "Senza strascico", "Fodera in seta"],
  },
  {
    id: "abito-architettura",
    name: "Abito Architettura",
    price: 3400,
    category: "Vestiti da sposa",
    colors: [avorio],
    sizes: ["S", "M", "L", "XL"],
    image: "assets/products/abito-architettura.svg",
    featured: false,
    tag: "",
    description: "Abito da sposa con gonna ampia e corpetto strutturato. Il volume è architettonico, il colore resta avorio.",
    details: ["Corpetto strutturato", "Gonna ampia", "Bottoni coperti", "Prova in atelier su appuntamento"],
  },
];

export function getProduct(id) {
  return products.find((product) => product.id === id) || null;
}

export function formatPrice(value) {
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(value);
}

export function priceBounds() {
  const prices = products.map((product) => product.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function categories() {
  return categoryOrder.filter((category) => products.some((product) => product.category === category));
}

export function apparelSizes() {
  const order = ["XS", "S", "M", "L", "XL"];
  const present = new Set(
    products.filter((product) => product.category !== "Profumi").flatMap((product) => product.sizes)
  );
  return order.filter((size) => present.has(size));
}

export function fragranceFormats() {
  const order = ["30 ml", "50 ml", "100 ml"];
  const present = new Set(
    products.filter((product) => product.category === "Profumi").flatMap((product) => product.sizes)
  );
  return order.filter((size) => present.has(size));
}

export function colorOptions() {
  const list = [];
  products.forEach((product) => {
    product.colors.forEach((color) => {
      if (!list.some((item) => item.id === color.id)) list.push(color);
    });
  });
  return list;
}

export function variantLabel(product) {
  return product.category === "Profumi" ? "Formato" : "Taglia";
}

export function filterProducts(state) {
  const bounds = priceBounds();
  const min = Number.isFinite(state.min) ? state.min : bounds.min;
  const max = Number.isFinite(state.max) ? state.max : bounds.max;
  const query = (state.q || "").trim().toLowerCase();
  const list = products.filter((product) => {
    if (state.cats?.length && !state.cats.includes(product.category)) return false;
    if (state.colors?.length && !product.colors.some((color) => state.colors.includes(color.id))) return false;
    if (product.price < min || product.price > max) return false;
    const sizeOn = Boolean(state.sizes?.length);
    const formatOn = Boolean(state.formats?.length);
    const sizeOk = product.sizes.some((size) => state.sizes?.includes(size));
    const formatOk = product.sizes.some((size) => state.formats?.includes(size));
    if (sizeOn && formatOn) {
      if (!sizeOk && !formatOk) return false;
    } else if (sizeOn && !sizeOk) return false;
    else if (formatOn && !formatOk) return false;
    if (query) {
      const haystack = [
        product.name,
        product.category,
        product.description,
        ...product.details,
        ...product.colors.map((color) => color.name),
        ...product.sizes,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
  const sorted = [...list];
  if (state.sort === "prezzo-asc") sorted.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name, "it"));
  else if (state.sort === "prezzo-desc") sorted.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name, "it"));
  else if (state.sort === "nome") sorted.sort((a, b) => a.name.localeCompare(b.name, "it"));
  return sorted;
}
