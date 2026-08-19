/**
 * Verifikasi Snapshot Otomatis — PRD §3.4
 *
 * Ekspor beberapa dokumen contoh (template) ke HTML statis, lalu ambil
 * tangkapan layar pada lebar 390, 768, dan 1440. Gagal (exit code 1) bila
 * ada overflow horizontal — dipakai untuk menolak regresi saat menambah
 * komponen atau mengubah tema.
 *
 * Jalankan: npm run snapshot
 * Hasil:    folder .snapshots/<kasus>/<lebar>.png
 */
import { chromium } from "@playwright/test";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildExportFiles } from "../src/lib/export/html";
import { createTemplateProject } from "../src/lib/schema/defaults";

const WIDTHS = [390, 768, 1440];

const CASES: { id: string; template: string; label: string }[] = [
  { id: "landing-restoran", template: "landing-restoran", label: "Landing Restoran (hero-split)" },
  { id: "landing-event", template: "landing-event", label: "Landing Acara (hero-bg-image)" },
  { id: "landing-saas", template: "landing-saas", label: "Landing Company Profile (hero-centered)" },
  { id: "dashboard-helpdesk", template: "dashboard-helpdesk", label: "Dashboard Helpdesk" },
  { id: "dashboard-analytics", template: "dashboard-analytics", label: "Dashboard Analytics" },
];

const ROOT = join(process.cwd(), ".snapshots");

async function main() {
  rmSync(ROOT, { recursive: true, force: true });
  mkdirSync(ROOT, { recursive: true });

  const browser = await chromium.launch();
  let failures = 0;
  let total = 0;

  for (const c of CASES) {
    const caseDir = join(ROOT, c.id);
    mkdirSync(caseDir, { recursive: true });
    const doc = createTemplateProject(`snapshot-${c.id}`, c.template);
    const files = buildExportFiles(doc);
    for (const file of files) {
      const target = join(caseDir, file.path);
      const parent = file.path.includes("/") ? join(caseDir, file.path.split("/").slice(0, -1).join("/")) : caseDir;
      mkdirSync(parent, { recursive: true });
      writeFileSync(target, file.content, file.base64 ? { encoding: "base64" } : "utf8");
    }

    const page = await browser.newPage();
    await page.route("**/*", (route) => {
      const url = route.request().url();
      if (url.startsWith("file://")) route.continue();
      else route.abort();
    });

    for (const width of WIDTHS) {
      total += 1;
      await page.setViewportSize({ width, height: 800 });
      await page.goto(`file://${join(caseDir, "index.html").replace(/\\/g, "/")}`, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });
      await page.waitForTimeout(150);
      await page.screenshot({ path: join(caseDir, `${width}.png`), fullPage: true });

      const { scrollWidth, clientWidth } = await page.evaluate(() => {
        const docEl = document.documentElement;
        const body = document.body;
        return {
          scrollWidth: Math.max(docEl.scrollWidth, body.scrollWidth),
          clientWidth: Math.max(docEl.clientWidth, body.clientWidth),
        };
      });
      const overflow = scrollWidth > clientWidth;
      const status = overflow ? "GAGAL (overflow)" : "OK";
      if (overflow) failures += 1;
      console.log(
        `${status.padEnd(16)} ${c.label.padEnd(38)} ${String(width).padStart(4)}px  scroll=${scrollWidth} client=${clientWidth}`
      );
    }
    await page.close();
  }

  await browser.close();
  console.log(`\nTotal: ${total} snapshot, ${failures} gagal.`);
  console.log(`Folder hasil: ${ROOT}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});