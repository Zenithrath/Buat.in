"use client";

import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import {
  projectTokenStyle,
  propString,
  themeTokenStyle,
} from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableImage, InlineEditableText } from "@/components/preview/InlineEditable";

function firstProp(node: Node, ...keys: string[]) {
  for (const key of keys) {
    const value = propString(node, key).trim();
    if (value) return value;
  }
  return "";
}

const statValue = (node: Node, index: number, fallback: string) =>
  firstProp(node, `stat${index}Number`, `stat${index}Value`) || fallback;

export function AboutPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const previewDevice = usePreviewDevice();
  const isCanvasMobile = previewDevice === "mobile";
  const eyebrow = firstProp(node, "eyebrow") || "Tentang kami";
  const title = firstProp(node, "title") || "Strategi yang berpijak pada manusia, bukan tren sesaat.";
  const description =
    firstProp(node, "description", "content") ||
    "Kami membantu bisnis menerjemahkan cerita dan ambisinya menjadi identitas yang utuh dan mudah dipahami.";
  const imageUrl = firstProp(node, "imageUrl", "image");
  const imageAlt = firstProp(node, "imageAlt") || "Tim berdiskusi di studio";
  const stats = [
    { value: statValue(node, 1, "8+"), label: firstProp(node, "stat1Label") || "tahun berkarya" },
    { value: statValue(node, 2, "74"), label: firstProp(node, "stat2Label") || "proyek selesai" },
    { value: statValue(node, 3, "18"), label: firstProp(node, "stat3Label") || "mitra aktif" },
  ];
  const sectionSpacing =
    previewDevice === null
      ? "px-5 py-12 sm:px-8 sm:py-20"
      : isCanvasMobile
        ? "px-5 py-12"
        : "px-8 py-20";
  const contentGap =
    previewDevice === null ? "gap-8 sm:gap-12" : isCanvasMobile ? "gap-8" : "gap-12";
  const titleSize =
    previewDevice === null ? "text-3xl sm:text-4xl" : isCanvasMobile ? "text-3xl" : "text-4xl";
  const statPadding =
    previewDevice === null ? "px-4 py-4 sm:px-5 sm:py-5" : isCanvasMobile ? "px-4 py-4" : "px-5 py-5";

  return (
    <section
      className={`w-full border-y border-border bg-background ${sectionSpacing}`}
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className={`mx-auto flex max-w-6xl flex-wrap items-center ${contentGap}`}>
        <Card className="relative min-h-[300px] min-w-[240px] flex-[1_1_22rem] overflow-hidden border-border bg-card p-2 shadow-[var(--shadow)]">
          <InlineEditableImage
            node={node}
            imageKey="imageUrl"
            altKey="imageAlt"
            src={imageUrl}
            alt={imageAlt}
            className="h-full min-h-[284px] w-full rounded-[calc(var(--radius)-2px)] object-cover"
            emptyClassName="flex items-end bg-secondary p-5"
            emptyContent={
              <div className="max-w-[14rem] rounded-[var(--radius)] border border-border bg-background p-4 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                  <InlineEditableText node={node} propKey="imageNoteLabel" fallback="Cara kami bekerja" />
                </p>
                <p className="mt-2 text-lg font-bold leading-tight text-foreground">
                  <InlineEditableText
                    node={node}
                    propKey="imageNoteText"
                    fallback="Mendengar dengan saksama sebelum membuat apa pun."
                    multiline
                  />
                </p>
              </div>
            }
          />
          <span className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-background/90 text-primary shadow-sm backdrop-blur">
            <ArrowUpRight size={17} aria-hidden="true" />
          </span>
        </Card>

        <div className="min-w-[250px] flex-[1_1_25rem] text-left">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
            <InlineEditableText node={node} propKey="eyebrow" fallback={eyebrow} />
          </p>
          <h2 className={`mt-3 max-w-xl font-[family-name:var(--font-heading)] font-extrabold leading-[1.12] tracking-[-0.035em] text-foreground ${titleSize}`}>
            <InlineEditableText node={node} propKey="title" fallback={title} multiline />
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            <InlineEditableText node={node} propKey="description" fallback={description} multiline />
          </p>

          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(115px,1fr))] gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`min-w-0 bg-card ${statPadding}`}>
                <p className="font-[family-name:var(--font-mono)] text-2xl font-extrabold tracking-[-0.05em] text-foreground">
                  <InlineEditableText
                    node={node}
                    propKey={`stat${index + 1}Number`}
                    fallback={stat.value}
                  />
                </p>
                <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                  <InlineEditableText
                    node={node}
                    propKey={`stat${index + 1}Label`}
                    fallback={stat.label}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
