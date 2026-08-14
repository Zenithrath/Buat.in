"use client";

import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FolderKanban,
  Home,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, sanitizeUrl, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { usePreviewEditing } from "@/components/preview/PreviewEditingContext";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { listValue, nodeList, uniqueId } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";

type SidebarLink = { id: string; icon: string; label: string; url: string };

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  chart: BarChart3,
  folder: FolderKanban,
  users: Users,
  card: CreditCard,
  bell: Bell,
  settings: Settings,
};

const FALLBACK: SidebarLink[] = [
  { id: "summary", icon: "home", label: "Ringkasan", url: "#ringkasan" },
  { id: "analytics", icon: "chart", label: "Analitik", url: "#analitik" },
  { id: "projects", icon: "folder", label: "Proyek", url: "#proyek" },
  { id: "team", icon: "users", label: "Tim", url: "#tim" },
  { id: "settings", icon: "settings", label: "Pengaturan", url: "#pengaturan" },
];

function sourceKey(node: Node) {
  return node.props.links === undefined ? "linksJson" : "links";
}

function links(node: Node): SidebarLink[] {
  const entries = nodeList(node, sourceKey(node))
    .map((item, index) => {
      const label = listValue(item, "label");
      if (!label) return null;
      return {
        id: uniqueId("sidebar-icon", index, label),
        icon: listValue(item, "icon", "home"),
        label,
        url: listValue(item, "url", "#"),
      };
    })
    .filter((item): item is SidebarLink => item !== null);
  return entries.length ? entries : FALLBACK;
}

function initialOpen(node: Node) {
  return node.props.defaultOpen === true || propString(node, "defaultOpen") === "true";
}

function copy(node: Node, key: string, fallback: string) {
  return propString(node, key).trim() || fallback;
}

export function SidebarIconPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const editingEnabled = usePreviewEditing();
  const initiallyOpen = initialOpen(node);
  const [userOpen, setUserOpen] = useState<boolean | null>(null);
  const compactCanvasRail = device === "mobile";
  const open = compactCanvasRail ? false : userOpen ?? initiallyOpen;
  const [active, setActive] = useState(0);
  const key = sourceKey(node);
  const { setValue } = useRepeaterEditor(node, key);
  const items = links(node);
  const logo = copy(node, "logoText", "B");
  const workspaceLabel = copy(node, "workspaceLabel", "Workspace");
  const statusLabel = copy(node, "statusLabel", "Terhubung");
  const widthClass = compactCanvasRail ? "h-full min-h-0 w-full" : open ? "min-h-[30rem] w-56" : "min-h-[30rem] w-[4.5rem]";

  return (
    <aside
      aria-label="Sidebar ikon"
      className={`relative flex shrink-0 flex-col border-r border-border bg-card p-2.5 text-foreground shadow-sm transition-[width] duration-200 ${widthClass}`}
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className={`flex items-center border-b border-border pb-3 ${open ? "justify-between gap-2" : "justify-center"}`}>
        <span className="grid size-9 shrink-0 place-items-center rounded-[calc(var(--radius)*.75)] bg-primary text-sm font-black text-primary-foreground">
          <InlineEditableText node={node} propKey="logoText" fallback="B" value={logo.slice(0, 3)} />
        </span>
        {open ? (
          <span className="min-w-0 flex-1 truncate text-xs font-extrabold tracking-tight">
            <InlineEditableText node={node} propKey="workspaceLabel" fallback="Workspace" value={workspaceLabel} />
          </span>
        ) : null}
        {!compactCanvasRail ? (
          <button
            type="button"
            onClick={() => setUserOpen(!open)}
            aria-label={open ? "Ciutkan sidebar" : "Buka sidebar"}
            title={open ? "Ciutkan sidebar" : "Buka sidebar"}
            className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {open ? <ChevronLeft size={16} aria-hidden="true" /> : <ChevronRight size={16} aria-hidden="true" />}
          </button>
        ) : null}
      </div>
      <nav className="mt-3 flex flex-1 flex-col gap-1" aria-label="Menu dashboard">
        {items.map((item, index) => {
          const Icon = ICONS[item.icon] ?? Home;
          const isActive = active === index;
          return (
            <a
              key={item.id}
              href={sanitizeUrl(item.url)}
              title={open ? undefined : item.label}
              onClick={(event) => {
                if (editingEnabled) event.preventDefault();
                setActive(index);
              }}
              className={`group flex min-w-0 items-center rounded-[calc(var(--radius)*.75)] text-sm font-semibold transition-colors ${open ? "gap-3 px-2.5 py-2.5" : "justify-center p-2.5"} ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={17} strokeWidth={1.9} className="shrink-0" aria-hidden="true" />
              {open ? (
                <span className="min-w-0 flex-1 truncate">
                  <InlineEditableText
                    node={node}
                    propKey={key}
                    value={item.label}
                    onCommit={(next) => setValue(index, "label", next)}
                  />
                </span>
              ) : null}
            </a>
          );
        })}
      </nav>
      <div className={`mt-4 border-t border-border pt-3 ${open ? "" : "flex justify-center"}`}>
        {open ? (
          <span className="flex items-center gap-2 px-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-500" />
            <InlineEditableText node={node} propKey="statusLabel" fallback="Terhubung" value={statusLabel} />
          </span>
        ) : (
          <span className="size-2 rounded-full bg-emerald-500" aria-label={statusLabel} role="status" />
        )}
      </div>
    </aside>
  );
}
