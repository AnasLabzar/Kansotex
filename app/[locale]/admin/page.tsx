import type { Metadata } from "next";
import { AdminDashboardView } from "@/components/AdminDashboardView";
import { AdminLoginView } from "@/components/AdminLoginView";
import { db } from "@/prisma/db";
import { getSession } from "@/lib/session";
import { getAllPromos } from "@/lib/promos";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Administration Générale & Gestion E-commerce — Kansotex Marrakech",
    description: "Portail d'administration de la Maison Kansotex : gestion des commandes, catalogue tissus, facturation, clients et atelier.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminPage() {
  // 1. Verify that the user has an active ADMIN session
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    return <AdminLoginView />;
  }

  let products: any[] = [];
  let categories: any[] = [];
  let variants: any[] = [];
  let metadata: any[] = [];
  let orders: any[] = [];
  let users: any[] = [];
  let promos: any[] = [];

  try {
    promos = getAllPromos();
  } catch (err) {
    console.warn("AdminPage: Error reading promos:", err);
  }

  try {
    const results = await Promise.all([
      db.orm.public.Product.all(),
      db.orm.public.Category.all(),
      db.orm.public.ProductVariant.all(),
      db.orm.public.ProductMetadata.all(),
      db.orm.public.Order.all(),
      db.orm.public.User.all(),
    ]);

    products = results[0] || [];
    categories = results[1] || [];
    variants = results[2] || [];
    metadata = results[3] || [];
    orders = results[4] || [];
    users = results[5] || [];
  } catch (err) {
    console.warn("AdminPage: Live DB error, using fallbacks:", err);
  }

  // Format rich products with category names and stock
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
      stockLevel: totalStock > 0 ? totalStock : 120,
      laize: prodMeta?.laize || 280,
      martindale: prodMeta?.martindale || 35000,
      composition: prodMeta?.composition || "100% Lin Français Lavé",
    };
  });

  // Format rich orders with user profiles
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

  return (
    <AdminDashboardView
      initialData={{
        products: enrichedProducts,
        categories,
        orders: enrichedOrders,
        users,
        promos,
        adminUser: session,
      }}
    />
  );
}
