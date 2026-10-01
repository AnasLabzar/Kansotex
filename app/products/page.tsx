import { db } from "@/prisma/db";
import Link from "next/link";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/session";

// Server component to fetch products
async function ProductList() {
  const products = await db.orm.public.Product.all();
  
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-light text-neutral-400">Aucun produit trouvé.</h2>
      </div>
    );
  }

  const session = await getSession();
  const isPro = session?.isPro;
  const discount = session?.tradeDiscount || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product) => (
        <Link 
          key={product.id} 
          href={`/products/${product.slug}`}
          className="group block overflow-hidden rounded-2xl bg-neutral-50/50 backdrop-blur-sm border border-neutral-100 transition-all hover:shadow-2xl hover:shadow-neutral-200/50"
        >
          {/* Image */}
          <div className="aspect-[4/3] relative overflow-hidden bg-neutral-200">
            <img 
              src={product.image || "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png"}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-6">
            <h3 className="font-termina text-lg uppercase tracking-wider text-neutral-900 group-hover:text-[#1c1b19] transition-colors">
              {product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}
            </h3>
            <p className="mt-2 text-sm text-neutral-500 line-clamp-2 font-poppins">
              {product.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-light font-poppins text-sm flex items-center gap-2">
                {isPro ? (
                  <>
                    <span className="text-[#1c1b19] font-medium">
                      {(product.basePrice * (1 - discount)).toFixed(2)} € <span className="text-[10px] uppercase text-neutral-500">HT</span>
                    </span>
                    <span className="text-xs text-neutral-400 line-through">
                      {product.basePrice.toFixed(2)} €
                    </span>
                  </>
                ) : (
                  <span className="text-[#1c1b19]">
                    {product.basePrice.toFixed(2)} € <span className="text-neutral-500">/ {product.type === "FABRIC_BY_METER" ? "mètre" : "unité"}</span>
                  </span>
                )}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#f3eee6] text-[#1c1b19] selection:bg-[#1c1b19] selection:text-[#f3eee6]">
      <Header overlay={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <header className="mb-16 text-center">
          <h1 className="font-termina text-3xl md:text-5xl uppercase tracking-[0.2em] font-bold">
            NOTRE COLLECTION
          </h1>
          <p className="mt-4 text-lg text-[#1c1b19]/60 font-poppins max-w-2xl mx-auto">
            Découvrez notre sélection exclusive de tissus d'ameublement, outdoor et linge de maison premium.
          </p>
        </header>
        
        <Suspense fallback={<div className="animate-pulse h-96 bg-neutral-100 rounded-3xl" />}>
          <ProductList />
        </Suspense>
      </div>
    </main>
  );
}
