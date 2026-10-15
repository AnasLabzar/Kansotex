import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import DevisEmail from "@/emails/DevisEmail";
import React from "react";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      company,
      clientProfile,
      services,
      meterage,
      timeline,
      samples,
      city,
      message,
      items,
    } = body;

    // Validation: name and email are mandatory
    if (!name || !email) {
      return NextResponse.json(
        { error: "Le nom et l'adresse email sont requis pour établir votre devis." },
        { status: 400 }
      );
    }

    // Must have either cart items OR a project message/services
    const hasItems = items && Array.isArray(items) && items.length > 0;
    const hasProjectInfo = (services && services.length > 0) || message || phone || clientProfile;

    if (!hasItems && !hasProjectInfo) {
      return NextResponse.json(
        { error: "Veuillez préciser votre demande ou sélectionner des étoffes pour le devis." },
        { status: 400 }
      );
    }

    const destination = process.env.EMAIL_DEVIS_DEST || "devis@kansotex.com";
    const subjectTitle = company ? `${company} (${name})` : name;
    const subjectPrefix = clientProfile ? `[Devis ${clientProfile}]` : "[Demande de Devis]";

    // Send the email to the devis address
    const result = await sendEmail({
      to: destination,
      replyTo: email,
      subject: `${subjectPrefix} ${subjectTitle} - Kansotex`,
      react: React.createElement(DevisEmail, {
        name,
        email,
        phone,
        company,
        clientProfile,
        services,
        meterage,
        timeline,
        samples,
        city,
        message,
        items: hasItems ? items : [],
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
      { error: "Erreur serveur lors de la transmission du devis." },
      { status: 500 }
    );
  }
}
