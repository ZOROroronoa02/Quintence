/**
 * @file app/feed.xml/route.ts
 * @description RSS 2.0 feed built from published insights. Zero dependencies ~
 * hand-rolled XML with entity escaping. Drafts never appear (loader-filtered).
 */

import { getAllInsights } from "@/lib/mdx";
import { siteConfig } from "@/lib/config";

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<Response> {
  const posts = await getAllInsights();
  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/insights/${post.slug}`;
      const pubDate = new Date(post.frontmatter.publishedAt).toUTCString();
      return [
        "    <item>",
        `      <title>${escapeXml(post.frontmatter.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid>${escapeXml(url)}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${escapeXml(post.frontmatter.description)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>${escapeXml(`${siteConfig.name} ~ Insights`)}</title>`,
    `    <link>${escapeXml(`${siteConfig.url}/insights`)}</link>`,
    `    <description>${escapeXml("Notes from the whole stack.")}</description>`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
