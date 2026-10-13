/**
 * @file app/(marketing)/contact/page.tsx
 * @description Contact page. Split layout: context column plus the inquiry form
 * (form first visually on mobile, H1 first in DOM). Shared ContactForm section.
 */

import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/system/PageHero";
import { StatusDot } from "@/components/system/StatusDot";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact ~ Tell us where the pipeline hurts",
  description:
    "One call to scope it. We reply within one business day ~ with questions, not a brochure.",
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: "Contact ~ Tell us where the pipeline hurts",
    description:
      "One call to scope it. We reply within one business day ~ with questions, not a brochure.",
    url: `${siteConfig.url}/contact`,
    images: [
      {
        url: "/og?title=Tell%20us%20where%20the%20pipeline%20hurts&kicker=CONTACT",
        width: 1200,
        height: 630,
        alt: "Contact ~ Tell us where the pipeline hurts",
      },
    ],
  },
};

const NEXT_STEPS = [
  "We reply within one business day.",
  "A 30-minute scoping call ~ you, an engineer, no deck.",
  "A fixed-shape proposal within a week.",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="01"
        kicker="Contact"
        title="Tell us where the pipeline hurts."
        lede="One call to scope it. We reply within one business day ~ with questions, not a brochure."
      >
        <StatusDot label="Accepting new projects" />
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Context column ~ first in DOM, second visually on mobile */}
          <div className="order-2 space-y-10 lg:order-1 lg:col-span-5">
            <div className="space-y-6">
              <h2 className="text-h2 font-bold uppercase text-foreground">What happens next</h2>
              <ol className="divide-y divide-border border-y border-border">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step} className="flex items-baseline gap-5 py-4">
                    <span aria-hidden="true" className="mono-label shrink-0 text-[12px] text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] text-foreground/90">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-2 rounded-lg border border-border bg-card p-6">
              <h2 className="mono-label text-[12px] text-primary">Prefer email?</h2>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-mono text-sm text-foreground underline underline-offset-4 transition-colors hover:text-primary"
              >
                {siteConfig.contactEmail}
              </a>
              <p className="mono-label text-[11px] text-muted-foreground">{siteConfig.officeLocation}</p>
            </div>
            <div className="space-y-4">
              <h2 className="mono-label text-[12px] text-primary">Call or visit</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {siteConfig.offices.map((office) => (
                  <address
                    key={office.city}
                    className="space-y-2 rounded-lg border border-border bg-card p-6 not-italic"
                  >
                    <p className="mono-label flex items-center gap-1.5 text-[12px] text-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      <span>{office.city}</span>
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Quintence
                      <br />
                      {office.lines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                    <a
                      href={office.phoneHref}
                      className="inline-flex items-center gap-1.5 font-mono text-sm text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                    >
                      <Phone className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      <span>{office.phone}</span>
                    </a>
                  </address>
                ))}
              </div>
            </div>
          </div>

          {/* Form ~ first visually on mobile */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
