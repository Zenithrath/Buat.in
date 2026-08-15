import { create } from "zustand";
import type {
  Asset,
  Device,
  Node,
  NodeLayout,
  Page,
  ProjectDocument,
  ProjectType,
  Theme,
} from "@/lib/schema/types";
import {
  createBlankProject,
  createDefaultNode,
  materializeTemplateNodes,
} from "@/lib/schema/defaults";
import { normalizePresets } from "@/lib/theme/presets";
import { getComponent } from "@/lib/registry";
import { templateRegistry } from "@/templates";
import { uid } from "@/lib/utils";

const HISTORY_LIMIT = 50;
const DASHBOARD_SIDEBAR_COMPONENTS = new Set(["app-sidebar", "sidebar-icon"]);

function findNode(nodes: Node[], id: string): Node | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children && node.children.length > 0) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function mapNode(nodes: Node[], id: string, fn: (node: Node) => Node): Node[] {
  return nodes.map((node) => {
    if (node.id === id) return fn(node);
    if (node.children && node.children.length > 0) {
      return { ...node, children: mapNode(node.children, id, fn) };
    }
    return node;
  });
}

function removeNode(nodes: Node[], id: string): Node[] {
  return nodes
    .filter((n) => n.id !== id)
    .map((n) => ({
      ...n,
      children: n.children ? removeNode(n.children, id) : [],
    }));
}

type NodeLocation = {
  node: Node;
  parentId: string | null;
  index: number;
};

function findNodeLocation(
  nodes: Node[],
  id: string,
  parentId: string | null = null
): NodeLocation | null {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    if (node.id === id) return { node, parentId, index };
    const nested = findNodeLocation(node.children ?? [], id, node.id);
    if (nested) return nested;
  }
  return null;
}

function insertNode(
  nodes: Node[],
  parentId: string | null,
  node: Node,
  index: number
): Node[] {
  if (parentId === null) {
    const next = [...nodes];
    next.splice(Math.max(0, Math.min(index, next.length)), 0, node);
    return next;
  }

  return nodes.map((current) => {
    if (current.id === parentId) {
      const children = [...(current.children ?? [])];
      children.splice(Math.max(0, Math.min(index, children.length)), 0, node);
      return { ...current, children };
    }
    if (current.children?.length) {
      return { ...current, children: insertNode(current.children, parentId, node, index) };
    }
    return current;
  });
}

function cloneNodeWithFreshIds(node: Node): Node {
  return {
    ...structuredClone(node),
    id: uid(),
    children: (node.children ?? []).map(cloneNodeWithFreshIds),
    metadata: { ...node.metadata, createdAt: new Date().toISOString() },
  };
}

export function getActivePage(
  doc: ProjectDocument,
  activePageId: string | null
): Page {
  const page = doc.pages.find((p) => p.id === activePageId);
  if (page) return page;
  return doc.pages.find((p) => p.isHome) ?? doc.pages[0];
}

/** Ganti sections halaman aktif (tanpa mengubah halaman lain). */
function withPageSections(
  doc: ProjectDocument,
  activePageId: string | null,
  sections: Node[]
): ProjectDocument {
  const target = getActivePage(doc, activePageId);
  return {
    ...doc,
    pages: doc.pages.map((p) => (p.id === target.id ? { ...p, sections } : p)),
  };
}

function slugifyPageName(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "halaman";
}

/**
 * Pastikan tepat satu beranda dengan path "/", dan semua path non-beranda
 * unik (suffix -2, -3 bila bentrok).
 */
export function normalizePagePaths(pages: Page[]): Page[] {
  const seen = new Set<string>();
  return pages.map((page) => {
    if (page.isHome) {
      seen.add("/");
      return { ...page, path: "/" };
    }
    let candidate = page.path.startsWith("/") ? page.path : `/${page.path}`;
    candidate = candidate === "/" ? `/${slugifyPageName(page.name)}` : candidate;
    const stem = candidate.replace(/-\d+$/, "");
    let n = 2;
    while (seen.has(candidate)) {
      candidate = n === 2 ? `${stem}-2` : `${stem}-${n}`;
      n += 1;
    }
    seen.add(candidate);
    return { ...page, path: candidate };
  });
}

function resolveActivePageId(
  doc: ProjectDocument,
  activePageId: string | null
): string {
  if (doc.pages.some((p) => p.id === activePageId)) return activePageId as string;
  return (doc.pages.find((p) => p.isHome) ?? doc.pages[0]).id;
}

export type SaveStatus = "idle" | "saving" | "saved";

export type LeftTab =
  | "design"
  | "templates"
  | "components"
  | "layers"
  | "assets"
  | "style"
  | "theme"
  | "pages"
  | "blocks";

interface BuilderState {
  document: ProjectDocument;
  activePageId: string | null;
  selectedId: string | null;
  past: ProjectDocument[];
  future: ProjectDocument[];
  saveStatus: SaveStatus;
  loaded: boolean;
  loadError: boolean;
  leftTab: LeftTab;
  zoomLevel: number;

  select: (id: string | null) => void;
  setDevice: (device: Device) => void;
  setZoomLevel: (zoom: number) => void;
  setProjectType: (type: ProjectType) => void;
  setDocument: (doc: ProjectDocument) => void;
  markLoadError: () => void;
  setLeftTab: (tab: LeftTab) => void;
  setActivePage: (pageId: string) => void;
  createPage: (name?: string) => void;
  updatePage: (pageId: string, patch: Partial<Page>) => void;
  duplicatePage: (pageId: string) => void;
  deletePage: (pageId: string) => void;
  updateNode: (id: string, updater: (node: Node) => Node) => void;
  updateNodeLayout: (id: string, layout: Partial<NodeLayout>) => void;
  toggleNodeVisibility: (id: string) => void;
  renameNode: (id: string, name: string) => void;
  addSection: (componentType: string, index?: number, name?: string) => void;
  addChild: (parentId: string, componentType: string, index?: number, name?: string) => void;
  addBlock: (sections: Node[]) => void;
  removeSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  moveSection: (fromIndex: number, toIndex: number) => void;
  moveNode: (id: string, parentId: string | null, index: number) => void;
  reorderChildren: (parentId: string | null, fromIndex: number, toIndex: number) => void;
  updateTheme: (updater: (theme: Theme) => Theme) => void;
  addAssets: (assets: Asset[]) => void;
  removeAsset: (assetId: string) => void;
  renameProject: (name: string) => void;
  updateSeo: (updater: (seo: ProjectDocument["seo"]) => ProjectDocument["seo"]) => void;
  selectAll: () => void;
  applyTemplate: (templateId: string) => void;
  undo: () => void;
  redo: () => void;
}

const initialDocument = createBlankProject("");

const DEFAULT_PROJECT_NAMES = new Set([
  "Dashboard Baru",
  "Landing Page Baru",
  "Karsa Studio - Operations Dashboard",
  "Karsa Studio - Company Profile",
  "Company Profile Studio",
  "Analytics Dashboard",
  "Toko Online",
]);

export const useBuilderStore = create<BuilderState>((set, get) => ({
  document: initialDocument,
  activePageId: null,
  selectedId: null,
  past: [],
  future: [],
  saveStatus: "idle",
  loaded: false,
  loadError: false,
  leftTab: "design",
  zoomLevel: 100,

  select: (id) => set({ selectedId: id }),

  markLoadError: () =>
    set({ loadError: true, loaded: false }),

  setLeftTab: (tab) => set({ leftTab: tab }),

  setZoomLevel: (zoom) =>
    set({ zoomLevel: Math.min(200, Math.max(25, zoom)) }),

  setProjectType: (projectType) => {
    const { document } = get();
    if (document.projectType === projectType) return;
    const nextDoc: ProjectDocument = { ...document, projectType };
    commit(set, get, nextDoc);
  },

  setDevice: (device) =>
    set({
      document: {
        ...get().document,
        settings: { ...get().document.settings, device },
      },
    }),

  setDocument: (doc) =>
    set({
      document: normalizeDocument(doc),
      activePageId: resolveActivePageId(normalizeDocument(doc), null),
      past: [],
      future: [],
      loaded: true,
      loadError: false,
      saveStatus: "saved",
      selectedId: null,
    }),

  setActivePage: (pageId) => {
    const { document } = get();
    if (!document.pages.some((p) => p.id === pageId)) return;
    set({ activePageId: pageId, selectedId: null });
  },

  createPage: (name) => {
    const { document } = get();
    const pageName = (name ?? "Halaman Baru").trim() || "Halaman Baru";
    const page: Page = {
      id: uid(),
      name: pageName,
      path: "",
      isHome: false,
      sections: [],
    };
    const nextDoc: ProjectDocument = {
      ...document,
      pages: normalizePagePaths([...document.pages, page]),
    };
    commit(set, get, nextDoc);
    set({ activePageId: page.id, selectedId: null });
  },

  updatePage: (pageId, patch) => {
    const { document } = get();
    const target = document.pages.find((p) => p.id === pageId);
    if (!target) return;
    let merged: Page = { ...target, ...patch };
    if (patch.path !== undefined) {
      const raw = String(patch.path).trim() || `/${slugifyPageName(target.name)}`;
      merged = { ...merged, path: raw.startsWith("/") ? raw : `/${raw}` };
    }
    let pages = document.pages.map((p) => (p.id === pageId ? merged : p));
    if (merged.isHome) {
      pages = pages.map((p) => ({
        ...p,
        isHome: p.id === pageId,
        path: p.id === pageId ? "/" : p.path,
      }));
    }
    const nextDoc: ProjectDocument = {
      ...document,
      pages: normalizePagePaths(pages),
    };
    commit(set, get, nextDoc);
    set({ selectedId: null });
  },

  duplicatePage: (pageId) => {
    const { document } = get();
    const target = document.pages.find((p) => p.id === pageId);
    if (!target) return;
    const copy: Page = {
      id: uid(),
      name: `${target.name} (Salinan)`,
      path: "",
      isHome: false,
      sections: target.sections.map(cloneNodeWithFreshIds),
    };
    const nextDoc: ProjectDocument = {
      ...document,
      pages: normalizePagePaths([...document.pages, copy]),
    };
    commit(set, get, nextDoc);
    set({ activePageId: copy.id, selectedId: null });
  },

  deletePage: (pageId) => {
    const { document, activePageId } = get();
    if (document.pages.length <= 1) return;
    const target = document.pages.find((p) => p.id === pageId);
    if (!target || target.isHome) return;
    const pages = document.pages.filter((p) => p.id !== pageId);
    const nextDoc: ProjectDocument = { ...document, pages };
    commit(set, get, nextDoc);
    if (activePageId === pageId) {
      const fallback = pages.find((p) => p.isHome) ?? pages[0];
      set({ activePageId: fallback.id, selectedId: null });
    }
  },

  addAssets: (assets) => {
    const { document } = get();
    const existing = new Set(document.assets.map((asset) => asset.id));
    const fresh = assets.filter((asset) => !existing.has(asset.id));
    if (fresh.length === 0) return;
    commit(set, get, { ...document, assets: [...document.assets, ...fresh] });
  },

  removeAsset: (assetId) => {
    const { document } = get();
    if (!document.assets.some((asset) => asset.id === assetId)) return;
    commit(set, get, {
      ...document,
      assets: document.assets.filter((asset) => asset.id !== assetId),
    });
  },

  updateNode: (id, updater) => {
    const { document, activePageId } = get();
    const sections = getActivePage(document, activePageId).sections;
    const node = findNode(sections, id);
    if (!node) return;

    const nextDoc: ProjectDocument = withPageSections(
      document,
      activePageId,
      mapNode(sections, id, updater)
    );
    commit(set, get, nextDoc);
  },

  updateNodeLayout: (id, layoutPatch) => {
    const { updateNode } = get();
    updateNode(id, (node) => ({
      ...node,
      layout: { ...(node.layout ?? {}), ...layoutPatch },
    }));
  },

  toggleNodeVisibility: (id) => {
    const { updateNode } = get();
    updateNode(id, (node) => ({
      ...node,
      metadata: {
        ...node.metadata,
        hidden: !node.metadata.hidden,
      },
    }));
  },

  renameNode: (id, name) => {
    const { updateNode } = get();
    updateNode(id, (node) => ({ ...node, name }));
  },

  addSection: (componentType, index, name) => {
    const { document, activePageId } = get();
    const node = createDefaultNode(componentType, name);
    const manifest = getComponent(componentType);
    node.props = { ...(manifest?.defaultProps ?? {}), ...node.props };
    const sections = [...getActivePage(document, activePageId).sections];

    // A dashboard only has one navigation rail. Dropping a different sidebar
    // is understood as choosing a new sidebar, not silently adding a second
    // invisible one somewhere in the dashboard content.
    if (
      document.projectType === "dashboard" &&
      DASHBOARD_SIDEBAR_COMPONENTS.has(componentType)
    ) {
      const existingIndex = sections.findIndex((section) =>
        DASHBOARD_SIDEBAR_COMPONENTS.has(section.componentType)
      );
      if (existingIndex >= 0) {
        sections.splice(existingIndex, 1, node);
        const nextDoc: ProjectDocument = withPageSections(
          document,
          activePageId,
          sections
        );
        commit(set, get, nextDoc);
        set({ selectedId: node.id });
        return;
      }
    }

    const at = Math.min(
      sections.length,
      Math.max(0, index ?? sections.length)
    );
    sections.splice(at, 0, node);
    const nextDoc: ProjectDocument = withPageSections(
      document,
      activePageId,
      sections
    );
    commit(set, get, nextDoc);
    set({ selectedId: node.id });
  },

  addChild: (parentId, componentType, index, name) => {
    const { document, activePageId } = get();
    const activeSections = getActivePage(document, activePageId).sections;
    const parent = findNode(activeSections, parentId);
    if (!parent) return;

    const node = createDefaultNode(componentType, name);
    const manifest = getComponent(componentType);
    node.props = { ...(manifest?.defaultProps ?? {}), ...node.props };
    const nextSections = insertNode(
      activeSections,
      parentId,
      node,
      index ?? parent.children.length
    );
    const nextDoc: ProjectDocument = withPageSections(
      document,
      activePageId,
      nextSections
    );
    commit(set, get, nextDoc);
    set({ selectedId: node.id });
  },

  addBlock: (nodes) => {
    const { document, activePageId } = get();
    const activeSections = getActivePage(document, activePageId).sections;
    const nextDoc: ProjectDocument = withPageSections(document, activePageId, [
      ...activeSections,
      ...nodes,
    ]);
    commit(set, get, nextDoc);
  },

  removeSection: (id) => {
    const { document, activePageId } = get();
    const sections = getActivePage(document, activePageId).sections;
    const nextSections = removeNode(sections, id);
    const nextDoc: ProjectDocument = withPageSections(
      document,
      activePageId,
      nextSections
    );
    commit(set, get, nextDoc);
    if (get().selectedId === id) set({ selectedId: null });
  },

  duplicateSection: (id) => {
    const { document, activePageId } = get();
    const sections = getActivePage(document, activePageId).sections;
    const source = findNodeLocation(sections, id);
    if (!source) return;
    const clone = cloneNodeWithFreshIds(source.node);
    clone.name = clone.name ? `${clone.name} (Copy)` : clone.componentType;
    const nextSections = insertNode(sections, source.parentId, clone, source.index + 1);
    const nextDoc: ProjectDocument = withPageSections(
      document,
      activePageId,
      nextSections
    );
    commit(set, get, nextDoc);
    set({ selectedId: clone.id });
  },

  moveSection: (fromIndex, toIndex) => {
    const { document, activePageId } = get();
    const sections = [...getActivePage(document, activePageId).sections];
    if (
      fromIndex < 0 ||
      fromIndex >= sections.length ||
      toIndex < 0 ||
      toIndex >= sections.length ||
      fromIndex === toIndex
    ) {
      return;
    }
    const [moved] = sections.splice(fromIndex, 1);
    sections.splice(toIndex, 0, moved);
    const nextDoc: ProjectDocument = withPageSections(
      document,
      activePageId,
      sections
    );
    commit(set, get, nextDoc);
  },

  moveNode: (id, parentId, index) => {
    const { document, activePageId } = get();
    const sections = getActivePage(document, activePageId).sections;
    const source = findNodeLocation(sections, id);
    if (!source) return;
    // A node cannot become a child of itself or one of its descendants.
    if (parentId && findNode(source.node.children ?? [], parentId)) return;

    const stripped = removeNode(sections, id);
    const sameParent = source.parentId === parentId;
    const adjustedIndex = sameParent && source.index < index ? index - 1 : index;
    const nextSections = insertNode(stripped, parentId, source.node, adjustedIndex);
    const nextDoc: ProjectDocument = withPageSections(
      document,
      activePageId,
      nextSections
    );
    commit(set, get, nextDoc);
  },

  reorderChildren: (parentId, fromIndex, toIndex) => {
    const { updateNode, moveSection } = get();
    if (!parentId) {
      moveSection(fromIndex, toIndex);
      return;
    }
    updateNode(parentId, (parent) => {
      const children = [...parent.children];
      if (
        fromIndex < 0 ||
        fromIndex >= children.length ||
        toIndex < 0 ||
        toIndex >= children.length ||
        fromIndex === toIndex
      ) {
        return parent;
      }
      const [moved] = children.splice(fromIndex, 1);
      children.splice(toIndex, 0, moved);
      return { ...parent, children };
    });
  },

  updateTheme: (updater) => {
    const { document } = get();
    const nextDoc: ProjectDocument = {
      ...document,
      theme: updater(document.theme),
    };
    commit(set, get, nextDoc);
  },

  renameProject: (name) => {
    const { document } = get();
    commit(set, get, { ...document, name });
  },

  updateSeo: (updater) => {
    const { document } = get();
    commit(set, get, { ...document, seo: updater(document.seo) });
  },

  selectAll: () => {
    const { document, activePageId } = get();
    const sections = getActivePage(document, activePageId).sections;
    // "Select all" — select first section as a proxy; UI layer handles multi-select highlight
    if (sections.length > 0) set({ selectedId: sections[0].id });
  },

  applyTemplate: (templateId: string) => {
    const tmpl = templateRegistry.find((t) => t.id === templateId);
    if (!tmpl) return;
    const { document, activePageId } = get();
    const nodes = materializeTemplateNodes(tmpl.createNodes()).map((node) => ({
      ...node,
      props: { ...(getComponent(node.componentType)?.defaultProps ?? {}), ...node.props },
      layout: node.layout ?? {},
    }));
    const hasAutomaticName =
      DEFAULT_PROJECT_NAMES.has(document.name) ||
      templateRegistry.some((template) => template.name === document.name);
    const nextDoc: ProjectDocument = {
      ...document,
      // Applying a template replaces the active page (and the document-wide
      // project type/name). Keep a name the user has deliberately written,
      // but do not leave an automatic dashboard name behind after switching
      // to a landing template (or vice versa).
      name: hasAutomaticName ? tmpl.name : document.name,
      projectType: tmpl.category,
      pages: document.pages.map((page) =>
        page.id === getActivePage(document, activePageId).id
          ? { ...page, sections: nodes }
          : page
      ),
      theme: tmpl.theme
        ? {
            presets: { ...tmpl.theme.presets },
            overrides: { ...tmpl.theme.overrides },
          }
        : document.theme,
    };
    commit(set, get, nextDoc);
    set({ selectedId: null });
  },

  undo: () => {
    const { past, future, document, activePageId } = get();
    if (!past.length) return;
    const previous = past[past.length - 1];
    set({
      past: past.slice(0, -1),
      future: [document, ...future].slice(0, HISTORY_LIMIT),
      document: previous,
      activePageId: resolveActivePageId(previous, activePageId),
    });
  },

  redo: () => {
    const { past, future, document, activePageId } = get();
    if (!future.length) return;
    const next = future[0];
    set({
      future: future.slice(1),
      past: [...past, document].slice(-HISTORY_LIMIT),
      document: next,
      activePageId: resolveActivePageId(next, activePageId),
    });
  },
}));

function commit(
  set: (partial: Partial<BuilderState>) => void,
  get: () => BuilderState,
  nextDoc: ProjectDocument
) {
  const { document, past } = get();
  set({
    past: [...past, document].slice(-HISTORY_LIMIT),
    future: [],
    document: nextDoc,
    saveStatus: "saving",
  });
}

export function autosaveProject(doc: ProjectDocument) {
  try {
    const key = projectStorageKey(doc.projectId);
    localStorage.setItem(key, JSON.stringify(doc));
    useBuilderStore.setState({ saveStatus: "saved" });
  } catch {
    useBuilderStore.setState({ saveStatus: "idle" });
  }
}

export function projectStorageKey(projectId: string): string {
  return `buatin:project:${projectId}`;
}

export function loadProject(projectId: string): ProjectDocument | null {
  try {
    const raw = localStorage.getItem(projectStorageKey(projectId));
    if (!raw) return null;
    const doc = JSON.parse(raw) as ProjectDocument;
    if (doc.projectId !== projectId) return null;
    return normalizeDocument(doc);
  } catch {
    return null;
  }
}

/** Menormalisasi document & theme presets lama ke skema baru. */
export function normalizeDocument(doc: ProjectDocument): ProjectDocument {
  const pages: Page[] = doc.pages?.length
    ? doc.pages.map((page) => ({
        id: page.id,
        name: page.name,
        path: page.path ?? "",
        isHome: page.isHome ?? false,
        sections: page.sections ?? [],
      }))
    : [{ id: uid(), name: "Beranda", path: "/", isHome: true, sections: [] }];
  return {
    ...doc,
    projectType: doc.projectType ?? "landing",
    theme: {
      ...doc.theme,
      presets: normalizePresets(doc.theme?.presets ?? {}),
    },
    pages: normalizePagePaths(pages),
  };
}

export function getSelectedNode(state: BuilderState): Node | null {
  if (!state.selectedId) return null;
  return findNode(
    getActivePage(state.document, state.activePageId).sections,
    state.selectedId
  );
}
