import {
  SCHEMA_VERSION,
  type Node,
  type ProjectDocument,
  type ProjectType,
} from "./types";
import { DEFAULT_THEME_PRESETS } from "@/lib/theme/presets";
import { uid } from "@/lib/utils";
import { getTemplateSource, templateRegistry, type RawTemplateNode } from "@/templates";

/** Kategori template dipetakan ke tipe proyek builder (auth = halaman tunggal ala landing). */
export function categoryToProjectType(
  category: string
): ProjectType {
  return category === "dashboard" ? "dashboard" : "landing";
}

export function createDefaultNode(componentType: string, name?: string): Node {
  return {
    id: uid(),
    name: name ?? componentType,
    componentType,
    props: {},
    styles: {},
    tabletOverride: {},
    mobileOverride: {},
    children: [],
    metadata: { createdAt: new Date().toISOString() },
  };
}

export function materializeTemplateNodes(templateNodes: RawTemplateNode[]): Node[] {
  const createdAt = new Date().toISOString();

  const materialize = (templateNode: RawTemplateNode): Node => ({
    // Raw node IDs only describe a template. Every application gets a fresh
    // tree so duplicate templates never collide in selection or DnD state.
    id: uid(),
    name: templateNode.name,
    componentType: templateNode.componentType,
    props: { ...(templateNode.props ?? {}) },
    styles: { ...(templateNode.styles ?? {}) },
    tabletOverride: { ...(templateNode.tabletOverride ?? {}) },
    mobileOverride: { ...(templateNode.mobileOverride ?? {}) },
    children: (templateNode.children ?? []).map(materialize),
    metadata: {
      createdAt,
      hidden: templateNode.metadata?.hidden === true || undefined,
      locked: templateNode.metadata?.locked === true || undefined,
    },
  });

  return templateNodes.map(materialize);
}

export function createProjectDocument(
  projectId: string,
  name: string,
  sections: Node[],
  projectType: ProjectType = "landing"
): ProjectDocument {
  const presets = { ...DEFAULT_THEME_PRESETS };
  delete (presets as { density?: string }).density;
  delete (presets as { shadow?: string }).shadow;

  if (projectType === "dashboard") {
    presets.style = "mira";
    presets.density = "compact";
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    projectId,
    name,
    projectType,
    theme: {
      presets,
      overrides: {},
    },
    settings: { device: "desktop" },
    pages: [
      {
        id: uid(),
        name: projectType === "dashboard" ? "Overview Dashboard" : "Beranda",
        path: "/",
        isHome: true,
        sections,
      },
    ],
    assets: [],
    seo: {
      title: "",
      description: "",
    },
  };
}

export function createBlankProject(
  projectId: string,
  projectType: ProjectType = "landing"
): ProjectDocument {
  const title = projectType === "dashboard" ? "Dashboard Baru" : "Landing Page Baru";
  return createProjectDocument(projectId, title, [], projectType);
}

export function createDashboardTemplate(projectId: string): ProjectDocument {
  return createTemplateProject(projectId, "dashboard-analytics");
}

export function createTemplateProject(
  projectId: string,
  templateIdOrProjectType: string = "landing-saas"
): ProjectDocument {
  const requestedCategory: ProjectType =
    templateIdOrProjectType === "dashboard" ? "dashboard" : "landing";
  const template =
    templateRegistry.find((item) => item.id === templateIdOrProjectType) ??
    templateRegistry.find((item) => item.category === requestedCategory) ??
    templateRegistry[0];

  const document = createProjectDocument(
    projectId,
    template?.name ?? "Landing Page Baru",
    materializeTemplateNodes(template?.createNodes() ?? []),
    categoryToProjectType(template?.category ?? requestedCategory)
  );

  if (template && getTemplateSource(template.id)) {
    document.sourceTemplateId = template.id;
    document.sourceEdits = {};
  }

  if (!template?.theme) return document;

  return {
    ...document,
    theme: {
      presets: { ...template.theme.presets },
      overrides: { ...template.theme.overrides },
    },
  };
}
