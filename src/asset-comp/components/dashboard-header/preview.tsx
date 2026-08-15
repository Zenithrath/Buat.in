"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Search, Sparkles, X } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { nodeList, listValue } from "../_shared/content";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { cn } from "@/lib/utils";

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

function listProp(node: Node, key: string): string {
  return propString(node, key).trim();
}

function parseNotifications(node: Node): { id: string; title: string; time: string }[] {
  const source = node.props.notifications === undefined ? "notificationsJson" : "notifications";
  const items = nodeList(node, source)
    .map((item, index) => {
      const title = listValue(item, "title");
      if (!title) return null;
      return {
        id: String(item.id ?? `notif-${index + 1}`),
        title,
        time: listValue(item, "time", "Baru saja"),
      };
    })
    .filter((item): item is { id: string; title: string; time: string } => item !== null);
  return items.length ? items : [];
}

export function DashboardHeaderPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const canvasMobile = device === "mobile";
  const title = textOrFallback(node, "title", "Overview Dashboard");
  const breadcrumb = textOrFallback(node, "breadcrumb", "Dashboard / Analytics");
  const searchPlaceholder = textOrFallback(node, "searchPlaceholder", "Cari data, laporan, atau transaksi...");
  const actionText = optionalText(node, "actionText", "Export Laporan");
  const showSearch = booleanProp(node, "showSearch", true);
  const showNotifications = booleanProp(node, "showNotifications", true);
  const notificationsMode = listProp(node, "notificationsMode") || "panel";
  const notifications = parseNotifications(node);
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const panelId = `dashboard-notif-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "preview"}`;

  useEffect(() => {
    if (!open) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as unknown as globalThis.Node | null;
      if (popoverRef.current && !popoverRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  const bellButton = showNotifications ? (
    <button
      type="button"
      aria-label="Notifikasi"
      aria-expanded={open}
      aria-controls={open ? panelId : undefined}
      onClick={() => setOpen((value) => !value)}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Bell aria-hidden="true" size={16} />
      <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-card" />
    </button>
  ) : null;

  const notificationList = notifications.length ? (
    <ul className="divide-y divide-border">
      {notifications.map((item) => (
        <li key={item.id} className="flex items-start gap-2.5 px-3 py-2.5">
          <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold leading-snug text-foreground">{item.title}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="px-3 py-4 text-center text-[11px] text-muted-foreground">
      Belum ada notifikasi
    </p>
  );

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

        {bellButton ? (
          <div ref={popoverRef} className="relative">
            {bellButton}
            {open && notificationsMode === "panel" ? (
              <div
                id={panelId}
                role="dialog"
                aria-label="Daftar notifikasi"
                className={cn(
                  "absolute right-0 top-[calc(100%+0.5rem)] z-50 w-72 overflow-hidden rounded-xl border border-border bg-card text-foreground shadow-xl",
                  canvasMobile && "fixed inset-x-3 top-16 w-auto"
                )}
              >
                <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
                  <p className="text-[11px] font-bold">Notifikasi</p>
                  <button
                    type="button"
                    aria-label="Tutup notifikasi"
                    onClick={() => setOpen(false)}
                    className="grid size-6 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <X size={13} />
                  </button>
                </div>
                {notificationList}
              </div>
            ) : null}
            {open && notificationsMode === "modal" ? (
              <div
                className={cn(
                  "fixed inset-0 z-[80] flex items-center justify-center bg-foreground/45 p-3 backdrop-blur-[2px]",
                  canvasMobile && "items-end"
                )}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setOpen(false);
                }}
              >
                <div
                  id={panelId}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Daftar notifikasi"
                  className={cn(
                    "w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-2xl",
                    canvasMobile && "max-h-[80vh] overflow-y-auto"
                  )}
                >
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <p className="text-sm font-bold">Notifikasi</p>
                    <button
                      type="button"
                      aria-label="Tutup notifikasi"
                      onClick={() => setOpen(false)}
                      className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">{notificationList}</div>
                </div>
              </div>
            ) : null}
          </div>
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
