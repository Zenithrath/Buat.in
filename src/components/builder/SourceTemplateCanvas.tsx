"use client";

import { useCallback, useEffect, useRef } from "react";
import { getTemplateSource } from "@/templates";
import type { Device, ProjectDocument, SourceTemplateEdit } from "@/lib/schema/types";
import { useBuilderStore } from "@/lib/store/project-store";
import { cn } from "@/lib/utils";

const DEVICE_WIDTHS: Record<Device, number> = {
  desktop: 1440,
  tablet: 768,
  mobile: 390,
};

function elementSelector(element: Element): string {
  const parts: string[] = [];
  let current: Element | null = element;
  while (current && current.tagName.toLowerCase() !== "html") {
    const tag = current.tagName.toLowerCase();
    const siblings = current.parentElement
      ? Array.from(current.parentElement.children).filter((child) => child.tagName.toLowerCase() === tag)
      : [];
    const index = siblings.indexOf(current) + 1;
    parts.unshift(`${tag}:nth-of-type(${index})`);
    current = current.parentElement;
  }
  return parts.join(" > ");
}

function applyEdit(element: Element, edit: SourceTemplateEdit | undefined) {
  if (!edit) return;
  if (typeof edit.text === "string") element.textContent = edit.text;
  if (typeof edit.src === "string") element.setAttribute("src", edit.src);
  if (typeof edit.href === "string") element.setAttribute("href", edit.href);
  if (typeof edit.alt === "string") element.setAttribute("alt", edit.alt);
  if (
    typeof edit.value === "string" &&
    ["input", "textarea"].includes(element.tagName.toLowerCase())
  ) {
    (element as HTMLInputElement | HTMLTextAreaElement).value = edit.value;
  }
}

export function SourceTemplateCanvas({
  document,
  device,
  zoom,
}: {
  document: ProjectDocument;
  device: Device;
  zoom: number;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const updateSourceEdit = useBuilderStore((state) => state.updateSourceEdit);
  const source = document.sourceTemplateId ? getTemplateSource(document.sourceTemplateId) : undefined;
  const width = DEVICE_WIDTHS[device];

  const installEditor = useCallback(() => {
    const frameDocument = iframeRef.current?.contentDocument;
    if (!frameDocument) return;
    const frameBody = frameDocument.body;
    if (!frameBody) return;

    const editableElements = Array.from(frameBody.querySelectorAll("*"))
      .filter((element) => {
        const text = (element.textContent ?? "").trim();
        const hasElementChild = element.children.length > 0;
        const tag = element.tagName.toLowerCase();
        return text.length > 0 && !hasElementChild && !["script", "style", "svg"].includes(tag);
      });

    const cleanups: (() => void)[] = [];
    for (const element of editableElements) {
      const selector = elementSelector(element);
      const edit = document.sourceEdits?.[selector];
      applyEdit(element, edit);
      element.setAttribute("contenteditable", "true");
      element.setAttribute("data-buat-editable", "true");
      element.setAttribute("title", "Klik untuk mengedit teks");

      const onBlur = () => updateSourceEdit(selector, { text: element.textContent ?? "" });
      element.addEventListener("blur", onBlur);
      cleanups.push(() => element.removeEventListener("blur", onBlur));
    }

    for (const link of Array.from(frameDocument.querySelectorAll("a"))) {
      const selector = elementSelector(link);
      const onClick = (event: Event) => event.preventDefault();
      const onContextMenu = (event: Event) => {
        event.preventDefault();
        const next = window.prompt("URL link", link.getAttribute("href") ?? "");
        if (next !== null) {
          link.setAttribute("href", next);
          updateSourceEdit(selector, { href: next });
        }
      };
      link.addEventListener("click", onClick);
      link.addEventListener("contextmenu", onContextMenu);
      cleanups.push(() => {
        link.removeEventListener("click", onClick);
        link.removeEventListener("contextmenu", onContextMenu);
      });
    }

    for (const image of Array.from(frameDocument.querySelectorAll("img"))) {
      const selector = elementSelector(image);
      applyEdit(image, document.sourceEdits?.[selector]);
      image.setAttribute("title", "Double-click untuk mengganti URL gambar · klik kanan untuk alt text");
      const onDoubleClick = (event: Event) => {
        event.preventDefault();
        const next = window.prompt("URL gambar baru", image.getAttribute("src") ?? "");
        if (!next) return;
        image.setAttribute("src", next);
        updateSourceEdit(selector, { src: next });
      };
      const onContextMenu = (event: Event) => {
        event.preventDefault();
        const next = window.prompt("Alt text gambar", image.getAttribute("alt") ?? "");
        if (next !== null) {
          image.setAttribute("alt", next);
          updateSourceEdit(selector, { alt: next });
        }
      };
      image.addEventListener("dblclick", onDoubleClick);
      image.addEventListener("contextmenu", onContextMenu);
      cleanups.push(() => {
        image.removeEventListener("dblclick", onDoubleClick);
        image.removeEventListener("contextmenu", onContextMenu);
      });
    }

    for (const input of Array.from(frameDocument.querySelectorAll("input, textarea"))) {
      const selector = elementSelector(input);
      applyEdit(input, document.sourceEdits?.[selector]);
      input.setAttribute("title", "Input editable");
      const onBlur = () => updateSourceEdit(selector, { value: (input as HTMLInputElement | HTMLTextAreaElement).value });
      input.addEventListener("blur", onBlur);
      cleanups.push(() => input.removeEventListener("blur", onBlur));
    }

    const style = frameDocument.createElement("style");
    style.textContent = `[data-buat-editable="true"]:hover { outline: 2px solid #3454D1 !important; outline-offset: 3px; cursor: text; } img:hover { outline: 2px solid #3454D1 !important; outline-offset: 3px; cursor: pointer; }`;
    frameDocument.head.appendChild(style);
    cleanups.push(() => style.remove());

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [document.sourceEdits, updateSourceEdit]);

  useEffect(() => installEditor(), [installEditor]);

  if (!source) return null;

  return (
    <div
      className="flex min-w-0 flex-1 overflow-auto bg-muted/20 p-10"
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className={cn("mx-auto h-fit shrink-0 overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/25 ring-1 ring-border")}
        style={{ width: width * zoom }}
      >
        <iframe
          ref={iframeRef}
          title="Template source editor"
          src={`/api/template-source/${document.sourceTemplateId}/${source.entry}`}
          onLoad={installEditor}
          className="block border-0"
          style={{
            width,
            height: 1400,
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            marginBottom: -1400 * (1 - zoom),
          }}
        />
      </div>
    </div>
  );
}
