import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
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

function parseNotifications(node: Node): { id: string; title: string; time: string }[] {
  try {
    const parsed: unknown = JSON.parse(propString(node, "notificationsJson"));
    if (!Array.isArray(parsed)) return [];
    const items = parsed
      .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
      .map((item, index) => ({
        id: String(item.id ?? `notif-${index + 1}`),
        title: String(item.title ?? "").trim(),
        time: String(item.time ?? "Baru saja").trim(),
      }))
      .filter((item) => item.title.length > 0);
    return items;
  } catch {
    return [];
  }
}

const SEARCH_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>`;
const BELL_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;
const EXPORT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3v12"/><path d="m8 11 4 4 4-4"/><path d="M5 21h14"/></svg>`;

export function dashboardHeaderExport(node: Node): ExportResult {
  const title = textOrFallback(node, "title", "Overview Dashboard");
  const breadcrumb = textOrFallback(node, "breadcrumb", "Dashboard / Analytics");
  const searchPlaceholder = textOrFallback(node, "searchPlaceholder", "Cari data, laporan, atau transaksi...");
  const actionText = optionalText(node, "actionText", "Export Laporan");
  const showSearch = booleanProp(node, "showSearch", true);
  const showNotifications = booleanProp(node, "showNotifications", true);
  const notificationsMode = propString(node, "notificationsMode").trim() || "panel";
  const notifications = parseNotifications(node);
  const instance = `dash-notif-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "export"}`;

  const notificationsHtml = notifications.length
    ? notifications
        .map(
          (item) => `<li class="bi-notif-item">
      <span class="bi-notif-dot" aria-hidden="true"></span>
      <div><p class="bi-notif-title">${escapeHtml(item.title)}</p><p class="bi-notif-time">${escapeHtml(item.time)}</p></div>
    </li>`
        )
        .join("\n      ")
    : `<p class="bi-notif-empty">Belum ada notifikasi</p>`;

  const bellHtml = showNotifications
    ? `<span class="bi-dash-notif" data-bi-notif-host>
    <button class="bi-dash-icon-button" type="button" data-bi-notif-toggle aria-label="Notifikasi" aria-expanded="false" aria-controls="${instance}">
      ${BELL_ICON}<span aria-hidden="true"></span>
    </button>
    ${
      notificationsMode === "modal"
        ? `<div class="bi-notif-modal" id="${instance}" data-bi-notif-panel="modal" aria-hidden="true">
      <div class="bi-notif-dialog" role="dialog" aria-modal="true" aria-label="Daftar notifikasi">
        <div class="bi-notif-head"><p>Notifikasi</p><button type="button" data-bi-notif-close aria-label="Tutup notifikasi">×</button></div>
        <ul class="bi-notif-list">${notificationsHtml}</ul>
      </div>
    </div>`
        : `<div class="bi-notif-panel" id="${instance}" data-bi-notif-panel="panel" role="dialog" aria-label="Daftar notifikasi" aria-hidden="true">
      <div class="bi-notif-head"><p>Notifikasi</p><button type="button" data-bi-notif-close aria-label="Tutup notifikasi">×</button></div>
      <ul class="bi-notif-list">${notificationsHtml}</ul>
    </div>`
    }
  </span>`
    : "";

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
    ${bellHtml}
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
.bi-dash-icon-button > span { position: absolute; top: 0.45rem; right: 0.45rem; width: 0.38rem; height: 0.38rem; border: 2px solid var(--bi-card); border-radius: 999px; background: var(--bi-primary); }
.bi-dash-notif { position: relative; }
.bi-notif-panel { position: absolute; z-index: 60; top: calc(100% + 0.5rem); right: 0; width: 17rem; overflow: hidden; box-sizing: border-box; border: 1px solid var(--bi-border); border-radius: calc(var(--bi-radius) + 2px); background: var(--bi-card); color: var(--bi-fg); box-shadow: 0 16px 40px color-mix(in srgb, var(--bi-fg) 18%, transparent); opacity: 0; pointer-events: none; transform: translateY(-0.25rem); transition: opacity 150ms ease, transform 150ms ease; }
.bi-notif-panel[aria-hidden="false"] { opacity: 1; pointer-events: auto; transform: translateY(0); }
.bi-notif-modal { position: fixed; z-index: 90; inset: 0; display: flex; align-items: center; justify-content: center; padding: 0.75rem; box-sizing: border-box; background: color-mix(in srgb, var(--bi-fg) 45%, transparent); backdrop-filter: blur(2px); opacity: 0; pointer-events: none; transition: opacity 150ms ease; }
.bi-notif-modal[aria-hidden="false"] { opacity: 1; pointer-events: auto; }
.bi-notif-dialog { width: min(26rem, 100%); overflow: hidden; border: 1px solid var(--bi-border); border-radius: calc(var(--bi-radius) + 4px); background: var(--bi-card); color: var(--bi-fg); box-shadow: 0 24px 60px color-mix(in srgb, var(--bi-fg) 30%, transparent); }
.bi-notif-head { display: flex; align-items: center; justify-content: space-between; padding: 0.7rem 0.9rem; border-bottom: 1px solid var(--bi-border); }
.bi-notif-head p { margin: 0; font-size: 0.75rem; font-weight: 800; }
.bi-notif-head button { display: grid; width: 1.5rem; height: 1.5rem; place-items: center; border: 0; border-radius: 0.35rem; background: transparent; color: var(--bi-muted-fg); cursor: pointer; font-size: 1rem; line-height: 1; }
.bi-notif-head button:hover { background: var(--bi-muted); color: var(--bi-fg); }
.bi-notif-list { margin: 0; padding: 0; list-style: none; }
.bi-notif-item { display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.6rem 0.9rem; border-bottom: 1px solid var(--bi-border); }
.bi-notif-item:last-child { border-bottom: 0; }
.bi-notif-dot { width: 0.35rem; height: 0.35rem; flex: 0 0 auto; margin-top: 0.35rem; border-radius: 999px; background: var(--bi-primary); }
.bi-notif-title { margin: 0; font-size: 0.6875rem; font-weight: 700; line-height: 1.4; }
.bi-notif-time { margin: 0.15rem 0 0; color: var(--bi-muted-fg); font-size: 0.625rem; }
.bi-notif-empty { margin: 0; padding: 1rem; text-align: center; color: var(--bi-muted-fg); font-size: 0.6875rem; }
.bi-dash-action { gap: 0.45rem; border: 1px solid var(--bi-primary); background: var(--bi-primary); color: var(--bi-primary-fg); padding: 0 0.75rem; font-size: 0.75rem; font-weight: 800; }
.bi-dash-action:hover { opacity: 0.88; }
.bi-dash-action:active { transform: translateY(1px); }
.bi-dash-action svg { width: 0.9rem; height: 0.9rem; }
.bi-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (max-width: 680px) { .bi-dash-header { align-items: flex-start; } .bi-dash-search { display: none; } .bi-dash-action span { display: none; } .bi-dash-action { width: 2.25rem; padding: 0; } .bi-notif-panel { position: fixed; top: 4.25rem; right: 0.75rem; left: 0.75rem; width: auto; } .bi-notif-modal { align-items: flex-end; } }`;

  const js = `(function(){
  var host=document.querySelector('[data-bi-notif-host]');
  if(!host)return;
  var toggle=host.querySelector('[data-bi-notif-toggle]');
  var panel=host.querySelector('[data-bi-notif-panel]');
  if(!toggle||!panel)return;
  function setOpen(open){panel.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));}
  toggle.addEventListener('click',function(event){event.stopPropagation();setOpen(panel.getAttribute('aria-hidden')==='true');});
  host.querySelectorAll('[data-bi-notif-close]').forEach(function(button){button.addEventListener('click',function(){setOpen(false);});});
  if(panel.dataset.biNotifPanel==='modal'){
    panel.addEventListener('click',function(event){if(event.target===panel)setOpen(false);});
  } else {
    document.addEventListener('pointerdown',function(event){if(!host.contains(event.target))setOpen(false);});
  }
  document.addEventListener('keydown',function(event){if(event.key==='Escape')setOpen(false);});
}());`;

  return { html, css, js };
}
