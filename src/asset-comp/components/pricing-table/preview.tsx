"use client";

import { ArrowUpRight, Check } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { listBoolean, listValue, nodeList, stringList, uniqueId } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonUrl: string;
  highlighted: boolean;
}

const FALLBACK_PLANS: Plan[] = [
  { id: "start", name: "Mulai", price: "Rp1,2jt", period: "/bulan", description: "Untuk bisnis kecil yang ingin hadir dengan rapi.", features: ["1 halaman utama", "Form kontak", "Dukungan email"], buttonText: "Pilih Mulai", buttonUrl: "#kontak", highlighted: false },
  { id: "grow", name: "Bertumbuh", price: "Rp3,5jt", period: "/bulan", description: "Pilihan paling seimbang untuk tim yang aktif.", features: ["Hingga 8 halaman", "SEO dasar", "Analitik ringkas", "Dukungan prioritas"], buttonText: "Pilih Bertumbuh", buttonUrl: "#kontak", highlighted: true },
  { id: "custom", name: "Kustom", price: "Mari bicara", period: "", description: "Untuk kebutuhan yang perlu dirancang lebih khusus.", features: ["Arsitektur konten", "Komponen khusus", "Sesi strategi", "Pendampingan tim"], buttonText: "Hubungi kami", buttonUrl: "#kontak", highlighted: false },
];

function getPlans(node: Node): Plan[] {
  const parsed = nodeList(node, "plans").map((item, index) => {
    const name = listValue(item, "name");
    if (!name) return null;
    return {
      id: uniqueId("plan", index, name),
      name,
      price: listValue(item, "price"),
      period: listValue(item, "period"),
      description: listValue(item, "description"),
      features: stringList(item.features),
      buttonText: listValue(item, "buttonText"),
      buttonUrl: listValue(item, "buttonUrl", "#"),
      highlighted: listBoolean(item, "highlighted"),
    };
  }).filter((item): item is Plan => item !== null);

  return parsed.length ? parsed : FALLBACK_PLANS;
}

export function PricingTablePreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const { setStringListValue, setValue } = useRepeaterEditor(node, "plans");
  const plans = getPlans(node);
  const eyebrow = propString(node, "eyebrow").trim() || "Pilihan yang fleksibel";
  const title = propString(node, "title").trim() || "Pilih langkah yang sesuai ritme bisnis Anda.";
  const description = propString(node, "description").trim() || "Mulai dari fondasi yang jelas, lalu bertumbuh saat kebutuhan Anda berubah.";
  const gridColumns = device === "mobile" ? "grid-cols-1" : device ? "grid-cols-3" : "grid-cols-1 md:grid-cols-3";
  const padding = device === "mobile" ? "px-5 py-12" : device ? "px-8 py-20" : "px-5 py-12 sm:px-8 sm:py-20";
  const titleSize = device === "mobile" ? "text-3xl" : device ? "text-4xl" : "text-3xl sm:text-4xl";

  return (
    <section className={`w-full bg-background ${padding}`} style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary"><InlineEditableText node={node} propKey="eyebrow" fallback="Pilihan yang fleksibel" value={eyebrow} /></p>
          <h2 className={`mt-3 font-[family-name:var(--font-heading)] font-extrabold tracking-[-0.045em] text-foreground ${titleSize}`}><InlineEditableText node={node} propKey="title" fallback="Pilih langkah yang sesuai ritme bisnis Anda." value={title} multiline /></h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground"><InlineEditableText node={node} propKey="description" fallback="Mulai dari fondasi yang jelas, lalu bertumbuh saat kebutuhan Anda berubah." value={description} multiline /></p>
        </div>
        <div className={`mt-10 grid items-stretch gap-4 ${gridColumns}`}>
          {plans.map((plan, planIndex) => (
            <article key={plan.id} className={`relative flex min-w-0 flex-col rounded-[var(--radius)] border p-5 shadow-sm ${plan.highlighted ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow)]" : "border-border bg-card text-card-foreground"}`}>
              {plan.highlighted ? <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-background px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-foreground shadow-sm">Paling dipilih</span> : null}
              <h3 className="text-base font-bold"><InlineEditableText node={node} propKey="plans" value={plan.name} onCommit={(next) => setValue(planIndex, "name", next)} /></h3>
              <p className={`mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-[-0.045em] ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                <InlineEditableText node={node} propKey="plans" value={plan.price} onCommit={(next) => setValue(planIndex, "price", next)} /><span className={`ml-1 text-xs font-medium tracking-normal ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}><InlineEditableText node={node} propKey="plans" value={plan.period} onCommit={(next) => setValue(planIndex, "period", next)} /></span>
              </p>
              <p className={`mt-4 min-h-12 text-sm leading-6 ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}><InlineEditableText node={node} propKey="plans" value={plan.description} onCommit={(next) => setValue(planIndex, "description", next)} multiline /></p>
              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((feature, featureIndex) => <li key={`${feature}-${featureIndex}`} className="flex items-start gap-2"><Check size={16} className={`mt-0.5 shrink-0 ${plan.highlighted ? "text-primary-foreground" : "text-primary"}`} aria-hidden="true" /><span><InlineEditableText node={node} propKey="plans" value={feature} onCommit={(next) => setStringListValue(planIndex, "features", featureIndex, next)} /></span></li>)}
              </ul>
              <InlineEditableLink node={node} propKey="plans" urlKey="buttonUrl" value={plan.buttonText || "Pilih paket"} urlValue={plan.buttonUrl} onCommit={(next) => setValue(planIndex, "buttonText", next)} onUrlCommit={(next) => setValue(planIndex, "buttonUrl", next)} linkClassName={`mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-[calc(var(--radius)*.8)] px-4 text-sm font-bold transition-transform hover:-translate-y-0.5 ${plan.highlighted ? "bg-background text-foreground" : "bg-foreground text-background"}`}><ArrowUpRight size={16} aria-hidden="true" /></InlineEditableLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
