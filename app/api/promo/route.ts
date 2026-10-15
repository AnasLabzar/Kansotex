import { NextResponse } from "next/server";
import { getAllPromos, createPromoCode, togglePromoStatus, deletePromo } from "@/lib/promos";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const promos = getAllPromos();
    return NextResponse.json({ success: true, promos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, discountPercent, description } = body;

    if (!code || !discountPercent) {
      return NextResponse.json(
        { success: false, error: "Code et pourcentage de remise requis." },
        { status: 400 }
      );
    }

    const newPromo = createPromoCode({
      code,
      discountPercent: Number(discountPercent),
      description: description || `Remise de ${discountPercent}%`,
    });

    return NextResponse.json({ success: true, promo: newPromo, message: "Code promotionnel activé !" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID requis." }, { status: 400 });
    }

    const updated = togglePromoStatus(id);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Code introuvable." }, { status: 404 });
    }

    return NextResponse.json({ success: true, promo: updated, message: "Statut mis à jour." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID requis." }, { status: 400 });
    }

    const deleted = deletePromo(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
