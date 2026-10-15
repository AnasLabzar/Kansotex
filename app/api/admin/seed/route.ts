import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const existingOrders = await db.orm.public.Order.all();
    if (existingOrders.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Orders already seeded",
        count: existingOrders.length,
      });
    }

    const users = await db.orm.public.User.all();
    const variants = await db.orm.public.ProductVariant.all();

    const anasUser = users.find((u: any) => u.email === "principeanas80@gmail.com") || users[0];
    const hotelUser = users.find((u: any) => u.email === "principeans@gmail.com") || users[1] || users[0];

    const sampleOrders = [
      {
        id: "cmd-2026-108",
        userId: anasUser?.id || null,
        status: "PROCESSING", // En coupe atelier
        totalAmount: 5930.0,
      },
      {
        id: "cmd-2026-107",
        userId: hotelUser?.id || null,
        status: "DELIVERED",
        totalAmount: 10339.0,
      },
      {
        id: "cmd-2026-106",
        userId: anasUser?.id || null,
        status: "PROCESSING",
        totalAmount: 4485.0,
      },
      {
        id: "cmd-2026-105",
        userId: null,
        status: "SHIPPED",
        totalAmount: 1420.0,
      },
      {
        id: "cmd-2026-104",
        userId: hotelUser?.id || null,
        status: "PENDING",
        totalAmount: 3573.0,
      },
      {
        id: "cmd-2026-103",
        userId: hotelUser?.id || null,
        status: "PAID",
        totalAmount: 2432.0,
      },
    ];

    for (const ord of sampleOrders) {
      await db.orm.public.Order.create({
        id: ord.id,
        userId: ord.userId,
        status: ord.status as any,
        totalAmount: ord.totalAmount,
      });
    }

    const updatedOrders = await db.orm.public.Order.all();

    return NextResponse.json({
      success: true,
      message: "Successfully seeded initial orders in Supabase Postgres!",
      count: updatedOrders.length,
      orders: updatedOrders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
