/**
 * @file app/og/route.tsx
 * @description Dynamic OG image endpoint (next/og, no new dependencies).
 * Usage: /og?title=Page%20Title&kicker=SERVICES. Defaults to the positioning
 * line when params are absent. Always 1200×630 PNG.
 */

import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { OgImage } from "@/components/og/OgImage";

export const runtime = "edge";

function clean(value: string | null, fallback: string, max = 90): string {
  const text = (value ?? fallback).trim().slice(0, max);
  return text.length > 0 ? text : fallback;
}

export async function GET(request: NextRequest): Promise<ImageResponse> {
  const { searchParams } = new URL(request.url);
  const title = clean(searchParams.get("title"), "From pipeline to launch.");
  const kicker = clean(searchParams.get("kicker"), "QUINTENCE", 24).toUpperCase();

  return new ImageResponse(<OgImage title={title} kicker={kicker} />, {
    width: 1200,
    height: 630,
  });
}
