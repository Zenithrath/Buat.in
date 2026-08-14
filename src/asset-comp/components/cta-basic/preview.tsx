"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { ArrowRight } from "lucide-react";

export function CtaPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const title = propString(node, "title") || "Siap Membangun Website?";
  const description = propString(node, "description") || "Daftar sekarang dan nikmati akses penuh.";
  const buttonText = propString(node, "buttonText") || "Mulai Buat Gratis";
  const buttonUrl = propString(node, "buttonUrl") || "#";

  return (
    <section
      className="w-full px-6 py-16 transition-colors"
      style={themeTokenStyle(tokens)}
    >
      <div className="mx-auto max-w-5xl rounded-2xl bg-primary p-8 text-center text-primary-foreground shadow-xl md:p-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 sm:text-base">
          {description}
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={buttonUrl}
            className="flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-extrabold text-foreground shadow-md hover:bg-muted transition-colors"
          >
            <span>{buttonText}</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
