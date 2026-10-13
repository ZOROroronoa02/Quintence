/**
 * @file app/(legal)/terms/page.tsx
 * @description Terms of service. Covers site use, inquiries and bookings, IP,
 * third-party links, liability, and governing law (India / Gurugram). NOTE:
 * standard studio-grade terms, not counsel review - have a lawyer confirm
 * before enterprise deals.
 */

import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing use of the Quintence site, engagement inquiries, and bookings.",
  alternates: { canonical: `${siteConfig.url}/terms` },
  openGraph: {
    title: "Terms of Service",
    description:
      "The terms governing use of the Quintence site, engagement inquiries, and bookings.",
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

const EFFECTIVE_DATE = "2026-10-13";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="mono-label text-primary">[ Legal ]</p>
      <h1 className="text-display mt-3 font-bold uppercase leading-[1.05] text-foreground">
        Terms of Service
      </h1>
      <p className="mono-label mt-4 text-[12px] text-muted-foreground">
        Effective {EFFECTIVE_DATE} · {siteConfig.legalName}
      </p>
      <div className="mt-10">
        <Prose>
          <h2>Scope</h2>
          <p>
            This site describes the services of {siteConfig.legalName}
            (“Quintence”) and accepts engagement inquiries. Nothing here -
            service pages, case studies, metrics, or estimates - constitutes a
            proposal, quote, or binding offer. Engagements are governed solely
            by separately executed statements of work.
          </p>

          <h2>Using the site</h2>
          <ul>
            <li>Use the site lawfully and as intended - inquiry forms are for genuine project inquiries.</li>
            <li>
              Do not misuse it: no spam, no automated harvesting, no attempts to
              disrupt, probe, or misrepresent identity (automated abuse filters
              apply, including a silent bot trap on our forms).
            </li>
            <li>The site is provided for general information; it is not professional advice.</li>
          </ul>

          <h2>Inquiries and bookings</h2>
          <p>
            By submitting the contact form you confirm the details are yours to
            share and accurate to your knowledge; we reply within one business
            day but commit to no response-time SLA. Calls booked through our
            scheduling link are handled by Cal.com and subject to its terms in
            addition to these.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Site content - copy, case studies, insights posts, artwork, and code
            - is owned by Quintence unless stated otherwise. You may link to and
            quote it with attribution; you may not republish it wholesale or
            present it as your own. Client deliverables, licenses, and
            IP transfer are defined exclusively in the applicable statement of
            work, never by anything on this site.
          </p>

          <h2>Third-party links</h2>
          <p>
            The site links to third parties (scheduling, code hosts, social
            profiles). We choose them with care but do not control them; their
            terms and privacy policies govern your use of their services.
          </p>

          <h2>Liability</h2>
          <p>
            The site is provided “as is,” without warranties of any kind. To
            the maximum extent permitted by law, Quintence&apos;s aggregate
            liability arising from the site is capped at the amounts paid for
            services in the preceding twelve months - and where no engagement
            exists, to the minimum extent the law allows. Nothing here limits
            liability that cannot legally be limited.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of India, with exclusive venue
            in the courts at Gurugram, Haryana. Contact:{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms as the studio evolves; the effective date
            above always reflects the current version. Continued use of the site
            after changes constitutes acceptance.
          </p>
        </Prose>
      </div>
    </div>
  );
}
