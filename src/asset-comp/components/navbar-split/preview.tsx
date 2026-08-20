"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { directNavigationLinks, navigationHoverEffect, navInstanceId } from "../_shared/navigation";
import { BrandMark } from "../_shared/logo";

function splitLinkClass(effect: string, compact = false) {
  const base = compact ? "rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted" : "relative px-1 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground";
  if (compact) return base;
  if (effect === "underline") return `${base} after:absolute after:inset-x-1 after:bottom-0 after:h-px after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100`;
  if (effect === "ghost") return `${base} hover:text-primary hover:-translate-y-0.5`;
  if (effect === "stroke") return `${base} hover:text-primary hover:[-webkit-text-stroke:0.22px_currentColor]`;
  return `${base} hover:rounded-md hover:bg-muted`;
}

export function NavbarSplitPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const [open, setOpen] = useState(false);
  const links = directNavigationLinks(node, 3);
  const logo = propString(node, "logoText").trim() || "Ruang Rasa";
  const cta = propString(node, "ctaText").trim() || "Belanja sekarang";
  const ctaUrl = propString(node, "ctaUrl").trim() || "#koleksi";
  const id = navInstanceId(node, "split-menu");
  const mobile = device === "mobile";
  const desktop = device === null ? "hidden md:flex" : mobile ? "hidden" : "flex";
  const onlyMobile = device === null ? "md:hidden" : mobile ? "" : "hidden";
  const effect = navigationHoverEffect(node);
  const padding = device === null ? "px-5 py-4 sm:px-8" : mobile ? "px-5 py-4" : "px-8 py-4";
  return <header className={`relative z-20 w-full bg-background ${padding}`} style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}>
    <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-5 border-b border-border pb-3" aria-label="Navigasi utama">
      <a href="#" className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-xl font-black tracking-[-0.065em] text-foreground"><BrandMark node={node} name={logo} hideLetter imgClassName="h-8 w-8 rounded-md object-cover" /><InlineEditableText node={node} propKey="logoText" value={logo} fallback="Ruang Rasa" /></a>
      <div className={`${desktop} items-center gap-7`}>{links.map((link, index) => <InlineEditableLink key={link.id} node={node} propKey={`link${index + 1}Text`} urlKey={`link${index + 1}Url`} value={link.label} urlValue={link.url} fallback={link.label} linkClassName={splitLinkClass(effect)} />)}<InlineEditableLink node={node} propKey="ctaText" urlKey="ctaUrl" value={cta} urlValue={ctaUrl} fallback="Belanja sekarang" className="ml-1" linkClassName="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-extrabold text-primary-foreground transition-transform hover:-translate-y-0.5"><ArrowUpRight size={14} /></InlineEditableLink></div>
      <button type="button" className={`${onlyMobile} grid size-9 place-items-center rounded-full border border-border text-foreground`} aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>{open ? <X size={17} /> : <Menu size={18} />}</button>
      <div id={id} className={`${onlyMobile} ${open ? "grid" : "hidden"} absolute inset-x-0 top-[calc(100%+0.7rem)] gap-1 rounded-[var(--radius)] border border-border bg-card p-2 shadow-[var(--shadow)]`}>{links.map((link, index) => <InlineEditableLink key={link.id} node={node} propKey={`link${index + 1}Text`} urlKey={`link${index + 1}Url`} value={link.label} urlValue={link.url} fallback={link.label} className="w-full" linkClassName={splitLinkClass(effect, true)} />)}<InlineEditableLink node={node} propKey="ctaText" urlKey="ctaUrl" value={cta} urlValue={ctaUrl} fallback="Belanja sekarang" className="mt-1 w-full" linkClassName="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-3 text-sm font-extrabold text-primary-foreground"><ArrowUpRight size={15} /></InlineEditableLink></div>
    </nav>
  </header>;
}
