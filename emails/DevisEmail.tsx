import * as React from "react";
import { Text, Heading, Hr, Section, Row, Column, Img } from "@react-email/components";
import { BaseTemplate } from "./BaseTemplate";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  image?: string;
  price?: number;
  colorName?: string;
}

export interface DevisEmailProps {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  clientProfile?: string;
  services?: string[];
  meterage?: string;
  timeline?: string;
  samples?: string;
  city?: string;
  message?: string;
  items?: CartItem[];
}

export const DevisEmail = ({
  name = "Client Kansotex",
  email = "client@example.com",
  phone = "",
  company = "",
  clientProfile = "Projet Sur-Mesure",
  services = [],
  meterage = "",
  timeline = "",
  samples = "",
  city = "",
  message = "",
  items = [],
}: DevisEmailProps) => {
  const isCartQuote = items && items.length > 0;

  return (
    <BaseTemplate previewText={`Demande de Devis : ${name} (${company || clientProfile})`}>
      <Heading className="text-brand text-[20px] font-semibold uppercase tracking-[0.15em] text-center mb-[25px] m-0">
        {isCartQuote ? "Devis Panier B2B" : "Nouvelle Demande de Devis Sur-Mesure"}
      </Heading>

      <Text className="text-brand/80 text-[15px] leading-[1.8] font-light mb-[25px]">
        Bonjour l'équipe Kansotex,
        <br />
        Une nouvelle demande de devis a été soumise depuis le site web kansotex.com :
      </Text>

      {/* Client Identity & Location */}
      <div className="bg-[#fcfbf9] border border-[#e5e0d8] p-[25px] mb-[25px]">
        <Text className="text-brand text-[13px] font-bold uppercase tracking-[0.15em] mb-[15px] m-0">
          Coordonnées du Client
        </Text>

        <Row className="mb-[15px]">
          <Column>
            <Text className="text-brand text-[11px] uppercase tracking-[0.15em] font-medium m-0 mb-[4px]">Nom & Prénom</Text>
            <Text className="text-brand/80 text-[15px] font-medium m-0">{name}</Text>
          </Column>
          <Column>
            <Text className="text-brand text-[11px] uppercase tracking-[0.15em] font-medium m-0 mb-[4px]">Société / Agence</Text>
            <Text className="text-brand/80 text-[15px] font-light m-0">{company || "Particulier"}</Text>
          </Column>
        </Row>

        <Row className="mb-[15px]">
          <Column>
            <Text className="text-brand text-[11px] uppercase tracking-[0.15em] font-medium m-0 mb-[4px]">Adresse Email</Text>
            <Text className="text-brand/80 text-[15px] font-light m-0">
              <a href={`mailto:${email}`} className="text-gold no-underline font-medium">{email}</a>
            </Text>
          </Column>
          <Column>
            <Text className="text-brand text-[11px] uppercase tracking-[0.15em] font-medium m-0 mb-[4px]">Téléphone / WhatsApp</Text>
            <Text className="text-brand/80 text-[15px] font-light m-0">
              {phone ? <a href={`tel:${phone}`} className="text-gold no-underline">{phone}</a> : "Non renseigné"}
            </Text>
          </Column>
        </Row>

        {(clientProfile || city) && (
          <Row>
            {clientProfile && (
              <Column>
                <Text className="text-brand text-[11px] uppercase tracking-[0.15em] font-medium m-0 mb-[4px]">Profil du Client</Text>
                <Text className="text-brand/90 text-[14px] font-semibold m-0">{clientProfile}</Text>
              </Column>
            )}
            {city && (
              <Column>
                <Text className="text-brand text-[11px] uppercase tracking-[0.15em] font-medium m-0 mb-[4px]">Ville / Région du Projet</Text>
                <Text className="text-brand/80 text-[14px] font-light m-0">{city}</Text>
              </Column>
            )}
          </Row>
        )}
      </div>

      {/* Project Specifications */}
      {(!isCartQuote || (services && services.length > 0)) && (
        <div className="bg-[#fcfbf9] border border-[#e5e0d8] p-[25px] mb-[25px]">
          <Text className="text-brand text-[13px] font-bold uppercase tracking-[0.15em] mb-[15px] m-0">
            Détails & Spécifications du Projet
          </Text>

          {services && services.length > 0 && (
            <div className="mb-[15px]">
              <Text className="text-brand text-[11px] uppercase tracking-[0.15em] font-medium m-0 mb-[6px]">
                Prestations & Étoffes Recherchées
              </Text>
              <Text className="text-brand/90 text-[14px] font-medium m-0">
                {services.join(" · ")}
              </Text>
            </div>
          )}

          <Row className="mb-[15px]">
            {meterage && (
              <Column>
                <Text className="text-brand text-[11px] uppercase tracking-[0.15em] font-medium m-0 mb-[4px]">Métrage Estimé</Text>
                <Text className="text-brand/80 text-[14px] font-light m-0">{meterage}</Text>
              </Column>
            )}
            {timeline && (
              <Column>
                <Text className="text-brand text-[11px] uppercase tracking-[0.15em] font-medium m-0 mb-[4px]">Échéance Souhaitée</Text>
                <Text className="text-brand/80 text-[14px] font-light m-0">{timeline}</Text>
              </Column>
            )}
          </Row>

          {samples && (
            <div className="mb-[15px]">
              <Text className="text-brand text-[11px] uppercase tracking-[0.15em] font-medium m-0 mb-[4px]">
                Nuanciers & Échantillons Physiques
              </Text>
              <Text className="text-brand/80 text-[14px] font-light m-0">
                {samples}
              </Text>
            </div>
          )}

          {message && (
            <div>
              <Text className="text-brand text-[11px] uppercase tracking-[0.15em] font-medium m-0 mb-[4px]">
                Cahier des Charges & Remarques
              </Text>
              <Text className="text-brand/70 text-[14px] font-light leading-[1.8] m-0 whitespace-pre-wrap">
                {message}
              </Text>
            </div>
          )}
        </div>
      )}

      {/* Cart Items if present */}
      {isCartQuote && (
        <>
          <Text className="text-brand text-[13px] uppercase tracking-[0.15em] font-medium mb-[15px] m-0">
            Articles Sélectionnés ({items.length})
          </Text>

          <Section className="border border-[#e5e0d8] bg-[#ffffff] mb-[25px]">
            {items.map((item, index) => (
              <Row key={item.id || index} className={`p-[15px] ${index !== items.length - 1 ? 'border-b border-[#e5e0d8]' : ''}`}>
                <Column className="w-[70px] pr-[15px]">
                  {item.image ? (
                    <Img src={item.image} width="70" height="90" className="object-cover" />
                  ) : (
                    <div style={{ width: '70px', height: '90px', backgroundColor: '#f0ece6' }} />
                  )}
                </Column>
                <Column>
                  <Text className="text-brand text-[13px] uppercase tracking-[0.15em] font-medium m-0 mb-[6px]">
                    {item.name}
                  </Text>
                  {item.colorName && (
                    <Text className="text-brand/60 text-[12px] font-light m-0 mb-[4px]">
                      Couleur / Variante : {item.colorName}
                    </Text>
                  )}
                  <Text className="text-brand/70 text-[13px] font-light m-0">
                    Quantité : <span className="text-brand font-medium">{item.quantity}</span>
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>
        </>
      )}

      <Hr className="border-[#e5e0d8] my-[25px]" />

      <Text className="text-muted text-[12px] font-light text-center m-0">
        Email généré automatiquement depuis le système de devis Kansotex (kansotex.com)
      </Text>
    </BaseTemplate>
  );
};

export default DevisEmail;
