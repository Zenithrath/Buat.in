"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { Search, Bell, Sparkles } from "lucide-react";

export function DashboardHeaderPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const title = propString(node, "title") || "Overview Dashboard";
  const breadcrumb = propString(node, "breadcrumb") || "Dashboard / Analytics";
  const searchPlaceholder = propString(node, "searchPlaceholder") || "Cari data...";

  return (
    <header
      className="bi-dashboard-header flex h-16 w-full items-center justify-between border-b bg-card px-6 transition-colors"
      style={themeTokenStyle(tokens)}
    >
      <div>
        <p className="text-[11px] font-medium text-muted-foreground">{breadcrumb}</p>
        <h1 className="text-base font-bold tracking-tight text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            readOnly
            placeholder={searchPlaceholder}
            className="h-8 w-full rounded-lg border bg-muted/50 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg border text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Bell size={15} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          <Sparkles size={14} />
          <span>Export Laporan</span>
        </button>
      </div>
    </header>
  );
}
