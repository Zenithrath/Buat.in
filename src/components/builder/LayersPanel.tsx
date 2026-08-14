"use client";

import { useState } from "react";
import { useBuilderStore } from "@/lib/store/project-store";
import { getComponent } from "@/lib/registry";
import {
  Layers,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Edit2,
  Check,
} from "lucide-react";
import type { Node } from "@/lib/schema/types";

function LayerNode({ node }: { node: Node }) {
  const selectedId = useBuilderStore((s) => s.selectedId);
  const select = useBuilderStore((s) => s.select);
  const duplicateSection = useBuilderStore((s) => s.duplicateSection);
  const removeSection = useBuilderStore((s) => s.removeSection);
  const toggleNodeVisibility = useBuilderStore((s) => s.toggleNodeVisibility);
  const renameNode = useBuilderStore((s) => s.renameNode);

  const [expanded, setExpanded] = useState(true);
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(node.name || node.componentType);

  const isSelected = selectedId === node.id;
  const isHidden = node.metadata?.hidden;
  const hasChildren = node.children && node.children.length > 0;
  const manifest = getComponent(node.componentType);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      renameNode(node.id, nameInput.trim());
    }
    setEditing(false);
  };

  return (
    <div className="space-y-0.5">
      <div
        onClick={() => select(node.id)}
        className={`group flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors ${
          isSelected
            ? "bg-primary text-primary-foreground font-semibold"
            : isHidden
            ? "opacity-50 hover:bg-muted"
            : "hover:bg-muted text-foreground"
        }`}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
            className="p-0.5 opacity-70 hover:opacity-100"
          >
            {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </button>
        ) : (
          <span className="w-3.5" />
        )}

        {editing ? (
          <div className="flex flex-1 items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
              className="h-6 w-full rounded border bg-background px-1 text-xs text-foreground"
              autoFocus
            />
            <button
              type="button"
              onClick={handleSaveName}
              className="rounded p-1 hover:bg-muted"
            >
              <Check size={12} />
            </button>
          </div>
        ) : (
          <span className="flex-1 truncate">
            {node.name || manifest?.name || node.componentType}
          </span>
        )}

        <div className="hidden items-center gap-0.5 group-hover:flex">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleNodeVisibility(node.id);
            }}
            className="rounded p-1 hover:bg-background/20"
            title={isHidden ? "Tampilkan" : "Sembunyikan"}
          >
            {isHidden ? <EyeOff size={12} /> : <Eye size={12} />}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
            className="rounded p-1 hover:bg-background/20"
            title="Ganti nama"
          >
            <Edit2 size={12} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              duplicateSection(node.id);
            }}
            className="rounded p-1 hover:bg-background/20"
            title="Duplikat"
          >
            <Copy size={12} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeSection(node.id);
            }}
            className="rounded p-1 hover:bg-destructive/20 text-destructive"
            title="Hapus"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {hasChildren && expanded ? (
        <div className="ml-3.5 border-l pl-2 space-y-0.5">
          {node.children.map((child) => (
            <LayerNode key={child.id} node={child} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function LayersPanel() {
  const sections = useBuilderStore((s) => s.document.pages[0].sections);
  const pageName = useBuilderStore((s) => s.document.pages[0].name);

  return (
    <div className="space-y-4 p-1">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-1.5">
          <Layers size={14} className="text-primary" />
          <span className="text-xs font-bold text-foreground">{pageName}</span>
        </div>
        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
          {sections.length} Lapisan
        </span>
      </div>

      {sections.length === 0 ? (
        <div className="py-8 text-center text-xs text-muted-foreground">
          Belum ada lapisan komponen di kanvas.
        </div>
      ) : (
        <div className="space-y-1">
          {sections.map((sec) => (
            <LayerNode key={sec.id} node={sec} />
          ))}
        </div>
      )}
    </div>
  );
}
