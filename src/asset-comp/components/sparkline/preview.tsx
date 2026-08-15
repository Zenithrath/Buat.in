"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";

function propNumber(node: Node, key: string, fallback: number): number {
  const value = node.props[key];
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function propBoolean(node: Node, key: string, fallback: boolean): boolean {
  const value = node.props[key];
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true";
  return fallback;
}

function textOrFallback(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function parseData(raw: string): number[] {
  return raw
    .split(",")
    .map((part) => Number(part.trim().replace(",", ".")))
    .filter((value) => Number.isFinite(value));
}

function sparkGeometry(values: number[], height: number) {
  const width = 100;
  const pad = 3;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * width;
    const y = pad + (1 - (value - min) / range) * (height - pad * 2);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  return {
    line: points.join(" "),
    area: `0,${height} ${points.join(" ")} ${width},${height}`,
  };
}

export function SparklinePreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const label = textOrFallback(node, "label", "Penjualan minggu ini");
  const value = textOrFallback(node, "value", "Rp 24,5 juta");
  const trend = textOrFallback(node, "trend", "+12%");
  const up = propBoolean(node, "up", true);
  const chartHeight = Math.max(24, Math.min(96, Math.round(propNumber(node, "height", 48))));
  const data = parseData(propString(node, "data"));
  const hasData = data.length >= 2;
  const geometry = hasData ? sparkGeometry(data, chartHeight) : null;

  return (
    <article
      className="bi-sparkline flex min-w-0 flex-col rounded-xl border bg-card p-4"
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className="flex min-w-0 items-start justify-between gap-2">
        <p className="min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
          <InlineEditableText node={node} propKey="label" fallback="Penjualan minggu ini" value={label} />
        </p>
        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${
            up
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
          }`}
        >
          <span aria-hidden="true">{up ? "▲" : "▼"}</span>
          <InlineEditableText node={node} propKey="trend" fallback="+12%" value={trend} />
        </span>
      </div>

      <p className="mt-2 truncate text-xl font-extrabold tracking-tight text-foreground">
        <InlineEditableText node={node} propKey="value" fallback="Rp 24,5 juta" value={value} />
      </p>

      {hasData && geometry ? (
        <svg
          viewBox={`0 0 100 ${chartHeight}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={label}
          className="mt-3 w-full text-primary"
          style={{ height: `${chartHeight}px` }}
        >
          <polygon fill="currentColor" opacity="0.12" points={geometry.area} />
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={geometry.line}
          />
        </svg>
      ) : (
        <div
          className="mt-3 grid w-full place-items-center rounded-lg border border-dashed border-border text-[11px] font-medium text-muted-foreground"
          style={{ height: `${chartHeight}px` }}
        >
          Belum ada data
        </div>
      )}
    </article>
  );
}
