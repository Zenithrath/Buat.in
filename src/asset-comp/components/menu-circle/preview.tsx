"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import type { CSSProperties } from "react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { arrayNavigationLinks } from "../_shared/navigation";
import { useRepeaterEditor } from "../_shared/inline";

const POSITIONS = [
  { x: 0, y: -92 }, { x: 82, y: -45 }, { x: 86, y: 49 }, { x: 0, y: 94 }, { x: -82, y: 49 },
];

export function MenuCirclePreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const [open, setOpen] = useState(false);
  const buttonText = propString(node, "buttonText").trim() || "Jelajahi";
  const title = propString(node, "title").trim() || "Akses cepat tanpa memenuhi layar.";
  const description = propString(node, "description").trim() || "Cocok untuk aksi kecil, navigasi kreatif, atau halaman portofolio.";
  const items = arrayNavigationLinks(node, "items").slice(0, POSITIONS.length);
  const { setValue } = useRepeaterEditor(node, "items");
  const compact = device === "mobile";
  const padding = device === null ? "px-5 py-12 sm:px-8" : compact ? "px-5 py-12" : "px-8 py-12";
  const layout = device === null ? "grid max-w-5xl items-center gap-10 sm:grid-cols-[1fr_17rem]" : compact ? "grid max-w-5xl items-center gap-10" : "grid max-w-5xl items-center gap-10 grid-cols-[1fr_17rem]";
  return <section className={`relative w-full overflow-hidden border-y border-border bg-background ${padding}`} style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}>
    <div className={`mx-auto ${layout}`}>
      <div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">Navigasi ringkas</p><h3 className="mt-3 max-w-md font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-[-0.06em] text-foreground"><InlineEditableText node={node} propKey="title" value={title} fallback="Akses cepat tanpa memenuhi layar." multiline /></h3><p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground"><InlineEditableText node={node} propKey="description" value={description} fallback="Cocok untuk aksi kecil, navigasi kreatif, atau halaman portofolio." multiline /></p></div>
      <div className="relative mx-auto size-60 rounded-full border border-border bg-muted/40" aria-label="Menu cepat">
        <span className="absolute inset-7 rounded-full border border-dashed border-border" aria-hidden="true" />
        {items.map((item, index) => {
          const point = POSITIONS[index];
          const style: CSSProperties = { left: "50%", top: "50%", transform: open ? `translate(calc(-50% + ${point.x}px), calc(-50% + ${point.y}px)) scale(1)` : "translate(-50%, -50%) scale(.5)", transitionDelay: `${index * 35}ms` };
          return <span key={item.id} aria-hidden={!open} style={style} className={`${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} absolute z-10 inline-flex transition-[transform,opacity] duration-300`}><InlineEditableLink node={node} propKey="items" urlKey="items" value={item.label} urlValue={item.url} onCommit={(next) => setValue(index, "label", next)} onUrlCommit={(next) => setValue(index, "url", next)} linkClassName="inline-flex min-w-16 items-center justify-center gap-1 rounded-full border border-border bg-card px-2.5 py-2 text-[10px] font-extrabold text-foreground shadow-sm hover:border-primary hover:text-primary"><ArrowUpRight size={11} /></InlineEditableLink></span>;
        })}
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="absolute left-1/2 top-1/2 z-20 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow)] transition-transform hover:scale-105" aria-label={open ? "Tutup pilihan cepat" : "Buka pilihan cepat"}>{open ? <X size={22} /> : <><Menu size={20} /><span className="mt-[-7px] text-[9px] font-black"><InlineEditableText node={node} propKey="buttonText" value={buttonText} fallback="Jelajahi" /></span></>}</button>
      </div>
    </div>
  </section>;
}
