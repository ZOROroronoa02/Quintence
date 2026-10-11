/**
 * @file components/layout/NavLinks.tsx
 * @description Client island for desktop nav active-state. Split out so
 * Header stays a server component ~ only this small list ships JS.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const pathname = usePathname();
  const links = siteConfig.mainNav;

  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
      {links.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative px-3.5 py-2 text-sm font-medium transition-colors",
              "after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-200",
              isActive
                ? "text-foreground after:scale-x-100"
                : "text-muted-foreground after:scale-x-0 hover:text-foreground hover:after:scale-x-100",
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
