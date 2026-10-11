/**
 * @file next.config.ts
 * @description Next.js 15 configuration with MDX compilation and page extensions.
 */

import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Trim barrel imports: lucide + motion + email components only ship
    // the icons/components actually used, shrinking client JS.
    optimizePackageImports: ["lucide-react", "motion", "@react-email/components"],
  },
  // Phase 4 slug migration: Phase 3 service slugs renamed to the locked
  // taxonomy, and /work/sample retired to draft. Permanent redirects keep
  // footer links and bookmarks working. Remove after Phase 6 if unused.
  async redirects() {
    return [
      { source: "/services/etl-data-pipelines", destination: "/services/etl-pipelines", permanent: true },
      { source: "/services/bi-executive-dashboards", destination: "/services/bi-dashboards", permanent: true },
      { source: "/services/workflow-automation", destination: "/services/automation", permanent: true },
      { source: "/services/custom-web-products", destination: "/services/web-products", permanent: true },
      { source: "/work/sample", destination: "/work", permanent: true },
    ];
  },
  // Phase 6 launch hardening: clickjacking, MIME-sniffing, referrer, and
  // sensor-API lockdown. Strict CSP stays a documented post-launch task.
  async headers() {
    const security = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    return [{ source: "/:path*", headers: security }];
  },
};

const withMDX = createMDX({
  // MDX plugins (remark/rehype) can be plugged in here as needed
});

export default withMDX(nextConfig);
