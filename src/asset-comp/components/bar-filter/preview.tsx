"use client";

import { useState } from "react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { listValue, nodeList } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";

const DEFAULT_FILTERS = [
  "Semua",
  "Hari ini",
  "7 hari",
  "30 hari",
  "Kuartal ini",
  "Tahun ini",
];

function propNumber(node: Node, key: string, fallback: number): number {
  const value = node.props[key];
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function filters(node: Node): { label: string; index: number }[] {
  const items = nodeList(node, "filtersJson")
    .map((item, index) => ({ label: listValue(item, "label"), index }))
    .filter((item) => item.label.trim() !== "");
  if (items.length) return items;
  return DEFAULT_FILTERS.map((label, index) => ({ label, index }));
}

export function BarFilterPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const { setValue } = useRepeaterEditor(node, "filtersJson");
  const [active, setActive] = useState(() => propNumber(node, "activeIndex", 0));
  const title = propString(node, "title").trim() || "Filter data";
  const chips = filters(node);

  return (
    <div
      className="bi-bar-filter flex min-w-0 items-center gap-3 rounded-xl border bg-card px-4 py-3"
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <p className="shrink-0 text-xs font-bold text-foreground">
        <InlineEditableText node={node} propKey="title" fallback="Filter data" value={title} />
      </p>
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {chips.map((chip) => {
          const isActive = chip.index === active;
          return (
            <button
              key={chip.index}
              type="button"
              data-canvas-interactive
              aria-pressed={isActive}
              onClick={(event) => {
                event.stopPropagation();
                setActive(chip.index);
              }}
              className={`shrink-0 cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              <InlineEditableText
                node={node}
                propKey="filtersJson"
                value={chip.label}
                onCommit={(next) => setValue(chip.index, "label", next)}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
