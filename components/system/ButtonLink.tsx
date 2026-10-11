/**
 * @file components/system/ButtonLink.tsx
 * @description Next.js Link rendered with button variants. Use for any CTA that
 * navigates ~ keeps link semantics with button styling in one typed component.
 */

import * as React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof buttonVariants> {
  href: string;
}

export function ButtonLink({ href, variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </Link>
  );
}
