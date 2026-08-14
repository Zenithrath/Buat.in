"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { SectionShell } from "@/components/preview/SectionShell";

export function CtaPreview({ node, theme }: { node: Node; theme: Theme }) {
  return (
    <SectionShell node={node} theme={theme}>
      <div className="bi-container">
        <div className="bi-cta-card">
          <h2 className="bi-title">
            <InlineEditableText node={node} propKey="title" fallback="Ajakan bertindak" multiline />
          </h2>
          <p className="bi-subtitle">
            <InlineEditableText
              node={node}
              propKey="subtitle"
              fallback="Tulis pesan ajakan Anda di sini."
              multiline
            />
          </p>
          <div className="bi-cta-actions">
            <InlineEditableLink
              node={node}
              propKey="ctaText"
              urlKey="ctaUrl"
              fallback="Hubungi Kami"
              linkClassName="bi-btn bi-btn-on-primary"
            />
            {node.props.secondaryText ? (
              <InlineEditableLink
                node={node}
                propKey="secondaryText"
                urlKey="secondaryUrl"
                linkClassName="bi-btn bi-btn-on-primary-outline"
              />
            ) : null}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
