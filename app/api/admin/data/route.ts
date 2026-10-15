import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await db.orm.public.Product.all();
    const categories = await db.orm.public.Category.all();
    const orders = await db.orm.public.Order.all();
    const users = await db.orm.public.User.all();

    const variants = await db.orm.public.ProductVariant.all();
    const metadata = await db.orm.public.ProductMetadata.all();

    const orderProto = Object.getOwnPropertyNames(Object.getPrototypeOf(db.orm.public.Order));

    return NextResponse.json({
      success: true,
      counts: {
        products: products.length,
        categories: categories.length,
        variants: variants.length,
        metadata: metadata.length,
        orders: orders.length,
        orderProto,
        users: users.length,
      },
      productsSample: products.slice(0, 3),
      categoriesSample: categories.slice(0, 5),
      variantsSample: variants.slice(0, 3),
      usersSample: users.slice(0, 3),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
