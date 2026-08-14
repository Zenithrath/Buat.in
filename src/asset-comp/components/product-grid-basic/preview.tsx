"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { ShoppingCart } from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  price: string;
  tag?: string;
}

export function ProductGridPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const sectionTitle = propString(node, "sectionTitle") || "Produk Unggulan";
  const sectionSubtitle = propString(node, "sectionSubtitle") || "Pilihan produk terbaik";

  let products: ProductItem[] = [];
  try {
    products = JSON.parse(propString(node, "productsJson"));
  } catch {
    products = [
      { id: "p1", name: "Kemeja Casual Premium", price: "Rp 249.000", tag: "Terlaris" },
      { id: "p2", name: "Celana Chino Slim", price: "Rp 299.000", tag: "Baru" },
      { id: "p3", name: "Jaket Denim Classic", price: "Rp 399.000", tag: "Diskon" },
    ];
  }

  return (
    <section
      className="w-full px-6 py-16 bg-muted/20 transition-colors"
      style={themeTokenStyle(tokens)}
    >
      <div className="mx-auto max-w-6xl text-center mb-12">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {sectionTitle}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{sectionSubtitle}</p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <div
            key={item.id || item.name}
            className="group flex flex-col rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative mb-4 flex h-48 w-full items-center justify-center rounded-lg bg-muted/60 text-muted-foreground font-mono text-xs font-bold">
              [ Gambar {item.name} ]
              {item.tag ? (
                <span className="absolute top-2.5 right-2.5 rounded bg-primary px-2 py-0.5 font-sans text-[10px] font-bold text-primary-foreground">
                  {item.tag}
                </span>
              ) : null}
            </div>
            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-sm font-extrabold text-foreground">
                {item.price}
              </span>
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
              >
                <ShoppingCart size={13} /> Beli
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
