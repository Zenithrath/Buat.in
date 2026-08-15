"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";

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

interface CalendarCell {
  key: string;
  day: number | null;
  isEvent: boolean;
  isToday: boolean;
}

function cells(days: Set<number>, today: number): CalendarCell[] {
  const result: CalendarCell[] = [];
  for (let index = 0; index < TOTAL_CELLS; index++) {
    const day = index - START_INDEX + 1;
    if (day < 1 || day > 31) {
      result.push({ key: `empty-${index}`, day: null, isEvent: false, isToday: false });
    } else {
      result.push({
        key: `day-${day}`,
        day,
        isEvent: days.has(day),
        isToday: day === today,
      });
    }
  }
  return result;
}

export function CalendarWidgetPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const monthLabel = propString(node, "monthLabel").trim() || "Agustus 2026";
  const todayDay = Math.round(propNumber(node, "todayDay", 15));
  const hasToday = todayDay >= 1 && todayDay <= 31;
  const grid = cells(new Set(parseDays(node)), hasToday ? todayDay : -1);

  return (
    <article
      className="bi-calendar-widget min-w-0 rounded-xl border bg-card p-4"
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <header className="mb-3 flex min-w-0 items-center justify-between gap-2">
        <h3 className="truncate text-sm font-bold tracking-tight text-foreground">
          <InlineEditableText node={node} propKey="monthLabel" fallback="Agustus 2026" value={monthLabel} />
        </h3>
        {hasToday ? (
          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
            Hari ini: {todayDay}
          </span>
        ) : null}
      </header>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-muted-foreground">
        {WEEKDAYS.map((day) => <span key={day}>{day}</span>)}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {grid.map((cell) =>
          cell.day === null ? (
            <span key={cell.key} aria-hidden="true" />
          ) : (
            <button
              key={cell.key}
              type="button"
              tabIndex={-1}
              aria-label={`Tanggal ${cell.day}`}
              onClick={(event) => event.stopPropagation()}
              className={`grid aspect-square place-items-center rounded-full text-xs ${
                cell.isToday
                  ? "font-bold text-foreground ring-2 ring-primary"
                  : cell.isEvent
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground/60"
              }`}
            >
              {cell.day}
            </button>
          )
        )}
      </div>
    </article>
  );
}
