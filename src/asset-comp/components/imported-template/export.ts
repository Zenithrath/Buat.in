import type { ExportContext, ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { componentMap } from "@/lib/registry";
import { escapeHtml } from "@/lib/registry/shared";

function attrs(node: Node) {
  const raw = node.props.attributes;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return "";
  return Object.entries(raw as Record<string, unknown>)
    .filter(([name]) => !name.startsWith("on"))
    .map(([name, value]) => ` ${name}="${escapeHtml(String(value ?? ""))}"`)
    .join("");
}

function children(node: Node, ctx: ExportContext) {
  return (node.children ?? [])
    .map((child) => componentMap[child.componentType]?.exportAdapter(child, ctx).html ?? "")
    .join("");
}

const VOID_TAGS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);

export function importedTextExport(node: Node): ExportResult {
  return { html: escapeHtml(String(node.props.text ?? "")), css: "" };
}

export function importedElementExport(node: Node, ctx: ExportContext): ExportResult {
  const tag = String(node.props.tag || "div").toLowerCase();
  const content = children(node, ctx);
  const html = VOID_TAGS.has(tag)
    ? `<${tag}${attrs(node)}>`
    : `<${tag}${attrs(node)}>${content}</${tag}>`;
  return { html, css: "" };
}

export function importedPageExport(node: Node, ctx: ExportContext): ExportResult {
  const stylesheets = Array.isArray(node.props.stylesheets)
    ? (node.props.stylesheets as string[])
        .map((href) => `<link rel="stylesheet" href="${escapeHtml(href)}">`)
        .join("\n")
    : "";
  const inlineStyles = Array.isArray(node.props.inlineStyles)
    ? `<style>${(node.props.inlineStyles as string[]).join("\n")}</style>`
    : "";
  return {
    html: `${stylesheets}${inlineStyles}${children(node, ctx)}`,
    css: "",
  };
}
