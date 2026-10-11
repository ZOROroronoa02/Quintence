/**
 * @file components/sections/CaseStudyCard.tsx
 * @description Case study card for the work index and related-work rails. Title,
 * client/sector/year mono-line, summary, 3-metric preview, stack badges, and an
 * anonymized-composite disclosure where flagged. Compact variant for rails.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MDXDocument, CaseStudyFrontmatter } from "@/types";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  /** Slug + frontmatter only ~ cards never need MDX bodies. */
  study: Pick<MDXDocument<CaseStudyFrontmatter>, "slug" | "frontmatter">;
  variant?: "full" | "compact";
  className?: string;
}

export function AnonymizedNote({ className }: { className?: string }) {
  return (
    <p className={cn("mono-label text-[11px] text-muted-foreground", className)}>
      Client anonymized ~ composite engagement
    </p>
  );
}

export function CaseStudyCard({ study, variant = "full", className }: CaseStudyCardProps) {
  const { frontmatter } = study;
  const href = `/work/${study.slug}`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-5 py-4 transition-colors duration-200 hover:border-primary/50 hover:bg-raised",
          className,
        )}
      >
        <div className="space-y-1">
          <p className="mono-label text-[11px] text-muted-foreground">
            {frontmatter.client} · {frontmatter.sector} · {frontmatter.year}
          </p>
          <p className="font-heading text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            {frontmatter.title}
          </p>
        </div>
        <ArrowRight
          className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    );
  }

  return (
    <Card
      className={cn(
        "group flex h-full flex-col border-border bg-card transition-colors duration-200 hover:border-primary/50 hover:bg-raised",
        className,
      )}
    >
      <CardHeader className="space-y-3">
        <p className="mono-label text-[11px] text-muted-foreground">
          <span className="text-primary">{frontmatter.client}</span>
          <span aria-hidden="true"> · </span>
          <span>{frontmatter.sector}</span>
          <span aria-hidden="true"> · </span>
          <span>{frontmatter.year}</span>
        </p>
        <CardTitle className="text-h3 transition-colors duration-200 group-hover:text-primary">
          <Link href={href}>{frontmatter.title}</Link>
        </CardTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">{frontmatter.summary}</p>
      </CardHeader>

      <CardContent className="flex-1 space-y-5">
        <dl className="grid grid-cols-3 gap-3 border-y border-border py-4">
          {frontmatter.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col space-y-1">
              <dt className="mono-label order-2 text-[10px] leading-snug text-muted-foreground">
                {metric.label}
              </dt>
              <dd className="order-1 font-heading text-lg font-bold tabular-nums text-primary sm:text-xl">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-1.5" aria-label="Project stack">
          {frontmatter.stack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
        {frontmatter.anonymized && <AnonymizedNote />}
      </CardContent>

      <CardFooter className="pt-4">
        <Link
          href={href}
          className="mono-label inline-flex items-center gap-1.5 text-[12px] text-primary underline-offset-4 hover:underline"
        >
          <span>Read case study</span>
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </CardFooter>
    </Card>
  );
}
