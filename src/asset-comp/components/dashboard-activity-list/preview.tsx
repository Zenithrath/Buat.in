"use client";

import { Check, Clock3, MoreHorizontal, TriangleAlert } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { listValue, nodeList, uniqueId } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";

type Status = "success" | "pending" | "warning";
type Activity = { id: string; initials: string; title: string; description: string; time: string; status: Status };

const FALLBACK: Activity[] = [
  { id: "nadia", initials: "NA", title: "Nadia mengundang anggota baru", description: "Tim desain sekarang memiliki akses ke workspace utama.", time: "Baru saja", status: "success" },
  { id: "rangga", initials: "RP", title: "Laporan penjualan siap ditinjau", description: "Ringkasan periode Juli sudah diperbarui dengan data terbaru.", time: "12 menit lalu", status: "pending" },
  { id: "dika", initials: "DK", title: "Ada pembayaran yang perlu dicek", description: "Satu transaksi menunggu konfirmasi dari tim keuangan.", time: "1 jam lalu", status: "warning" },
  { id: "salsa", initials: "SM", title: "Salsa menyelesaikan catatan proyek", description: "Semua perubahan pada brief kampanye sudah tersimpan.", time: "Kemarin", status: "success" },
];

function safeStatus(value: string): Status { return value === "pending" || value === "warning" ? value : "success"; }

function itemSource(node: Node) { return node.props.items === undefined ? "itemsJson" : "items"; }

function activities(node: Node): Activity[] {
  const key = itemSource(node);
  const entries = nodeList(node, key).map((item, index) => {
    const title = listValue(item, "title");
    if (!title) return null;
    return {
      id: uniqueId("activity", index, title),
      initials: listValue(item, "initials", title.slice(0, 2).toUpperCase()).slice(0, 3),
      title,
      description: listValue(item, "description"),
      time: listValue(item, "time", "Baru saja"),
      status: safeStatus(listValue(item, "status", "success")),
    };
  }).filter((item): item is Activity => item !== null);
  return entries.length ? entries : FALLBACK;
}

const STATUS = {
  success: { label: "Selesai", className: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300", Icon: Check },
  pending: { label: "Menunggu", className: "bg-sky-500/12 text-sky-700 dark:text-sky-300", Icon: Clock3 },
  warning: { label: "Perlu cek", className: "bg-amber-500/14 text-amber-700 dark:text-amber-300", Icon: TriangleAlert },
};

function copy(node: Node, key: string, fallback: string) { return propString(node, key).trim() || fallback; }

export function DashboardActivityListPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme); const device = usePreviewDevice(); const source = itemSource(node); const { setValue } = useRepeaterEditor(node, source); const items = activities(node);
  const title = copy(node, "title", "Aktivitas terbaru"); const description = copy(node, "description", "Pembaruan yang perlu diketahui tim hari ini.");
  return <article className="w-full min-w-0 overflow-hidden rounded-[calc(var(--radius)*1.05)] border border-border bg-card text-foreground shadow-sm" style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}>
    <header className="flex items-start justify-between gap-3 border-b border-border px-4 py-4 sm:px-5"><div className="min-w-0"><h3 className="truncate font-[family-name:var(--font-heading)] text-base font-extrabold tracking-[-0.025em]"><InlineEditableText node={node} propKey="title" fallback="Aktivitas terbaru" value={title} /></h3><p className="mt-1 text-xs text-muted-foreground"><InlineEditableText node={node} propKey="description" fallback="Pembaruan yang perlu diketahui tim hari ini." value={description} /></p></div><button type="button" data-canvas-interactive aria-label="Pilihan aktivitas" title="Pilihan aktivitas" className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><MoreHorizontal size={17} aria-hidden="true" /></button></header>
    <div className="divide-y divide-border">{items.map((item, index) => { const status = STATUS[item.status]; const StatusIcon = status.Icon; return <article key={item.id} className={`group flex min-w-0 gap-3 px-4 py-3.5 transition-colors hover:bg-muted/45 sm:px-5 ${device === "mobile" ? "items-start" : "items-center"}`}><span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-extrabold text-primary"><InlineEditableText node={node} propKey={source} value={item.initials} onCommit={(next) => setValue(index, "initials", next.slice(0, 3).toUpperCase())} /></span><div className="min-w-0 flex-1"><div className="flex min-w-0 items-center justify-between gap-3"><h4 className="min-w-0 truncate text-sm font-bold"><InlineEditableText node={node} propKey={source} value={item.title} onCommit={(next) => setValue(index, "title", next)} /></h4><time className="shrink-0 text-[10px] font-medium text-muted-foreground"><InlineEditableText node={node} propKey={source} value={item.time} onCommit={(next) => setValue(index, "time", next)} /></time></div>{item.description ? <p className="mt-1 text-xs leading-5 text-muted-foreground"><InlineEditableText node={node} propKey={source} value={item.description} onCommit={(next) => setValue(index, "description", next)} multiline /></p> : null}<span className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${status.className}`}><StatusIcon size={11} aria-hidden="true" />{status.label}</span></div></article>; })}</div>
  </article>;
}
