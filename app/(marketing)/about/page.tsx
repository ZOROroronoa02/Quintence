/**
 * @file app/(marketing)/about/page.tsx
 * @description About the studio. Locked copy: story, five numbered principles,
 * placeholder team grid, mono stack columns. Closed by the shared CTA.
 */

import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/system/SectionHeader";
import { GridTexture } from "@/components/system/GridTexture";
import { Reveal } from "@/components/motion/Reveal";
import { CTA } from "@/components/sections/CTA";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About ~ The wall between pipeline and product, removed",
  description:
    "Quintence is a small, senior team that owns the whole path: from raw sources to the dashboard your CFO opens and the product your customers use.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: "About ~ The wall between pipeline and product, removed",
    description:
      "Quintence is a small, senior team that owns the whole path: from raw sources to the dashboard your CFO opens and the product your customers use.",
    url: `${siteConfig.url}/about`,
    images: [
      {
        url: "/og?title=About%20Quintence&kicker=ABOUT",
        width: 1200,
        height: 630,
        alt: "About ~ The wall between pipeline and product, removed",
      },
    ],
  },
};

const PRINCIPLES = [
  {
    index: "01",
    name: "Own the whole path",
    description:
      "Handoffs are where context dies. One team holds the schema, the pipeline, and the UI ~ nothing gets lost between warehouse and screen.",
  },
  {
    index: "02",
    name: "Working software weekly",
    description: "Running pipelines and live demos every week, not a big reveal at the end.",
  },
  {
    index: "03",
    name: "Metrics, not adjectives",
    description:
      "“Faster” isn’t a result. Nine days to two is. We define success in numbers before writing code.",
  },
  {
    index: "04",
    name: "Built for the inheritor",
    description:
      "Docs, runbooks, and tests aren’t add-ons. The next engineer after us ~ often you ~ should thank us, not curse us.",
  },
  {
    index: "05",
    name: "Boring where it counts",
    description:
      "Our pipelines are boring. Our interfaces aren’t. Complexity goes into the product surface; infrastructure stays predictable.",
  },
];

const STACK = {
  data: ["Postgres", "Snowflake", "BigQuery", "dbt", "Dagster", "Airbyte", "Metabase", "Python"],
  web: ["Next.js", "React", "TypeScript", "Tailwind", "Motion", "Supabase", "Stripe"],
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <GridTexture />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeader
            index="01"
            kicker="About"
            title="The wall between your pipeline and your product ~ removed."
          />
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <div className="space-y-5 text-body-lg leading-relaxed text-muted-foreground">
            <p>
              Quintence started with a pattern we kept seeing: companies would fix their data
              problem ~ or think they had ~ and still couldn&rsquo;t ship the product it was
              supposed to power. The pipeline team threw dashboards over the wall. The web agency
              rebuilt what the pipeline already computed. Every handoff leaked context.
            </p>
            <p>
              We were the engineers on both sides of that wall. So we removed it.
            </p>
            <p>
              Quintence is a small, senior team that owns the whole path: from raw sources to the
              dashboard your CFO opens and the product your customers use. Deliberately boutique
              ~ a handful of engagements at a time, senior engineers only.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Principles */}
      <section className="section-divider bg-overlay">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeader index="02" kicker="Principles" title="How we work." />
          <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((principle, i) => (
              <li key={principle.index}>
                <Reveal delay={(i % 3) * 0.08}>
                  <p className="mono-label text-[13px] text-primary">{principle.index}</p>
                  <h3 className="mt-2 font-heading text-lg font-bold uppercase tracking-wide text-foreground">
                    {principle.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team ~ grid omitted until real names ship; locked line instead */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeader
          index="03"
          kicker="Team"
          title="Senior engineers only."
          lede="A small senior team ~ the engineers you meet on the first call are the ones who build and ship."
        />
      </section>

      {/* Stack */}
      <section className="section-divider bg-overlay">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeader index="04" kicker="Stack" title="Boring technology, sharp product." />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {(Object.keys(STACK) as (keyof typeof STACK)[]).map((column) => (
              <div key={column} className="space-y-4 rounded-lg border border-border bg-card p-6">
                <h3 className="mono-label text-[12px] text-primary">{column}</h3>
                <div className="flex flex-wrap gap-2">
                  {STACK[column].map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Boring technology, sharp product. We choose tools our clients can hire for.
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}
