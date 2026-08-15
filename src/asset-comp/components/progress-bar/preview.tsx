"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { useBuilderStore } from "@/lib/store/project-store";

type Variant = "primary" | "success" | "warning" | "danger";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500",
};

function copy(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function numberProp(node: Node, key: string, fallback: number): number {
  const raw = node.props[key];
  const parsed = typeof raw === "number" ? raw : Number(String(raw ?? "").replace(",", "."));
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.min(100, parsed));
}

function booleanProp(node: Node, key: string, fallback = false): boolean {
  const raw = node.props[key];
  if (typeof raw === "boolean") return raw;
  return raw === "true" ? true : raw === "false" ? false : fallback;
}

function resolveVariant(node: Node): Variant {
  const value = propString(node, "variant").trim().toLowerCase();
  return value === "success" || value === "warning" || value === "danger" ? value : "primary";
}

export function ProgressBarPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const updateNode = useBuilderStore((state) => state.updateNode);
  const label = copy(node, "label", "Target penjualan");
  const value = numberProp(node, "value", 68);
  const showValue = booleanProp(node, "showValue", true);
  const variant = resolveVariant(node);
  const hint = copy(node, "hint", "Tersisa 32% menuju target bulan ini");

  const commitValue = (next: string) => {
    const parsed = Number(next.replace(/[^\d.,-]/g, "").replace(",", "."));
    if (!Number.isFinite(parsed)) return;
    const clamped = Math.max(0, Math.min(100, parsed));
    updateNode(node.id, (current) => ({
      ...current,
      props: { ...current.props, value: clamped },
    }));
  };

  return (
    <div className="w-full min-w-0 rounded-xl border border-border bg-card p-4" style={themeTokenStyle(tokens)}>
      <div className="flex min-w-0 items-center justify-between gap-3">
        <p className="min-w-0 truncate text-xs font-bold text-foreground">
          <InlineEditableText node={node} propKey="label" fallback="Target penjualan" value={label} />
        </p>
        {showValue ? (
          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-extrabold tabular-nums text-muted-foreground">
            <InlineEditableText node={node} propKey="value" value={`${Math.round(value)}%`} onCommit={commitValue} />
          </span>
        ) : null}
      </div>

      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-[width] ${VARIANT_CLASS[variant]}`}
          style={{ width: `${value}%` }}
        />
      </div>

      {hint ? (
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          <InlineEditableText node={node} propKey="hint" fallback="Tersisa 32% menuju target bulan ini" value={hint} />
        </p>
      ) : null}
    </div>
  );
}
