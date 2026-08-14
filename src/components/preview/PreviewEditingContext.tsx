"use client";

import { createContext, useContext } from "react";

/**
 * Preview components are also used by the read-only preview route and the
 * exported HTML.  This small opt-in context keeps direct editing exclusive to
 * the builder canvas, where it belongs.
 */
const PreviewEditingContext = createContext(false);

export function PreviewEditingProvider({
  enabled,
  children,
}: {
  enabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <PreviewEditingContext.Provider value={Boolean(enabled)}>
      {children}
    </PreviewEditingContext.Provider>
  );
}

export function usePreviewEditing() {
  return useContext(PreviewEditingContext);
}
