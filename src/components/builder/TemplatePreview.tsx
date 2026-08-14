"use client";

import { useCallback, useMemo } from "react";
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
import { cn } from "@/lib/utils";

/**
 * Pratinjau template live (ala WordPress): node template asli dirender
 * memakai renderer preview lalu diskala kecil. Dashboard disusun seperti
 * layout aslinya (sidebar di kiri, konten di kanan) agar mudah dikenali.
 */
export function TemplatePreview({
  template,
  scale = 0.14,
  sectionCount = 6,
  className,
}: {
  template: TemplateDefinition;
  scale?: number;
  sectionCount?: number;
  className?: string;
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

  return (
    <PreviewEditingProvider>
      <CanvasChildrenProvider renderChildren={renderChildren}>
        <PreviewDeviceProvider device="desktop">
          <div
            data-device="desktop"
            className={cn("w-full", className)}
            style={{
              width: 1440,
              transform: `scale(${scale})`,
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
        </PreviewDeviceProvider>
      </CanvasChildrenProvider>
    </PreviewEditingProvider>
  );
}