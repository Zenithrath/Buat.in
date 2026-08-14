"use client";

import { ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { SectionPreview } from "@/components/preview/SectionPreview";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { useCanvasChildrenRenderer } from "@/components/preview/CanvasChildrenContext";

function copy(node: Node, key: string, fallback: string) {
  return propString(node, key).trim() || fallback;
}

export function ModalCenterPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const canvasMobile = device === "mobile";
  const [open, setOpen] = useState(false);
  const eyebrow = copy(node, "eyebrow", "Dialog interaktif");
  const heading = copy(
    node,
    "heading",
    "Semua detail penting tetap dekat tanpa memindahkan pengunjung dari halaman ini."
  );
  const triggerText = copy(node, "triggerText", "Lihat detail layanan");
  const dialogEyebrow = copy(node, "dialogEyebrow", "Informasi tambahan");
  const title = copy(node, "title", "Mari bicarakan kebutuhan Anda.");
  const description = copy(
    node,
    "description",
    "Tambahkan formulir, kartu, atau informasi lain ke dalam dialog ini dari kanvas."
  );
  const emptyMessage = copy(
    node,
    "emptyMessage",
    "Tambahkan komponen ke dalam dialog ini untuk menampilkan formulir, penawaran, atau langkah berikutnya."
  );
  const closeText = copy(node, "closeText", "Tutup dialog");
  const renderCanvasChildren = useCanvasChildrenRenderer();
  const dialogId = `modal-center-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "preview"}`;
  const sectionSpacing =
    device === null ? "px-5 py-10 sm:px-8" : canvasMobile ? "px-4 py-8" : "px-8 py-10";
  const dialogClass = canvasMobile
    ? "max-h-[calc(100vh-1rem)] w-full max-w-none overflow-y-auto rounded-[calc(var(--radius)*1.05)] border border-border bg-card p-4 text-foreground shadow-2xl"
    : "max-h-[min(44rem,calc(100vh-2rem))] w-full max-w-xl overflow-y-auto rounded-[calc(var(--radius)*1.15)] border border-border bg-card p-5 text-foreground shadow-2xl sm:p-6";

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <section
      className={`relative flex min-h-64 w-full items-center overflow-hidden border-y border-border bg-secondary/30 ${sectionSpacing}`}
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className="max-w-lg">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
          <InlineEditableText node={node} propKey="eyebrow" fallback="Dialog interaktif" value={eyebrow} />
        </p>
        <h3 className={`mt-2 font-[family-name:var(--font-heading)] font-extrabold tracking-[-0.05em] text-foreground ${canvasMobile ? "text-xl leading-tight" : "text-2xl"}`}>
          <InlineEditableText
            node={node}
            propKey="heading"
            fallback="Semua detail penting tetap dekat tanpa memindahkan pengunjung dari halaman ini."
            value={heading}
            multiline
          />
        </h3>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls={dialogId}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
        >
          <InlineEditableText node={node} propKey="triggerText" fallback="Lihat detail layanan" value={triggerText} />
          <ExternalLink size={15} aria-hidden="true" />
        </button>
      </div>

      {open ? (
        <div
          className={`fixed inset-0 z-[80] flex items-center justify-center bg-foreground/45 backdrop-blur-[2px] ${canvasMobile ? "p-2.5" : "p-4"}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${dialogId}-title`}
            className={dialogClass}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-primary">
                  <InlineEditableText node={node} propKey="dialogEyebrow" fallback="Informasi tambahan" value={dialogEyebrow} />
                </p>
                <h2 id={`${dialogId}-title`} className={`mt-2 font-[family-name:var(--font-heading)] font-extrabold tracking-[-0.05em] ${canvasMobile ? "text-xl leading-tight" : "text-2xl"}`}>
                  <InlineEditableText node={node} propKey="title" fallback="Mari bicarakan kebutuhan Anda." value={title} multiline />
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={closeText}
                title={closeText}
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              <InlineEditableText node={node} propKey="description" fallback="Tambahkan formulir, kartu, atau informasi lain ke dalam dialog ini dari kanvas." value={description} multiline />
            </p>
            {renderCanvasChildren ? (
              renderCanvasChildren(node, {
                layout: "stack",
                className: "mt-6 border-t border-border pt-5",
                emptyMessage,
              })
            ) : node.children.length > 0 ? (
              <div className="mt-6 space-y-4 border-t border-border pt-5">
                {node.children.map((child) => <SectionPreview key={child.id} node={child} theme={theme} />)}
              </div>
            ) : (
              <div className="mt-6 rounded-[calc(var(--radius)*.8)] border border-dashed border-border bg-muted/45 p-4 text-sm leading-6 text-muted-foreground">
                <InlineEditableText
                  node={node}
                  propKey="emptyMessage"
                  fallback="Tambahkan komponen ke dalam dialog ini untuk menampilkan formulir, penawaran, atau langkah berikutnya."
                  value={emptyMessage}
                  multiline
                />
              </div>
            )}
            <div className="mt-6 flex justify-end border-t border-border pt-4">
              <button type="button" onClick={() => setOpen(false)} className="rounded-[calc(var(--radius)*.75)] bg-foreground px-4 py-2.5 text-sm font-bold text-background transition-transform hover:-translate-y-0.5">
                <InlineEditableText node={node} propKey="closeText" fallback="Tutup dialog" value={closeText} />
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
