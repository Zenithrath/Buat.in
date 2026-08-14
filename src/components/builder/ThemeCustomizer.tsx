"use client";

import { useMemo } from "react";
import { RotateCcw, Shuffle, Sparkles } from "lucide-react";
import { useBuilderStore } from "@/lib/store/project-store";
import {
  BASE_COLORS,
  CHART_PALETTES,
  DEFAULT_THEME_PRESETS,
  FONT_PRESETS,
  RADIUS_PRESETS,
  STYLE_PRESETS,
  THEME_COLORS,
  normalizePresets,
  resolveTheme,
  type BaseColorId,
  type ChartPaletteId,
  type FontId,
  type NormalizedPresets,
  type RadiusId,
  type StyleId,
  type ThemeColorId,
} from "@/lib/theme/presets";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemePreview } from "./ThemePreview";

const STYLE_ORDER: StyleId[] = ["vega", "nova", "maia", "lyra", "mira"];
const BASE_ORDER: BaseColorId[] = [
  "neutral",
  "stone",
  "zinc",
  "mauve",
  "olive",
  "mist",
  "taupe",
];
const THEME_ORDER: ThemeColorId[] = [
  "neutral",
  "red",
  "orange",
  "amber",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "rose",
];
const RADIUS_ORDER: RadiusId[] = ["none", "small", "medium", "large", "xlarge"];
const FONT_ORDER: FontId[] = [
  "geist",
  "inter",
  "figtree",
  "manrope",
  "dmsans",
  "ibmplex",
  "jetbrains",
];
const CHART_ORDER: ChartPaletteId[] = ["neutral", "theme", "categorical"];

function SectionLabel({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
      {icon}
      {children}
    </p>
  );
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function ThemeCustomizer() {
  const theme = useBuilderStore((s) => s.document.theme);
  const updateTheme = useBuilderStore((s) => s.updateTheme);

  const presets = useMemo(() => normalizePresets(theme.presets), [theme.presets]);
  const tokens = useMemo(() => resolveTheme(theme), [theme]);

  const set = <K extends keyof NormalizedPresets>(
    key: K,
    value: NormalizedPresets[K]
  ) =>
    updateTheme((t) => ({ ...t, presets: { ...t.presets, [key]: value } }));

  const reset = () =>
    updateTheme((t) => ({
      ...t,
      presets: { ...t.presets, ...DEFAULT_THEME_PRESETS },
    }));

  const shuffle = () =>
    updateTheme((t) => ({
      ...t,
      presets: {
        ...t.presets,
        style: pick(STYLE_ORDER),
        baseColor: pick(BASE_ORDER),
        theme: pick(THEME_ORDER),
        radius: pick(RADIUS_ORDER),
        font: pick(FONT_ORDER),
        chart: pick(CHART_ORDER),
      },
    }));

  return (
    <div className="space-y-4">
      <ThemePreview tokens={tokens} />

      <div className="space-y-2">
        <SectionLabel icon={<Sparkles size={11} />}>Gaya</SectionLabel>
        <div className="grid grid-cols-5 gap-1.5">
          {STYLE_ORDER.map((id) => {
            const style = STYLE_PRESETS[id];
            const active = presets.style === id;
            return (
              <button
                key={id}
                type="button"
                title={style.description}
                onClick={() => set("style", id)}
                className={cn(
                  "rounded-md border px-1 py-1.5 transition-colors",
                  active
                    ? "border-brand bg-brand/10 text-brand-foreground"
                    : "border-border text-muted-foreground hover:border-muted"
                )}
              >
                <span className="block text-[10px] font-medium">{style.name}</span>
                <span className="mt-1 flex items-end justify-center gap-0.5">
                  {[0.6, 1, 0.8].map((w, i) => (
                    <span
                      key={i}
                      className="rounded-[1px] bg-current opacity-70"
                      style={{
                        width: `${Math.round(w * 8)}px`,
                        height: `${Math.round(4 * style.density)}px`,
                      }}
                    />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground">
          Mengubah kepadatan, tinggi kontrol, padding kartu, jarak section, dan
          bayangan.
        </p>
      </div>

      <div className="space-y-2">
        <SectionLabel icon={<span className="inline-block size-2 rounded-full bg-current" />}>
          Warna Dasar
        </SectionLabel>
        <div className="grid grid-cols-7 gap-1.5">
          {BASE_ORDER.map((id) => {
            const preset = BASE_COLORS[id];
            const active = presets.baseColor === id;
            return (
              <button
                key={id}
                type="button"
                title={preset.name}
                onClick={() => set("baseColor", id)}
                className={cn(
                  "flex h-9 items-center justify-center rounded-md border transition-colors",
                  active
                    ? "border-brand ring-1 ring-brand"
                    : "border-border hover:border-muted"
                )}
              >
                <span
                  className="size-4 rounded-full border border-black/10"
                  style={{
                    background: BASE_COLORS[id][presets.appearance].background,
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <SectionLabel icon={<span className="inline-block size-2 rounded-full bg-current" />}>
          Warna Utama
        </SectionLabel>
        <div className="grid grid-cols-7 gap-1.5">
          {THEME_ORDER.map((id) => {
            const preset = THEME_COLORS[id];
            const active = presets.theme === id;
            return (
              <button
                key={id}
                type="button"
                title={preset.name}
                onClick={() => set("theme", id)}
                className={cn(
                  "flex h-8 items-center justify-center rounded-md border transition-colors",
                  active
                    ? "border-brand ring-1 ring-brand"
                    : "border-border hover:border-muted"
                )}
              >
                <span
                  className="size-4 rounded-full"
                  style={{ background: preset[presets.appearance].primary }}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <SectionLabel icon={<span className="text-[11px] font-bold">Aa</span>}>
          Tipografi
        </SectionLabel>
        <div className="space-y-1">
          {FONT_ORDER.map((id) => {
            const preset = FONT_PRESETS.find((f) => f.id === id)!;
            const active = presets.font === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => set("font", id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md border px-2.5 py-1.5 text-left transition-colors",
                  active
                    ? "border-brand bg-brand/10 text-brand-foreground"
                    : "border-border hover:border-muted"
                )}
                style={{ fontFamily: preset.stack }}
              >
                <span className="text-sm font-medium">{preset.name}</span>
                <span className="text-[11px] text-muted-foreground">Ag</span>
              </button>
            );
          })}
        </div>
        <div className="space-y-1">
          {(
            [
              { id: "inherit", name: "Judul: Ikuti font utama" },
              ...FONT_ORDER.map((id) => ({
                id,
                name: `Judul: ${FONT_PRESETS.find((f) => f.id === id)!.name}`,
              })),
            ] as const
          ).map((opt) => {
            const active = presets.fontHeading === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => set("fontHeading", opt.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md border px-2.5 py-1 text-left transition-colors",
                  active
                    ? "border-brand bg-brand/10 text-brand-foreground"
                    : "border-border hover:border-muted"
                )}
              >
                <span className="text-[11px] font-medium">{opt.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <SectionLabel icon={<span className="inline-block size-2 rotate-45 rounded-[2px] bg-current" />}>
          Border & Sudut
        </SectionLabel>
        <div className="grid grid-cols-5 gap-1.5">
          {RADIUS_ORDER.map((id) => {
            const preset = RADIUS_PRESETS.find((r) => r.id === id)!;
            const active = presets.radius === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => set("radius", id)}
                className={cn(
                  "flex items-center justify-center rounded-md border py-1.5 transition-colors",
                  active
                    ? "border-brand bg-brand/10 text-brand-foreground"
                    : "border-border text-muted-foreground hover:border-muted"
                )}
              >
                <span
                  className="size-3.5 border-2 border-current"
                  style={{ borderRadius: preset.radius }}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <SectionLabel icon={<span className="text-[10px] font-bold">▥</span>}>
          Chart
        </SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {CHART_ORDER.map((id) => {
            const preset = CHART_PALETTES.find((c) => c.id === id);
            const active = presets.chart === id;
            const colors =
              id === "theme"
                ? tokens.chart
                : (preset?.colors as [string, string, string, string, string]);
            return (
              <button
                key={id}
                type="button"
                title={preset?.description}
                onClick={() => set("chart", id)}
                className={cn(
                  "rounded-md border px-1.5 py-1.5 transition-colors",
                  active
                    ? "border-brand bg-brand/10"
                    : "border-border hover:border-muted"
                )}
              >
                <span className="flex items-center gap-0.5">
                  {colors.map((c, i) => (
                    <span
                      key={i}
                      className="h-3 flex-1 rounded-[2px]"
                      style={{ background: c }}
                    />
                  ))}
                </span>
                <span className="mt-1 block text-[9px] font-medium capitalize text-muted-foreground">
                  {id}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <SectionLabel icon={<span className="inline-block size-2 rounded-full border border-current" />}>
          Tampilan
        </SectionLabel>
        <div className="grid grid-cols-2 gap-1.5">
          {(
            [
              { id: "light", name: "Terang" },
              { id: "dark", name: "Gelap" },
            ] as const
          ).map((opt) => {
            const active = presets.appearance === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => set("appearance", opt.id)}
                className={cn(
                  "rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "border-brand bg-brand/10 text-brand-foreground"
                    : "border-border text-muted-foreground hover:border-muted"
                )}
              >
                {opt.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <SectionLabel icon={<span className="inline-block size-2 rounded-full border border-current" />}>
          Token Warna
        </SectionLabel>
        <div className="grid grid-cols-2 gap-1.5">
          {(
            [
              { name: "Latar", value: tokens.background },
              { name: "Kartu", value: tokens.card },
              { name: "Border", value: tokens.border },
              { name: "Input", value: tokens.input },
              { name: "Teks", value: tokens.foreground },
              { name: "Utama", value: tokens.primary },
            ] as const
          ).map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-2 rounded-md border border-border px-2 py-1.5"
              title={t.value}
            >
              <span
                className="size-4 shrink-0 rounded border border-black/10"
                style={{ background: t.value }}
              />
              <span className="min-w-0">
                <span className="block text-[10px] font-medium leading-tight text-foreground">
                  {t.name}
                </span>
                <span className="block truncate font-mono text-[9px] leading-tight text-muted-foreground">
                  {t.value}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={reset}>
          <RotateCcw size={13} /> Reset tema
        </Button>
        <Button variant="outline" size="icon-sm" onClick={shuffle} title="Acak tema">
          <Shuffle size={13} />
        </Button>
      </div>
    </div>
  );
}