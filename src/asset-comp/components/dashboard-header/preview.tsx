"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { Bell, Search, Sparkles } from "lucide-react";
import { InlineEditableText } from "@/components/preview/InlineEditable";

function textOrFallback(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function optionalText(node: Node, key: string, fallback: string): string {
  const raw = propString(node, key).trim();
  return raw || (Object.hasOwn(node.props, key) ? "" : fallback);
}

function booleanProp(node: Node, key: string, fallback: boolean): boolean {
  const value = node.props[key];
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return !["false", "0", "off", "no"].includes(value.trim().toLowerCase());
  return fallback;
}

export function DashboardHeaderPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const title = textOrFallback(node, "title", "Overview Dashboard");
  const breadcrumb = textOrFallback(node, "breadcrumb", "Dashboard / Analytics");
  const searchPlaceholder = textOrFallback(node, "searchPlaceholder", "Cari data, laporan, atau transaksi...");
  const actionText = optionalText(node, "actionText", "Export Laporan");
  const showSearch = booleanProp(node, "showSearch", true);
  const showNotifications = booleanProp(node, "showNotifications", true);

  return (
    <header
      className="bi-dashboard-header flex min-h-[76px] w-full items-center justify-between gap-4 border-b bg-card px-5 py-3.5 text-foreground transition-colors sm:px-6"
      style={themeTokenStyle(tokens)}
    >
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium text-muted-foreground"><InlineEditableText node={node} propKey="breadcrumb" fallback="Dashboard / Analytics" value={breadcrumb} /></p>
        <h1 className="mt-0.5 truncate text-lg font-bold leading-tight tracking-tight"><InlineEditableText node={node} propKey="title" fallback="Overview Dashboard" value={title} /></h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {showSearch ? (
          <div className="relative hidden h-9 w-48 items-center rounded-lg border bg-muted/45 pl-9 pr-3 text-xs text-muted-foreground sm:flex lg:w-64" role="search">
            <Search aria-hidden="true" size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <InlineEditableText node={node} propKey="searchPlaceholder" fallback="Cari data, laporan, atau transaksi..." value={searchPlaceholder} className="block w-full truncate text-muted-foreground" />
          </div>
        ) : null}

        {showNotifications ? (
          <button
            type="button"
            aria-label="Notifikasi"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Bell aria-hidden="true" size={16} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-card" />
          </button>
        ) : null}

        {actionText ? (
          <button
            type="button"
            className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            <Sparkles aria-hidden="true" size={14} />
            <span className="hidden sm:inline"><InlineEditableText node={node} propKey="actionText" value={actionText} /></span>
          </button>
        ) : null}
      </div>
    </header>
  );
}
