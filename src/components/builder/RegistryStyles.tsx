"use client";

import { useMemo } from "react";
import { collectRegistryCss } from "@/lib/registry/styles";

export function RegistryStyles() {
  const css = useMemo(() => collectRegistryCss(), []);
  return <style>{css}</style>;
}