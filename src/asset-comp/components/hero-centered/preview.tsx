"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import {
  projectTokenStyle,
  propString,
  themeTokenStyle,
} from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import {
  InlineEditableImage,
  InlineEditableLink,
  InlineEditableText,
} from "@/components/preview/InlineEditable";

function firstProp(node: Node, ...keys: string[]) {
  for (const key of keys) {
    const value = propString(node, key).trim();
    if (value) return value;
  }
  return "";
}

export function HeroPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const previewDevice = usePreviewDevice();
  const isCanvasMobile = previewDevice === "mobile";
  const isCanvasTablet = previewDevice === "tablet";
  const badgeText = firstProp(node, "badgeText", "eyebrow") || "Studio kreatif independen";
  const title = firstProp(node, "title") || "Membuat kehadiran digital yang terasa manusiawi.";
  const description =
    firstProp(node, "description", "subtitle") ||
    "Kami menyatukan strategi, identitas, dan website yang memudahkan orang memahami bisnis Anda.";
  const primaryCtaText =
    firstProp(node, "primaryCtaText", "ctaText", "buttonText") || "Mulai percakapan";
  const primaryCtaUrl = firstProp(node, "primaryCtaUrl", "ctaUrl", "buttonUrl") || "#kontak";
  const secondaryCtaText = firstProp(node, "secondaryCtaText", "secondaryText");
  const secondaryCtaUrl = firstProp(node, "secondaryCtaUrl", "secondaryUrl") || "#layanan";
  const imageUrl = firstProp(node, "imageUrl", "image");
  const imageAlt = firstProp(node, "imageAlt") || "Kolaborasi tim kreatif";
  const sectionSpacing =
    previewDevice === null
      ? "px-5 py-10 sm:px-8 sm:py-16"
      : isCanvasMobile
        ? "px-5 py-10"
        : "px-8 py-16";
  const contentGap =
    previewDevice === null ? "gap-8 sm:gap-12" : isCanvasMobile ? "gap-8" : "gap-12";
  const titleSize =
    previewDevice === null
      ? "text-4xl sm:text-5xl lg:text-6xl"
      : isCanvasMobile
        ? "text-4xl"
        : isCanvasTablet
          ? "text-5xl"
          : "text-6xl";
  const descriptionSize =
    previewDevice === null ? "text-base sm:text-lg sm:leading-8" : isCanvasMobile ? "text-base" : "text-lg leading-8";

  return (
    <section
      className={`w-full overflow-hidden ${sectionSpacing}`}
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className={`mx-auto flex max-w-6xl flex-wrap items-center ${contentGap}`}>
        <div className="min-w-[250px] flex-[1_1_25rem] text-left">
          {badgeText ? (
            <Badge
              variant="secondary"
              className="mb-5 w-fit border border-border bg-secondary px-3 py-1 text-[11px] font-semibold text-secondary-foreground"
            >
              <Sparkles size={12} aria-hidden="true" />
              <InlineEditableText node={node} propKey="badgeText" fallback={badgeText} />
            </Badge>
          ) : null}
          <h1 className={`max-w-2xl font-[family-name:var(--font-heading)] font-extrabold leading-[1.04] tracking-[-0.045em] text-foreground ${titleSize}`}>
            <InlineEditableText node={node} propKey="title" fallback={title} multiline />
          </h1>
          <p className={`mt-5 max-w-xl leading-7 text-muted-foreground ${descriptionSize}`}>
            <InlineEditableText node={node} propKey="description" fallback={description} multiline />
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {primaryCtaText ? (
              <InlineEditableLink
                node={node}
                propKey="primaryCtaText"
                urlKey="primaryCtaUrl"
                value={primaryCtaText}
                urlValue={primaryCtaUrl}
                linkClassName="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:opacity-95"
              >
                <ArrowUpRight size={16} aria-hidden="true" />
              </InlineEditableLink>
            ) : null}
            {secondaryCtaText ? (
              <InlineEditableLink
                node={node}
                propKey="secondaryCtaText"
                urlKey="secondaryCtaUrl"
                value={secondaryCtaText}
                urlValue={secondaryCtaUrl}
                linkClassName="inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              />
            ) : null}
          </div>
          <div className="mt-10 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px w-9 bg-border" />
            <InlineEditableText
              node={node}
              propKey="supportingText"
              fallback="Strategi, identitas, dan situs yang terhubung."
            />
          </div>
        </div>

        <Card className="relative min-h-[285px] min-w-[240px] flex-[1_1_22rem] overflow-hidden border-border bg-card p-2 shadow-[var(--shadow)]">
          <InlineEditableImage
            node={node}
            imageKey="imageUrl"
            altKey="imageAlt"
            src={imageUrl}
            alt={imageAlt}
            className="h-full min-h-[269px] w-full rounded-[calc(var(--radius)-2px)] object-cover"
            emptyClassName="flex items-end bg-secondary p-5"
            emptyContent={
              <div className="w-full rounded-[var(--radius)] border border-border/70 bg-background/85 p-4 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <InlineEditableText node={node} propKey="imageNoteLabel" fallback="Studio note" />
                </p>
                <p className="mt-2 max-w-xs text-xl font-bold leading-tight text-foreground">
                  <InlineEditableText
                    node={node}
                    propKey="imageNoteText"
                    fallback="Dari arah besar sampai detail yang siap dipakai."
                    multiline
                  />
                </p>
              </div>
            }
          />
          <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/25 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-sm">
            <InlineEditableText node={node} propKey="imageBadgeText" fallback="EST. 2018" />
          </div>
          <div className="absolute bottom-5 right-5 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <ArrowUpRight size={19} aria-hidden="true" />
          </div>
        </Card>
      </div>
    </section>
  );
}
