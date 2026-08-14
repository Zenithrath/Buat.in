"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Node as BuilderNode, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { arrayNavigationLinks, navInstanceId } from "../_shared/navigation";
import { useRepeaterEditor } from "../_shared/inline";

export function DropdownMenuPreview({ node, theme }: { node: BuilderNode; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const items = arrayNavigationLinks(node, "items", [
    { id: "layanan", label: "Layanan kami", url: "#layanan" },
    { id: "karya", label: "Karya terbaru", url: "#karya" },
    { id: "tentang", label: "Tentang studio", url: "#tentang" },
  ]);
  const buttonText = propString(node, "buttonText").trim() || "Lihat pilihan";
  const { setValue } = useRepeaterEditor(node, "items");
  const align = propString(node, "align") === "right" ? "right" : "left";
  const id = navInstanceId(node, "dropdown-menu");

  useEffect(() => {
    function onEscape(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    function onOutside(event: MouseEvent) { if (root.current && event.target instanceof globalThis.Node && !root.current.contains(event.target)) setOpen(false); }
    document.addEventListener("keydown", onEscape);
    document.addEventListener("mousedown", onOutside);
    return () => { document.removeEventListener("keydown", onEscape); document.removeEventListener("mousedown", onOutside); };
  }, []);

  return <div ref={root} className="relative inline-flex max-w-full p-4" style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}>
    <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls={id} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-extrabold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow)]"><InlineEditableText node={node} propKey="buttonText" value={buttonText} fallback="Lihat pilihan" /><ChevronDown size={16} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} /></button>
    <div id={id} className={`${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"} absolute top-[calc(100%-0.1rem)] z-20 mt-2 min-w-56 overflow-hidden rounded-[var(--radius)] border border-border bg-card p-1.5 shadow-[var(--shadow)] transition-all duration-200 ${align === "right" ? "right-4" : "left-4"}`}>
      {items.map((item, index) => <InlineEditableLink key={item.id} node={node} propKey="items" urlKey="items" value={item.label} urlValue={item.url} onCommit={(next) => setValue(index, "label", next)} onUrlCommit={(next) => setValue(index, "url", next)} className="w-full" linkClassName="group flex w-full items-center justify-between gap-3 rounded-[calc(var(--radius)*.7)] px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">{index === 0 ? <Check size={15} className="text-primary" /> : <span className="size-1.5 rounded-full bg-border transition-colors group-hover:bg-primary" />}</InlineEditableLink>)}
    </div>
  </div>;
}
