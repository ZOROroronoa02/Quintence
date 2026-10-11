/**
 * @file components/sections/Hero.tsx
 * @description Home hero. Split layout: locked positioning copy left, decorative
 * pipeline visual right (stacks on mobile, never hidden). H1 and subhead are
 * server-rendered text so LCP is never gated on the visual.
 */

import { ArrowRight } from "lucide-react";
import { StatusDot } from "@/components/system/StatusDot";
import { ButtonLink } from "@/components/system/ButtonLink";
import { GridTexture } from "@/components/system/GridTexture";
import { PipelineVisual } from "@/components/sections/PipelineVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <GridTexture />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
        <div className="max-w-2xl space-y-6 lg:col-span-7">
          <StatusDot label="Accepting new projects" />
          <h1 className="text-display font-bold uppercase leading-[1.05] text-foreground">
            From pipeline to launch.
          </h1>
          <p className="text-body-lg max-w-xl leading-relaxed text-muted-foreground">
            Quintence is a boutique data &amp; digital engineering studio. We build the
            pipelines, dashboards, and web products that growing businesses run on ~
            infrastructure you can actually trust.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              <span>Start a project</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/work" variant="outline" size="lg">
              <span>See the work</span>
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-5">
          <PipelineVisual />
        </div>
      </div>
    </section>
  );
}
