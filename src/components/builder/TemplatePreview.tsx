"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { materializeTemplateNodes } from "@/lib/schema/defaults";
import { DEFAULT_THEME_PRESETS, resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, themeTokenStyle } from "@/lib/registry/shared";
import { SectionPreview } from "@/components/preview/SectionPreview";
import { PreviewDeviceProvider } from "@/components/preview/PreviewDeviceContext";
import { PreviewEditingProvider } from "@/components/preview/PreviewEditingContext";
import {
  CanvasChildrenProvider,
  type CanvasChildrenOptions,
} from "@/components/preview/CanvasChildrenContext";
import type { Node, Theme } from "@/lib/schema/types";
import type { TemplateDefinition } from "@/templates";
import { getTemplateSource } from "@/templates";
import { cn } from "@/lib/utils";

/**
 * Pratinjau template live (ala WordPress): node template asli dirender
 * memakai renderer preview lalu diskala kecil. Dashboard disusun seperti
 * layout aslinya (sidebar di kiri, konten di kanan) agar mudah dikenali.
 * Mode `autoFit` menyesuaikan skala dengan lebar kontainer. Kartu template
 * sengaja hanya menampilkan bagian atas (biasanya navbar + hero) agar preview
 * tetap ringkas; template lengkap tetap diterapkan saat dipilih.
 */
export function TemplatePreview({
  template,
  scale = 0.14,
  sectionCount = 2,
  className,
  autoFit = false,
}: {
  template: TemplateDefinition;
  scale?: number;
  sectionCount?: number;
  className?: string;
  autoFit?: boolean;
}) {
  const { nodes, theme } = useMemo(() => {
    const materialized = materializeTemplateNodes(template.createNodes());
    const visible = materialized.filter((node) => !node.metadata?.hidden);
    return {
      nodes: visible.slice(0, sectionCount),
      theme: {
        presets: { ...DEFAULT_THEME_PRESETS, ...(template.theme?.presets ?? {}) },
        overrides: template.theme?.overrides ?? {},
      } satisfies Theme,
    };
  }, [template, sectionCount]);

  const tokens = useMemo(() => resolveTheme(theme), [theme]);
  const isDashboard = template.category === "dashboard";
  const source = getTemplateSource(template.id);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(900);

  useEffect(() => {
    if (!autoFit) return;
    const el = wrapperRef.current;
    if (!el) return;
    const measure = () => setContainerWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [autoFit]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setInnerHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [nodes]);

  const finalScale = autoFit && containerWidth > 0 ? containerWidth / 1440 : scale;
  const wrapperHeight = autoFit ? innerHeight * finalScale : undefined;

  const renderChildren = useCallback(
    (node: Node, options: CanvasChildrenOptions = {}) => (
      <div className={cn(options.className, node.children.length === 0 && options.emptyClassName)}>
        {node.children.map((child) => (
          <SectionPreview key={child.id} node={child} theme={theme} />
        ))}
        {node.children.length === 0 && options.emptyMessage ? (
          <div className={options.emptyClassName}>{options.emptyMessage}</div>
        ) : null}
      </div>
    ),
    [theme]
  );

  const isSidebarNode = (node: Node) =>
    node.componentType === "app-sidebar" || node.componentType === "sidebar-icon";

  const sidebarNodes = isDashboard ? nodes.filter(isSidebarNode) : [];
  const mainNodes = isDashboard ? nodes.filter((node) => !isSidebarNode(node)) : nodes;

  if (source) {
    return (
      <div
        ref={wrapperRef}
        className={cn("relative h-52 overflow-hidden bg-white", className)}
      >
        <iframe
          title={`${template.name} source preview`}
          src={`/api/template-source/${template.id}/${source.entry}`}
          className="pointer-events-none absolute left-0 top-0 border-0"
          style={{
            width: 1440,
            height: 900,
            transform: `scale(${finalScale || 0.14})`,
            transformOrigin: "top left",
          }}
        />
      </div>
    );
  }

  return (
    <PreviewEditingProvider>
      <CanvasChildrenProvider renderChildren={renderChildren}>
        <PreviewDeviceProvider device="desktop">
          <div
            ref={wrapperRef}
            className={cn("relative", className)}
            style={{ height: wrapperHeight }}
          >
            <div
              ref={innerRef}
              data-device="desktop"
              data-bi-style={tokens.styleId}
              className={cn("w-full")}
              style={{
                width: 1440,
                transform: `scale(${finalScale})`,
                transformOrigin: "top left",
                ...themeTokenStyle(tokens),
                ...projectTokenStyle(tokens),
                backgroundColor: tokens.background,
                color: tokens.foreground,
              } as React.CSSProperties}
            >
              {isDashboard ? (
                <div className="flex min-h-full">
                  <div className="w-64 shrink-0">
                    {sidebarNodes.map((node) => (
                      <SectionPreview key={node.id} node={node} theme={theme} />
                    ))}
                  </div>
                  <div className="min-w-0 flex-1">
                    {mainNodes.map((node) => (
                      <SectionPreview key={node.id} node={node} theme={theme} />
                    ))}
                  </div>
                </div>
              ) : (
                nodes.map((node) => (
                  <SectionPreview key={node.id} node={node} theme={theme} />
                ))
              )}
            </div>
          </div>
        </PreviewDeviceProvider>
      </CanvasChildrenProvider>
    </PreviewEditingProvider>
  );
}
