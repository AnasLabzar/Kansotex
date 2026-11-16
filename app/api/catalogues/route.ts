import { NextResponse } from "next/server";
import { getAllCatalogues, getCatalogueBySlug } from "@/lib/catalogues-data";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const catalogue = getCatalogueBySlug(slug);
      if (!catalogue) {
        return NextResponse.json(
          { error: `Catalogue introuvable pour le slug: ${slug}` },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, catalogue });
    }

    const catalogues = getAllCatalogues();
    return NextResponse.json({
      success: true,
      count: catalogues.length,
      catalogues,
    });
  } catch (error: any) {
    console.error("API /api/catalogues error:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des catalogues." },
      { status: 500 }
    );
  }
}
