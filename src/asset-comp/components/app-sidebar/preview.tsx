"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import {
  LayoutDashboard,
  BarChart3,
  CreditCard,
  Users,
  Settings,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  "layout-dashboard": <LayoutDashboard size={16} />,
  "bar-chart-3": <BarChart3 size={16} />,
  "credit-card": <CreditCard size={16} />,
  users: <Users size={16} />,
  settings: <Settings size={16} />,
};

interface LinkItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

export function AppSidebarPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const brandName = propString(node, "brandName") || "Acme Analytics";
  const brandTag = propString(node, "brandTag") || "PRO";
  const userName = propString(node, "userName") || "Alex Rivers";
  const userRole = propString(node, "userRole") || "Administrator";

  let links: LinkItem[] = [];
  try {
    const raw = propString(node, "linksJson");
    links = raw ? JSON.parse(raw) : [];
  } catch {
    links = [
      { id: "s1", label: "Overview", icon: "layout-dashboard", active: true },
      { id: "s2", label: "Analytics", icon: "bar-chart-3", active: false },
      { id: "s3", label: "Transaksi", icon: "credit-card", active: false },
      { id: "s4", label: "Pengguna", icon: "users", active: false },
      { id: "s5", label: "Pengaturan", icon: "settings", active: false },
    ];
  }

  return (
    <aside
      className="bi-app-sidebar flex w-full shrink-0 flex-col border-r bg-card p-4 transition-all h-full min-h-[500px]"
      style={themeTokenStyle(tokens)}
    >
      {/* Brand Header */}
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            {brandName.charAt(0)}
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-foreground leading-none">
              {brandName}
            </h2>
            <span className="text-[10px] text-muted-foreground">Dashboard System</span>
          </div>
        </div>
        {brandTag ? (
          <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary">
            {brandTag}
          </span>
        ) : null}
      </div>

      {/* Navigation items */}
      <nav className="flex-1 space-y-1">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Menu Utama
        </p>
        {links.map((link) => (
          <a
            key={link.id || link.label}
            href="#"
            onClick={(e) => e.preventDefault()}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
              link.active
                ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span>{ICON_MAP[link.icon] ?? <LayoutDashboard size={16} />}</span>
            <span className="flex-1">{link.label}</span>
            {link.active ? <ChevronRight size={14} className="opacity-70" /> : null}
          </a>
        ))}
      </nav>

      {/* User profile footer */}
      <div className="mt-auto border-t pt-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 font-bold text-xs text-primary">
            {userName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-foreground leading-none">
              {userName}
            </p>
            <p className="truncate text-[10px] text-muted-foreground mt-0.5">
              {userRole}
            </p>
          </div>
          <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
        </div>
      </div>
    </aside>
  );
}
