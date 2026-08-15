"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { listValue, nodeList } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";

const PALETTE = [
  "bg-primary/15 text-primary",
  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  "bg-rose-500/15 text-rose-700 dark:text-rose-300",
];

const DEFAULT_NAMES = ["Ayu Lestari", "Bayu Pratama", "Citra Dewi", "Dimas Arya", "Elsa Putri"];

function copy(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function showExtra(node: Node): boolean {
  return node.props.showExtra === true || propString(node, "showExtra") === "true";
}

function initials(name: string): string {
  return name.trim().slice(0, 2).toUpperCase();
}

export function StackAvatarPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const { setValue } = useRepeaterEditor(node, "avatarsJson");
  const entries = nodeList(node, "avatarsJson")
    .map((item) => listValue(item, "name").trim())
    .filter(Boolean);
  const names = entries.length ? entries : DEFAULT_NAMES;
  const extra = copy(node, "extraCount", "+12");
  const show = showExtra(node);

  return (
    <div className="flex w-full items-center" style={themeTokenStyle(tokens)}>
      <div className="flex items-center -space-x-2">
        {names.map((name, index) => (
          <span
            key={`avatar-${index}-${name}`}
            title={name}
            className={`grid size-9 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ring-2 ring-card ${PALETTE[index % PALETTE.length]}`}
          >
            <InlineEditableText
              node={node}
              propKey="avatarsJson"
              value={initials(name)}
              onCommit={(next) => setValue(index, "name", next)}
            />
          </span>
        ))}
        {show ? (
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-[11px] font-extrabold text-muted-foreground ring-2 ring-card">
            <InlineEditableText node={node} propKey="extraCount" fallback="+12" value={extra} />
          </span>
        ) : null}
      </div>
    </div>
  );
}
