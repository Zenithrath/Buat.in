"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Check, ImageIcon, Link2, X } from "lucide-react";
import type { Node } from "@/lib/schema/types";
import { sanitizeUrl } from "@/lib/registry/shared";
import { useBuilderStore } from "@/lib/store/project-store";
import { cn } from "@/lib/utils";
import { usePreviewEditing } from "./PreviewEditingContext";

type EditableProps = {
  node: Node;
  propKey: string;
  fallback?: string;
  className?: string;
  multiline?: boolean;
  /** Lets repeaters commit one visible item without exposing its JSON storage. */
  value?: string;
  onCommit?: (value: string) => void;
};

function valueFor(node: Node, propKey: string, fallback = "") {
  const value = node.props[propKey];
  return value === undefined || value === null || value === ""
    ? fallback
    : String(value);
}

function updateNodeProp(
  nodeId: string,
  propKey: string,
  value: string,
  updateNode: (id: string, updater: (node: Node) => Node) => void
) {
  updateNode(nodeId, (current) => ({
    ...current,
    props: { ...current.props, [propKey]: value },
  }));
}

/**
 * A deliberately tiny content editor for canvas copy.  It edits plain text
 * only, so pasted markup cannot accidentally change a customer's layout.
 */
export function InlineEditableText({
  node,
  propKey,
  fallback = "",
  className,
  multiline = false,
  value: valueOverride,
  onCommit: onValueCommit,
}: EditableProps) {
  const editingEnabled = usePreviewEditing();
  const updateNode = useBuilderStore((state) => state.updateNode);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [draft, setDraft] = useState(() => valueOverride ?? valueFor(node, propKey, fallback));

  const value = valueOverride ?? valueFor(node, propKey, fallback);

  useEffect(() => {
    if (elementRef.current !== document.activeElement) {
      setDraft(value);
    }
  }, [value]);

  if (!editingEnabled) {
    return <>{value}</>;
  }

  const commit = () => {
    const next = elementRef.current?.innerText.replace(/\n+$/g, "") ?? draft;
    setDraft(next);
    if (next !== value) {
      if (onValueCommit) onValueCommit(next);
      else updateNodeProp(node.id, propKey, next, updateNode);
    }
  };

  const cancel = () => {
    setDraft(value);
    if (elementRef.current) elementRef.current.textContent = value;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      cancel();
      event.currentTarget.blur();
      return;
    }
    if (event.key === "Enter" && !multiline && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.blur();
    }
  };

  return (
    <span
      ref={elementRef}
      data-inline-edit="text"
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-label="Klik untuk mengubah teks"
      title="Klik untuk mengubah teks"
      className={cn(
        "bi-inline-editable inline-block min-w-[0.45em] max-w-full select-text outline-none transition-[box-shadow,background-color]",
        "hover:rounded-sm hover:bg-[color-mix(in_srgb,var(--bi-primary)_10%,transparent)] hover:ring-1 hover:ring-[color-mix(in_srgb,var(--bi-primary)_62%,transparent)]",
        "focus:rounded-sm focus:bg-[color-mix(in_srgb,var(--bi-primary)_12%,transparent)] focus:ring-2 focus:ring-[var(--bi-primary)]",
        multiline && "whitespace-pre-wrap",
        className
      )}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.focus();
      }}
      onDoubleClick={(event) => event.stopPropagation()}
      onInput={(event) => setDraft(event.currentTarget.innerText)}
      onBlur={commit}
      onKeyDown={handleKeyDown}
    >
      {draft}
    </span>
  );
}

type InlineLinkProps = EditableProps & {
  urlKey: string;
  href?: string;
  linkClassName?: string;
  /** For icon-only links where the editable label remains available to assistive tech. */
  textClassName?: string;
  ariaLabel?: string;
  children?: ReactNode;
  urlValue?: string;
  onUrlCommit?: (value: string) => void;
};

/**
 * Keeps the public link intact in preview, while the builder gets a subtle
 * hover affordance for both the visible label and its destination.
 */
export function InlineEditableLink({
  node,
  propKey,
  urlKey,
  fallback = "",
  href,
  className,
  linkClassName,
  textClassName,
  ariaLabel,
  multiline,
  value: textValue,
  onCommit: onTextCommit,
  urlValue,
  onUrlCommit,
  children,
}: InlineLinkProps) {
  const editingEnabled = usePreviewEditing();
  const updateNode = useBuilderStore((state) => state.updateNode);
  const [showDestination, setShowDestination] = useState(false);
  const [destination, setDestination] = useState(() => urlValue ?? valueFor(node, urlKey, href ?? "#"));
  const text = textValue ?? valueFor(node, propKey, fallback);
  const url = urlValue ?? valueFor(node, urlKey, href ?? "#");

  if (!editingEnabled) {
    return (
      <a className={linkClassName} href={sanitizeUrl(url)} aria-label={ariaLabel}>
        {textClassName ? <span className={textClassName}>{text}</span> : text}
        {children}
      </a>
    );
  }

  const saveDestination = () => {
    const next = destination.trim() || "#";
    if (next !== url) {
      if (onUrlCommit) onUrlCommit(next);
      else updateNodeProp(node.id, urlKey, next, updateNode);
    }
    setShowDestination(false);
  };

  return (
    <span
      className={cn("group/inline-link bi-inline-link relative inline-flex max-w-full", className)}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <a
        className={linkClassName}
        href={sanitizeUrl(url)}
        aria-label={ariaLabel}
        onClick={(event) => event.preventDefault()}
      >
        <InlineEditableText
          node={node}
          propKey={propKey}
          fallback={fallback}
          multiline={multiline}
          value={textValue}
          onCommit={onTextCommit}
          className={textClassName}
        />
        {children}
      </a>
      <button
        type="button"
        className="bi-inline-link-control absolute -right-2 -top-2 z-20 grid size-5 place-items-center rounded-full border border-[var(--bi-border)] bg-[var(--bi-card)] text-[var(--bi-primary)] opacity-0 shadow-sm transition-opacity group-hover/inline-link:opacity-100 focus-visible:opacity-100"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setDestination(url);
          setShowDestination((open) => !open);
        }}
        aria-label="Ubah tujuan tautan"
        title="Ubah tujuan tautan"
      >
        <Link2 size={11} />
      </button>
      {showDestination ? (
        <form
          className="absolute left-0 top-[calc(100%+0.6rem)] z-50 flex w-64 flex-col gap-2 rounded-lg border border-[var(--bi-border)] bg-[var(--bi-card)] p-2.5 text-left font-sans shadow-xl"
          onSubmit={(event) => {
            event.preventDefault();
            saveDestination();
          }}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
        >
          <label className="text-[11px] font-semibold text-[var(--bi-fg)]">
            Tujuan tautan
          </label>
          <input
            autoFocus
            className="h-8 rounded-md border border-[var(--bi-input)] bg-[var(--bi-bg)] px-2 text-xs text-[var(--bi-fg)] outline-none focus:ring-2 focus:ring-[var(--bi-primary)]"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="https://... atau #bagian"
          />
          <div className="flex justify-end gap-1">
            <button
              type="button"
              className="grid size-7 place-items-center rounded-md text-[var(--bi-muted-fg)] hover:bg-[var(--bi-muted)]"
              onClick={() => setShowDestination(false)}
              aria-label="Batal"
              title="Batal"
            >
              <X size={14} />
            </button>
            <button
              type="submit"
              className="grid size-7 place-items-center rounded-md bg-[var(--bi-primary)] text-[var(--bi-primary-fg)]"
              aria-label="Simpan tautan"
              title="Simpan tautan"
            >
              <Check size={14} />
            </button>
          </div>
        </form>
      ) : null}
    </span>
  );
}

type InlineImageProps = {
  node: Node;
  imageKey: string;
  altKey?: string;
  src: string;
  alt: string;
  className?: string;
  /** Lets image-based cards keep the editor wrapper aligned to their media box. */
  wrapperClassName?: string;
  /** Visual fallback remains editable even before an image URL exists. */
  emptyClassName?: string;
  emptyContent?: ReactNode;
  loading?: "eager" | "lazy";
  onImageCommit?: (value: string) => void;
  onAltCommit?: (value: string) => void;
};

/** Direct image editing for canvas: choose a source and accessible label in a
 * small visual popover instead of sending people into a technical inspector. */
export function InlineEditableImage({
  node,
  imageKey,
  altKey,
  src,
  alt,
  className,
  wrapperClassName,
  emptyClassName,
  emptyContent,
  loading,
  onImageCommit,
  onAltCommit,
}: InlineImageProps) {
  const editingEnabled = usePreviewEditing();
  const updateNode = useBuilderStore((state) => state.updateNode);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(src);
  const [imageAlt, setImageAlt] = useState(alt);

  if (!editingEnabled) {
    if (!src && emptyContent) return <>{emptyContent}</>;
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={className} src={src} alt={alt} loading={loading} />;
  }

  const save = () => {
    const nextImage = imageUrl.trim();
    const nextAlt = imageAlt.trim();
    if (onImageCommit || onAltCommit) {
      onImageCommit?.(nextImage);
      onAltCommit?.(nextAlt);
    } else {
      updateNode(node.id, (current) => ({
        ...current,
        props: {
          ...current.props,
          [imageKey]: nextImage,
          ...(altKey ? { [altKey]: nextAlt } : {}),
        },
      }));
    }
    setOpen(false);
  };

  const openEditor = () => {
    setImageUrl(src);
    setImageAlt(alt);
    setOpen(true);
  };

  return (
    <span
      className={cn("group/inline-image relative block", wrapperClassName)}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={cn(className, "cursor-pointer transition-opacity hover:opacity-90")}
          src={src}
          alt={alt}
          loading={loading}
          draggable={false}
          onClick={openEditor}
          title="Klik untuk mengganti gambar"
        />
      ) : (
        <div
          role="button"
          tabIndex={0}
          className={cn(
            className,
            emptyClassName,
            "cursor-pointer transition-opacity hover:opacity-90"
          )}
          onClick={openEditor}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openEditor();
            }
          }}
          title="Klik untuk menambahkan gambar"
        >
          {emptyContent ?? (
            <span className="flex h-full min-h-32 items-center justify-center text-xs font-semibold text-[var(--bi-muted-fg)]">
              Klik untuk menambahkan gambar
            </span>
          )}
        </div>
      )}
      <button
        type="button"
        className="absolute right-2 top-2 z-20 grid size-8 place-items-center rounded-md bg-[color-mix(in_srgb,var(--bi-card)_92%,transparent)] text-[var(--bi-primary)] opacity-0 shadow-md backdrop-blur transition-opacity group-hover/inline-image:opacity-100 focus-visible:opacity-100"
        onClick={() => {
          if (open) setOpen(false);
          else openEditor();
        }}
        aria-label="Ganti gambar"
        title="Ganti gambar"
      >
        <ImageIcon size={15} />
      </button>
      {open ? (
        <form
          className="absolute left-3 right-3 top-3 z-30 flex flex-col gap-2 rounded-lg border border-[var(--bi-border)] bg-[var(--bi-card)] p-3 text-left font-sans shadow-xl"
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
        >
          <label className="text-[11px] font-semibold text-[var(--bi-fg)]">
            Gambar
          </label>
          <input
            autoFocus
            className="h-8 rounded-md border border-[var(--bi-input)] bg-[var(--bi-bg)] px-2 text-xs text-[var(--bi-fg)] outline-none focus:ring-2 focus:ring-[var(--bi-primary)]"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="Tempel alamat gambar"
          />
          {altKey ? (
            <>
              <label className="text-[11px] font-semibold text-[var(--bi-fg)]">
                Deskripsi gambar
              </label>
              <input
                className="h-8 rounded-md border border-[var(--bi-input)] bg-[var(--bi-bg)] px-2 text-xs text-[var(--bi-fg)] outline-none focus:ring-2 focus:ring-[var(--bi-primary)]"
                value={imageAlt}
                onChange={(event) => setImageAlt(event.target.value)}
                placeholder="Ceritakan isi gambar"
              />
            </>
          ) : null}
          <div className="flex justify-end gap-1">
            <button
              type="button"
              className="grid size-7 place-items-center rounded-md text-[var(--bi-muted-fg)] hover:bg-[var(--bi-muted)]"
              onClick={() => setOpen(false)}
              aria-label="Batal"
              title="Batal"
            >
              <X size={14} />
            </button>
            <button
              type="submit"
              className="grid size-7 place-items-center rounded-md bg-[var(--bi-primary)] text-[var(--bi-primary-fg)]"
              aria-label="Simpan gambar"
              title="Simpan gambar"
            >
              <Check size={14} />
            </button>
          </div>
        </form>
      ) : null}
    </span>
  );
}
