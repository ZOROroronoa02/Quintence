/**
 * @file components/ui/badge.tsx
 * @description Status indicator and tech-stack chip badge with telemetry accents.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono tracking-tight",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/20 text-primary border-primary/30",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground border-border",
        destructive:
          "border-transparent bg-destructive/20 text-destructive border-destructive/40",
        outline:
          "text-foreground border-border bg-card/40",
        signal:
          "border-accent/40 bg-accent-muted text-accent",
        telemetry:
          "border-success/40 bg-success/10 text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };


