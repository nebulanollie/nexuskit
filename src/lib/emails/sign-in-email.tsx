
import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";

interface EmailTemplateProps {
  url: string;
  host: string;
}

const LogoComponent: React.FC = () => (
  <div style={{ marginBottom: "24px", textAlign: "center" }}>
    <div
      style={{
        width: "180px",
        height: "40px",
        position: "relative",
        margin: "0 auto 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_APP_URL}/fridge-logo.png`}
        alt="Fridge App Logo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  </div>
);

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ url, host }) => {
  return (
    <Html>
      <Head />
      <Preview>Sign in to Fridge App</Preview>
      <Body
        style={{
          backgroundColor: "#f4f4f4",
          margin: "0",
          padding: "0",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <Container
          style={{
            margin: "0 auto",
            padding: "20px",
            width: "465px",
          }}
        >
          <Section
            style={{
              backgroundColor: "#ffffff",
              padding: "40px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            <LogoComponent />

            <Heading
              style={{
                color: "#1a1a1a",
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
                margin: "30px 0 20px",
              }}
            >
              Welcome to Fridge App
            </Heading>

            <Text
              style={{
                color: "#4a5568",
                fontSize: "16px",
                lineHeight: "24px",
                textAlign: "center",
                margin: "0 0 30px",
              }}
            >
              Click the button below to securely sign in to your account and manage your refrigerator inventory.
            </Text>

            <Button
              href={url}
              style={{
                backgroundColor: "#4CAF50",
                borderRadius: "6px",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "bold",
                textDecoration: "none",
                textAlign: "center",
                display: "block",
                width: "100%",
                padding: "12px 0",
                margin: "0 0 30px",
              }}
            >
              Sign In
            </Button>

            <Text
              style={{
                color: "#4a5568",
                fontSize: "14px",
                textAlign: "center",
                margin: "0 0 8px",
              }}
            >
              Button not working? Use this link:
            </Text>

            <Link
              href={url}
              style={{
                color: "#4CAF50",
                display: "block",
                fontSize: "14px",
                textAlign: "center",
                textDecoration: "underline",
                margin: "0 0 30px",
                wordBreak: "break-all",
              }}
            >
              {url}
            </Link>

            <Text className="text-black text-[14px] leading-[24px]">
              You can sign in to {host} by clicking the link above.
            </Text>

            <div
              style={{
                borderTop: "1px solid #e2e8f0",
                margin: "30px 0 0",
                padding: "20px 0 0",
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  color: "#718096",
                  fontSize: "12px",
                  margin: "0 0 5px",
                }}
              >
                If you didn't request this email, you can safely ignore it.
              </Text>

              <Text
                style={{
                  color: "#718096",
                  fontSize: "12px",
                  margin: "0",
                }}
              >
                © {new Date().getFullYear()} Fridge App. All rights reserved.
              </Text>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;
