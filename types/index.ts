/**
 * @file types/index.ts
 * @description Centralized TypeScript type definitions for Quintence studio website.
 */

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface SocialLink {
  platform: "github" | "linkedin" | "twitter" | "email";
  url: string;
  label: string;
}

export interface MetricItem {
  label: string;
  value: string;
  description?: string;
}

export interface ProcessStep {
  step: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface ServiceFrontmatter {
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  lede: string;
  deliverables: string[];
  fit: string[];
  stack: string[];
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  client: string;
  sector: string;
  year: number;
  services: string[];
  stack: string[];
  summary: string;
  anonymized: boolean;
  featured?: boolean;
  draft?: boolean;
  metrics: CaseStudyMetric[];
}

export interface InsightFrontmatter {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  draft?: boolean;
}

/** Insight post with loader-computed reading time (words / 200, rounded up). */
export interface InsightPost extends MDXDocument<InsightFrontmatter> {
  readingTime: string;
}

/** Config-level author placeholder for all posts until bylines exist. */
export interface InsightAuthor {
  name: string;
  role: string;
}

export interface MDXDocument<T> {
  slug: string;
  frontmatter: T;
  content: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  creator: string;
  mainNav: NavItem[];
  footerNav: {
    services: NavItem[];
    studio: NavItem[];
    legal: NavItem[];
  };
  socials: SocialLink[];
  stats: MetricItem[];
  processSteps: ProcessStep[];
  contactEmail: string;
  officeLocation: string;
  bookingUrl: string;
}
