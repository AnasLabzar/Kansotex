import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Text,
  Hr,
  Tailwind,
  Link,
  Row,
  Column,
  Button,
} from "@react-email/components";

export interface BaseTemplateProps {
  children: React.ReactNode;
  previewText: string;
}

const KANSOTEX_LOGO = "https://kansotex.com/KANSOTEX-marque-Black.png";
const KANSOTEX_WEBSITE = "https://kansotex.com";

export const BaseTemplate = ({ children, previewText }: BaseTemplateProps) => {
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#1c1b19",
                gold: "#a49a8d",
                muted: "#8c8c8c",
              },
              fontFamily: {
                sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
              },
            },
          },
        }}
      >
        <Head>
          <title>{previewText}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        
        <Body style={{ backgroundColor: "#f6f6f6", margin: 0, padding: 0, fontFamily: "Inter, sans-serif" }}>
          
          <Section style={{ padding: "60px 0", backgroundColor: "#f6f6f6", width: "100%" }}>
            
            {/* Main Content Card - Pure white, bulletproof style */}
            <Container style={{ backgroundColor: "#ffffff", maxWidth: "600px", margin: "0 auto", borderRadius: "8px", overflow: "hidden", border: "1px solid #eaeaea", padding: "0" }}>
              
              {/* Header Section - Huge Logo, massive padding top and bottom */}
              <Section style={{ padding: "80px 40px 60px 40px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                <Img
                  src={KANSOTEX_LOGO}
                  width="360"
                  alt="Kansotex"
                  style={{ display: "block", margin: "0 auto" }}
                />
              </Section>

              {/* Main Content Section */}
              <Section style={{ padding: "60px 50px 40px 50px" }}>
                {children}
              </Section>

              {/* Footer Section - INSIDE the card, beautifully aligned */}
              <Section style={{ padding: "0 50px 60px 50px", textAlign: "center" }}>
                <Hr style={{ borderColor: "#f0f0f0", margin: "0 0 40px 0", width: "100%" }} />
                
                <Section style={{ marginBottom: "30px" }}>
                  <Img
                    src="https://kansotex.com/icon.png"
                    width="45"
                    height="45"
                    alt="Kansotex Icon"
                    style={{ display: "block", margin: "0 auto 25px auto", opacity: 0.8 }}
                  />
                  <Text className="text-brand text-[15px] font-semibold uppercase tracking-[0.2em] m-0 mb-[15px]">
                    KANSOTEX — In &amp; Outdoor
                  </Text>
                  <Text className="text-muted text-[14px] font-light m-0 leading-[2]">
                    983 Al Massar, Rte de Safi, Marrakech 40100<br />
                    <Link href="mailto:contact@kansotex.com" style={{ color: '#8c8c8c', textDecoration: 'none' }}>contact@kansotex.com</Link> | <Link href="tel:+212524200996" style={{ color: '#8c8c8c', textDecoration: 'none' }}>+212 5 24 20 09 96</Link>
                  </Text>
                </Section>

                <Section>
                  <Text className="text-[#a39f9a] text-[11px] font-light m-0 mb-[10px] uppercase tracking-[0.1em]">
                    Kanso Business SARL — Marrakech, Maroc
                  </Text>
                  <Text className="text-[#a39f9a] text-[11px] font-light m-0">
                    © {new Date().getFullYear()} Kanso Business SARL. Tous droits réservés.
                  </Text>
                </Section>
              </Section>

            </Container>
          </Section>
          
        </Body>
      </Tailwind>
    </Html>
  );
};

export default BaseTemplate;
