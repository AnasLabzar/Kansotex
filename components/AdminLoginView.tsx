"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@kansotex.com");
  const [password, setPassword] = useState("KansotexAdmin2026!");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess("Authentification réussie. Accès autorisé à la Direction Kansotex...");
        setTimeout(() => {
          router.refresh();
        }, 600);
      } else {
        setError(data.error || "Identifiants invalides ou privilèges insuffisants.");
      }
    } catch (err: any) {
      setError("Erreur de connexion au serveur d'authentification.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetSelect = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword("KansotexAdmin2026!");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/30 text-amber-400 font-serif font-black text-2xl tracking-widest shadow-lg shadow-amber-500/5 mb-4">
            K
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-sans">
            Kansotex Marrakech
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-mono">
            Portail Direction & Administration E-commerce
          </p>
          <div className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Base de données PostgreSQL Connectée
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#161b22] border border-slate-700/60 rounded-2xl p-7 shadow-2xl shadow-black/60 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-semibold text-white">Connexion Sécurisée</h2>
              <p className="text-[11px] text-slate-400">Rôle requis : ADMINISTRATEUR</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/40 text-amber-400 text-[10px] font-mono font-bold tracking-wider uppercase">
              ADMIN ONLY
            </span>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-950/40 border border-red-500/40 rounded-lg text-xs text-red-300 flex items-start gap-2.5">
              <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-xs text-emerald-300 flex items-start gap-2.5">
              <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Administrateur
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kansotex.com"
                className="w-full bg-[#0d1117] border border-slate-700 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Mot de Passe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0d1117] border border-slate-700 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md shadow-amber-500/20 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Vérification des privilèges...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Accéder au Tableau de Bord Admin</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Verified Credentials Info Box */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2.5">
              Comptes Administrateur Actifs (Postgres Live) :
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handlePresetSelect("admin@kansotex.com")}
                className="w-full text-left p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/40 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-[11px] font-mono font-bold text-slate-200 group-hover:text-amber-400">
                    admin@kansotex.com
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Direction Générale • Rôle ADMIN vérifié
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900/60 px-2 py-1 rounded border border-slate-700 group-hover:border-amber-500/30">
                  Remplir
                </span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect("principeanas80@gmail.com")}
                className="w-full text-left p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/40 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-[11px] font-mono font-bold text-slate-200 group-hover:text-amber-400">
                    principeanas80@gmail.com
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Anas Labzar • Rôle ADMIN vérifié
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900/60 px-2 py-1 rounded border border-slate-700 group-hover:border-amber-500/30">
                  Remplir
                </span>
              </button>
            </div>

            <div className="mt-3 p-2 bg-slate-900/80 rounded border border-slate-800 text-[10px] text-slate-400 font-mono flex items-center justify-between">
              <span>Mot de passe commun :</span>
              <span className="text-amber-400 font-bold">KansotexAdmin2026!</span>
            </div>
          </div>
        </div>

        {/* Footer legal */}
        <p className="text-center text-[11px] text-slate-500 mt-6">
          Kansotex Marrakech SARL AU • Système E-Commerce Sécurisé v2.8
        </p>
      </div>
    </div>
  );
}
