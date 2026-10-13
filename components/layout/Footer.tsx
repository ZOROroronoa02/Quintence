/**
 * @file components/layout/Footer.tsx
 * @description Final site footer. Nav columns, socials, and legal links driven by
 * lib/config.ts, plus a restrained mono status strip (build version + telemetry).
 */

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { XIcon } from "@/components/brand/XIcon";
import { siteConfig } from "@/lib/config";
import { Logo } from "@/components/brand/Logo";
import packageJson from "@/package.json";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: XIcon,
  email: Mail,
} as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-overlay">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" aria-label="Quintence ~ homepage" className="inline-block rounded-sm">
              <Logo />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>

            <p className="mono-label text-[11px] text-muted-foreground">
              {siteConfig.officeLocation}
            </p>
          </div>

          <nav aria-label="Services" className="space-y-3">
            <h2 className="mono-label text-primary">Services</h2>
            <ul className="space-y-2 text-sm">
              {siteConfig.footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Studio" className="space-y-3">
            <h2 className="mono-label text-primary">Studio</h2>
            <ul className="space-y-2 text-sm">
              {siteConfig.footerNav.studio.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <nav aria-label="Legal" className="space-y-3">
              <h2 className="mono-label text-primary">Legal & Governance</h2>
              <ul className="space-y-2 text-sm">
                {siteConfig.footerNav.legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className="mono-label mb-2 text-muted-foreground">Connect</h2>
              <div className="flex items-center gap-2">
                {siteConfig.socials.map((social) => {
                  const Icon = socialIcons[social.platform];
                  const external = !social.url.startsWith("mailto:");
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      aria-label={`Quintence on ${social.label}`}
                      className="rounded-md border border-border bg-secondary p-2 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label text-[11px] text-muted-foreground">
            © {currentYear} {siteConfig.legalName} · v{packageJson.version}
          </p>
          <p className="mono-label flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            <span>
              build stable · <span className="text-primary">zero CMS drift</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
