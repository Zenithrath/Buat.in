import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

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
  try {
    const parsed: unknown = JSON.parse(propString(node, "fieldsJson"));
    if (!Array.isArray(parsed)) return DEFAULT_FIELDS;
    const entries = parsed
      .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
      .map((item) => {
        const label = String(item.label ?? "").trim();
        if (!label) return null;
        return {
          label,
          placeholder: String(item.placeholder ?? "").trim(),
          type: safeType(String(item.type ?? "text")),
        };
      })
      .filter((item): item is Field => item !== null);
    return entries.length ? entries : DEFAULT_FIELDS;
  } catch {
    return DEFAULT_FIELDS;
  }
}

export function formAddDataExport(node: Node): ExportResult {
  const title = copy(node, "title", "Tambah data baru");
  const description = copy(node, "description", "Lengkapi kolom di bawah lalu simpan.");
  const submitText = copy(node, "submitText", "Simpan data");
  const items = fields(node);
  const instance = node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "form-add-data";

  const fieldMarkup = items
    .map(
      (field, index) =>
        `<label class="bi-form-add-field"><span class="bi-form-add-label">${escapeHtml(field.label)}</span><input type="${field.type}" name="field-${index}" placeholder="${escapeHtml(field.placeholder)}"></label>`
    )
    .join("\n");

  const html = `<div class="bi-form-add" data-bi-form-add="${escapeHtml(instance)}">
  <h3 class="bi-form-add-title">${escapeHtml(title)}</h3>
  <p class="bi-form-add-desc">${escapeHtml(description)}</p>
  <form class="bi-form-add-form" data-bi-form-add-form>
${fieldMarkup}
    <button class="bi-form-add-submit" type="submit">${escapeHtml(submitText)}</button>
    <span class="bi-form-success" hidden aria-live="polite">✓ Data berhasil disimpan (demo).</span>
  </form>
</div>`;

  const css = `.bi-form-add { min-width: 0; box-sizing: border-box; padding: 1.25rem; border: 1px solid var(--bi-border); border-radius: calc(var(--bi-radius) + 2px); background: var(--bi-card); color: var(--bi-fg); font-family: var(--bi-font-body); }
.bi-form-add-title { margin: 0; font: 800 1rem/1.3 var(--bi-font-heading); letter-spacing: -0.02em; }
.bi-form-add-desc { margin: 0.25rem 0 0; color: var(--bi-muted-fg); font-size: 0.75rem; line-height: 1.5; }
.bi-form-add-form { display: grid; gap: 0.875rem; margin-top: 1rem; }
.bi-form-add-field { display: grid; min-width: 0; gap: 0.375rem; }
.bi-form-add-label { color: var(--bi-fg); font-size: 0.75rem; font-weight: 750; }
.bi-form-add-form input { width: 100%; height: 2.5rem; box-sizing: border-box; padding: 0 0.75rem; border: 1px solid var(--bi-input); border-radius: calc(var(--bi-radius) * 0.75); background: var(--bi-bg); color: var(--bi-fg); font: 400 0.875rem/1 var(--bi-font-body); outline: none; transition: border-color .15s ease, box-shadow .15s ease; }
.bi-form-add-form input::placeholder { color: var(--bi-muted-fg); opacity: 0.75; }
.bi-form-add-form input:focus { border-color: var(--bi-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--bi-primary) 22%, transparent); }
.bi-form-add-submit { height: 2.5rem; border: 0; border-radius: calc(var(--bi-radius) * 0.75); background: var(--bi-primary); color: var(--bi-primary-fg); font: 750 0.875rem/1 var(--bi-font-body); cursor: pointer; transition: opacity .15s ease; }
.bi-form-add-submit:hover { opacity: 0.9; }
.bi-form-success { display: block; padding: 0.5rem 0.75rem; border-radius: calc(var(--bi-radius) * 0.6); background: color-mix(in srgb, #10b981 12%, transparent); color: #047857; font-size: 0.75rem; font-weight: 650; }
.bi-form-success[hidden] { display: none; }
@media (max-width: 640px) { .bi-form-add { padding: 1rem; } }`;

  const js = `(function(){var root=document.querySelector('[data-bi-form-add="${instance}"]');if(!root)return;var form=root.querySelector('[data-bi-form-add-form]');if(!form)return;form.addEventListener('submit',function(event){event.preventDefault();var success=form.querySelector('.bi-form-success');if(success){success.hidden=false;}});}());`;

  return { html, css, js };
}
