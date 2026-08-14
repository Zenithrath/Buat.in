"use client";

import { ArrowRight, ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Node as BuilderNode, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, sanitizeUrl, themeTokenStyle } from "@/lib/registry/shared";
import { listValue, nodeList, uniqueId } from "../_shared/content";
import { navInstanceId } from "../_shared/navigation";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { useRepeaterEditor } from "../_shared/inline";

interface MegaLink { id: string; label: string; url: string; }
interface MegaColumn { id: string; heading: string; links: MegaLink[]; }

const FALLBACK: MegaColumn[] = [
  { id: "bisnis", heading: "Untuk bisnis", links: [{ id: "profil", label: "Profil perusahaan", url: "#profil" }, { id: "toko", label: "Toko online", url: "#toko" }, { id: "karya", label: "Portofolio", url: "#karya" }] },
  { id: "solusi", heading: "Solusi", links: [{ id: "mulai", label: "Mulai dari nol", url: "#mulai" }, { id: "desain", label: "Rancang ulang", url: "#desain" }, { id: "konsultasi", label: "Konsultasi", url: "#konsultasi" }] },
  { id: "sumber", heading: "Sumber daya", links: [{ id: "panduan", label: "Panduan singkat", url: "#panduan" }, { id: "cerita", label: "Kisah pelanggan", url: "#cerita" }, { id: "kontak", label: "Hubungi tim", url: "#kontak" }] },
];

function megaColumns(node: BuilderNode): MegaColumn[] {
  const columns = nodeList(node, "columns").map((item, index) => {
    const heading = listValue(item, "heading").trim();
    if (!heading) return null;
    const links = [1, 2, 3].map((number) => {
      const label = listValue(item, `link${number}Label`).trim();
      if (!label) return null;
      return { id: uniqueId("mega-link", number, label), label, url: sanitizeUrl(listValue(item, `link${number}Url`, "#")) };
    }).filter((link): link is MegaLink => link !== null);
    return { id: uniqueId("mega-column", index, heading), heading, links };
  }).filter((column): column is MegaColumn => column !== null);
  return columns.length ? columns : FALLBACK;
}

export function NavbarMegaPreview({ node, theme }: { node: BuilderNode; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const columns = megaColumns(node);
  const { setValue } = useRepeaterEditor(node, "columns");
  const logo = propString(node, "logoText").trim() || "SORA";
  const menuText = propString(node, "menuText").trim() || "Jelajahi";
  const sideText = propString(node, "linkText").trim() || "Tentang kami";
  const sideUrl = propString(node, "linkUrl").trim() || "#tentang";
  const cta = propString(node, "ctaText").trim() || "Jadwalkan demo";
  const ctaUrl = propString(node, "ctaUrl").trim() || "#kontak";
  const menuId = navInstanceId(node, "mega-menu");
  const mobile = device === "mobile";
  const desktop = device === null ? "hidden md:flex" : mobile ? "hidden" : "flex";
  const mobileOnly = device === null ? "md:hidden" : mobile ? "" : "hidden";
  const padding = device === null ? "px-5 py-4 sm:px-8" : mobile ? "px-5 py-4" : "px-8 py-4";
  const panelGrid = device === null ? "grid-cols-1 md:grid-cols-[1fr_1fr_1fr_.9fr]" : mobile ? "grid-cols-1" : "grid-cols-[1fr_1fr_1fr_.9fr]";
  const columnBorder = device === null ? "md:border-r" : mobile ? "border-b last:border-b-0" : "border-r";

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    function closeOutside(event: MouseEvent) { if (root.current && event.target instanceof globalThis.Node && !root.current.contains(event.target)) setOpen(false); }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOutside);
    return () => { document.removeEventListener("keydown", closeOnEscape); document.removeEventListener("mousedown", closeOutside); };
  }, []);

  return <header ref={root} className={`relative z-30 w-full bg-background ${padding}`} style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}>
    <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-4" aria-label="Navigasi utama">
      <a href="#" className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-lg font-black tracking-[0.06em] text-foreground"><span className="size-2 rounded-full bg-primary" /><InlineEditableText node={node} propKey="logoText" value={logo} fallback="SORA" /></a>
      <div className={`${desktop} items-center gap-6`}>
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls={menuId} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"><InlineEditableText node={node} propKey="menuText" value={menuText} fallback="Jelajahi" /><ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} size={15} /></button>
        <InlineEditableLink node={node} propKey="linkText" urlKey="linkUrl" value={sideText} urlValue={sideUrl} fallback="Tentang kami" linkClassName="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" />
        <InlineEditableLink node={node} propKey="ctaText" urlKey="ctaUrl" value={cta} urlValue={ctaUrl} fallback="Jadwalkan demo" linkClassName="rounded-full bg-primary px-4 py-2.5 text-xs font-extrabold text-primary-foreground transition-transform hover:-translate-y-0.5" />
      </div>
      <button type="button" className={`${mobileOnly} grid size-9 place-items-center rounded-full border border-border bg-card text-foreground`} aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((value) => !value)}>{open ? <X size={17} /> : <Menu size={18} />}</button>
      <div id={menuId} className={`${open ? "grid opacity-100 translate-y-0" : "pointer-events-none invisible grid -translate-y-2 opacity-0"} absolute left-0 right-0 top-[calc(100%+1rem)] ${panelGrid} transition-all duration-200 overflow-hidden rounded-[calc(var(--radius)*1.1)] border border-border bg-card shadow-[var(--shadow)]`}>
        {columns.map((column, columnIndex) => <div className={`min-w-0 border-border p-5 last:border-0 ${columnBorder}`} key={column.id} style={{ transitionDelay: `${columnIndex * 35}ms` }}><p className="text-[10px] font-black uppercase tracking-[0.15em] text-primary"><InlineEditableText node={node} propKey="columns" value={column.heading} onCommit={(next) => setValue(columnIndex, "heading", next)} /></p><div className="mt-3 grid gap-1">{column.links.map((link, linkIndex) => <InlineEditableLink key={link.id} node={node} propKey="columns" urlKey="columns" value={link.label} urlValue={link.url} onCommit={(next) => setValue(columnIndex, `link${linkIndex + 1}Label`, next)} onUrlCommit={(next) => setValue(columnIndex, `link${linkIndex + 1}Url`, next)} className="w-full" linkClassName="group flex w-full items-center justify-between rounded-lg px-2.5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"><ArrowRight size={14} className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" /></InlineEditableLink>)}</div></div>)}
        <div className="flex min-h-48 flex-col justify-end bg-primary p-5 text-primary-foreground"><Sparkles size={19} className="mb-auto opacity-80" /><p className="font-[family-name:var(--font-heading)] text-xl font-extrabold tracking-[-0.04em]">Mari rancang sesuatu yang terasa tepat.</p><InlineEditableLink node={node} propKey="ctaText" urlKey="ctaUrl" value={cta} urlValue={ctaUrl} fallback="Jadwalkan demo" className="mt-4" linkClassName="inline-flex items-center gap-1 text-xs font-extrabold underline underline-offset-4"><ArrowRight size={14} /></InlineEditableLink></div>
      </div>
    </nav>
  </header>;
}
