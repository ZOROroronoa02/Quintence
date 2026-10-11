/**
 * @file app/(marketing)/services/[slug]/page.tsx
 * @description Service detail template. Fully static (dynamicParams disabled):
 * hero → approach (MDX body) → numbered deliverables → fit checklist →
 * related work → shared CTA. BreadcrumbList + Service JSON-LD included.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Prose } from "@/components/Prose";
import { ServiceIcon } from "@/components/system/ServiceIcon";
import { DeliverableList } from "@/components/system/DeliverableList";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { Reveal } from "@/components/motion/Reveal";
import { CTA } from "@/components/sections/CTA";
import { GridTexture } from "@/components/system/GridTexture";
import { getAllServices, getCaseStudiesByService, getServiceBySlug } from "@/lib/mdx";
import { siteConfig } from "@/lib/config";

export const dynamicParams = false;

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({ slug: service.slug }));
}

interface ServiceDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };

  const url = `${siteConfig.url}/services/${service.slug}`;
  return {
    title: `${service.frontmatter.title} ~ Services`,
    description: service.frontmatter.description,
    alternates: { canonical: url },
    openGraph: {
      title: service.frontmatter.title,
      description: service.frontmatter.description,
      url,
      images: [
        {
          url: `/og?title=${encodeURIComponent(service.frontmatter.title)}&kicker=SERVICES`,
          width: 1200,
          height: 630,
          alt: service.frontmatter.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const { frontmatter, content } = service;
  const related = await getCaseStudiesByService(service.slug);
  const url = `${siteConfig.url}/services/${service.slug}`;
  const index = String(frontmatter.order).padStart(2, "0");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
      { "@type": "ListItem", position: 3, name: frontmatter.title, item: url },
    ],
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: frontmatter.title,
    description: frontmatter.description,
    url,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* 1 · Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <GridTexture />
        <div className="relative mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mono-label text-primary">
            <span aria-hidden="true">[ {index} ]</span> Service
          </p>
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-secondary">
            <ServiceIcon name={frontmatter.icon} className="h-7 w-7" />
          </div>
          <h1 className="text-display max-w-4xl font-bold uppercase leading-[1.05] text-foreground">
            {frontmatter.title}
          </h1>
          <p className="text-body-lg max-w-2xl leading-relaxed text-muted-foreground">
            {frontmatter.lede}
          </p>
          <div className="flex flex-wrap gap-2" aria-label="Service stack">
            {frontmatter.stack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-16 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* 2 · Approach */}
        <Reveal>
          <section aria-label="Approach">
            <Prose>
              <MDXRemote source={content} />
            </Prose>
          </section>
        </Reveal>

        {/* 3 · What you get */}
        <Reveal>
          <section aria-label="Deliverables" className="space-y-6">
            <h2 className="text-h2 font-bold uppercase text-foreground">What you get</h2>
            <DeliverableList items={frontmatter.deliverables} />
          </section>
        </Reveal>

        {/* 4 · Good fit if */}
        <Reveal>
          <section aria-label="Good fit signals" className="space-y-6">
            <h2 className="text-h2 font-bold uppercase text-foreground">Good fit if</h2>
            <ul className="space-y-3">
              {frontmatter.fit.map((signal) => (
                <li key={signal} className="flex items-start gap-3 text-[15px] text-foreground/90">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-success/50 bg-success/10">
                    <Check className="h-3 w-3 text-success" aria-hidden="true" />
                  </span>
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* 5 · Related work */}
        {related.length > 0 && (
          <Reveal>
            <section aria-label="Related work" className="space-y-6">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-h2 font-bold uppercase text-foreground">Related work</h2>
                <Link
                  href="/work"
                  className="mono-label shrink-0 text-[12px] text-primary underline-offset-4 hover:underline"
                >
                  All work →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {related.map((study) => (
                  <CaseStudyCard key={study.slug} study={study} variant="compact" />
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </div>

      <CTA />
    </>
  );
}
