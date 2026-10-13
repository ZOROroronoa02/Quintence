/**
 * @file app/(marketing)/services/page.tsx
 * @description Services index. Thin composer: header plus five full cards
 * sourced from MDX, closed by the shared CTA section.
 */

import type { Metadata } from "next";
import { PageHero } from "@/components/system/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { CTA } from "@/components/sections/CTA";
import { getAllServices } from "@/lib/mdx";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Services ~ From raw data to shipped product",
  description:
    "Five services that hand off to each other seamlessly ~ because the same team owns all of them.",
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: "Services ~ From raw data to shipped product",
    description:
      "Five services that hand off to each other seamlessly ~ because the same team owns all of them.",
    url: `${siteConfig.url}/services`,
    images: [
      {
        url: "/og?title=From%20raw%20data%20to%20shipped%20product&kicker=SERVICES",
        width: 1200,
        height: 630,
        alt: "Services ~ From raw data to shipped product",
      },
    ],
  },
};

export default async function ServicesPage() {
  const services = await getAllServices();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHero
        index="01"
        kicker="Services"
        title="From raw data to shipped product"
        lede="Five services that hand off to each other seamlessly ~ because the same team owns all of them."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 2) * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
