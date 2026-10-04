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
    
    // Next.js Server Components CANNOT serialize Prisma 8 Proxy objects to Client Components.
    // We MUST map them to plain JSON objects!
    products = allProducts.slice(0, 8).map(p => ({
      id: p.id,
      slug: p.slug,
      image: p.image,
      nameFr: p.nameFr,
      nameEn: p.nameEn,
      basePrice: p.basePrice
    }));
    
    const session = await getSession();
    isPro = session?.isPro || false;
    discount = session?.tradeDiscount || 0;
  } catch (err: any) {
    const dbUrl = process.env.DATABASE_URL || "MISSING";
    errorMsg = `DB_URL: ${dbUrl.substring(0, 30)}... \n\n` + err.message + "\n" + err.stack;
  }

  if (errorMsg) {
    return (
      <div style={{ padding: "2rem", backgroundColor: "white", color: "red", zIndex: 9999, position: "relative", wordBreak: "break-all" }}>
        <h2>PRISMA ERROR IN POPULAR PRODUCTS:</h2>
        <pre>{errorMsg}</pre>
      </div>
    );
  }

  // return <PopularProductsCarousel products={products} isPro={isPro} discount={discount} />;
  return (
    <div style={{ backgroundColor: "black", color: "white", padding: "2rem" }}>
      <h2>PRODUCTS LOADED SUCCESSFULLY</h2>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}


