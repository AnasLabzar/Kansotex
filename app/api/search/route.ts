import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Fetch all active products and filter (robust and fast for small/medium catalogs)
    const products = await db.orm.public.Product.where({ isActive: true }).all();
    
    const query = q.toLowerCase();
    const results = products
      .filter((p: any) => 
        p.nameFr.toLowerCase().includes(query) || 
        (p.descriptionFr && p.descriptionFr.toLowerCase().includes(query)) ||
        p.slug.toLowerCase().includes(query)
      )
      .slice(0, 5); // Limit to top 5 results

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
