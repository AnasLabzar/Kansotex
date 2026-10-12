import * as React from "react";
import { Text, Heading, Hr, Section, Row, Column, Img } from "@react-email/components";
import { BaseTemplate } from "./BaseTemplate";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
}

export interface DevisEmailProps {
  name: string;
  email: string;
  company: string;
  message: string;
  items: CartItem[];
}

export const DevisEmail = ({
  name = "John Doe",
  email = "john@example.com",
  company = "Atelier Design",
  message = "Merci de m'envoyer un devis détaillé pour ces articles.",
  items = [
    {
      id: "1",
      name: "Tissu Velours",
      quantity: 10,
      image: "https://kansotex.com/gallery/Kansotex-indoor-living-room-pinterest.png",
      price: 250,
    }
  ],
}: DevisEmailProps) => {
  return (
    <BaseTemplate previewText={`Demande de devis Pro de ${company || name}`}>
      <Heading className="text-brand text-[20px] font-semibold uppercase tracking-[0.15em] text-center mb-[35px] m-0">
        Demande de Devis
      </Heading>

      <Text className="text-brand/80 text-[15px] leading-[1.8] font-light mb-[35px]">
        Nouvelle demande de devis B2B depuis le panier Kansotex :
      </Text>

      {/* Client Info */}
      <div className="bg-[#fcfbf9] border border-[#e5e0d8] p-[30px] mb-[40px]">
        <Row className="mb-[20px]">
          <Column>
            <Text className="text-brand text-[12px] uppercase tracking-[0.15em] font-medium m-0 mb-[8px]">Client</Text>
            <Text className="text-brand/70 text-[15px] font-light m-0">{name}</Text>
          </Column>
          <Column>
            <Text className="text-brand text-[12px] uppercase tracking-[0.15em] font-medium m-0 mb-[8px]">Société</Text>
            <Text className="text-brand/70 text-[15px] font-light m-0">{company || "-"}</Text>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text className="text-brand text-[12px] uppercase tracking-[0.15em] font-medium m-0 mb-[8px]">Email</Text>
            <Text className="text-brand/70 text-[15px] font-light m-0">
              <a href={`mailto:${email}`} className="text-gold no-underline">{email}</a>
            </Text>
          </Column>
        </Row>
        {message && (
          <Row className="mt-[20px]">
            <Column>
              <Text className="text-brand text-[12px] uppercase tracking-[0.15em] font-medium m-0 mb-[8px]">Message</Text>
              <Text className="text-brand/70 text-[15px] font-light m-0 whitespace-pre-wrap">{message}</Text>
            </Column>
          </Row>
        )}
      </div>

      <Text className="text-brand text-[13px] uppercase tracking-[0.15em] font-medium mb-[25px] m-0">
        Articles demandés ({items.length})
      </Text>

      {/* Cart Items */}
      <Section className="border border-[#e5e0d8] bg-[#ffffff] mb-[40px]">
        {items.map((item, index) => (
          <Row key={item.id} className={`p-[20px] ${index !== items.length - 1 ? 'border-b border-[#e5e0d8]' : ''}`}>
            <Column className="w-[80px] pr-[20px]">
              {item.image ? (
                <Img src={item.image} width="80" height="100" className="object-cover" />
              ) : (
                <div style={{ width: '80px', height: '100px', backgroundColor: '#f0ece6' }} />
              )}
            </Column>
            <Column>
              <Text className="text-brand text-[13px] uppercase tracking-[0.15em] font-medium m-0 mb-[10px]">
                {item.name}
              </Text>
              <Text className="text-brand/60 text-[14px] font-light m-0">
                Quantité : <span className="text-brand font-medium">{item.quantity}</span>
              </Text>
            </Column>
          </Row>
        ))}
      </Section>

      <Text className="text-muted text-[12px] font-light text-center m-0">
        Veuillez traiter cette demande et envoyer le devis formel au client.
      </Text>
    </BaseTemplate>
  );
};

export default DevisEmail;
