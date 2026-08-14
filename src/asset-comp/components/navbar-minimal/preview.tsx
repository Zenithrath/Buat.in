"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";

export function NavbarPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const logoText = propString(node, "logoText") || "Logo Saya";
  const link1Text = propString(node, "link1Text") || "Beranda";
  const link1Url = propString(node, "link1Url") || "#";
  const link2Text = propString(node, "link2Text") || "Tentang";
  const link2Url = propString(node, "link2Url") || "#tentang";
  const link3Text = propString(node, "link3Text") || "Kontak";
  const link3Url = propString(node, "link3Url") || "#kontak";
  const ctaText = propString(node, "ctaText") || "Mulai";
  const ctaUrl = propString(node, "ctaUrl") || "#";

  return (
    <nav
      className="flex w-full items-center justify-between border-b px-6 py-4 transition-colors"
      style={themeTokenStyle(tokens)}
    >
      <a href="#" className="font-display text-lg font-bold text-foreground">
        {logoText}
      </a>
      <div className="hidden items-center gap-6 md:flex">
        {link1Text ? (
          <a href={link1Url} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {link1Text}
          </a>
        ) : null}
        {link2Text ? (
          <a href={link2Url} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {link2Text}
          </a>
        ) : null}
        {link3Text ? (
          <a href={link3Url} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {link3Text}
          </a>
        ) : null}
      </div>
      {ctaText ? (
        <a
          href={ctaUrl}
          className="rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
        >
          {ctaText}
        </a>
      ) : null}
    </nav>
  );
}
