import type { Node } from "@/lib/schema/types";

export type ContentRecord = Record<string, unknown>;

export function text(value: unknown, fallback = ""): string {
  if (value == null) return fallback;
  const resolved = String(value).trim();
  return resolved || fallback;
}

/**
 * Builder documents from early versions stored repeaters as JSON strings.
 * New manifests use visual array controls, but accepting both keeps imported
 * documents and exported templates forward compatible.
 */
export function recordList(value: unknown): ContentRecord[] {
  let parsed = value;

  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(parsed)) return [];
  return parsed.filter(
    (item): item is ContentRecord => Boolean(item) && typeof item === "object"
  );
}

export function nodeList(node: Node, key: string): ContentRecord[] {
  return recordList(node.props[key]);
}

export function stringList(value: unknown): string[] {
  let parsed = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      parsed = value.split("\n");
    }
  }
  if (!Array.isArray(parsed)) return [];
  return parsed.map((item) => text(item)).filter(Boolean);
}

export function listValue(
  item: ContentRecord,
  key: string,
  fallback = ""
): string {
  return text(item[key], fallback);
}

export function listBoolean(item: ContentRecord, key: string, fallback = false): boolean {
  const value = item[key];
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true";
  return fallback;
}

export function uniqueId(prefix: string, index: number, value?: unknown): string {
  const slug = text(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${prefix}-${slug || index + 1}`;
}
