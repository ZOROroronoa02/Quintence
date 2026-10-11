/**
 * @file app/(marketing)/page.tsx
 * @description Home page composer. Thin by design: metadata plus the locked
 * section order. All copy and logic live in their section components.
 */

import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { HomeIntro } from "@/components/sections/HomeIntro";
import { StatsBar } from "@/components/sections/StatsBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CTA } from "@/components/sections/CTA";
import { siteConfig } from "@/lib/config";

const description =
  "Quintence is a boutique data & digital engineering studio. We build the pipelines, dashboards, and web products that growing businesses run on ~ infrastructure you can actually trust.";

export const metadata: Metadata = {
  title: { absolute: "Quintence ~ From pipeline to launch" },
  description,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Quintence ~ From pipeline to launch",
    description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Quintence ~ From pipeline to launch" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quintence ~ From pipeline to launch",
    description,
    images: [siteConfig.ogImage],
  },
};

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeIntro />
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <FeaturedWork />
      <ProcessTimeline />
      <CTA />
    </>
  );
}
