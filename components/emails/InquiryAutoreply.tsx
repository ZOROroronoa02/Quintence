/**
 * @file components/emails/InquiryAutoreply.tsx
 * @description Auto-reply sent to the inquirer. Short, plain, on-brand ~
 * confirms receipt and sets the one-business-day expectation.
 */

import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

interface InquiryAutoreplyProps {
  name: string;
  contactEmail: string;
  siteUrl: string;
}

const mono = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const sans = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export function InquiryAutoreply({ name, contactEmail, siteUrl }: InquiryAutoreplyProps) {
  const firstName = name.trim().split(/\s+/)[0] || "there";
  return (
    <Html>
      <Head />
      <Preview>Got it ~ we reply within one business day</Preview>
      <Body style={{ backgroundColor: "#0A0E14", color: "#F1F5F9", fontFamily: sans, margin: 0, padding: "24px" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Text style={{ fontFamily: mono, fontSize: "12px", letterSpacing: "2px", color: "#6CB2E6", margin: "0 0 8px" }}>
            [ RECEIVED ] QUINTENCE
          </Text>
          <Heading style={{ fontSize: "24px", margin: "0 0 16px", color: "#F1F5F9" }}>
            Got it{firstName === "there" ? "." : `, ${firstName}.`}
          </Heading>
          <Text style={{ fontSize: "14px", lineHeight: "1.7" }}>
            Your inquiry is with an engineer, not a queue. We reply within one business day ~
            with questions, not a brochure.
          </Text>
          <Text style={{ fontSize: "14px", lineHeight: "1.7" }}>
            If it&rsquo;s urgent, write to us directly at{" "}
            <span style={{ fontFamily: mono, color: "#6CB2E6" }}>{contactEmail}</span>.
          </Text>
          <Text style={{ fontFamily: mono, fontSize: "11px", color: "#8B98AB", marginTop: "24px" }}>
            ~ Quintence · {siteUrl}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
