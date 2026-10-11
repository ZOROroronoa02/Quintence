/**
 * @file app/(marketing)/insights/[slug]/page.tsx
 * @description Insight post template. Fully static: mono date/reading-time
 * line, H1, lede, Prose body, placeholder author line, next-post navigation,
 * shared CTA. Published date is visible text ~ freshness is never faked.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Prose } from "@/components/Prose";
import { GridTexture } from "@/components/system/GridTexture";
import { Reveal } from "@/components/motion/Reveal";
import { CTA } from "@/components/sections/CTA";
import { getAllInsights, getInsightBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export const dynamicParams = false;

// Studio byline until posts carry individual author names.
const POST_AUTHOR = { name: "Quintence Studio", role: "Data & digital engineering" };

interface InsightDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllInsights();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: InsightDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);
  if (!post) return { title: "Post not found" };

  const url = `${siteConfig.url}/insights/${post.slug}`;
  return {
    title: `${post.frontmatter.title} ~ Insights`,
    description: post.frontmatter.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url,
      images: [
        {
          url: `/og?title=${encodeURIComponent(post.frontmatter.title)}&kicker=INSIGHTS`,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
  };
}

export default async function InsightDetailPage({ params }: InsightDetailProps) {
  const { slug } = await params;
  const posts = await getAllInsights();
  const post = posts.find((p) => p.slug === slug || p.frontmatter.slug === slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;
  const url = `${siteConfig.url}/insights/${post.slug}`;

  const position = posts.findIndex((p) => p.slug === post.slug);
  const next = posts[(position + 1) % posts.length];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${siteConfig.url}/insights` },
      { "@type": "ListItem", position: 3, name: frontmatter.title, item: url },
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
        <div className="relative mx-auto max-w-4xl space-y-6 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Link
            href="/insights"
            className="mono-label inline-flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>All insights</span>
          </Link>
          <p className="mono-label text-[12px] text-muted-foreground">
            {formatDate(frontmatter.publishedAt)}
            <span aria-hidden="true"> · </span>
            <span className="text-primary">{readingTime}</span>
          </p>
          <h1 className="text-display font-bold leading-[1.05] text-foreground">
            {frontmatter.title}
          </h1>
          <p className="text-body-lg max-w-2xl leading-relaxed text-muted-foreground">
            {frontmatter.description}
          </p>
          <p className="mono-label text-[11px] text-muted-foreground">
            By {POST_AUTHOR.name} ~ {POST_AUTHOR.role}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-16 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <Prose>
            <MDXRemote source={content} />
          </Prose>
        </Reveal>

        {next && next.slug !== post.slug && (
          <Reveal>
            <Link
              href={`/insights/${next.slug}`}
              className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-6 py-5 transition-colors duration-200 hover:border-primary/50 hover:bg-raised"
            >
              <div className="space-y-1">
                <p className="mono-label text-[11px] text-muted-foreground">Next post</p>
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
