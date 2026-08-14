import type { Node } from "@/lib/schema/types";
import { propString, sanitizeUrl } from "@/lib/registry/shared";
import { listValue, nodeList, uniqueId } from "./content";

export interface NavigationLink {
  id: string;
  label: string;
  url: string;
}

const DEFAULT_LINKS: NavigationLink[] = [
  { id: "beranda", label: "Beranda", url: "#" },
  { id: "layanan", label: "Layanan", url: "#layanan" },
  { id: "tentang", label: "Tentang", url: "#tentang" },
  { id: "kontak", label: "Kontak", url: "#kontak" },
];

/** Membaca link bernomor dari varian navbar klasik. */
export function directNavigationLinks(node: Node, count = 3): NavigationLink[] {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const fallback = DEFAULT_LINKS[index] ?? DEFAULT_LINKS[0];
    const label = propString(node, `link${number}Text`).trim() || fallback.label;
    const url = sanitizeUrl(propString(node, `link${number}Url`).trim() || fallback.url);
    return { id: `link-${number}`, label, url };
  }).filter((link) => Boolean(link.label));
}

/**
 * Dokumen lama dapat menyimpan repeater sebagai JSON string; nodeList sudah
 * menormalisasikannya sehingga kontrol array baru tetap aman untuk impor lama.
 */
export function arrayNavigationLinks(
  node: Node,
  key: string,
  fallback: NavigationLink[] = DEFAULT_LINKS
): NavigationLink[] {
  const links = nodeList(node, key)
    .map((item, index) => {
      const label = listValue(item, "label").trim();
      if (!label) return null;
      return {
        id: uniqueId("nav", index, label),
        label,
        url: sanitizeUrl(listValue(item, "url", "#")),
      };
    })
    .filter((link): link is NavigationLink => link !== null);

  return links.length ? links : fallback;
}

export function navInstanceId(node: Node, prefix: string): string {
  const id = node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "preview";
  return `${prefix}-${id}`;
}

export function navigationHoverEffect(node: Node): string {
  const styles = node.styles as Record<string, string | undefined>;
  const value = styles.hoverEffect;
  return value === "underline" || value === "ghost" || value === "pill" || value === "stroke"
    ? value
    : "pill";
}

export const NAV_HOVER_STYLE_CONTROL = {
  key: "hoverEffect",
  label: "Efek saat diarahkan",
  group: "Tampilan",
  type: "select" as const,
  options: [
    { value: "pill", label: "Latar pil" },
    { value: "underline", label: "Garis bawah" },
    { value: "ghost", label: "Teks bayangan" },
    { value: "stroke", label: "Garis teks" },
  ],
  defaultValue: "pill",
};
