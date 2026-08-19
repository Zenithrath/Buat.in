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

export function HeroSplitPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const previewDevice = usePreviewDevice();
  const isCanvasMobile = previewDevice === "mobile";
  const isCanvasTablet = previewDevice === "tablet";

  const badgeText = firstProp(node, "badgeText", "eyebrow") || "Kegiatan berjalan";
  const title = firstProp(node, "title") || "Setiap angka di sini berasal dari catatan nyata.";
  const description =
    firstProp(node, "description", "subtitle") ||
    "Kolom kanan menampilkan satu gambar tinggi; kartu kecil di bawahnya menyimpan statistik yang bisa diganti dari panel isi.";
  const primaryCtaText =
    firstProp(node, "primaryCtaText", "ctaText", "buttonText") || "Lihat laporan";
  const primaryCtaUrl = firstProp(node, "primaryCtaUrl", "ctaUrl", "buttonUrl") || "#kontak";
  const secondaryCtaText = firstProp(node, "secondaryCtaText", "secondaryText");
  const secondaryCtaUrl = firstProp(node, "secondaryCtaUrl", "secondaryUrl") || "#layanan";
  const imageUrl = firstProp(node, "imageUrl", "image");
  const imageAlt = firstProp(node, "imageAlt") || "Kegiatan yang didokumentasikan";
  const imageBadgeText = firstProp(node, "imageBadgeText") || "SEJAK 2018";
  const imageNoteLabel = firstProp(node, "imageNoteLabel") || "Catatan";
  const imageNoteText =
    firstProp(node, "imageNoteText") || "74 proyek selesai, 96% klien kembali bekerja sama.";
  const supportingText =
    firstProp(node, "supportingText") || "Angka diperbarui tiap akhir kuartal.";

  const sectionSpacing = isCanvasMobile ? "px-5 py-12" : "px-8 py-16";
  const titleSize = isCanvasMobile
    ? "text-4xl"
    : isCanvasTablet
      ? "text-5xl"
      : "text-6xl";

  return (
    <section
      className={`w-full overflow-hidden ${sectionSpacing}`}
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className="mx-auto grid max-w-6xl items-stretch gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center text-left">
          {badgeText ? (
            <p className="mb-5 flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-semibold text-secondary-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
              <InlineEditableText node={node} propKey="badgeText" fallback={badgeText} />
            </p>
          ) : null}
          <h1
            className={`max-w-2xl font-[family-name:var(--font-heading)] font-extrabold leading-[1.04] tracking-[-0.045em] text-foreground ${titleSize}`}
          >
            <InlineEditableText node={node} propKey="title" fallback={title} multiline />
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
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
            <InlineEditableText node={node} propKey="supportingText" fallback={supportingText} />
          </div>
        </div>

        <div className="relative min-h-[320px] overflow-hidden rounded-[var(--radius)] border border-border bg-secondary shadow-[var(--shadow)]">
          <InlineEditableImage
            node={node}
            imageKey="imageUrl"
            altKey="imageAlt"
            src={imageUrl}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            emptyClassName="flex items-end bg-secondary p-5"
            emptyContent={
              <div className="w-full rounded-[var(--radius)] border border-border/70 bg-background/85 p-4 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <InlineEditableText node={node} propKey="imageNoteLabel" fallback={imageNoteLabel} />
                </p>
                <p className="mt-2 text-lg font-bold leading-tight text-foreground">
                  <InlineEditableText
                    node={node}
                    propKey="imageNoteText"
                    fallback={imageNoteText}
                    multiline
                  />
                </p>
              </div>
            }
          />
          <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/25 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-sm">
            <InlineEditableText node={node} propKey="imageBadgeText" fallback={imageBadgeText} />
          </span>
          <div className="absolute bottom-4 left-4 max-w-[15rem] rounded-[var(--radius)] border border-border bg-background/92 p-4 shadow-lg backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
              <InlineEditableText node={node} propKey="imageNoteLabel" fallback={imageNoteLabel} />
            </p>
            <p className="mt-1.5 text-sm font-bold leading-snug text-foreground">
              <InlineEditableText node={node} propKey="imageNoteText" fallback={imageNoteText} multiline />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}