import { db } from "@/prisma/db";
import { notFound } from "next/navigation";
import AddToCartForm from "./AddToCartForm";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/session";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await db.orm.public.Product.where({ slug: params.slug })
    .include("variants", (v) => v.include("dyeLots"))
    .include("metadata")
    .first();

  if (!product) {
    notFound();
  }

  const session = await getSession();
  const isPro = session?.isPro;
  const discount = session?.tradeDiscount || 0;
  
  // Calcul du prix (HT si Pro)
  const finalPrice = isPro ? product.basePrice * (1 - discount) : product.basePrice;

  return (
    <main className="min-h-screen bg-[#f3eee6] text-[#1c1b19] selection:bg-[#1c1b19] selection:text-[#f3eee6]">
      <Header overlay={false} />
      <div className="flex flex-col lg:flex-row min-h-screen pt-24 lg:pt-0">
        
        {/* Left Side: Product Imagery (Sticky on Desktop) */}
        <div className="w-full lg:w-1/2 bg-neutral-200 relative min-h-[50vh] lg:min-h-screen lg:sticky lg:top-0">
          <img 
            src={product.image || "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png"}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Right Side: Product Details & Cart Logic */}
        <div className="w-full lg:w-1/2 px-6 pb-12 pt-12 lg:px-24 lg:pt-32 lg:pb-32 overflow-y-auto">
          <div className="max-w-xl mx-auto lg:mx-0">
            
            {/* Breadcrumbs */}
            <nav className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 font-termina mb-8 flex items-center space-x-2">
              <a href="/products" className="hover:text-neutral-900 transition-colors">Boutique</a>
              <span>/</span>
              <span className="text-neutral-900">{product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}</span>
            </nav>

            <h1 className="font-termina text-3xl lg:text-5xl uppercase tracking-[0.2em] font-bold text-[#1c1b19] mb-6">
              {product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}
            </h1>
            
            <p className="font-poppins text-2xl text-neutral-900 mb-10 flex items-center gap-3">
              {isPro ? (
                <>
                  <span className="text-[#1c1b19] font-semibold flex items-center gap-1">
                    {finalPrice.toFixed(2)} € <span className="text-xs uppercase text-neutral-500">HT</span>
                  </span>
                  <span className="text-sm text-neutral-400 line-through">
                    {product.basePrice.toFixed(2)} €
                  </span>
                  <span className="text-xs ml-2 px-2 py-1 bg-[#1c1b19] text-[#f3eee6] rounded-sm font-termina tracking-widest uppercase">
                    PRO -{discount * 100}%
                  </span>
                </>
              ) : (
                <>
                  {product.basePrice.toFixed(2)} € 
                </>
              )}
              
              <span className="text-sm text-neutral-500 font-light ml-auto">
                / {product.type === "FABRIC_BY_METER" ? "mètre" : "unité"}
              </span>
            </p>

            <p className="text-lg text-neutral-600 font-poppins font-light leading-relaxed mb-12">
              {product.description}
            </p>

            {/* Client Component for Cart Engine */}
            <AddToCartForm product={{...product, basePrice: finalPrice}} />

            {/* Specifications Section */}
            {product.metadata && (
              <div className="mt-20 pt-12 border-t border-neutral-200">
                <h3 className="font-termina text-sm uppercase tracking-widest text-neutral-900 mb-8 flex items-center gap-4">
                  Spécifications 
                  <span className="h-px flex-1 bg-neutral-200"></span>
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-sm font-poppins">
                  {product.metadata.composition && (
                    <div className="pb-4 border-b border-neutral-100">
                      <dt className="text-neutral-400 uppercase tracking-wider text-xs mb-1">Composition</dt>
                      <dd className="text-neutral-900">{product.metadata.composition}</dd>
                    </div>
                  )}
                  {product.metadata.laize && (
                    <div className="pb-4 border-b border-neutral-100">
                      <dt className="text-neutral-400 uppercase tracking-wider text-xs mb-1">Laize (Largeur)</dt>
                      <dd className="text-neutral-900">{product.metadata.laize} cm</dd>
                    </div>
                  )}
                  {product.metadata.martindale && (
                    <div className="pb-4 border-b border-neutral-100">
                      <dt className="text-neutral-400 uppercase tracking-wider text-xs mb-1">Martindale</dt>
                      <dd className="text-neutral-900">{product.metadata.martindale.toLocaleString()} tours</dd>
                    </div>
                  )}
                  {product.metadata.weight && (
                    <div className="pb-4 border-b border-neutral-100">
                      <dt className="text-neutral-400 uppercase tracking-wider text-xs mb-1">Poids</dt>
                      <dd className="text-neutral-900">{product.metadata.weight} g/m²</dd>
                    </div>
                  )}
                  {(product.metadata.raccordV! > 0 || product.metadata.raccordH! > 0) && (
                    <div className="pb-4 border-b border-neutral-100">
                      <dt className="text-neutral-400 uppercase tracking-wider text-xs mb-1">Raccord</dt>
                      <dd className="text-neutral-900">
                        V: {product.metadata.raccordV}cm / H: {product.metadata.raccordH}cm
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </main>
  );
}
