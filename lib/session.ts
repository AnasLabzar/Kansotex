"use server";

import { cookies } from "next/headers";

export type SessionData = {
  isPro: boolean;
  role: "CUSTOMER" | "ARCHITECT" | "DECORATOR" | "HOTEL" | "ADMIN";
  tradeDiscount: number; // e.g., 0.20 for 20%
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

export async function loginAsPro(role: SessionData["role"], discount: number) {
  const session: SessionData = {
    isPro: true,
    role,
    tradeDiscount: discount,
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
