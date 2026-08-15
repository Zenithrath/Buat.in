"use client";

import { ArrowRight } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import {
  projectTokenStyle,
  propString,
  themeTokenStyle,
} from "@/lib/registry/shared";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";

export function BannerPromoPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const badge = propString(node, "badge").trim() || "Promo bulan ini";
  const heading =
    propString(node, "heading").trim() || "Potongan 20% untuk langganan tahunan";
  const description =
    propString(node, "description").trim() || "Berlaku untuk pendaftaran baru hingga akhir bulan.";
  const ctaText = propString(node, "ctaText").trim() || "Klaim promo";
  const ctaUrl = propString(node, "ctaUrl").trim() || "#promo";

  return (
    <section
      className="w-full border-y border-border bg-background px-5 py-12 sm:px-8"
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-6 py-10 text-center sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute -right-14 -top-14 size-44 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
            <InlineEditableText node={node} propKey="badge" fallback={badge} value={badge} />
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-heading)] text-2xl font-extrabold leading-[1.15] tracking-[-0.04em] text-foreground sm:text-3xl">
            <InlineEditableText node={node} propKey="heading" fallback={heading} value={heading} multiline />
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            <InlineEditableText node={node} propKey="description" fallback={description} value={description} multiline />
          </p>
          <div className="mt-7">
            <InlineEditableLink
              node={node}
              propKey="ctaText"
              urlKey="ctaUrl"
              value={ctaText}
              urlValue={ctaUrl}
              linkClassName="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <ArrowRight size={16} aria-hidden="true" />
            </InlineEditableLink>
          </div>
        </div>
      </div>
    </section>
  );
}
