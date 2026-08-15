"use client";

import { Star } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import {
  projectTokenStyle,
  propString,
  themeTokenStyle,
} from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";

function ratingNumber(node: Node, key: string, fallback: number): number {
  const value = node.props[key];
  const parsed = typeof value === "number" ? value : Number(String(value ?? ""));
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.min(5, Math.round(parsed)));
}

export function SocialProofPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const rating = ratingNumber(node, "rating", 5);
  const ratingText =
    propString(node, "ratingText").trim() || "4,9 dari 5";
  const countText =
    propString(node, "countText").trim() || "1.200+ pelanggan aktif";
  const note =
    propString(node, "note").trim() ||
    "Berdiri sejak 2019 dengan ulasan asli dari toko-toko kecil hingga ritel nasional.";

  return (
    <section
      className="w-full border-y border-border bg-background px-5 py-12 sm:px-8"
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <div
          className="flex items-center justify-center gap-1.5"
          role="img"
          aria-label={`Rating ${rating} dari 5 bintang`}
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <Star
              key={index}
              aria-hidden="true"
              size={22}
              className={
                index < rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted-foreground/25 text-muted-foreground/25"
              }
            />
          ))}
        </div>
        <p className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-[-0.04em] text-foreground sm:text-3xl">
          <InlineEditableText node={node} propKey="ratingText" fallback={ratingText} value={ratingText} />
        </p>
        <p className="mt-1 text-sm font-semibold text-foreground">
          <InlineEditableText node={node} propKey="countText" fallback={countText} value={countText} />
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
          <InlineEditableText node={node} propKey="note" fallback={note} value={note} multiline />
        </p>
      </div>
    </section>
  );
}
