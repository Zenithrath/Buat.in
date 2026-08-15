"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import {
  projectTokenStyle,
  propString,
  themeTokenStyle,
} from "@/lib/registry/shared";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { nodeList, listValue } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
}

const DEFAULT_STEPS: Step[] = [
  {
    id: "s1",
    title: "Isi data bisnis",
    description: "Lengkapi nama toko, alamat, dan kontak yang akan tampil di halaman Anda.",
  },
  {
    id: "s2",
    title: "Pilih template dan warna",
    description: "Pilih tata letak yang sesuai lalu sesuaikan warnanya dengan identitas merek.",
  },
  {
    id: "s3",
    title: "Ekspor dan terbitkan",
    description: "Unduh hasilnya dan pasang di hosting Anda sendiri tanpa biaya langganan.",
  },
];

function parseSteps(node: Node): Step[] {
  const source = node.props.steps === undefined ? "stepsJson" : "steps";
  const items = nodeList(node, source)
    .map((item, index) => {
      const title = listValue(item, "title");
      if (!title) return null;
      return {
        id: String(item.id ?? `step-${index + 1}`),
        title,
        description: listValue(item, "description", ""),
      };
    })
    .filter((item): item is Step => item !== null);
  return items.length ? items : DEFAULT_STEPS;
}

export function ProcessStepsPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const previewDevice = usePreviewDevice();
  const isCanvasMobile = previewDevice === "mobile";
  const eyebrow = propString(node, "eyebrow").trim() || "Cara kerja";
  const heading =
    propString(node, "heading").trim() || "Mulai dari tiga langkah sederhana";
  const steps = parseSteps(node);
  const key = node.props.steps === undefined ? "stepsJson" : "steps";
  const { setValue } = useRepeaterEditor(node, key);

  const gridCols =
    previewDevice === null
      ? "grid-cols-1 sm:grid-cols-3"
      : isCanvasMobile
        ? "grid-cols-1"
        : "grid-cols-3";
  const showLine =
    previewDevice === null ? "hidden sm:block" : isCanvasMobile ? "hidden" : "block";
  const titleSize =
    previewDevice === null
      ? "text-2xl sm:text-3xl"
      : isCanvasMobile
        ? "text-2xl"
        : "text-3xl";

  return (
    <section
      className="w-full border-y border-border bg-background px-5 py-14 sm:px-8"
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
          <InlineEditableText node={node} propKey="eyebrow" fallback="Cara kerja" value={eyebrow} />
        </p>
        <h2
          className={cn(
            "mt-2 text-center font-[family-name:var(--font-heading)] font-extrabold tracking-[-0.05em] text-foreground",
            titleSize
          )}
        >
          <InlineEditableText
            node={node}
            propKey="heading"
            fallback="Mulai dari tiga langkah sederhana"
            value={heading}
            multiline
          />
        </h2>

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className={cn(
              "absolute left-[16.6667%] right-[16.6667%] top-7 border-t-2 border-dashed border-border",
              showLine
            )}
          />
          <div className={cn("relative grid gap-10", gridCols)}>
            {steps.map((step, index) => (
              <div key={step.id} className="relative text-center">
                <span className="grid size-14 place-items-center rounded-full border border-border bg-card font-[family-name:var(--font-heading)] text-xl font-extrabold text-primary shadow-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-base font-bold tracking-[-0.02em] text-foreground">
                  <InlineEditableText
                    node={node}
                    propKey={key}
                    value={step.title}
                    onCommit={(next) => setValue(index, "title", next)}
                  />
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                  <InlineEditableText
                    node={node}
                    propKey={key}
                    value={step.description}
                    onCommit={(next) => setValue(index, "description", next)}
                    multiline
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
