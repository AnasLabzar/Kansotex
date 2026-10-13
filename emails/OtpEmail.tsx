import * as React from "react";
import { Text, Heading, Hr, Section, Row, Column } from "@react-email/components";
import { BaseTemplate } from "./BaseTemplate";

export interface OtpEmailProps {
  email?: string;
  code?: string;
  requestedAt?: string;
  expiresInMinutes?: number;
}

export const OtpEmail = ({
  email = "architecte@studio.com",
  code = "384920",
  requestedAt = "13 Octobre 2026 à 21:38 (UTC+1)",
  expiresInMinutes = 15,
}: OtpEmailProps) => {
  const formattedCode = code.length === 6 ? `${code.slice(0, 3)} ${code.slice(3)}` : code;

  return (
    <BaseTemplate previewText={`Votre code de sécurité Kansotex : ${code} (Valide ${expiresInMinutes} min)`}>
      {/* Title */}
      <Heading className="text-brand text-[20px] font-semibold uppercase tracking-[0.18em] text-center mb-[10px] m-0">
        Portail Sécurisé Pro
      </Heading>
      
      <Text className="text-gold text-[12px] uppercase tracking-[0.25em] font-medium text-center m-0 mb-[30px]">
        Espace Architecture &amp; Prescripteurs B2B
      </Text>

      {/* Intro Message */}
      <Text className="text-brand/80 text-[15px] leading-[1.8] font-light mb-[20px]">
        Bonjour,
      </Text>
      
      <Text className="text-brand/80 text-[15px] leading-[1.8] font-light mb-[32px]">
        Vous avez demandé un code d&apos;authentification à usage unique pour accéder à votre <strong>Espace Professionnel Kansotex</strong> (tarifs éditeur jusqu&apos;à -30%, nuanciers techniques offerts et suivi direct atelier à Marrakech).
      </Text>

      {/* The Hero OTP Box - Luxury Dark Card */}
      <Section style={{
        backgroundColor: "#1c1b19",
        borderRadius: "8px",
        padding: "36px 24px",
        textAlign: "center",
        marginBottom: "35px",
        border: "1px solid #2d2b27"
      }}>
        <Text style={{
          color: "#c5a880",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.28em",
          fontWeight: 600,
          margin: "0 0 14px 0",
          fontFamily: "Inter, sans-serif"
        }}>
          Code de Sécurité à Usage Unique
        </Text>
        
        <Text style={{
          color: "#faf8f5",
          fontSize: "40px",
          fontWeight: 700,
          letterSpacing: "0.28em",
          margin: "0 0 14px 0",
          fontFamily: "Courier, monospace"
        }}>
          {formattedCode}
        </Text>

        <Text style={{
          color: "#a49a8d",
          fontSize: "12px",
          fontWeight: 400,
          margin: 0,
          fontFamily: "Inter, sans-serif"
        }}>
          Valide pendant <strong>{expiresInMinutes} minutes</strong> · Ne le communiquez à personne
        </Text>
      </Section>

      {/* Professional Information Table Header */}
      <Text className="text-brand text-[13px] uppercase tracking-[0.16em] font-semibold mb-[14px] m-0">
        Récapitulatif de la Demande d&apos;Accès Pro
      </Text>

      {/* Professional Information Table */}
      <Section style={{
        backgroundColor: "#fcfbf9",
        border: "1px solid #e5e0d8",
        padding: "24px 28px",
        marginBottom: "30px",
        borderRadius: "6px"
      }}>
        {/* Row 1: Destinataire */}
        <Row style={{ marginBottom: "14px", borderBottom: "1px solid #f0ebe1", paddingBottom: "12px" }}>
          <Column style={{ width: "42%" }}>
            <Text style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8c8275", margin: 0, fontWeight: 600 }}>
              Email Destinataire
            </Text>
          </Column>
          <Column style={{ width: "58%" }}>
            <Text style={{ fontSize: "14px", color: "#1c1b19", margin: 0, fontWeight: 600 }}>
              {email}
            </Text>
          </Column>
        </Row>

        {/* Row 2: Type de compte */}
        <Row style={{ marginBottom: "14px", borderBottom: "1px solid #f0ebe1", paddingBottom: "12px" }}>
          <Column style={{ width: "42%" }}>
            <Text style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8c8275", margin: 0, fontWeight: 600 }}>
              Profil d&apos;Accès
            </Text>
          </Column>
          <Column style={{ width: "58%" }}>
            <Text style={{ fontSize: "13px", color: "#1c1b19", margin: 0, fontWeight: 500 }}>
              Prescripteur B2B (Architecte / Décorateur / Hôtelier)
            </Text>
          </Column>
        </Row>

        {/* Row 3: Remise */}
        <Row style={{ marginBottom: "14px", borderBottom: "1px solid #f0ebe1", paddingBottom: "12px" }}>
          <Column style={{ width: "42%" }}>
            <Text style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8c8275", margin: 0, fontWeight: 600 }}>
              Barème Tarifaire
            </Text>
          </Column>
          <Column style={{ width: "58%" }}>
            <Text style={{ fontSize: "13px", color: "#1c1b19", margin: 0, fontWeight: 600 }}>
              Tarifs Éditeur Directs (-20% à -30%)
            </Text>
          </Column>
        </Row>

        {/* Row 4: Horodatage */}
        <Row style={{ marginBottom: "14px", borderBottom: "1px solid #f0ebe1", paddingBottom: "12px" }}>
          <Column style={{ width: "42%" }}>
            <Text style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8c8275", margin: 0, fontWeight: 600 }}>
              Date &amp; Heure
            </Text>
          </Column>
          <Column style={{ width: "58%" }}>
            <Text style={{ fontSize: "13px", color: "#1c1b19", margin: 0, fontWeight: 400 }}>
              {requestedAt}
            </Text>
          </Column>
        </Row>

        {/* Row 5: Validité */}
        <Row style={{ marginBottom: "14px", borderBottom: "1px solid #f0ebe1", paddingBottom: "12px" }}>
          <Column style={{ width: "42%" }}>
            <Text style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8c8275", margin: 0, fontWeight: 600 }}>
              Validité du Code
            </Text>
          </Column>
          <Column style={{ width: "58%" }}>
            <Text style={{ fontSize: "13px", color: "#1c1b19", margin: 0, fontWeight: 500 }}>
              {expiresInMinutes} minutes (usage unique)
            </Text>
          </Column>
        </Row>

        {/* Row 6: Sécurité */}
        <Row>
          <Column style={{ width: "42%" }}>
            <Text style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8c8275", margin: 0, fontWeight: 600 }}>
              Sécurité Session
            </Text>
          </Column>
          <Column style={{ width: "58%" }}>
            <Text style={{ fontSize: "13px", color: "#2d7a4f", margin: 0, fontWeight: 600 }}>
              Chiffré TLS 1.3 · Protégé par Hash OTP
            </Text>
          </Column>
        </Row>
      </Section>

      {/* Security Guidance Alert Box */}
      <Section style={{
        backgroundColor: "#f7f5f0",
        borderLeft: "3px solid #c5a880",
        padding: "16px 20px",
        marginBottom: "35px",
        borderRadius: "0 4px 4px 0"
      }}>
        <Text style={{ fontSize: "12px", color: "#61594e", margin: 0, lineHeight: "1.7", fontStyle: "italic" }}>
          <strong>Avis de sécurité :</strong> Si vous n&apos;avez pas initié cette tentative de connexion sur Kansotex, vous pouvez ignorer cet email en toute sécurité. Aucune modification ne sera apportée à votre compte.
        </Text>
      </Section>

      <Hr className="border-[#e5e0d8] my-[30px]" />

      <Text className="text-muted text-[12px] font-light text-center m-0 leading-[1.8]">
        Une question ou un accompagnement projet ? Contactez notre bureau de confection à Marrakech :<br />
        <a href="mailto:pro@kansotex.com" style={{ color: "#a49a8d", textDecoration: "none", fontWeight: 500 }}>
          pro@kansotex.com
        </a> · +212 5 24 20 09 96
      </Text>
    </BaseTemplate>
  );
};

export default OtpEmail;
