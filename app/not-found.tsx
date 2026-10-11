/**
 * @file app/not-found.tsx
 * @description Final 404. Mono error kicker, one locked line, links to the
 * routes visitors most likely wanted.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GridTexture } from "@/components/system/GridTexture";

const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
];

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <GridTexture />
      <div className="relative mx-auto max-w-2xl space-y-6 px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <p className="mono-label text-destructive">[ Error 404 ]</p>
        <h1 className="text-display font-bold uppercase leading-[1.05] text-foreground">
          Signal lost.
        </h1>
        <p className="text-body-lg text-muted-foreground">
          This route doesn&rsquo;t exist. The one you wanted probably does:
        </p>
        <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
          {ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="mono-label inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-5 py-2.5 text-[13px] text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <span>{route.label}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
