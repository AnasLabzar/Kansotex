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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale === "en" ? "en" : "fr";

  return {
    metadataBase: new URL("https://kansotex.com"),
    title: {
      default: "Kansotex — In & Outdoor | Textile haut de gamme",
      template: "%s — Kansotex",
    },
    description:
      validLocale === "en"
        ? "Kansotex, high-end in & outdoor textile house in Marrakech. Premium fabrics, bespoke curtains, bed & bath linen for luxury hotels and private residences."
        : "Kansotex, maison de textile in & outdoor. Tissus haut de gamme, rideaux sur-mesure, linge de maison et de lit pour professionnels et particuliers à Marrakech.",
    keywords: ["textile", "in and outdoor", "tissu ameublement", "maroc", "luxe", "architecture", "hôtellerie"],
    alternates: {
      canonical: `/${validLocale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        "x-default": "/fr",
      },
    },
    openGraph: {
      title: "Kansotex — In & Outdoor | Textile haut de gamme",
      description: "Kansotex, maison de textile in & outdoor pour professionnels et particuliers.",
      url: `https://kansotex.com/${validLocale}`,
      siteName: "Kansotex",
      locale: validLocale === "en" ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: "https://kansotex.com/KANSOTEX-marque-Black.png",
          width: 1200,
          height: 630,
          alt: "Kansotex",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Kansotex — In & Outdoor | Textile haut de gamme",
      description: "Kansotex, maison de textile in & outdoor.",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Kansotex",
  "legalName": "Kanso Business SARL",
  "url": "https://kansotex.com",
  "logo": "https://kansotex.com/KANSOTEX-marque-Black.png",
  "description": "Kansotex, marque de Kanso Business SARL. Maison de textile in & outdoor, étoffes haut de gamme et confection sur mesure depuis 2012 à Marrakech.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "983 Al Massar, Rte de Safi",
    "postalCode": "40100",
    "addressLocality": "Marrakech",
    "addressCountry": "MA"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+212 5 24 20 09 96",
      "contactType": "customer service"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+212 6 61 09 09 50",
      "contactType": "technical support"
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
