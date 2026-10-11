/**
 * @file components/sections/StatsBar.tsx
 * @description Home metrics strip. Locked fallback set: commitments and
 * structural facts only ~ no fabricated history. Count-up on first inView,
 * hairline top/bottom borders, 2×2 on mobile.
 */

import { Stat } from "@/components/system/Stat";
import { CountUp } from "@/components/system/CountUp";
import { Reveal } from "@/components/motion/Reveal";

type HomeStat =
  | { kind: "count"; value: number; decimals?: number; prefix?: string; suffix?: string; label: string }
  | { kind: "static"; text: string; label: string };

const STATS: HomeStat[] = [
  { kind: "count", value: 5, label: "Core services" },
  { kind: "count", value: 100, suffix: "%", label: "Senior engineers" },
  { kind: "count", value: 2, prefix: "<", suffix: " wks", label: "Kickoff to first data flow" },
  { kind: "static", text: "Weekly", label: "Working demos" },
];

export function StatsBar() {
  return (
    <section aria-label="Studio metrics" className="border-y border-border bg-overlay">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <Stat
              value={
                stat.kind === "count" ? (
                  <CountUp
                    value={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                ) : (
                  <span className="tabular-nums">{stat.text}</span>
                )
              }
              label={stat.label.toUpperCase()}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
