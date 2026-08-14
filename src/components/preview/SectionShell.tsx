"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { resolveSectionStyles, themeTokenStyle } from "@/lib/registry/shared";

export function SectionShell({
  node,
  theme,
  className = "bi-section",
  tag: Tag = "section",
  data,
  children,
}: {
  node: Node;
  theme: Theme;
  className?: string;
  tag?: "section" | "header" | "footer";
  data?: Record<string, string>;
  children: React.ReactNode;
}) {
  const tokens = resolveTheme(theme);
  const section = resolveSectionStyles(node, tokens);
  const dataProps = Object.fromEntries(
    Object.entries(data ?? {}).map(([key, value]) => [`data-${key}`, value])
  );

  return (
    <Tag
      className={className}
      {...dataProps}
      style={
        {
          ...themeTokenStyle(tokens),
          "--bi-pad": section.padding,
          "--bi-bg": section.background,
          "--bi-align": section.textAlign,
          "--bi-cw": section.contentWidth
            ? `${section.contentWidth}px`
            : "100%",
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}