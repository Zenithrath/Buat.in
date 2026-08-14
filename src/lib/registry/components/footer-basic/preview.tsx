"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
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
          <strong>
            <InlineEditableText node={node} propKey="brandName" fallback="Nama Brand" />
          </strong>
          <p>
            <InlineEditableText node={node} propKey="tagline" multiline />
          </p>
        </div>
        <nav className="bi-footer-links">
          {[1, 2, 3].map((i) => {
            const text = node.props[`link${i}Text`];
            if (!text) return null;
            return (
              <InlineEditableLink
                key={i}
                node={node}
                propKey={`link${i}Text`}
                urlKey={`link${i}Url`}
              />
            );
          })}
        </nav>
      </div>
      <div className="bi-container bi-footer-bottom">
        <p>
          <InlineEditableText
            node={node}
            propKey="copyright"
            fallback="© 2026. Semua hak dilindungi."
          />
        </p>
      </div>
    </SectionShell>
  );
}
