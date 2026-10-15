import { NextResponse } from "next/server";
import { db } from "@/prisma/db";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export async function GET() {
  try {
    const adminPassword = "KansotexAdmin2026!";
    const hashedPassword = hashPassword(adminPassword);

    // 1. Check if admin@kansotex.com exists
    const existingAdmin = await db.orm.public.User.where({ email: "admin@kansotex.com" }).first();

    let adminResult;
    if (existingAdmin) {
      await db.orm.public.User.where({ email: "admin@kansotex.com" }).update({
        role: "ADMIN" as any,
        isVerifiedPro: true,
        tradeDiscount: 0.35,
        passwordHash: hashedPassword,
        firstName: "Directeur",
        lastName: "Général Kansotex",
        companyName: "Kansotex Marrakech — Siège & Ateliers",
      });
      adminResult = "Updated existing admin@kansotex.com";
    } else {
      await db.orm.public.User.create({
        email: "admin@kansotex.com",
        passwordHash: hashedPassword,
        firstName: "Directeur",
        lastName: "Général Kansotex",
        role: "ADMIN" as any,
        companyName: "Kansotex Marrakech — Siège & Ateliers",
        isVerifiedPro: true,
        tradeDiscount: 0.35,
        siret: "RC94821",
      });
      adminResult = "Created new admin@kansotex.com";
    }

    // 2. Also grant ADMIN role & password to principeanas80@gmail.com so Anas can also log in
    const anasUser = await db.orm.public.User.where({ email: "principeanas80@gmail.com" }).first();
    let anasResult = "Not found";
    if (anasUser) {
      await db.orm.public.User.where({ email: "principeanas80@gmail.com" }).update({
        role: "ADMIN" as any,
        isVerifiedPro: true,
        passwordHash: hashedPassword,
      });
      anasResult = "Updated principeanas80@gmail.com with ADMIN role & password";
    }

    const allUsers = await db.orm.public.User.all();

    return NextResponse.json({
      success: true,
      adminResult,
      anasResult,
      credentials: {
        adminAccount: {
          email: "admin@kansotex.com",
          password: adminPassword,
          role: "ADMIN",
          isVerifiedPro: true,
        },
        userAccountAdminAccess: {
          email: "principeanas80@gmail.com",
          password: adminPassword,
          role: "ADMIN",
          isVerifiedPro: true,
        },
      },
      currentUsersCount: allUsers.length,
      users: allUsers.map((u: any) => ({
        id: u.id,
        email: u.email,
        role: u.role,
        isVerifiedPro: u.isVerifiedPro,
        firstName: u.firstName,
        lastName: u.lastName,
        hasPassword: !!u.passwordHash,
      })),
    });
  } catch (error: any) {
    console.error("Admin setup error:", error);
    return NextResponse.json(
      { success: false, error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
