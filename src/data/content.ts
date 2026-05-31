// Single source of truth for site copy across English and Spanish.
// Translations are idiomatic Miami Spanish (Cuban/Latin American register),
// matching the audience. Owner should review before launch.

import type { Lang } from "./i18n.ts";

// --- Locale-agnostic business data (NAP doesn't translate) ---
export const business = {
  name: "Mory's Auto Parts and Glass",
  shortName: "Mory's",
  phone: "305-835-2777",
  phoneHref: "tel:+13058352777",
  email: "mory7373@gmail.com",
  address: {
    line1: "151 E 10th Ave",
    line2: "Hialeah, FL 33010",
  },
  mapsUrl:
    "https://www.google.com/maps/place/Mory's+Auto+Parts+and+glass/@25.8245067,-80.263543,17z",
};

export const hours: Record<Lang, string> = {
  en: "Mon–Fri · 9am – 5pm",
  es: "Lun–Vie · 9am – 5pm",
};

// --- Hero (home page) ---
export interface HeroCopy {
  eyebrow: string;
  headlineLead: string;
  headlineHighlight: string;
  headlineTail: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  leadLabel: string;
  leadBody: string;
  howLabel: string;
  howBody: string;
  figCaption: string;
}

export const hero: Record<Lang, HeroCopy> = {
  en: {
    eyebrow: "Hialeah · Miami-Dade · Broward",
    headlineLead: "Need a car part in",
    headlineHighlight: "South Florida",
    headlineTail: "We find it. Fair price. Fast.",
    subhead:
      "New, used, and aftermarket parts — sourced from a network we've built over years on the ground in Hialeah. Hard-to-find is our specialty. Hablamos español.",
    ctaPrimary: "Call",
    ctaSecondary: "Or send us your part request",
    leadLabel: "Lead",
    leadBody:
      "New, used, and aftermarket parts — sourced from a network we've built over years on the ground in Hialeah. Hard-to-find is our specialty.",
    howLabel: "How to order",
    howBody:
      "Call the shop with year, make, model, and the part. We source it from the network, quote the options, and have it ready that week.",
    figCaption: "A real shop, in real Hialeah.",
  },
  es: {
    eyebrow: "Hialeah · Miami-Dade · Broward",
    headlineLead: "¿Buscas una pieza de carro en",
    headlineHighlight: "el sur de Florida",
    headlineTail: "La encontramos. Precio justo. Rápido.",
    subhead:
      "Piezas nuevas, usadas y aftermarket — de una red que hemos construido durante años aquí en Hialeah. Lo difícil de encontrar es lo nuestro. We speak English.",
    ctaPrimary: "Llama",
    ctaSecondary: "O envíanos tu pedido de pieza",
    leadLabel: "Resumen",
    leadBody:
      "Piezas nuevas, usadas y aftermarket — de una red de proveedores construida durante años en Hialeah. Lo difícil de conseguir es nuestra especialidad.",
    howLabel: "Cómo pedir",
    howBody:
      "Llama a la tienda con el año, marca, modelo y la pieza. La buscamos en la red, te damos las opciones con precio, y la tenemos esa misma semana.",
    figCaption: "Una tienda de verdad, en Hialeah de verdad.",
  },
};

// --- Reviews / testimonials ---
export interface Review {
  quote: string;
  name: string;
  location: string;
}

export const reviews: Record<Lang, Review[]> = {
  en: [
    {
      quote:
        "Called Mory's looking for a part three other shops couldn't find. They had it priced and ready by the next day. These are the people you call when you actually need it solved.",
      name: "Carlos R.",
      location: "Hialeah",
    },
    {
      quote:
        "Honest pricing and no run-around. Alex told me straight what was a good deal and what wasn't worth it. That's rare.",
      name: "Marisol P.",
      location: "Miami",
    },
    {
      quote:
        "Got me an aftermarket fender at half what the dealer quoted. Picked it up same week. I've been sending family here ever since.",
      name: "Devon T.",
      location: "Opa-Locka",
    },
  ],
  es: [
    {
      quote:
        "Llamé a Mory's buscando una pieza que otras tres tiendas no pudieron encontrar. Al día siguiente la tenían lista y con precio. Estos son los que tú llamas cuando de verdad necesitas que te resuelvan.",
      name: "Carlos R.",
      location: "Hialeah",
    },
    {
      quote:
        "Precios honestos, sin enredos. Alex me dijo de frente qué era un buen deal y qué no valía la pena. Eso es raro hoy en día.",
      name: "Marisol P.",
      location: "Miami",
    },
    {
      quote:
        "Me consiguió un guardafango aftermarket a la mitad de lo que cotizó el dealer. Lo recogí esa misma semana. Desde entonces mando a toda la familia aquí.",
      name: "Devon T.",
      location: "Opa-Locka",
    },
  ],
};

// --- How it works ---
export interface Step {
  n: string;
  title: string;
  body: string;
  icon: string;
}

export const howItWorks: Record<Lang, Step[]> = {
  en: [
    {
      n: "01",
      title: "Call us with what you need",
      body: "Tell us the year, make, model, and the part. New, used, or aftermarket — whatever fits your budget.",
      icon: "phone",
    },
    {
      n: "02",
      title: "We hit the network",
      body: "We work our suppliers, salvage contacts, and warehouses across South Florida to track it down.",
      icon: "search",
    },
    {
      n: "03",
      title: "You get options and a price",
      body: "We call you back with what we found, what each one costs, and which one we'd actually buy ourselves.",
      icon: "tag",
    },
    {
      n: "04",
      title: "Pick up or get it delivered",
      body: "Stop by the shop in Hialeah, or — depending on the order — we'll bring it to you across Miami-Dade and Broward.",
      icon: "truck",
    },
  ],
  es: [
    {
      n: "01",
      title: "Llámanos con lo que necesitas",
      body: "Dinos el año, marca, modelo y la pieza. Nueva, usada o aftermarket — lo que te ajuste al bolsillo.",
      icon: "phone",
    },
    {
      n: "02",
      title: "Buscamos en la red",
      body: "Movemos nuestros proveedores, contactos de yonker y almacenes por todo el sur de Florida hasta dar con ella.",
      icon: "search",
    },
    {
      n: "03",
      title: "Te damos opciones y precio",
      body: "Te llamamos de vuelta con lo que encontramos, cuánto cuesta cada una y cuál compraríamos nosotros mismos.",
      icon: "tag",
    },
    {
      n: "04",
      title: "Recoge o te la llevamos",
      body: "Pasa por la tienda en Hialeah o — según la orden — te la llevamos a Miami-Dade y Broward.",
      icon: "truck",
    },
  ],
};

// --- Catalog categories ---
export interface Category {
  title: string;
  blurb: string;
  icon: string;
}

export const categories: Record<Lang, Category[]> = {
  en: [
    {
      title: "New parts",
      blurb:
        "OEM and quality replacements ordered direct from our supplier network — at prices the dealership can't match.",
      icon: "package",
    },
    {
      title: "Used parts",
      blurb:
        "Verified salvage and pull-and-go pieces that pass our quality check. Real savings without the gamble.",
      icon: "recycle",
    },
    {
      title: "Aftermarket",
      blurb:
        "Bumpers, fenders, lights, mirrors — body and trim parts at a fraction of OEM, ready when you need them.",
      icon: "wrench",
    },
    {
      title: "Auto glass",
      blurb:
        "Windshields, side glass, and back glass for most makes and models. Sourced fast, installed clean.",
      icon: "window",
    },
  ],
  es: [
    {
      title: "Piezas nuevas",
      blurb:
        "OEM y repuestos de calidad pedidos directo a nuestra red de proveedores — a precios que el dealer no iguala.",
      icon: "package",
    },
    {
      title: "Piezas usadas",
      blurb:
        "Piezas de yonker verificadas que pasan nuestro chequeo de calidad. Ahorro de verdad sin jugársela.",
      icon: "recycle",
    },
    {
      title: "Aftermarket",
      blurb:
        "Defensas, guardafangos, luces, espejos — piezas de carrocería y trim a una fracción del OEM, listas cuando las necesites.",
      icon: "wrench",
    },
    {
      title: "Vidrio automotriz",
      blurb:
        "Parabrisas, vidrios laterales y vidrio trasero para casi cualquier marca y modelo. Lo conseguimos rápido, lo instalamos limpio.",
      icon: "window",
    },
  ],
};

// Service-area cities (display labels — slugs always stay English/lowercase-hyphen).
export const serviceCities: Record<Lang, string[]> = {
  en: ["Hialeah", "Miami", "Hialeah Gardens", "Opa-Locka", "Doral", "North Miami", "Fontainebleau", "Kendall"],
  es: ["Hialeah", "Miami", "Hialeah Gardens", "Opa-Locka", "Doral", "North Miami", "Fontainebleau", "Kendall"],
};

export interface Stat {
  value: string;
  label: string;
}

export const stats: Record<Lang, Stat[]> = {
  en: [
    { value: "South FL", label: "Where we serve" },
    { value: "EN / ES", label: "Spoken at the counter" },
    { value: "Mon–Fri", label: "Open 9 to 5" },
    { value: "Same week", label: "Typical sourcing time" },
  ],
  es: [
    { value: "Sur FL", label: "Donde servimos" },
    { value: "EN / ES", label: "En el mostrador" },
    { value: "Lun–Vie", label: "Abierto 9 a 5" },
    { value: "Misma semana", label: "Tiempo típico de búsqueda" },
  ],
};

// --- About page ---
export interface AboutCopy {
  metaTitle: string;
  metaDescription: string;
  breadcrumbAbout: string;
  eyebrowShop: string;
  h1Lead: string;
  h1Highlight: string;
  heroBlurb: string;
  storyHeading: string;
  storyParagraphs: string[];
  ownerCaptionLabel: string;
  ownerCaptionName: string;
  storyPhotoLabel: string;
  stats: Stat[];
  eyebrowValues: string;
  values: { icon: string; title: string; body: string }[];
}

export const about: Record<Lang, AboutCopy> = {
  en: {
    metaTitle: "About Mory's Auto Parts and Glass — 20+ Years in Hialeah",
    metaDescription:
      "Mory's Auto Parts and Glass has served South Florida for over 20 years. Owner Alex — Mory himself — has helped thousands of customers find the right part at a fair price.",
    breadcrumbAbout: "About",
    eyebrowShop: "No. 01 — The Shop",
    h1Lead: "Over 20 years of",
    h1Highlight: "finding the part",
    heroBlurb:
      "Mory's has been a fixture in Hialeah for more than two decades — and in that time, owner Alex has helped thousands of South Florida drivers get back on the road.",
    storyHeading: "Alex is Mory — and he's been doing this a long time.",
    storyParagraphs: [
      "For over 20 years, Mory's Auto Parts and Glass has been the shop South Florida drivers call when they need a part and a straight answer. Alex — Mory himself — has run it from the same corner of Hialeah the whole time.",
      "In that stretch he's served thousands of customers: the weekend mechanic, the body shop down the street, the family trying to keep one more year out of a dependable car. New, used, or aftermarket — the goal has never changed. Find the right part. Quote it fair. Get it fast.",
      "No franchise, no call center, no markup games. Just a small team that knows the suppliers, knows the salvage yards, and knows how to find what other shops can't — in English or Spanish, however you're most comfortable.",
    ],
    ownerCaptionLabel: "The Owner",
    ownerCaptionName: "Alex — a.k.a. Mory",
    storyPhotoLabel: "Photo of Alex / the shop — owner at the counter works best here",
    stats: [
      { value: "20+", label: "Years in business" },
      { value: "1,000s", label: "Customers served" },
      { value: "EN / ES", label: "Spoken at the counter" },
      { value: "Hialeah", label: "Where we're based" },
    ],
    eyebrowValues: "No. 02 — Why People Come Back",
    values: [
      {
        icon: "search",
        title: "We find the hard stuff",
        body: "Years on the ground means a deep network of suppliers and salvage contacts. The parts other shops give up on are the ones we're known for tracking down.",
      },
      {
        icon: "tag",
        title: "Fair, direct pricing",
        body: "No games, no padded quotes. Alex will tell you straight what's a good deal and what isn't worth it — that honesty is why customers keep coming back.",
      },
      {
        icon: "shield",
        title: "Two decades of trust",
        body: "Over 20 years serving the same community builds something a chain store can't: regulars who send their family and friends our way.",
      },
    ],
  },
  es: {
    metaTitle: "Sobre Mory's Auto Parts and Glass — Más de 20 Años en Hialeah",
    metaDescription:
      "Mory's Auto Parts and Glass lleva más de 20 años sirviendo al sur de Florida. Alex — Mory mismo — ha ayudado a miles de clientes a encontrar la pieza correcta a un precio justo.",
    breadcrumbAbout: "Nosotros",
    eyebrowShop: "No. 01 — La Tienda",
    h1Lead: "Más de 20 años",
    h1Highlight: "encontrando la pieza",
    heroBlurb:
      "Mory's lleva más de dos décadas siendo un punto fijo en Hialeah — y en ese tiempo, Alex ha ayudado a miles de conductores del sur de Florida a volver a la carretera.",
    storyHeading: "Alex es Mory — y lleva mucho tiempo haciendo esto.",
    storyParagraphs: [
      "Por más de 20 años, Mory's Auto Parts and Glass ha sido la tienda que los conductores del sur de Florida llaman cuando necesitan una pieza y una respuesta directa. Alex — Mory mismo — la ha manejado desde la misma esquina de Hialeah todo este tiempo.",
      "En ese trecho ha atendido a miles de clientes: el mecánico del fin de semana, el body shop de la cuadra, la familia tratando de exprimirle un año más a un carro que les sirve. Nuevo, usado o aftermarket — la meta nunca ha cambiado. Encontrar la pieza correcta. Cotizarla justo. Entregarla rápido.",
      "Sin franquicia, sin call center, sin jueguitos con el precio. Solo un equipo pequeño que conoce a los proveedores, conoce los yonkers, y sabe encontrar lo que otras tiendas no pueden — en inglés o español, como estés más cómodo.",
    ],
    ownerCaptionLabel: "El Dueño",
    ownerCaptionName: "Alex — alias Mory",
    storyPhotoLabel: "Foto de Alex / la tienda — el dueño en el mostrador funciona mejor aquí",
    stats: [
      { value: "20+", label: "Años en el negocio" },
      { value: "Miles", label: "Clientes atendidos" },
      { value: "EN / ES", label: "En el mostrador" },
      { value: "Hialeah", label: "Donde estamos" },
    ],
    eyebrowValues: "No. 02 — Por Qué Vuelven",
    values: [
      {
        icon: "search",
        title: "Encontramos lo difícil",
        body: "Años en la calle significan una red profunda de proveedores y contactos de yonker. Las piezas que otras tiendas dan por perdidas son las que nosotros somos conocidos por rastrear.",
      },
      {
        icon: "tag",
        title: "Precio justo, directo",
        body: "Sin juegos, sin cotizaciones infladas. Alex te dice de frente qué es un buen deal y qué no vale la pena — esa honestidad es por lo que los clientes siguen volviendo.",
      },
      {
        icon: "shield",
        title: "Dos décadas de confianza",
        body: "Más de 20 años sirviendo a la misma comunidad construyen algo que una cadena no puede: clientes fijos que mandan a su familia y amigos para acá.",
      },
    ],
  },
};

// --- Contact page ---
export interface ContactCopy {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1Line1: string;
  h1Line2: string;
  intro: string;
  labelCall: string;
  labelEmail: string;
  labelVisit: string;
  labelHours: string;
  labelDirections: string;
  closedNote: string;
}

export const contact: Record<Lang, ContactCopy> = {
  en: {
    metaTitle: "Contact Mory's Auto Parts and Glass — Hialeah, FL",
    metaDescription: `Send a part request or call Mory's Auto Parts and Glass in Hialeah. New, used, and aftermarket parts plus auto glass for South Florida. ${business.phone}.`,
    breadcrumb: "Contact",
    eyebrow: "Get a Quote",
    h1Line1: "Tell us what",
    h1Line2: "your car needs.",
    intro:
      "Fill out the part request below or just call the shop. We'll work our network, find your options, and get back to you with real prices — usually same week.",
    labelCall: "Call",
    labelEmail: "Email",
    labelVisit: "Visit",
    labelHours: "Hours",
    labelDirections: "Directions",
    closedNote: "Closed weekends & major holidays",
  },
  es: {
    metaTitle: "Contacto — Mory's Auto Parts and Glass, Hialeah, FL",
    metaDescription: `Envía tu pedido de pieza o llama a Mory's Auto Parts and Glass en Hialeah. Piezas nuevas, usadas y aftermarket más vidrio automotriz para el sur de Florida. ${business.phone}.`,
    breadcrumb: "Contacto",
    eyebrow: "Pide tu Cotización",
    h1Line1: "Dinos qué",
    h1Line2: "necesita tu carro.",
    intro:
      "Llena el pedido de pieza aquí abajo o simplemente llama a la tienda. Movemos nuestra red, encontramos tus opciones, y te respondemos con precios reales — generalmente esa misma semana.",
    labelCall: "Llama",
    labelEmail: "Correo",
    labelVisit: "Visita",
    labelHours: "Horario",
    labelDirections: "Cómo llegar",
    closedNote: "Cerrado fines de semana y feriados importantes",
  },
};

// --- Lead form labels ---
export interface FormCopy {
  name: string;
  namePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  emailHelp: string;
  vehicleLegend: string;
  year: string;
  make: string;
  model: string;
  partNeeded: string;
  partPlaceholder: string;
  conditionPref: string;
  conditionAny: string;
  conditionNew: string;
  conditionUsed: string;
  conditionAftermarket: string;
  languagePref: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  disclaimer: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  honeypotLabel: string;
}

export const form: Record<Lang, FormCopy> = {
  en: {
    name: "Name",
    namePlaceholder: "Your name",
    phone: "Phone",
    phonePlaceholder: "(305) 555-0123",
    email: "Email",
    emailPlaceholder: "you@email.com",
    emailHelp: "We'll send a confirmation here once we get your request.",
    vehicleLegend: "The Vehicle",
    year: "Year",
    make: "Make",
    model: "Model",
    partNeeded: "Part needed",
    partPlaceholder: "e.g. front bumper, alternator, windshield",
    conditionPref: "Condition preference",
    conditionAny: "No preference",
    conditionNew: "New",
    conditionUsed: "Used",
    conditionAftermarket: "Aftermarket",
    languagePref: "Preferred language",
    message: "Anything else?",
    messagePlaceholder: "VIN, trim, color, or any detail that helps us find the right part.",
    submit: "Send part request",
    sending: "Sending…",
    disclaimer: "No obligation. We'll call or email you back with options and pricing.",
    successTitle: "Request received.",
    successBody:
      "Thanks — we've got your part request and sent a confirmation to your email. We'll be in touch with options and pricing, usually same week.",
    errorTitle: "Something went wrong.",
    errorBody: `Please try again, or just call us at ${business.phone}.`,
    honeypotLabel: "Leave this blank",
  },
  es: {
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    phone: "Teléfono",
    phonePlaceholder: "(305) 555-0123",
    email: "Correo",
    emailPlaceholder: "tu@correo.com",
    emailHelp: "Te enviaremos una confirmación aquí cuando recibamos tu pedido.",
    vehicleLegend: "El Vehículo",
    year: "Año",
    make: "Marca",
    model: "Modelo",
    partNeeded: "Pieza que necesitas",
    partPlaceholder: "ej. defensa delantera, alternador, parabrisas",
    conditionPref: "Preferencia de condición",
    conditionAny: "Sin preferencia",
    conditionNew: "Nueva",
    conditionUsed: "Usada",
    conditionAftermarket: "Aftermarket",
    languagePref: "Idioma preferido",
    message: "¿Algo más?",
    messagePlaceholder: "VIN, trim, color, o cualquier detalle que nos ayude a encontrar la pieza correcta.",
    submit: "Enviar pedido",
    sending: "Enviando…",
    disclaimer: "Sin compromiso. Te llamamos o te escribimos con opciones y precios.",
    successTitle: "Pedido recibido.",
    successBody:
      "Gracias — tenemos tu pedido y enviamos una confirmación a tu correo. Te contactamos con opciones y precios, generalmente esa misma semana.",
    errorTitle: "Algo salió mal.",
    errorBody: `Por favor intenta de nuevo, o simplemente llámanos al ${business.phone}.`,
    honeypotLabel: "Deja esto en blanco",
  },
};

// --- Shared UI strings (header, footer, etc.) ---
export interface UICopy {
  navHome: string;
  navAbout: string;
  navServiceArea: string;
  navContact: string;
  openMenu: string;
  mastheadTagline: string;
  mastheadEdition: string;
  footerTagline: string;
  footerEdition: string;
  footerVisit: string;
  footerContact: string;
  footerStaff: string;
  langSwitchLabel: string;
  langSwitchTo: string;
  callButton: (phone: string) => string;
}

export const ui: Record<Lang, UICopy> = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navServiceArea: "Service Area",
    navContact: "Contact",
    openMenu: "Open menu",
    mastheadTagline: "Mory's · Hialeah, FL · Est. South Florida",
    mastheadEdition: "Edition 01 · Auto Parts & Glass",
    footerTagline:
      "New, used, and aftermarket parts for South Florida. Direct pricing, hard-to-find sourcing, bilingual service.",
    footerEdition: "Edition 01 · Established South Florida",
    footerVisit: "Visit",
    footerContact: "Contact",
    footerStaff: "Staff",
    langSwitchLabel: "Language",
    langSwitchTo: "Español",
    callButton: (phone) => `Call ${phone}`,
  },
  es: {
    navHome: "Inicio",
    navAbout: "Nosotros",
    navServiceArea: "Zona de Servicio",
    navContact: "Contacto",
    openMenu: "Abrir menú",
    mastheadTagline: "Mory's · Hialeah, FL · Sur de Florida",
    mastheadEdition: "Edición 01 · Auto Parts & Glass",
    footerTagline:
      "Piezas nuevas, usadas y aftermarket para el sur de Florida. Precios directos, búsqueda de lo difícil, servicio bilingüe.",
    footerEdition: "Edición 01 · Establecidos en el Sur de Florida",
    footerVisit: "Visita",
    footerContact: "Contacto",
    footerStaff: "Personal",
    langSwitchLabel: "Idioma",
    langSwitchTo: "English",
    callButton: (phone) => `Llama al ${phone}`,
  },
};

// --- Sections shared on home + service-area ---
export interface SectionsCopy {
  trustEyebrow: string;
  trustReplaceNote: string;
  trustReviewMeta: string;
  howEyebrow: string;
  howHeadingLine1: string;
  howHeadingLine2: string;
  howBlurb: string;
  catalogEyebrow: string;
  catalogHeadingLine1: string;
  catalogHeadingLine2: string;
  catalogBlurb: string;
  catalogCta: string;
  catalogReturns: string;
  shopEssayEyebrow: string;
  shopEssayHeading: string;
  shopEssayBody: string;
  shopEssayCta: string;
  shopPhotoLabel: string;
  heroPhotoLabel: string;
  serviceAreaEyebrow: string;
  serviceAreaHeadingLine1: string;
  serviceAreaHeadingLine2: string;
  serviceAreaBlurb: string;
  serviceAreaIndexLabel: string;
  serviceAreaMapBadge: string;
  ctaEyebrow: string;
  ctaHeadingLine1: string;
  ctaHeadingLine2: string;
  ctaHeadingAccent: string;
  ctaBlurb: string;
  ctaSecondary: string;
  ctaVisit: string;
  ctaHours: string;
  ctaPhone: string;
  ctaEmail: string;
}

export const sections: Record<Lang, SectionsCopy> = {
  en: {
    trustEyebrow: "No. 02 — The Word on the Street",
    trustReplaceNote: "Filler testimonials — replaced by live Google Reviews on launch.",
    trustReviewMeta: "Google · 5/5",
    howEyebrow: "No. 03 — The Process",
    howHeadingLine1: "Four steps.",
    howHeadingLine2: "No run-around.",
    howBlurb:
      "We don't waste your time and we don't pretend to have what we don't. The process is built around getting you the right part at a fair price — fast.",
    catalogEyebrow: "No. 04 — The Catalog",
    catalogHeadingLine1: "If it's on a car,",
    catalogHeadingLine2: "we can find it.",
    catalogBlurb:
      "From a single tail light to a full front-end rebuild — including the glass. Tell us what the car is doing and what your budget is. We'll lay out your real options.",
    catalogCta: "Call about your part",
    catalogReturns: "Returns case-by-case. We also refer trusted mechanics & body shops.",
    shopEssayEyebrow: "Photo essay · Inside the shop",
    shopEssayHeading: "One shop. One team. Years of parts.",
    shopEssayBody:
      "151 E 10th Ave, Hialeah. No franchise, no call center, no markup games. Just the people who know where the deals actually are.",
    shopEssayCta: "Read the story",
    shopPhotoLabel: "Wide shop photo — parts shelves, counter, or storefront exterior",
    heroPhotoLabel: "Hero photo — shop interior, owner at counter, or wall of parts",
    serviceAreaEyebrow: "No. 05 — Where We Serve",
    serviceAreaHeadingLine1: "Miami-Dade",
    serviceAreaHeadingLine2: "and Broward.",
    serviceAreaBlurb:
      "Walk in, call, or have it delivered — depending on the order, we cover most of the metro from our shop in Hialeah.",
    serviceAreaIndexLabel: "Index of locations",
    serviceAreaMapBadge: "Fig. 02 — Location",
    ctaEyebrow: "No. 06 — Place the Order",
    ctaHeadingLine1: "Skip the",
    ctaHeadingLine2: "search.",
    ctaHeadingAccent: "Just call us.",
    ctaBlurb:
      "Tell us the year, make, model, and the part. We'll do the rest and call you back with real options — same week, fair price, no run-around.",
    ctaSecondary: "Send a part request",
    ctaVisit: "Visit",
    ctaHours: "Hours",
    ctaPhone: "Phone",
    ctaEmail: "Email",
  },
  es: {
    trustEyebrow: "No. 02 — Lo que Dicen Por Ahí",
    trustReplaceNote: "Testimonios de muestra — se cambian por reseñas reales de Google al lanzar.",
    trustReviewMeta: "Google · 5/5",
    howEyebrow: "No. 03 — El Proceso",
    howHeadingLine1: "Cuatro pasos.",
    howHeadingLine2: "Sin vueltas.",
    howBlurb:
      "No te hacemos perder tiempo y no fingimos tener lo que no tenemos. El proceso está hecho para conseguirte la pieza correcta a un precio justo — rápido.",
    catalogEyebrow: "No. 04 — El Catálogo",
    catalogHeadingLine1: "Si va en un carro,",
    catalogHeadingLine2: "lo conseguimos.",
    catalogBlurb:
      "Desde una sola luz trasera hasta un front-end completo — incluyendo el vidrio. Dinos qué está haciendo el carro y cuál es tu presupuesto. Te ponemos las opciones reales sobre la mesa.",
    catalogCta: "Llama por tu pieza",
    catalogReturns: "Devoluciones caso por caso. También recomendamos mecánicos y body shops de confianza.",
    shopEssayEyebrow: "Ensayo fotográfico · Dentro de la tienda",
    shopEssayHeading: "Una tienda. Un equipo. Años de piezas.",
    shopEssayBody:
      "151 E 10th Ave, Hialeah. Sin franquicia, sin call center, sin jueguitos con el precio. Solo la gente que sabe dónde están los buenos deals de verdad.",
    shopEssayCta: "Lee la historia",
    shopPhotoLabel: "Foto amplia de la tienda — estantes de piezas, mostrador, o el frente",
    heroPhotoLabel: "Foto principal — interior de la tienda, dueño en el mostrador, o pared de piezas",
    serviceAreaEyebrow: "No. 05 — Donde Servimos",
    serviceAreaHeadingLine1: "Miami-Dade",
    serviceAreaHeadingLine2: "y Broward.",
    serviceAreaBlurb:
      "Entra a la tienda, llama, o pídela a domicilio — según la orden, cubrimos casi toda el área metropolitana desde nuestra tienda en Hialeah.",
    serviceAreaIndexLabel: "Índice de ubicaciones",
    serviceAreaMapBadge: "Fig. 02 — Ubicación",
    ctaEyebrow: "No. 06 — Haz el Pedido",
    ctaHeadingLine1: "Sáltate la",
    ctaHeadingLine2: "búsqueda.",
    ctaHeadingAccent: "Llámanos.",
    ctaBlurb:
      "Dinos el año, marca, modelo y la pieza. Nosotros hacemos el resto y te llamamos de vuelta con opciones reales — misma semana, precio justo, sin vueltas.",
    ctaSecondary: "Enviar pedido de pieza",
    ctaVisit: "Visita",
    ctaHours: "Horario",
    ctaPhone: "Teléfono",
    ctaEmail: "Correo",
  },
};

// --- Service-area index page ---
export interface ServiceAreaIndexCopy {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1Line1: string;
  h1Line2: string;
  blurb: string;
  citiesHeading: string;
  notSeenNote: string;
  notSeenCall: string;
  mapHeader: string;
  mapBadge: string;
}

export const serviceAreaIndex: Record<Lang, ServiceAreaIndexCopy> = {
  en: {
    metaTitle: "Service Area — Auto Parts Across Miami-Dade & Broward | Mory's",
    metaDescription: `Mory's Auto Parts and Glass serves Hialeah, Miami, Doral, Kendall, Opa-Locka and more across South Florida. New, used, and aftermarket parts plus glass. Call ${business.phone}.`,
    breadcrumb: "Service Area",
    eyebrow: "Where We Serve",
    h1Line1: "Across Miami-Dade",
    h1Line2: "& Broward.",
    blurb:
      "Walk in, call, or have it delivered — depending on the order, we cover most of the metro from our shop in Hialeah. Pick your city for local details.",
    citiesHeading: "Cities we serve",
    notSeenNote: "Don't see your area? We still might be able to help — give us a call at",
    notSeenCall: business.phone,
    mapHeader: "151 E 10th Ave · Hialeah, FL 33010",
    mapBadge: "South Florida coverage",
  },
  es: {
    metaTitle: "Zona de Servicio — Piezas de Auto en Miami-Dade y Broward | Mory's",
    metaDescription: `Mory's Auto Parts and Glass sirve a Hialeah, Miami, Doral, Kendall, Opa-Locka y más en el sur de Florida. Piezas nuevas, usadas y aftermarket más vidrio. Llama al ${business.phone}.`,
    breadcrumb: "Zona de Servicio",
    eyebrow: "Donde Servimos",
    h1Line1: "Por Miami-Dade",
    h1Line2: "y Broward.",
    blurb:
      "Entra a la tienda, llama, o pídela a domicilio — según la orden, cubrimos casi toda el área metropolitana desde nuestra tienda en Hialeah. Elige tu ciudad para detalles locales.",
    citiesHeading: "Ciudades que servimos",
    notSeenNote: "¿No ves tu área? Aún podemos ayudarte — llámanos al",
    notSeenCall: business.phone,
    mapHeader: "151 E 10th Ave · Hialeah, FL 33010",
    mapBadge: "Cobertura del sur de Florida",
  },
};

// --- Service-area city page ---
export interface CityPageCopy {
  breadcrumbHome: string;
  breadcrumbServiceArea: string;
  eyebrowPrefix: string;
  h1Prefix: string;
  callCta: string;
  partRequestCta: string;
  sourceEyebrow: (city: string) => string;
  sourceHeading: string;
  sourceFootnote: (proximity: string, city: string) => string;
  nearbyHeading: (city: string) => string;
  alsoEyebrow: string;
  mapBadge: (city: string) => string;
}

export const cityPage: Record<Lang, CityPageCopy> = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbServiceArea: "Service Area",
    eyebrowPrefix: "Service Area —",
    h1Prefix: "Auto parts in",
    callCta: "Call",
    partRequestCta: "Send a part request",
    sourceEyebrow: (city) => `What we source for ${city}`,
    sourceHeading: "New, used, aftermarket & glass.",
    sourceFootnote: (proximity, city) =>
      `${proximity} Returns are handled case-by-case, and we can refer trusted mechanics and body shops in the ${city} area.`,
    nearbyHeading: (city) => `Neighborhoods we cover near ${city}`,
    alsoEyebrow: "Also serving across Miami-Dade & Broward",
    mapBadge: (city) => `Serving ${city}`,
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbServiceArea: "Zona de Servicio",
    eyebrowPrefix: "Zona de Servicio —",
    h1Prefix: "Piezas de auto en",
    callCta: "Llama",
    partRequestCta: "Enviar pedido de pieza",
    sourceEyebrow: (city) => `Lo que conseguimos para ${city}`,
    sourceHeading: "Nuevas, usadas, aftermarket y vidrio.",
    sourceFootnote: (proximity, city) =>
      `${proximity} Las devoluciones se manejan caso por caso, y podemos recomendarte mecánicos y body shops de confianza en el área de ${city}.`,
    nearbyHeading: (city) => `Barrios que cubrimos cerca de ${city}`,
    alsoEyebrow: "También sirviendo por Miami-Dade y Broward",
    mapBadge: (city) => `Sirviendo a ${city}`,
  },
};

// --- 404 ---
export interface NotFoundCopy {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  body: string;
  back: string;
}

export const notFound: Record<Lang, NotFoundCopy> = {
  en: {
    metaTitle: "Page not found — Mory's Auto Parts and Glass",
    metaDescription:
      "That page doesn't exist. Find auto parts, service areas, or contact Mory's in Hialeah.",
    heading: "That part isn't on the shelf.",
    body: "The page you're looking for doesn't exist or has moved. Let's get you back on the road.",
    back: "Back home",
  },
  es: {
    metaTitle: "Página no encontrada — Mory's Auto Parts and Glass",
    metaDescription:
      "Esa página no existe. Encuentra piezas de auto, zonas de servicio o contacta a Mory's en Hialeah.",
    heading: "Esa pieza no está en el estante.",
    body: "La página que buscas no existe o se movió. Vamos a regresarte a la carretera.",
    back: "Volver al inicio",
  },
};

// --- Home page meta ---
export const home: Record<Lang, { metaTitle: string; metaDescription: string }> = {
  en: {
    metaTitle: "Mory's Auto Parts and Glass — Hialeah, FL · New, Used & Aftermarket Auto Parts",
    metaDescription: `Hard-to-find auto parts at fair prices. New, used, and aftermarket parts plus auto glass for South Florida — Miami-Dade and Broward. Call ${business.phone}.`,
  },
  es: {
    metaTitle: "Mory's Auto Parts and Glass — Hialeah, FL · Piezas Nuevas, Usadas y Aftermarket",
    metaDescription: `Piezas de auto difíciles de encontrar a precios justos. Nuevas, usadas y aftermarket más vidrio automotriz para el sur de Florida — Miami-Dade y Broward. Llama al ${business.phone}.`,
  },
};
