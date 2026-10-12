import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, shipping, payment, items, totals } = body;

    // Generate luxurious Kansotex order reference
    const timestamp = Date.now().toString().slice(-4);
    const randomHex = Math.floor(Math.random() * 900 + 100);
    const orderId = `KTX-2026-${timestamp}${randomHex}`;

    console.log("New Kansotex Order Placed:", {
      orderId,
      customer: customer?.email,
      itemsCount: items?.length,
      total: totals?.finalTotal,
    });

    return NextResponse.json({
      success: true,
      orderId,
      createdAt: new Date().toISOString(),
      customer,
      items,
      totals,
    });
  } catch (error: any) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors du traitement de la commande." },
      { status: 500 }
    );
  }
}
