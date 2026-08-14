import { create } from "zustand";
import type {
  Device,
  Node,
  NodeLayout,
  ProjectDocument,
  ProjectType,
  Theme,
} from "@/lib/schema/types";
import { createBlankProject, createDefaultNode } from "@/lib/schema/defaults";
import { normalizePresets } from "@/lib/theme/presets";
import { templateRegistry } from "@/templates";
import { uid } from "@/lib/utils";

const HISTORY_LIMIT = 50;

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
  updateNode: (id: string, updater: (node: Node) => Node) => void;
  updateNodeLayout: (id: string, layout: Partial<NodeLayout>) => void;
  toggleNodeVisibility: (id: string) => void;
  renameNode: (id: string, name: string) => void;
  addSection: (componentType: string, index?: number, name?: string) => void;
  addBlock: (sections: Node[]) => void;
  removeSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  moveSection: (fromIndex: number, toIndex: number) => void;
  reorderChildren: (parentId: string | null, fromIndex: number, toIndex: number) => void;
  updateTheme: (updater: (theme: Theme) => Theme) => void;
  renameProject: (name: string) => void;
  updateSeo: (updater: (seo: ProjectDocument["seo"]) => ProjectDocument["seo"]) => void;
  selectAll: () => void;
  applyTemplate: (templateId: string) => void;
  undo: () => void;
  redo: () => void;
}

const initialDocument = createBlankProject("");

export const useBuilderStore = create<BuilderState>((set, get) => ({
  document: initialDocument,
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
      past: [],
      future: [],
      loaded: true,
      loadError: false,
      saveStatus: "saved",
      selectedId: null,
    }),

  updateNode: (id, updater) => {
    const { document } = get();
    const sections = document.pages[0].sections;
    const node = findNode(sections, id);
    if (!node) return;

    const nextDoc: ProjectDocument = {
      ...document,
      pages: [
        {
          ...document.pages[0],
          sections: mapNode(sections, id, updater),
        },
      ],
    };
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
    const { document } = get();
    const node = createDefaultNode(componentType, name);
    const sections = [...document.pages[0].sections];
    const at = index ?? sections.length;
    sections.splice(at, 0, node);
    const nextDoc: ProjectDocument = {
      ...document,
      pages: [{ ...document.pages[0], sections }],
    };
    commit(set, get, nextDoc);
    set({ selectedId: node.id });
  },

  addBlock: (nodes) => {
    const { document } = get();
    const nextDoc: ProjectDocument = {
      ...document,
      pages: [
        {
          ...document.pages[0],
          sections: [...document.pages[0].sections, ...nodes],
        },
      ],
    };
    commit(set, get, nextDoc);
  },

  removeSection: (id) => {
    const { document } = get();
    const sections = document.pages[0].sections;
    const nextSections = removeNode(sections, id);
    const nextDoc: ProjectDocument = {
      ...document,
      pages: [
        {
          ...document.pages[0],
          sections: nextSections,
        },
      ],
    };
    commit(set, get, nextDoc);
    if (get().selectedId === id) set({ selectedId: null });
  },

  duplicateSection: (id) => {
    const { document } = get();
    const sections = document.pages[0].sections;
    const index = sections.findIndex((s) => s.id === id);
    if (index === -1) return;
    const source = sections[index];
    const clone: Node = structuredClone(source);
    clone.id = uid();
    clone.name = clone.name ? `${clone.name} (Copy)` : clone.componentType;
    clone.metadata = { ...clone.metadata, createdAt: new Date().toISOString() };
    const nextSections = [...sections];
    nextSections.splice(index + 1, 0, clone);
    const nextDoc: ProjectDocument = {
      ...document,
      pages: [{ ...document.pages[0], sections: nextSections }],
    };
    commit(set, get, nextDoc);
    set({ selectedId: clone.id });
  },

  moveSection: (fromIndex, toIndex) => {
    const { document } = get();
    const sections = [...document.pages[0].sections];
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
    const nextDoc: ProjectDocument = {
      ...document,
      pages: [{ ...document.pages[0], sections }],
    };
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
    const { document } = get();
    const sections = document.pages[0].sections;
    // "Select all" — select first section as a proxy; UI layer handles multi-select highlight
    if (sections.length > 0) set({ selectedId: sections[0].id });
  },

  applyTemplate: (templateId: string) => {
    const tmpl = templateRegistry.find((t) => t.id === templateId);
    if (!tmpl) return;
    const { document } = get();
    const rawNodes = tmpl.createNodes();
    // Assign fresh IDs and ensure default metadata
    const nodes: Node[] = rawNodes.map((raw) => ({
      id: uid(),
      componentType: raw.componentType,
      name: raw.name ?? raw.componentType,
      props: raw.props ?? {},
      styles: raw.styles ?? {},
      tabletOverride: raw.tabletOverride ?? {},
      mobileOverride: raw.mobileOverride ?? {},
      children: [],
      layout: {},
      metadata: { createdAt: new Date().toISOString(), hidden: false },
    }));
    const nextDoc: ProjectDocument = {
      ...document,
      pages: [{ ...document.pages[0], sections: nodes }],
    };
    commit(set, get, nextDoc);
    set({ selectedId: null });
  },

  undo: () => {
    const { past, future, document } = get();
    if (!past.length) return;
    const previous = past[past.length - 1];
    set({
      past: past.slice(0, -1),
      future: [document, ...future].slice(0, HISTORY_LIMIT),
      document: previous,
    });
  },

  redo: () => {
    const { past, future, document } = get();
    if (!future.length) return;
    const next = future[0];
    set({
      future: future.slice(1),
      past: [...past, document].slice(-HISTORY_LIMIT),
      document: next,
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
  return {
    ...doc,
    projectType: doc.projectType ?? "landing",
    theme: {
      ...doc.theme,
      presets: normalizePresets(doc.theme?.presets ?? {}),
    },
  };
}

export function getSelectedNode(state: BuilderState): Node | null {
  if (!state.selectedId) return null;
  return findNode(state.document.pages[0].sections, state.selectedId);
}