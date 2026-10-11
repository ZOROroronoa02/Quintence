/**
 * @file components/sections/ServicesGrid.tsx
 * @description Home services grid. Sources all five services from content
 * frontmatter (summary as the one-liner); iconName mapped to the Phase 3
 * lucide set. Accepts explicit props so the services index stub can reuse it
 * with its own heading until Phase 4.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/system/SectionHeader";
import { ServiceIcon } from "@/components/system/ServiceIcon";
import { Reveal } from "@/components/motion/Reveal";
import { getAllServices } from "@/lib/mdx";

export interface ServiceItem {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  iconName: string;
  techStack: string[];
}

interface ServicesGridProps {
  services?: ServiceItem[];
  title?: string;
  lede?: string;
  /** @deprecated Use `lede`. Kept so the services stub compiles until Phase 4. */
  subtitle?: string;
  showExploreLink?: boolean;
  /** @deprecated Use `showExploreLink`. Kept so the services stub compiles until Phase 4. */
  showViewAll?: boolean;
}

export async function ServicesGrid({
  services,
  title = "Five services. One continuous stack.",
  lede,
  subtitle,
  showExploreLink = true,
  showViewAll = true,
}: ServicesGridProps) {
  const resolvedLede =
    lede ??
    subtitle ??
    "Most studios hand you off at the handoff. We own the path from raw data to shipped product ~ so nothing gets lost between the pipeline and the product.";
  const items: ServiceItem[] =
    services ??
    (await getAllServices()).map((doc) => ({
      slug: doc.slug,
      title: doc.frontmatter.title,
      tagline: doc.frontmatter.lede,
      summary: doc.frontmatter.description,
      iconName: doc.frontmatter.icon,
      techStack: doc.frontmatter.stack ?? [],
    }));

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeader index="01" kicker="Services" title={title} lede={resolvedLede} />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((service, i) => (
          <Reveal key={service.slug} delay={(i % 3) * 0.08} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}>
            <Card className="group flex h-full flex-col border-border bg-card transition-colors duration-200 hover:border-primary/50 hover:bg-raised">
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-secondary transition-colors duration-200 group-hover:border-primary/40">
                  <ServiceIcon name={service.iconName} />
                </div>
                <CardTitle className="text-h3">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
              </CardContent>
              <CardFooter className="pt-4">
                <Link
                  href={`/services/${service.slug}`}
                  className="mono-label inline-flex items-center gap-1.5 text-[12px] text-primary underline-offset-4 hover:underline"
                >
                  <span>Learn more</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </CardFooter>
            </Card>
          </Reveal>
        ))}
      </div>
      {showExploreLink && showViewAll && (
        <div className="mt-10">
          <Link
            href="/services"
            className="mono-label inline-flex items-center gap-1.5 text-[13px] text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            <span>Explore services</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </section>
  );
}
