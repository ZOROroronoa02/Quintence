/**
 * @file components/system/ProcessStep.tsx
 * @description Numbered process step for the instrument-panel timeline. Mono
 * index, name, description ~ no icons. The parent timeline provides the rail;
 * this renders the crosshair tick that sits on it.
 */

import { cn } from "@/lib/utils";

interface ProcessStepProps {
  index: string;
  name: string;
  description: string;
  className?: string;
}

export function ProcessStep({ index, name, description, className }: ProcessStepProps) {
  return (
    <div className={cn("group relative border-l border-border pl-8 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8", className)}>
      <span
        aria-hidden="true"
        className="absolute -left-[7px] top-1 block h-3.5 w-3.5 lg:left-0 lg:top-[-7px]"
      >
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border-strong transition-colors duration-200 group-hover:bg-primary" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border-strong transition-colors duration-200 group-hover:bg-primary" />
      </span>
      <p className="mono-label text-[13px] text-primary">{index}</p>
      <h3 className="mt-2 font-heading text-lg font-bold uppercase tracking-wide text-foreground">
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
