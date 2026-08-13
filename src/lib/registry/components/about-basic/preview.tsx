"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";
import { SectionShell } from "@/components/preview/SectionShell";

export function AboutPreview({ node, theme }: { node: Node; theme: Theme }) {
  const stats = [1, 2, 3]
    .map((i) => ({
      value: node.props[`stat${i}Value`],
      label: node.props[`stat${i}Label`],
    }))
    .filter((s) => s.value || s.label);

  return (
    <SectionShell node={node} theme={theme}>
      <div className="bi-container bi-about">
        {node.props.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="bi-about-img"
            src={propString(node, "imageUrl")}
            alt={propString(node, "imageAlt") || "Tentang kami"}
          />
        ) : null}
        <div className="bi-about-content">
          {node.props.eyebrow ? (
            <p className="bi-eyebrow">{node.props.eyebrow}</p>
          ) : null}
          <h2 className="bi-title">{node.props.title || "Tentang Kami"}</h2>
          <p className="bi-about-text">
            {node.props.content ||
              "Ceritakan kisah, visi, dan nilai dari bisnis Anda di sini."}
          </p>
          {stats.length ? (
            <div className="bi-about-stats">
              {stats.map((s, idx) => (
                <div className="bi-about-stat" key={idx}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </SectionShell>
  );
}