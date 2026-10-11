/**
 * @file components/system/SectionHeader.tsx
 * @description Signature section header: bracket-index kicker ([ 01 ] SERVICES),
 * display title, and lede. Single source of section-heading rhythm across pages.
 */

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index: string;
  kicker: string;
  title: string;
  lede?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  index,
  kicker,
  title,
  lede,
  className,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-2xl space-y-3", centered && "mx-auto text-center", className)}>
      <p className="mono-label text-primary">
        <span aria-hidden="true">[ {index} ]</span> {kicker}
      </p>
      <h2 className="text-h2 font-bold uppercase text-foreground">{title}</h2>
      {lede && <p className="text-body-lg text-muted-foreground">{lede}</p>}
    </div>
  );
}
