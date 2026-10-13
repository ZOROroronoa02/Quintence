/**
 * @file app/(marketing)/work/page.tsx
 * @description Work index. Thin server composer: header plus the client-side
 * sector filter island over published case studies, closed by the shared CTA.
 */

import type { Metadata } from "next";
import { PageHero } from "@/components/system/PageHero";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { CTA } from "@/components/sections/CTA";
import { getAllCaseStudies } from "@/lib/mdx";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Work ~ Projects, end to end",
  description:
    "Every engagement below went from first pipeline to shipped product. Numbers are from the first 90 days unless noted.",
  alternates: { canonical: `${siteConfig.url}/work` },
  openGraph: {
    title: "Work ~ Projects, end to end",
    description:
      "Every engagement below went from first pipeline to shipped product. Numbers are from the first 90 days unless noted.",
    url: `${siteConfig.url}/work`,
    images: [
      {
        url: "/og?title=Projects%2C%20end%20to%20end&kicker=WORK",
        width: 1200,
        height: 630,
        alt: "Work ~ Projects, end to end",
      },
    ],
  },
};

export default async function WorkPage() {
  const studies = await getAllCaseStudies();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${siteConfig.url}/work` },
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
        kicker="Selected work"
        title="Projects, end to end"
        lede="Every engagement below went from first pipeline to shipped product. Numbers are from the first 90 days unless noted."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <WorkIndex
          studies={studies.map((study) => ({ slug: study.slug, frontmatter: study.frontmatter }))}
        />
      </section>
      <CTA />
    </>
  );
}
