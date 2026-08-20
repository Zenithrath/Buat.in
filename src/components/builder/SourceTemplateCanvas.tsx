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

    const editableElements = Array.from(
      frameDocument.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,button,li,blockquote,label")
    ).filter((element) => (element.textContent ?? "").trim().length > 0);

    const cleanups: (() => void)[] = [];
    for (const element of editableElements) {
      const selector = elementSelector(element);
      const edit = document.sourceEdits?.[selector];
      applyEdit(element, edit);
      element.setAttribute("contenteditable", "true");
      element.setAttribute("data-buat-editable", "true");
      element.setAttribute("title", "Klik untuk mengedit teks");

      const onBlur = () => updateSourceEdit(selector, { text: element.textContent ?? "" });
      const onClick = (event: Event) => event.preventDefault();
      element.addEventListener("blur", onBlur);
      element.addEventListener("click", onClick);
      cleanups.push(() => {
        element.removeEventListener("blur", onBlur);
        element.removeEventListener("click", onClick);
      });
    }

    for (const image of Array.from(frameDocument.querySelectorAll("img"))) {
      const selector = elementSelector(image);
      applyEdit(image, document.sourceEdits?.[selector]);
      image.setAttribute("title", "Double-click untuk mengganti URL gambar");
      const onDoubleClick = (event: Event) => {
        event.preventDefault();
        const next = window.prompt("URL gambar baru", image.getAttribute("src") ?? "");
        if (!next) return;
        image.setAttribute("src", next);
        updateSourceEdit(selector, { src: next });
      };
      image.addEventListener("dblclick", onDoubleClick);
      cleanups.push(() => image.removeEventListener("dblclick", onDoubleClick));
    }

    const style = frameDocument.createElement("style");
    style.textContent = `[data-buat-editable="true"]:hover { outline: 2px solid #c9a227 !important; outline-offset: 3px; cursor: text; } img:hover { outline: 2px solid #c9a227 !important; outline-offset: 3px; cursor: pointer; }`;
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
