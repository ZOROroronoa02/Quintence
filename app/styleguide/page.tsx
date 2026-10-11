/**
 * @file app/styleguide/page.tsx
 * @description Living design-system documentation for Quintence. Every section is
 * built from real tokens ~ nothing hardcoded. This page is the acceptance surface
 * for Phase 2 and the visual reference for Phases 3–5.
 */

import { Metadata } from "next";
import { ArrowRight, Terminal, Activity, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Logo } from "@/components/brand/Logo";
import { SectionHeader } from "@/components/system/SectionHeader";
import { StatusDot } from "@/components/system/StatusDot";
import { GridTexture } from "@/components/system/GridTexture";
import { Sparkline } from "@/components/system/Sparkline";
import { Stat } from "@/components/system/Stat";
import { CountUp } from "@/components/system/CountUp";
import { ProcessStep } from "@/components/system/ProcessStep";
import { Prose } from "@/components/Prose";
import { DeliverableList } from "@/components/system/DeliverableList";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { FilterChipsDemo } from "@/components/sections/WorkIndex";
import { ButtonLink } from "@/components/system/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Component Styleguide & Tokens",
  description:
    "Living design-system documentation for Quintence: tokens, type, signature elements, components, and motion.",
  robots: { index: false, follow: false },
};

const swatches = [
  { token: "background", className: "bg-background", hex: "#F6F5EF / #0A0E14", usage: "Page base" },
  { token: "card", className: "bg-card", hex: "#FFFFFF / #0E141E", usage: "Panels, cards" },
  { token: "raised", className: "bg-raised", hex: "#ECE7DD / #131B29", usage: "Hover, emphasis" },
  { token: "overlay", className: "bg-overlay", hex: "#ECE7DD / #05080C", usage: "Bands, footer" },
  { token: "primary", className: "bg-primary", hex: "#1E6CB4 / #6CB2E6", usage: "Accent, CTAs" },
  { token: "accent", className: "bg-accent", hex: "#46506C / #AACEE7", usage: "Supporting glow" },
];

const contrastPairs = [
  { pair: "foreground on background (dark)", ratio: "17.3 : 1", grade: "AAA", textClass: "text-foreground", bgClass: "bg-background" },
  { pair: "muted-foreground on background (dark)", ratio: "6.6 : 1", grade: "AA", textClass: "text-muted-foreground", bgClass: "bg-background" },
  { pair: "primary on background (dark)", ratio: "8.4 : 1", grade: "AAA", textClass: "text-primary", bgClass: "bg-background" },
  { pair: "primary-foreground on primary (dark)", ratio: "7.6 : 1", grade: "AAA", textClass: "text-primary-foreground", bgClass: "bg-primary" },
  { pair: "success on background (dark)", ratio: "10.3 : 1", grade: "AAA", textClass: "text-success", bgClass: "bg-background" },
  { pair: "destructive on background (dark)", ratio: "7.0 : 1", grade: "AA", textClass: "text-destructive", bgClass: "bg-background" },
];

const spacingScale = ["4", "8", "12", "16", "24", "32"];

export default function StyleguidePage() {
  return (
    <div className="relative">
      <GridTexture />
      <div className="relative z-10 mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-4 border-b border-border pb-8">
          <p className="mono-label text-primary">[ 00 ] Design system specification</p>
          <h1 className="text-display font-bold uppercase text-foreground">
            Quintence Styleguide
          </h1>
          <p className="text-body-lg max-w-2xl text-muted-foreground">
            Light + dark instrument-panel language, keyed to the wordmark bars. Every swatch, specimen, and component
            below resolves to a token in <code className="font-mono text-sm text-primary">globals.css @theme</code> ~
            nothing is hardcoded. Hex pairs read light / dark; ratios are quoted for the dark theme.
          </p>
        </div>

        {/* 01 · Color */}
        <section className="space-y-8">
          <SectionHeader
            index="01"
            kicker="Color tokens"
            title="Surface stack & signals"
            lede="Surfaces step from base to overlay. Accent is wordmark steel-blue #1E6CB4 / #6CB2E6; signals are dots and status only."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {swatches.map((s) => (
              <div key={s.token} className="space-y-2 rounded-lg border border-border bg-card p-4">
                <div className={`h-10 rounded-md border border-border ${s.className}`} />
                <p className="font-mono text-xs font-semibold text-foreground">{s.token}</p>
                <p className="font-mono text-[11px] text-primary">{s.hex}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{s.usage}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h3 className="mono-label text-muted-foreground">Contrast pairings ~ WCAG AA verified</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {contrastPairs.map((c) => (
                <div
                  key={c.pair}
                  className={`flex items-center justify-between rounded-lg border border-border px-4 py-3 ${c.bgClass}`}
                >
                  <span className={`text-sm font-semibold ${c.textClass}`}>{c.pair}</span>
                  <span className="mono-label text-[11px] text-muted-foreground">
                    {c.ratio} · {c.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusDot label="Live" tone="live" />
            <StatusDot label="Degraded" tone="warning" />
            <StatusDot label="Incident" tone="error" />
            <StatusDot label="Idle" tone="idle" pulse={false} />
          </div>
        </section>

        <Separator />

        {/* 02 · Typography */}
        <section className="space-y-8">
          <SectionHeader
            index="02"
            kicker="Typography"
            title="Fluid scale, three voices"
            lede="Space Grotesk for headings, Inter for body, JetBrains Mono for labels. Display sizes clamp with the viewport ~ zero layout shift."
          />
          <div className="space-y-6 rounded-xl border border-border bg-card p-6 sm:p-8">
            <div>
              <p className="mono-label mb-1 text-muted-foreground">Display · clamp(2.5rem, 6vw, 4.5rem)</p>
              <p className="text-display font-bold uppercase text-foreground">From pipeline to launch</p>
            </div>
            <div>
              <p className="mono-label mb-1 text-muted-foreground">H2 · section titles</p>
              <p className="text-h2 font-bold uppercase text-foreground">Verified production systems</p>
            </div>
            <div>
              <p className="mono-label mb-1 text-muted-foreground">H3 · card titles</p>
              <p className="text-h3 font-semibold text-foreground">Idempotent batch & streaming pipelines</p>
            </div>
            <div>
              <p className="mono-label mb-1 text-muted-foreground">Body large · ledes</p>
              <p className="text-body-lg text-muted-foreground">
                We architect fault-tolerant ETL pipelines, sub-second BI dashboards, and modern
                web products that deliver verifiable impact.
              </p>
            </div>
            <div>
              <p className="mono-label mb-1 text-muted-foreground">Mono label · signature recipe</p>
              <p className="mono-label text-primary">[ 01 ] Services · SLA 99.98% · dbt run --select core</p>
            </div>
            <div>
              <p className="mono-label mb-1 text-muted-foreground">Tabular numbers · metrics never jitter</p>
              <p className="font-heading text-3xl font-bold tabular-nums text-primary">
                99.98% · $240,000 · &lt;45s
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* 03 · Space & radii */}
        <section className="space-y-8">
          <SectionHeader
            index="03"
            kicker="Space & shape"
            title="4px base, sharp radii"
            lede="Sections breathe on one rhythm (section-pad). Radii stay lean ~ pills are reserved for badges, never buttons."
          />
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {spacingScale.map((s) => (
              <div key={s} className="space-y-2 rounded-lg border border-border bg-card p-4 text-center">
                <div className="flex h-10 items-end justify-center">
                  <div className="bg-primary" style={{ width: `${Number(s)}px`, height: `${Number(s)}px` }} />
                </div>
                <p className="font-mono text-xs text-foreground">{s}px</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="rounded-sm border border-border bg-raised px-5 py-3 font-mono text-xs text-foreground">radius-sm</div>
            <div className="rounded-md border border-border bg-raised px-5 py-3 font-mono text-xs text-foreground">radius-md · buttons</div>
            <div className="rounded-lg border border-border bg-raised px-5 py-3 font-mono text-xs text-foreground">radius-lg · cards</div>
            <Badge variant="default">pill · badges only</Badge>
          </div>
        </section>

        <Separator />

        {/* 04 · Signature elements */}
        <section className="space-y-8">
          <SectionHeader
            index="04"
            kicker="Signature language"
            title="Instrument panel motifs"
            lede="Every motif is a named, reusable component. No anonymous one-off divs anywhere in the codebase."
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>SectionHeader</CardTitle>
                <CardDescription>Bracket-index kicker + title + lede.</CardDescription>
              </CardHeader>
              <CardContent>
                <SectionHeader index="05" kicker="Capabilities" title="Core engineering services" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stat + Sparkline</CardTitle>
                <CardDescription>Tabular metric with mono label and data texture.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Stat value="3" label="Metrics per case study" description="Hard content rule · three big numbers" />
                <Sparkline />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-3">
            <h3 className="mono-label text-muted-foreground">Section divider with crosshair ticks</h3>
            <div className="section-divider pt-6">
              <p className="text-sm text-muted-foreground">Content below a hairline divider ~ ticks mark the section edges.</p>
            </div>
          </div>
        </section>

        <Separator />

        {/* 05 · Buttons */}
        <section className="space-y-8">
          <SectionHeader
            index="05"
            kicker="Components"
            title="Buttons & links"
            lede="Border-and-surface elevation only. Visible accent focus ring on every interactive element ~ tab through to verify."
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="default">Primary</Button>
            <Button variant="cyber">Cyber</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">
              <Terminal className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Outline</span>
            </Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">
              <span>Large CTA</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="icon" variant="outline" aria-label="Telemetry status">
              <Activity className="h-4 w-4 text-primary" aria-hidden="true" />
            </Button>
            <Button variant="default" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact" size="lg">
              <span>ButtonLink ~ navigates</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="signal">Signal</Badge>
            <Badge variant="telemetry">Telemetry</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </section>

        <Separator />

        {/* 06 · Forms */}
        <section className="space-y-8">
          <SectionHeader
            index="06"
            kicker="Components"
            title="Form primitives"
            lede="Radix-backed, token-styled, keyboard accessible. Error state uses the destructive token pair."
          />
          <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sg-name">Full name</Label>
              <Input id="sg-name" placeholder="e.g. Alex Morgan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sg-budget">Estimated budget</Label>
              <Select defaultValue="focused">
                <SelectTrigger id="sg-budget">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audit">Sprint audit</SelectItem>
                  <SelectItem value="focused">Focused pipeline / MVP</SelectItem>
                  <SelectItem value="rebuild">Full architecture rebuild</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sg-disabled">Disabled input</Label>
              <Input id="sg-disabled" placeholder="Unavailable" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sg-invalid">Invalid + error message</Label>
              <Input id="sg-invalid" placeholder="alex@company.com" aria-invalid="true" className="border-destructive/60" defaultValue="not-an-email" />
              <p className="font-mono text-xs text-destructive">Please provide a valid business email address.</p>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="sg-message">Project summary</Label>
              <Textarea id="sg-message" placeholder="Bottlenecks, timeline, goals..." />
            </div>
          </div>
        </section>

        <Separator />

        {/* 07 · Brand & motion */}
        <section className="space-y-8">
          <SectionHeader
            index="07"
            kicker="Brand & motion"
            title="Wordmark & reveal system"
            lede="Typographic lockup with bracket-tick mark. Motion is fadeUp on first inView ~ disable animation in your OS to verify the static fallback."
          />
          <div className="flex flex-wrap items-center gap-8 rounded-xl border border-border bg-card p-6">
            <Logo />
            <Logo compact />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[0, 0.1, 0.2].map((delay) => (
              <Reveal key={delay} delay={delay}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="signal">Reveal</Badge>
                      <span className="mono-label text-[11px] text-muted-foreground">delay {delay}s</span>
                    </div>
                    <CardTitle className="mt-2">Staggered entry</CardTitle>
                    <CardDescription>One shared ease curve, 0.5s band.</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-4">
                    <Button size="sm" variant="cyber" className="w-full">
                      <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Audit architecture</span>
                    </Button>
                  </CardFooter>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
        {/* 08 · Home primitives */}
        <section className="space-y-8">
          <SectionHeader
            index="08"
            kicker="Home primitives"
            title="CountUp & process step"
            lede="CountUp animates to its target on first inView and renders the final value instantly under reduced motion. ProcessStep carries the timeline rail tick."
          />
          <div className="grid grid-cols-2 gap-6 rounded-xl border border-border bg-card p-6 lg:grid-cols-4">
            <Stat value={<CountUp value={38} />} label="Pipelines shipped" />
            <Stat value={<CountUp value={99.9} decimals={1} suffix="%" />} label="Uptime" />
          </div>
          <div className="grid grid-cols-1 gap-8 rounded-xl border border-border bg-card p-6 sm:grid-cols-2">
            <ProcessStep
              index="01"
              name="Discover"
              description="We map your data landscape and define done in metrics, not adjectives."
            />
            <ProcessStep
              index="03"
              name="Build"
              description="Short cycles with weekly demos. You watch the pipeline come alive from day one."
            />
          </div>
        </section>
        {/* 09 · Content primitives */}
        <section className="space-y-8">
          <SectionHeader
            index="09"
            kicker="Content primitives"
            title="Prose, cards & lists"
            lede="Phase 4 additions: hand-rolled MDX prose with mono-kicker headings, the case study card in both variants, the numbered deliverable list, and sector filter chips."
          />
          <div className="space-y-3">
            <h3 className="mono-label text-muted-foreground">Prose ~ Challenge / Solution / Results</h3>
            <div className="rounded-xl border border-border bg-card p-6">
              <Prose>
                <h2>Challenge</h2>
                <p>
                  A 60-person fintech closed the books in <strong>spreadsheets</strong>: exports
                  and dumps stitched by hand. See the{" "}
                  <a href="https://example.com/work">full work index</a> for context.
                </p>
                <h2>Solution</h2>
                <ul>
                  <li>Single warehouse modeled on dbt</li>
                  <li>Idempotent pipelines with freshness SLAs</li>
                </ul>
              </Prose>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="mono-label text-muted-foreground">Case study card ~ full + compact</h3>
            <div className="grid grid-cols-1 gap-4">
              <CaseStudyCard
                study={{
                  slug: "unified-finance-reporting",
                  frontmatter: {
                    title: "One warehouse, two-day close",
                    slug: "unified-finance-reporting",
                    client: "Series-B fintech",
                    sector: "Fintech",
                    year: 2024,
                    services: ["etl-pipelines", "bi-dashboards"],
                    stack: ["Postgres", "dbt", "Dagster"],
                    summary: "Fourteen sources, one warehouse, one definition of revenue.",
                    anonymized: true,
                    featured: true,
                    metrics: [
                      { value: "9→2 days", label: "MONTHLY CLOSE" },
                      { value: "14", label: "SOURCES UNIFIED" },
                      { value: "40 hrs/mo", label: "MANUAL REPORTING REMOVED" },
                    ],
                  },
                }}
              />
              <CaseStudyCard
                variant="compact"
                study={{
                  slug: "embedded-product-analytics",
                  frontmatter: {
                    title: "Embedded analytics, six weeks",
                    slug: "embedded-product-analytics",
                    client: "B2B SaaS platform",
                    sector: "SaaS",
                    year: 2025,
                    services: ["web-products"],
                    stack: ["Next.js"],
                    summary: "Customer-facing usage analytics in six weeks.",
                    anonymized: true,
                    metrics: [
                      { value: "6 wks", label: "CONCEPT → LAUNCH" },
                      { value: "−31%", label: "SUPPORT TICKETS" },
                      { value: "100%", label: "ACTIVATED IN 30 DAYS" },
                    ],
                  },
                }}
              />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="mono-label text-muted-foreground">Deliverable list</h3>
            <div className="rounded-xl border border-border bg-card p-6">
              <DeliverableList
                items={[
                  "Source audit & ingestion design",
                  "Idempotent, tested pipeline builds",
                  "Orchestration with alerting",
                ]}
              />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="mono-label text-muted-foreground">Filter chips + service card</h3>
            <FilterChipsDemo options={["All", "Fintech", "SaaS"]} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ServiceCard
                service={{
                  slug: "etl-pipelines",
                  frontmatter: {
                    title: "ETL Pipelines",
                    slug: "etl-pipelines",
                    description: "Reliable data movement from any source to any warehouse.",
                    icon: "Database",
                    order: 1,
                    lede: "Reliable data movement ~ monitored, tested, documented.",
                    deliverables: [
                      "Source audit & ingestion design",
                      "Idempotent, tested pipeline builds",
                      "Orchestration with alerting",
                      "Data-quality checks & freshness SLAs",
                      "Runbooks & handover docs",
                    ],
                    fit: ["Reporting breaks when a source changes"],
                    stack: ["Postgres", "dbt"],
                  },
                }}
              />
            </div>
          </div>
        </section>
        {/* 10 · Form states */}
        <section className="space-y-8">
          <SectionHeader
            index="10"
            kicker="Form states"
            title="Fields, errors & panels"
            lede="Labels stay visible above every field. Invalid fields get a destructive border plus a linked error message; the honeypot is never rendered visibly."
          />
          <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sg-contact-name">Name *</Label>
              <Input id="sg-contact-name" placeholder="Ada Lovelace" defaultValue="Ada Lovelace" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sg-contact-email">Email *</Label>
              <Input
                id="sg-contact-email"
                type="email"
                defaultValue="not-an-email"
                aria-invalid="true"
                aria-describedby="sg-contact-email-error"
                className="border-destructive/60"
              />
              <p id="sg-contact-email-error" className="font-mono text-xs text-destructive">
                Enter a valid email address.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sg-contact-budget">Budget *</Label>
              <Select defaultValue="focused">
                <SelectTrigger id="sg-contact-budget">
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audit">Sprint audit</SelectItem>
                  <SelectItem value="focused">Focused pipeline / MVP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sg-contact-disabled">Disabled</Label>
              <Input id="sg-contact-disabled" placeholder="Unavailable" disabled />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="sg-contact-message">Message *</Label>
              <Textarea id="sg-contact-message" placeholder="Where does the pipeline hurt?" rows={3} />
            </div>
          </div>
          <div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-lg border border-success/40 bg-success/10 p-5">
              <p className="font-heading text-lg font-bold text-foreground">Received.</p>
              <p className="text-xs text-muted-foreground">Success panel (focused on show).</p>
            </div>
            <div className="space-y-2 rounded-lg border border-destructive/40 bg-destructive/10 p-5">
              <p className="font-heading text-lg font-bold text-foreground">Couldn&rsquo;t send that.</p>
              <p className="text-xs text-muted-foreground">Error banner + retry (aria-live).</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
