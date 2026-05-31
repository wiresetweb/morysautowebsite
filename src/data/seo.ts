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

interface Faq {
  q: string;
  a: string;
}

interface LocalizedText {
  /** Short distance/relationship note to the Hialeah shop */
  proximity: string;
  /** Unique 2–3 sentence intro — NOT boilerplate */
  intro: string;
  /** Unique long-form local guide paragraphs — genuinely helpful, NOT boilerplate */
  body: string[];
  /** City-specific FAQs — also emitted as FAQPage structured data */
  faqs: Faq[];
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
      body: [
        "Hialeah is our backyard. The shop has sat on E 10th Ave for over twenty years, so when a Hialeah driver needs a part there's no long wait on shipping and no guessing at fitment — you can swing by the counter to talk it through in person, and we've usually started working the phones before you arrive. We see the cars this city actually runs on: high-mileage Hondas and Toyotas, work trucks that can't sit idle, and family sedans someone's trying to get one more year out of.",
        "Because we're local, pickup is simple and so is a straight conversation about what's worth fixing. Give us the year, make, model, and the part, and we'll quote new, used, and aftermarket side by side so you can decide with real numbers in front of you — not a padded estimate. And if a cheaper option is the smarter call, we'll tell you. Everything happens in English or Spanish, whichever is easier.",
      ],
      faqs: [
        {
          q: "Can I just walk into the shop?",
          a: "Yes — we're at 151 E 10th Ave, open Monday through Friday, 9am to 5pm. It helps to call ahead with your part so we can have options ready when you get here.",
        },
        {
          q: "Do you carry used parts to save money?",
          a: "We do. We pull from a salvage network across Miami-Dade and check pieces before we sell them, so you get real savings without the gamble. We'll always show you new and aftermarket prices alongside, so the choice is yours.",
        },
        {
          q: "What if the part isn't in stock?",
          a: "Most parts aren't sitting on a shelf anywhere — they get sourced. Give us the details and we work our suppliers and salvage contacts, usually coming back with options in two to four days, with some exceptions.",
        },
      ],
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
      body: [
        "Hialeah es nuestra casa. La tienda lleva más de veinte años en E 10th Ave, así que cuando un conductor de Hialeah necesita una pieza no hay que esperar envíos largos ni adivinar si encaja — puedes pasar por el mostrador a hablarlo en persona, y normalmente ya empezamos a mover los teléfonos antes de que llegues. Conocemos los carros que mueve esta ciudad: Hondas y Toyotas con millas, camionetas de trabajo que no pueden parar, y carros de familia a los que alguien le quiere sacar un año más.",
        "Como somos de aquí, recoger es fácil y también lo es una conversación honesta sobre qué vale la pena arreglar. Danos el año, marca, modelo y la pieza, y te cotizamos nueva, usada y aftermarket lado a lado para que decidas con números reales delante — no un estimado inflado. Y si la opción más barata es la más inteligente, te lo decimos. Todo en inglés o español, como te quede mejor.",
      ],
      faqs: [
        {
          q: "¿Puedo entrar a la tienda sin cita?",
          a: "Claro — estamos en 151 E 10th Ave, abierto de lunes a viernes, 9am a 5pm. Ayuda llamar antes con tu pieza para tener las opciones listas cuando llegues.",
        },
        {
          q: "¿Tienen piezas usadas para ahorrar?",
          a: "Sí. Sacamos de una red de yonkers por todo Miami-Dade y revisamos las piezas antes de venderlas, así ahorras de verdad sin jugártela. Siempre te mostramos también el precio nuevo y aftermarket para que tú decidas.",
        },
        {
          q: "¿Qué pasa si no tienen la pieza en inventario?",
          a: "Casi ninguna pieza está esperando en un estante — se busca. Danos los detalles y movemos nuestros proveedores y contactos de yonker, normalmente con opciones en dos a cuatro días, con algunas excepciones.",
        },
      ],
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
        "Sourcing parts for a car in Miami? We pull from a supplier and salvage network across the metro and have most parts ready within two to four days. New, used, and aftermarket — plus auto glass — at prices that beat the dealership. Hablamos español.",
      body: [
        "Mory's is a short drive north of the City of Miami, and we pull parts for drivers all across it — from Little Havana and Allapattah to Brownsville and Liberty City. Miami runs on every kind of car, which is exactly why a sourcing network beats a fixed shelf: instead of hoping one store happens to stock your part, we work suppliers and salvage yards across the metro until we find the right one at the right price.",
        "For most Miami orders we can have parts ready within two to four days, and depending on the size of the order we can arrange delivery instead of making you fight traffic up to Hialeah. New, used, aftermarket, and auto glass all run through the same process — you tell us what the car needs, we lay out the real options and what each one actually costs.",
      ],
      faqs: [
        {
          q: "Do you deliver auto parts in Miami?",
          a: "Depending on the order, yes. Larger orders can be delivered into the Miami area; smaller ones are usually a quick pickup in Hialeah. We'll tell you up front which makes sense for your order.",
        },
        {
          q: "Can you really beat dealership pricing?",
          a: "Most of the time, yes — that's the whole point of working a network instead of one parts counter. We'll put new, used, and aftermarket side by side so you can see the savings on your specific part.",
        },
        {
          q: "Do you speak Spanish?",
          a: "Sí. The counter is fully bilingual — handle your entire request in Spanish or English, whichever is more comfortable.",
        },
      ],
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
        "¿Buscando piezas para un carro en Miami? Sacamos de una red de proveedores y yonkers por todo el metro y tenemos casi todas las piezas listas en dos a cuatro días. Nuevas, usadas y aftermarket — más vidrio automotriz — a precios que le ganan al dealer. We speak English.",
      body: [
        "Mory's queda a un viaje corto al norte de la Ciudad de Miami, y conseguimos piezas para conductores por toda ella — desde Little Havana y Allapattah hasta Brownsville y Liberty City. Por Miami rueda todo tipo de carro, y por eso una red de búsqueda le gana a un estante fijo: en vez de esperar que una sola tienda tenga tu pieza, movemos proveedores y yonkers por todo el metro hasta dar con la correcta al precio correcto.",
        "Para casi todas las órdenes de Miami tenemos la pieza en dos a cuatro días, y según el tamaño de la orden podemos coordinar entrega en vez de hacerte pelear con el tráfico hasta Hialeah. Nuevas, usadas, aftermarket y vidrio automotriz pasan por el mismo proceso — nos dices qué necesita el carro y te ponemos las opciones reales con lo que cuesta cada una.",
      ],
      faqs: [
        {
          q: "¿Entregan piezas en Miami?",
          a: "Según la orden, sí. Las órdenes más grandes se pueden entregar en el área de Miami; las más pequeñas suelen ser una recogida rápida en Hialeah. Te decimos de frente qué conviene para tu orden.",
        },
        {
          q: "¿De verdad le ganan al precio del dealer?",
          a: "La mayoría de las veces, sí — de eso se trata mover una red en vez de un solo mostrador. Te ponemos nueva, usada y aftermarket lado a lado para que veas el ahorro en tu pieza específica.",
        },
        {
          q: "¿Hablan español?",
          a: "Claro. El mostrador es totalmente bilingüe — haz todo tu pedido en español o inglés, como te sientas más cómodo.",
        },
      ],
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
      body: [
        "Hialeah Gardens is just west of us, a quick run over on W 49th, which makes pickups painless and sourcing fast. We help a lot of Gardens drivers and the small shops out that way, and the routine is simple: call with the year, make, model, and the part, and we start working the network while you go about your day.",
        "Being this close means we can usually turn parts around quickly and talk through fitment without a long back-and-forth. New, used, aftermarket, and glass all run through the same honest process — we quote what we'd actually buy ourselves and tell you straight when the cheaper option is the smarter call. Depending on the order, we can deliver right back into the Gardens.",
      ],
      faqs: [
        {
          q: "How far is the shop from Hialeah Gardens?",
          a: "Just a few minutes east on W 49th St. Most Hialeah Gardens customers pick up at our counter on E 10th Ave once the part's in — usually within two to four days.",
        },
        {
          q: "Can you find parts for older cars?",
          a: "That's our specialty. Years of supplier and salvage contacts mean we can usually track down parts for older and high-mileage vehicles that other shops give up on.",
        },
        {
          q: "Do you handle auto glass too?",
          a: "Yes — windshields, side glass, and back glass for most makes and models, sourced fast and installed clean.",
        },
      ],
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
      body: [
        "Hialeah Gardens queda justo al oeste de nosotros, un viajecito por la W 49th, lo que hace que recoger sea fácil y la búsqueda rápida. Ayudamos a muchos conductores de los Gardens y a los talleres pequeños de por allá, y la rutina es simple: llama con el año, marca, modelo y la pieza, y empezamos a mover la red mientras tú sigues con tu día.",
        "Estar tan cerca significa que normalmente entregamos las piezas rápido y aclaramos el tema del encaje sin mucho ida y vuelta. Nuevas, usadas, aftermarket y vidrio pasan por el mismo proceso honesto — cotizamos lo que compraríamos nosotros mismos y te decimos de frente cuándo la opción más barata es la más inteligente. Según la orden, te la llevamos de vuelta a los Gardens.",
      ],
      faqs: [
        {
          q: "¿Qué tan lejos está la tienda de Hialeah Gardens?",
          a: "A solo unos minutos al este por la W 49th St. La mayoría de los clientes de Hialeah Gardens recogen en nuestro mostrador en E 10th Ave cuando llega la pieza — generalmente en dos a cuatro días.",
        },
        {
          q: "¿Consiguen piezas para carros viejos?",
          a: "Esa es nuestra especialidad. Años de contactos con proveedores y yonkers significan que normalmente damos con piezas de carros viejos y con muchas millas que otras tiendas dan por perdidas.",
        },
        {
          q: "¿También hacen vidrio automotriz?",
          a: "Sí — parabrisas, vidrios laterales y vidrio trasero para casi cualquier marca y modelo, conseguidos rápido e instalados limpio.",
        },
      ],
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
      body: [
        "Opa-Locka sits just north of the shop, an easy few minutes up the road, so getting parts to drivers there is quick. From a single tail light to a full front-end rebuild, the approach is the same: we find the part for less and lay out your real choices — including which one we'd actually put on our own car.",
        "Whether you're keeping a daily driver alive or fixing something up for resale, we'll quote new, used, and aftermarket so the decision is yours and the price is clear from the start. Depending on the order we can deliver into Opa-Locka, and the whole conversation happens in English or Spanish.",
      ],
      faqs: [
        {
          q: "Do you deliver to Opa-Locka?",
          a: "Depending on the order size, yes. Opa-Locka is close enough that delivery is often easy; smaller orders are usually a quick pickup in Hialeah.",
        },
        {
          q: "Can you find a specific used part?",
          a: "Usually, yes. Give us the year, make, model, and part, and we'll work our salvage network to find a verified piece at a fair price.",
        },
        {
          q: "How long does sourcing take?",
          a: "Most parts come back with options in two to four days, depending on what it is and where it's coming from — some exceptions take a little longer.",
        },
      ],
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
      body: [
        "Opa-Locka queda justo al norte de la tienda, unos minutos sencillos por la carretera, así que llevarles piezas a los conductores de allá es rápido. Desde una sola luz trasera hasta un front-end completo, el enfoque es el mismo: encontramos la pieza por menos y te ponemos las opciones reales — incluyendo cuál le pondríamos a nuestro propio carro.",
        "Sea que estés manteniendo vivo un carro de diario o arreglando algo para revender, te cotizamos nueva, usada y aftermarket para que la decisión sea tuya y el precio esté claro desde el principio. Según la orden te la llevamos a Opa-Locka, y toda la conversación es en inglés o español.",
      ],
      faqs: [
        {
          q: "¿Entregan en Opa-Locka?",
          a: "Según el tamaño de la orden, sí. Opa-Locka está lo suficientemente cerca como para que la entrega sea fácil; las órdenes pequeñas suelen ser una recogida rápida en Hialeah.",
        },
        {
          q: "¿Pueden encontrar una pieza usada específica?",
          a: "Normalmente, sí. Danos el año, marca, modelo y la pieza, y movemos nuestra red de yonkers para encontrar una pieza verificada a precio justo.",
        },
        {
          q: "¿Cuánto demora la búsqueda?",
          a: "Casi todas las piezas regresan con opciones en dos a cuatro días, según qué sea y de dónde venga — algunas excepciones toman un poco más.",
        },
      ],
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
      body: [
        "Doral is a straight shot southwest from Hialeah, and we source parts for drivers and the many work vehicles based out that way. Doral keeps a lot of trucks, vans, and fleet vehicles on the road, and a sourcing network is built exactly for that — we track down OEM, verified used, and aftermarket body and trim through suppliers across South Florida instead of limiting you to whatever one shelf happens to hold.",
        "For Doral orders we can often arrange delivery depending on the total, which saves a trip across town when you've got a vehicle you need back in service. You give us the year, make, model, and part; we come back with options, prices, and an honest read on which one is the better buy.",
      ],
      faqs: [
        {
          q: "Do you supply parts for work trucks and fleets?",
          a: "Yes. We regularly source parts for trucks, vans, and work vehicles — including body, trim, and glass. Tell us what you run and we'll work the network for it.",
        },
        {
          q: "Can parts be delivered to Doral?",
          a: "Depending on the order total, yes — larger orders can be delivered to the Doral area. We'll confirm delivery when you call with the details.",
        },
        {
          q: "Do you carry both OEM and aftermarket?",
          a: "Both. We'll price OEM, quality used, and aftermarket side by side so you can choose based on your budget and the fitment you need.",
        },
      ],
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
      body: [
        "Doral queda recto hacia el suroeste desde Hialeah, y conseguimos piezas para conductores y para las muchas camionetas de trabajo que operan por allá. Doral mueve muchos trucks, vans y vehículos de flota, y una red de búsqueda está hecha justo para eso — rastreamos OEM, usado verificado, y aftermarket de carrocería por proveedores de todo el sur de Florida, sin limitarte a lo que tenga un solo estante.",
        "Para las órdenes de Doral muchas veces coordinamos entrega según el total, lo que te ahorra el viaje cuando tienes un vehículo que necesitas de vuelta en servicio. Nos das el año, marca, modelo y la pieza; regresamos con opciones, precios y una lectura honesta de cuál es la mejor compra.",
      ],
      faqs: [
        {
          q: "¿Surten piezas para trucks de trabajo y flotas?",
          a: "Sí. Constantemente conseguimos piezas para trucks, vans y vehículos de trabajo — incluyendo carrocería, trim y vidrio. Dinos qué manejas y movemos la red para conseguirlo.",
        },
        {
          q: "¿Pueden entregar en Doral?",
          a: "Según el total de la orden, sí — las órdenes más grandes se pueden entregar en el área de Doral. Confirmamos la entrega cuando llames con los detalles.",
        },
        {
          q: "¿Tienen OEM y aftermarket?",
          a: "Los dos. Cotizamos OEM, usado de calidad y aftermarket lado a lado para que elijas según tu presupuesto y el encaje que necesites.",
        },
      ],
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
      body: [
        "North Miami sits east of the shop, an easy drive over, and we pull parts for drivers up and down that side of the county. The pitch is simple: you shouldn't have to eat dealership markups to get the right part. We source new, used, and aftermarket — plus auto glass — through a network built over years on the ground in Miami-Dade.",
        "Tell us what the car is doing and your budget, and we'll give you straight answers and real options instead of a padded quote. Pickup in Hialeah is quick, delivery is possible depending on the order, and you can handle the whole thing in English or Spanish.",
      ],
      faqs: [
        {
          q: "Why go to Mory's instead of a dealer?",
          a: "Dealers charge dealer prices. We work a supplier and salvage network to find the same part — new, used, or aftermarket — usually for noticeably less, and we'll show you the comparison.",
        },
        {
          q: "Do you have auto glass for North Miami drivers?",
          a: "Yes — windshields, side glass, and back glass for most makes and models, sourced fast and installed clean.",
        },
        {
          q: "How do I get a quote?",
          a: "Call the shop or send a part request with your year, make, model, and the part. We'll get back to you with options and pricing, usually within two to four days.",
        },
      ],
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
      body: [
        "North Miami queda al este de la tienda, un viaje fácil, y conseguimos piezas para conductores por todo ese lado del condado. La idea es simple: no tienes que aguantar los recargos del dealer para conseguir la pieza correcta. Conseguimos nuevas, usadas y aftermarket — más vidrio automotriz — por una red construida durante años en Miami-Dade.",
        "Dinos qué está haciendo el carro y tu presupuesto, y te damos respuestas directas y opciones reales en vez de una cotización inflada. Recoger en Hialeah es rápido, la entrega es posible según la orden, y puedes hacer todo en inglés o español.",
      ],
      faqs: [
        {
          q: "¿Por qué ir a Mory's en vez del dealer?",
          a: "El dealer cobra precios de dealer. Nosotros movemos una red de proveedores y yonkers para conseguir la misma pieza — nueva, usada o aftermarket — normalmente por bastante menos, y te mostramos la comparación.",
        },
        {
          q: "¿Tienen vidrio automotriz para conductores de North Miami?",
          a: "Sí — parabrisas, vidrios laterales y vidrio trasero para casi cualquier marca y modelo, conseguidos rápido e instalados limpio.",
        },
        {
          q: "¿Cómo pido una cotización?",
          a: "Llama a la tienda o envía un pedido con tu año, marca, modelo y la pieza. Te respondemos con opciones y precios, generalmente en dos a cuatro días.",
        },
      ],
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
      body: [
        "Fontainebleau is just south of the shop near the Palmetto, close to the FIU and Blue Lagoon area, so sourcing and pickup are both quick. We do the legwork for Fontainebleau drivers and students who don't have time to call around — give us the part and we work our supplier and salvage contacts, then call you back with prices.",
        "New, used, aftermarket, and glass all go through the same process, and we'll always tell you which option is the smart spend for your situation rather than just the most expensive one. Depending on the order we can deliver; otherwise it's a short hop to the counter in Hialeah.",
      ],
      faqs: [
        {
          q: "I'm a student near FIU — can you help on a budget?",
          a: "That's exactly what the used and aftermarket options are for. We'll find the lowest reasonable price for your part and tell you honestly what's worth it and what isn't.",
        },
        {
          q: "How close is the shop to Fontainebleau?",
          a: "Just north near the Palmetto — a short drive. Most Fontainebleau customers pick up once the part comes in, usually within two to four days.",
        },
        {
          q: "Can you find hard-to-find parts?",
          a: "Yes — tracking down parts other shops can't is what we're known for, thanks to years of supplier and salvage contacts across South Florida.",
        },
      ],
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
      body: [
        "Fontainebleau queda justo al sur de la tienda cerca del Palmetto, cerca del área de FIU y Blue Lagoon, así que la búsqueda y la recogida son rápidas. Hacemos el trabajo por los conductores de Fontainebleau y los estudiantes que no tienen tiempo de andar llamando — danos la pieza y movemos nuestros proveedores y contactos de yonker, y te devolvemos la llamada con precios.",
        "Nuevas, usadas, aftermarket y vidrio pasan por el mismo proceso, y siempre te decimos cuál opción es el gasto inteligente para tu situación, no simplemente la más cara. Según la orden te la llevamos; si no, es un viajecito al mostrador en Hialeah.",
      ],
      faqs: [
        {
          q: "Soy estudiante cerca de FIU — ¿me ayudan con poco presupuesto?",
          a: "Para eso son justo las opciones usadas y aftermarket. Buscamos el precio razonable más bajo para tu pieza y te decimos con honestidad qué vale la pena y qué no.",
        },
        {
          q: "¿Qué tan cerca está la tienda de Fontainebleau?",
          a: "Justo al norte cerca del Palmetto — un viaje corto. La mayoría de los clientes de Fontainebleau recogen cuando llega la pieza, generalmente en dos a cuatro días.",
        },
        {
          q: "¿Consiguen piezas difíciles de encontrar?",
          a: "Sí — rastrear piezas que otras tiendas no pueden es por lo que somos conocidos, gracias a años de contactos con proveedores y yonkers por todo el sur de Florida.",
        },
      ],
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
      body: [
        "Kendall is further southwest, so we make it easy: call or send a request and, depending on the order, we'll get the part to you instead of making you drive all the way up to Hialeah. Kendall is a big, spread-out area with every kind of vehicle on the road, and a sourcing network means we can find your specific part — new, used, or aftermarket — without you store-hopping across town.",
        "You'll get the same fair pricing and straight talk our closer neighbors get. Tell us the year, make, model, and the part; we'll lay out the options, what each costs, and which one we'd actually buy ourselves. Everything in English or Spanish.",
      ],
      faqs: [
        {
          q: "Kendall is far — do you deliver?",
          a: "Yes, on qualifying orders. Because Kendall is a longer drive, we'll arrange delivery when the order makes sense and tell you up front whether it qualifies.",
        },
        {
          q: "Can you source parts so I don't have to drive around?",
          a: "That's the whole idea. One call lets us work the entire network for you — new, used, and aftermarket — so you're not store-hopping across Kendall to compare prices.",
        },
        {
          q: "Do you offer auto glass?",
          a: "Yes — windshields and side/back glass for most makes and models, sourced quickly at fair pricing.",
        },
      ],
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
      body: [
        "Kendall queda más al suroeste, así que te lo hacemos fácil: llama o envía un pedido y, según la orden, te llevamos la pieza en vez de hacerte manejar hasta Hialeah. Kendall es un área grande y extendida con todo tipo de vehículo en la calle, y una red de búsqueda significa que encontramos tu pieza específica — nueva, usada o aftermarket — sin que andes de tienda en tienda por toda la zona.",
        "Recibes el mismo precio justo y la misma franqueza que nuestros vecinos más cercanos. Danos el año, marca, modelo y la pieza; te ponemos las opciones, cuánto cuesta cada una, y cuál compraríamos nosotros mismos. Todo en inglés o español.",
      ],
      faqs: [
        {
          q: "Kendall queda lejos — ¿entregan?",
          a: "Sí, en órdenes que califiquen. Como Kendall es un viaje más largo, coordinamos entrega cuando la orden tiene sentido y te decimos de frente si califica.",
        },
        {
          q: "¿Pueden buscar las piezas para no tener que andar manejando?",
          a: "Esa es toda la idea. Una sola llamada nos deja mover la red completa por ti — nueva, usada y aftermarket — para que no andes de tienda en tienda por Kendall comparando precios.",
        },
        {
          q: "¿Ofrecen vidrio automotriz?",
          a: "Sí — parabrisas y vidrios laterales/traseros para casi cualquier marca y modelo, conseguidos rápido a precio justo.",
        },
      ],
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
