"use client";

import { createContext, useContext } from "react";
import type { Device } from "@/lib/schema/types";

// Canvas lives inside a fixed-size frame while the editor itself is usually a
// wide desktop window. Browser media queries therefore cannot describe the
// selected canvas width. Renderers can opt into this context to match the
// actual Desktop / Tablet / Mobile frame without changing public exports.
const PreviewDeviceContext = createContext<Device | null>(null);

export function PreviewDeviceProvider({
  device,
  children,
}: {
  device: Device;
  children: React.ReactNode;
}) {
  return (
    <PreviewDeviceContext.Provider value={device}>
      {children}
    </PreviewDeviceContext.Provider>
  );
}

export function usePreviewDevice() {
  return useContext(PreviewDeviceContext);
}
