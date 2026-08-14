"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";
import { InlineEditableImage, InlineEditableText } from "@/components/preview/InlineEditable";
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
          <InlineEditableImage
            node={node}
            imageKey="imageUrl"
            altKey="imageAlt"
            className="bi-about-img"
            src={propString(node, "imageUrl")}
            alt={propString(node, "imageAlt") || "Tentang kami"}
          />
        ) : null}
        <div className="bi-about-content">
          {node.props.eyebrow ? (
            <p className="bi-eyebrow">
              <InlineEditableText node={node} propKey="eyebrow" />
            </p>
          ) : null}
          <h2 className="bi-title">
            <InlineEditableText node={node} propKey="title" fallback="Tentang Kami" multiline />
          </h2>
          <p className="bi-about-text">
            <InlineEditableText
              node={node}
              propKey="content"
              fallback="Ceritakan kisah, visi, dan nilai dari bisnis Anda di sini."
              multiline
            />
          </p>
          {stats.length ? (
            <div className="bi-about-stats">
              {stats.map((s, idx) => (
                <div className="bi-about-stat" key={idx}>
                  <strong>
                    <InlineEditableText node={node} propKey={`stat${idx + 1}Value`} />
                  </strong>
                  <span>
                    <InlineEditableText node={node} propKey={`stat${idx + 1}Label`} />
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </SectionShell>
  );
}
