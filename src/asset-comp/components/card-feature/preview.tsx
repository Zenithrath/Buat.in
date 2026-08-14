"use client";

import {
  ArrowUpRight,
  BarChart3,
  Globe2,
  Layers3,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";

const ICONS = {
  sparkles: Sparkles,
  zap: Zap,
  layers: Layers3,
  chart: BarChart3,
  shield: ShieldCheck,
  globe: Globe2,
};

export function CardFeaturePreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const iconKey = propString(node, "icon").trim() as keyof typeof ICONS;
  const Icon = ICONS[iconKey] ?? Sparkles;
  const eyebrow = propString(node, "eyebrow").trim();
  const title = propString(node, "title").trim() || "Dibuat untuk bergerak lebih cepat";
  const description =
    propString(node, "description").trim() ||
    "Struktur yang rapi membantu tim dan pelanggan memahami langkah berikutnya tanpa kebingungan.";
  const linkText = propString(node, "linkText").trim();
  const linkUrl = propString(node, "linkUrl").trim() || "#";

  return (
    <article
      className="group relative h-full min-h-56 overflow-hidden rounded-[var(--radius)] border border-border bg-card p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow)]"
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex size-11 items-center justify-center rounded-[calc(var(--radius)*.8)] bg-primary/10 text-primary">
        <Icon size={21} aria-hidden="true" />
      </div>
      {eyebrow ? (
        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary"><InlineEditableText node={node} propKey="eyebrow" fallback="Keunggulan" value={eyebrow} /></p>
      ) : null}
      <h3 className="mt-2 font-[family-name:var(--font-heading)] text-lg font-bold leading-snug tracking-[-0.025em] text-foreground">
        <InlineEditableText node={node} propKey="title" fallback="Dibuat untuk bergerak lebih cepat" value={title} />
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground"><InlineEditableText node={node} propKey="description" fallback="Struktur yang rapi membantu tim dan pelanggan memahami langkah berikutnya tanpa kebingungan." value={description} multiline /></p>
      {linkText ? (
        <InlineEditableLink
          node={node}
          propKey="linkText"
          urlKey="linkUrl"
          fallback="Pelajari lebih lanjut"
          value={linkText}
          urlValue={linkUrl}
          linkClassName="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          <ArrowUpRight size={15} aria-hidden="true" />
        </InlineEditableLink>
      ) : null}
    </article>
  );
}
