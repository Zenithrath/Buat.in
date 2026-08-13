import { create } from "zustand";
import type {
  Device,
  Node,
  ProjectDocument,
  Theme,
} from "@/lib/schema/types";
import { createBlankProject, createDefaultNode } from "@/lib/schema/defaults";
import { uid } from "@/lib/utils";

const HISTORY_LIMIT = 50;

function findNode(nodes: Node[], id: string): Node | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    const found = findNode(node.children, id);
    if (found) return found;
  }
  return null;
}

function mapNode(nodes: Node[], id: string, fn: (node: Node) => Node): Node[] {
  return nodes.map((node) => {
    if (node.id === id) return fn(node);
    return { ...node, children: mapNode(node.children, id, fn) };
  });
}

export type SaveStatus = "idle" | "saving" | "saved";

interface BuilderState {
  document: ProjectDocument;
  selectedId: string | null;
  past: ProjectDocument[];
  future: ProjectDocument[];
  saveStatus: SaveStatus;
  loaded: boolean;
  loadError: boolean;

  select: (id: string | null) => void;
  setDevice: (device: Device) => void;
  setDocument: (doc: ProjectDocument) => void;
  markLoadError: () => void;
  updateNode: (id: string, updater: (node: Node) => Node) => void;
  addSection: (componentType: string, index?: number) => void;
  removeSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  moveSection: (fromIndex: number, toIndex: number) => void;
  updateTheme: (updater: (theme: Theme) => Theme) => void;
  renameProject: (name: string) => void;
  updateSeo: (updater: (seo: ProjectDocument["seo"]) => ProjectDocument["seo"]) => void;
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

  select: (id) => set({ selectedId: id }),

  markLoadError: () =>
    set({ loadError: true, loaded: false }),

  setDevice: (device) =>
    set({
      document: {
        ...get().document,
        settings: { ...get().document.settings, device },
      },
    }),

  setDocument: (doc) =>
    set({
      document: doc,
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

  addSection: (componentType, index) => {
    const { document } = get();
    const node = createDefaultNode(componentType);
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

  removeSection: (id) => {
    const { document } = get();
    const nextDoc: ProjectDocument = {
      ...document,
      pages: [
        {
          ...document.pages[0],
          sections: document.pages[0].sections.filter((s) => s.id !== id),
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
    return doc;
  } catch {
    return null;
  }
}

export function getSelectedNode(state: BuilderState): Node | null {
  if (!state.selectedId) return null;
  return findNode(state.document.pages[0].sections, state.selectedId);
}