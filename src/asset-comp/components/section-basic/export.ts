import type { ExportContext, ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { componentMap } from "@/lib/registry";
import { escapeHtml, propString } from "@/lib/registry/shared";

function copy(node: Node, key: string, fallback: string) {
  return propString(node, key).trim() || fallback;
}

function renderChildren(node: Node, ctx: ExportContext) {
  const css = new Set<string>();
  const js = new Set<string>();
  const html = (node.children ?? [])
    .map((child) => {
      const component = componentMap[child.componentType];
      if (!component) return "";
      const result = component.exportAdapter(child, ctx);
      if (result.css) css.add(result.css);
      if (result.js) js.add(result.js);
      return result.html;
    })
    .filter(Boolean)
    .join("\n");
  return { html, css: [...css], js: [...js] };
}

export function sectionBasicExport(node: Node, ctx: ExportContext): ExportResult {
  const heading = copy(node, "heading", "Judul section Anda");
  const paragraph = copy(
    node,
    "paragraph",
    "Tulis deskripsi singkat di sini, lalu seret komponen lain ke dalam section ini untuk memperkaya halaman."
  );
  const child = renderChildren(node, ctx);

  return {
    html: `<section class="bi-section-basic">
  <h2>${escapeHtml(heading)}</h2>
  <p>${escapeHtml(paragraph)}</p>
  ${child.html ? `<div class="bi-section-basic-children">${child.html}</div>` : ""}
</section>`,
    css: `.bi-section-basic{padding:3rem max(1.5rem,calc((100% - 72rem)/2));border-block:1px solid var(--bi-border);background:var(--bi-bg);color:var(--bi-fg);font-family:var(--bi-font-body)}.bi-section-basic>h2{margin:0;font:800 clamp(1.5rem,3vw,2.2rem)/1.1 var(--bi-font-heading);letter-spacing:-.055em}.bi-section-basic>p{max-width:38rem;margin:1rem 0 0;color:var(--bi-muted-fg);font-size:1rem;line-height:1.7}.bi-section-basic-children{display:flex;flex-direction:column;gap:2rem;margin-top:2.5rem}`,
    js: child.js.join("\n"),
  };
}
