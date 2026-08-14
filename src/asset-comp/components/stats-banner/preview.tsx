"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { listValue, nodeList, uniqueId } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";

interface Stat { id: string; value: string; suffix: string; label: string; }
const FALLBACK: Stat[] = [
  { id: "projects", value: "74", suffix: "+", label: "proyek diluncurkan" }, { id: "years", value: "8", suffix: " tahun", label: "menemani bisnis tumbuh" }, { id: "return", value: "96", suffix: "%", label: "klien kembali bekerja sama" }, { id: "cities", value: "12", suffix: " kota", label: "kolaborasi lintas Indonesia" },
];
function stats(node: Node): Stat[] { const list = nodeList(node,"stats").map((item,index) => { const value = listValue(item,"value"); if (!value) return null; return { id: uniqueId("stat",index,listValue(item,"label",value)), value, suffix:listValue(item,"suffix"), label:listValue(item,"label") }; }).filter((item): item is Stat => item !== null); return list.length ? list : FALLBACK; }
function background(node: Node) { const value = propString(node,"sectionBg"); return value === "default" || value === "muted" || value === "foreground" || value === "primary" ? value : "primary"; }

export function StatsBannerPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme); const device = usePreviewDevice(); const items = stats(node); const bg = background(node); const { setValue } = useRepeaterEditor(node, "stats");
  const eyebrow = propString(node,"eyebrow").trim() || "Dibangun bersama mitra kami"; const title = propString(node,"title").trim() || "Bukti kerja yang bisa dilihat, bukan sekadar janji.";
  const isTinted = bg === "primary" || bg === "foreground";
  const sectionBg = bg === "primary" ? "bg-primary" : bg === "foreground" ? "bg-foreground" : bg === "muted" ? "bg-secondary" : "bg-background";
  const text = isTinted ? (bg === "primary" ? "text-primary-foreground" : "text-background") : "text-foreground";
  const muted = isTinted ? (bg === "primary" ? "text-primary-foreground/70" : "text-background/65") : "text-muted-foreground";
  const divider = isTinted ? (bg === "primary" ? "border-primary-foreground/20" : "border-background/20") : "border-border";
  const columns = device === "mobile" ? "grid-cols-2" : device ? "grid-cols-4" : "grid-cols-2 md:grid-cols-4";
  const padding = device === "mobile" ? "px-5 py-12" : device ? "px-8 py-20" : "px-5 py-12 sm:px-8 sm:py-20";
  const statPadding = device === "mobile" ? "p-4" : device ? "p-5" : "p-4 sm:p-5";
  const statSize = device === "mobile" ? "text-3xl" : device ? "text-4xl" : "text-3xl sm:text-4xl";
  const lowerRowBorder = device === "mobile" ? "border-t" : device ? "" : "border-t md:border-t-0";
  return <section className={`w-full ${sectionBg} ${padding}`} style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}><div className="mx-auto max-w-6xl"><div className="max-w-xl"><p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${isTinted ? muted : "text-primary"}`}><InlineEditableText node={node} propKey="eyebrow" value={eyebrow} fallback="Dibangun bersama mitra kami" /></p><h2 className={`mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold leading-tight tracking-[-0.045em] ${text}`}><InlineEditableText node={node} propKey="title" value={title} fallback="Bukti kerja yang bisa dilihat, bukan sekadar janji." multiline /></h2></div><div className={`mt-10 grid overflow-hidden rounded-[var(--radius)] border ${divider} ${columns}`}>{items.map((item,index) => <div key={item.id} className={`min-w-0 ${statPadding} ${index % 2 !== 0 ? "border-l" : ""} ${index > 1 ? lowerRowBorder : ""} ${divider}`}><strong className={`font-[family-name:var(--font-heading)] font-extrabold tracking-[-0.06em] ${statSize} ${text}`}><InlineEditableText node={node} propKey="stats" value={item.value} onCommit={(next) => setValue(index, "value", next)} /><small className="ml-0.5 text-base font-bold tracking-normal"><InlineEditableText node={node} propKey="stats" value={item.suffix} onCommit={(next) => setValue(index, "suffix", next)} /></small></strong><p className={`mt-2 text-xs leading-5 ${muted}`}><InlineEditableText node={node} propKey="stats" value={item.label} onCommit={(next) => setValue(index, "label", next)} /></p></div>)}</div></div></section>;
}
