/**
 * @file app/(legal)/privacy/page.tsx
 * @description Privacy policy ~ TEMPLATE GRADE, not legal advice.
 * TODO-LEGAL-REVIEW: counsel must review before launch.
 */

import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Quintence collects, uses, and retains data ~ including contact inquiries and analytics.",
  alternates: { canonical: `${siteConfig.url}/privacy` },
  openGraph: {
    title: "Privacy Policy",
    description: "How Quintence collects, uses, and retains data ~ including contact inquiries and analytics.",
    url: `${siteConfig.url}/privacy`,
    images: [
      {
        url: "/og?title=Privacy%20Policy&kicker=LEGAL",
        width: 1200,
        height: 630,
        alt: "Privacy Policy",
      },
    ],
  },
};

// TODO-LEGAL-REVIEW: template only ~ have counsel review jurisdiction, entity name, and retention terms before launch.
const EFFECTIVE_DATE = "2026-10-01";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-10 rounded-lg border border-warning/40 bg-warning/10 p-4">
        <p className="mono-label text-[12px] text-warning">Template ~ review before launch</p>
      </div>
      <p className="mono-label text-primary">[ Legal ]</p>
      <h1 className="text-display mt-3 font-bold uppercase leading-[1.05] text-foreground">
        Privacy Policy
      </h1>
      <p className="mono-label mt-4 text-[12px] text-muted-foreground">
        Effective {EFFECTIVE_DATE} · {siteConfig.legalName}
      </p>
      <div className="mt-10">
        <Prose>
          <h2>Data we collect</h2>
          <p>
            Contact inquiries: when you use the form at {siteConfig.url}/contact, we receive
            your name, email address, company (if provided), budget range, and message. Analytics:
            we use privacy-respecting, cookieless analytics to understand aggregate usage. We do
            not run cross-site trackers.
          </p>
          <h2>Processors</h2>
          <p>
            Inquiry emails are delivered via Resend, acting as our data processor. Hosting and
            analytics run on our infrastructure providers. We do not sell personal data, and we
            share it only as required to operate the site or comply with law.
          </p>
          <h2>Retention</h2>
          <p>
            Inquiry emails are retained as business correspondence for up to 24 months, then
            deleted on request or on schedule. Write to {siteConfig.contactEmail} to request
            access, correction, or deletion at any time.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          </p>
        </Prose>
      </div>
    </div>
  );
}
