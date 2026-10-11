/**
 * @file components/sections/ProcessTimeline.tsx
 * @description Home process section. Locked four-step copy lives here with the
 * section (not in config). Horizontal connected timeline on desktop, vertical
 * rail on mobile, composed from the ProcessStep primitive.
 */

import { SectionHeader } from "@/components/system/SectionHeader";
import { ProcessStep } from "@/components/system/ProcessStep";
import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
  {
    index: "01",
    name: "Discover",
    description: "We map your data landscape and define done in metrics, not adjectives.",
  },
  {
    index: "02",
    name: "Design",
    description:
      "Architecture and UX decided on paper first ~ pipeline schemas, dashboard wireframes, product flows.",
  },
  {
    index: "03",
    name: "Build",
    description:
      "Short cycles with weekly demos. You watch the pipeline come alive from day one.",
  },
  {
    index: "04",
    name: "Launch",
    description: "Deploy, monitor, document, hand over. Or stay on for ongoing care.",
  },
];

export function ProcessTimeline() {
  return (
    <section id="process" aria-label="Process overview" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeader
        index="03"
        kicker="Process"
        title="Discover → Design → Build → Launch."
        lede="A fixed shape for unpredictable work. You see working software every week, not a big reveal at the end."
      />
      <ol className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8">
        {STEPS.map((step, i) => (
          <li key={step.index}>
            <Reveal delay={i * 0.08}>
              <ProcessStep index={step.index} name={step.name} description={step.description} />
            </Reveal>
          </li>
        ))}
      </ol>
      <p className="mt-10">
        <a
          href="/process"
          className="mono-label inline-flex items-center gap-1.5 text-[12px] text-primary underline-offset-4 transition-colors hover:underline"
        >
          <span>Full engagement playbook</span>
          <span aria-hidden="true">→</span>
        </a>
      </p>
    </section>
  );
}
