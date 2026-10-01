"use server";

import { db } from "@/prisma/db";
import { loginAsPro } from "./session";

// In a real app, you would use a mailer like Resend or SendGrid.
// Here we'll just log it to the server console.
export async function requestOtp(email: string) {
  try {
    // Generate a 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration to 15 minutes from now using String
    const expiresAt = new Date(Date.now() + 15 * 60000).toISOString();
    
    // Insert the new token using ORM
    await db.orm.public.VerificationToken.create({
      email,
      code,
      expiresAt, // Prisma ORM takes a Date object directly
    });

    console.log(`\n\n========================================`);
    console.log(`🔐 OTP CODE FOR ${email}: ${code}`);
    console.log(`========================================\n\n`);

    // Check if user exists
    const existingUser = await db.orm.public.User.where({ email }).first();

    return { 
      success: true, 
      userExists: !!existingUser,
      demoCode: code 
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
  const tokenRecord = await db.orm.public.VerificationToken.where({ email, code }).first();
  
  if (!tokenRecord) {
    return { success: false, error: "Code invalide." };
  }
  
  if (new Date(tokenRecord.expiresAt) < new Date()) {
    return { success: false, error: "Ce code a expiré." };
  }

  // Check if user exists
  const user = await db.orm.public.User.where({ email }).first();
  
  if (user) {
    // Log them in
    await loginAsPro(user.role, user.tradeDiscount);
    return { success: true, isNewUser: false };
  } else {
    // We need to create a new user. But we need their details first!
    // We return success, but indicate they need to complete signup
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
  // Create user
  // We'll give them 20% discount as default for Pro accounts in this demo
  const user = await db.orm.public.User.create({
    email,
    firstName: data.firstName,
    lastName: data.lastName,
    companyName: data.companyName,
    siret: data.siret,
    role: data.role,
    isVerifiedPro: true,
    tradeDiscount: 0.20,
  });

  await loginAsPro(user.role, user.tradeDiscount);
  return { success: true };
}
