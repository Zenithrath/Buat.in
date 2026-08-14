"use client";

import { ArrowUpRight } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import {
  InlineEditableImage,
  InlineEditableLink,
  InlineEditableText,
} from "@/components/preview/InlineEditable";
import { listValue, nodeList, uniqueId } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";

interface Member {
  id: string;
  name: string;
  role: string;
  initials: string;
  imageUrl: string;
  socialUrl: string;
}

const FALLBACK: Member[] = [
  { id: "alya", name: "Alya Ramadhani", role: "Creative Director", initials: "AR", imageUrl: "", socialUrl: "#" },
  { id: "dimas", name: "Dimas Pratama", role: "Brand Strategist", initials: "DP", imageUrl: "", socialUrl: "#" },
  { id: "kezia", name: "Kezia Hartono", role: "Product Designer", initials: "KH", imageUrl: "", socialUrl: "#" },
  { id: "fariz", name: "Faris Putra", role: "Web Developer", initials: "FP", imageUrl: "", socialUrl: "#" },
];

function members(node: Node): Member[] {
  const list = nodeList(node, "members")
    .map((item, index) => {
      const name = listValue(item, "name");
      if (!name) return null;
      return {
        id: uniqueId("member", index, name),
        name,
        role: listValue(item, "role"),
        initials: listValue(item, "initials", name.slice(0, 2).toUpperCase()),
        imageUrl: listValue(item, "imageUrl"),
        socialUrl: listValue(item, "socialUrl", "#"),
      };
    })
    .filter((item): item is Member => item !== null);

  return list.length ? list : FALLBACK;
}

function cols(node: Node, device: ReturnType<typeof usePreviewDevice>) {
  const count = propString(node, "columns");
  if (device === "mobile") return "grid-cols-1";
  if (device) return count === "2" ? "grid-cols-2" : count === "3" ? "grid-cols-3" : "grid-cols-4";
  return count === "2"
    ? "grid-cols-1 sm:grid-cols-2"
    : count === "3"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
}

export function TeamGridPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const items = members(node);
  const { setValue } = useRepeaterEditor(node, "members");
  const eyebrow = propString(node, "eyebrow").trim() || "Orang di balik pekerjaan";
  const title = propString(node, "title").trim() || "Tim kecil dengan perhatian besar pada detail.";
  const description =
    propString(node, "description").trim() ||
    "Kami menggabungkan sudut pandang strategis, desain, dan teknologi dalam satu meja kerja.";
  const padding =
    device === "mobile" ? "px-5 py-12" : device ? "px-8 py-20" : "px-5 py-12 sm:px-8 sm:py-20";
  const titleSize = device === "mobile" ? "text-3xl" : device ? "text-4xl" : "text-3xl sm:text-4xl";

  return (
    <section
      className={`w-full bg-background ${padding}`}
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
            <InlineEditableText
              node={node}
              propKey="eyebrow"
              value={eyebrow}
              fallback="Orang di balik pekerjaan"
            />
          </p>
          <h2
            className={`mt-3 font-[family-name:var(--font-heading)] font-extrabold tracking-[-0.045em] text-foreground ${titleSize}`}
          >
            <InlineEditableText
              node={node}
              propKey="title"
              value={title}
              fallback="Tim kecil dengan perhatian besar pada detail."
              multiline
            />
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            <InlineEditableText
              node={node}
              propKey="description"
              value={description}
              fallback="Kami menggabungkan sudut pandang strategis, desain, dan teknologi dalam satu meja kerja."
              multiline
            />
          </p>
        </div>

        <div className={`mt-10 grid gap-4 ${cols(node, device)}`}>
          {items.map((member, index) => (
            <article
              key={member.id}
              className="group min-w-0 overflow-hidden rounded-[var(--radius)] border border-border bg-card shadow-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <InlineEditableImage
                  node={node}
                  imageKey="members"
                  src={member.imageUrl}
                  alt={member.name}
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  emptyContent={
                    <div className="flex h-full w-full items-end bg-[radial-gradient(circle_at_18%_20%,var(--primary),transparent_52%)] p-4">
                      <span className="font-[family-name:var(--font-heading)] text-4xl font-extrabold tracking-[-0.08em] text-primary-foreground">
                        <InlineEditableText
                          node={node}
                          propKey="members"
                          value={member.initials}
                          onCommit={(next) => setValue(index, "initials", next)}
                        />
                      </span>
                    </div>
                  }
                  onImageCommit={(next) => setValue(index, "imageUrl", next)}
                />
                <InlineEditableLink
                  node={node}
                  propKey="members"
                  urlKey="members"
                  value={`Profil ${member.name}`}
                  urlValue={member.socialUrl}
                  onCommit={() => undefined}
                  onUrlCommit={(next) => setValue(index, "socialUrl", next)}
                  ariaLabel={`Lihat profil ${member.name}`}
                  textClassName="sr-only"
                  className="absolute right-3 top-3 z-10"
                  linkClassName="flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-transform group-hover:-translate-y-0.5"
                >
                  <ArrowUpRight size={16} aria-hidden="true" />
                </InlineEditableLink>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground">
                  <InlineEditableText
                    node={node}
                    propKey="members"
                    value={member.name}
                    onCommit={(next) => setValue(index, "name", next)}
                  />
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  <InlineEditableText
                    node={node}
                    propKey="members"
                    value={member.role}
                    onCommit={(next) => setValue(index, "role", next)}
                  />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
