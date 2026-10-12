import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import DevisEmail from "@/emails/DevisEmail";
import React from "react";

export async function POST(req: Request) {
  try {
    const { name, email, company, message, items } = await req.json();

    if (!name || !email || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Informations incomplètes pour le devis." },
        { status: 400 }
      );
    }

    const destination = process.env.EMAIL_DEVIS_DEST || "devis@kansotex.com";

    // Send the email to the devis address
    const result = await sendEmail({
      to: destination,
      replyTo: email,
      subject: `Demande de devis de ${company || name}`,
      react: React.createElement(DevisEmail, {
        name,
        email,
        company,
        message,
        items,
      }),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Devis API error:", error);
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}
