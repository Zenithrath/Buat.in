"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { themeTokenStyle } from "@/lib/registry/shared";

function numberProp(node: Node, key: string, fallback: number): number {
  const raw = node.props[key];
  const parsed = typeof raw === "number" ? raw : Number(String(raw ?? "").replace(",", "."));
  return Number.isFinite(parsed) ? Math.max(1, Math.floor(parsed)) : fallback;
}

function booleanProp(node: Node, key: string, fallback = false): boolean {
  const raw = node.props[key];
  if (typeof raw === "boolean") return raw;
  return raw === "true" ? true : raw === "false" ? false : fallback;
}

function pageWindow(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 2);
  const end = Math.min(total - 1, current + 2);
  if (start > 2) items.push("ellipsis");
  for (let i = start; i <= end; i += 1) items.push(i);
  if (end < total - 1) items.push("ellipsis");
  items.push(total);
  return items;
}

export function PaginationPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const total = numberProp(node, "totalPages", 5);
  const initial = Math.min(numberProp(node, "currentPage", 1), Math.max(total, 1));
  const showPrevNext = booleanProp(node, "showPrevNext", true);
  const [current, setCurrent] = useState(initial);

  if (total <= 0) return null;

  const safeCurrent = Math.min(current, total);
  const pages = pageWindow(safeCurrent, total);
  const goto = (page: number) => setCurrent(Math.max(1, Math.min(total, page)));

  const pageBase = "grid size-8 place-items-center rounded-md text-xs font-bold transition-colors";
  const idle = "text-muted-foreground hover:bg-muted hover:text-foreground";
  const active = "bg-primary text-primary-foreground shadow-sm";

  return (
    <nav aria-label="Navigasi halaman" className="flex w-full items-center justify-center gap-1.5" style={themeTokenStyle(tokens)}>
      {showPrevNext ? (
        <button
          type="button"
          data-canvas-interactive
          aria-label="Halaman sebelumnya"
          title="Halaman sebelumnya"
          disabled={safeCurrent <= 1}
          onClick={(event) => {
            event.stopPropagation();
            goto(safeCurrent - 1);
          }}
          className={`${pageBase} ${safeCurrent <= 1 ? "cursor-not-allowed opacity-40" : idle}`}
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>
      ) : null}

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${index}`} aria-hidden="true" className="grid size-8 place-items-center text-xs font-bold text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            data-canvas-interactive
            aria-current={page === safeCurrent ? "page" : undefined}
            aria-label={`Halaman ${page}`}
            onClick={(event) => {
              event.stopPropagation();
              goto(page);
            }}
            className={`${pageBase} ${page === safeCurrent ? active : idle}`}
          >
            {page}
          </button>
        )
      )}

      {showPrevNext ? (
        <button
          type="button"
          data-canvas-interactive
          aria-label="Halaman berikutnya"
          title="Halaman berikutnya"
          disabled={safeCurrent >= total}
          onClick={(event) => {
            event.stopPropagation();
            goto(safeCurrent + 1);
          }}
          className={`${pageBase} ${safeCurrent >= total ? "cursor-not-allowed opacity-40" : idle}`}
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      ) : null}
    </nav>
  );
}
