"use client";

import { LockKeyhole, Mail } from "lucide-react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";
import { BrandMark } from "../_shared/logo";

function copy(node: Node, key: string, fallback: string) {
  return propString(node, key).trim() || fallback;
}

export function AuthLoginPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const layout = copy(node, "layout", "centered");
  const logoText = copy(node, "logoText", "Karsa Studio");
  const heading = copy(node, "heading", "Selamat datang kembali.");
  const subtitle = copy(
    node,
    "subtitle",
    "Masuk untuk melanjutkan pekerjaan Anda di dasbor."
  );
  const emailLabel = copy(node, "emailLabel", "Email");
  const emailPlaceholder = copy(node, "emailPlaceholder", "nama@perusahaan.com");
  const passwordLabel = copy(node, "passwordLabel", "Kata sandi");
  const passwordPlaceholder = copy(node, "passwordPlaceholder", "Masukkan kata sandi");
  const buttonText = copy(node, "buttonText", "Masuk");
  const showRemember = node.props.showRemember !== false;
  const rememberText = copy(node, "rememberText", "Ingat saya di perangkat ini");
  const showForgot = node.props.showForgot !== false;
  const forgotText = copy(node, "forgotText", "Lupa kata sandi?");
  const forgotUrl = copy(node, "forgotUrl", "#");
  const footerText = copy(node, "footerText", "Belum punya akun?");
  const footerLinkText = copy(node, "footerLinkText", "Daftar gratis");
  const footerLinkUrl = copy(node, "footerLinkUrl", "#");
  const splitImageUrl = propString(node, "splitImageUrl");
  const splitTitle = copy(
    node,
    "splitTitle",
    "Tempat tim mengelola 120+ proyek digital."
  );
  const splitText = copy(
    node,
    "splitText",
    "Karsa Studio dipakai 40 tim di Indonesia untuk merancang, menyetujui, dan meluncurkan website dari satu dasbor."
  );

  const gradient =
    layout === "gradient"
      ? `linear-gradient(135deg, ${tokens.primary}, ${tokens.chart[2]})`
      : undefined;
  const isMobile = device === "mobile";

  const panel = (
    <div className="w-full max-w-md rounded-[var(--radius)] border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-2.5">
        <BrandMark
          node={node}
          name={logoText}
          imgClassName="h-8 w-auto"
          letterClassName="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-extrabold text-primary-foreground"
          hideLetter={false}
        />
        <span className="text-base font-extrabold tracking-tight text-foreground">
          <InlineEditableText node={node} propKey="logoText" value={logoText} fallback="Karsa Studio" />
        </span>
      </div>
      <h2 className="mt-6 font-[family-name:var(--font-heading)] text-2xl font-extrabold leading-tight tracking-[-0.04em] text-foreground sm:text-3xl">
        <InlineEditableText node={node} propKey="heading" value={heading} fallback="Selamat datang kembali." multiline />
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        <InlineEditableText node={node} propKey="subtitle" value={subtitle} fallback="Masuk untuk melanjutkan pekerjaan Anda di dasbor." multiline />
      </p>
      <form data-canvas-interactive className="mt-7 grid gap-4" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-1.5 text-sm font-semibold text-foreground">
          <span>{emailLabel}</span>
          <span className="relative">
            <Mail size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              required
              type="email"
              name="email"
              placeholder={emailPlaceholder}
              className="h-11 w-full rounded-[calc(var(--radius)*.75)] border border-input bg-background pl-9 pr-3 text-sm outline-none ring-ring/30 transition focus:ring-4"
            />
          </span>
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-foreground">
          <span>{passwordLabel}</span>
          <span className="relative">
            <LockKeyhole size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              required
              type="password"
              name="password"
              placeholder={passwordPlaceholder}
              className="h-11 w-full rounded-[calc(var(--radius)*.75)] border border-input bg-background pl-9 pr-3 text-sm outline-none ring-ring/30 transition focus:ring-4"
            />
          </span>
        </label>
        {(showRemember || showForgot) && (
          <div className="flex items-center justify-between gap-3 text-[13px]">
            {showRemember ? (
              <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  name="remember"
                  className="size-4 rounded border-input accent-[var(--primary)]"
                  defaultChecked
                />
                <span>{rememberText}</span>
              </label>
            ) : (
              <span />
            )}
            {showForgot && (
              <a href={forgotUrl} className="font-bold text-primary hover:underline">
                <InlineEditableText node={node} propKey="forgotText" value={forgotText} fallback="Lupa kata sandi?" />
              </a>
            )}
          </div>
        )}
        <button
          type="submit"
          className="mt-1 h-11 w-full rounded-[calc(var(--radius)*.75)] bg-primary text-sm font-bold text-primary-foreground shadow-sm transition hover:brightness-110 active:scale-[0.99]"
        >
          <InlineEditableText node={node} propKey="buttonText" value={buttonText} fallback="Masuk" />
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {footerText}{" "}
        <a href={footerLinkUrl} className="font-bold text-primary hover:underline">
          <InlineEditableText node={node} propKey="footerLinkText" value={footerLinkText} fallback="Daftar gratis" />
        </a>
      </p>
    </div>
  );

  if (layout === "split" && !isMobile) {
    return (
      <section
        className="grid min-h-[520px] w-full grid-cols-[1.05fr_1fr]"
        style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
      >
        <div
          className="flex min-h-full flex-col justify-end bg-cover bg-center p-8 text-white"
          style={splitImageUrl ? { backgroundImage: `url("${splitImageUrl}")` } : { backgroundImage: gradient ?? `linear-gradient(135deg, ${tokens.primary}, ${tokens.chart[2]})` }}
        >
          <p className="max-w-md font-[family-name:var(--font-heading)] text-2xl font-extrabold leading-snug tracking-[-0.03em]">
            <InlineEditableText node={node} propKey="splitTitle" value={splitTitle} fallback="Tempat tim mengelola 120+ proyek digital." multiline />
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/85">
            <InlineEditableText node={node} propKey="splitText" value={splitText} fallback="Karsa Studio dipakai 40 tim di Indonesia untuk merancang, menyetujui, dan meluncurkan website dari satu dasbor." multiline />
          </p>
        </div>
        <div className="flex min-h-full items-center justify-center bg-secondary/40 px-6 py-10">{panel}</div>
      </section>
    );
  }

  return (
    <section
      className="flex min-h-[520px] w-full items-center justify-center px-4 py-10"
      style={{
        ...themeTokenStyle(tokens),
        ...projectTokenStyle(tokens),
        backgroundImage: gradient,
      }}
    >
      {panel}
    </section>
  );
}