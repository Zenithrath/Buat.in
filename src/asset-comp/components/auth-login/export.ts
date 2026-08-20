import type { ExportContext, ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString, sanitizeUrl, sectionStyleVars } from "@/lib/registry/shared";
import { logoMarkHtml } from "../_shared/logo-export";

function copy(node: Node, key: string, fallback: string) {
  return propString(node, key).trim() || fallback;
}

export function authLoginExport(node: Node, ctx: ExportContext): ExportResult {
  const layout = copy(node, "layout", "centered");
  const logoText = copy(node, "logoText", "Karsa Studio");
  const heading = copy(node, "heading", "Selamat datang kembali.");
  const subtitle = copy(node, "subtitle", "Masuk untuk melanjutkan pekerjaan Anda di dasbor.");
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
  const splitImageAlt = copy(node, "splitImageAlt", "Ilustrasi ruang kerja tim");
  const splitTitle = copy(node, "splitTitle", "Tempat tim mengelola 120+ proyek digital.");
  const splitText = copy(node, "splitText", "Karsa Studio dipakai 40 tim di Indonesia untuk merancang, menyetujui, dan meluncurkan website dari satu dasbor.");
  const bg = node.styles.background ?? "default";
  const vars = sectionStyleVars(node, ctx.tokens);

  const brand = logoMarkHtml(node, logoText, "bi-auth-logo-img", "bi-auth-logo-letter");
  const panel = `
  <div class="bi-auth-panel">
    <div class="bi-auth-brand">${brand}<span>${escapeHtml(logoText)}</span></div>
    <h1 class="bi-auth-title">${escapeHtml(heading)}</h1>
    <p class="bi-auth-sub">${escapeHtml(subtitle)}</p>
    <form class="bi-auth-form" data-bi-auth-form>
      <label class="bi-auth-field"><span>${escapeHtml(emailLabel)}</span><input required type="email" name="email" placeholder="${escapeHtml(emailPlaceholder)}"></label>
      <label class="bi-auth-field"><span>${escapeHtml(passwordLabel)}</span><input required type="password" name="password" placeholder="${escapeHtml(passwordPlaceholder)}"></label>
      ${showRemember || showForgot ? `<div class="bi-auth-row">${showRemember ? `<label class="bi-auth-check"><input type="checkbox" checked>${escapeHtml(rememberText)}</label>` : "<span></span>"}${showForgot ? `<a href="${escapeHtml(sanitizeUrl(forgotUrl))}">${escapeHtml(forgotText)}</a>` : ""}</div>` : ""}
      <button class="bi-auth-btn" type="submit">${escapeHtml(buttonText)}</button>
    </form>
    <p class="bi-auth-foot">${escapeHtml(footerText)} <a href="${escapeHtml(sanitizeUrl(footerLinkUrl))}">${escapeHtml(footerLinkText)}</a></p>
  </div>`;

  const inner =
    layout === "split"
      ? `<div class="bi-auth-split">
    <div class="bi-auth-split-media"${splitImageUrl ? ` style="background-image:url('${escapeHtml(sanitizeUrl(splitImageUrl))}')"` : ""}>
      <h2>${escapeHtml(splitTitle)}</h2>
      <p>${escapeHtml(splitText)}</p>
      <p class="bi-auth-split-alt">${escapeHtml(splitImageAlt)}</p>
    </div>
    <div class="bi-auth-split-form">${panel.replace(/\n  /g, "\n    ")}</div>
  </div>`
      : `<div class="bi-auth-stage" data-variant="${escapeHtml(layout)}">${panel.replace(/\n  /g, "\n    ")}</div>`;

  return {
    html: `<section class="bi-auth" style="${vars}" data-bg="${escapeHtml(bg)}" data-variant="${escapeHtml(layout)}">${inner}</section>`,
    css: `.bi-auth {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bi-bg, #ffffff);
  padding: var(--bi-pad, 40px);
  font-family: var(--bi-font-body, inherit);
  color: var(--bi-fg, inherit);
}

.bi-auth[data-bg="glass"] {
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
}

.bi-auth[data-variant="gradient"] {
  background-image: linear-gradient(135deg, var(--bi-primary, #0f766e), var(--bi-chart-2, #d97706));
}

.bi-auth-stage {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bi-auth-panel {
  width: 100%;
  max-width: 420px;
  background: var(--bi-card, #ffffff);
  border: 1px solid var(--bi-border, #e2e8f0);
  border-radius: var(--bi-radius, 16px);
  box-shadow: var(--bi-shadow, 0 10px 40px rgba(0,0,0,.08));
  padding: 32px;
  text-align: left;
}

.bi-auth-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 17px;
  letter-spacing: -0.02em;
}

.bi-auth-logo-img { height: 32px; width: auto; }

.bi-auth-logo-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: calc(var(--bi-radius, 16px) * 0.6);
  background: var(--bi-primary, #0f766e);
  color: var(--bi-primary-fg, #ffffff);
  font-weight: 800;
  font-size: 15px;
}

.bi-auth-title {
  margin: 24px 0 0;
  font-family: var(--bi-font-heading, inherit);
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.bi-auth-sub {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.6;
  opacity: .75;
}

.bi-auth-form { display: grid; gap: 14px; margin-top: 26px; }

.bi-auth-field { display: grid; gap: 6px; font-size: 14px; font-weight: 600; }

.bi-auth-field input {
  width: 100%;
  height: 44px;
  border: 1px solid var(--bi-input, #cbd5e1);
  border-radius: calc(var(--bi-radius, 16px) * 0.75);
  padding: 0 12px;
  font-size: 14px;
  font-family: inherit;
  color: var(--bi-fg, inherit);
  background: var(--bi-background, #ffffff);
  box-sizing: border-box;
}

.bi-auth-field input:focus {
  outline: 3px solid color-mix(in srgb, var(--bi-ring, #0f766e) 30%, transparent);
  border-color: var(--bi-ring, #0f766e);
}

.bi-auth-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
}

.bi-auth-row a { color: var(--bi-primary, #0f766e); font-weight: 700; text-decoration: none; }

.bi-auth-check {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  opacity: .75;
  cursor: pointer;
}

.bi-auth-btn {
  width: 100%;
  height: 46px;
  border: none;
  border-radius: calc(var(--bi-radius, 16px) * 0.75);
  background: var(--bi-primary, #0f766e);
  color: var(--bi-primary-fg, #ffffff);
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: filter .15s ease;
}

.bi-auth-btn:hover { filter: brightness(1.08); }

.bi-auth-foot { margin: 24px 0 0; text-align: center; font-size: 14px; opacity: .8; }

.bi-auth-foot a { color: var(--bi-primary, #0f766e); font-weight: 700; text-decoration: none; }

.bi-auth-split {
  width: 100%;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  min-height: 100vh;
  overflow: hidden;
}

.bi-auth-split-media {
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px;
  color: #ffffff;
}

.bi-auth-split-media::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,.1));
}

.bi-auth-split-media h2 {
  position: relative;
  max-width: 440px;
  margin: 0;
  font-family: var(--bi-font-heading, inherit);
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.bi-auth-split-media p {
  position: relative;
  max-width: 440px;
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.6;
  opacity: .88;
}

.bi-auth-split-alt { font-size: 12px !important; opacity: .6 !important; }

.bi-auth-split-form {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  background: var(--bi-secondary, #f1f5f9);
}

.bi-auth-split-form .bi-auth-panel { max-width: 400px; }

@media (max-width: 900px) {
  .bi-auth-split { grid-template-columns: 1fr; }
  .bi-auth-split-media { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .bi-auth * { transition: none !important; }
}`,
  };
}