"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";
import { SectionShell } from "@/components/preview/SectionShell";

export function ProductGridPreview({ node, theme }: { node: Node; theme: Theme }) {
  const products = [1, 2, 3, 4]
    .map((i) => ({
      name: node.props[`product${i}Name`],
      price: node.props[`product${i}Price`],
      imageUrl: node.props[`product${i}ImageUrl`],
    }))
    .filter((p) => p.name || p.price || p.imageUrl);

  return (
    <SectionShell node={node} theme={theme}>
      <div className="bi-container">
        <h2 className="bi-title bi-product-grid-title">
          {node.props.title || "Produk Unggulan"}
        </h2>
        <p className="bi-subtitle bi-product-grid-subtitle">
          {node.props.subtitle || ""}
        </p>
        <div className="bi-product-grid">
          {products.map((p, idx) => (
            <article className="bi-card bi-product-card" key={idx}>
              {p.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={propString(node, `product${idx + 1}ImageUrl`)}
                  alt={String(p.name || "Produk")}
                  loading="lazy"
                />
              ) : null}
              <h3>{p.name || "Nama Produk"}</h3>
              <p className="bi-product-price">{p.price || ""}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}