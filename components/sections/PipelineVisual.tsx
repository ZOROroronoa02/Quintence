/**
 * @file components/sections/PipelineVisual.tsx
 * @description Decorative SVG flow diagram for the hero: SOURCES → TRANSFORM →
 * SURFACES. Draw-once on load ~ connectors draw via pathLength, one data pulse
 * travels source to end, then the diagram settles static. No infinite loops, no
 * raw CSS keyframes, no canvas. Under OS reduced motion it renders fully static.
 */

"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "@/lib/motion";
import { GridTexture } from "@/components/system/GridTexture";
import { cn } from "@/lib/utils";

interface Stage {
  title: string;
  cx: number;
  chips: string[];
  tone: "primary" | "accent" | "success";
}

const STAGES: Stage[] = [
  { title: "SOURCES", cx: 90, chips: ["POSTGRES", "STRIPE", "EVENTS"], tone: "primary" },
  { title: "TRANSFORM", cx: 280, chips: ["CLEANSE", "MODEL"], tone: "accent" },
  { title: "SURFACES", cx: 470, chips: ["DASHBOARD", "API", "APP"], tone: "success" },
];

const CHIP_W = 150;
const CHIP_H = 34;
const CHIP_GAP = 10;
const TITLE_Y = 44;
const CONNECTOR_Y = 121;
const LEFT_EDGE = 165;
const MID_LEFT = 205;
const MID_RIGHT = 355;
const RIGHT_EDGE = 395;

const toneText: Record<Stage["tone"], string> = {
  primary: "text-primary",
  accent: "text-accent",
  success: "text-success",
};

function chipY(stageIndex: number, chipIndex: number): number {
  // Center each stage's chip stack on the connector line.
  const count = STAGES[stageIndex].chips.length;
  const stackH = count * CHIP_H + (count - 1) * CHIP_GAP;
  return CONNECTOR_Y - stackH / 2 + chipIndex * (CHIP_H + CHIP_GAP);
}

export function PipelineVisual({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const instant = prefersReduced ? { initial: false as const } : {};

  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <GridTexture dense />
      <svg viewBox="0 0 560 300" className="relative h-auto w-full" role="presentation">
        {/* Stage frames + chips */}
        {STAGES.map((stage, si) => (
          <motion.g
            key={stage.title}
            {...instant}
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, ease: EASE, delay: 0.15 * si }}
          >
            <rect
              x={stage.cx - 85}
              y={24}
              width={170}
              height={216}
              rx={12}
              fill="none"
              stroke="var(--border)"
              strokeDasharray="4 4"
            />
            <text
              x={stage.cx}
              y={TITLE_Y}
              textAnchor="middle"
              fill="var(--muted-foreground)"
              fontSize={11}
              letterSpacing={2}
              fontFamily="var(--font-mono)"
            >
              {stage.title}
            </text>
            {stage.chips.map((chip, ci) => (
              <g key={chip}>
                <rect
                  x={stage.cx - CHIP_W / 2}
                  y={chipY(si, ci)}
                  width={CHIP_W}
                  height={CHIP_H}
                  rx={8}
                  fill="var(--secondary)"
                  stroke="var(--border-strong)"
                />
                <circle
                  cx={stage.cx - CHIP_W / 2 + 16}
                  cy={chipY(si, ci) + CHIP_H / 2}
                  r={3}
                  fill="var(--success)"
                />
                <text
                  x={stage.cx + 8}
                  y={chipY(si, ci) + CHIP_H / 2 + 4}
                  textAnchor="middle"
                  fill="var(--foreground)"
                  fontSize={11}
                  letterSpacing={1}
                  fontFamily="var(--font-mono)"
                >
                  {chip}
                </text>
              </g>
            ))}
          </motion.g>
        ))}

        {/* Connectors ~ draw once */}
        {[
          { x1: LEFT_EDGE, x2: MID_LEFT, delay: 0.5 },
          { x1: MID_RIGHT, x2: RIGHT_EDGE, delay: 0.8 },
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={CONNECTOR_Y}
            x2={line.x2}
            y2={CONNECTOR_Y}
            stroke="var(--border-strong)"
            strokeWidth={1.5}
            {...instant}
            initial={prefersReduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: DURATION.slow, ease: EASE, delay: line.delay }}
          />
        ))}

        {/* Direction chevrons */}
        {[MID_LEFT - 8, RIGHT_EDGE - 8].map((x, i) => (
          <motion.path
            key={i}
            d={`M ${x} ${CONNECTOR_Y - 5} L ${x + 8} ${CONNECTOR_Y} L ${x} ${CONNECTOR_Y + 5}`}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...instant}
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.fast, delay: 1.1 + i * 0.3 }}
          />
        ))}

        {/* Single data pulse ~ travels once, then settles (no loop) */}
        {!prefersReduced && (
          <motion.circle
            cx={LEFT_EDGE}
            cy={CONNECTOR_Y}
            r={4}
            fill="var(--primary)"
            initial={{ cx: LEFT_EDGE, opacity: 0 }}
            animate={{ cx: [LEFT_EDGE, MID_LEFT, MID_LEFT, RIGHT_EDGE], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 1.2 }}
          />
        )}

        {/* Live node markers */}
        {STAGES.map((stage) => (
          <circle
            key={stage.title}
            cx={stage.cx}
            cy={258}
            r={3}
            fill="currentColor"
            className={toneText[stage.tone]}
          />
        ))}
        <text
          x={280}
          y={278}
          textAnchor="middle"
          fill="var(--muted-foreground)"
          fontSize={10}
          letterSpacing={2}
          fontFamily="var(--font-mono)"
        >
          FLOW NOMINAL
        </text>
      </svg>
    </div>
  );
}
