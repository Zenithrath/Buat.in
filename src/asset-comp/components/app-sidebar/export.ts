import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

interface SidebarLink {
  id: string;
  label: string;
  url: string;
  icon: string;
  active: boolean;
}

const DEFAULT_LINKS: SidebarLink[] = [
  { id: "overview", label: "Ringkasan", url: "/", icon: "layout-dashboard", active: true },
  { id: "analytics", label: "Analitik", url: "#analitik", icon: "bar-chart-3", active: false },
  { id: "billing", label: "Keuangan", url: "#keuangan", icon: "credit-card", active: false },
  { id: "people", label: "Klien", url: "#klien", icon: "users", active: false },
  { id: "settings", label: "Pengaturan", url: "#pengaturan", icon: "settings", active: false },
];

function textOrFallback(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function parseLinks(node: Node): SidebarLink[] {
  try {
    const parsed: unknown = JSON.parse(propString(node, "linksJson"));
    if (!Array.isArray(parsed)) return DEFAULT_LINKS;

    const links = parsed
      .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
      .map((item, index) => ({
        id: String(item.id ?? `menu-${index + 1}`).trim() || `menu-${index + 1}`,
        label: String(item.label ?? "").trim(),
        url: String(item.url ?? "").trim() || "#",
        icon: String(item.icon ?? "layout-dashboard"),
        active: item.active === true,
      }))
      .filter((item) => item.label.length > 0);

    if (!links.length) return DEFAULT_LINKS;
    if (!links.some((item) => item.active)) links[0].active = true;
    return links;
  } catch {
    return DEFAULT_LINKS;
  }
}

function iconMarkup(icon: string): string {
  const attrs = 'class="bi-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';

  switch (icon) {
    case "bar-chart-3":
      return `<svg ${attrs}><path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M12 16V7"/><path d="M17 16v-9"/></svg>`;
    case "credit-card":
      return `<svg ${attrs}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/></svg>`;
    case "users":
      return `<svg ${attrs}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
    case "settings":
      return `<svg ${attrs}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56v.08h-3v-.08A1.7 1.7 0 0 0 10.68 18.7a1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7.02 15a1.7 1.7 0 0 0-1.56-1.03h-.08v-3h.08A1.7 1.7 0 0 0 7.02 9.94a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56v-.08h3v.08a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06L19.8 8l-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03h.08v3h-.08A1.7 1.7 0 0 0 19.4 15Z"/></svg>`;
    default:
      return `<svg ${attrs}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`;
  }
}

export function appSidebarExport(node: Node): ExportResult {
  const brandName = textOrFallback(node, "brandName", "Dasbor Tim");
  const brandTag = propString(node, "brandTag").trim();
  const userName = textOrFallback(node, "userName", "Alex Rivanto");
  const userRole = textOrFallback(node, "userRole", "Admin");
  const links = parseLinks(node);

  const linksHtml = links
    .map((link) => {
      const classes = `bi-sidebar-link${link.active ? " active is-active" : ""}`;
      const label = `<span class="bi-sidebar-link-label">${escapeHtml(link.label)}</span>`;
      const caret = link.active ? '<span class="bi-sidebar-link-caret" aria-hidden="true">â€º</span>' : "";
      const activeAttr = link.active ? ' aria-current="page"' : "";
      const inner = `${iconMarkup(link.icon)}\n          ${label}\n          ${caret}`;
      const href = link.url.trim();
      if (href && href !== "#") {
        return `<a class="${classes}" href="${escapeHtml(href)}" aria-label="Buka ${escapeHtml(link.label)}"${activeAttr}>\n          ${inner}\n        </a>`;
      }
      return `<button class="${classes}" type="button" data-dashboard-nav-link aria-label="Buka ${escapeHtml(link.label)}"${activeAttr}>\n          ${inner}\n        </button>`;
    })
    .join("\n        ");

  const html = `<aside class="bi-sidebar" aria-label="Navigasi aplikasi">
  <div class="bi-sidebar-brand">
    <div class="bi-brand-logo" aria-hidden="true">${escapeHtml(brandName.charAt(0).toUpperCase())}</div>
    <div class="bi-brand-copy">
      <h2 class="bi-brand-title">${escapeHtml(brandName)}</h2>
      <p class="bi-brand-sub">Workspace operasional</p>
    </div>
    ${brandTag ? `<span class="bi-brand-tag">${escapeHtml(brandTag)}</span>` : ""}
  </div>
  <nav class="bi-sidebar-menu" data-dashboard-nav aria-label="Menu utama">
    <p class="bi-nav-heading">Menu utama</p>
    ${linksHtml}
  </nav>
  <div class="bi-sidebar-user">
    <div class="bi-user-avatar" aria-hidden="true">${escapeHtml(userName.charAt(0).toUpperCase())}<span></span></div>
    <div class="bi-user-info">
      <p class="bi-user-name">${escapeHtml(userName)}</p>
      <p class="bi-user-role">${escapeHtml(userRole)}</p>
    </div>
    <span class="bi-user-verified" aria-label="Akun terverifikasi">âœ“</span>
  </div>
</aside>`;

  const css = `.bi-sidebar {
  width: var(--bi-sidebar-width, 256px);
  min-height: 480px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0.875rem;
  color: var(--bi-fg);
  background: var(--bi-card);
  border-right: 1px solid var(--bi-border);
  font-family: var(--bi-font-body);
}
.bi-sidebar-brand { display: flex; align-items: center; gap: 0.625rem; margin-bottom: 1.25rem; padding: 0.125rem 0.125rem 1rem; border-bottom: 1px solid var(--bi-border); }
.bi-brand-logo { display: grid; width: 2.25rem; height: 2.25rem; flex: 0 0 auto; place-items: center; border-radius: calc(var(--bi-radius) + 2px); background: var(--bi-primary); color: var(--bi-primary-fg); font-size: 0.875rem; font-weight: 800; box-shadow: 0 4px 10px color-mix(in srgb, var(--bi-primary) 25%, transparent); }
.bi-brand-copy { min-width: 0; flex: 1; }
.bi-brand-title { overflow: hidden; margin: 0; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 0.875rem; font-weight: 750; line-height: 1.2; text-overflow: ellipsis; white-space: nowrap; }
.bi-brand-sub { overflow: hidden; margin: 0.2rem 0 0; color: var(--bi-muted-fg); font-size: 0.625rem; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.bi-brand-tag { flex: 0 0 auto; padding: 0.2rem 0.35rem; border: 1px solid color-mix(in srgb, var(--bi-primary) 25%, var(--bi-border)); border-radius: 0.3rem; background: color-mix(in srgb, var(--bi-primary) 10%, transparent); color: var(--bi-primary); font-family: var(--bi-font-mono); font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.04em; }
.bi-sidebar-menu { display: flex; flex: 1; flex-direction: column; gap: 0.25rem; min-width: 0; }
.bi-nav-heading { margin: 0 0 0.25rem; padding: 0 0.625rem; color: var(--bi-muted-fg); font-size: 0.625rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
.bi-sidebar-link { width: 100%; display: flex; min-width: 0; align-items: center; gap: 0.75rem; padding: 0.625rem 0.75rem; border: 1px solid transparent; border-radius: var(--bi-radius); background: transparent; color: var(--bi-muted-fg); cursor: pointer; font: inherit; font-size: 0.75rem; font-weight: 600; line-height: 1; text-align: left; text-decoration: none; box-sizing: border-box; transition: background 150ms ease, color 150ms ease, border-color 150ms ease; }
.bi-sidebar-link:hover { background: var(--bi-muted); color: var(--bi-fg); }
.bi-sidebar-link.active, .bi-sidebar-link.is-active { border-color: color-mix(in srgb, var(--bi-primary) 18%, transparent); background: var(--bi-primary); color: var(--bi-primary-fg); box-shadow: 0 3px 10px color-mix(in srgb, var(--bi-primary) 18%, transparent); }
.bi-sidebar-link-icon { width: 1rem; height: 1rem; flex: 0 0 auto; }
.bi-sidebar-link-label { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bi-sidebar-link-caret { font-size: 1.25rem; font-weight: 400; line-height: 0.5; opacity: 0.75; }
.bi-sidebar-user { display: flex; align-items: center; gap: 0.625rem; margin-top: 1rem; padding: 0.75rem 0.125rem 0.125rem; border-top: 1px solid var(--bi-border); }
.bi-user-avatar { position: relative; display: grid; width: 2rem; height: 2rem; flex: 0 0 auto; place-items: center; border-radius: 999px; background: color-mix(in srgb, var(--bi-primary) 14%, var(--bi-muted)); color: var(--bi-primary); font-size: 0.75rem; font-weight: 800; }
.bi-user-avatar span { position: absolute; right: -1px; bottom: -1px; width: 0.625rem; height: 0.625rem; border: 2px solid var(--bi-card); border-radius: 999px; background: #10b981; }
.bi-user-info { min-width: 0; flex: 1; }
.bi-user-name, .bi-user-role { overflow: hidden; margin: 0; text-overflow: ellipsis; white-space: nowrap; }
.bi-user-name { color: var(--bi-fg); font-size: 0.75rem; font-weight: 700; }
.bi-user-role { margin-top: 0.15rem; color: var(--bi-muted-fg); font-size: 0.625rem; }
.bi-user-verified { display: grid; width: 1rem; height: 1rem; flex: 0 0 auto; place-items: center; border-radius: 999px; background: color-mix(in srgb, #10b981 15%, transparent); color: #059669; font-size: 0.65rem; font-weight: 900; }
@media (max-width: 680px) { .bi-sidebar { min-height: 0; } .bi-sidebar-brand, .bi-sidebar-user, .bi-nav-heading { display: none; } .bi-sidebar-menu { flex-direction: row; overflow-x: auto; } .bi-sidebar-link { width: auto; flex: 0 0 auto; justify-content: center; } .bi-sidebar-link-label { flex: 0 0 auto; } .bi-sidebar-link-caret { display: none; } }`;

  return { html, css };
}
