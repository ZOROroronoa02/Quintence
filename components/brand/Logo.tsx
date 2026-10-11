/**
 * @file components/brand/Logo.tsx
 * @description Quintence wordmark from the official logo artwork
 * (public/logo.png + logo-dark.png: transparent, theme-paired). The PNG
 * already contains the full QUINTENC≡ lockup, so this renders only the image
 * plus the optional sub-line. Light/dark variants swap via the Tailwind
 * class-based dark variant ~ no JS, correct on first paint.
 */

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Compact omits the sub-line for tight header slots. */
  compact?: boolean;
  /** Eager-load the artwork (header / LCP-adjacent slots only). */
  priority?: boolean;
}

export function Logo({ className, compact = false, priority = false }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
        alt="Quintence"
        width={960}
        height={173}
        priority={priority}
        className="block h-7 w-auto dark:hidden"
      />
      <Image
        src="/logo-dark.png"
        alt="Quintence"
        width={960}
        height={173}
        priority={priority}
        className="hidden h-7 w-auto dark:block"
      />
      {!compact && (
        <span className="mono-label mt-1 hidden text-[10px] text-muted-foreground sm:inline">
          Data & Digital Engineering
        </span>
      )}
    </span>
  );
}
