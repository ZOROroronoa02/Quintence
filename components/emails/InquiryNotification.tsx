/**
 * @file components/emails/InquiryNotification.tsx
 * @description Internal notification email sent to CONTACT_TO_EMAIL on every
 * inquiry. Reply-To is the sender's address so you reply directly. Dark-styled
 * table with mono accents; inline styles only for client compatibility.
 */

import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";

interface InquiryNotificationProps {
  name: string;
  email: string;
  company?: string;
  budget: string;
  message: string;
  siteUrl: string;
}

const mono = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const sans = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export function InquiryNotification({
  name,
  email,
  company,
  budget,
  message,
  siteUrl,
}: InquiryNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New inquiry ~ {name} ({budget})</Preview>
      <Body style={{ backgroundColor: "#0A0E14", color: "#F1F5F9", fontFamily: sans, margin: 0, padding: "24px" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Text style={{ fontFamily: mono, fontSize: "12px", letterSpacing: "2px", color: "#6CB2E6", margin: "0 0 8px" }}>
            [ NEW INQUIRY ] QUINTENCE
          </Text>
          <Heading style={{ fontSize: "24px", margin: "0 0 16px", color: "#F1F5F9" }}>
            {name} ~ {budget}
          </Heading>
          <Section
            style={{
              backgroundColor: "#0E141E",
              border: "1px solid rgba(148,163,184,0.2)",
              borderRadius: "8px",
              padding: "16px 20px",
            }}
          >
            <Text style={{ fontFamily: mono, fontSize: "13px", margin: "0 0 6px" }}>
              <span style={{ color: "#8B98AB" }}>FROM .... </span>
              <span style={{ color: "#F1F5F9" }}>
                {name} &lt;{email}&gt;
              </span>
            </Text>
            <Text style={{ fontFamily: mono, fontSize: "13px", margin: "0 0 6px" }}>
              <span style={{ color: "#8B98AB" }}>COMPANY . </span>
              <span style={{ color: "#F1F5F9" }}>{company || "~"}</span>
            </Text>
            <Text style={{ fontFamily: mono, fontSize: "13px", margin: 0 }}>
              <span style={{ color: "#8B98AB" }}>BUDGET .. </span>
              <span style={{ color: "#6CB2E6" }}>{budget}</span>
            </Text>
          </Section>
          <Section
            style={{
              backgroundColor: "#0E141E",
              border: "1px solid rgba(148,163,184,0.2)",
              borderRadius: "8px",
              padding: "16px 20px",
              marginTop: "12px",
            }}
          >
            <Text style={{ fontFamily: mono, fontSize: "12px", letterSpacing: "2px", color: "#8B98AB", margin: "0 0 8px" }}>
              MESSAGE
            </Text>
            <Text style={{ fontSize: "14px", lineHeight: "1.7", margin: 0, whiteSpace: "pre-wrap" }}>
              {message}
            </Text>
          </Section>
          <Hr style={{ borderColor: "rgba(148,163,184,0.2)", margin: "20px 0" }} />
          <Text style={{ fontFamily: mono, fontSize: "11px", color: "#8B98AB", margin: 0 }}>
            Sent from {siteUrl}/contact ~ reply directly, Reply-To is set.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
