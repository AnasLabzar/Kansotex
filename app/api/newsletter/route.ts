import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import NewsletterEmail from "@/emails/NewsletterEmail";
import React from "react";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "L'email est requis." },
        { status: 400 }
      );
    }

    // 1. You might want to save the email to the database here using Prisma

    // 2. Send the Welcome email to the customer
    const result = await sendEmail({
      to: email, // Send TO the user who just subscribed
      subject: "Bienvenue dans l'univers Kansotex",
      react: React.createElement(NewsletterEmail, { email }),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}
