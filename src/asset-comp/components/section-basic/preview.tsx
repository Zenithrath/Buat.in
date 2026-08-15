"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { SectionPreview } from "@/components/preview/SectionPreview";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { useCanvasChildrenRenderer } from "@/components/preview/CanvasChildrenContext";

function copy(node: Node, key: string, fallback: string) {
  return propString(node, key).trim() || fallback;
}

export function SectionBasicPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const heading = copy(node, "heading", "Judul section Anda");
  const paragraph = copy(node, "paragraph", "Tulis deskripsi singkat di sini, lalu seret komponen lain ke dalam section ini untuk memperkaya halaman.");
  const renderCanvasChildren = useCanvasChildrenRenderer();

  return (
    <section className="w-full border-y border-border bg-background px-5 py-12 sm:px-8 sm:py-16" style={themeTokenStyle(tokens)}>
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-[-0.05em] text-foreground sm:text-4xl">
          <InlineEditableText node={node} propKey="heading" fallback="Judul section Anda" value={heading} multiline />
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          <InlineEditableText node={node} propKey="paragraph" fallback="Tulis deskripsi singkat di sini, lalu seret komponen lain ke dalam section ini untuk memperkaya halaman." value={paragraph} multiline />
        </p>
        {renderCanvasChildren ? renderCanvasChildren(node, {
          layout: "stack",
          className: "mt-10",
          emptyMessage: "Seret komponen ke sini untuk mengisi section.",
        }) : node.children.length > 0 ? (
          <div className="mt-10 space-y-8">{node.children.map((child) => <SectionPreview key={child.id} node={child} theme={theme} />)}</div>
        ) : null}
      </div>
    </section>
  );
}
