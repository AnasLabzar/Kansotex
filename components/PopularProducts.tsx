import { db } from "@/prisma/db";
import { getSession } from "@/lib/session";
import { PopularProductsCarousel } from "./PopularProductsCarousel";

export async function PopularProducts() {
  // Fetch popular products (e.g. top 8 ordered by some logic, here we just take 8)
  const allProducts = await db.orm.public.Product.all();
  // Simply take the first 8 products for the carousel
  const products = allProducts.slice(0, 8);
  
  const session = await getSession();
  const isPro = session?.isPro || false;
  const discount = session?.tradeDiscount || 0;

  return <PopularProductsCarousel products={products} isPro={isPro} discount={discount} />;
}
