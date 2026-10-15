import { NextResponse } from "next/server";
import { db } from "@/prisma/db";
import { verifyPassword } from "@/lib/crypto-auth";
import { getSession, loginAsAdmin, logout } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ authenticated: false });
    }
    return NextResponse.json({ authenticated: true, user: session });
  } catch (error: any) {
    return NextResponse.json({ authenticated: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, password } = body;

    if (action === "logout") {
      await logout();
      return NextResponse.json({ success: true, message: "Déconnexion réussie." });
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Veuillez renseigner votre email et mot de passe." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await db.orm.public.User.where({ email: cleanEmail }).first();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Identifiants incorrects ou compte introuvable." },
        { status: 401 }
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Accès refusé. Ce compte ne possède pas les privilèges ADMINISTRATEUR." },
        { status: 403 }
      );
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Mot de passe incorrect." },
        { status: 401 }
      );
    }

    // Set Admin session cookie
    await loginAsAdmin({
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || "Direction Kansotex",
      companyName: user.companyName || "Kansotex Marrakech — Siège",
      email: user.email,
    });

    return NextResponse.json({
      success: true,
      message: "Connexion administrateur réussie.",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isVerifiedPro: user.isVerifiedPro,
      },
    });
  } catch (error: any) {
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Erreur interne" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  await logout();
  return NextResponse.json({ success: true, message: "Session terminée." });
}
