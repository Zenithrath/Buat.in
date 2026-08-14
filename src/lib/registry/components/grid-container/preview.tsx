"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { SectionPreview } from "@/components/preview/SectionPreview";
import { themeTokenStyle } from "@/lib/registry/shared";

export function GridContainerPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const cols = Number(node.props.columns) || 4;
  const gapMap: Record<string, string> = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
  };
  const gapClass = gapMap[String(node.props.gap)] || "gap-4";

  const gridColsClass =
    cols === 1
      ? "grid-cols-1"
      : cols === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : cols === 3
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div
      className={`bi-grid-container grid ${gridColsClass} ${gapClass} p-4 w-full`}
      style={themeTokenStyle(tokens)}
    >
      {node.children && node.children.length > 0 ? (
        node.children.map((child) => (
          <SectionPreview key={child.id} node={child} theme={theme} />
        ))
      ) : (
        <div className="col-span-full rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
          Wadah Grid Kosong — Seret komponen ke sini.
        </div>
      )}
    </div>
  );
}
