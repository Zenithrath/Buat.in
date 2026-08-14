import type { Node } from "@/lib/schema/types";
import type { ExportContext, ExportResult } from "@/lib/registry/types";
import { propString, escapeHtml } from "@/lib/registry/shared";

export function appSidebarExportAdapter(
  node: Node,
  _ctx: ExportContext
): ExportResult {
  const brandName = propString(node, "brandName") || "Acme Analytics";
  const brandTag = propString(node, "brandTag") || "PRO";
  const userName = propString(node, "userName") || "Alex Rivers";
  const userRole = propString(node, "userRole") || "Administrator";

  let links: { id: string; label: string; active?: boolean }[] = [];
  try {
    const raw = propString(node, "linksJson");
    links = raw ? JSON.parse(raw) : [];
  } catch {
    links = [
      { id: "s1", label: "Overview", active: true },
      { id: "s2", label: "Analytics", active: false },
      { id: "s3", label: "Transaksi", active: false },
      { id: "s4", label: "Pengguna", active: false },
    ];
  }

  const linksHtml = links
    .map(
      (l) =>
        `<a href="#" className="bi-sidebar-link ${l.active ? "active" : ""}">${escapeHtml(
          l.label
        )}</a>`
    )
    .join("\n        ");

  const html = `<aside className="bi-sidebar">
  <div className="bi-sidebar-brand">
    <div className="bi-brand-logo">${escapeHtml(brandName.charAt(0))}</div>
    <div>
      <div className="bi-brand-title">${escapeHtml(brandName)}</div>
      <span className="bi-brand-tag">${escapeHtml(brandTag)}</span>
    </div>
  </div>
  <nav className="bi-sidebar-menu">
    ${linksHtml}
  </nav>
  <div className="bi-sidebar-user">
    <div className="bi-user-name">${escapeHtml(userName)}</div>
    <div className="bi-user-role">${escapeHtml(userRole)}</div>
  </div>
</aside>`;

  const css = `.bi-sidebar { width: 260px; background: var(--card); border-right: 1px solid var(--border); padding: 1rem; display: flex; flex-direction: column; height: 100%; }
.bi-sidebar-brand { display: flex; align-items: center; gap: 0.75rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem; }
.bi-brand-logo { width: 32px; height: 32px; background: var(--primary); color: var(--primary-foreground); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; font-weight: bold; }
.bi-brand-title { font-weight: 700; font-size: 0.875rem; color: var(--foreground); }
.bi-brand-tag { font-size: 0.65rem; background: var(--muted); padding: 2px 6px; border-radius: 4px; color: var(--primary); }
.bi-sidebar-menu { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; }
.bi-sidebar-link { padding: 0.5rem 0.75rem; border-radius: var(--radius); color: var(--muted-foreground); text-decoration: none; font-size: 0.85rem; font-weight: 500; }
.bi-sidebar-link.active, .bi-sidebar-link:hover { background: var(--primary); color: var(--primary-foreground); }
.bi-sidebar-user { border-top: 1px solid var(--border); padding-top: 1rem; margin-top: auto; }
.bi-user-name { font-size: 0.85rem; font-weight: 600; color: var(--foreground); }
.bi-user-role { font-size: 0.75rem; color: var(--muted-foreground); }`;

  return { html, css };
}
