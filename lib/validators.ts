/**
 * @file lib/validators.ts
 * @description Zod validation schemas for forms and API request payloads.
 */

import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be under 100 characters." }),
  email: z
    .string()
    .email({ message: "Please provide a valid business email address." }),
  company: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." })
    .max(100, { message: "Company name must be under 100 characters." }),
  budget: z.enum(
    [
      "< $15k",
      "$15k – $35k",
      "$35k – $75k",
      "$75k+",
      "Not sure yet",
    ] as const,
    {
      required_error: "Please select an estimated budget range.",
    },
  ),
  serviceInterest: z
    .string()
    .optional()
    .default("General Inquiry"),
  message: z
    .string()
    .min(10, { message: "Please provide at least 10 characters describing your project." })
    .max(2500, { message: "Message is too long (limit: 2500 characters)." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
};

/* ==========================================================================
 * Contact inquiry schema (Phase 5). Single source of truth ~ imported by
 * BOTH the client form (zodResolver) and the API route. Identical rules.
 * ========================================================================== */

export const BUDGET_OPTIONS = ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k+"] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be under 100 characters." }),
  email: z.string().email({ message: "Enter a valid email address." }),
  company: z
    .string()
    .max(100, { message: "Company must be under 100 characters." })
    .optional()
    .or(z.literal("")),
  budget: z.enum(BUDGET_OPTIONS, {
    required_error: "Select a budget range.",
  }),
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters." })
    .max(2000, { message: "Message must be under 2000 characters." }),
  // Honeypot — real users never fill this; bots do. Checked server-side.
  // Named `extra_notes` (NOT `website`/`url`): those are recognized
  // browser-autofill tokens, and autofill filling the trap caused silent
  // drops of genuine human submissions. See route.ts trap check.
  extra_notes: z.string().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;

/* ==========================================================================
 * Content frontmatter schemas (Phase 4). Loaders in lib/mdx.ts parse every
 * file through these ~ bad frontmatter fails the build with a clear error.
 * ========================================================================== */

export const serviceFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  order: z.number().int(),
  lede: z.string().min(1),
  deliverables: z.array(z.string().min(1)).length(5),
  fit: z.array(z.string().min(1)).length(3),
  stack: z.array(z.string().min(1)).min(1),
});

export const caseStudyMetricSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});
export const caseStudyFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  client: z.string().min(1),
  sector: z.string().min(1),
  year: z.number().int(),
  services: z.array(z.string().min(1)).min(1),
  stack: z.array(z.string().min(1)).min(1),
  summary: z.string().min(1),
  anonymized: z.boolean(),
  featured: z.boolean().optional(),
  draft: z.boolean().optional(),
  metrics: z.array(caseStudyMetricSchema).length(3),
});

export const insightFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "publishedAt must be an ISO date string.",
  }),
  draft: z.boolean().optional(),
});
