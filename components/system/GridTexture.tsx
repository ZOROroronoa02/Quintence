/**
 * @file components/system/GridTexture.tsx
 * @description Background instrument-panel grid texture. Static CSS gradients only ~
 * zero runtime cost. Opacity stays under 0.04 per the design system.
 */

import { cn } from "@/lib/utils";

interface GridTextureProps {
  className?: string;
  dense?: boolean;
}

export function GridTexture({ className, dense = false }: GridTextureProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        dense ? "instrument-grid-dense" : "instrument-grid",
        className,
      )}
    />
  );
}
