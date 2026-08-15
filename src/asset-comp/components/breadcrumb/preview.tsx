"use client";

import { ChevronRight, Home, Slash } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, sanitizeUrl, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { nodeList, listValue } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";

interface CrumbItem {
  id: string;
  label: string;
  url: string;
}

function booleanProp(node: Node, key: string, fallback: boolean): boolean {
  const value = node.props[key];
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return !["false", "0", "off", "no"].includes(value.trim().toLowerCase());
  return fallback;
}

const SEPARATORS: Record<string, { icon: string; text: string }> = {
  "/": { icon: "slash", text: "/" },
  "›": { icon: "chevron", text: "›" },
  ">": { icon: "chevron", text: ">" },
  "•": { icon: "dot", text: "•" },
};

function parseItems(node: Node): CrumbItem[] {
  const source = node.props.items === undefined ? "itemsJson" : "items";
  const items = nodeList(node, source)
    .map((item, index) => {
      const label = listValue(item, "label");
      if (!label) return null;
      return {
        id: String(item.id ?? `crumb-${index + 1}`),
        label,
        url: listValue(item, "url", ""),
      };
    })
    .filter((item): item is CrumbItem => item !== null);
  return items.length ? items : [];
}

function Separator({ type }: { type: string }) {
  const sep = SEPARATORS[type] ?? SEPARATORS["/"];
  if (sep.icon === "slash") return <Slash aria-hidden="true" size={14} className="shrink-0 text-muted-foreground/70" />;
  if (sep.icon === "chevron") return <ChevronRight aria-hidden="true" size={14} className="shrink-0 text-muted-foreground/70" />;
  return <span aria-hidden="true" className="shrink-0 text-sm text-muted-foreground/70">{sep.text}</span>;
}

export function BreadcrumbPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const separator = propString(node, "separator").trim() || "/";
  const showHome = booleanProp(node, "showHome", true);
  const homeUrl = propString(node, "homeUrl").trim() || "/";
  const items = parseItems(node);
  const itemsKey = node.props.items === undefined ? "itemsJson" : "items";
  const { setValue } = useRepeaterEditor(node, itemsKey);
  const homeHref = sanitizeUrl(homeUrl);

  return (
    <nav aria-label="Breadcrumb" className="w-full overflow-x-auto border-b border-border bg-background px-5 py-2.5 sm:px-8" style={themeTokenStyle(tokens)}>
      <ol className="flex min-w-max items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {showHome ? (
          <>
            <li>
              <a
                href={homeHref}
                onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}
                aria-label="Beranda"
                className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 transition-colors hover:bg-muted hover:text-foreground"
              >
                <Home aria-hidden="true" size={13} />
              </a>
            </li>
            <Separator type={separator} />
          </>
        ) : null}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const href = sanitizeUrl(item.url);
          const label = (
            <InlineEditableText
              node={node}
              propKey={itemsKey}
              value={item.label}
              onCommit={(next) => setValue(index, "label", next)}
            />
          );
          return (
            <li key={item.id} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="max-w-40 truncate px-1.5 py-0.5 font-bold text-foreground">{label}</span>
              ) : href !== "#" ? (
                <a
                  href={href}
                  onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}
                  className="max-w-40 truncate rounded-md px-1.5 py-0.5 transition-colors hover:bg-muted hover:text-foreground"
                >
                  {label}
                </a>
              ) : (
                <span className="max-w-40 truncate rounded-md px-1.5 py-0.5">{label}</span>
              )}
              {!isLast ? <Separator type={separator} /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
