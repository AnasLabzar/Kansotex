"use server";

import { cookies } from "next/headers";

export type SessionData = {
  isPro: boolean;
  role: "CUSTOMER" | "ARCHITECT" | "DECORATOR" | "HOTEL" | "ADMIN";
  tradeDiscount: number; // e.g., 0.20 for 20%
  name?: string;
  companyName?: string;
  email?: string;
  city?: string;
  phone?: string;
};

const SESSION_COOKIE_NAME = "kansotex_session";

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionString = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (!sessionString) return null;
  
  try {
    return JSON.parse(sessionString) as SessionData;
  } catch {
    return null;
  }
}

export async function loginAsPro(
  role: SessionData["role"],
  discount: number,
  extra?: {
    name?: string;
    companyName?: string;
    email?: string;
    city?: string;
    phone?: string;
  }
) {
  const session: SessionData = {
    isPro: true,
    role,
    tradeDiscount: discount,
    name: extra?.name || (role === "ARCHITECT" ? "Karim Benjelloun" : role === "HOTEL" ? "Directeur d'Exploitation" : "Studio Interior"),
    companyName: extra?.companyName || (role === "ARCHITECT" ? "Studio KB Architecture & Design" : role === "HOTEL" ? "Palais & Riad Atlas Luxury" : "Atelier Déco Marrakech"),
    email: extra?.email || "architecte@kansotex-partner.com",
    city: extra?.city || "Marrakech / Casablanca",
    phone: extra?.phone || "+212 6 61 00 00 00",
  };
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function loginAsAdmin(extra?: {
  name?: string;
  companyName?: string;
  email?: string;
  city?: string;
  phone?: string;
}) {
  const session: SessionData = {
    isPro: true,
    role: "ADMIN",
    tradeDiscount: 0.35,
    name: extra?.name || "Direction Générale Kansotex",
    companyName: extra?.companyName || "Kansotex Maroc — Siège & Ateliers",
    email: extra?.email || "admin@kansotex.com",
    city: extra?.city || "Marrakech",
    phone: extra?.phone || "+212 5 24 33 00 00",
  };
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
