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
const miele = { id: "miele", name: "Miele", hex: "#8a6232" };
const gessato = { id: "gessato", name: "Gessato", hex: "#cfc8bc" };

export const categoryOrder = [
  "Cappotti",
  "Pellicce vere",
  "Valerio Moda",
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
      "Cappotto in lana vergine, spalla caduta e lunghezza al ginocchio. Due bottoni e volume largo: sta aperto sopra la felpa e tiene la piega in città.",
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
    description: "Felpa da uomo senza marchio, in cotone pesante e bianco pieno. Cappuccio, tascone e fondo a costine; il bianco si lava a freddo.",
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
    description: "Camicia in seta opaca color argento, colletto aperto e bottoni tono su tono. Si porta sulla maglia o chiusa, con la manica morbida. Solo lavaggio a secco.",
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
    description: "Pantalone da uomo senza marchio, nero, gamba dritta e vita regolare. Cade sulla scarpa senza pinces e senza una piega da cerimonia.",
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
    description: "Giacca da uomo senza marchio, nera, spalla strutturata e un bottone. Il rever chiude la linea: sta sulla maglia fine, non su una camicia da cerimonia.",
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
    description: "T-shirt boxy in jersey compatto color osso, manica scesa e collo basso. L'orlo è dritto e il collo non si sforma: sta sotto la giacca nera.",
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
    description: "Giacca da uomo senza marchio, color cammello, rever largo e lunghezza appena sotto il fianco. Scalda il nero del resto del guardaroba senza coprirlo.",
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
    description: "Giacca a vento da strada, senza marchio: nylon nero opaco, interno giallo, cappuccio e banda chiara sulla manica. Il cappuccio entra sotto il cappotto quando piove.",
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
    description: "Camicia-giacca in denim, senza marchio, con tasche sul petto e manica rimboccata. Il colore è già lavato una volta e resta fermo se la porti aperta.",
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
    description: "Bomber trapuntato nero, senza marchio, zip a vista e volume corto. Si mette sulla felpa e la lascia visibile sotto l'orlo.",
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
    description: "Felpa cropped gialla, senza marchio: cappuccio, coulisse e fondo a costine. Il giallo è pieno, non pastello, e la coulisse regola il volume.",
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
    description: "T-shirt nera da strada, senza marchio, con una stampa chiara e piccola sul petto. Taglio corto e spalla scesa, così non esce dal pantalone.",
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
    description: "Dolcevita in merino extrafine color argento, collo alto e spalla rilassata. Le costine sono corte e la lana non punge. Lavare a mano.",
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
    description: "Gonna midi color sabbia, vita alta e plissé fitto che torna in piega da solo. Si muove come una maglia e resta alla caviglia.",
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
    description: "Abito colonna in crepe nero, spalline sottili e scollo morbido. Cade alla caviglia senza incollarsi, con una fodera leggera.",
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
    description: "Profumo estratto della casa: pepe in apertura, iris al centro, cedro e fumo che restano. È il nero del guardaroba, in flacone. Il sigillo deve restare integro per un reso.",
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
    description: "Profumo leggero di tè, muschio bianco e pelle pulita. Resta vicino al collo e ai polsi, nei formati da borsetta.",
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
    description: "Profumo freddo di aldeidi, violetta e ambra grigia. Non è un fiore: è il metallo della casa, come una catena sull'abito nero.",
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
    description: "Abito da sposa in crepe avorio, linea a colonna e spalline sottili, senza ricamo. Il velo si stacca. Dopo orli o spille da prova il reso non è più possibile.",
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
    description: "Abito da sposa minimale in mikado leggero: scollo a barca, gonna dritta, nessun strascico. L'avorio è caldo, con fodera in seta.",
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
    description: "Abito da sposa con corpetto strutturato e gonna ampia. Il volume è architettonico, il colore resta avorio. La prova si prende in atelier, su appuntamento.",
    details: ["Corpetto strutturato", "Gonna ampia", "Bottoni coperti", "Prova in atelier su appuntamento"],
  },
  {
    id: "pelliccia-nera",
    name: "Pelliccia Nera",
    price: 1280,
    category: "Pellicce vere",
    colors: [nero],
    sizes: ["S", "M", "L"],
    image: "assets/products/pelliccia-nera.jpg",
    featured: true,
    tag: "Pelliccia",
    description: "Pelliccia vera della casa, lunga e nera, collo ampio e manica intera. Nessun marchio. Il pelo si tiene appeso, non piegato.",
    details: ["Pelliccia vera", "Senza logo", "Lunghezza sotto il ginocchio", "Fodera nera"],
  },
  {
    id: "pelliccia-miele",
    name: "Pelliccia Miele",
    price: 1420,
    category: "Pellicce vere",
    colors: [miele],
    sizes: ["S", "M", "L"],
    image: "assets/products/pelliccia-miele.jpg",
    featured: true,
    tag: "Pelliccia",
    description: "Pelliccia vera color miele, al ginocchio, con cintura dello stesso pelo. Nessun marchio. Il miele sta sul nero senza diventare un costume.",
    details: ["Pelliccia vera", "Senza logo", "Cintura in pelo", "Colore miele"],
  },
  {
    id: "pelliccia-corta",
    name: "Pelliccia Corta",
    price: 980,
    category: "Pellicce vere",
    colors: [nero],
    sizes: ["XS", "S", "M", "L"],
    image: "assets/products/pelliccia-corta.jpg",
    featured: false,
    tag: "Pelliccia",
    description: "Pelliccia vera corta, nera, taglio al punto vita e collo ampio. Nessun marchio. Sta su un abito colonna o su un pantalone dritto.",
    details: ["Pelliccia vera", "Senza logo", "Taglio corto", "Collo ampio"],
  },
  {
    id: "valerio-abito-nero",
    name: "Abito Nero",
    price: 890,
    category: "Valerio Moda",
    colors: [nero],
    sizes: ["Su misura"],
    image: "assets/products/valerio-abito-nero.svg",
    featured: true,
    tag: "Su misura",
    description: "Abito su misura Valerio Moda: giacca due bottoni, pantalone con pince, nero pieno in lana. La misura si prende sul corpo, da spalla a fondo gamba.",
    details: ["Stagione Valerio Moda", "Su misura", "Lana", "Due bottoni"],
  },
  {
    id: "valerio-abito-gessato",
    name: "Abito Gessato",
    price: 960,
    category: "Valerio Moda",
    colors: [gessato],
    sizes: ["Su misura"],
    image: "assets/products/valerio-abito-gessato.svg",
    featured: true,
    tag: "Su misura",
    description: "Abito su misura a gessato chiaro, spalla naturale e rever stretto. La riga è contenuta e il pantalone cade dritto.",
    details: ["Stagione Valerio Moda", "Su misura", "Gessato", "Spalla naturale"],
  },
  {
    id: "valerio-giacca",
    name: "Giacca Spalla Naturale",
    price: 640,
    category: "Valerio Moda",
    colors: [nero],
    sizes: ["Su misura"],
    image: "assets/products/valerio-giacca.svg",
    featured: false,
    tag: "Su misura",
    description: "Giacca su misura, spalla senza imbottitura, un bottone e tasche a filo. È un pezzo solo, da abbinare a un pantalone già tuo.",
    details: ["Stagione Valerio Moda", "Su misura", "Un bottone", "Spalla naturale"],
  },
];

const careNotes = {
  Cappotti: "Appendi il cappotto su una gruccia larga. Spazzola la lana a freddo. Lavaggio a secco.",
  Felpe: "Lava a freddo, al rovescio, e stendi in piano. Il bianco resta bianco se non entra in asciugatrice.",
  Camicie: "Solo lavaggio a secco. La seta si stira dal rovescio, a bassa temperatura.",
  Pantaloni: "La gamba dritta non ha bisogno di una piega da cerimonia. Lava a freddo o a secco.",
  Giacche: "Appendi sulla gruccia larga. Il nylon si passa con un panno umido; lana e trapunta vanno a secco.",
  "T-shirt": "Lava a freddo, al rovescio. La stampa non si stira.",
  Maglie: "Lava il merino a mano, in acqua fredda, e stendilo in piano.",
  Gonne: "Il plissé torna in piega da solo. Il ferro non va diretto sul tessuto.",
  Abiti: "Lavaggio a secco. Il crepe si appende, non si piega in valigia.",
  Profumi: "Tieni il flacone al buio e lontano dal calore. Il sigillo aperto esclude il reso.",
  "Vestiti da sposa": "La prova è senza spille e senza orli. Dopo una modifica il reso non è possibile. Si conserva appeso.",
  "Pellicce vere": "Gruccia larga, luogo fresco, lontano dal calore. Il pelo non si piega.",
  "Valerio Moda": "Le misure si prendono in atelier. Il capo già tagliato sul corpo non si rende.",
};

export function careFor(product) {
  return careNotes[product.category] || "";
}

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
