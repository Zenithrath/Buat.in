import type { Node } from "@/lib/schema/types";
import type { ExportContext, ExportResult } from "@/lib/registry/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

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

const SEARCH_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>`;
const BELL_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;
const EXPORT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3v12"/><path d="m8 11 4 4 4-4"/><path d="M5 21h14"/></svg>`;

export function dashboardHeaderExportAdapter(
  node: Node,
  _ctx: ExportContext
): ExportResult {
  const title = textOrFallback(node, "title", "Overview Dashboard");
  const breadcrumb = textOrFallback(node, "breadcrumb", "Dashboard / Analytics");
  const searchPlaceholder = textOrFallback(node, "searchPlaceholder", "Cari data, laporan, atau transaksi...");
  const actionText = optionalText(node, "actionText", "Export Laporan");
  const showSearch = booleanProp(node, "showSearch", true);
  const showNotifications = booleanProp(node, "showNotifications", true);

  const html = `<header class="bi-dash-header">
  <div class="bi-dash-header-copy">
    <p class="bi-breadcrumb">${escapeHtml(breadcrumb)}</p>
    <h1 class="bi-dash-title">${escapeHtml(title)}</h1>
  </div>
  <div class="bi-dash-header-actions">
    ${
      showSearch
        ? `<label class="bi-dash-search" role="search">
      <span class="bi-sr-only">Cari data dashboard</span>
      ${SEARCH_ICON}
      <input type="search" data-dashboard-search autocomplete="off" placeholder="${escapeHtml(searchPlaceholder)}" aria-label="Cari data dashboard" />
    </label>`
        : ""
    }
    ${
      showNotifications
        ? `<button class="bi-dash-icon-button" type="button" aria-label="Notifikasi">
      ${BELL_ICON}<span aria-hidden="true"></span>
    </button>`
        : ""
    }
    ${
      actionText
        ? `<button class="bi-dash-action" type="button" data-dashboard-action="export">
      ${EXPORT_ICON}<span>${escapeHtml(actionText)}</span>
    </button>`
        : ""
    }
  </div>
</header>`;

  const css = `.bi-dash-header { display: flex; min-height: 4.75rem; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.875rem clamp(1rem, 3vw, 1.5rem); box-sizing: border-box; background: var(--bi-card); border-bottom: 1px solid var(--bi-border); color: var(--bi-fg); font-family: var(--bi-font-body); }
.bi-dash-header-copy { min-width: 0; }
.bi-breadcrumb { overflow: hidden; margin: 0; color: var(--bi-muted-fg); font-size: 0.6875rem; font-weight: 600; line-height: 1.25; text-overflow: ellipsis; white-space: nowrap; }
.bi-dash-title { overflow: hidden; margin: 0.25rem 0 0; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: clamp(1rem, 1.5vw, 1.125rem); font-weight: 800; letter-spacing: -0.025em; line-height: 1.15; text-overflow: ellipsis; white-space: nowrap; }
.bi-dash-header-actions { display: flex; flex: 0 0 auto; align-items: center; gap: 0.5rem; }
.bi-dash-search { position: relative; display: flex; width: min(20rem, 32vw); height: 2.25rem; align-items: center; color: var(--bi-muted-fg); }
.bi-dash-search svg { position: absolute; left: 0.75rem; width: 0.9rem; height: 0.9rem; pointer-events: none; }
.bi-dash-search input { width: 100%; height: 100%; box-sizing: border-box; border: 1px solid var(--bi-border); border-radius: var(--bi-radius); outline: none; background: color-mix(in srgb, var(--bi-muted) 62%, transparent); color: var(--bi-fg); padding: 0 0.75rem 0 2.25rem; font: 500 0.75rem var(--bi-font-body); transition: border-color 150ms ease, box-shadow 150ms ease; }
.bi-dash-search input::placeholder { color: var(--bi-muted-fg); }
.bi-dash-search input:focus { border-color: var(--bi-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--bi-primary) 15%, transparent); }
.bi-dash-icon-button, .bi-dash-action { display: inline-flex; height: 2.25rem; align-items: center; justify-content: center; border-radius: var(--bi-radius); cursor: pointer; font-family: var(--bi-font-body); transition: background 150ms ease, opacity 150ms ease, transform 150ms ease; }
.bi-dash-icon-button { position: relative; width: 2.25rem; border: 1px solid var(--bi-border); background: var(--bi-card); color: var(--bi-muted-fg); }
.bi-dash-icon-button:hover { background: var(--bi-muted); color: var(--bi-fg); }
.bi-dash-icon-button svg { width: 1rem; height: 1rem; }
.bi-dash-icon-button span { position: absolute; top: 0.45rem; right: 0.45rem; width: 0.38rem; height: 0.38rem; border: 2px solid var(--bi-card); border-radius: 999px; background: var(--bi-primary); }
.bi-dash-action { gap: 0.45rem; border: 1px solid var(--bi-primary); background: var(--bi-primary); color: var(--bi-primary-fg); padding: 0 0.75rem; font-size: 0.75rem; font-weight: 800; }
.bi-dash-action:hover { opacity: 0.88; }
.bi-dash-action:active { transform: translateY(1px); }
.bi-dash-action svg { width: 0.9rem; height: 0.9rem; }
.bi-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (max-width: 680px) { .bi-dash-header { align-items: flex-start; } .bi-dash-search { display: none; } .bi-dash-action span { display: none; } .bi-dash-action { width: 2.25rem; padding: 0; } }`;

  return { html, css };
}
