/**
 * @file app/(legal)/privacy/page.tsx
 * @description Privacy policy. Written for the actual data flows of this site:
 * contact inquiries via Gmail SMTP, Cal.com bookings, cookieless analytics,
 * local-only UI preferences. NOTE: standard studio-grade policy, not counsel
 * review - have a lawyer confirm before enterprise deals.
 */

import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Quintence collects, uses, retains, and protects your data - contact inquiries, bookings, and analytics.",
  alternates: { canonical: `${siteConfig.url}/privacy` },
  openGraph: {
    title: "Privacy Policy",
    description:
      "How Quintence collects, uses, retains, and protects your data - contact inquiries, bookings, and analytics.",
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

const EFFECTIVE_DATE = "2026-10-13";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="mono-label text-primary">[ Legal ]</p>
      <h1 className="text-display mt-3 font-bold uppercase leading-[1.05] text-foreground">
        Privacy Policy
      </h1>
      <p className="mono-label mt-4 text-[12px] text-muted-foreground">
        Effective {EFFECTIVE_DATE} · {siteConfig.legalName}
      </p>
      <div className="mt-10">
        <Prose>
          <h2>Who we are</h2>
          <p>
            This site is operated by {siteConfig.legalName} (“Quintence”, “we”),
            a data & digital engineering studio based in Gurugram and Noida,
            India. Questions about this policy:{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          </p>

          <h2>Data we collect</h2>
          <p>
            <strong>Contact inquiries.</strong> When you use the form at{" "}
            {siteConfig.url}/contact, we receive your name, email address,
            company (if provided), budget range, and message - exactly what you
            type, nothing more.
          </p>
          <p>
            <strong>Bookings.</strong> If you book a call through our scheduling
            link, the booking provider (Cal.com) collects the details you enter
            there (typically name, email, and meeting notes) under its own
            privacy policy.
          </p>
          <p>
            <strong>Analytics.</strong> We use privacy-respecting, cookieless
            analytics to understand aggregate usage (pages visited, referrers).
            It sets no tracking cookies and builds no cross-site profiles.
          </p>
          <p>
            <strong>Technical logs.</strong> Our hosting provider records basic
            request data (IP address, user agent, timestamps) for security and
            reliability. These logs are short-lived and never joined with
            inquiry data for profiling.
          </p>
          <p>
            <strong>On-device preferences only.</strong> Your theme choice and
            similar UI preferences are stored in your own browser (local or
            session storage) and never sent to us.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To read and respond to your inquiry - usually within one business day.</li>
            <li>To scope a potential engagement and schedule calls you request.</li>
            <li>To operate, secure, and improve the site.</li>
          </ul>
          <p>
            We do not sell personal data. We do not run ads, cross-site
            trackers, or fingerprinting on this site.
          </p>

          <h2>Processors and sharing</h2>
          <p>We share data only as required to operate the site:</p>
          <ul>
            <li>
              <strong>Email delivery (Google).</strong> Inquiry emails are sent
              through Gmail SMTP and stored in our studio mailbox.
            </li>
            <li>
              <strong>Scheduling (Cal.com).</strong> Booking data you enter on
              their pages is processed under Cal.com&apos;s policies.
            </li>
            <li>
              <strong>Hosting and analytics (Vercel).</strong> Serves the site
              and provides aggregate, cookieless usage statistics.
            </li>
            <li>
              <strong>Legal compliance.</strong> Where disclosure is required by
              applicable law or a lawful order.
            </li>
          </ul>

          <h2>International transfers</h2>
          <p>
            Our processors may handle data on infrastructure outside India. We
            rely on their contractual and technical safeguards, and we keep the
            data we hold to the minimum an inquiry requires.
          </p>

          <h2>Retention</h2>
          <p>
            Inquiry correspondence is retained as business records for up to 24
            months, then deleted on schedule - sooner if you ask. Server logs
            rotate on short cycles. If we never start working together, you can
            ask us to delete your inquiry immediately (see below).
          </p>

          <h2>Your rights</h2>
          <p>
            Under India&apos;s Digital Personal Data Protection Act, 2023 - and
            equivalent rights we extend to all visitors regardless of location -
            you may request access to, correction of, or deletion of your
            personal data, and withdraw consent for its use. Write to{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>{" "}
            with “Privacy request” in the subject; we respond within 30 days.
            That same address serves as our grievance contact.
          </p>

          <h2>Security</h2>
          <p>
            The site is served over HTTPS, form submissions are validated and
            screened by automated-abuse filters, and mailbox access is restricted
            to studio principals. No internet transmission is perfectly secure, so please
            avoid sending passwords or highly sensitive material through the
            contact form - we&apos;ll arrange a secure channel when one is needed.
          </p>

          <h2>Children</h2>
          <p>
            This site is a business service and is not directed at children
            under 18. We do not knowingly collect their data; contact us if you
            believe otherwise and we will delete it.
          </p>

          <h2>Changes</h2>
          <p>
            If this policy changes materially, we will update the effective date
            above. Continued use of the site after changes constitutes
            acceptance.
          </p>
        </Prose>
      </div>
    </div>
  );
}
