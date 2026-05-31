// SEO helpers + location data for the service-area pages, bilingual.
// Slugs and city display names stay the same across locales — only intros,
// keywords, and meta strings switch.

import { business } from "./content.ts";
import type { Lang } from "./i18n.ts";

const SITE = "https://morysautoparts.com";
const GEO = { lat: 25.8245019, lng: -80.2609681 };

/** AutoPartsStore LocalBusiness schema for the homepage. */
export function localBusinessSchema(lang: Lang = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    "@id": `${SITE}/#business`,
    name: business.name,
    image: `${SITE}/og-image.jpg`,
    url: lang === "es" ? `${SITE}/es/` : SITE,
    telephone: "+1-305-835-2777",
    email: business.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: "Hialeah",
      addressRegion: "FL",
      postalCode: "33010",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: locations.map((l) => ({ "@type": "City", name: l.name })),
    inLanguage: lang === "es" ? "es" : "en",
  };
}

/** Per-location schema referencing the main business, for /service-area/[city]. */
export function locationSchema(loc: Location, lang: Lang = "en") {
  const path = lang === "es" ? `/es/service-area/${loc.slug}` : `/service-area/${loc.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: `${business.name} — serving ${loc.name}, FL`,
    parentOrganization: { "@type": "Organization", name: business.name, "@id": `${SITE}/#business` },
    url: `${SITE}${path}`,
    telephone: "+1-305-835-2777",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: "Hialeah",
      addressRegion: "FL",
      postalCode: "33010",
      addressCountry: "US",
    },
    areaServed: { "@type": "City", name: `${loc.name}, FL` },
    inLanguage: lang === "es" ? "es" : "en",
  };
}

interface LocalizedText {
  /** Short distance/relationship note to the Hialeah shop */
  proximity: string;
  /** Unique 2–3 sentence intro — NOT boilerplate */
  intro: string;
  /** Target search phrases for this page */
  keywords: string[];
}

export interface Location {
  slug: string;
  name: string;
  county: Record<Lang, string>;
  /** Neighborhoods / landmarks for local relevance (locale-agnostic) */
  nearby: string[];
  en: LocalizedText;
  es: LocalizedText;
}

const COUNTY_MD: Record<Lang, string> = {
  en: "Miami-Dade County",
  es: "Condado de Miami-Dade",
};

export const locations: Location[] = [
  {
    slug: "hialeah",
    name: "Hialeah",
    county: COUNTY_MD,
    nearby: ["Westland", "Palm Springs", "Hialeah Acres", "Leisure City", "East Hialeah"],
    en: {
      proximity: "This is home — our shop sits right on E 10th Ave.",
      intro:
        "Mory's has been Hialeah's go-to for hard-to-find car parts for years. Walk in off E 10th Ave, call ahead, or send a part request — new, used, or aftermarket, we'll track it down and quote you straight. Bilingual service, fair pricing, no run-around.",
      keywords: [
        "auto parts hialeah",
        "used auto parts hialeah",
        "car parts hialeah fl",
        "aftermarket parts hialeah",
        "auto glass hialeah",
      ],
    },
    es: {
      proximity: "Aquí es la casa — nuestra tienda queda justo en E 10th Ave.",
      intro:
        "Mory's lleva años siendo el sitio en Hialeah para las piezas de carro difíciles de encontrar. Entra por E 10th Ave, llama antes, o envía un pedido — nuevas, usadas o aftermarket, las rastreamos y te damos un precio directo. Servicio bilingüe, precios justos, sin vueltas.",
      keywords: [
        "piezas de auto hialeah",
        "piezas usadas hialeah",
        "repuestos carro hialeah fl",
        "aftermarket hialeah",
        "vidrio automotriz hialeah",
      ],
    },
  },
  {
    slug: "miami",
    name: "Miami",
    county: COUNTY_MD,
    nearby: ["Allapattah", "Wynwood", "Little Havana", "Brownsville", "Liberty City"],
    en: {
      proximity: "A short hop south from our Hialeah shop.",
      intro:
        "Sourcing parts for a car in Miami? We pull from a supplier and salvage network across the metro and have most parts ready the same week. New, used, and aftermarket — plus auto glass — at prices that beat the dealership. Hablamos español.",
      keywords: [
        "auto parts miami",
        "car parts miami",
        "cheap auto parts miami",
        "aftermarket car parts miami",
        "used car parts miami",
      ],
    },
    es: {
      proximity: "Un brinco al sur desde nuestra tienda en Hialeah.",
      intro:
        "¿Buscando piezas para un carro en Miami? Sacamos de una red de proveedores y yonkers por todo el metro y tenemos casi todas las piezas listas esa misma semana. Nuevas, usadas y aftermarket — más vidrio automotriz — a precios que le ganan al dealer. We speak English.",
      keywords: [
        "piezas de auto miami",
        "repuestos miami",
        "piezas baratas miami",
        "aftermarket miami",
        "piezas usadas miami",
      ],
    },
  },
  {
    slug: "hialeah-gardens",
    name: "Hialeah Gardens",
    county: COUNTY_MD,
    nearby: ["Country Club", "Palm Springs North", "Miami Lakes (border)"],
    en: {
      proximity: "Just west of our shop — a quick drive on W 49th.",
      intro:
        "Hialeah Gardens drivers get the same deal our Hialeah neighbors do: call with the year, make, model, and the part, and we'll work the network to find it fast at a fair price. New, used, aftermarket, and glass — bilingual every step.",
      keywords: [
        "auto parts hialeah gardens",
        "used parts hialeah gardens",
        "car parts hialeah gardens fl",
      ],
    },
    es: {
      proximity: "Justo al oeste de la tienda — un viajecito por W 49th.",
      intro:
        "Los conductores de Hialeah Gardens reciben el mismo trato que nuestros vecinos en Hialeah: llama con el año, marca, modelo y la pieza, y movemos la red para encontrarla rápido a precio justo. Nueva, usada, aftermarket y vidrio — bilingüe en cada paso.",
      keywords: [
        "piezas de auto hialeah gardens",
        "piezas usadas hialeah gardens",
        "repuestos hialeah gardens fl",
      ],
    },
  },
  {
    slug: "opa-locka",
    name: "Opa-Locka",
    county: COUNTY_MD,
    nearby: ["Bunche Park", "Lake Lucerne", "Magnolia North", "Ali Baba"],
    en: {
      proximity: "A few minutes north of the shop.",
      intro:
        "From a single tail light to a full front-end rebuild, Opa-Locka drivers can lean on Mory's to find the part for less. We quote real options — what each one costs and which we'd buy ourselves — and can deliver depending on the order.",
      keywords: [
        "auto parts opa-locka",
        "used auto parts opa locka",
        "car parts opa-locka fl",
      ],
    },
    es: {
      proximity: "Unos minutos al norte de la tienda.",
      intro:
        "Desde una luz trasera hasta un front-end completo, los conductores de Opa-Locka pueden contar con Mory's para encontrar la pieza por menos. Te damos opciones reales — cuánto cuesta cada una y cuál compraríamos nosotros — y podemos entregarla según la orden.",
      keywords: [
        "piezas de auto opa-locka",
        "piezas usadas opa locka",
        "repuestos opa-locka fl",
      ],
    },
  },
  {
    slug: "doral",
    name: "Doral",
    county: COUNTY_MD,
    nearby: ["Downtown Doral", "Sabal Palm", "Doral Isles", "Morgan Levy Park"],
    en: {
      proximity: "A straight shot southwest from Hialeah.",
      intro:
        "Doral is one call away from a better price on parts. Whether it's OEM, a verified used piece, or aftermarket body and trim, we source it through our network and lay out your options. Delivery available across the area depending on the order total.",
      keywords: [
        "auto parts doral",
        "car parts doral fl",
        "aftermarket parts doral",
      ],
    },
    es: {
      proximity: "Recto hacia el suroeste desde Hialeah.",
      intro:
        "Doral está a una llamada de un mejor precio en piezas. Sea OEM, una pieza usada verificada, o aftermarket de carrocería, la conseguimos por nuestra red y te ponemos las opciones. Entrega disponible en el área según el total de la orden.",
      keywords: [
        "piezas de auto doral",
        "repuestos doral fl",
        "aftermarket doral",
      ],
    },
  },
  {
    slug: "north-miami",
    name: "North Miami",
    county: COUNTY_MD,
    nearby: ["Keystone Point", "Sunkist Grove", "Griffing", "Cagni Park"],
    en: {
      proximity: "East of the shop, an easy drive.",
      intro:
        "North Miami drivers don't have to settle for dealership markups. Mory's finds new, used, and aftermarket parts — and auto glass — through a network built over years on the ground in Miami-Dade. Fair pricing, straight answers, English and Spanish.",
      keywords: [
        "auto parts north miami",
        "used car parts north miami",
        "car parts north miami fl",
      ],
    },
    es: {
      proximity: "Al este de la tienda, un viaje fácil.",
      intro:
        "Los conductores de North Miami no tienen que aguantar los precios del dealer. Mory's consigue piezas nuevas, usadas y aftermarket — y vidrio automotriz — por una red construida durante años en Miami-Dade. Precios justos, respuestas directas, inglés y español.",
      keywords: [
        "piezas de auto north miami",
        "piezas usadas north miami",
        "repuestos north miami fl",
      ],
    },
  },
  {
    slug: "fontainebleau",
    name: "Fontainebleau",
    county: COUNTY_MD,
    nearby: ["Tamiami", "Westchester (border)", "FIU area", "Blue Lagoon"],
    en: {
      proximity: "Just south of the shop near the Palmetto.",
      intro:
        "Need a part in Fontainebleau? Call Mory's with what your car needs and we'll do the legwork — sourcing options across our supplier and salvage contacts, then calling you back with prices. New, used, aftermarket, and glass.",
      keywords: [
        "auto parts fontainebleau",
        "car parts fontainebleau miami",
        "used auto parts fontainebleau",
      ],
    },
    es: {
      proximity: "Al sur de la tienda, cerca del Palmetto.",
      intro:
        "¿Necesitas una pieza en Fontainebleau? Llama a Mory's con lo que necesita tu carro y nosotros hacemos el trabajo — buscando opciones entre nuestros proveedores y contactos de yonker, y devolviéndote la llamada con precios. Nueva, usada, aftermarket y vidrio.",
      keywords: [
        "piezas de auto fontainebleau",
        "repuestos fontainebleau miami",
        "piezas usadas fontainebleau",
      ],
    },
  },
  {
    slug: "kendall",
    name: "Kendall",
    county: COUNTY_MD,
    nearby: ["Pinecrest (border)", "The Hammocks", "Sunset", "Dadeland"],
    en: {
      proximity: "Further southwest — delivery available on qualifying orders.",
      intro:
        "Kendall is a bit of a drive, so we make it easy: call or send a request and, depending on the order, we'll get the part to you. New, used, and aftermarket parts plus auto glass, all at the fair pricing Mory's is known for. Hablamos español.",
      keywords: [
        "auto parts kendall",
        "car parts kendall fl",
        "used auto parts kendall miami",
      ],
    },
    es: {
      proximity: "Más al suroeste — entrega disponible en órdenes que califiquen.",
      intro:
        "Kendall queda un poco lejos, así que te lo hacemos fácil: llama o envía un pedido y, según la orden, te llevamos la pieza. Piezas nuevas, usadas y aftermarket más vidrio automotriz, todo al precio justo por el que Mory's es conocido. We speak English.",
      keywords: [
        "piezas de auto kendall",
        "repuestos kendall fl",
        "piezas usadas kendall miami",
      ],
    },
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

// --- City-page meta builders ---
export function cityPageTitle(loc: Location, lang: Lang): string {
  if (lang === "es") {
    return `Piezas de Auto en ${loc.name}, FL — Nuevas, Usadas y Aftermarket | Mory's`;
  }
  return `Auto Parts in ${loc.name}, FL — New, Used & Aftermarket | Mory's`;
}

export function cityPageDescription(loc: Location, lang: Lang): string {
  if (lang === "es") {
    return `Piezas de auto difíciles de encontrar y vidrio para ${loc.name}, ${loc.county.es}. Nuevas, usadas y aftermarket a precios justos desde Mory's en Hialeah. Servicio bilingüe. Llama al ${business.phone}.`;
  }
  return `Hard-to-find auto parts and glass for ${loc.name}, ${loc.county.en}. New, used, and aftermarket at fair prices from Mory's in Hialeah. Bilingual service. Call ${business.phone}.`;
}
