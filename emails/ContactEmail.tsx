import * as React from "react";
import { Text, Heading, Hr } from "@react-email/components";
import { BaseTemplate } from "./BaseTemplate";

export interface ContactEmailProps {
  name: string;
  email: string;
  projectDescription: string;
}

export const ContactEmail = ({
  name = "John Doe",
  email = "john@example.com",
  projectDescription = "Je souhaite aménager une villa avec vos tissus...",
}: ContactEmailProps) => {
  return (
    <BaseTemplate previewText={`Nouvelle demande de contact de ${name}`}>
      <Heading className="text-brand text-[20px] font-semibold uppercase tracking-[0.15em] text-center mb-[35px] m-0">
        Nouveau Contact
      </Heading>

      <Text className="text-brand/80 text-[15px] leading-[1.8] font-light mb-[20px]">
        Bonjour l'équipe Kansotex,
      </Text>
      
      <Text className="text-brand/80 text-[15px] leading-[1.8] font-light mb-[35px]">
        Vous avez reçu une nouvelle demande de contact depuis le site web :
      </Text>

      <div className="bg-[#fcfbf9] border border-[#e5e0d8] p-[30px] mb-[40px]">
        <Text className="text-brand text-[12px] uppercase tracking-[0.15em] font-medium m-0 mb-[8px]">
          Nom Complet
        </Text>
        <Text className="text-brand/70 text-[15px] font-light m-0 mb-[25px]">
          {name}
        </Text>

        <Text className="text-brand text-[12px] uppercase tracking-[0.15em] font-medium m-0 mb-[8px]">
          Adresse Email
        </Text>
        <Text className="text-brand/70 text-[15px] font-light m-0 mb-[25px]">
          <a href={`mailto:${email}`} className="text-gold no-underline">{email}</a>
        </Text>

        <Text className="text-brand text-[12px] uppercase tracking-[0.15em] font-medium m-0 mb-[8px]">
          Le Projet
        </Text>
        <Text className="text-brand/70 text-[15px] font-light leading-[1.8] m-0 whitespace-pre-wrap">
          {projectDescription}
        </Text>
      </div>

      <Hr className="border-[#e5e0d8] my-[30px]" />
      
      <Text className="text-muted text-[12px] font-light text-center m-0">
        Cet email a été envoyé automatiquement depuis kansotex.com
      </Text>
    </BaseTemplate>
  );
};

export default ContactEmail;
