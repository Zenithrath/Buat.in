"use client";

import { ArrowRight, PanelLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { arrayNavigationLinks, navInstanceId } from "../_shared/navigation";
import { useRepeaterEditor } from "../_shared/inline";

export function MenuOffcanvasPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const [open, setOpen] = useState(false);
  const trigger = propString(node, "triggerText").trim() || "Buka navigasi";
  const title = propString(node, "title").trim() || "Semua halaman penting dalam satu panel.";
  const description = propString(node, "description").trim() || "Semua halaman penting tersusun dalam satu panel yang ringkas.";
  const side = propString(node, "side") === "left" ? "left" : "right";
  const cta = propString(node, "ctaText").trim() || "Mulai proyek";
  const ctaUrl = propString(node, "ctaUrl").trim() || "#kontak";
  const links = arrayNavigationLinks(node, "links");
  const { setValue } = useRepeaterEditor(node, "links");
  const panelId = navInstanceId(node, "offcanvas-panel");
  const padding = device === null ? "px-5 py-10 sm:px-8" : device === "mobile" ? "px-5 py-10" : "px-8 py-10";
  useEffect(() => { function escape(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); } document.addEventListener("keydown", escape); return () => document.removeEventListener("keydown", escape); }, []);

  return <section className={`relative isolate flex min-h-64 w-full items-center overflow-hidden border-y border-border bg-muted/35 ${padding}`} style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}>
    <div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">Menu yang rapi</p><h3 className="mt-2 max-w-sm font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-[-0.05em] text-foreground">Berikan jalan yang jelas untuk pengunjung Anda.</h3><button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls={panelId} className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-extrabold text-background transition-transform hover:-translate-y-0.5"><PanelLeft size={16} /><InlineEditableText node={node} propKey="triggerText" value={trigger} fallback="Buka navigasi" /></button></div>
    <div className={`${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} absolute inset-0 z-20 bg-foreground/35 transition-opacity`} aria-hidden={!open} onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <aside id={panelId} className={`${open ? "translate-x-0" : side === "right" ? "translate-x-full" : "-translate-x-full"} absolute top-0 bottom-0 flex w-[min(22rem,88%)] flex-col bg-card p-5 text-foreground shadow-[var(--shadow)] transition-transform duration-300 ${side === "right" ? "right-0" : "left-0"}`}>
        <div className="flex items-center justify-between"><span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-black text-primary-foreground">B</span><button type="button" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:bg-muted" aria-label="Tutup menu"><X size={17} /></button></div>
        <div className="mt-8"><p className="font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-[-0.055em]"><InlineEditableText node={node} propKey="title" value={title} fallback="Semua halaman penting dalam satu panel." multiline /></p><p className="mt-3 text-sm leading-6 text-muted-foreground"><InlineEditableText node={node} propKey="description" value={description} fallback="Semua halaman penting tersusun dalam satu panel yang ringkas." multiline /></p></div>
        <nav className="mt-6 grid border-y border-border py-2" aria-label="Menu panel">{links.map((link, index) => <InlineEditableLink key={link.id} node={node} propKey="links" urlKey="links" value={link.label} urlValue={link.url} onCommit={(next) => setValue(index, "label", next)} onUrlCommit={(next) => setValue(index, "url", next)} className="w-full" linkClassName="group flex w-full items-center justify-between rounded-lg px-2 py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted"><ArrowRight size={15} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" /></InlineEditableLink>)}</nav>
        <InlineEditableLink node={node} propKey="ctaText" urlKey="ctaUrl" value={cta} urlValue={ctaUrl} fallback="Mulai proyek" className="mt-auto w-full" linkClassName="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-extrabold text-primary-foreground"><ArrowRight size={15} /></InlineEditableLink>
      </aside>
    </div>
  </section>;
}
