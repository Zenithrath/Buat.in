"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { arrayNavigationLinks, navInstanceId } from "../_shared/navigation";
import { useRepeaterEditor } from "../_shared/inline";
import { BrandMark } from "../_shared/logo";

export function NavbarFullscreenPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const [open, setOpen] = useState(false);
  const links = arrayNavigationLinks(node, "links");
  const { setValue } = useRepeaterEditor(node, "links");
  const logo = propString(node, "logoText").trim() || "TITIK TEMU";
  const eyebrow = propString(node, "eyebrow").trim() || "Menu";
  const cta = propString(node, "ctaText").trim() || "Mulai percakapan";
  const ctaUrl = propString(node, "ctaUrl").trim() || "#kontak";
  const overlayId = navInstanceId(node, "fullscreen-menu");
  const compact = device === "mobile";
  const padding = device === null ? "px-5 py-4 sm:px-8" : compact ? "px-5 py-4" : "px-8 py-4";
  const overlayGrid = device === null ? "grid flex-1 items-center gap-8 py-10 md:grid-cols-[1.45fr_.55fr]" : compact ? "grid flex-1 items-center gap-8 py-8" : "grid flex-1 items-center gap-8 py-10 grid-cols-[1.45fr_.55fr]";
  const linkSize = device === null ? "text-3xl sm:text-5xl" : compact ? "text-3xl" : "text-5xl";
  const asideLayout = device === null ? "border-l-0 border-background/15 pl-0 md:border-l md:pl-8" : compact ? "border-l-0 border-background/15 pl-0" : "border-l border-background/15 pl-8";

  useEffect(() => {
    function escape(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);

  return <header className={`relative z-40 w-full bg-background ${padding}`} style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}>
    <nav className="mx-auto flex max-w-6xl items-center justify-between border-b border-border pb-3" aria-label="Navigasi utama">
      <a href="#" className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-sm font-black tracking-[0.16em] text-foreground"><BrandMark node={node} name={logo} hideLetter imgClassName="h-5 w-5 rounded object-cover" /><InlineEditableText node={node} propKey="logoText" value={logo} fallback="TITIK TEMU" /></a>
      <button type="button" className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-extrabold text-foreground transition-colors hover:bg-muted" aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} aria-controls={overlayId} onClick={() => setOpen((value) => !value)}><span>{open ? "Tutup" : "Menu"}</span>{open ? <X size={15} /> : <Menu size={16} className="transition-transform group-hover:rotate-6" />}</button>
    </nav>
    <div id={overlayId} className={`${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} absolute inset-x-0 top-0 z-50 min-h-[min(42rem,100vh)] overflow-hidden border-b border-border bg-foreground text-background transition-opacity duration-300`} aria-hidden={!open}>
      <div className={`mx-auto flex min-h-[min(42rem,100vh)] max-w-6xl flex-col ${padding}`}>
        <div className="flex items-center justify-between border-b border-background/20 pb-3"><a href="#" className="flex items-center gap-2 text-sm font-black tracking-[0.16em] text-background"><BrandMark node={node} name={logo} hideLetter imgClassName="h-5 w-5 rounded object-cover" /><InlineEditableText node={node} propKey="logoText" value={logo} fallback="TITIK TEMU" /></a><button type="button" className="grid size-9 place-items-center rounded-full border border-background/20 text-background transition-colors hover:bg-background/10" aria-label="Tutup menu" onClick={() => setOpen(false)}><X size={17} /></button></div>
        <div className={overlayGrid}>
          <div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary-foreground/55"><InlineEditableText node={node} propKey="eyebrow" value={eyebrow} fallback="Menu" /></p><div className="mt-5 grid gap-1">{links.map((link, index) => <InlineEditableLink key={link.id} node={node} propKey="links" urlKey="links" value={link.label} urlValue={link.url} onCommit={(next) => setValue(index, "label", next)} onUrlCommit={(next) => setValue(index, "url", next)} className="w-full" linkClassName={`group flex w-full items-center justify-between border-b border-background/15 py-3 font-[family-name:var(--font-heading)] ${linkSize} font-black tracking-[-0.06em] text-background transition-colors hover:text-primary-foreground`}><ArrowUpRight size={index === 0 ? 25 : 20} className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" /></InlineEditableLink>)}</div></div>
          <aside className={asideLayout}><p className="max-w-xs text-sm leading-6 text-background/65">Kami membantu menyusun halaman yang terasa jelas, hidup, dan siap dipakai oleh orang sungguhan.</p><InlineEditableLink node={node} propKey="ctaText" urlKey="ctaUrl" value={cta} urlValue={ctaUrl} fallback="Mulai percakapan" className="mt-6" linkClassName="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-xs font-black text-primary-foreground transition-transform hover:-translate-y-0.5"><ArrowUpRight size={15} /></InlineEditableLink></aside>
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-background/35">Tekan Esc untuk menutup</p>
      </div>
    </div>
  </header>;
}
