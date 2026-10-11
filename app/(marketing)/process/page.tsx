/**
 * @file app/(marketing)/process/page.tsx
 * @description Standalone Process playbook ~ deliberately unique from the home
 * teaser. Home shows a 4-card overview; this page is the full engagement
 * manual: vertical playbook with deliverables, weekly cadence, fit checklist,
 * and FAQ. No PipelineVisual, no stats strip ~ different rhythm entirely.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { SectionHeader } from "@/components/system/SectionHeader";
import { GridTexture } from "@/components/system/GridTexture";
import { ButtonLink } from "@/components/system/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { CTA } from "@/components/sections/CTA";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Process ~ How a Quintence engagement runs",
  description:
    "Discover, design, build, launch ~ with working demos every week, fixed deliverables per phase, and a handoff your team will thank you for.",
  alternates: { canonical: `${siteConfig.url}/process` },
  openGraph: {
    title: "Process ~ How a Quintence engagement runs",
    description:
      "Discover, design, build, launch ~ with working demos every week, fixed deliverables per phase, and a handoff your team will thank you for.",
    url: `${siteConfig.url}/process`,
    images: [
      {
        url: "/og?title=How%20a%20Quintence%20engagement%20runs&kicker=PROCESS",
        width: 1200,
        height: 630,
        alt: "Process ~ How a Quintence engagement runs",
      },
    ],
  },
};

const CADENCE = [
  {
    when: "Week 0",
    title: "Scoping call → proposal",
    description: "One 30-minute call, fixed-shape proposal within a week. No deck, no discovery theater.",
  },
  {
    when: "Week 1",
    title: "First data flow",
    description: "Credentials wired, first pipeline running against real sources. Kickoff to flow in under 2 weeks.",
  },
  {
    when: "Weekly",
    title: "Demo, every week",
    description: "Running software on a call ~ not slides. You steer while it's cheap to change.",
  },
  {
    when: "Launch",
    title: "Cutover + runbook",
    description: "Monitored production cutover, alerts, docs, and handoff. Or ongoing care if you want it.",
  },
];

const GOOD_FIT = [
  "You have real data sources and a real decision the work must serve.",
  "You want senior engineers, not an account manager relay.",
  "Weekly demos and direct feedback sound good, not scary.",
  "You'd rather scope tightly and expand than boil the ocean.",
];

const BAD_FIT = [
  "You need bodies to staff an existing backlog ~ we're a studio, not staff-aug.",
  "Success can't be stated in metrics (faster, cheaper, fewer errors).",
  "Decisions take quarters; we ship in weeks and need a counterpart who can too.",
];

const FAQ = [
  {
    q: "How long is a typical engagement?",
    a: "Most first engagements run 4–8 weeks: one week to first flow, weekly demos after that, launch with a runbook. Follow-ons are scoped the same way ~ fixed shape, no open-ended retainer required.",
  },
  {
    q: "Who actually does the work?",
    a: "Senior engineers only ~ the people on your scoping call build and ship. No handoff to juniors, no account-manager telephone game.",
  },
  {
    q: "What do we need to provide?",
    a: "Access to sources, one decision-maker for weekly demos, and a definition of done in numbers. We handle architecture, code, tests, docs, and cutover.",
  },
  {
    q: "What happens after launch?",
    a: "You get monitoring, alerts, and a runbook your team can operate. If you want ongoing care ~ telemetry review, model updates, new surfaces ~ that's a scoped follow-on, never a lock-in.",
  },
];

export default function ProcessPage() {
  const steps = siteConfig.processSteps;
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How a Quintence engagement runs",
    description: "Discover, design, build, launch ~ with working demos every week.",
    step: steps.map((s) => ({
      "@type": "HowToStep",
      position: s.step,
      name: s.name,
      text: s.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* 01 · Hero ~ editorial, not the home split-hero */}
      <section className="relative overflow-hidden border-b border-border">
        <GridTexture />
        <div className="relative mx-auto max-w-4xl space-y-6 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mono-label text-primary">
            <span aria-hidden="true">[ 01 ]</span> Process
          </p>
          <h1 className="text-display font-bold uppercase leading-[1.05] text-foreground">
            A fixed shape for unpredictable work.
          </h1>
          <p className="text-body-lg max-w-2xl leading-relaxed text-muted-foreground">
            Four phases, fixed deliverables each, working software every week. This is the
            full playbook ~ the home page only shows the summary.
          </p>
          <dl className="grid grid-cols-3 gap-4 border-y border-border py-5">
            {[
              ["< 2 wks", "Kickoff → first flow"],
              ["Weekly", "Live demos"],
              ["Senior", "Engineers only"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="mono-label order-2 text-[11px] text-muted-foreground">{label}</dt>
                <dd className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              <span>Start a project</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/work" variant="outline" size="lg">
              <span>See it in practice</span>
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 02 · Vertical playbook ~ unique to this page */}
      <section aria-label="Engagement playbook" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeader
          index="02"
          kicker="Playbook"
          title="Four phases, each with receipts."
          lede="Every phase ends with artifacts you keep ~ even if we never work together again."
        />
        <ol className="mt-12 space-y-0">
          {steps.map((step, i) => (
            <li key={step.step}>
              <Reveal delay={Math.min(i * 0.06, 0.18)}>
                <article className="relative grid grid-cols-1 gap-6 border-l border-border pb-12 pl-8 last:pb-0 sm:pl-10">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[7px] top-1 block h-3.5 w-3.5"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border-strong" />
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border-strong" />
                  </span>
                  <div className="space-y-2">
                    <p className="mono-label text-[12px] text-primary">
                      Phase {step.step} ~ {step.tagline}
                    </p>
                    <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-foreground">
                      {step.name}
                    </h3>
                    <p className="max-w-2xl leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <ul aria-label={`${step.name} deliverables`} className="rounded-lg border border-border bg-card p-5">
                    <li className="mono-label mb-3 text-[11px] text-muted-foreground">
                      You receive
                    </li>
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 py-1.5 text-[15px] text-foreground/90">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-success/50 bg-success/10">
                          <Check className="h-3 w-3 text-success" aria-hidden="true" />
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* 03 · Weekly cadence ~ horizontal band, different rhythm */}
      <section aria-label="Weekly cadence" className="section-divider bg-overlay">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeader
            index="03"
            kicker="Cadence"
            title="What your calendar looks like."
            lede="No status-theater. One recurring demo, async notes, decisions while they're cheap."
          />
          <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CADENCE.map((c, i) => (
              <li key={c.when}>
                <Reveal delay={i * 0.07}>
                  <div className="h-full space-y-2 rounded-lg border border-border bg-card p-6">
                    <p className="mono-label text-[12px] text-primary">{c.when}</p>
                    <h3 className="font-heading text-base font-bold uppercase tracking-wide text-foreground">
                      {c.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 · Fit check */}
      <section aria-label="Fit check" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeader
          index="04"
          kicker="Fit"
          title="Honest about when we're wrong."
          lede="We'd rather lose a bad-fit project in one call than drag it for a quarter."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-lg border border-success/40 bg-success/10 p-6 sm:p-8">
              <h3 className="mono-label text-[12px] text-success">Good fit if</h3>
              <ul className="mt-4 space-y-3">
                {GOOD_FIT.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-lg border border-border bg-card p-6 sm:p-8">
              <h3 className="mono-label text-[12px] text-muted-foreground">Not a fit if</h3>
              <ul className="mt-4 space-y-3">
                {BAD_FIT.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 05 · FAQ ~ native details, zero JS */}
      <section aria-label="Process FAQ" className="section-divider bg-overlay">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeader index="05" kicker="FAQ" title="Asked on every scoping call." />
          <div className="mt-12 divide-y divide-border border-y border-border">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="mono-label flex cursor-pointer list-none items-center justify-between gap-4 text-[13px] text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span aria-hidden="true" className="text-primary transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Prefer the short version?{" "}
            <Link href="/#process" className="text-primary underline-offset-4 hover:underline">
              Back to the home overview →
            </Link>
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}
