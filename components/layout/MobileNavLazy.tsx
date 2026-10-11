/**
 * @file components/layout/MobileNavLazy.tsx
 * @description Dynamic wrapper so the heavy Radix Sheet bundle only loads
 * when the mobile menu is actually opened (or on mobile viewports).
 * Keeps desktop initial JS minimal.
 */

"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileNav = dynamic(
  () => import("@/components/layout/MobileNav").then((m) => m.MobileNav),
  {
    ssr: false,
    loading: () => (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        className="text-foreground md:hidden"
        disabled
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Button>
    ),
  },
);

export function MobileNavLazy() {
  return <MobileNav />;
}
