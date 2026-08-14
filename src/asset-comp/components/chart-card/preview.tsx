"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { nodeList } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";

type ChartType = "area" | "line" | "bar" | "donut";

interface ChartPoint {
  label: string;
  primary: number;
  secondary?: number;
}

const DEFAULT_DATA: ChartPoint[] = [
  { label: "Jan", primary: 45, secondary: 28 },
  { label: "Feb", primary: 52, secondary: 31 },
  { label: "Mar", primary: 48, secondary: 35 },
  { label: "Apr", primary: 61, secondary: 42 },
  { label: "Mei", primary: 75, secondary: 53 },
  { label: "Jun", primary: 92, secondary: 68 },
  { label: "Jul", primary: 128, secondary: 84 },
];

function textOrFallback(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function numberValue(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value.replace(",", "."));
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function parseChartData(node: Node): ChartPoint[] {
  const points = nodeList(node, "dataJson")
      .map((item, index): ChartPoint | null => {
        const primary = numberValue(item.val1 ?? item.revenue ?? item.value ?? item.amount);
        const secondary = numberValue(item.val2 ?? item.users ?? item.secondary);
        const label = String(item.label ?? item.month ?? item.name ?? `Data ${index + 1}`).trim();
        if (!label || primary === undefined) return null;
        return secondary === undefined ? { label, primary } : { label, primary, secondary };
      })
      .filter((item): item is ChartPoint => item !== null)
      .slice(0, 12);

  return points.length ? points : DEFAULT_DATA;
}

function resolveChartType(node: Node): ChartType {
  const value = propString(node, "chartType").trim().toLowerCase();
  return value === "line" || value === "bar" || value === "donut" ? value : "area";
}

function pointsFor(data: ChartPoint[], maxValue: number, key: "primary" | "secondary"): string {
  return data
    .map((point, index) => {
      const value = key === "primary" ? point.primary : point.secondary ?? 0;
      const x = 16 + (index / Math.max(data.length - 1, 1)) * 368;
      const y = 156 - (Math.max(value, 0) / maxValue) * 128;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function ChartCardPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const { setValue } = useRepeaterEditor(node, "dataJson");
  const title = textOrFallback(node, "title", "Tren Pendapatan & Pengguna");
  const subtitle = textOrFallback(node, "subtitle", "Ringkasan 7 bulan terakhir");
  const chartType = resolveChartType(node);
  const data = parseChartData(node);
  const hasSecondary = data.some((point) => point.secondary !== undefined);
  const values = data.flatMap((point) => [point.primary, point.secondary ?? 0]);
  const maxValue = Math.max(...values, 1);
  const primaryPoints = pointsFor(data, maxValue, "primary");
  const secondaryPoints = pointsFor(data, maxValue, "secondary");
  const gradientId = `bi-chart-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "preview"}`;
  const total = Math.max(data.reduce((sum, point) => sum + Math.max(point.primary, 0), 0), 1);
  const donutSegments = data.map((point, index) => ({
    point,
    index,
    portion: Math.max(point.primary, 0) / total,
    offset:
      data
        .slice(0, index)
        .reduce((sum, previous) => sum + Math.max(previous.primary, 0), 0) / total,
  }));

  return (
    <article
      className="bi-chart-card flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card p-4 shadow-sm"
      style={themeTokenStyle(tokens)}
    >
      <header className="mb-4 flex min-w-0 items-start justify-between gap-3 border-b pb-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold tracking-tight text-foreground"><InlineEditableText node={node} propKey="title" fallback="Tren Pendapatan & Pengguna" value={title} /></h3>
          <p className="mt-0.5 truncate text-[11px] text-muted-foreground"><InlineEditableText node={node} propKey="subtitle" fallback="Ringkasan 7 bulan terakhir" value={subtitle} /></p>
        </div>
        {chartType !== "donut" ? (
          <div className="flex shrink-0 items-center gap-2 text-[10px] font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full" style={{ background: tokens.chart[0] }} />Pendapatan</span>
            {hasSecondary ? <span className="hidden items-center gap-1.5 sm:inline-flex"><i className="h-2 w-2 rounded-full" style={{ background: tokens.chart[1] }} />Pengunjung</span> : null}
          </div>
        ) : null}
      </header>

      {chartType === "donut" ? (
        <div className="flex min-h-52 flex-1 items-center justify-center gap-5 py-1">
          <svg viewBox="0 0 120 120" className="h-36 w-36 shrink-0 -rotate-90" role="img" aria-label={title}>
            <circle cx="60" cy="60" r="42" fill="none" stroke={tokens.muted} strokeWidth="13" />
            {donutSegments.map(({ point, index, portion, offset }) => {
              const circumference = 2 * Math.PI * 42;
              const dash = portion * circumference;
              const dashOffset = -offset * circumference;
              return <circle key={`${point.label}-${index}`} cx="60" cy="60" r="42" fill="none" stroke={tokens.chart[index % tokens.chart.length]} strokeWidth="13" strokeLinecap="butt" strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={dashOffset} />;
            })}
            <text x="60" y="56" textAnchor="middle" className="rotate-90 fill-foreground text-[18px] font-bold" transform="rotate(90 60 60)">{data.length}</text>
            <text x="60" y="70" textAnchor="middle" className="rotate-90 fill-muted-foreground text-[8px]" transform="rotate(90 60 60)">SUMBER</text>
          </svg>
          <div className="min-w-0 space-y-2">
            {data.slice(0, 5).map((point, index) => (
              <div key={`${point.label}-${index}`} className="flex max-w-36 items-center gap-2 text-[11px]">
                <i className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: tokens.chart[index % tokens.chart.length] }} />
                <span className="min-w-0 flex-1 truncate text-muted-foreground"><InlineEditableText node={node} propKey="dataJson" value={point.label} onCommit={(next) => setValue(index, "label", next)} /></span>
                <span className="font-bold text-foreground"><InlineEditableText node={node} propKey="dataJson" value={String(point.primary)} onCommit={(next) => setValue(index, "val1", next)} /></span>
                <span className="text-[10px] font-semibold text-muted-foreground">{Math.round((Math.max(point.primary, 0) / total) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      ) : chartType === "bar" ? (
        <div className="flex min-h-52 flex-1 items-end gap-2 px-1 pt-2">
          {data.map((point, index) => {
            const primaryHeight = Math.max((Math.max(point.primary, 0) / maxValue) * 100, 2);
            const secondaryHeight = Math.max(((point.secondary ?? 0) / maxValue) * 100, 0);
            return (
              <div key={`${point.label}-${index}`} className="flex h-48 min-w-0 flex-1 flex-col justify-end gap-2">
                <div className="flex min-h-0 flex-1 items-end justify-center gap-1">
                  <i className="w-full max-w-6 rounded-t-sm transition-opacity hover:opacity-80" style={{ height: `${primaryHeight}%`, background: tokens.chart[0] }} />
                  {hasSecondary ? <i className="w-full max-w-6 rounded-t-sm opacity-70 transition-opacity hover:opacity-100" style={{ height: `${secondaryHeight}%`, background: tokens.chart[1] }} /> : null}
                </div>
                <span className="truncate text-center text-[10px] font-medium text-muted-foreground"><InlineEditableText node={node} propKey="dataJson" value={point.label} onCommit={(next) => setValue(index, "label", next)} /><small className="mt-0.5 block text-[9px] text-foreground"><InlineEditableText node={node} propKey="dataJson" value={String(point.primary)} onCommit={(next) => setValue(index, "val1", next)} /></small></span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="min-h-52 flex-1">
          <svg className="h-48 w-full overflow-visible" viewBox="0 0 400 176" preserveAspectRatio="none" role="img" aria-label={title}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={tokens.chart[0]} stopOpacity="0.32" />
                <stop offset="100%" stopColor={tokens.chart[0]} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[28, 70, 112, 156].map((y) => <line key={y} x1="16" x2="384" y1={y} y2={y} stroke={tokens.border} strokeDasharray="3 5" strokeWidth="1" />)}
            {chartType === "area" ? <polygon fill={`url(#${gradientId})`} points={`16,156 ${primaryPoints} 384,156`} /> : null}
            <polyline fill="none" stroke={tokens.chart[0]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={primaryPoints} />
            {hasSecondary ? <polyline fill="none" stroke={tokens.chart[1]} strokeWidth="2.25" strokeDasharray="5 5" strokeLinecap="round" strokeLinejoin="round" points={secondaryPoints} /> : null}
            {data.map((point, index) => {
              const [x, y] = primaryPoints.split(" ")[index].split(",");
              return <circle key={`${point.label}-${index}`} cx={x} cy={y} r="3" fill={tokens.card} stroke={tokens.chart[0]} strokeWidth="2" />;
            })}
          </svg>
          <div className="mt-1 flex justify-between gap-1 px-1 text-[10px] font-medium text-muted-foreground">
            {data.map((point, index) => <span key={`${point.label}-${index}`} className="min-w-0 truncate text-center"><InlineEditableText node={node} propKey="dataJson" value={point.label} onCommit={(next) => setValue(index, "label", next)} /><small className="mt-0.5 block truncate text-[9px] text-foreground"><InlineEditableText node={node} propKey="dataJson" value={String(point.primary)} onCommit={(next) => setValue(index, "val1", next)} />{point.secondary !== undefined ? <><span className="px-0.5 text-muted-foreground">/</span><InlineEditableText node={node} propKey="dataJson" value={String(point.secondary)} onCommit={(next) => setValue(index, "val2", next)} /></> : null}</small></span>)}
          </div>
        </div>
      )}
    </article>
  );
}
