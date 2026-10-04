"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loginAsPro, logout } from "@/lib/session";
import { requestOtp, verifyOtpAndLogin, completeSignupAndLogin } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ProForm() {
  const router = useRouter();
  
  // flow states: 'email' -> 'otp' -> 'signup' (only if new user)
  const [step, setStep] = useState<"email" | "otp" | "signup">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form data
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    siret: "",
    role: "ARCHITECT" as "ARCHITECT" | "DECORATOR" | "HOTEL",
  });

  // Pour la démo, on simule une connexion immédiate au clic sur un bouton spécial
  const handleDemoLogin = async (role: "ARCHITECT" | "DECORATOR", discount: number) => {
    setIsLoading(true);
    await loginAsPro(role, discount);
    window.location.href = "/products";
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const res = await requestOtp(email);
      if (res.success) {
        setIsNewUser(!res.userExists);
        setStep("otp");
      }
    } catch (err) {
      setError("Erreur lors de l'envoi du code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;

    setIsLoading(true);
    setError(null);
    try {
      const res = await verifyOtpAndLogin(email, otpCode);
      if (res.success) {
        if (res.isNewUser) {
          // Pass to step 3 to complete profile
          setStep("signup");
        } else {
          // Logged in successfully!
          window.location.href = "/products";
        }
      } else {
        setError(res.error || "Code invalide.");
      }
    } catch (err) {
      setError("Erreur de vérification.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.companyName || !signupData.siret || !signupData.firstName || !signupData.lastName) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await completeSignupAndLogin(email, signupData);
      if (res.success) {
        window.location.href = "/products";
      }
    } catch (err) {
      setError("Erreur lors de la création du compte.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      
      {/* Dev Badge pour la démo */}
      <div className="absolute -top-12 right-0 flex gap-2">
        <button 
          onClick={() => handleDemoLogin("ARCHITECT", 0.20)}
          className="text-[9px] uppercase tracking-wider font-termina bg-[#f3eee6]/10 hover:bg-[#f3eee6]/20 text-[#f3eee6] px-3 py-1.5 rounded border border-[#f3eee6]/20 transition-colors"
        >
          Démo: Login Rapide Architecte
        </button>
      </div>

      <div className="mb-10">
        <h2 className="font-termina text-xl uppercase tracking-[0.15em] mb-2">Espace Professionnel</h2>
        <p className="font-poppins text-sm text-[#f3eee6]/60 font-light">
          {step === "email" && "Connectez-vous ou créez un compte pro avec votre adresse email."}
          {step === "otp" && `Un code a été envoyé à ${email}.`}
          {step === "signup" && "Complétez votre profil d'entreprise pour finaliser l'inscription."}
        </p>
      </div>

      <div className="space-y-6 font-poppins min-h-[300px]">
        
        {error && (
          <div className="bg-red-900/20 text-red-400 border border-red-900/50 p-4 text-xs">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {step === "email" && (
            <motion.form 
              key="step-email"
              onSubmit={handleRequestOtp}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#f3eee6]/60 mb-2">Email professionnel *</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#f3eee6]/20 py-3 px-0 text-[#f3eee6] focus:border-[#f3eee6] focus:outline-none transition-colors"
                  placeholder="contact@studio.com"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full mt-8 py-4 bg-[#f3eee6] text-[#1c1b19] font-termina text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50"
              >
                {isLoading ? "Envoi..." : "Continuer"}
              </button>
            </motion.form>
          )}

          {step === "otp" && (
            <motion.form 
              key="step-otp"
              onSubmit={handleVerifyOtp}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#f3eee6]/60 mb-2">Code de sécurité à 6 chiffres *</label>
                <input 
                  type="text" 
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-transparent border-b border-[#f3eee6]/20 py-3 px-0 text-[#f3eee6] text-2xl tracking-[0.5em] focus:border-[#f3eee6] focus:outline-none transition-colors"
                  placeholder="000000"
                  required
                />
                <p className="text-[10px] text-neutral-500 mt-3">
                  (Regardez dans le terminal de développement pour voir le code OTP généré !)
                </p>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  type="button"
                  onClick={() => setStep("email")}
                  className="px-6 py-4 border border-[#f3eee6]/20 text-[#f3eee6] font-termina text-[11px] uppercase tracking-[0.2em] hover:bg-[#f3eee6]/5 transition-colors"
                >
                  Modifier email
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-4 bg-[#f3eee6] text-[#1c1b19] font-termina text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Vérification..." : "Valider"}
                </button>
              </div>
            </motion.form>
          )}

          {step === "signup" && (
            <motion.form 
              key="step-signup"
              onSubmit={handleCompleteSignup}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#f3eee6]/60 mb-2">Prénom *</label>
                  <input 
                    type="text"
                    value={signupData.firstName}
                    onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                    className="w-full bg-transparent border-b border-[#f3eee6]/20 py-3 px-0 text-[#f3eee6] focus:border-[#f3eee6] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#f3eee6]/60 mb-2">Nom *</label>
                  <input 
                    type="text" 
                    value={signupData.lastName}
                    onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                    className="w-full bg-transparent border-b border-[#f3eee6]/20 py-3 px-0 text-[#f3eee6] focus:border-[#f3eee6] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#f3eee6]/60 mb-2">Nom de l'entreprise *</label>
                <input 
                  type="text" 
                  value={signupData.companyName}
                  onChange={(e) => setSignupData({...signupData, companyName: e.target.value})}
                  className="w-full bg-transparent border-b border-[#f3eee6]/20 py-3 px-0 text-[#f3eee6] focus:border-[#f3eee6] focus:outline-none transition-colors"
                  placeholder="Studio Architecture..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#f3eee6]/60 mb-2">Numéro de SIRET *</label>
                  <input 
                    type="text" 
                    value={signupData.siret}
                    onChange={(e) => setSignupData({...signupData, siret: e.target.value})}
                    className="w-full bg-transparent border-b border-[#f3eee6]/20 py-3 px-0 text-[#f3eee6] focus:border-[#f3eee6] focus:outline-none transition-colors"
                    placeholder="123 456 789"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#f3eee6]/60 mb-2">Activité *</label>
                  <select 
                    value={signupData.role}
                    onChange={(e) => setSignupData({...signupData, role: e.target.value as any})}
                    className="w-full bg-transparent border-b border-[#f3eee6]/20 py-3 px-0 text-[#f3eee6] focus:border-[#f3eee6] focus:outline-none transition-colors"
                  >
                    <option value="ARCHITECT" className="bg-[#1c1b19]">Architecte</option>
                    <option value="DECORATOR" className="bg-[#1c1b19]">Décorateur</option>
                    <option value="HOTEL" className="bg-[#1c1b19]">Hôtellerie</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full mt-8 py-4 bg-[#f3eee6] text-[#1c1b19] font-termina text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50"
              >
                {isLoading ? "Création..." : "Terminer mon profil"}
              </button>
            </motion.form>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
