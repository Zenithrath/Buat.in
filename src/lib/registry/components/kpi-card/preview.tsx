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
  const subtitle = propString(node, "subtitle") || "dibandingkan bulan lalu";

  const isUp = trend === "up";
  const isDown = trend === "down";

  return (
    <div
      className="bi-kpi-card flex flex-col justify-between rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md"
      style={themeTokenStyle(tokens)}
    >
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span>{title}</span>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold text-[11px] ${
            isUp
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : isDown
              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {isUp ? (
            <TrendingUp size={12} />
          ) : isDown ? (
            <TrendingDown size={12} />
          ) : (
            <Minus size={12} />
          )}
          {change}
        </span>
      </div>

      <div className="mt-3">
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
