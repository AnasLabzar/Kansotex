import { NextResponse } from "next/server";
import { validatePromoCode } from "@/lib/promos";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { valid: false, message: "Code promotionnel requis." },
        { status: 400 }
      );
    }

    const result = validatePromoCode(code);
    return NextResponse.json(result, { status: result.valid ? 200 : 400 });
  } catch (error: any) {
    console.error("Promo validation error:", error);
    return NextResponse.json(
      { valid: false, message: "Erreur lors de la validation du code promo." },
      { status: 500 }
    );
  }
}
