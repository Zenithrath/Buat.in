import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

function booleanProp(node: Node, key: string, fallback: boolean): boolean {
  const value = node.props[key];
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return !["false", "0", "off", "no"].includes(value.trim().toLowerCase());
  return fallback;
}

function parseItems(node: Node): { id: string; label: string; url: string }[] {
  try {
    const parsed: unknown = JSON.parse(propString(node, "itemsJson"));
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
      .map((item, index) => ({
        id: String(item.id ?? `crumb-${index + 1}`),
        label: String(item.label ?? "").trim(),
        url: String(item.url ?? "").trim(),
      }))
      .filter((item) => item.label.length > 0);
  } catch {
    return [];
  }
}

const HOME_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>`;

export function breadcrumbExport(node: Node): ExportResult {
  const separator = propString(node, "separator").trim() || "/";
  const showHome = booleanProp(node, "showHome", true);
  const homeUrl = propString(node, "homeUrl").trim() || "/";
  const items = parseItems(node);
  const safeSeparator = escapeHtml(separator);

  const crumbs = items.map((item, index) => {
    const isLast = index === items.length - 1;
    const label = escapeHtml(item.label);
    if (isLast) return `<li class="bi-breadcrumb-current" aria-current="page"><span>${label}</span></li>`;
    if (item.url && item.url !== "#") {
      return `<li><a href="${escapeHtml(item.url)}">${label}</a></li>`;
    }
    return `<li><span>${label}</span></li>`;
  });

  const homeHtml = showHome
    ? `<li class="bi-breadcrumb-home"><a href="${escapeHtml(homeUrl)}" aria-label="Beranda">${HOME_ICON}</a></li><li class="bi-breadcrumb-sep" aria-hidden="true">${safeSeparator}</li>`
    : "";

  const crumbsHtml = crumbs
    .map((crumb, index) => `${crumb}${index < items.length - 1 ? `<li class="bi-breadcrumb-sep" aria-hidden="true">${safeSeparator}</li>` : ""}`)
    .join("\n    ");

  return {
    html: `<nav class="bi-breadcrumb" aria-label="Breadcrumb">
  <ol>
    ${homeHtml}
    ${crumbsHtml}
  </ol>
</nav>`,
    css: `.bi-breadcrumb{overflow-x:auto;padding:0.625rem max(1.25rem,calc((100% - 72rem)/2));border-bottom:1px solid var(--bi-border);background:var(--bi-bg);color:var(--bi-muted-fg);font-family:var(--bi-font-body)}.bi-breadcrumb ol{display:flex;align-items:center;gap:0.375rem;min-width:max-content;margin:0;padding:0;list-style:none;font-size:.75rem;font-weight:600}.bi-breadcrumb a{display:inline-flex;align-items:center;padding:0.125rem 0.375rem;border-radius:0.375rem;color:var(--bi-muted-fg);text-decoration:none;transition:background .15s ease,color .15s ease}.bi-breadcrumb a:hover{background:var(--bi-muted);color:var(--bi-fg)}.bi-breadcrumb-home a{color:var(--bi-primary)}.bi-breadcrumb-home svg{width:0.85rem;height:0.85rem}.bi-breadcrumb-current span{max-width:10rem;overflow:hidden;padding:0.125rem 0.375rem;color:var(--bi-fg);font-weight:800;text-overflow:ellipsis;white-space:nowrap}.bi-breadcrumb-sep{color:color-mix(in srgb,var(--bi-muted-fg) 72%,transparent)}`,
  };
}
