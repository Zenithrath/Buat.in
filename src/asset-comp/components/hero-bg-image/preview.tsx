"use client";

import { ArrowUpRight } from "lucide-react";
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

export function HeroBgImagePreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const previewDevice = usePreviewDevice();
  const isCanvasMobile = previewDevice === "mobile";
  const isCanvasTablet = previewDevice === "tablet";

  const badgeText = firstProp(node, "badgeText", "eyebrow") || "FOTO OLEH TIM LAPANGAN";
  const title = firstProp(node, "title") || "Satu momen, ribuan cerita yang ikut bergerak.";
  const description =
    firstProp(node, "description", "subtitle") ||
    "Foto latar penuh memberi kesan pertama yang kuat. Ganti gambarnya dari panel isi, lalu padukan dengan tombol aksi di tengah.";
  const primaryCtaText =
    firstProp(node, "primaryCtaText", "ctaText", "buttonText") || "Ikut serta";
  const primaryCtaUrl = firstProp(node, "primaryCtaUrl", "ctaUrl", "buttonUrl") || "#kontak";
  const secondaryCtaText = firstProp(node, "secondaryCtaText", "secondaryText");
  const secondaryCtaUrl = firstProp(node, "secondaryCtaUrl", "secondaryUrl") || "#layanan";
  const imageUrl = firstProp(node, "imageUrl", "image");
  const imageAlt = firstProp(node, "imageAlt") || "Momen kegiatan di lokasi";
  const imageBadgeText = firstProp(node, "imageBadgeText") || "EST. 2018";
  const imageNoteLabel = firstProp(node, "imageNoteLabel") || "Keterangan";
  const imageNoteText =
    firstProp(node, "imageNoteText") || "Foto diambil di lapangan, bukan stok.";
  const supportingText =
    firstProp(node, "supportingText") || "Dokumentasi langsung dari lokasi kegiatan.";

  const minHeight = isCanvasMobile ? "min-h-[34rem]" : isCanvasTablet ? "min-h-[38rem]" : "min-h-[42rem]";
  const titleSize = isCanvasMobile
    ? "text-4xl"
    : isCanvasTablet
      ? "text-5xl"
      : "text-6xl";

  return (
    <section
      className={`relative w-full overflow-hidden ${minHeight}`}
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <InlineEditableImage
        node={node}
        imageKey="imageUrl"
        altKey="imageAlt"
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        wrapperClassName="absolute inset-0"
        emptyClassName="bg-secondary"
        emptyContent={
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/30 via-secondary to-secondary p-8">
            <div className="max-w-sm rounded-lg border border-white/30 bg-black/30 p-6 text-center backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                <InlineEditableText node={node} propKey="imageNoteLabel" fallback={imageNoteLabel} />
              </p>
              <p className="mt-2 text-lg font-bold leading-tight text-white">
                <InlineEditableText node={node} propKey="imageNoteText" fallback={imageNoteText} multiline />
              </p>
            </div>
          </div>
        }
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
      {imageBadgeText ? (
        <span className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-black/25 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-sm">
          <InlineEditableText node={node} propKey="imageBadgeText" fallback={imageBadgeText} />
        </span>
      ) : null}
      <div className="relative z-10 mx-auto flex h-full min-h-[inherit] w-full max-w-4xl flex-col items-center justify-center px-6 py-16 text-center text-white">
        <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-white backdrop-blur-sm">
          <InlineEditableText node={node} propKey="badgeText" fallback={badgeText} />
        </span>
        <h1
          className={`mt-5 max-w-3xl font-[family-name:var(--font-heading)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white ${titleSize}`}
        >
          <InlineEditableText node={node} propKey="title" fallback={title} multiline />
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/85">
          <InlineEditableText node={node} propKey="description" fallback={description} multiline />
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {primaryCtaText ? (
            <InlineEditableLink
              node={node}
              propKey="primaryCtaText"
              urlKey="primaryCtaUrl"
              value={primaryCtaText}
              urlValue={primaryCtaUrl}
              linkClassName="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius)] bg-white px-5 text-sm font-semibold text-black shadow-sm transition-transform hover:-translate-y-0.5 hover:opacity-95"
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
              linkClassName="inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            />
          ) : null}
        </div>
        <p className="mt-8 flex items-center gap-2 text-xs text-white/70">
          <span className="h-px w-7 bg-white/40" />
          <InlineEditableText node={node} propKey="supportingText" fallback={supportingText} />
          <span className="h-px w-7 bg-white/40" />
        </p>
      </div>
    </section>
  );
}