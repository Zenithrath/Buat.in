"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, sanitizeUrl, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { nodeList, listValue } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";

interface LogoItem {
  id: string;
  name: string;
  url: string;
}

const DEFAULT_LOGOS: LogoItem[] = [
  { id: "l1", name: "Nusantara", url: "" },
  { id: "l2", name: "KaryaDigital", url: "" },
  { id: "l3", name: "Aruna Group", url: "" },
  { id: "l4", name: "Solusi Prima", url: "" },
  { id: "l5", name: "Biru Langit", url: "" },
  { id: "l6", name: "Tunas Muda", url: "" },
];

function parseLogos(node: Node): LogoItem[] {
  const source = node.props.logos === undefined ? "logosJson" : "logos";
  const items = nodeList(node, source)
    .map((item, index) => {
      const name = listValue(item, "name");
      if (!name) return null;
      return {
        id: String(item.id ?? `logo-${index + 1}`),
        name,
        url: listValue(item, "url", ""),
      };
    })
    .filter((item): item is LogoItem => item !== null);
  return items.length ? items : DEFAULT_LOGOS;
}

export function LogoClientsPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const eyebrow = propString(node, "eyebrow").trim() || "Dipercaya oleh";
  const logos = parseLogos(node);
  const logosKey = node.props.logos === undefined ? "logosJson" : "logos";
  const { setValue } = useRepeaterEditor(node, logosKey);

  return (
    <section className="w-full border-y border-border bg-muted/30 px-5 py-10 sm:px-8" style={themeTokenStyle(tokens)}>
      <p className="text-center text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
        <InlineEditableText node={node} propKey="eyebrow" fallback="Dipercaya oleh" value={eyebrow} />
      </p>
      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
        {logos.map((logo, index) => {
          const content = (
            <InlineEditableText
              node={node}
              propKey={logosKey}
              value={logo.name}
              onCommit={(next) => setValue(index, "name", next)}
              className="font-bold tracking-tight"
            />
          );
          const href = sanitizeUrl(logo.url);
          const shared = "flex items-center justify-center rounded-lg px-3 py-2 font-[family-name:var(--font-heading)] text-sm text-muted-foreground opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0";
          return href !== "#" ? (
            <a key={logo.id} href={href} onClick={(event) => { event.preventDefault(); event.stopPropagation(); }} className={shared}>{content}</a>
          ) : (
            <span key={logo.id} className={shared}>{content}</span>
          );
        })}
      </div>
    </section>
  );
}
