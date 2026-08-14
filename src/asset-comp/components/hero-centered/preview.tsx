"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";

export function HeroPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const badgeText = propString(node, "badgeText") || "🚀 Platform Builder Visual";
  const title = propString(node, "title") || "Rancang Antarmuka Website";
  const description = propString(node, "description") || "Buat website profesional.";
  const primaryCtaText = propString(node, "primaryCtaText") || "Coba Gratis";
  const primaryCtaUrl = propString(node, "primaryCtaUrl") || "#";
  const secondaryCtaText = propString(node, "secondaryCtaText") || "Lihat Demo";
  const secondaryCtaUrl = propString(node, "secondaryCtaUrl") || "#";

  return (
    <section
      className="flex w-full flex-col items-center justify-center text-center px-6 py-20 bg-background transition-colors"
      style={themeTokenStyle(tokens)}
    >
      {badgeText ? (
        <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {badgeText}
        </span>
      ) : null}
      <h1 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
        {description}
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        {primaryCtaText ? (
          <a
            href={primaryCtaUrl}
            className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md hover:opacity-90 transition-opacity"
          >
            {primaryCtaText}
          </a>
        ) : null}
        {secondaryCtaText ? (
          <a
            href={secondaryCtaUrl}
            className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-bold text-foreground shadow-sm hover:bg-muted transition-colors"
          >
            {secondaryCtaText}
          </a>
        ) : null}
      </div>
    </section>
  );
}
