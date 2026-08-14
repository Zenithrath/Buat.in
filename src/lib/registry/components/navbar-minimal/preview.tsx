"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { SectionShell } from "@/components/preview/SectionShell";

function NavLinks({ node }: { node: Node }) {
  return (
    <nav className="bi-nav-links">
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
  );
}

export function NavbarPreview({ node, theme }: { node: Node; theme: Theme }) {
  const [open, setOpen] = useState(false);
  const logo = node.props.logoText || "Logo";
  const ctaText = node.props.ctaText;
  const ctaUrl = node.props.ctaUrl;

  return (
    <SectionShell
      node={node}
      theme={theme}
      className="bi-nav"
      tag="header"
      data={{ "nav-open": String(open) }}
    >
      <div className="bi-container bi-nav-inner" style={{ paddingInline: 0 }}>
        <span className="bi-nav-logo">
          <span className="bi-nav-logo-dot" />
          <InlineEditableText node={node} propKey="logoText" fallback={logo} />
        </span>
        <NavLinks node={node} />
        <div className="bi-nav-actions">
          {ctaText ? (
            <InlineEditableLink
              node={node}
              propKey="ctaText"
              urlKey="ctaUrl"
              href={String(ctaUrl ?? "#")}
              linkClassName="bi-btn bi-btn-primary bi-nav-cta"
            />
          ) : null}
          <button
            type="button"
            className="bi-nav-toggle"
            aria-label="Buka menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </SectionShell>
  );
}
