"use client";

import { ArrowUpRight } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import {
  projectTokenStyle,
  propString,
  themeTokenStyle,
} from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableLink, InlineEditableText } from "@/components/preview/InlineEditable";
import { useBuilderStore } from "@/lib/store/project-store";

interface FooterLink {
  label: string;
  url: string;
}

function text(value: unknown) {
  return value == null ? "" : String(value).trim();
}

function parseLinks(value: unknown): FooterLink[] {
  let parsed = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(parsed)) return [];
  return parsed.flatMap((entry): FooterLink[] => {
    if (!entry || typeof entry !== "object") return [];
    const link = entry as Record<string, unknown>;
    const label = text(link.label ?? link.text ?? link.name);
    if (!label) return [];
    return [{ label, url: text(link.url ?? link.href) || "#" }];
  });
}

function getLinks(node: Node): FooterLink[] {
  const direct = parseLinks(node.props.links);
  if (direct.length) return direct;
  const json = parseLinks(node.props.linksJson);
  if (json.length) return json;
  return Array.from({ length: 3 }, (_, index) => index + 1).flatMap((position) => {
    const label = propString(node, `link${position}Text`).trim();
    if (!label) return [];
    return [{ label, url: propString(node, `link${position}Url`).trim() || "#" }];
  });
}

function linkStorage(node: Node): { key: "links" | "linksJson"; items: Record<string, unknown>[] } {
  for (const key of ["links", "linksJson"] as const) {
    let parsed: unknown = node.props[key];
    if (typeof parsed === "string") {
      try {
        parsed = JSON.parse(parsed);
      } catch {
        parsed = null;
      }
    }
    if (Array.isArray(parsed)) {
      return {
        key,
        items: parsed.map((item) =>
          item && typeof item === "object" ? { ...(item as Record<string, unknown>) } : {}
        ),
      };
    }
  }

  return { key: "linksJson", items: getLinks(node).map((link) => ({ ...link })) };
}

export function FooterPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const updateNode = useBuilderStore((state) => state.updateNode);
  const previewDevice = usePreviewDevice();
  const isCanvasMobile = previewDevice === "mobile";
  const brandName = propString(node, "brandName").trim() || "Buat.in";
  const brandUrl = propString(node, "brandUrl").trim() || "#";
  const tagline =
    propString(node, "tagline").trim() ||
    "Membuat kehadiran digital yang jelas, hangat, dan siap bertumbuh.";
  const copyrightText =
    propString(node, "copyrightText").trim() ||
    propString(node, "copyright").trim() ||
    `© 2026 ${brandName}. Semua hak dilindungi.`;
  const links = getLinks(node);
  const sectionPadding =
    previewDevice === null ? "px-5 py-10 sm:px-8" : isCanvasMobile ? "px-5 py-10" : "px-8 py-10";
  const linksAlignment =
    previewDevice === null
      ? "flex min-w-[190px] flex-wrap items-center justify-start gap-x-5 gap-y-3 pt-1 sm:justify-end"
      : isCanvasMobile
        ? "flex min-w-[190px] flex-wrap items-center justify-start gap-x-5 gap-y-3 pt-1"
        : "flex min-w-[190px] flex-wrap items-center justify-end gap-x-5 gap-y-3 pt-1";

  const updateLink = (index: number, patch: Record<string, string>) => {
    const storage = linkStorage(node);
    const items = [...storage.items];
    items[index] = { ...(items[index] ?? {}), ...patch };
    updateNode(node.id, (current) => ({
      ...current,
      props: { ...current.props, [storage.key]: JSON.stringify(items) },
    }));
  };

  return (
    <footer
      className={`w-full border-t border-border bg-card ${sectionPadding}`}
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-8 text-left">
          <div className="min-w-[190px] max-w-sm">
            <InlineEditableLink
              node={node}
              propKey="brandName"
              urlKey="brandUrl"
              value={brandName}
              urlValue={brandUrl}
              linkClassName="inline-flex items-center gap-2 text-lg font-extrabold tracking-[-0.035em] text-foreground"
            >
              <span className="-order-1 grid size-7 place-items-center rounded-[var(--radius)] bg-primary text-xs text-primary-foreground">
                B
              </span>
            </InlineEditableLink>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              <InlineEditableText node={node} propKey="tagline" fallback={tagline} multiline />
            </p>
          </div>
          {links.length ? (
            <nav className={linksAlignment} aria-label="Footer">
              {links.map((link, index) => (
                <InlineEditableLink
                  key={`${link.label}-${link.url}`}
                  node={node}
                  propKey="linksJson"
                  urlKey="linksJson"
                  value={link.label}
                  urlValue={link.url}
                  onCommit={(value) => updateLink(index, { label: value })}
                  onUrlCommit={(value) => updateLink(index, { url: value })}
                  linkClassName="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  <ArrowUpRight size={13} aria-hidden="true" />
                </InlineEditableLink>
              ))}
            </nav>
          ) : null}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-[11px] text-muted-foreground">
          <p>
            <InlineEditableText node={node} propKey="copyrightText" fallback={copyrightText} />
          </p>
          <span className="font-[family-name:var(--font-mono)] uppercase tracking-[0.12em]">
            <InlineEditableText node={node} propKey="footerNote" fallback="Built with care" />
          </span>
        </div>
      </div>
    </footer>
  );
}
