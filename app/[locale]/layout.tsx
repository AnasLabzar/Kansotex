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

export const metadata: Metadata = {
  title: {
    default: "Kansotex — In & Outdoor | Textile haut de gamme",
    template: "%s — Kansotex",
  },
  description:
    "Kansotex, maison de textile in & outdoor. Tissus haut de gamme, linge de maison, linge de lit et linge de bain pour professionnels et particuliers.",
  icons: {
    icon: "/icon?v=2", // Force browser to use the dynamic generated icon
    apple: "/apple-icon?v=2",
  },
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
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <NextIntlClientProvider messages={messages}>
          <SessionProvider session={session}>
          <CurrencyProvider>
            <CartProvider>
              <Overlays />
              {children}
              <Footer />
              <CartDrawer />
            </CartProvider>
          </CurrencyProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
