import type { RawTemplateNode } from "@/templates";

/**
 * Adapter untuk template ZIP yang sudah diimpor.
 *
 * Node ini sengaja menjadi satu root per arsip: markup, stylesheet, JavaScript,
 * font, dan gambar asli tetap menjadi sumber visualnya. Dengan begitu proses
 * konversi tidak mengubah layout yang sudah dibuat di ZIP menjadi sekumpulan
 * blok generic yang tampilannya berbeda.
 */
export function createImportedSourceNodes(
  templateId: string,
  name: string
): RawTemplateNode[] {
  return [
    {
      id: `imported-${templateId}`,
      componentType: "source-template",
      name,
      props: { sourceTemplateId: templateId },
      styles: {},
      tabletOverride: {},
      mobileOverride: {},
      children: [],
      metadata: { importedFromZip: true, sourceTemplateId: templateId },
    },
  ];
}
