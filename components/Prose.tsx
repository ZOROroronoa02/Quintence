/**
 * @file components/Prose.tsx
 * @description Hand-rolled MDX narrative renderer. No typography plugin ~ h2s get
 * the mono-kicker treatment, body/links/lists follow instrument-panel tokens.
 * Pass `proseComponents` to MDXRemote for full control.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-none text-[15px] leading-7 text-muted-foreground",
        "[&_>*:first-child]:mt-0",
        "[&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-mono [&_h2]:text-xs [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:tracking-[0.14em] [&_h2]:text-primary",
        "[&_h2]:before:mr-2 [&_h2]:before:text-muted-foreground [&_h2]:before:content-['//']",
        "[&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-base [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-wide [&_h3]:text-foreground",
        "[&_p]:mb-5",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40 hover:[&_a]:decoration-primary",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
        "[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
        "[&_li]:marker:text-primary",
        "[&_code]:rounded [&_code]:border [&_code]:border-border [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-primary",
        "[&_blockquote]:mb-5 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:text-foreground",
        "[&_hr]:my-8 [&_hr]:border-border",
        className,
      )}
    >
      {children}
    </div>
  );
}
