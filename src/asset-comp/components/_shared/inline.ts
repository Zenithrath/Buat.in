"use client";

import { useCallback } from "react";
import type { Node } from "@/lib/schema/types";
import { useBuilderStore } from "@/lib/store/project-store";
import { recordList, stringList } from "./content";

function writeCollection(original: unknown, records: Record<string, unknown>[]) {
  // Preserve legacy imported documents that still store a repeater as JSON,
  // while every edit made in a new document remains a normal visual array.
  return typeof original === "string" ? JSON.stringify(records) : records;
}

/** Canvas-only callbacks for inline editing a visual repeater item. */
export function useRepeaterEditor(node: Node, key: string) {
  const updateNode = useBuilderStore((state) => state.updateNode);

  const setValue = useCallback(
    (index: number, field: string, value: string) => {
      updateNode(node.id, (current) => {
        const original = current.props[key];
        const records = recordList(original).map((item) => ({ ...item }));
        if (!records[index]) return current;
        records[index][field] = value;
        return {
          ...current,
          props: { ...current.props, [key]: writeCollection(original, records) },
        };
      });
    },
    [key, node.id, updateNode]
  );

  const setStringListValue = useCallback(
    (index: number, field: string, valueIndex: number, value: string) => {
      updateNode(node.id, (current) => {
        const original = current.props[key];
        const records = recordList(original).map((item) => ({ ...item }));
        const record = records[index];
        if (!record) return current;
        const originalValues = record[field];
        const values = stringList(originalValues);
        if (valueIndex >= values.length) return current;
        values[valueIndex] = value;
        record[field] = typeof originalValues === "string" ? values.join("\n") : values;
        return {
          ...current,
          props: { ...current.props, [key]: writeCollection(original, records) },
        };
      });
    },
    [key, node.id, updateNode]
  );

  return { setValue, setStringListValue };
}
