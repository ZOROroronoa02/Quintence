/**
 * @file app/error.tsx
 * @description Route-level error boundary. Instrument-panel styling to match
 * the 404; reset button retries the segment. No monitoring claims ~ failures
 * are reported by users via the config contact email.
 */

"use client";

import { useEffect } from "react";
import { RotateCcw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridTexture } from "@/components/system/GridTexture";
import { siteConfig } from "@/lib/config";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[route-error]", error);
  }, [error]);

  return (
    <div className="relative overflow-hidden">
      <GridTexture />
      <div className="relative mx-auto max-w-2xl space-y-6 px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <p className="mono-label text-destructive">[ Error 500 ]</p>
        <h1 className="text-display font-bold uppercase leading-[1.05] text-foreground">
          Fault detected.
        </h1>
        <p className="text-body-lg text-muted-foreground">
          Something broke on our side. Try again ~ if it keeps failing, email{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-mono text-sm text-primary underline underline-offset-4"
          >
            {siteConfig.contactEmail}
          </a>
          .
        </p>
        <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
          <Button onClick={reset} size="lg" className="gap-2">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Try again</span>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={`mailto:${siteConfig.contactEmail}`} className="gap-2">
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Email us</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
