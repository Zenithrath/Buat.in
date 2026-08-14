"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { directNavigationLinks, navigationHoverEffect, navInstanceId } from "../_shared/navigation";

function centeredLinkClass(effect: string, mobile = false) {
  const shared = mobile ? "rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted" : "relative px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.13em] text-muted-foreground transition-colors hover:text-foreground";
  if (mobile) return shared;
  if (effect === "underline") return `${shared} after:absolute after:inset-x-3 after:bottom-0 after:h-px after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100`;
  if (effect === "ghost") return `${shared} hover:text-primary hover:drop-shadow-sm`;
  if (effect === "stroke") return `${shared} hover:text-primary hover:[-webkit-text-stroke:0.2px_currentColor]`;
  return `${shared} hover:rounded-full hover:bg-muted`;
}

export function NavbarCenteredPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const [open, setOpen] = useState(false);
  const links = directNavigationLinks(node, 4);
  const logo = propString(node, "logoText").trim() || "Aruna Studio";
  const cta = propString(node, "ctaText").trim() || "Mulai proyek";
  const ctaUrl = propString(node, "ctaUrl").trim() || "#kontak";
  const menuId = navInstanceId(node, "centered-menu");
  const isMobile = device === "mobile";
  const desktop = device === null ? "hidden sm:flex" : isMobile ? "hidden" : "flex";
  const mobile = device === null ? "sm:hidden" : isMobile ? "" : "hidden";
  const effect = navigationHoverEffect(node);
  const padding = device === null ? "px-5 py-4 sm:px-8" : isMobile ? "px-5 py-4" : "px-8 py-4";

  return <header className={`relative z-20 w-full border-b border-border bg-background ${padding}`} style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}>
    <nav className="mx-auto max-w-6xl" aria-label="Navigasi utama">
      <div className="relative flex min-h-10 items-center justify-center">
        <button type="button" className={`${mobile} absolute left-0 grid size-9 place-items-center rounded-full border border-border text-foreground`} aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((value) => !value)}>{open ? <X size={17} /> : <Menu size={18} />}</button>
        <a href="#" className="font-[family-name:var(--font-heading)] text-lg font-black tracking-[-0.055em] text-foreground"><InlineEditableText node={node} propKey="logoText" value={logo} fallback="Aruna Studio" /></a>
        <InlineEditableLink node={node} propKey="ctaText" urlKey="ctaUrl" value={cta} urlValue={ctaUrl} fallback="Mulai proyek" className={`${desktop} absolute right-0`} linkClassName="inline-flex items-center gap-1.5 border-b border-foreground pb-1 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary"><ArrowRight size={14} /></InlineEditableLink>
      </div>
      <div className={`${desktop} mt-4 items-center justify-center gap-1 border-t border-border pt-3`}>{links.map((link, index) => <InlineEditableLink key={link.id} node={node} propKey={`link${index + 1}Text`} urlKey={`link${index + 1}Url`} value={link.label} urlValue={link.url} fallback={link.label} linkClassName={centeredLinkClass(effect)} />)}</div>
      <div id={menuId} className={`${mobile} ${open ? "grid" : "hidden"} mt-4 gap-1 border-t border-border pt-3`}>{links.map((link, index) => <InlineEditableLink key={link.id} node={node} propKey={`link${index + 1}Text`} urlKey={`link${index + 1}Url`} value={link.label} urlValue={link.url} fallback={link.label} className="w-full" linkClassName={centeredLinkClass(effect, true)} />)}<InlineEditableLink node={node} propKey="ctaText" urlKey="ctaUrl" value={cta} urlValue={ctaUrl} fallback="Mulai proyek" className="mt-2 w-full" linkClassName="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-3 text-sm font-extrabold text-primary-foreground"><ArrowRight size={15} /></InlineEditableLink></div>
    </nav>
  </header>;
}
