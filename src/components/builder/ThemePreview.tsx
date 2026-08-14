"use client";

import type { ResolvedTokens } from "@/lib/theme/presets";
import { projectTokenStyle } from "@/lib/registry/shared";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/**
 * Preview tema memakai primitif asli (Button, Input, Switch, Badge, Card)
 * yang dirender di dalam scope token project (--primary, --background, ...),
 * sehingga hasilnya sama dengan komponen shadcn yang dipakai di kanvas.
 */
export function ThemePreview({
  tokens,
  compact,
  className,
}: {
  tokens: ResolvedTokens;
  compact?: boolean;
  className?: string;
}) {
  const bars = [40, 65, 50, 80, 60, 90, 45];

  return (
    <div
      className={cn("overflow-hidden rounded-lg border bg-card", className)}
      style={{
        ...projectTokenStyle(tokens),
        background: tokens.card,
        color: tokens.foreground,
        fontFamily: tokens.fontBody,
        borderRadius: tokens.radius,
        boxShadow: tokens.shadow,
        borderColor: tokens.border,
      }}
    >
      <div
        className="flex items-center justify-between border-b px-3 py-2"
        style={{ borderColor: tokens.border, background: tokens.muted }}
      >
        <span className="flex items-center gap-1.5 text-xs font-semibold">
          <span
            className="inline-block size-2 rounded-full"
            style={{ background: tokens.primary }}
          />
          Preview shadcn/ui
        </span>
        <span className="rounded-full border border-border bg-background px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
          live
        </span>
      </div>

      <div className="space-y-3 p-3">
        <Card
          className="border p-3"
          style={{ borderRadius: tokens.radius, boxShadow: tokens.shadow }}
        >
          <span
            className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold"
            style={{ background: tokens.secondary, color: tokens.secondaryForeground }}
          >
            DESIGN SYSTEM
          </span>
          <p
            className="mt-2 text-sm font-bold"
            style={{ fontFamily: tokens.fontHeading }}
          >
            Tema Anda terlihat di sini
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Tombol, kartu, dan teks mengikuti pengaturan tema.
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <Button size="sm">Tombol utama</Button>
            <Button size="sm" variant="secondary">
              Sekunder
            </Button>
            {!compact ? (
              <Button size="sm" variant="outline">
                Outline
              </Button>
            ) : null}
          </div>
        </Card>

        <div className="flex items-center gap-2">
          <Input
            className="h-8 flex-1 text-[11px]"
            placeholder="Input teks..."
            readOnly
          />
          <Switch defaultChecked aria-label="Contoh switch" />
          <Badge variant="secondary" className="shrink-0">
            Badge
          </Badge>
        </div>

        <div
          className="rounded-md border border-border p-2"
          style={{ borderRadius: tokens.radius, background: tokens.background }}
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[10px] font-medium">Chart palette</span>
            <span className="font-mono text-[9px] text-muted-foreground">
              {compact ? "5 tokens" : "mengikuti tema"}
            </span>
          </div>
          <div className="flex items-end gap-1.5" aria-hidden>
            {bars.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: compact ? h * 0.45 : h * 0.7,
                  background: tokens.chart[i % 5],
                  borderRadius: tokens.radius,
                }}
              />
            ))}
          </div>
        </div>

        {!compact ? (
          <p className="font-mono text-[9px] text-muted-foreground">
            {tokens.fontBody.split(",")[0].replace(/'/g, "")} · radius {tokens.radius}
          </p>
        ) : null}
      </div>
    </div>
  );
}
