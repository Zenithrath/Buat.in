import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString, sanitizeUrl } from "@/lib/registry/shared";

/**
 * Marka brand versi HTML ekspor: gambar bila `logoImageUrl` diisi,
 * selain itu inisial nama. Bisa dipakai di sidebar, navbar, maupun footer.
 */
export function logoMarkHtml(
  node: Node,
  name: string,
  imgClass: string,
  letterClass: string,
  altText?: string,
  hideLetter = false
): string {
  const url = propString(node, "logoImageUrl").trim();
  if (url) {
    return `<img class="${imgClass}" src="${escapeHtml(
      sanitizeUrl(url)
    )}" alt="${escapeHtml(altText || name)}" loading="lazy">`;
  }
  if (hideLetter) return "";
  return `<span class="${letterClass}" aria-hidden="true">${escapeHtml(
    (name.charAt(0) || "B").toUpperCase()
  )}</span>`;
}