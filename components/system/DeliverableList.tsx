/**
 * @file components/system/DeliverableList.tsx
 * @description Numbered instrument-panel list for service deliverables. Mono
 * indices with hairline dividers ~ scannable, no icons.
 */

import { cn } from "@/lib/utils";

interface DeliverableListProps {
  items: string[];
  className?: string;
}

export function DeliverableList({ items, className }: DeliverableListProps) {
  return (
    <ol className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, i) => (
        <li key={item} className="group flex items-baseline gap-5 py-4">
          <span
            aria-hidden="true"
            className="mono-label shrink-0 text-[12px] text-muted-foreground transition-colors duration-200 group-hover:text-primary"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[15px] font-medium text-foreground">{item}</span>
        </li>
      ))}
    </ol>
  );
}
