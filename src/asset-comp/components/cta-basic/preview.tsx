"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import {
  projectTokenStyle,
  propString,
  themeTokenStyle,
} from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";

function firstProp(node: Node, ...keys: string[]) {
  for (const key of keys) {
    const value = propString(node, key).trim();
    if (value) return value;
  }
  return "";
}

export function CtaPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const previewDevice = usePreviewDevice();
  const isCanvasMobile = previewDevice === "mobile";
  const title = firstProp(node, "title") || "Punya cerita yang perlu disampaikan dengan lebih baik?";
  const description =
    firstProp(node, "description", "subtitle") ||
    "Ceritakan konteks bisnis Anda dalam sesi perkenalan singkat. Kami bantu memetakan langkah yang paling masuk akal.";
  const buttonText =
    firstProp(node, "buttonText", "ctaText", "primaryCtaText") || "Jadwalkan konsultasi";
  const buttonUrl = firstProp(node, "buttonUrl", "ctaUrl", "primaryCtaUrl") || "#kontak";
  const secondaryText = firstProp(node, "secondaryText", "secondaryCtaText");
  const secondaryUrl = firstProp(node, "secondaryUrl", "secondaryCtaUrl") || "#layanan";
  const sectionSpacing =
    previewDevice === null
      ? "px-5 py-12 sm:px-8 sm:py-20"
      : isCanvasMobile
        ? "px-5 py-12"
        : "px-8 py-20";
  const cardSpacing =
    previewDevice === null
      ? "px-6 py-10 sm:px-12 sm:py-14"
      : isCanvasMobile
        ? "px-6 py-10"
        : "px-12 py-14";
  const titleSize =
    previewDevice === null ? "text-3xl sm:text-4xl" : isCanvasMobile ? "text-3xl" : "text-4xl";
  const descriptionSize =
    previewDevice === null ? "text-sm sm:text-base sm:leading-7" : isCanvasMobile ? "text-sm" : "text-base leading-7";

  return (
    <section
      className={`w-full bg-background ${sectionSpacing}`}
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className={`relative mx-auto overflow-hidden rounded-[calc(var(--radius)*1.25)] bg-primary text-center text-primary-foreground shadow-[var(--shadow)] ${cardSpacing}`}>
        <div className="pointer-events-none absolute -left-12 -top-12 size-44 rounded-full bg-background/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-10 size-52 rounded-full border-[20px] border-background/10" />
        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold">
            <MessageCircle size={13} aria-hidden="true" />
            <InlineEditableText node={node} propKey="badgeText" fallback="Mari berbincang" />
          </span>
          <h2 className={`mt-5 font-[family-name:var(--font-heading)] font-extrabold leading-[1.1] tracking-[-0.04em] ${titleSize}`}>
            <InlineEditableText node={node} propKey="title" fallback={title} multiline />
          </h2>
          <p className={`mx-auto mt-4 max-w-xl leading-6 text-primary-foreground/85 ${descriptionSize}`}>
            <InlineEditableText node={node} propKey="description" fallback={description} multiline />
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {buttonText ? (
              <InlineEditableLink
                node={node}
                propKey="buttonText"
                urlKey="buttonUrl"
                value={buttonText}
                urlValue={buttonUrl}
                linkClassName="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius)] bg-background px-5 text-sm font-bold text-foreground shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <ArrowUpRight size={16} aria-hidden="true" />
              </InlineEditableLink>
            ) : null}
            {secondaryText ? (
              <InlineEditableLink
                node={node}
                propKey="secondaryText"
                urlKey="secondaryUrl"
                value={secondaryText}
                urlValue={secondaryUrl}
                linkClassName="inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] border border-primary-foreground/45 px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
