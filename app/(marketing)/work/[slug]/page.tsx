/**
 * @file app/(marketing)/work/[slug]/page.tsx
 * @description Case study detail template. Fully static (dynamicParams
 * disabled): hero with anonymized disclosure → 3-metric Stat row → narrative
 * body via Prose → stack + service links → next-study link → shared CTA.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Prose } from "@/components/Prose";
import { Stat } from "@/components/system/Stat";
import { Reveal } from "@/components/motion/Reveal";
import { AnonymizedNote } from "@/components/sections/CaseStudyCard";
import { CTA } from "@/components/sections/CTA";
import { GridTexture } from "@/components/system/GridTexture";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/mdx";
import { siteConfig } from "@/lib/config";

export const dynamicParams = false;

export async function generateStaticParams() {
  const studies = await getAllCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

interface CaseStudyDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: "Case study not found" };

  const url = `${siteConfig.url}/work/${study.slug}`;
  return {
    title: `${study.frontmatter.title} ~ Work`,
    description: study.frontmatter.summary,
    alternates: { canonical: url },
    openGraph: {
      title: study.frontmatter.title,
      description: study.frontmatter.summary,
      url,
      images: [
        {
          url: `/og?title=${encodeURIComponent(study.frontmatter.title)}&kicker=WORK`,
          width: 1200,
          height: 630,
          alt: study.frontmatter.title,
        },
      ],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const { frontmatter, content } = study;
  const url = `${siteConfig.url}/work/${study.slug}`;

  // Chronological wrap-around: studies sort newest-first, next is older.
  const studies = await getAllCaseStudies();
  const position = studies.findIndex((s) => s.slug === study.slug);
  const next = studies[(position + 1) % studies.length];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${siteConfig.url}/work` },
      { "@type": "ListItem", position: 3, name: frontmatter.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1 · Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <GridTexture />
        <div className="relative mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mono-label text-primary">[ Case study ]</p>
          <h1 className="text-display max-w-4xl font-bold uppercase leading-[1.05] text-foreground">
            {frontmatter.title}
          </h1>
          <div className="space-y-2">
            <p className="mono-label text-[13px] text-muted-foreground">
              <span className="text-foreground">{frontmatter.client}</span>
              <span aria-hidden="true"> · </span>
              <span>{frontmatter.sector}</span>
              <span aria-hidden="true"> · </span>
              <span>{frontmatter.year}</span>
            </p>
            {frontmatter.anonymized && <AnonymizedNote />}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Project stack">
            {frontmatter.stack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-16 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* 2 · Metric row */}
        <Reveal>
          <div className="grid grid-cols-1 gap-8 border-y border-border py-8 sm:grid-cols-3" aria-label="Key results">
            {frontmatter.metrics.map((metric) => (
              <Stat key={metric.label} value={metric.value} label={metric.label} />
            ))}
          </div>
        </Reveal>

        {/* 3 · Narrative */}
        <Reveal>
          <Prose>
            <MDXRemote source={content} />
          </Prose>
        </Reveal>

        {/* 4 · Stack + services */}
        <Reveal>
          <div className="grid grid-cols-1 gap-10 border-t border-border pt-10 sm:grid-cols-2">
            <div className="space-y-4">
              <h2 className="mono-label text-[12px] text-primary">Built with</h2>
              <div className="flex flex-wrap gap-2">
                {frontmatter.stack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="mono-label text-[12px] text-primary">Part of</h2>
              <ul className="space-y-2">
                {frontmatter.services.map((serviceSlug) => (
                  <li key={serviceSlug}>
                    <Link
                      href={`/services/${serviceSlug}`}
                      className="text-[15px] font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                    >
                      {serviceSlug
                        .split("-")
                        .map((word) => word[0].toUpperCase() + word.slice(1))
                        .join(" ")}{" "}
                      →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* 5 · Next case study */}
        {next && next.slug !== study.slug && (
          <Reveal>
            <Link
              href={`/work/${next.slug}`}
              className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-6 py-5 transition-colors duration-200 hover:border-primary/50 hover:bg-raised"
            >
              <div className="space-y-1">
                <p className="mono-label text-[11px] text-muted-foreground">Next case study</p>
                <p className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {next.frontmatter.title}
                </p>
              </div>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        )}
      </div>

      <CTA />
    </>
  );
}
