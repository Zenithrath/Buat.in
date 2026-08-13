"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { sanitizeUrl } from "@/lib/registry/shared";
import { SectionShell } from "@/components/preview/SectionShell";

export function CtaPreview({ node, theme }: { node: Node; theme: Theme }) {
  return (
    <SectionShell node={node} theme={theme}>
      <div className="bi-container">
        <div className="bi-cta-card">
          <h2 className="bi-title">{node.props.title || "Ajakan bertindak"}</h2>
          <p className="bi-subtitle">
            {node.props.subtitle || "Tulis pesan ajakan Anda di sini."}
          </p>
          <div className="bi-cta-actions">
            <a
              className="bi-btn bi-btn-on-primary"
              href={sanitizeUrl(node.props.ctaUrl)}
            >
              {node.props.ctaText || "Hubungi Kami"}
            </a>
            {node.props.secondaryText ? (
              <a
                className="bi-btn bi-btn-on-primary-outline"
                href={sanitizeUrl(node.props.secondaryUrl)}
              >
                {node.props.secondaryText}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}