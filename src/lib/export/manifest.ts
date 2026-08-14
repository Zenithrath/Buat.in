import type { ProjectDocument } from "@/lib/schema/types";
import { SCHEMA_VERSION } from "@/lib/schema/types";
import { componentMap } from "@/lib/registry";
import { getFontPreset } from "@/lib/theme/presets";

export const GENERATOR_VERSION = "0.1.0";
export const TEMPLATE_VERSION = "1.0.0";

export function buildGeneratorManifest(doc: ProjectDocument) {
  const componentVersions: Record<string, string> = {};
  for (const section of doc.pages[0].sections) {
    const manifest = componentMap[section.componentType];
    if (manifest && !componentVersions[manifest.id]) {
      componentVersions[manifest.id] = manifest.version;
    }
  }

  return {
    generator: "Buat.in",
    generatorVersion: GENERATOR_VERSION,
    templateVersion: TEMPLATE_VERSION,
    schemaVersion: SCHEMA_VERSION,
    target: "html",
    projectName: doc.name,
    generatedAt: new Date().toISOString(),
    componentVersions,
  };
}

export function buildFontsHtml(doc: ProjectDocument): string {
  const preset = getFontPreset(doc.theme.presets.font ?? "geist");
  const hrefs = preset.googleFonts.map(
    (f) => `https://fonts.googleapis.com/css2?family=${f}&display=swap`
  );
  const links = hrefs
    .map((href) => `<link rel="stylesheet" href="${href}" />`)
    .join("\n  ");
  return `<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ${links}`;
}