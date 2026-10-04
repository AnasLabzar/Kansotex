import { Header } from "@/components/Header";
import ProForm from "./ProForm";

export default function ProPage() {
  return (
    <main className="min-h-screen bg-[#1c1b19] text-[#f3eee6] selection:bg-[#f3eee6] selection:text-[#1c1b19]">
      {/* 
        On force un fond sombre pour cette page premium 
        L'overlay du Header doit s'adapter s'il était conçu pour un fond clair
      */}
      <Header overlay={false} />
      
      <div className="flex flex-col lg:flex-row min-h-screen pt-24 lg:pt-0">
        
        {/* Left Side: Editorial */}
        <div className="w-full lg:w-1/2 p-6 lg:p-24 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png')] bg-cover bg-center opacity-20 grayscale" />
          
          <div className="relative z-10 max-w-lg">
            <h1 className="font-termina text-3xl lg:text-5xl uppercase tracking-[0.2em] font-bold mb-8">
              L'Espace Professionnel
            </h1>
            <p className="font-poppins text-lg text-[#f3eee6]/80 font-light leading-relaxed mb-8">
              Kansotex accompagne les architectes, décorateurs d'intérieur et professionnels de l'hôtellerie dans la réalisation de leurs projets d'exception.
            </p>
            <ul className="space-y-4 font-poppins text-[#f3eee6]/70 font-light text-sm">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f3eee6]" />
                Tarifs professionnels préférentiels (jusqu'à -30%)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f3eee6]" />
                Service de commande d'échantillons prioritaires
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f3eee6]" />
                Accès aux spécifications techniques détaillées
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f3eee6]" />
                Chiffrage sur-mesure pour la confection
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-6 lg:p-24 bg-[#1c1b19] flex items-center justify-center border-l border-[#f3eee6]/10">
          <div className="w-full max-w-md">
            <ProForm />
          </div>
        </div>

      </div>
    </main>
  );
}
