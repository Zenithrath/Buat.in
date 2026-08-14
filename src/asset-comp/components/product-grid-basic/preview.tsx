"use client";

import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import {
  projectTokenStyle,
  propString,
  themeTokenStyle,
} from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableImage, InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { useBuilderStore } from "@/lib/store/project-store";

interface ProductItem {
  id: string;
  name: string;
  price: string;
  tag: string;
  imageUrl: string;
  description: string;
  actionText: string;
  actionUrl: string;
}

const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: "strategy",
    name: "Arah & Strategi Brand",
    price: "Riset, positioning, dan pesan utama",
    tag: "Fondasi",
    imageUrl: "",
    description: "Keputusan awal yang membuat komunikasi bisnis terasa konsisten.",
    actionText: "Pelajari layanan",
    actionUrl: "#kontak",
  },
  {
    id: "identity",
    name: "Identitas Visual",
    price: "Sistem visual untuk setiap titik temu",
    tag: "Identitas",
    imageUrl: "",
    description: "Logo dan bahasa visual yang dapat dipakai tim setiap hari.",
    actionText: "Lihat ruang lingkup",
    actionUrl: "#kontak",
  },
  {
    id: "website",
    name: "Website Perusahaan",
    price: "Struktur konten dan desain responsif",
    tag: "Digital",
    imageUrl: "",
    description: "Situs yang memudahkan calon pelanggan menemukan alasan untuk percaya.",
    actionText: "Diskusikan website",
    actionUrl: "#kontak",
  },
];

function text(value: unknown) {
  return value == null ? "" : String(value).trim();
}

function parseProducts(value: unknown): ProductItem[] {
  let parsed = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(parsed)) return [];

  return parsed.flatMap((entry, index): ProductItem[] => {
    if (!entry || typeof entry !== "object") return [];
    const item = entry as Record<string, unknown>;
    const name = text(item.name);
    if (!name) return [];
    return [
      {
        id: text(item.id) || `service-${index + 1}`,
        name,
        price: text(item.price),
        tag: text(item.tag),
        imageUrl: text(item.imageUrl ?? item.image),
        description: text(item.description),
        actionText: text(item.actionText),
        actionUrl: text(item.actionUrl ?? item.url) || "#",
      },
    ];
  });
}

function legacyProducts(node: Node): ProductItem[] {
  return Array.from({ length: 4 }, (_, index) => index + 1).flatMap((position) => {
    const name = propString(node, `product${position}Name`).trim();
    if (!name) return [];
    return [
      {
        id: `service-${position}`,
        name,
        price: propString(node, `product${position}Price`).trim(),
        tag: propString(node, `product${position}Tag`).trim(),
        imageUrl: propString(node, `product${position}ImageUrl`).trim(),
        description: propString(node, `product${position}Description`).trim(),
        actionText: propString(node, `product${position}ActionText`).trim(),
        actionUrl: propString(node, `product${position}ActionUrl`).trim() || "#",
      },
    ];
  });
}

function getProducts(node: Node) {
  const fromJson = parseProducts(node.props.productsJson);
  if (fromJson.length) return fromJson;
  const fromArray = parseProducts(node.props.products);
  if (fromArray.length) return fromArray;
  const fromLegacy = legacyProducts(node);
  return fromLegacy.length ? fromLegacy : FALLBACK_PRODUCTS;
}

function productStorage(node: Node): { key: "productsJson" | "products"; items: Record<string, unknown>[] } {
  for (const key of ["productsJson", "products"] as const) {
    let parsed: unknown = node.props[key];
    if (typeof parsed === "string") {
      try {
        parsed = JSON.parse(parsed);
      } catch {
        parsed = null;
      }
    }
    if (Array.isArray(parsed)) {
      return {
        key,
        items: parsed.map((item) =>
          item && typeof item === "object" ? { ...(item as Record<string, unknown>) } : {}
        ),
      };
    }
  }

  return {
    key: "productsJson",
    items: FALLBACK_PRODUCTS.map((item) => ({ ...item })),
  };
}

export function ProductGridPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const updateNode = useBuilderStore((state) => state.updateNode);
  const previewDevice = usePreviewDevice();
  const isCanvasMobile = previewDevice === "mobile";
  const sectionTitle =
    propString(node, "sectionTitle").trim() ||
    propString(node, "title").trim() ||
    "Layanan yang menyatukan gambaran besar dan detail kecil.";
  const sectionSubtitle =
    propString(node, "sectionSubtitle").trim() ||
    propString(node, "subtitle").trim() ||
    "Pilih pendampingan yang sesuai tahap bisnis Anda, atau susun ruang lingkup bersama kami.";
  const products = getProducts(node);
  const sectionSpacing =
    previewDevice === null
      ? "px-5 py-12 sm:px-8 sm:py-20"
      : isCanvasMobile
        ? "px-5 py-12"
        : "px-8 py-20";
  const titleSize =
    previewDevice === null ? "text-3xl sm:text-4xl" : isCanvasMobile ? "text-3xl" : "text-4xl";
  const cardPadding =
    previewDevice === null ? "p-4 sm:p-5" : isCanvasMobile ? "p-4" : "p-5";

  const updateProduct = (index: number, patch: Record<string, string>) => {
    const storage = productStorage(node);
    const items = [...storage.items];
    items[index] = { ...(items[index] ?? {}), ...patch };
    updateNode(node.id, (current) => ({
      ...current,
      props: {
        ...current.props,
        [storage.key]: typeof current.props[storage.key] === "string" ? JSON.stringify(items) : items,
      },
    }));
  };

  return (
    <section
      className={`w-full bg-secondary/35 ${sectionSpacing}`}
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className="mx-auto max-w-6xl text-left">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
              <InlineEditableText node={node} propKey="eyebrow" fallback="Layanan utama" />
            </p>
            <h2 className={`mt-3 font-[family-name:var(--font-heading)] font-extrabold leading-[1.12] tracking-[-0.035em] text-foreground ${titleSize}`}>
              <InlineEditableText node={node} propKey="sectionTitle" fallback={sectionTitle} multiline />
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            <InlineEditableText
              node={node}
              propKey="sectionSubtitle"
              fallback={sectionSubtitle}
              multiline
            />
          </p>
        </div>

        <div
          className="mt-9 grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}
        >
          {products.map((item, index) => (
            <Card
              key={item.id || item.name}
              className="group min-w-0 overflow-hidden border-border bg-card p-0 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow)]"
            >
              <div className="relative h-40 overflow-hidden bg-secondary">
                <InlineEditableImage
                  node={node}
                  imageKey="productsJson"
                  src={item.imageUrl}
                  alt={item.name}
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  emptyContent={
                    <div className="flex h-full w-full items-end bg-[radial-gradient(circle_at_18%_15%,var(--primary),transparent_55%)] p-4">
                      <span className="font-[family-name:var(--font-mono)] text-4xl font-black tracking-[-0.08em] text-primary-foreground/90">
                        0{index + 1}
                      </span>
                    </div>
                  }
                  onImageCommit={(value) => updateProduct(index, { imageUrl: value })}
                />
                {item.tag ? (
                  <Badge className="absolute left-3 top-3 border-0 bg-background/90 text-foreground shadow-sm backdrop-blur">
                    <InlineEditableText
                      node={node}
                      propKey="productsJson"
                      value={item.tag}
                      onCommit={(value) => updateProduct(index, { tag: value })}
                    />
                  </Badge>
                ) : null}
              </div>
              <div className={cardPadding}>
                <h3 className="text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  <InlineEditableText
                    node={node}
                    propKey="productsJson"
                    value={item.name}
                    onCommit={(value) => updateProduct(index, { name: value })}
                    multiline
                  />
                </h3>
                {item.description ? (
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    <InlineEditableText
                      node={node}
                      propKey="productsJson"
                      value={item.description}
                      onCommit={(value) => updateProduct(index, { description: value })}
                      multiline
                    />
                  </p>
                ) : null}
                {item.price ? (
                  <p className="mt-3 text-xs font-medium leading-5 text-muted-foreground">
                    <InlineEditableText
                      node={node}
                      propKey="productsJson"
                      value={item.price}
                      onCommit={(value) => updateProduct(index, { price: value })}
                      multiline
                    />
                  </p>
                ) : null}
                <InlineEditableLink
                  node={node}
                  propKey="productsJson"
                  urlKey="productsJson"
                  value={item.actionText || "Pelajari layanan"}
                  urlValue={item.actionUrl || "#"}
                  onCommit={(value) => updateProduct(index, { actionText: value })}
                  onUrlCommit={(value) => updateProduct(index, { actionUrl: value })}
                  className="mt-5"
                  linkClassName="inline-flex items-center gap-1.5 text-xs font-bold text-primary"
                >
                  <ArrowUpRight size={14} aria-hidden="true" />
                </InlineEditableLink>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
