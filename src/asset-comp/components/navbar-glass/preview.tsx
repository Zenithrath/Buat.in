"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { directNavigationLinks, navigationHoverEffect, navInstanceId } from "../_shared/navigation";

function linkClass(effect: string, compact = false) {
  const base = compact
    ? "rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    : "relative rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground";
  if (compact) return base;
  if (effect === "underline") return `${base} after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100`;
  if (effect === "ghost") return `${base} hover:-translate-y-0.5 hover:text-primary`;
  if (effect === "stroke") return `${base} hover:text-primary hover:[-webkit-text-stroke:0.25px_currentColor]`;
  return `${base} hover:bg-background/80 hover:text-foreground`;
}

export function NavbarGlassPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const [open, setOpen] = useState(false);
  const links = directNavigationLinks(node, 3);
  const logo = propString(node, "logoText").trim() || "Nawala";
  const cta = propString(node, "ctaText").trim() || "Mari bicara";
  const ctaUrl = propString(node, "ctaUrl").trim() || "#kontak";
  const menuId = navInstanceId(node, "glass-menu");
  const isCanvasMobile = device === "mobile";
  const desktopOnly = device === null ? "hidden md:flex" : isCanvasMobile ? "hidden" : "flex";
  const mobileOnly = device === null ? "md:hidden" : isCanvasMobile ? "" : "hidden";
  const effect = navigationHoverEffect(node);
  const outerPadding = device === null ? "px-3 py-3 sm:px-5" : isCanvasMobile ? "px-3 py-3" : "px-5 py-3";
  const navPadding = device === null ? "px-3 py-2 sm:px-4" : isCanvasMobile ? "px-3 py-2" : "px-4 py-2";

  return (
    <header className={`relative z-20 w-full ${outerPadding}`} style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}>
      <nav className={`relative mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-border/80 bg-card/75 ${navPadding} shadow-sm backdrop-blur-xl`} aria-label="Navigasi utama">
        <a href="#" className="flex min-w-0 items-center gap-2.5 rounded-full px-2 py-1.5 font-[family-name:var(--font-heading)] text-base font-extrabold tracking-[-0.04em] text-foreground">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">N</span>
          <span className="truncate"><InlineEditableText node={node} propKey="logoText" value={logo} fallback="Nawala" /></span>
        </a>
        <div className={`${desktopOnly} items-center gap-1`}>
          {links.map((link, index) => <InlineEditableLink key={link.id} node={node} propKey={`link${index + 1}Text`} urlKey={`link${index + 1}Url`} value={link.label} urlValue={link.url} fallback={link.label} linkClassName={linkClass(effect)} />)}
        </div>
        <InlineEditableLink node={node} propKey="ctaText" urlKey="ctaUrl" value={cta} urlValue={ctaUrl} fallback="Mari bicara" className={desktopOnly} linkClassName="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-xs font-extrabold text-background transition-transform hover:-translate-y-0.5"><ArrowUpRight size={14} aria-hidden="true" /></InlineEditableLink>
        <button type="button" className={`${mobileOnly} grid size-9 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted`} aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={17} /> : <Menu size={18} />}
        </button>
        <div id={menuId} className={`${mobileOnly} ${open ? "grid" : "hidden"} absolute inset-x-0 top-[calc(100%+0.6rem)] gap-1 rounded-[var(--radius)] border border-border bg-card p-2 shadow-[var(--shadow)]`}>
          {links.map((link, index) => <InlineEditableLink key={link.id} node={node} propKey={`link${index + 1}Text`} urlKey={`link${index + 1}Url`} value={link.label} urlValue={link.url} fallback={link.label} className="w-full" linkClassName={linkClass(effect, true)} />)}
          <InlineEditableLink node={node} propKey="ctaText" urlKey="ctaUrl" value={cta} urlValue={ctaUrl} fallback="Mari bicara" className="mt-1 w-full" linkClassName="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-sm font-extrabold text-primary-foreground"><ArrowUpRight size={15} /></InlineEditableLink>
        </div>
      </nav>
    </header>
  );
}
