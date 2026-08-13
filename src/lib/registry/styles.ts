import { CORE_CSS } from "./coreCss";
import { componentRegistry } from "./index";
import { createDefaultNode } from "@/lib/schema/defaults";
import { resolveTheme } from "@/lib/theme/presets";
import type { Theme } from "@/lib/schema/types";

export function collectRegistryCss(): string {
  const defaultTheme: Theme = {
    presets: {
      color: "blue",
      radius: "soft",
      font: "modern",
      density: "balanced",
      shadow: "soft",
    },
    overrides: {},
  };

  const ctx = { theme: defaultTheme, tokens: resolveTheme(defaultTheme) };

  const componentCss = componentRegistry
    .map((c) => {
      const node = createDefaultNode(c.id);
      node.props = { ...c.defaultProps };
      return c.exportAdapter(node, ctx).css;
    })
    .join("\n");

  return [CORE_CSS, componentCss].join("\n");
}