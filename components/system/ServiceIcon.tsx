/**
 * @file components/system/ServiceIcon.tsx
 * @description Canonical service icon map. New content uses `icon` values
 * (Database, BarChart3, Workflow, LineChart, Code2); legacy Phase 3
 * `iconName` values resolve through the same map.
 */

import { BarChart3, Code2, Database, LineChart, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const icons: Record<string, typeof Database> = {
  Database,
  DatabaseZap: Database,
  BarChart3,
  Workflow,
  Cpu: Workflow,
  LineChart,
  Code2,
  LayoutGrid: Code2,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Database;
  return <Icon className={cn("h-6 w-6 text-primary", className)} aria-hidden="true" />;
}
