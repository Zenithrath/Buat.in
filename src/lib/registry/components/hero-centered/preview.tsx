"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";
import {
  InlineEditableImage,
  InlineEditableLink,
  InlineEditableText,
} from "@/components/preview/InlineEditable";
import { SectionShell } from "@/components/preview/SectionShell";

export function HeroPreview({ node, theme }: { node: Node; theme: Theme }) {
  const hasImage = Boolean(node.props.imageUrl);

  return (
    <SectionShell node={node} theme={theme}>
      <div className="bi-container">
        {node.props.eyebrow ? (
          <p className="bi-eyebrow">
            <InlineEditableText node={node} propKey="eyebrow" />
          </p>
        ) : null}
        <h1 className="bi-title bi-hero-title">
          <InlineEditableText
            node={node}
            propKey="title"
            fallback="Judul hero Anda"
            multiline
          />
        </h1>
        <p className="bi-subtitle bi-hero-subtitle">
          <InlineEditableText
            node={node}
            propKey="subtitle"
            fallback="Subjudul singkat yang menjelaskan nilai utama Anda."
            multiline
          />
        </p>
        <div className="bi-hero-actions">
          {node.props.ctaText ? (
            <InlineEditableLink
              node={node}
              propKey="ctaText"
              urlKey="ctaUrl"
              linkClassName="bi-btn bi-btn-primary"
            />
          ) : null}
          {node.props.secondaryText ? (
            <InlineEditableLink
              node={node}
              propKey="secondaryText"
              urlKey="secondaryUrl"
              linkClassName="bi-btn bi-btn-outline"
            />
          ) : null}
        </div>
        {hasImage ? (
          <InlineEditableImage
            node={node}
            imageKey="imageUrl"
            altKey="imageAlt"
            className="bi-hero-image"
            src={propString(node, "imageUrl")}
            alt={propString(node, "imageAlt") || "Gambar hero"}
          />
        ) : null}
      </div>
    </SectionShell>
  );
}
