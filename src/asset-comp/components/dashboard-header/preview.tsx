"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { Search, Bell, Sparkles } from "lucide-react";

export function DashboardHeaderPreview({
  node,
  theme,
}: {
  node: Node;
  theme: Theme;
}) {
  const tokens = resolveTheme(theme);
  const title = propString(node, "title") || "Overview Dashboard";
  const breadcrumb = propString(node, "breadcrumb") || "Dashboard / Analytics";
  const searchPlaceholder = propString(node, "searchPlaceholder") || "Cari data...";
  const actionText = propString(node, "actionText") || "Export Laporan";

  return (
    <header
      className="bi-dashboard-header flex w-full items-center justify-between border-b bg-card px-6 py-3.5 transition-colors"
      style={themeTokenStyle(tokens)}
    >
      <div>
        <p className="text-[11px] font-medium text-muted-foreground">{breadcrumb}</p>
        <h1 className="text-lg font-bold text-foreground leading-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            readOnly
            className="h-8 rounded-lg border bg-muted/40 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none w-48 lg:w-64"
          />
        </div>

        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        {actionText ? (
          <button
            type="button"
            className="flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            <Sparkles size={13} />
            <span>{actionText}</span>
          </button>
        ) : null}
      </div>
    </header>
  );
}
