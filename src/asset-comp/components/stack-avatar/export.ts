import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

function copy(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function showExtra(node: Node): boolean {
  return node.props.showExtra === true || propString(node, "showExtra") === "true";
}

function parseNames(node: Node): string[] {
  const fallback = ["Ayu Lestari", "Bayu Pratama", "Citra Dewi", "Dimas Arya", "Elsa Putri"];
  try {
    const parsed: unknown = JSON.parse(propString(node, "avatarsJson"));
    if (!Array.isArray(parsed)) return fallback;
    const names = parsed
      .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
      .map((item) => String(item.name ?? "").trim())
      .filter(Boolean);
    return names.length ? names : fallback;
  } catch {
    return fallback;
  }
}

function initial(name: string): string {
  return name.trim().slice(0, 2).toUpperCase();
}

export function stackAvatarExport(node: Node): ExportResult {
  const names = parseNames(node);
  const extra = copy(node, "extraCount", "+12");
  const show = showExtra(node);

  const avatars = names
    .map(
      (name, index) =>
        `<span class="bi-stack-avatar bi-stack-avatar--${index % 5}" title="${escapeHtml(name)}">${escapeHtml(initial(name))}</span>`
    )
    .join("\n");
  const extraMarkup = show ? `<span class="bi-stack-avatar bi-stack-avatar--extra">${escapeHtml(extra)}</span>` : "";

  const html = `<div class="bi-stack-avatar-group">${avatars}${extraMarkup}</div>`;

  const css = `.bi-stack-avatar-group { display: inline-flex; align-items: center; color: var(--bi-fg); font-family: var(--bi-font-body); }
.bi-stack-avatar { display: grid; width: 2.25rem; height: 2.25rem; flex: 0 0 auto; place-items: center; box-sizing: border-box; margin-left: -0.5rem; border: 2px solid var(--bi-card); border-radius: 50%; font-size: 0.6875rem; font-weight: 850; }
.bi-stack-avatar:first-child { margin-left: 0; }
.bi-stack-avatar--0 { background: color-mix(in srgb, var(--bi-primary) 15%, transparent); color: var(--bi-primary); }
.bi-stack-avatar--1 { background: rgba(16, 185, 129, 0.15); color: #047857; }
.bi-stack-avatar--2 { background: rgba(245, 158, 11, 0.15); color: #b45309; }
.bi-stack-avatar--3 { background: rgba(14, 165, 233, 0.15); color: #0369a1; }
.bi-stack-avatar--4 { background: rgba(244, 63, 94, 0.15); color: #be123c; }
.bi-stack-avatar--extra { background: var(--bi-muted); color: var(--bi-muted-fg); }
@media (max-width: 640px) { .bi-stack-avatar { width: 2rem; height: 2rem; margin-left: -0.45rem; } }`;

  return { html, css };
}
