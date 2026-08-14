"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";

interface DataPoint {
  label: string;
  val1: number;
  val2?: number;
}

export function ChartCardPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const title = propString(node, "title") || "Pendapatan & Pengunjung";
  const subtitle = propString(node, "subtitle") || "Tren 6 bulan terakhir";
  const chartType = propString(node, "chartType") || "area";

  let data: DataPoint[] = [];
  try {
    data = JSON.parse(propString(node, "dataJson"));
  } catch {
    data = [
      { label: "Jan", val1: 40, val2: 24 },
      { label: "Feb", val1: 55, val2: 32 },
      { label: "Mar", val1: 75, val2: 45 },
      { label: "Apr", val1: 60, val2: 38 },
      { label: "Mei", val1: 90, val2: 60 },
      { label: "Jun", val1: 110, val2: 78 },
    ];
  }

  const maxVal = Math.max(...data.map((d) => Math.max(d.val1, d.val2 ?? 0)), 1);

  return (
    <div
      className="bi-chart-card flex flex-col justify-between rounded-xl border bg-card p-5 shadow-sm transition-all"
      style={themeTokenStyle(tokens)}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <p className="text-[11px] text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          {chartType === "donut" ? (
            data.slice(0, 4).map((item, idx) => (
              <span key={idx} className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: `var(--chart-${(idx % 5) + 1})` }}
                />
                {item.label}
              </span>
            ))
          ) : (
            <>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Penjualan
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-chart-2" /> Pengunjung
              </span>
            </>
          )}
        </div>
      </div>

      {chartType === "bar" ? (
        <div className="flex h-48 items-end gap-3 border-b pt-4 pb-1 px-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex flex-1 flex-col items-center gap-1.5 h-full justify-end">
              <div className="flex items-end gap-1 w-full justify-center h-full">
                <div
                  className="w-3.5 rounded-t bg-primary transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(item.val1 / maxVal) * 100}%` }}
                />
                {item.val2 !== undefined ? (
                  <div
                    className="w-3.5 rounded-t bg-chart-2 transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(item.val2 / maxVal) * 100}%` }}
                  />
                ) : null}
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      ) : chartType === "donut" ? (
        <div className="relative flex h-48 items-center justify-center">
          <svg viewBox="0 0 120 120" className="h-40 w-40">
            <circle cx="60" cy="60" r="40" fill="none" stroke="var(--muted)" strokeWidth="12" />
            {(() => {
              const total = data.reduce((s, d) => s + Math.max(d.val1, 0), 0) || 1;
              const c = 2 * Math.PI * 40;
              let offset = 0;
              return data.map((item, idx) => {
                const len = (Math.max(item.val1, 0) / total) * c;
                const seg = (
                  <circle
                    key={idx}
                    cx="60"
                    cy="60"
                    r="40"
                    fill="none"
                    stroke={`var(--chart-${(idx % 5) + 1})`}
                    strokeWidth="12"
                    strokeDasharray={`${len} ${c - len}`}
                    strokeDashoffset={-offset}
                  />
                );
                offset += len;
                return seg;
              });
            })()}
            <text x="60" y="65" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--foreground)">
              {data.length}K
            </text>
          </svg>
        </div>
      ) : (
        <div className="relative flex h-48 w-full flex-col justify-end border-b pt-4 pb-1">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
            {chartType === "area" ? (
              <polygon
                fill="currentColor"
                className="text-primary/15"
                points={`0,120 ${data
                  .map(
                    (d, i) =>
                      `${(i / (data.length - 1)) * 300},${120 - (d.val1 / maxVal) * 100}`
                  )
                  .join(" ")} 300,120`}
              />
            ) : null}

            <polyline
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={data
                .map(
                  (d, i) =>
                    `${(i / (data.length - 1)) * 300},${120 - (d.val1 / maxVal) * 100}`
                )
                .join(" ")}
            />

            {data.some((d) => d.val2 !== undefined) ? (
              <polyline
                fill="none"
                stroke="var(--chart-2)"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
                points={data
                  .map(
                    (d, i) =>
                      `${(i / (data.length - 1)) * 300},${
                        120 - ((d.val2 ?? 0) / maxVal) * 100
                      }`
                  )
                  .join(" ")}
              />
            ) : null}
          </svg>

          <div className="flex justify-between pt-2">
            {data.map((d, idx) => (
              <span key={idx} className="text-[10px] font-medium text-muted-foreground">
                {d.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
