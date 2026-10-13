/**
 * @file lib/config.ts
 * @description Centralized site configuration for Quintence boutique studio.
 */

import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Quintence",
  legalName: "Quintence",
  tagline: "From pipeline to launch.",
  description:
    "Boutique data & digital engineering studio. We architect resilient ETL pipelines, executive BI dashboards, workflow automation, bespoke data visualisations, and modern web products.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://quintence.help",
  ogImage: "/og?title=From%20pipeline%20to%20launch&kicker=QUINTENCE",
  creator: "@quintencestudio",
  contactEmail: "hello@quintence.help",
  officeLocation: "Gurugram & Noida, IN & Remote Worldwide",
  offices: [
    {
      city: "Gurugram",
      phone: "+91-9560483768",
      phoneHref: "tel:+919560483768",
      lines: ["S-30 First Floor, Sarasvati Complex", "Sector-28, Gurugram"],
    },
    {
      city: "Noida",
      phone: "+91-9522692877",
      phoneHref: "tel:+919522692877",
      lines: ["A-402, Rejoice Tower, Sikka Karmic Green", "Sector 78, Noida"],
    },
  ],
  bookingUrl: "https://cal.com/QUINTENCEHELPS",

  mainNav: [
    { title: "Services", href: "/services" },
    { title: "Work", href: "/work" },
    { title: "Process", href: "/process" },
    { title: "About", href: "/about" },
    { title: "Insights", href: "/insights" },
    { title: "Contact", href: "/contact", badge: "Hire Us" },
  ],

  footerNav: {
    services: [
      { title: "ETL Pipelines", href: "/services/etl-pipelines" },
      { title: "BI Dashboards", href: "/services/bi-dashboards" },
      { title: "Automation", href: "/services/automation" },
      { title: "Data Visualization", href: "/services/data-visualization" },
      { title: "Web Products", href: "/services/web-products" },
    ],
    studio: [
      { title: "Work / Case Studies", href: "/work" },
      { title: "About Studio", href: "/about" },
      { title: "Engineering Insights", href: "/insights" },
      { title: "Component Styleguide", href: "/styleguide" },
      { title: "Start an Engagement", href: "/contact" },
    ],
    legal: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },

  socials: [
    {
      platform: "github",
      url: "https://github.com/quintence",
      label: "GitHub",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/company/quintence",
      label: "LinkedIn",
    },
    {
      platform: "twitter",
      url: "https://x.com/quintencestudio",
      label: "X (Twitter)",
    },
    {
      platform: "email",
      url: "mailto:hello@quintence.help",
      label: "hello@quintence.help",
    },
  ],

  stats: [
    {
      label: "Pipeline Uptime SLA",
      value: "99.98%",
      description: "Continuous telemetry & alerting across client warehouses",
    },
    {
      label: "Production Deployments",
      value: "45+",
      description: "Custom ETL pipelines, warehouse models & web applications",
    },
    {
      label: "Client Value Generated",
      value: "$18M+",
      description: "Measurable revenue enablement & operational savings",
    },
    {
      label: "Average Query Latency Reduction",
      value: "84%",
      description: "Via optimized columnar storage, dbt modeling & indexing",
    },
  ],

  processSteps: [
    {
      step: "01",
      name: "Discover",
      tagline: "Audit, telemetry & baseline",
      description:
        "We dissect existing data sources, schemas, operational bottlenecks, and reporting expectations before writing code.",
      deliverables: ["Architecture Blueprint", "Data Lineage Map", "Scope & Milestone Matrix"],
    },
    {
      step: "02",
      name: "Design",
      tagline: "Contracts, models & wireframes",
      description:
        "We formalize data contracts, dimensional schemas, idempotency guards, and UI/UX flows for downstream consumers.",
      deliverables: ["Dimensional Schemas (dbt/Snowflake)", "Component Mockups", "Security & RBAC Plan"],
    },
    {
      step: "03",
      name: "Build",
      tagline: "Engineered pipelines & products",
      description:
        "Strictly-typed implementation with automated regression testing, CI/CD validations, and staged delivery checkpoints.",
      deliverables: ["Tested Pipeline Codebase", "Observable Dashboards", "Automated QA Suites"],
    },
    {
      step: "04",
      name: "Launch",
      tagline: "Deployment, telemetry & handoff",
      description:
        "Production cutover with live monitoring, runbooks, and zero-downtime handoff to internal operations teams.",
      deliverables: ["Production Verification", "Monitoring Alerts", "Operational Runbook"],
    },
  ],
};
