"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { InlineEditableText } from "@/components/preview/InlineEditable";

function textOrFallback(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function resolvePeriod(node: Node): string {
  return propString(node, "subtitle").trim() || propString(node, "period").trim() || "dibandingkan bulan lalu";
}

function resolveTrend(node: Node): "up" | "down" | "neutral" {
  const value = propString(node, "trend").trim().toLowerCase();
  return value === "down" || value === "neutral" ? value : "up";
}

export function KpiCardPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const title = textOrFallback(node, "title", "Total Pendapatan");
  const value = textOrFallback(node, "value", "Rp 128.450.000");
  const change = textOrFallback(node, "change", "+14.2%");
  const trend = resolveTrend(node);
  const period = resolvePeriod(node);
  const isUp = trend === "up";
  const isDown = trend === "down";
  const trendClass = isUp
    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    : isDown
      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
      : "bg-muted text-muted-foreground";
  const sparkline = isDown ? "2,18 10,14 18,16 26,10 34,12 42,7 50,9 58,3" : "2,18 10,15 18,16 26,11 34,12 42,8 50,9 58,3";

  return (
    <article
      className="bi-kpi-card relative flex min-h-[142px] min-w-0 flex-col justify-between overflow-hidden rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
      style={themeTokenStyle(tokens)}
    >
      <div className="flex min-w-0 items-start justify-between gap-2">
        <p className="min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
          <InlineEditableText node={node} propKey="title" fallback="Total Pendapatan" value={title} />
        </p>
        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${trendClass}`}>
          {isUp ? <TrendingUp aria-hidden="true" size={12} /> : isDown ? <TrendingDown aria-hidden="true" size={12} /> : <Minus aria-hidden="true" size={12} />}
          <InlineEditableText node={node} propKey="change" fallback="+14.2%" value={change} />
        </span>
      </div>

      <div className="relative z-10 mt-3 min-w-0">
        <p className="truncate text-2xl font-extrabold tracking-tight text-foreground"><InlineEditableText node={node} propKey="value" fallback="Rp 128.450.000" value={value} /></p>
        <p className="mt-1 truncate text-[11px] font-medium text-muted-foreground"><InlineEditableText node={node} propKey="subtitle" fallback="dibandingkan bulan lalu" value={period} /></p>
      </div>

      <svg aria-hidden="true" viewBox="0 0 60 22" className="pointer-events-none absolute bottom-3 right-3 h-9 w-24 opacity-30">
        <polyline points={sparkline} fill="none" stroke={isDown ? "#f43f5e" : isUp ? tokens.primary : tokens.mutedForeground} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </article>
  );
}
