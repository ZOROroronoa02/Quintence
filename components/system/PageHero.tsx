/**
 * @file components/system/PageHero.tsx
 * @description The single canonical page hero. Every index-style page
 * (services, work, insights, about, contact) renders this component — one
 * markup, one spacing scale, zero drift. Deliberately NOT used by: the home
 * split-hero, the process editorial hero, metadata-heavy detail heroes, legal
 * docs, and system pages. Uniformity where it counts, character where it matters.
 */

import * as React from "react";
import { SectionHeader } from "@/components/system/SectionHeader";
import { GridTexture } from "@/components/system/GridTexture";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  index?: string;
  kicker: string;
  title: string;
  lede?: string;
  /** Extra hero content (e.g. status line) stacked under the header. */
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  index = "01",
  kicker,
  title,
  lede,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <GridTexture />
      <div
        className={cn(
          "relative mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 lg:px-8 lg:py-24",
          className,
        )}
      >
        <SectionHeader index={index} kicker={kicker} title={title} lede={lede} />
        {children}
      </div>
    </section>
  );
}
