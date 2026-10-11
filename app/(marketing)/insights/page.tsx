/**
 * @file app/(marketing)/insights/page.tsx
 * @description Insights index. A reading list, not a magazine: date + reading
 * time mono-line, title, description. No cards, no thumbnails.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/system/SectionHeader";
import { GridTexture } from "@/components/system/GridTexture";
import { Reveal } from "@/components/motion/Reveal";
import { CTA } from "@/components/sections/CTA";
import { getAllInsights } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Insights ~ Notes from the whole stack",
  description:
    "Short, opinionated notes on pipelines, dashboards, and products ~ from the team that builds all three.",
  alternates: { canonical: `${siteConfig.url}/insights` },
  openGraph: {
    title: "Insights ~ Notes from the whole stack",
    description:
      "Short, opinionated notes on pipelines, dashboards, and products ~ from the team that builds all three.",
    url: `${siteConfig.url}/insights`,
    images: [
      {
        url: "/og?title=Notes%20from%20the%20whole%20stack&kicker=INSIGHTS",
        width: 1200,
        height: 630,
        alt: "Insights ~ Notes from the whole stack",
      },
    ],
  },
};

export default async function InsightsPage() {
  const posts = await getAllInsights();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${siteConfig.url}/insights` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="relative overflow-hidden border-b border-border">
        <GridTexture />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeader
            index="01"
            kicker="Insights"
            title="Notes from the whole stack."
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="divide-y divide-border border-y border-border">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i * 0.05, 0.2)}>
              <article>
                <Link
                  href={`/insights/${post.slug}`}
                  className="group block space-y-2 py-7 transition-colors"
                >
                  <p className="mono-label text-[11px] text-muted-foreground">
                    {formatDate(post.frontmatter.publishedAt)}
                    <span aria-hidden="true"> · </span>
                    <span>{post.readingTime}</span>
                  </p>
                  <h2 className="font-heading text-xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                    {post.frontmatter.title}
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {post.frontmatter.description}
                  </p>
                  <span className="mono-label inline-flex items-center gap-1.5 pt-1 text-[12px] text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span>Read post</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
