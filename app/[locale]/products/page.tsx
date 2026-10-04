import { db } from "@/prisma/db";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/session";
import { ProductsView } from "./ProductsView";
import { Suspense } from "react";

// Server component to fetch products
async function ProductsDataWrapper() {
  const products = await db.orm.public.Product.all();
  const session = await getSession();
  const isPro = session?.isPro || false;
  const discount = session?.tradeDiscount || 0;

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
