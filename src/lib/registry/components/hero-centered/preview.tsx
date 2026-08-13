"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { propString, sanitizeUrl } from "@/lib/registry/shared";
import { SectionShell } from "@/components/preview/SectionShell";

export function HeroPreview({ node, theme }: { node: Node; theme: Theme }) {
  const hasImage = Boolean(node.props.imageUrl);

  return (
    <SectionShell node={node} theme={theme}>
      <div className="bi-container">
        {node.props.eyebrow ? (
          <p className="bi-eyebrow">{node.props.eyebrow}</p>
        ) : null}
        <h1 className="bi-title bi-hero-title">
          {node.props.title || "Judul hero Anda"}
        </h1>
        <p className="bi-subtitle bi-hero-subtitle">
          {node.props.subtitle ||
            "Subjudul singkat yang menjelaskan nilai utama Anda."}
        </p>
        <div className="bi-hero-actions">
          {node.props.ctaText ? (
            <a
              className="bi-btn bi-btn-primary"
              href={sanitizeUrl(node.props.ctaUrl)}
            >
              {node.props.ctaText}
            </a>
          ) : null}
          {node.props.secondaryText ? (
            <a
              className="bi-btn bi-btn-outline"
              href={sanitizeUrl(node.props.secondaryUrl)}
            >
              {node.props.secondaryText}
            </a>
          ) : null}
        </div>
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="bi-hero-image"
            src={propString(node, "imageUrl")}
            alt={propString(node, "imageAlt") || "Gambar hero"}
          />
        ) : null}
      </div>
    </SectionShell>
  );
}