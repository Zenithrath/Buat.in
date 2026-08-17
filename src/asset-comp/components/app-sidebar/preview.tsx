"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, sanitizeUrl, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { nodeList, listBoolean, listValue, uniqueId } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";
import {
  BarChart3,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon: string;
  active: boolean;
}

const DEFAULT_LINKS: LinkItem[] = [
  { id: "overview", label: "Ringkasan", url: "/", icon: "layout-dashboard", active: true },
  { id: "analytics", label: "Analitik", url: "#analitik", icon: "bar-chart-3", active: false },
  { id: "billing", label: "Keuangan", url: "#keuangan", icon: "credit-card", active: false },
  { id: "people", label: "Klien", url: "#klien", icon: "users", active: false },
  { id: "settings", label: "Pengaturan", url: "#pengaturan", icon: "settings", active: false },
];

const ICON_MAP: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "bar-chart-3": BarChart3,
  "credit-card": CreditCard,
  users: Users,
  settings: Settings,
};

function textOrFallback(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function parseLinks(node: Node): LinkItem[] {
  const source = node.props.links === undefined ? "linksJson" : "links";
  const links = nodeList(node, source)
    .map((item, index) => {
      const label = listValue(item, "label");
      if (!label) return null;
      return {
        id: uniqueId("app-menu", index, label),
        label,
        url: listValue(item, "url", "#"),
        icon: listValue(item, "icon", "layout-dashboard"),
        active: listBoolean(item, "active"),
      };
    })
    .filter((item): item is LinkItem => item !== null);

  if (!links.length) return DEFAULT_LINKS;
  if (!links.some((item) => item.active)) links[0].active = true;
  return links;
}

export function AppSidebarPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const brandName = textOrFallback(node, "brandName", "Acme Analytics");
  const brandTag = propString(node, "brandTag").trim();
  const userName = textOrFallback(node, "userName", "Alex Rivers");
  const userRole = textOrFallback(node, "userRole", "Administrator");
  const links = parseLinks(node);
  const linksKey = node.props.links === undefined ? "linksJson" : "links";
  const { setValue } = useRepeaterEditor(node, linksKey);
  const brandInitial = brandName.charAt(0).toUpperCase();
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <aside
      aria-label="Navigasi aplikasi"
      className="bi-app-sidebar flex h-full min-h-[520px] w-full min-w-0 flex-col border-r bg-card p-3.5 text-foreground transition-colors"
      style={themeTokenStyle(tokens)}
    >
      <div className="mb-5 flex items-center gap-2.5 border-b pb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-extrabold text-primary-foreground shadow-sm">
          {brandInitial}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-bold leading-tight tracking-tight"><InlineEditableText node={node} propKey="brandName" fallback="Acme Analytics" value={brandName} /></h2>
          <p className="mt-0.5 truncate text-[10px] font-medium text-muted-foreground">
            Workspace operasional
          </p>
        </div>
        {brandTag ? (
          <span className="rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide text-primary">
            <InlineEditableText node={node} propKey="brandTag" value={brandTag} />
          </span>
        ) : null}
      </div>

      <nav aria-label="Menu utama" className="flex flex-1 flex-col gap-1">
        <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          Menu utama
        </p>
        {links.map((link, index) => {
          const Icon = ICON_MAP[link.icon] ?? LayoutDashboard;
          const href = sanitizeUrl(link.url);
          const sharedProps = {
            "aria-current": link.active ? ("page" as const) : undefined,
            className: `flex min-w-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition-colors ${
              link.active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`,
          };
          return href !== "#" ? (
            <a
              key={link.id}
              {...sharedProps}
              href={href}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <Icon aria-hidden="true" size={16} strokeWidth={1.9} className="shrink-0" />
              <span className="min-w-0 flex-1 truncate"><InlineEditableText node={node} propKey={linksKey} value={link.label} onCommit={(next) => setValue(index, "label", next)} /></span>
              {link.active ? <ChevronRight aria-hidden="true" size={14} className="shrink-0 opacity-70" /> : null}
            </a>
          ) : (
            <button
              key={link.id}
              {...sharedProps}
              type="button"
            >
              <Icon aria-hidden="true" size={16} strokeWidth={1.9} className="shrink-0" />
              <span className="min-w-0 flex-1 truncate"><InlineEditableText node={node} propKey={linksKey} value={link.label} onCommit={(next) => setValue(index, "label", next)} /></span>
              {link.active ? <ChevronRight aria-hidden="true" size={14} className="shrink-0 opacity-70" /> : null}
            </button>
          );
        })}
      </nav>

      <div className="mt-5 border-t pt-3.5">
        <div className="flex items-center gap-2.5 rounded-lg bg-muted/60 p-2">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
            {userInitial}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold leading-tight"><InlineEditableText node={node} propKey="userName" fallback="Alex Rivers" value={userName} /></p>
            <p className="mt-0.5 truncate text-[10px] text-muted-foreground"><InlineEditableText node={node} propKey="userRole" fallback="Administrator" value={userRole} /></p>
          </div>
          <ShieldCheck aria-label="Akun terverifikasi" size={15} className="shrink-0 text-emerald-500" />
        </div>
      </div>
    </aside>
  );
}
