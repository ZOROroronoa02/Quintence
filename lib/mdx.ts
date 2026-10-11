/**
 * @file lib/mdx.ts
 * @description Typed content-layer abstraction for MDX files with frontmatter extraction.
 * Enables zero-rewrite migration to headless CMS (Sanity, Contentful) in future phases.
 */

import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import {
  CaseStudyFrontmatter,
  InsightPost,
  MDXDocument,
  ServiceFrontmatter,
} from "@/types";
import {
  caseStudyFrontmatterSchema,
  insightFrontmatterSchema,
  serviceFrontmatterSchema,
} from "@/lib/validators";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Generic helper to read all MDX files from a directory and parse typed frontmatter.
 */
export async function getMdxCollection<T>(
  directoryName: string,
): Promise<MDXDocument<T>[]> {
  const collectionPath = path.join(CONTENT_DIR, directoryName);

  if (!fs.existsSync(collectionPath)) {
    return [];
  }

  const fileNames = await fs.promises.readdir(collectionPath);
  const mdxFiles = fileNames.filter(
    (file) => file.endsWith(".mdx") || file.endsWith(".md"),
  );

  const items = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(collectionPath, fileName);
      const rawContent = await fs.promises.readFile(fullPath, "utf-8");
      const { data, content } = matter(rawContent);

      return {
        slug,
        frontmatter: data as T,
        content,
      };
    }),
  );

  return items;
}

/**
 * Generic helper to read a single MDX document by slug.
 */
export async function getMdxDocument<T>(
  directoryName: string,
  slug: string,
): Promise<MDXDocument<T> | null> {
  const collectionPath = path.join(CONTENT_DIR, directoryName);
  const possiblePaths = [
    path.join(collectionPath, `${slug}.mdx`),
    path.join(collectionPath, `${slug}.md`),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      const rawContent = await fs.promises.readFile(filePath, "utf-8");
      const { data, content } = matter(rawContent);
      return {
        slug,
        frontmatter: data as T,
        content,
      };
    }
  }

  return null;
}

/* ==========================================================================
 * Typed Domain Content Loaders
 * ========================================================================== */

export async function getAllServices(): Promise<MDXDocument<ServiceFrontmatter>[]> {
  return getAllServicesCached();
}

const getAllServicesCached = cache(async (): Promise<MDXDocument<ServiceFrontmatter>[]> => {
  const raw = await getMdxCollection<unknown>("services");
  const services = raw.map((doc) => ({
    ...doc,
    frontmatter: serviceFrontmatterSchema.parse(doc.frontmatter, {
      errorMap: () => ({ message: `Invalid service frontmatter in "${doc.slug}"` }),
    }),
  }));
  return services.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
});

export async function getServiceBySlug(
  slug: string,
): Promise<MDXDocument<ServiceFrontmatter> | null> {
  const services = await getAllServices();
  return services.find((service) => service.slug === slug || service.frontmatter.slug === slug) ?? null;
}

export async function getAllCaseStudies(): Promise<MDXDocument<CaseStudyFrontmatter>[]> {
  return getAllCaseStudiesCached();
}

const getAllCaseStudiesCached = cache(
  async (): Promise<MDXDocument<CaseStudyFrontmatter>[]> => {
    const collectionPath = path.join(CONTENT_DIR, "case-studies");

    if (!fs.existsSync(collectionPath)) {
      return [];
    }

    const fileNames = await fs.promises.readdir(collectionPath);
    const mdxFiles = fileNames.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

    const studies: MDXDocument<CaseStudyFrontmatter>[] = [];

    for (const fileName of mdxFiles) {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(collectionPath, fileName);
      const rawContent = await fs.promises.readFile(fullPath, "utf-8");
      const { data, content } = matter(rawContent);

      // Drafts are skipped before validation ~ legacy or WIP files without the
      // Phase 4 schema never reach the parser and stay hidden everywhere.
      if (typeof data === "object" && data !== null && (data as Record<string, unknown>).draft === true) {
        continue;
      }

      studies.push({
        slug,
        frontmatter: caseStudyFrontmatterSchema.parse(data, {
          errorMap: () => ({ message: `Invalid case-study frontmatter in "${slug}"` }),
        }),
        content,
      });
    }

    return studies.sort((a, b) => b.frontmatter.year - a.frontmatter.year);
  },
);

export async function getCaseStudyBySlug(
  slug: string,
): Promise<MDXDocument<CaseStudyFrontmatter> | null> {
  const studies = await getAllCaseStudies();
  return studies.find((study) => study.slug === slug || study.frontmatter.slug === slug) ?? null;
}

/**
 * Returns published case studies that reference the given service slug in
 * their `services` frontmatter. Single direction of truth: case studies point
 * at services; service pages query the reverse. Sorted newest first.
 */
export async function getCaseStudiesByService(
  serviceSlug: string,
): Promise<MDXDocument<CaseStudyFrontmatter>[]> {
  const studies = await getAllCaseStudies();
  return studies.filter((study) => study.frontmatter.services.includes(serviceSlug));
}

/**
 * Returns the single case study flagged `featured: true` in frontmatter.
 * Home page only. Returns null when none is flagged ~ callers render nothing.
 */
export async function getFeaturedCaseStudy(): Promise<MDXDocument<CaseStudyFrontmatter> | null> {
  const studies = await getAllCaseStudies();
  return studies.find((study) => study.frontmatter.featured === true) ?? null;
}

export async function getAllInsights(): Promise<InsightPost[]> {
  return getAllInsightsCached();
}

const getAllInsightsCached = cache(async (): Promise<InsightPost[]> => {
  const collectionPath = path.join(CONTENT_DIR, "insights");

  if (!fs.existsSync(collectionPath)) {
    return [];
  }

  const fileNames = await fs.promises.readdir(collectionPath);
  const mdxFiles = fileNames.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts: InsightPost[] = [];

  for (const fileName of mdxFiles) {
    const slug = fileName.replace(/\.mdx?$/, "");
    const fullPath = path.join(collectionPath, fileName);
    const rawContent = await fs.promises.readFile(fullPath, "utf-8");
    const { data, content } = matter(rawContent);

    if (typeof data === "object" && data !== null && (data as Record<string, unknown>).draft === true) {
      continue;
    }

    const frontmatter = insightFrontmatterSchema.parse(data, {
      errorMap: () => ({ message: `Invalid insight frontmatter in "${slug}"` }),
    });
    const words = content.split(/\s+/).filter(Boolean).length;
    posts.push({ slug, frontmatter, content, readingTime: `${Math.max(1, Math.ceil(words / 200))} min read` });
  }

  return posts.sort(
    (a, b) => new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime(),
  );
});

export async function getInsightBySlug(slug: string): Promise<InsightPost | null> {
  const posts = await getAllInsights();
  return posts.find((post) => post.slug === slug || post.frontmatter.slug === slug) ?? null;
}
