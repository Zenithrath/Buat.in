"use client";

import {
  createElement,
  type CSSProperties,
  useEffect,
  useState,
} from "react";
import type { Node, Theme } from "@/lib/schema/types";
import { getComponent } from "@/lib/registry";
import { propString } from "@/lib/registry/shared";
import { useBuilderStore } from "@/lib/store/project-store";
import { InlineEditableImage, InlineEditableText } from "@/components/preview/InlineEditable";
import { usePreviewEditing } from "@/components/preview/PreviewEditingContext";

type Attributes = Record<string, string>;

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

function attributes(node: Node): Attributes {
  const value = node.props.attributes;
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Attributes)
    : {};
}

function patchImportedNode(
  node: Node,
  updateNode: (id: string, updater: (current: Node) => Node) => void,
  patch: Record<string, unknown>,
  attributePatch: Attributes = {}
) {
  updateNode(node.id, (current) => ({
    ...current,
    props: {
      ...current.props,
      ...patch,
      attributes: {
        ...attributes(current),
        ...attributePatch,
      },
    },
  }));
}

function parseStyle(value: string | undefined): CSSProperties | undefined {
  if (!value) return undefined;
  const style: Record<string, string> = {};
  for (const declaration of value.split(";")) {
    const separator = declaration.indexOf(":");
    if (separator < 0) continue;
    const rawKey = declaration.slice(0, separator).trim();
    const rawValue = declaration.slice(separator + 1).trim();
    if (!rawKey || !rawValue) continue;
    if (rawKey.startsWith("--")) style[rawKey] = rawValue;
    else {
      const key = rawKey.replace(/-([a-z])/g, (_match, char: string) => char.toUpperCase());
      style[key] = rawValue;
    }
  }
  return style as CSSProperties;
}

function reactAttributeName(name: string) {
  const names: Record<string, string> = {
    class: "className",
    for: "htmlFor",
    tabindex: "tabIndex",
    colspan: "colSpan",
    rowspan: "rowSpan",
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    readonly: "readOnly",
    maxlength: "maxLength",
    minlength: "minLength",
    autofocus: "autoFocus",
    crossorigin: "crossOrigin",
    "fill-rule": "fillRule",
    "clip-rule": "clipRule",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
  };
  return names[name] ?? name;
}

function elementProps(
  rawAttributes: Attributes,
  node: Node,
  updateNode: (id: string, updater: (current: Node) => Node) => void,
  select: (id: string) => void,
  editing: boolean
) {
  const props: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(rawAttributes)) {
    if (["src", "alt", "href", "value", "style"].includes(name)) continue;
    if (name.startsWith("on")) continue;
    const key = reactAttributeName(name);
    if (["checked", "selected", "disabled", "required", "multiple", "autofocus"].includes(name)) {
      props[key] = value === "" || value === name || value === "true";
    } else {
      props[key] = value;
    }
  }
  if (rawAttributes.class) props.className = rawAttributes.class;
  if (rawAttributes.style) props.style = parseStyle(rawAttributes.style);
  props.onClick = (event: React.MouseEvent) => {
    if (node.props.tag === "a" || node.props.tag === "button") event.preventDefault();
    event.stopPropagation();
    select(node.id);
  };
  props.onPointerDown = (event: React.PointerEvent) => event.stopPropagation();
  if (node.props.tag === "form") {
    props.onSubmit = (event: React.FormEvent) => event.preventDefault();
  }
  if (editing && ["input", "textarea"].includes(String(node.props.tag))) {
    props.onBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.currentTarget.value;
      patchImportedNode(node, updateNode, { value }, { value });
    };
  }
  return props;
}

function ImportedNodeRenderer({ node, theme }: { node: Node; theme: Theme }) {
  const component = getComponent(node.componentType);
  if (!component) return null;
  const Renderer = component.previewRenderer;
  return <Renderer node={node} theme={theme} />;
}

export function ImportedTextPreview({ node }: { node: Node; theme: Theme }) {
  const updateNode = useBuilderStore((state) => state.updateNode);
  const editing = usePreviewEditing();
  const text = propString(node, "text");
  if (!editing || node.props.editable === false || text.trim().length === 0) return <>{text}</>;
  return (
    <InlineEditableText
      node={node}
      propKey="text"
      value={text}
      multiline
      onCommit={(next) =>
        updateNode(node.id, (current) => ({
          ...current,
          props: { ...current.props, text: next },
        }))
      }
    />
  );
}

export function ImportedElementPreview({ node, theme }: { node: Node; theme: Theme }) {
  const updateNode = useBuilderStore((state) => state.updateNode);
  const select = useBuilderStore((state) => state.select);
  const editing = usePreviewEditing();
  const rawAttributes = attributes(node);
  const tag = String(node.props.tag || "div").toLowerCase();
  const src = propString(node, "src") || rawAttributes.src || "";
  const alt = propString(node, "alt") || rawAttributes.alt || "";
  const href = propString(node, "href") || rawAttributes.href || "";
  const value = propString(node, "value") || rawAttributes.value || "";
  const children = node.children.map((child) => (
    <ImportedNodeRenderer key={child.id} node={child} theme={theme} />
  ));

  if (tag === "img") {
    return (
      <ImportedEditableImage
        node={node}
        src={src}
        alt={alt}
        className={rawAttributes.class}
        onImageCommit={(next) => patchImportedNode(node, updateNode, { src: next }, { src: next })}
        onAltCommit={(next) => patchImportedNode(node, updateNode, { alt: next }, { alt: next })}
      />
    );
  }

  const props = elementProps(rawAttributes, node, updateNode, select, editing);
  if (tag === "input" || tag === "textarea") {
    props.defaultValue = value;
    if (tag === "input" && rawAttributes.type === "checkbox") {
      props.defaultChecked = rawAttributes.checked === "checked" || rawAttributes.checked === "true";
    }
  }
  if (tag === "a") props.href = href || rawAttributes.href || "#";

  return VOID_TAGS.has(tag) || tag === "textarea"
    ? createElement(tag, props)
    : createElement(tag, props, children);
}

function ImportedEditableImage({
  node,
  src,
  alt,
  className,
  onImageCommit,
  onAltCommit,
}: {
  node: Node;
  src: string;
  alt: string;
  className?: string;
  onImageCommit: (value: string) => void;
  onAltCommit: (value: string) => void;
}) {
  return (
    <InlineEditableImage
      node={node}
      imageKey="src"
      altKey="alt"
      src={src}
      alt={alt}
      className={className}
      onImageCommit={onImageCommit}
      onAltCommit={onAltCommit}
    />
  );
}

function rewriteCssAssets(css: string, stylesheetUrl: string) {
  return css.replace(/url\((\s*["']?)([^)"']+?)(["']?\s*)\)/gi, (_match, left, rawUrl, right) => {
    const url = String(rawUrl).trim();
    if (/^(?:[a-z]+:|\/\/|data:|#)/i.test(url)) return `url(${left}${url}${right})`;
    try {
      const absolute = new URL(url, new URL(stylesheetUrl, window.location.origin)).toString();
      return `url(${left}${absolute}${right})`;
    } catch {
      return `url(${left}${url}${right})`;
    }
  });
}

function scopeCss(css: string) {
  return css.replace(/(^|})\s*([^@{}][^{}]*)\{/g, (_match, prefix, selectors) => {
    const scoped = String(selectors)
      .split(",")
      .map((selector) => {
        const trimmed = selector.trim();
        if (!trimmed) return trimmed;
        const bodyScoped = trimmed
          .replace(/\bhtml\b/g, ".bi-imported-page")
          .replace(/\bbody\b/g, ".bi-imported-page");
        return bodyScoped.includes(".bi-imported-page")
          ? bodyScoped
          : `.bi-imported-page ${bodyScoped}`;
      })
      .join(", ");
    return `${prefix}${scoped}{`;
  });
}

function ImportedStyles({ stylesheets, inlineStyles }: { stylesheets: string[]; inlineStyles: string[] }) {
  const [css, setCss] = useState("");
  useEffect(() => {
    let active = true;
    Promise.all(
      stylesheets.map(async (href) => {
        const response = await fetch(href);
        if (!response.ok) return "";
        return rewriteCssAssets(await response.text(), href);
      })
    )
      .then((values) => {
        if (active) setCss(scopeCss([...values, ...inlineStyles].join("\n")));
      })
      .catch(() => {
        if (active) setCss(inlineStyles.join("\n"));
      });
    return () => {
      active = false;
    };
  }, [inlineStyles, stylesheets]);
  return <style data-imported-template-style dangerouslySetInnerHTML={{ __html: css }} />;
}

export function ImportedPagePreview({ node, theme }: { node: Node; theme: Theme }) {
  const stylesheets = Array.isArray(node.props.stylesheets)
    ? (node.props.stylesheets as string[])
    : [];
  const inlineStyles = Array.isArray(node.props.inlineStyles)
    ? (node.props.inlineStyles as string[])
    : [];
  return (
    <div className="bi-imported-page" data-imported-source={propString(node, "sourcePath")}>
      <ImportedStyles stylesheets={stylesheets} inlineStyles={inlineStyles} />
      {node.children.map((child) => (
        <ImportedNodeRenderer key={child.id} node={child} theme={theme} />
      ))}
    </div>
  );
}
