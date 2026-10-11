/**
 * @file components/layout/MobileNav.tsx
 * @description Mobile navigation built on the shadcn Sheet primitive. Focus-trapped
 * by Radix Dialog, closes on route change, overlay click, and Esc.
 */

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/system/ButtonLink";
import { StatusDot } from "@/components/system/StatusDot";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="text-foreground md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent aria-label="Mobile navigation">
        <SheetHeader>
          <Logo compact />
          <SheetTitle className="sr-only">Site menu</SheetTitle>
          <SheetDescription>From pipeline to launch</SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto p-6">
          {siteConfig.mainNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between border-b border-border py-3.5 font-heading text-lg tracking-wide transition-colors",
                  isActive ? "text-primary" : "text-foreground/80 hover:text-foreground",
                )}
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="mono-label rounded-full border border-accent/40 bg-accent-muted px-2 py-0.5 text-[10px] text-accent">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-4 border-t border-border p-6">
          <ButtonLink
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            <span>Start an Engagement</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <StatusDot label="Accepting projects" className="w-full justify-center" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
