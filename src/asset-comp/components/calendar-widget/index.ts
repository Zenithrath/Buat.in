import type { ComponentRegistryItem } from "@/lib/registry/types";
import { calendarWidgetManifest } from "./manifest";
import { CalendarWidgetPreview } from "./preview";
import { calendarWidgetExport } from "./export";

export const calendarWidgetComponent: ComponentRegistryItem = {
  ...calendarWidgetManifest,
  previewRenderer: CalendarWidgetPreview,
  exportAdapter: calendarWidgetExport,
};
