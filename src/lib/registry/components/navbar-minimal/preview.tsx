"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { sanitizeUrl } from "@/lib/registry/shared";
import { SectionShell } from "@/components/preview/SectionShell";

function NavLinks({ node }: { node: Node }) {
  return (
    <nav className="bi-nav-links">
      {[1, 2, 3].map((i) => {
        const text = node.props[`link${i}Text`];
        const url = node.props[`link${i}Url`];
        if (!text) return null;
        return (
          <a key={i} href={sanitizeUrl(url)}>
            {text}
          </a>
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
        <a className="bi-nav-logo" href="#">
          <span className="bi-nav-logo-dot" />
          {logo}
        </a>
        <NavLinks node={node} />
        <div className="bi-nav-actions">
          {ctaText ? (
            <a
              className="bi-btn bi-btn-primary bi-nav-cta"
              href={sanitizeUrl(ctaUrl)}
            >
              {ctaText}
            </a>
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