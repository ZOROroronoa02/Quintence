/**
 * @file components/layout/Header.tsx
 * @description Final site header (server component). Sticky translucent blur +
 * hairline border, wordmark left, nav + CTA + theme toggle right. Active route
 * indicated with aria-current and an accent underline-slide via the NavLinks
 * client island. Mobile navigation lazy-loads the Sheet bundle.
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/system/ButtonLink";
import { NavLinks } from "@/components/layout/NavLinks";
import { MobileNavLazy } from "@/components/layout/MobileNavLazy";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { siteConfig } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Quintence ~ homepage"
          className="rounded-sm py-1 transition-colors"
        >
          <Logo compact priority />
        </Link>

        <NavLinks />

        <div className="flex items-center gap-1.5 sm:gap-3">
          <ButtonLink
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="cyber"
            size="sm"
            className="hidden gap-1.5 sm:inline-flex"
          >
            <span>Start Project</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </ButtonLink>
          <ThemeToggle />
          <MobileNavLazy />
        </div>
      </div>
    </header>
  );
}
