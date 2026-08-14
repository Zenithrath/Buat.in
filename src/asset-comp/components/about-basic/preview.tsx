"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";

export function AboutPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const title = propString(node, "title") || "Membangun Masa Depan Antarmuka Digital";
  const description = propString(node, "description") || "Kami percaya bahwa membuat website & dashboard harus mudah.";
  const stat1Number = propString(node, "stat1Number") || "10K+";
  const stat1Label = propString(node, "stat1Label") || "Pengguna Aktif";
  const stat2Number = propString(node, "stat2Number") || "99.9%";
  const stat2Label = propString(node, "stat2Label") || "Uptime SLA";
  const stat3Number = propString(node, "stat3Number") || "24/7";
  const stat3Label = propString(node, "stat3Label") || "Dukungan CS";

  return (
    <section
      className="w-full px-6 py-16 bg-background transition-colors border-t border-b"
      style={themeTokenStyle(tokens)}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            [ Tentang Kami ]
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-6">
            <div>
              <p className="font-mono text-2xl font-black text-primary">{stat1Number}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat1Label}</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-black text-primary">{stat2Number}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat2Label}</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-black text-primary">{stat3Number}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat3Label}</p>
            </div>
          </div>
        </div>

        <div className="flex h-72 w-full items-center justify-center rounded-2xl bg-muted/60 border text-muted-foreground font-mono text-xs font-bold">
          [ Visual Banner Perusahaan ]
        </div>
      </div>
    </section>
  );
}
