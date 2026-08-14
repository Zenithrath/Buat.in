import { CORE_CSS } from "./coreCss";
import { componentRegistry } from "./index";
import { createDefaultNode } from "@/lib/schema/defaults";
import { resolveTheme } from "@/lib/theme/presets";
import type { Theme } from "@/lib/schema/types";

const EDITOR_CORE_CSS = CORE_CSS.replace(
  /\/\* ===BI_SHADCN_ALIASES_START===\*\/[\s\S]*?\/\* ===BI_SHADCN_ALIASES_END===\*\//,
  ""
).replace("  /* ===BI_EDITOR_STRIP_BODY_BG=== */\n  background: var(--bi-bg);", "");

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

  return [EDITOR_CORE_CSS, componentCss].join("\n");
}