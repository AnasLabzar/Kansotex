import * as React from "react";
import { Text, Heading, Hr, Button } from "@react-email/components";
import { BaseTemplate } from "./BaseTemplate";

export interface NewsletterEmailProps {
  email: string;
}

export const NewsletterEmail = ({
  email = "john@example.com",
}: NewsletterEmailProps) => {
  return (
    <BaseTemplate previewText="Bienvenue dans la Maison Kansotex">
      <Heading className="text-brand text-[26px] font-bold uppercase tracking-[0.15em] text-center mb-[30px] m-0">
        Bienvenue
      </Heading>

      <Text className="text-brand text-[16px] leading-[1.8] font-medium mb-[20px] text-center">
        Merci de rejoindre notre cercle privilégié.
      </Text>
      
      <Text className="text-[#555555] text-[15px] leading-[1.8] font-light mb-[20px] text-center">
        C'est avec un immense plaisir que nous vous accueillons dans l'univers Kansotex. Vous ferez désormais partie des premiers à découvrir en avant-première nos nouvelles collections exclusives, nos inspirations architecturales, et nos projets d'aménagement In & Outdoor.
      </Text>

      <Text className="text-[#555555] text-[15px] leading-[1.8] font-light mb-[40px] text-center">
        Notre vocation est de sublimer vos espaces de vie en alliant design intemporel, matériaux nobles et savoir-faire d'excellence. Restez à l'affût, de belles surprises vous attendent très prochainement.
      </Text>

      <div className="text-center mb-[20px]">
        <Button 
          href="https://kansotex.com/univers"
          className="bg-brand text-white text-[13px] font-medium uppercase tracking-[0.15em] px-[40px] py-[18px] rounded-[4px]"
        >
          Découvrir nos univers
        </Button>
      </div>
      
    </BaseTemplate>
  );
};

export default NewsletterEmail;
