"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { listValue, nodeList } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";

type FieldType = "text" | "date" | "number";

interface Field {
  label: string;
  placeholder: string;
  type: FieldType;
}

const DEFAULT_FIELDS: Field[] = [
  { label: "Nama pelanggan", placeholder: "Nama lengkap pelanggan", type: "text" },
  { label: "Kategori", placeholder: "Pelanggan baru", type: "text" },
  { label: "Jumlah transaksi", placeholder: "Rp", type: "number" },
  { label: "Tanggal", placeholder: "2026-08-15", type: "date" },
];

function copy(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function safeType(value: string): FieldType {
  return value === "date" || value === "number" ? value : "text";
}

function fields(node: Node): Field[] {
  const entries = nodeList(node, "fieldsJson")
    .map((item) => {
      const label = listValue(item, "label").trim();
      if (!label) return null;
      return {
        label,
        placeholder: listValue(item, "placeholder"),
        type: safeType(listValue(item, "type", "text")),
      };
    })
    .filter((item): item is Field => item !== null);
  return entries.length ? entries : DEFAULT_FIELDS;
}

export function FormAddDataPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const { setValue } = useRepeaterEditor(node, "fieldsJson");
  const title = copy(node, "title", "Tambah data baru");
  const description = copy(node, "description", "Lengkapi kolom di bawah lalu simpan.");
  const submitText = copy(node, "submitText", "Simpan data");
  const items = fields(node);

  return (
    <form
      data-canvas-interactive
      onSubmit={(event) => event.preventDefault()}
      className="w-full min-w-0 rounded-xl border border-border bg-card p-5 text-foreground shadow-sm"
      style={themeTokenStyle(tokens)}
    >
      <h3 className="text-base font-extrabold tracking-[-0.02em]">
        <InlineEditableText node={node} propKey="title" fallback="Tambah data baru" value={title} />
      </h3>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        <InlineEditableText node={node} propKey="description" fallback="Lengkapi kolom di bawah lalu simpan." value={description} multiline />
      </p>

      <div className="mt-4 grid gap-3.5">
        {items.map((field, index) => (
          <div key={`field-${index}-${field.label}`} className="block min-w-0">
            <span className="block text-xs font-bold text-foreground">
              <InlineEditableText
                node={node}
                propKey="fieldsJson"
                value={field.label}
                onCommit={(next) => setValue(index, "label", next)}
              />
            </span>
            <div className="relative mt-1.5">
              <input
                type={field.type}
                placeholder={field.placeholder}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => event.stopPropagation()}
                className="h-10 w-full rounded-[calc(var(--radius)*0.75)] border border-input bg-background px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
              />
              <span className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center">
                <InlineEditableText
                  node={node}
                  propKey="fieldsJson"
                  value={field.placeholder}
                  onCommit={(next) => setValue(index, "placeholder", next)}
                  className="truncate text-sm text-muted-foreground"
                />
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        data-canvas-interactive
        onClick={(event) => event.stopPropagation()}
        className="mt-4 h-10 w-full rounded-[calc(var(--radius)*0.75)] bg-primary px-4 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <InlineEditableText node={node} propKey="submitText" fallback="Simpan data" value={submitText} />
      </button>
    </form>
  );
}
