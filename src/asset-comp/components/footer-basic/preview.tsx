"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";

export function FooterPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const copyrightText = propString(node, "copyrightText") || "© 2026 Buat.in";
  const link1Text = propString(node, "link1Text") || "Privasi";
  const link1Url = propString(node, "link1Url") || "#";
  const link2Text = propString(node, "link2Text") || "Syarat & Ketentuan";
  const link2Url = propString(node, "link2Url") || "#";
  const link3Text = propString(node, "link3Text") || "Bantuan";
  const link3Url = propString(node, "link3Url") || "#";

  return (
    <footer
      className="w-full border-t bg-card px-6 py-8 transition-colors text-xs text-muted-foreground"
      style={themeTokenStyle(tokens)}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-medium">{copyrightText}</p>
        <div className="flex items-center gap-6">
          {link1Text ? (
            <a href={link1Url} className="hover:text-foreground transition-colors">
              {link1Text}
            </a>
          ) : null}
          {link2Text ? (
            <a href={link2Url} className="hover:text-foreground transition-colors">
              {link2Text}
            </a>
          ) : null}
          {link3Text ? (
            <a href={link3Url} className="hover:text-foreground transition-colors">
              {link3Text}
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
