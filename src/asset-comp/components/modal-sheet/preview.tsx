"use client";

import { ArrowUpRight, GripHorizontal, X } from "lucide-react";
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

export function ModalSheetPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const [open, setOpen] = useState(false);
  const eyebrow = copy(node, "eyebrow", "Aksi cepat");
  const heading = copy(node, "heading", "Ringkas untuk ponsel, tetap leluasa saat dibuka dari desktop.");
  const triggerText = copy(node, "triggerText", "Buka panel cepat");
  const panelEyebrow = copy(node, "panelEyebrow", "Panel cepat");
  const title = copy(node, "title", "Pilih langkah berikutnya.");
  const description = copy(node, "description", "Buat penawaran, ringkasan, atau formulir tetap mudah dijangkau tanpa meninggalkan halaman.");
  const emptyMessage = copy(node, "emptyMessage", "Tambahkan komponen ke dalam panel ini untuk membuat aksi lanjutan terasa lebih mudah.");
  const closeText = copy(node, "closeText", "Selesai");
  const renderCanvasChildren = useCanvasChildrenRenderer();
  const panelId = `modal-sheet-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "preview"}`;
  const canvasMobile = device === "mobile";
  const panelPosition = canvasMobile
    ? "inset-x-0 bottom-0 max-h-[85vh] rounded-t-[calc(var(--radius)*1.2)]"
    : device
      ? "inset-y-0 right-0 h-full w-[min(28rem,92vw)] rounded-l-[calc(var(--radius)*1.2)]"
      : "inset-x-0 bottom-0 max-h-[85vh] rounded-t-[calc(var(--radius)*1.2)] md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-[min(28rem,92vw)] md:max-h-none md:rounded-l-[calc(var(--radius)*1.2)] md:rounded-tr-none";

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <section className="relative flex min-h-64 w-full items-center overflow-hidden border-y border-border bg-background px-5 py-10 sm:px-8" style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}>
      <div className="max-w-lg">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-primary"><InlineEditableText node={node} propKey="eyebrow" fallback="Aksi cepat" value={eyebrow} /></p>
        <h3 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-[-0.05em] text-foreground">
          <InlineEditableText node={node} propKey="heading" fallback="Ringkas untuk ponsel, tetap leluasa saat dibuka dari desktop." value={heading} multiline />
        </h3>
        <button type="button" onClick={() => setOpen(true)} aria-controls={panelId} aria-expanded={open} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-bold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary">
          <InlineEditableText node={node} propKey="triggerText" fallback="Buka panel cepat" value={triggerText} />
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[80] bg-foreground/45 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section id={panelId} role="dialog" aria-modal="true" aria-labelledby={`${panelId}-title`} className={`absolute flex overflow-y-auto border border-border bg-card p-5 text-foreground shadow-2xl sm:p-6 ${panelPosition}`}>
            <div className="mx-auto flex w-full max-w-xl flex-col">
              {canvasMobile || !device ? <GripHorizontal aria-hidden="true" size={22} className="mx-auto mb-3 text-muted-foreground md:hidden" /> : null}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0"><p className="text-[10px] font-black uppercase tracking-[0.15em] text-primary"><InlineEditableText node={node} propKey="panelEyebrow" fallback="Panel cepat" value={panelEyebrow} /></p><h2 id={`${panelId}-title`} className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-[-0.05em]"><InlineEditableText node={node} propKey="title" fallback="Pilih langkah berikutnya." value={title} multiline /></h2></div>
                <button type="button" onClick={() => setOpen(false)} aria-label={closeText} title={closeText} className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><X size={17} aria-hidden="true" /></button>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground"><InlineEditableText node={node} propKey="description" fallback="Buat penawaran, ringkasan, atau formulir tetap mudah dijangkau tanpa meninggalkan halaman." value={description} multiline /></p>
              {renderCanvasChildren ? renderCanvasChildren(node, {
                layout: "stack",
                className: "mt-6 border-t border-border pt-5",
                emptyMessage,
              }) : node.children.length > 0 ? <div className="mt-6 space-y-4 border-t border-border pt-5">{node.children.map((child) => <SectionPreview key={child.id} node={child} theme={theme} />)}</div> : <div className="mt-6 rounded-[calc(var(--radius)*.8)] border border-dashed border-border bg-muted/45 p-4 text-sm leading-6 text-muted-foreground"><InlineEditableText node={node} propKey="emptyMessage" fallback="Tambahkan komponen ke dalam panel ini untuk membuat aksi lanjutan terasa lebih mudah." value={emptyMessage} multiline /></div>}
              <div className="mt-auto flex justify-end border-t border-border pt-5"><button type="button" onClick={() => setOpen(false)} className="rounded-[calc(var(--radius)*.75)] bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"><InlineEditableText node={node} propKey="closeText" fallback="Selesai" value={closeText} /></button></div>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
