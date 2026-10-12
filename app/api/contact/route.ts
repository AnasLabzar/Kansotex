import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import ContactEmail from "@/emails/ContactEmail";
import React from "react";

export async function POST(req: Request) {
  try {
    const { name, email, projectDescription } = await req.json();

    if (!name || !email || !projectDescription) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    const destination = process.env.EMAIL_CONTACT_DEST || "contact@kansotex.com";

    // Send the email to the contact address
    const result = await sendEmail({
      to: destination,
      replyTo: email, // So Kansotex can click 'Reply' and reply directly to the customer
      subject: `Nouveau Contact de ${name}`,
      react: React.createElement(ContactEmail, {
        name,
        email,
        projectDescription,
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
