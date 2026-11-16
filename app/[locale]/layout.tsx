import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { Overlays } from "@/components/Overlays";
import { CartProvider } from "@/lib/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { getSession } from "@/lib/session";
import { SessionProvider } from "@/lib/SessionContext";
import { CurrencyProvider } from "@/lib/CurrencyContext";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MobileAppBottomNav } from "@/components/MobileAppBottomNav";

export const dynamic = 'force-dynamic';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sage = localFont({
  src: "../../public/fonts/sage/Sage.otf",
  variable: "--font-sage",
});

const commune = localFont({
  src: "../../public/fonts/commmune/Commune.otf",
  variable: "--font-commune",
});

const tangerine = localFont({
  src: "../../public/fonts/tangerine/Tangerine.otf",
  variable: "--font-tangerine",
});

const termina = localFont({
  src: "../../public/fonts/termina/TerminaTest-Bold.otf",
  variable: "--font-termina",
  weight: "700",
});

import { CORE_LUXURY_KEYWORDS, LOCAL_MARRAKECH_KEYWORDS, ENGLISH_SEO_KEYWORDS } from "@/lib/seoKeywords";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale === "en" ? "en" : "fr";
  const isEn = validLocale === "en";

  const defaultTitle = isEn
    ? "Kansotex — Luxury Home Linen & In/Outdoor Fabrics Marrakech"
    : "Kansotex — Linge de Maison Haut de Gamme & Tissus Marrakech";

  const description = isEn
    ? "High-end textile house in Marrakech: 5-star bed linen, velour bathrobes, bespoke curtains and luxury in/outdoor upholstery fabrics for riads and villas."
    : "Maison de textile haut de gamme à Marrakech : linge de lit 5 étoiles, peignoirs velours, rideaux sur-mesure et tissus d'ameublement in & outdoor pour villas et riads.";

  const keywords = isEn
    ? ENGLISH_SEO_KEYWORDS
    : Array.from(new Set([...CORE_LUXURY_KEYWORDS, ...LOCAL_MARRAKECH_KEYWORDS]));

  return {
    metadataBase: new URL("https://kansotex.com"),
    title: {
      default: defaultTitle,
      template: "%s | Kansotex",
    },
    description,
    keywords,
    alternates: {
      canonical: `/${validLocale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        "x-default": "/fr",
      },
    },
    openGraph: {
      title: defaultTitle,
      description,
      url: `https://kansotex.com/${validLocale}`,
      siteName: "Kansotex — In & Outdoor Marrakech",
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: "https://kansotex.com/KANSOTEX-marque-Black.png",
          width: 1200,
          height: 630,
          alt: "Kansotex Marrakech — Maison de Textile & Linge de Maison Haut de Gamme",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description,
      images: ["https://kansotex.com/KANSOTEX-marque-Black.png"],
    },
    icons: {
      icon: [
        {
          url: "/icon.svg",
          type: "image/svg+xml",
        },
        {
          url: "/icon-dark.png",
          type: "image/png",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/icon-light.png",
          type: "image/png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/favicon.ico",
          sizes: "any",
        },
      ],
      shortcut: "/favicon.ico",
      apple: "/icon-light.png",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "p:domain_verify": "33dd61d6a90f26a330463e04397a6ecb",
    },
  };
}

/**
 * Multi-Entity Knowledge Graph for Google SERP Domination:
 * 1. WebSite + SearchAction (Enables Google Sitelinks SearchBox)
 * 2. SiteNavigationElement (Directs Google on exact child sitelinks)
 * 3. Organization (Brand authority & social proof)
 * 4. HomeGoodsStore / LocalBusiness (Google Local 3-Pack rankings in Marrakech)
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://kansotex.com/#organization",
      "name": "Kansotex",
      "legalName": "Kanso Business SARL",
      "url": "https://kansotex.com",
      "logo": "https://kansotex.com/KANSOTEX-marque-Black.png",
      "image": "https://kansotex.com/KANSOTEX-marque-Black.png",
      "description": "Kansotex, marque de Kanso Business SARL. Maison de textile in & outdoor, linge de maison haut de gamme et confection sur mesure depuis 2012 à Marrakech.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "983 Al Massar, Rte de Safi",
        "postalCode": "40100",
        "addressLocality": "Marrakech",
        "addressRegion": "Marrakech-Safi",
        "addressCountry": "MA"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+212 5 24 20 09 96",
          "contactType": "customer service",
          "areaServed": "MA",
          "availableLanguage": ["French", "English", "Arabic"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+212 6 61 09 09 50",
          "contactType": "technical support",
          "areaServed": "MA",
          "availableLanguage": ["French", "English", "Arabic"]
        }
      ],
      "sameAs": [
        "https://www.instagram.com/kansotex/",
        "https://www.pinterest.com/kansotex"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://kansotex.com/#website",
      "url": "https://kansotex.com",
      "name": "Kansotex",
      "alternateName": [
        "Kansotex Marrakech",
        "Maison Kansotex",
        "Kansotex In & Outdoor",
        "Kanso Business SARL"
      ],
      "publisher": {
        "@id": "https://kansotex.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://kansotex.com/fr/products?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "HomeGoodsStore",
      "@id": "https://kansotex.com/#localbusiness",
      "name": "Kansotex — Maison de Textile & Linge de Maison Haut de Gamme",
      "image": "https://kansotex.com/KANSOTEX-marque-Black.png",
      "url": "https://kansotex.com",
      "telephone": "+212 5 24 20 09 96",
      "priceRange": "$$$",
      "currenciesAccepted": "MAD, EUR, USD",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "983 Al Massar, Rte de Safi",
        "postalCode": "40100",
        "addressLocality": "Marrakech",
        "addressRegion": "Marrakech-Safi",
        "addressCountry": "MA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 31.6705,
        "longitude": -8.0312
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Collections Textiles Kansotex",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Linge de Lit Luxe (Satin & Lin Lavé)"
          },
          {
            "@type": "OfferCatalog",
            "name": "Linge de Bain & Peignoirs Éponge 600g/m²"
          },
          {
            "@type": "OfferCatalog",
            "name": "Tissus d'Ameublement In & Outdoor Déperlants"
          },
          {
            "@type": "OfferCatalog",
            "name": "Confection Sur Mesure Rideaux & Voilages"
          }
        ]
      }
    },
    {
      "@type": "ItemList",
      "@id": "https://kansotex.com/#sitenavigation",
      "name": "Navigation Principale & Sitelinks Kansotex",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Linge de Lit de Luxe",
          "description": "Parures satin de coton 500 fils, percale et housses de couette en lin lavé",
          "url": "https://kansotex.com/fr/univers/linge-de-lit"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Linge de Bain & Peignoirs",
          "description": "Serviettes éponge 600g/m² et peignoirs velours pour spas et riads",
          "url": "https://kansotex.com/fr/univers/linge-de-bain"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Catalogue Tissus & Étoffes",
          "description": "Catalogue complet de tissus d'ameublement au mètre, lin et velours",
          "url": "https://kansotex.com/fr/products"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Tissus Outdoor Déperlants",
          "description": "Toiles techniques résistantes aux UV pour terrasses, piscines et banquettes",
          "url": "https://kansotex.com/fr/univers/outdoor"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Espace Pro & Hôtellerie",
          "description": "Fournisseur textile pour hôtels, riads, architectes d'intérieur et décorateurs",
          "url": "https://kansotex.com/fr/pro"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Devis Confection Sur Mesure",
          "description": "Chiffrage et confection sur mesure de rideaux, voilages et literie hôtelière",
          "url": "https://kansotex.com/fr/devis"
        }
      ]
    }
  ]
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!['fr', 'en'].includes(locale)) notFound();

  let messages: any;
  let session: any;
  try {
    messages = await getMessages();
    session = await getSession();
  } catch (err: any) {
    return (
      <html>
        <body>
          <div style={{ color: "red", background: "white", padding: "20px" }}>
            <h1>LAYOUT CRASH:</h1>
            <pre>{err.stack}</pre>
          </div>
        </body>
      </html>
    );
  }

  return (
      <html
        lang={locale}
        className={`${poppins.variable} ${cormorant.variable} ${sage.variable} ${commune.variable} ${tangerine.variable} ${termina.variable} h-full antialiased`}
      >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink pb-20 md:pb-0">
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <SessionProvider session={session}>
          <CurrencyProvider>
            <CartProvider>
              <Overlays />
              {children}
              <Footer />
              <CartDrawer />
              <MobileAppBottomNav />
            </CartProvider>
          </CurrencyProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
