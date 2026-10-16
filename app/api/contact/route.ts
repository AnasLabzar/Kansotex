import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import ContactEmail from "@/emails/ContactEmail";
import { verifyAntiBotProtection } from "@/lib/antispam";
import React from "react";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      subject,
      message,
      projectDescription,
      captchaToken,
      _hp_website,
      _hp_confirm,
      _hp_timestamp,
    } = body;

    // Anti-Bot & Spam Verification (Honeypot + HMAC Challenge + Timing + Rate Limit)
    const botCheck = await verifyAntiBotProtection(
      { captchaToken, _hp_website, _hp_confirm, _hp_timestamp },
      req
    );

    if (!botCheck.success) {
      return NextResponse.json(
        { error: botCheck.error || "Échec de la validation anti-robot." },
        { status: 403 }
      );
    }

    const finalMessage = (message || projectDescription || "").trim();

    if (!name || !email || !finalMessage) {
      return NextResponse.json(
        { error: "Le nom, l'email et le message sont requis." },
        { status: 400 }
      );
    }

    const destination = process.env.EMAIL_CONTACT_DEST || "contact@kansotex.com";

    // Send the email to the contact address
    const result = await sendEmail({
      to: destination,
      replyTo: email, // So Kansotex can click 'Reply' and reply directly to the customer
      subject: `[Contact Kansotex] ${subject || "Nouveau message"} - ${name}`,
      react: React.createElement(ContactEmail, {
        name,
        email,
        phone,
        subject,
        message: finalMessage,
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
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}

