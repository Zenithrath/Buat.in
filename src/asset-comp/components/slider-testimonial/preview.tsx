"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useState } from "react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { nodeList, listValue } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

function booleanProp(node: Node, key: string, fallback: boolean): boolean {
  const value = node.props[key];
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return !["false", "0", "off", "no"].includes(value.trim().toLowerCase());
  return fallback;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: "t1", quote: "Halaman baru kami jadi 3x lebih cepat dimuat dan penampilannya langsung terasa lebih profesional.", author: "Rina Wijaya", role: "Pemilik Toko Online" },
  { id: "t2", quote: "Tanpa menulis kode, kami bisa mengubah tampilan sesuai identitas brand dalam hitungan menit.", author: "Budi Santoso", role: "Kepala Pemasaran" },
  { id: "t3", quote: "Hasil ekspornya rapi dan mudah dipasang tim developer kami. Prosesnya sangat hemat waktu.", author: "Sari Handayani", role: "Founder Startup" },
];

function parseTestimonials(node: Node): Testimonial[] {
  const source = node.props.testimonials === undefined ? "testimonialsJson" : "testimonials";
  const items = nodeList(node, source)
    .map((item, index) => {
      const quote = listValue(item, "quote");
      if (!quote) return null;
      return {
        id: String(item.id ?? `testimonial-${index + 1}`),
        quote,
        author: listValue(item, "author", "Pelanggan"),
        role: listValue(item, "role", ""),
      };
    })
    .filter((item): item is Testimonial => item !== null);
  return items.length ? items : DEFAULT_TESTIMONIALS;
}

export function SliderTestimonialPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const heading = propString(node, "heading").trim() || "Kata mereka yang sudah memakai";
  const showArrows = booleanProp(node, "showArrows", true);
  const showDots = booleanProp(node, "showDots", true);
  const testimonials = parseTestimonials(node);
  const key = node.props.testimonials === undefined ? "testimonialsJson" : "testimonials";
  const { setValue } = useRepeaterEditor(node, key);
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      if (testimonials.length === 0) return;
      setIndex(((next % testimonials.length) + testimonials.length) % testimonials.length);
    },
    [testimonials.length]
  );

  return (
    <section className="w-full overflow-hidden border-y border-border bg-background px-5 py-14 sm:px-8" style={themeTokenStyle(tokens)}>
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-[-0.05em] text-foreground sm:text-3xl">
          <InlineEditableText node={node} propKey="heading" fallback="Kata mereka yang sudah memakai" value={heading} multiline />
        </h2>

        {testimonials.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">Tambahkan testimoni lewat panel kanan.</p>
        ) : (
          <div className="mt-10">
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Testimoni pelanggan"
              className="relative"
            >
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {testimonials.map((item, slideIndex) => (
                    <figure
                      key={item.id}
                      aria-hidden={index !== slideIndex}
                      className="w-full shrink-0 px-6 py-8 text-center sm:px-12 sm:py-10"
                    >
                      <Quote aria-hidden="true" size={28} className="mx-auto text-primary/60" />
                      <blockquote className="mt-4 text-base font-medium leading-7 text-foreground sm:text-lg sm:leading-8">
                        <InlineEditableText node={node} propKey={key} value={item.quote} onCommit={(next) => setValue(slideIndex, "quote", next)} multiline />
                      </blockquote>
                      <figcaption className="mt-6">
                        <p className="text-sm font-bold text-foreground">
                          <InlineEditableText node={node} propKey={key} value={item.author} onCommit={(next) => setValue(slideIndex, "author", next)} />
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          <InlineEditableText node={node} propKey={key} value={item.role} onCommit={(next) => setValue(slideIndex, "role", next)} />
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              {showArrows ? (
                <>
                  <button
                    type="button"
                    aria-label="Testimoni sebelumnya"
                    onClick={(event) => { event.stopPropagation(); goTo(index - 1); }}
                    className="absolute left-0 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:bg-muted md:-left-5"
                  >
                    <ChevronLeft aria-hidden="true" size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Testimoni berikutnya"
                    onClick={(event) => { event.stopPropagation(); goTo(index + 1); }}
                    className="absolute right-0 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:bg-muted md:-right-5"
                  >
                    <ChevronRight aria-hidden="true" size={18} />
                  </button>
                </>
              ) : null}
            </div>

            {showDots ? (
              <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Pilih testimoni">
                {testimonials.map((item, dotIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={dotIndex === index}
                    aria-label={`Testimoni ${dotIndex + 1}`}
                    onClick={(event) => { event.stopPropagation(); goTo(dotIndex); }}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      dotIndex === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                  />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
