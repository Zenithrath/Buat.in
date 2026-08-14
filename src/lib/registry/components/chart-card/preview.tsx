"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";

interface ChartRow {
  month?: string;
  label?: string;
  revenue?: number;
  users?: number;
  value?: number;
}

export function ChartCardPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const title = propString(node, "title") || "Analytics Overview";
  const chartType = propString(node, "chartType") || "area";

  let data: ChartRow[] = [];
  try {
    const raw = propString(node, "dataJson");
    data = raw ? JSON.parse(raw) : [];
  } catch {
    data = [
      { month: "Jan", revenue: 45 },
      { month: "Feb", revenue: 60 },
      { month: "Mar", revenue: 55 },
      { month: "Apr", revenue: 80 },
      { month: "Mei", revenue: 95 },
    ];
  }

  const chartColors = tokens.chart;
  const values = data.map((d) => d.revenue ?? d.value ?? 10);
  const maxValue = Math.max(...values, 1);

  return (
    <div
      className="bi-chart-card flex flex-col rounded-xl border bg-card p-5 shadow-sm"
      style={themeTokenStyle(tokens)}
    >
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <div>
          <h3 className="text-sm font-bold tracking-tight text-foreground">{title}</h3>
          <p className="text-[11px] text-muted-foreground capitalize">
            Visualisasi data {chartType}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: chartColors[0] }}
            />
            Metrik Utama
          </span>
        </div>
      </div>

      <div className="relative h-48 w-full pt-2">
        {chartType === "bar" ? (
          <div className="flex h-full items-end gap-3 pt-6 px-2">
            {data.map((d, idx) => {
              const val = d.revenue ?? d.value ?? 10;
              const pct = (val / maxValue) * 100;
              return (
                <div key={idx} className="flex flex-1 flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    className="w-full rounded-t transition-all hover:opacity-80"
                    style={{
                      height: `${pct}%`,
                      backgroundColor: chartColors[idx % chartColors.length],
                    }}
                  />
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {d.month ?? d.label ?? idx + 1}
                  </span>
                </div>
              );
            })}
          </div>
        ) : chartType === "donut" ? (
          <div className="flex h-full items-center justify-center gap-6">
            <svg viewBox="0 0 100 100" className="h-36 w-36 -rotate-90">
              {data.map((d, idx) => {
                const total = values.reduce((a, b) => a + b, 0);
                const val = d.revenue ?? d.value ?? 10;
                const pct = val / total;
                const strokeDasharray = `${pct * 283} 283`;
                const offset =
                  data.slice(0, idx).reduce((acc, curr) => acc + (curr.revenue ?? curr.value ?? 10), 0) / total;
                return (
                  <circle
                    key={idx}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={chartColors[idx % chartColors.length]}
                    strokeWidth="16"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={-offset * 283}
                  />
                );
              })}
            </svg>
            <div className="space-y-1.5">
              {data.slice(0, 4).map((d, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: chartColors[idx % chartColors.length] }}
                  />
                  <span className="text-muted-foreground">{d.month ?? d.label}:</span>
                  <span className="font-semibold text-foreground">{d.revenue ?? d.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Area / Line SVG */
          <div className="relative h-full w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 400 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColors[0]} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={chartColors[0]} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Path Area */}
              {chartType === "area" ? (
                <polygon
                  fill="url(#chartGrad)"
                  points={`0,160 ${data
                    .map((d, idx) => {
                      const val = d.revenue ?? d.value ?? 10;
                      const x = (idx / (data.length - 1 || 1)) * 400;
                      const y = 150 - (val / maxValue) * 130;
                      return `${x},${y}`;
                    })
                    .join(" ")} 400,160`}
                />
              ) : null}
              {/* Line */}
              <polyline
                fill="none"
                stroke={chartColors[0]}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={data
                  .map((d, idx) => {
                    const val = d.revenue ?? d.value ?? 10;
                    const x = (idx / (data.length - 1 || 1)) * 400;
                    const y = 150 - (val / maxValue) * 130;
                    return `${x},${y}`;
                  })
                  .join(" ")}
              />
            </svg>
            <div className="mt-2 flex justify-between text-[10px] font-medium text-muted-foreground">
              {data.map((d, idx) => (
                <span key={idx}>{d.month ?? d.label}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
