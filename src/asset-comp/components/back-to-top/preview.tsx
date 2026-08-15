"use client";

import { ArrowUp } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { cn } from "@/lib/utils";

function propNumber(node: Node, key: string, fallback: number): number {
  const value = node.props[key];
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

export function BackToTopPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const label = propString(node, "label").trim() || "Kembali ke atas";
  const position = propString(node, "position").trim() || "right";
  const variant = propString(node, "variant").trim() || "solid";
  const showAfter = propNumber(node, "showAfter", 320);

  const variantClasses: Record<string, string> = {
    solid: "bg-primary text-primary-foreground shadow-lg hover:opacity-90",
    outline: "border border-border bg-card text-foreground shadow-sm hover:bg-muted",
    ghost: "bg-muted/70 text-foreground hover:bg-muted",
  };

  return (
    <div className="relative h-40 w-full border-y border-border bg-background" style={themeTokenStyle(tokens)}>
      <p className="absolute inset-x-0 top-4 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Demo: tombol muncul setelah gulir {showAfter}px
      </p>
      <button
        type="button"
        aria-label={label}
        title={label}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "absolute bottom-6 z-40 grid size-11 place-items-center rounded-full transition-all",
          position === "left" ? "left-6" : "right-6",
          variantClasses[variant] ?? variantClasses.solid
        )}
      >
        <ArrowUp aria-hidden="true" size={18} />
      </button>
    </div>
  );
}
