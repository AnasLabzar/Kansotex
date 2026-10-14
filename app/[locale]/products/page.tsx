import { db } from "@/prisma/db";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/session";
import { ProductsView } from "./ProductsView";
import { Suspense } from "react";

// Server component to fetch products
async function ProductsDataWrapper() {
  let products: any[] = [];
  try {
    products = await db.orm.public.Product.all();
  } catch (err: any) {
    console.warn("ProductsPage: Live DB unavailable, using local catalog fallback:", err?.message || err);
    try {
      const { fakeProducts } = await import("@/prisma/fakeData");
      products = fakeProducts;
    } catch {}
  }

  let isPro = false;
  let discount = 0;
  try {
    const session = await getSession();
    isPro = session?.isPro || false;
    discount = session?.tradeDiscount || 0;
  } catch {}

  return <ProductsView products={products} isPro={isPro} discount={discount} />;
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-cream text-ink selection:bg-ink selection:text-cream pt-[70px]">
      <Header overlay={false} />
      
      <Suspense fallback={<div className="animate-pulse h-96 bg-cream" />}>
        <ProductsDataWrapper />
      </Suspense>
    </main>
  );
}
