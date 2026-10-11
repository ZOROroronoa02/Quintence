/**
 * @file components/sections/WorkIndex.tsx
 * @description Client island for the work index: sector filter chips (useState
 * only, no URL sync) over a grid of case study cards. Receives serialized
 * studies (slug + frontmatter, no MDX bodies) from the server page.
 */

"use client";

import * as React from "react";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudyFrontmatter } from "@/types";
import { cn } from "@/lib/utils";

export interface WorkIndexStudy {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
}

export function FilterChips({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (option: string) => void;
  label: string;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={cn(
              "mono-label rounded-full border px-4 py-1.5 text-[12px] transition-colors duration-200",
              active
                ? "border-primary/60 bg-primary-muted text-primary"
                : "border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Self-contained interactive demo for the styleguide (server pages cannot
 * pass event handlers to client components).
 */
export function FilterChipsDemo({ options }: { options: string[] }) {
  const [value, setValue] = React.useState(options[0] ?? "All");
  return <FilterChips options={options} value={value} onChange={setValue} label="Filter demo" />;
}

export function WorkIndex({ studies }: { studies: WorkIndexStudy[] }) {
  const sectors = React.useMemo(
    () => ["All", ...Array.from(new Set(studies.map((s) => s.frontmatter.sector)))],
    [studies],
  );
  const [sector, setSector] = React.useState("All");
  const visible = sector === "All" ? studies : studies.filter((s) => s.frontmatter.sector === sector);

  return (
    <div className="space-y-10">
      <FilterChips options={sectors} value={sector} onChange={setSector} label="Filter by sector" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2" aria-live="polite">
        {visible.map((study, i) => (
          <Reveal key={study.slug} delay={(i % 2) * 0.08}>
            <CaseStudyCard study={study} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
