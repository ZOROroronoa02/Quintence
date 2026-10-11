/**
 * @file components/sections/ServiceCard.tsx
 * @description Full service index card: icon, title, lede, top-3 deliverables
 * preview, and a link to the detail page. Richer than the home grid card.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceIcon } from "@/components/system/ServiceIcon";
import type { MDXDocument, ServiceFrontmatter } from "@/types";

export function ServiceCard({
  service,
}: {
  /** Slug + frontmatter only ~ cards never need MDX bodies. */
  service: Pick<MDXDocument<ServiceFrontmatter>, "slug" | "frontmatter">;
}) {
  const { frontmatter } = service;
  const href = `/services/${service.slug}`;

  return (
    <Card className="group flex h-full flex-col border-border bg-card transition-colors duration-200 hover:border-primary/50 hover:bg-raised">
      <CardHeader className="space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-secondary transition-colors duration-200 group-hover:border-primary/40">
          <ServiceIcon name={frontmatter.icon} />
        </div>
        <div className="space-y-2">
          <p className="mono-label text-[11px] text-muted-foreground">
            [ {String(frontmatter.order).padStart(2, "0")} ] Service
          </p>
          <CardTitle className="text-h3 transition-colors duration-200 group-hover:text-primary">
            <Link href={href}>{frontmatter.title}</Link>
          </CardTitle>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{frontmatter.lede}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2 border-t border-border pt-4">
          {frontmatter.deliverables.slice(0, 3).map((item) => (
            <li key={item} className="flex items-baseline gap-3 text-sm text-foreground/90">
              <span aria-hidden="true" className="font-mono text-[11px] text-primary">
                →
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4">
        <Link
          href={href}
          className="mono-label inline-flex items-center gap-1.5 text-[12px] text-primary underline-offset-4 hover:underline"
        >
          <span>View service</span>
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </CardFooter>
    </Card>
  );
}
