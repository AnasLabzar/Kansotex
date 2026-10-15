import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [products, categories, variants, metadata, orders, users] = await Promise.all([
      db.orm.public.Product.all(),
      db.orm.public.Category.all(),
      db.orm.public.ProductVariant.all(),
      db.orm.public.ProductMetadata.all(),
      db.orm.public.Order.all(),
      db.orm.public.User.all(),
    ]);

    // Format rich products with their relations
    const enrichedProducts = products.map((prod: any) => {
      const prodMeta = metadata.find((m: any) => m.productId === prod.id) || null;
      const prodVariants = variants.filter((v: any) => v.productId === prod.id);
      const category = categories.find((c: any) => c.id === prod.categoryId) || null;
      const totalStock = prodVariants.reduce((sum: number, v: any) => sum + (v.stockLevel || 0), 0);

      return {
        id: prod.id,
        slug: prod.slug,
        nameFr: prod.nameFr,
        nameEn: prod.nameEn || prod.nameFr,
        descriptionFr: prod.descriptionFr,
        type: prod.type,
        isActive: prod.isActive ?? true,
        basePrice: prod.basePrice,
        image: prod.image || "/gallery/duvet_cover_linen_1791048696631.jpg",
        gallery: prod.gallery || [],
        categoryId: prod.categoryId,
        categoryName: category?.nameFr || "Tissus d'Ameublement",
        metadata: prodMeta,
        variants: prodVariants,
        stockLevel: totalStock > 0 ? totalStock : 120, // fallback meterage if no variants
        laize: prodMeta?.laize || 280,
        martindale: prodMeta?.martindale || 35000,
        composition: prodMeta?.composition || "100% Lin Français Lavé",
      };
    });

    // Format rich orders with customer details
    const enrichedOrders = orders.map((ord: any) => {
      const user = users.find((u: any) => u.id === ord.userId) || null;
      return {
        id: ord.id,
        orderNumber: ord.id.toUpperCase(),
        userId: ord.userId,
        status: ord.status,
        totalAmount: ord.totalAmount,
        createdAt: ord.createdAt,
        customerName: user ? `${user.firstName} ${user.lastName}` : "Client Particulier VIP",
        customerEmail: user?.email || "concierge@kansotex.com",
        customerCompany: user?.companyName || "Résidence Privée Marrakech",
        customerRole: user?.role || "CUSTOMER",
        customerSiret: user?.siret || "N/A",
        customerDiscount: user?.tradeDiscount || 0,
      };
    });

    return NextResponse.json({
      success: true,
      products: enrichedProducts,
      categories,
      orders: enrichedOrders,
      users,
    });
  } catch (error: any) {
    console.error("Error fetching admin data:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    switch (action) {
      case "UPDATE_ORDER_STATUS": {
        const { orderId, status } = payload;
        await db.orm.public.Order.where({ id: orderId }).update({
          status: status as any,
        });
        return NextResponse.json({ success: true, message: "Statut commande mis à jour avec succès." });
      }

      case "UPDATE_STOCK": {
        const { variantId, productId, newStock } = payload;
        if (variantId) {
          await db.orm.public.ProductVariant.where({ id: variantId }).update({
            stockLevel: parseFloat(newStock),
          });
        }
        return NextResponse.json({ success: true, message: "Stock mis à jour dans la base Postgres." });
      }

      case "TOGGLE_PRODUCT_STATUS": {
        const { productId, isActive } = payload;
        await db.orm.public.Product.where({ id: productId }).update({
          isActive: Boolean(isActive),
        });
        return NextResponse.json({ success: true, message: "Visibilité produit mise à jour." });
      }

      case "VERIFY_USER_PRO": {
        const { userId, isVerifiedPro, tradeDiscount } = payload;
        await db.orm.public.User.where({ id: userId }).update({
          isVerifiedPro: Boolean(isVerifiedPro),
          tradeDiscount: parseFloat(tradeDiscount) || 0.25,
        });
        return NextResponse.json({ success: true, message: "Statut pro et remise mis à jour." });
      }

      case "CREATE_PRODUCT": {
        const { nameFr, slug, categoryId, basePrice, type, image, composition, laize, martindale, stock } = payload;
        const prodId = `prod-${Date.now()}`;
        
        await db.orm.public.Product.create({
          id: prodId,
          slug: slug || nameFr.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          nameFr,
          nameEn: nameFr,
          type: type || "FABRIC_BY_METER",
          isActive: true,
          basePrice: parseFloat(basePrice) || 95,
          image: image || "/gallery/duvet_cover_linen_1791048696631.jpg",
          categoryId: categoryId || "cat-4",
        });

        // Add metadata
        await db.orm.public.ProductMetadata.create({
          id: `meta-${Date.now()}`,
          productId: prodId,
          laize: parseFloat(laize) || 280,
          martindale: parseInt(martindale) || 40000,
          composition: composition || "100% Lin Français Lavé",
          minOrderLength: 1.0,
          cutIncrement: 0.5,
        });

        // Add variant for stock tracking
        await db.orm.public.ProductVariant.create({
          id: `var-${Date.now()}`,
          productId: prodId,
          sku: `KTX-${prodId.slice(-4).toUpperCase()}`,
          colorNameFr: "Naturel",
          stockLevel: parseFloat(stock) || 150,
        });

        return NextResponse.json({ success: true, productId: prodId, message: "Produit créé avec succès dans la base Postgres!" });
      }

      case "CREATE_ORDER": {
        const { userId, totalAmount, status } = payload;
        const ordId = `cmd-2026-${Date.now().toString().slice(-4)}`;
        await db.orm.public.Order.create({
          id: ordId,
          userId: userId || null,
          status: status || "PROCESSING",
          totalAmount: parseFloat(totalAmount) || 1200,
        });
        return NextResponse.json({ success: true, orderId: ordId, message: "Commande enregistrée dans la base Postgres!" });
      }

      default:
        return NextResponse.json({ success: false, error: "Action non reconnue." }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Admin action error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
