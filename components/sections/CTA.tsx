/**
 * @file components/sections/CTA.tsx
 * @description Home closing CTA. Centered, GridTexture backdrop, primary project
 * CTA plus a direct mailto secondary sourced from lib/config.ts. Shared with
 * stub pages (same API, no props) until Phases 4–5.
 */

import { ArrowRight, Mail } from "lucide-react";
import { ButtonLink } from "@/components/system/ButtonLink";
import { GridTexture } from "@/components/system/GridTexture";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/config";

export function CTA() {
  return (
    <section className="relative overflow-hidden">
      <GridTexture />
      <div className="relative mx-auto max-w-3xl space-y-6 px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="text-h2 font-bold uppercase text-foreground">
            Your data, engineered to be trusted.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-body-lg text-muted-foreground">
            Tell us where the pipeline hurts. We&rsquo;ll scope it in one call ~ no deck, no
            fluff.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              <span>Start a project</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={`mailto:${siteConfig.contactEmail}`} variant="outline" size="lg">
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>{siteConfig.contactEmail}</span>
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
