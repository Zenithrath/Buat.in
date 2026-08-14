"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function KpiCardPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const title = propString(node, "title") || "Total Revenue";
  const value = propString(node, "value") || "Rp 128.450.000";
  const change = propString(node, "change") || "+14.2%";
  const trend = propString(node, "trend") || "up";
  const period = propString(node, "period") || "vs bulan lalu";

  return (
    <div
      className="bi-kpi-card flex flex-col justify-between rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md"
      style={themeTokenStyle(tokens)}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {title}
        </p>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
            trend === "up"
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : trend === "down"
              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp size={11} />
          ) : trend === "down" ? (
            <TrendingDown size={11} />
          ) : (
            <Minus size={11} />
          )}
          {change}
        </span>
      </div>

      <div className="mt-3">
        <p className="text-2xl font-bold tracking-tight text-foreground font-mono">
          {value}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">{period}</p>
      </div>
    </div>
  );
}
