"use client";

import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export function Tabs({
  items,
  active,
  onChange,
}: {
  items: TabItem[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex border-b border-zinc-200">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 border-b-2 px-2 py-2.5 text-xs font-medium transition-colors",
            active === item.id
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          )}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}