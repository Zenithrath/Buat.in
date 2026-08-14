"use client";

import { ArrowUpRight, ImageIcon } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableImage, InlineEditableText } from "@/components/preview/InlineEditable";
import { listValue, nodeList, uniqueId } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";

interface GalleryItem {
  id: string;
  url: string;
  alt: string;
  title: string;
  caption: string;
}

const FALLBACK: GalleryItem[] = [
  { id: "identity", url: "", alt: "Proyek identitas visual", title: "Identitas yang mudah diingat", caption: "Brand system" },
  { id: "web", url: "", alt: "Proyek website", title: "Website yang terasa hidup", caption: "Digital experience" },
  { id: "editorial", url: "", alt: "Proyek editorial", title: "Cerita dalam bentuk editorial", caption: "Campaign" },
  { id: "packaging", url: "", alt: "Proyek kemasan", title: "Kemasan untuk disentuh", caption: "Packaging" },
  { id: "space", url: "", alt: "Proyek ruang", title: "Ruang yang konsisten", caption: "Environment" },
  { id: "product", url: "", alt: "Proyek produk", title: "Produk yang punya bahasa", caption: "Product" },
];

function gallery(node: Node): GalleryItem[] {
  const list = nodeList(node, "images").map((item, index) => {
    const title = listValue(item, "title", `Karya ${index + 1}`);
    return {
      id: uniqueId("gallery", index, title),
      url: listValue(item, "url"),
      alt: listValue(item, "alt", title),
      title,
      caption: listValue(item, "caption"),
    };
  });

  return list.length ? list : FALLBACK;
}

function cols(node: Node, device: ReturnType<typeof usePreviewDevice>) {
  const value = propString(node, "columns");
  if (device === "mobile") return "grid-cols-2";
  if (device) return value === "2" ? "grid-cols-2" : value === "4" ? "grid-cols-4" : "grid-cols-3";
  return value === "2"
    ? "grid-cols-1 sm:grid-cols-2"
    : value === "4"
      ? "grid-cols-2 md:grid-cols-4"
      : "grid-cols-2 md:grid-cols-3";
}

export function GalleryGridPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const items = gallery(node);
  const { setValue } = useRepeaterEditor(node, "images");
  const columns = cols(node, device);
  const eyebrow = propString(node, "eyebrow").trim() || "Pilihan karya";
  const title = propString(node, "title").trim() || "Ruang untuk cerita yang punya karakter sendiri.";
  const description =
    propString(node, "description").trim() ||
    "Ganti gambar dan keterangannya langsung dari daftar visual di panel ini.";
  const padding =
    device === "mobile" ? "px-5 py-12" : device ? "px-8 py-20" : "px-5 py-12 sm:px-8 sm:py-20";
  const titleSize = device === "mobile" ? "text-3xl" : device ? "text-4xl" : "text-3xl sm:text-4xl";

  return (
    <section
      className={`w-full bg-background ${padding}`}
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
              <InlineEditableText node={node} propKey="eyebrow" value={eyebrow} fallback="Pilihan karya" />
            </p>
            <h2
              className={`mt-3 font-[family-name:var(--font-heading)] font-extrabold tracking-[-0.045em] text-foreground ${titleSize}`}
            >
              <InlineEditableText
                node={node}
                propKey="title"
                value={title}
                fallback="Ruang untuk cerita yang punya karakter sendiri."
                multiline
              />
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            <InlineEditableText
              node={node}
              propKey="description"
              value={description}
              fallback="Ganti gambar dan keterangannya langsung dari daftar visual di panel ini."
              multiline
            />
          </p>
        </div>

        <div className={`mt-10 grid gap-3 ${columns}`}>
          {items.map((item, index) => (
            <article
              key={item.id}
              className={`group relative min-w-0 overflow-hidden rounded-[var(--radius)] bg-secondary ${index === 0 && items.length > 3 ? "col-span-2 row-span-2" : ""}`}
            >
              <div className="aspect-square min-h-36 overflow-hidden">
                <InlineEditableImage
                  node={node}
                  imageKey="images"
                  altKey="images"
                  src={item.url}
                  alt={item.alt}
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  emptyContent={
                    <div className="relative flex h-full w-full items-end bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_85%,var(--secondary)),var(--foreground))] p-4">
                      <ImageIcon size={22} className="text-primary-foreground/75" aria-hidden="true" />
                      <span className="absolute -right-2 -top-5 font-[family-name:var(--font-heading)] text-7xl font-black tracking-[-0.12em] text-primary-foreground/15">
                        0{index + 1}
                      </span>
                    </div>
                  }
                  onImageCommit={(next) => setValue(index, "url", next)}
                  onAltCommit={(next) => setValue(index, "alt", next)}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-foreground/90 via-foreground/45 to-transparent px-3 pb-3 pt-12 text-background transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-background/70">
                  <InlineEditableText
                    node={node}
                    propKey="images"
                    value={item.caption}
                    onCommit={(next) => setValue(index, "caption", next)}
                  />
                </p>
                <h3 className="mt-1 flex items-end justify-between gap-2 text-sm font-bold">
                  <span>
                    <InlineEditableText
                      node={node}
                      propKey="images"
                      value={item.title}
                      onCommit={(next) => setValue(index, "title", next)}
                    />
                  </span>
                  <ArrowUpRight size={15} className="shrink-0" aria-hidden="true" />
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
