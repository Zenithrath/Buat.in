"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { SectionPreview } from "@/components/preview/SectionPreview";

export function GridContainerPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const cols = propString(node, "columns") || "4";
  const gap = propString(node, "gap") || "md";

  const gridColsClass =
    cols === "1"
      ? "grid-cols-1"
      : cols === "2"
      ? "grid-cols-1 md:grid-cols-2"
      : cols === "3"
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  const gapClass = gap === "sm" ? "gap-2" : gap === "lg" ? "gap-6" : "gap-4";

  return (
    <div
      className="bi-grid-container w-full p-2 transition-colors"
      style={themeTokenStyle(tokens)}
    >
      {node.children && node.children.length > 0 ? (
        <div className={`grid ${gridColsClass} ${gapClass}`}>
          {node.children.map((childNode) => (
            <SectionPreview key={childNode.id} node={childNode} theme={theme} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-24 items-center justify-center rounded-lg border-2 border-dashed border-muted p-6 text-center text-xs text-muted-foreground">
          [ Grid Layout Container — {cols} Kolom ]
        </div>
      )}
    </div>
  );
}
