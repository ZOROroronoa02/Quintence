/**
 * @file components/sections/FeaturedWork.tsx
 * @description Home featured-work section. Sources the single case study flagged
 * `featured: true` via getFeaturedCaseStudy() ~ renders nothing when none is
 * flagged. Wide card: client + sector, one-line summary, three result metrics
 * via Stat, stack badges, and a link to the full case study.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/system/SectionHeader";
import { Stat } from "@/components/system/Stat";
import { Reveal } from "@/components/motion/Reveal";
import { getFeaturedCaseStudy } from "@/lib/mdx";

export async function FeaturedWork() {
  const study = await getFeaturedCaseStudy();
  if (!study) return null;

  const { frontmatter } = study;
  const metrics = frontmatter.metrics.slice(0, 3);

  return (
    <section className="section-divider bg-overlay">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeader
          index="02"
          kicker="Featured work"
          title="Proof, not promises."
          lede="One project, end to end. The challenge, the build, and the numbers after."
        />
        <Reveal className="mt-12">
          <Card className="overflow-hidden border-border bg-card">
            <CardHeader className="space-y-3 border-b border-border pb-6">
              <p className="mono-label text-[12px] text-muted-foreground">
                <span className="text-primary">{frontmatter.client}</span>
                <span aria-hidden="true"> · </span>
                <span>{frontmatter.sector}</span>
              </p>
              <h3 className="text-h3 max-w-3xl font-bold uppercase text-foreground">
                {frontmatter.title}
              </h3>
              <p className="max-w-3xl leading-relaxed text-muted-foreground">{frontmatter.summary}</p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-3">
              {metrics.map((metric) => (
                <Stat key={metric.label} value={metric.value} label={metric.label} />
              ))}
            </CardContent>
            <CardFooter className="flex flex-col items-start justify-between gap-6 pt-8 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-2" aria-label="Project stack">
                {frontmatter.stack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
              <Link
                href={`/work/${frontmatter.slug}`}
                className="mono-label inline-flex shrink-0 items-center gap-1.5 text-[13px] text-primary underline-offset-4 hover:underline"
              >
                <span>Read case study</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </CardFooter>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
