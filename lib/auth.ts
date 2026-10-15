"use server";

import React from "react";
import { db } from "@/prisma/db";
import { loginAsPro } from "./session";
import { sendEmail } from "./mailer";
import { OtpEmail } from "@/emails/OtpEmail";

export async function requestOtp(email: string) {
  try {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Generate a secure 6-digit OTP code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 2. Set expiration to 15 minutes from now
    const expiresAt = new Date(Date.now() + 15 * 60000).toISOString();
    
    // 3. Store the verification token in database
    await db.orm.public.VerificationToken.create({
      email: cleanEmail,
      code,
      expiresAt,
    });

    console.log(`\n\n========================================`);
    console.log(`🔐 OTP CODE GENERATED FOR ${cleanEmail}: ${code}`);
    console.log(`========================================\n\n`);

    // 4. Format current date & time in Morocco / Casablanca time
    const now = new Date();
    const dateFormatted = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Africa/Casablanca",
    }).format(now);

    // 5. Send real, professional email with OTP table & security details
    const emailRes = await sendEmail({
      to: cleanEmail,
      subject: `Votre code de sécurité Kansotex : ${code}`,
      react: React.createElement(OtpEmail, {
        email: cleanEmail,
        code,
        requestedAt: `${dateFormatted} (Marrakech)`,
        expiresInMinutes: 15,
      }),
    });

    console.log(`📧 OTP Email dispatch status to ${cleanEmail}:`, emailRes);

    // Check if user already exists
    const existingUser = await db.orm.public.User.where({ email: cleanEmail }).first();

    return { 
      success: true, 
      userExists: !!existingUser,
      demoCode: code,
      emailSent: emailRes.success,
    };
  } catch (error: any) {
    console.error("OTP Error:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
}

export async function verifyOtpAndLogin(email: string, code: string) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanCode = code.trim();

  const tokenRecord = await db.orm.public.VerificationToken.where({ email: cleanEmail, code: cleanCode }).first();
  
  if (!tokenRecord) {
    return { success: false, error: "Code invalide. Veuillez vérifier votre email." };
  }
  
  if (new Date(tokenRecord.expiresAt) < new Date()) {
    return { success: false, error: "Ce code a expiré. Veuillez demander un nouveau code." };
  }

  // Delete used token to prevent replay
  try {
    await db.orm.public.VerificationToken.where({ id: tokenRecord.id }).delete();
  } catch {
    // Non-blocking
  }

  // Check if user exists
  const user = await db.orm.public.User.where({ email: cleanEmail }).first();
  
  if (user) {
    // Log them in
    await loginAsPro(user.role, user.tradeDiscount, {
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || undefined,
      companyName: user.companyName || undefined,
      email: user.email,
    });
    return { success: true, isNewUser: false };
  } else {
    // Need to create new user profile
    return { success: true, isNewUser: true };
  }
}

export async function completeSignupAndLogin(
  email: string,
  data: {
    firstName: string;
    lastName: string;
    companyName: string;
    siret: string;
    role: "ARCHITECT" | "DECORATOR" | "HOTEL";
  }
) {
  const cleanEmail = email.trim().toLowerCase();

  // Create user with standard 20% trade discount
  const user = await db.orm.public.User.create({
    email: cleanEmail,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    companyName: data.companyName.trim(),
    siret: data.siret.trim(),
    role: data.role,
    isVerifiedPro: true,
    tradeDiscount: 0.20,
  });

  await loginAsPro(user.role, user.tradeDiscount, {
    name: `${data.firstName.trim()} ${data.lastName.trim()}`,
    companyName: data.companyName.trim(),
    email: cleanEmail,
  });
  return { success: true };
}
