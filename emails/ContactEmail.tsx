import * as React from "react";
import { Text, Heading, Hr } from "@react-email/components";
import { BaseTemplate } from "./BaseTemplate";

export interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  projectDescription?: string;
}

export const ContactEmail = ({
  name = "Client Kansotex",
  email = "client@example.com",
  phone = "",
  subject = "Prise de contact générale",
  message = "",
  projectDescription = "",
}: ContactEmailProps) => {
  const finalMessage = message || projectDescription || "Aucun message précisé.";

  return (
    <BaseTemplate previewText={`Nouveau message de contact : ${name} (${subject})`}>
      <Heading className="text-brand text-[20px] font-semibold uppercase tracking-[0.15em] text-center mb-[30px] m-0">
        Message de Contact
      </Heading>

      <Text className="text-brand/80 text-[15px] leading-[1.8] font-light mb-[20px]">
        Bonjour l'équipe Kansotex,
      </Text>
      
      <Text className="text-brand/80 text-[15px] leading-[1.8] font-light mb-[30px]">
        Un visiteur vous a envoyé un nouveau message depuis le formulaire de contact du site kansotex.com :
      </Text>

      <div className="bg-[#fcfbf9] border border-[#e5e0d8] p-[30px] mb-[35px]">
        <Text className="text-brand text-[12px] uppercase tracking-[0.15em] font-medium m-0 mb-[6px]">
          Expéditeur
        </Text>
        <Text className="text-brand/80 text-[15px] font-light m-0 mb-[20px]">
          {name}
        </Text>

        <Text className="text-brand text-[12px] uppercase tracking-[0.15em] font-medium m-0 mb-[6px]">
          Adresse Email
        </Text>
        <Text className="text-brand/80 text-[15px] font-light m-0 mb-[20px]">
          <a href={`mailto:${email}`} className="text-gold no-underline font-medium">{email}</a>
        </Text>

        {phone && (
          <>
            <Text className="text-brand text-[12px] uppercase tracking-[0.15em] font-medium m-0 mb-[6px]">
              Téléphone / WhatsApp
            </Text>
            <Text className="text-brand/80 text-[15px] font-light m-0 mb-[20px]">
              <a href={`tel:${phone}`} className="text-gold no-underline">{phone}</a>
            </Text>
          </>
        )}

        {subject && (
          <>
            <Text className="text-brand text-[12px] uppercase tracking-[0.15em] font-medium m-0 mb-[6px]">
              Objet de la demande
            </Text>
            <Text className="text-brand/90 text-[15px] font-medium m-0 mb-[20px]">
              {subject}
            </Text>
          </>
        )}

        <Text className="text-brand text-[12px] uppercase tracking-[0.15em] font-medium m-0 mb-[6px]">
          Message
        </Text>
        <Text className="text-brand/70 text-[15px] font-light leading-[1.8] m-0 whitespace-pre-wrap">
          {finalMessage}
        </Text>
      </div>

      <Hr className="border-[#e5e0d8] my-[30px]" />
      
      <Text className="text-muted text-[12px] font-light text-center m-0">
        Message envoyé depuis la page Contact Kansotex (kansotex.com)
      </Text>
    </BaseTemplate>
  );
};

export default ContactEmail;
