"use client";

import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";

export function logoUrl(node: Node): string {
  return propString(node, "logoImageUrl").trim();
}

interface BrandMarkProps {
  node: Node;
  name: string;
  imgClassName?: string;
  letterClassName?: string;
  altFallback?: string;
  /** Sembunyikan inisial bila tidak ada gambar (mis. navbar teks-only). */
  hideLetter?: boolean;
}

/**
 * Marka brand: gambar bila `logoImageUrl` diisi, selain itu inisial nama.
 * Dipakai di sidebar, navbar, dan footer agar logo bisa berupa gambar/logo
 * pengguna — bukan hanya huruf dari nama.
 */
export function BrandMark({
  node,
  name,
  imgClassName,
  letterClassName,
  altFallback,
  hideLetter,
}: BrandMarkProps) {
  const url = logoUrl(node);
  if (url) {
    return (
      <img
        src={url}
        alt={altFallback || name}
        className={imgClassName}
        draggable={false}
      />
    );
  }
  if (hideLetter) return null;
  return (
    <span className={letterClassName} aria-hidden="true">
      {(name.charAt(0) || "B").toUpperCase()}
    </span>
  );
}