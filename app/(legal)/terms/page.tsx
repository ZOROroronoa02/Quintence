/**
 * @file app/(legal)/terms/page.tsx
 * @description Terms of service ~ TEMPLATE GRADE, not legal advice.
 * TODO-LEGAL-REVIEW: counsel must review before launch.
 */

import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the Quintence site and engagement inquiries.",
  alternates: { canonical: `${siteConfig.url}/terms` },
  openGraph: {
    title: "Terms of Service",
    description: "The terms governing use of the Quintence site and engagement inquiries.",
    url: `${siteConfig.url}/terms`,
    images: [
      {
        url: "/og?title=Terms%20of%20Service&kicker=LEGAL",
        width: 1200,
        height: 630,
        alt: "Terms of Service",
      },
    ],
  },
};

// TODO-LEGAL-REVIEW: template only ~ have counsel review governing law, liability cap, and IP terms before launch.
const EFFECTIVE_DATE = "2026-10-01";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-10 rounded-lg border border-warning/40 bg-warning/10 p-4">
        <p className="mono-label text-[12px] text-warning">Template ~ review before launch</p>
      </div>
      <p className="mono-label text-primary">[ Legal ]</p>
      <h1 className="text-display mt-3 font-bold uppercase leading-[1.05] text-foreground">
        Terms of Service
      </h1>
      <p className="mono-label mt-4 text-[12px] text-muted-foreground">
        Effective {EFFECTIVE_DATE} · {siteConfig.legalName}
      </p>
      <div className="mt-10">
        <Prose>
          <h2>Service scope</h2>
          <p>
            This site describes the services of {siteConfig.legalName} (“Quintence”) and accepts
            engagement inquiries. Nothing here constitutes a proposal, quote, or binding offer ~
            engagements are governed by separately executed statements of work.
          </p>
          <h2>Intellectual property</h2>
          <p>
            Site content, including case studies and insights posts, is owned by Quintence unless
            stated otherwise. Client deliverables transfer under the terms of the applicable
            statement of work.
          </p>
          <h2>Liability</h2>
          <p>
            The site is provided “as is.” To the maximum extent permitted by law, liability is
            capped at the amounts paid for services in the preceding twelve months. [PLACEHOLDER:
            confirm cap and governing law with counsel.]
          </p>
          <h2>Governing law</h2>
          <p>
            [PLACEHOLDER: insert governing law and venue ~ e.g., the laws of the State of
            California.] Contact: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          </p>
        </Prose>
      </div>
    </div>
  );
}
