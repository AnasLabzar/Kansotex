import { NextResponse } from "next/server";

export async function GET() {
  try {
    // We use a free, robust exchange rate API, using EUR as base (since our DB prices are in EUR)
    const res = await fetch("https://open.er-api.com/v6/latest/EUR", {
      next: { revalidate: 3600 } // Cache rates for 1 hour
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch rates");
    }

    const data = await res.json();
    
    // We extract only the currencies we need for Kansotex
    const rates = {
      EUR: 1, // Base
      MAD: data.rates.MAD || 10.85,
      USD: data.rates.USD || 1.08,
      GBP: data.rates.GBP || 0.85
    };

    return NextResponse.json({ rates });
  } catch (error) {
    console.error("Exchange API error:", error);
    // Fallback static rates if the API is down
    return NextResponse.json({
      rates: {
        EUR: 1,
        MAD: 10.85,
        USD: 1.08,
        GBP: 0.85
      }
    });
  }
}
