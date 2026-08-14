"use client";

import { Quote } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { listValue, nodeList, uniqueId } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";

interface Testimonial { id: string; quote: string; name: string; role: string; initials: string; }

const FALLBACK: Testimonial[] = [
  { id: "nadia", quote: "Prosesnya terasa jernih sejak awal. Tim kami akhirnya punya bahasa yang sama untuk menjelaskan arah brand.", name: "Nadia Kurnia", role: "Founder, Rona Studio", initials: "NK" },
  { id: "rangga", quote: "Bukan hanya terlihat lebih baik—website ini membuat calon klien jauh lebih cepat memahami apa yang kami tawarkan.", name: "Rangga Pratama", role: "Direktur, Karsa", initials: "RP" },
  { id: "salsa", quote: "Kami suka karena semuanya terasa sangat manusiawi: rapi, tidak berlebihan, dan mudah diteruskan oleh tim internal.", name: "Salsa Mutiara", role: "Marketing Lead, Foli", initials: "SM" },
];

function testimonials(node: Node): Testimonial[] {
  const items = nodeList(node, "items").map((item, index) => {
    const quote = listValue(item, "quote");
    if (!quote) return null;
    const name = listValue(item, "name", "Pelanggan");
    return { id: uniqueId("quote", index, name), quote, name, role: listValue(item, "role"), initials: listValue(item, "initials", name.slice(0, 2).toUpperCase()) };
  }).filter((item): item is Testimonial => item !== null);
  return items.length ? items : FALLBACK;
}

function columns(node: Node, device: ReturnType<typeof usePreviewDevice>) {
  const requested = propString(node, "columns");
  const count = requested === "1" || requested === "2" || requested === "3" ? Number(requested) : 3;
  if (device === "mobile") return "grid-cols-1";
  if (device) return count === 1 ? "grid-cols-1" : count === 2 ? "grid-cols-2" : "grid-cols-3";
  return count === 1 ? "grid-cols-1" : count === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3";
}

export function TestimonialGridPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const { setValue } = useRepeaterEditor(node, "items");
  const items = testimonials(node);
  const eyebrow = propString(node, "eyebrow").trim() || "Cerita dari mereka";
  const title = propString(node, "title").trim() || "Keputusan kecil yang membuat pekerjaan terasa lebih ringan.";
  const description = propString(node, "description").trim() || "Dengar langsung dari orang-orang yang menjalankan bisnisnya setiap hari.";
  const padding = device === "mobile" ? "px-5 py-12" : device ? "px-8 py-20" : "px-5 py-12 sm:px-8 sm:py-20";
  const titleSize = device === "mobile" ? "text-3xl" : device ? "text-4xl" : "text-3xl sm:text-4xl";
  const middleOffset = device === "mobile" ? "" : device ? "translate-y-5" : "md:translate-y-5";

  return <section className={`w-full bg-secondary/30 ${padding}`} style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}>
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-2xl text-center"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary"><InlineEditableText node={node} propKey="eyebrow" value={eyebrow} fallback="Cerita dari mereka" /></p><h2 className={`mt-3 font-[family-name:var(--font-heading)] font-extrabold tracking-[-0.045em] text-foreground ${titleSize}`}><InlineEditableText node={node} propKey="title" value={title} fallback="Keputusan kecil yang membuat pekerjaan terasa lebih ringan." multiline /></h2><p className="mt-4 text-sm leading-6 text-muted-foreground"><InlineEditableText node={node} propKey="description" value={description} fallback="Dengar langsung dari orang-orang yang menjalankan bisnisnya setiap hari." multiline /></p></div>
      <div className={`mt-10 grid gap-4 ${columns(node, device)}`}>{items.map((item, index) => <article key={item.id} className={`relative min-w-0 rounded-[var(--radius)] border border-border bg-card p-5 shadow-sm ${index === 1 ? middleOffset : ""}`}>
        <Quote size={24} className="text-primary/55" aria-hidden="true" />
        <blockquote className="mt-5 text-[15px] font-medium leading-7 tracking-[-0.012em] text-foreground">“<InlineEditableText node={node} propKey="items" value={item.quote} onCommit={(next) => setValue(index, "quote", next)} multiline />”</blockquote>
        <footer className="mt-6 flex items-center gap-3 border-t border-border pt-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-extrabold text-primary-foreground"><InlineEditableText node={node} propKey="items" value={item.initials} onCommit={(next) => setValue(index, "initials", next)} /></span><span className="min-w-0"><strong className="block truncate text-sm text-foreground"><InlineEditableText node={node} propKey="items" value={item.name} onCommit={(next) => setValue(index, "name", next)} /></strong><span className="block truncate text-xs text-muted-foreground"><InlineEditableText node={node} propKey="items" value={item.role} onCommit={(next) => setValue(index, "role", next)} /></span></span></footer>
      </article>)}</div>
    </div>
  </section>;
}
