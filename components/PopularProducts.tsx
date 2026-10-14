import { db } from "@/prisma/db";
import { getSession } from "@/lib/session";
import { PopularProductsCarousel } from "./PopularProductsCarousel";

export async function PopularProducts() {
  let products: any[] = [];
  let isPro = false;
  let discount = 0;
  let errorMsg = null;

  try {
    // Fetch popular products
    const allProducts = await db.orm.public.Product.all();
    
    products = allProducts.slice(0, 8).map(p => ({
      id: p.id,
      slug: p.slug,
      image: p.image,
      nameFr: p.nameFr,
      nameEn: p.nameEn,
      basePrice: p.basePrice,
      type: p.type,
      categoryId: p.categoryId,
      metadata: (p as any).metadata,
    }));
  } catch (err: any) {
    console.warn("PopularProducts: Live DB unavailable, using local catalog fallback:", err?.message || err);
    try {
      const { fakeProducts } = await import("@/prisma/fakeData");
      products = fakeProducts.slice(0, 8).map(p => ({
        id: p.id,
        slug: p.slug,
        image: p.image,
        nameFr: p.nameFr,
        nameEn: p.nameEn,
        basePrice: p.basePrice,
        type: p.type,
        categoryId: p.categoryId,
        metadata: (p as any).metadata,
      }));
    } catch {}
  }

  try {
    const session = await getSession();
    isPro = session?.isPro || false;
    discount = session?.tradeDiscount || 0;
  } catch {}

  return <PopularProductsCarousel products={products} isPro={isPro} discount={discount} />;
}


