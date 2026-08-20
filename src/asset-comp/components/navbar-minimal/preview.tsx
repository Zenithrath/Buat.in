"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, sanitizeUrl, themeTokenStyle } from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { BrandMark } from "../_shared/logo";

export function NavbarPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const previewDevice = usePreviewDevice();
  const isCanvasMobile = previewDevice === "mobile";
  const logoText = propString(node, "logoText") || "Logo Saya";
  const link1Text = propString(node, "link1Text") || "Beranda";
  const link1Url = sanitizeUrl(propString(node, "link1Url"));
  const link2Text = propString(node, "link2Text") || "Tentang";
  const link2Url = sanitizeUrl(propString(node, "link2Url"));
  const link3Text = propString(node, "link3Text") || "Kontak";
  const link3Url = sanitizeUrl(propString(node, "link3Url"));
  const ctaText = propString(node, "ctaText") || "Mulai";
  const ctaUrl = sanitizeUrl(propString(node, "ctaUrl"));
  const menuId = `nav-menu-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "preview"}`;

  return (
    <nav
      aria-label="Navigasi utama"
      className="flex w-full flex-wrap items-center justify-between border-b px-5 py-3.5 transition-colors sm:px-6"
      style={themeTokenStyle(tokens)}
    >
      <a href="#" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-foreground">
        <BrandMark node={node} name={logoText} hideLetter imgClassName="h-7 w-7 rounded-md object-cover" />
        <InlineEditableText node={node} propKey="logoText" fallback={logoText} />
      </a>
      <button
        type="button"
        aria-expanded={mobileOpen}
        aria-controls={menuId}
        aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
        onClick={() => setMobileOpen((open) => !open)}
        className={
          previewDevice === null
            ? "inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted md:hidden"
            : isCanvasMobile
              ? "inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted"
              : "hidden"
        }
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
      <div
        id={menuId}
        className={
          previewDevice === null
            ? `${mobileOpen ? "flex" : "hidden"} order-3 mt-3 w-full flex-col gap-1 border-t pt-3 md:order-none md:mt-0 md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:border-0 md:pt-0`
            : isCanvasMobile
              ? `${mobileOpen ? "flex" : "hidden"} order-3 mt-3 w-full flex-col gap-1 border-t pt-3`
              : "flex items-center gap-6"
        }
      >
        {link1Text ? (
          <InlineEditableLink
            node={node}
            propKey="link1Text"
            urlKey="link1Url"
            value={link1Text}
            urlValue={link1Url}
            linkClassName={previewDevice === null ? "rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:px-0 md:py-0 md:hover:bg-transparent" : isCanvasMobile ? "rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"}
          />
        ) : null}
        {link2Text ? (
          <InlineEditableLink
            node={node}
            propKey="link2Text"
            urlKey="link2Url"
            value={link2Text}
            urlValue={link2Url}
            linkClassName={previewDevice === null ? "rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:px-0 md:py-0 md:hover:bg-transparent" : isCanvasMobile ? "rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"}
          />
        ) : null}
        {link3Text ? (
          <InlineEditableLink
            node={node}
            propKey="link3Text"
            urlKey="link3Url"
            value={link3Text}
            urlValue={link3Url}
            linkClassName={previewDevice === null ? "rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:px-0 md:py-0 md:hover:bg-transparent" : isCanvasMobile ? "rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"}
          />
        ) : null}
        {ctaText ? (
          <InlineEditableLink
            node={node}
            propKey="ctaText"
            urlKey="ctaUrl"
            value={ctaText}
            urlValue={ctaUrl}
            linkClassName={previewDevice === null ? "mt-1 rounded-md bg-primary px-4 py-2 text-center text-xs font-bold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 md:hidden" : isCanvasMobile ? "mt-1 rounded-md bg-primary px-4 py-2 text-center text-xs font-bold text-primary-foreground shadow-sm transition-opacity hover:opacity-90" : "hidden"}
          />
        ) : null}
      </div>
      {ctaText ? (
        <InlineEditableLink
          node={node}
          propKey="ctaText"
          urlKey="ctaUrl"
          value={ctaText}
          urlValue={ctaUrl}
          linkClassName={previewDevice === null ? "hidden rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 md:inline-flex" : isCanvasMobile ? "hidden" : "inline-flex rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"}
        />
      ) : null}
    </nav>
  );
}
