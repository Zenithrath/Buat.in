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
 * sehingga hasilnya sama persis dengan komponen nyata di situs pengguna.
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
          Preview Tema
        </span>
        <div className="flex gap-1">
          {[tokens.primary, tokens.border, tokens.mutedForeground].map(
            (c, i) => (
              <span
                key={i}
                className="inline-block size-1.5 rounded-full"
                style={{ background: c }}
              />
            )
          )}
        </div>
      </div>

      <div className="space-y-3 p-3">
        <Card className="border p-3" style={{ borderRadius: tokens.radius }}>
          <p className="text-sm font-bold" style={{ fontFamily: tokens.fontHeading }}>
            Tema Anda terlihat di sini
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Tombol, kartu, dan teks mengikuti pengaturan tema.
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <Button size="sm">Tombol utama</Button>
            <Button size="sm" variant="outline">
              Sekunder
            </Button>
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

        <div className="flex items-end gap-1.5" aria-hidden>
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: compact ? h * 0.55 : h,
                background: tokens.chart[i % 5],
                borderRadius: `calc(${tokens.radius} * 0.5)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}