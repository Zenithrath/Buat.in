"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { sanitizeUrl } from "@/lib/registry/shared";
import { SectionShell } from "@/components/preview/SectionShell";

export function FooterPreview({ node, theme }: { node: Node; theme: Theme }) {
  return (
    <SectionShell
      node={node}
      theme={theme}
      className="bi-footer bi-section"
      tag="footer"
    >
      <div className="bi-container bi-footer-grid">
        <div className="bi-footer-brand">
          <strong>{node.props.brandName || "Nama Brand"}</strong>
          <p>{node.props.tagline || ""}</p>
        </div>
        <nav className="bi-footer-links">
          {[1, 2, 3].map((i) => {
            const text = node.props[`link${i}Text`];
            if (!text) return null;
            return (
              <a key={i} href={sanitizeUrl(node.props[`link${i}Url`])}>
                {text}
              </a>
            );
          })}
        </nav>
      </div>
      <div className="bi-container bi-footer-bottom">
        <p>{node.props.copyright || "© 2026. Semua hak dilindungi."}</p>
      </div>
    </SectionShell>
  );
}