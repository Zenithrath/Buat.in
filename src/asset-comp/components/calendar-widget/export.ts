import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
/** Agustus 2026 dimulai hari Sabtu; indeks 0 = Senin, jadi tanggal 1 di indeks 5. */
const START_INDEX = 5;
const TOTAL_CELLS = 42;

function propNumber(node: Node, key: string, fallback: number): number {
  const value = node.props[key];
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function parseDays(node: Node): number[] {
  let parsed: unknown = node.props.daysJson;
  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(parsed)) return [];
  return parsed
    .map((item): number | null => {
      const candidate =
        typeof item === "object" && item !== null && !Array.isArray(item)
          ? (item as Record<string, unknown>).day ?? (item as Record<string, unknown>).date
          : item;
      const value = Number(candidate);
      return Number.isFinite(value) ? Math.round(value) : null;
    })
    .filter((value): value is number => value !== null)
    .filter((value) => value >= 1 && value <= 31);
}

export function calendarWidgetExport(node: Node): ExportResult {
  const monthLabel = propString(node, "monthLabel").trim() || "Agustus 2026";
  const todayDay = Math.round(propNumber(node, "todayDay", 15));
  const hasToday = todayDay >= 1 && todayDay <= 31;
  const days = new Set(parseDays(node));

  const weekdays = WEEKDAYS.map((day) => `<span>${day}</span>`).join("");

  const grid: string[] = [];
  for (let index = 0; index < TOTAL_CELLS; index++) {
    const day = index - START_INDEX + 1;
    if (day < 1 || day > 31) {
      grid.push(`<span class="bi-calendar-cell is-empty" aria-hidden="true"></span>`);
    } else {
      const isEvent = days.has(day);
      const isToday = hasToday && day === todayDay;
      const classes = ["bi-calendar-cell", isEvent ? "is-event" : "", isToday ? "is-today" : ""]
        .filter(Boolean)
        .join(" ");
      grid.push(`<span class="${classes}">${day}</span>`);
    }
  }

  const html = `<article class="bi-calendar-widget">
  <header class="bi-calendar-header">
    <h3 class="bi-calendar-month">${escapeHtml(monthLabel)}</h3>
    ${hasToday ? `<span class="bi-calendar-today">Hari ini: ${todayDay}</span>` : ""}
  </header>
  <div class="bi-calendar-weekdays">${weekdays}</div>
  <div class="bi-calendar-grid">${grid.join("")}</div>
</article>`;

  const css = `.bi-calendar-widget { box-sizing: border-box; min-width: 0; padding: 1rem; border: 1px solid var(--bi-border); border-radius: calc(var(--bi-radius) + 2px); background: var(--bi-card); color: var(--bi-fg); font-family: var(--bi-font-body); }
.bi-calendar-header { display: flex; min-width: 0; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.75rem; }
.bi-calendar-month { overflow: hidden; margin: 0; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 0.875rem; font-weight: 800; letter-spacing: -0.02em; text-overflow: ellipsis; white-space: nowrap; }
.bi-calendar-today { flex: 0 0 auto; border-radius: 999px; padding: 0.25rem 0.6rem; background: var(--bi-muted); color: var(--bi-muted-fg); font-size: 0.625rem; font-weight: 700; }
.bi-calendar-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; margin-bottom: 0.25rem; color: var(--bi-muted-fg); font-size: 0.625rem; font-weight: 700; text-align: center; }
.bi-calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; }
.bi-calendar-cell { display: grid; aspect-ratio: 1 / 1; place-items: center; border-radius: 999px; color: var(--bi-muted-fg); font-size: 0.75rem; opacity: 0.6; }
.bi-calendar-cell.is-event { background: color-mix(in srgb, var(--bi-primary) 12%, transparent); color: var(--bi-primary); font-weight: 600; opacity: 1; }
.bi-calendar-cell.is-today { box-shadow: 0 0 0 2px var(--bi-primary); color: var(--bi-fg); font-weight: 700; opacity: 1; }
.bi-calendar-cell.is-empty { opacity: 0; }`;

  return { html, css };
}
