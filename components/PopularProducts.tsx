import { db } from "@/prisma/db";
import { getSession } from "@/lib/session";
import { PopularProductsCarousel } from "./PopularProductsCarousel";

export async function PopularProducts() {
  let products: any[] = [];
  let isPro = false;
  let discount = 0;
  let errorMsg = null;

  try {
    // Fetch popular products (e.g. top 8 ordered by some logic, here we just take 8)
    const allProducts = await db.orm.public.Product.all();
    // Simply take the first 8 products for the carousel
    products = allProducts.slice(0, 8);
    
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

  return <PopularProductsCarousel products={products} isPro={isPro} discount={discount} />;
}


