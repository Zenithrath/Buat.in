import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const assetsRoot = path.join(root, "src", "templates", "imported-assets");
const outputRoot = path.join(root, "src", "templates", "imported");

const definitions = [
  ["bino.ts", "createBinoPages", "landing-agensi-kreatif", "bino", "bino/index.html"],
  ["balay-master.ts", "createBalayMasterPages", "landing-arsitek", "balay-master", "balay-master/index.html"],
  ["flameonepage-gh-pages.ts", "createFlameonepagePages", "landing-portofolio-onepage", "flameonepage-gh-pages", "flameonepage-gh-pages/index.html"],
  ["made.ts", "createMadePages", "landing-studio-kreatif", "made", "made/index.html"],
  ["royal-master.ts", "createRoyalMasterPages", "landing-hotel", "royal-master", "royal-master/index.html"],
  ["tasty-master.ts", "createTastyMasterPages", "landing-restoran-modern", "tasty-master", "tasty-master/index.html"],
  ["website-menu-03.ts", "createWebsiteMenuPages", "landing-kafe-menu", "website-menu-03", "website-menu-03/index.html"],
  ["adminator.ts", "createAdminatorPages", "dashboard-admin", "adminator", "index.html"],
  ["shadcn-admin-main.ts", "createShadcnAdminPages", "dashboard-operasional", "shadcn-admin-main", "shadcn-admin-main/index.html"],
  ["login-form-02.ts", "createLoginForm02Pages", "auth-login-minimal", "login-form-02", "login-form-02/index.html"],
  ["login-form-20.ts", "createLoginForm20Pages", "auth-login-split", "login-form-20", "login-form-20/index.html"],
  ["login-form-v16.ts", "createLoginFormV16Pages", "auth-login-gradasi", "login-form-v16", "Login_v16/index.html"],
];

const ignoredPageNames = new Set(["404.html", "500.html", "main.html"]);

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function normalizeRelative(value) {
  const normalized = path.posix.normalize(toPosix(value));
  return normalized.replace(/^\.\//, "").replace(/^\//, "");
}

function pageName(fileName) {
  const stem = path.basename(fileName, path.extname(fileName));
  if (stem.toLowerCase() === "index") return "Beranda";
  return stem
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function pagePath(fileName) {
  const stem = path.basename(fileName, path.extname(fileName)).toLowerCase();
  return stem === "index" ? "/" : `/${stem.replace(/[^a-z0-9]+/g, "-")}`;
}

function isExternal(value) {
  return /^(?:[a-z]+:|\/\/|data:|#|mailto:|tel:|javascript:)/i.test(value.trim());
}

function appendSuffix(value, suffix) {
  const match = value.match(/([?#].*)$/);
  return `${value.slice(0, match?.index ?? value.length)}${suffix}${match?.[1] ?? ""}`;
}

function localAssetUrl(value, pageDir, sourceRoot, templateId) {
  if (!value || isExternal(value)) return value;
  const raw = value.trim();
  const withoutSuffix = raw.replace(/[?#].*$/, "");
  const candidate = normalizeRelative(
    withoutSuffix.startsWith("/")
      ? withoutSuffix.slice(1)
      : path.posix.join(toPosix(pageDir), withoutSuffix)
  );
  const absolute = path.join(sourceRoot, candidate);
  if (!fs.existsSync(absolute) || fs.statSync(absolute).isDirectory()) return value;
  return appendSuffix(
    `/api/template-source/${templateId}/${candidate}`,
    ""
  );
}

function rewriteCssUrls(css, pageDir, sourceRoot, templateId) {
  return css.replace(/url\((\s*["']?)([^)"']+?)(["']?\s*)\)/gi, (_match, left, url, right) => {
    const rewritten = localAssetUrl(url, pageDir, sourceRoot, templateId);
    return `url(${left}${rewritten}${right})`;
  });
}

function rewriteAttribute(name, value, pageDir, sourceRoot, templateId) {
  if (["src", "poster", "data-src", "data-background"].includes(name)) {
    return localAssetUrl(value, pageDir, sourceRoot, templateId);
  }
  if (name === "srcset") {
    return value
      .split(",")
      .map((part) => {
        const [url, ...descriptor] = part.trim().split(/\s+/);
        return [localAssetUrl(url, pageDir, sourceRoot, templateId), ...descriptor].join(" ");
      })
      .join(", ");
  }
  if (name === "style") return rewriteCssUrls(value, pageDir, sourceRoot, templateId);
  return value;
}

function toRawNode(item, counter, pageDir, sourceRoot, templateId) {
  const id = `imported-${counter.next++}`;
  if (item.type === "text") {
    return {
      id,
      componentType: "imported-text",
      name: "Teks",
      props: { text: item.text, editable: item.text.trim().length > 0 },
      styles: {},
      tabletOverride: {},
      mobileOverride: {},
      children: [],
      metadata: { importedFromZip: true },
    };
  }

  const attributes = Object.fromEntries(
    Object.entries(item.attributes).map(([name, value]) => [
      name,
      rewriteAttribute(name, value, pageDir, sourceRoot, templateId),
    ])
  );
  const props = {
    tag: item.tag,
    attributes,
    src: attributes.src ?? "",
    alt: attributes.alt ?? "",
    href: attributes.href ?? "",
    value: item.value ?? attributes.value ?? "",
  };

  return {
    id,
    componentType: "imported-element",
    name: item.attributes.id ? `${item.tag} #${item.attributes.id}` : item.tag,
    props,
    styles: {},
    tabletOverride: {},
    mobileOverride: {},
    children: item.children.map((child) =>
      toRawNode(child, counter, pageDir, sourceRoot, templateId)
    ),
    metadata: { importedFromZip: true },
  };
}

async function extractPage(
  browser,
  html,
  htmlPath,
  pageDir,
  sourceRoot,
  templateId
) {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 15000 });
  const result = await page.evaluate(() => {
    function serialize(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        return { type: "text", text: node.textContent ?? "" };
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return null;
      const element = node;
      const tag = element.tagName.toLowerCase();
      if (["script", "noscript", "template", "link", "meta", "title"].includes(tag)) return null;
      const attributes = Object.fromEntries(
        Array.from(element.attributes).map((attribute) => [attribute.name, attribute.value])
      );
      return {
        type: "element",
        tag,
        attributes,
        value: ["input", "textarea", "select"].includes(tag) ? element.value : undefined,
        children: Array.from(element.childNodes).map(serialize).filter(Boolean),
      };
    }

    return {
      stylesheets: Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map((element) => element.getAttribute("href"))
        .filter(Boolean),
      inlineStyles: Array.from(document.querySelectorAll("style"))
        .map((element) => element.textContent ?? "")
        .filter(Boolean),
      body: Array.from(document.body?.childNodes ?? []).map(serialize).filter(Boolean),
    };
  });
  await page.close();

  const stylesheets = result.stylesheets
    .map((href) => localAssetUrl(href, pageDir, sourceRoot, templateId))
    .filter((href) => href.startsWith("/api/template-source/"));
  const inlineStyles = result.inlineStyles.map((css) =>
    rewriteCssUrls(css, pageDir, sourceRoot, templateId)
  );
  const counter = { next: 0 };
  return {
    id: path.basename(htmlPath, path.extname(htmlPath)).toLowerCase(),
    name: pageName(htmlPath),
    path: pagePath(htmlPath),
    isHome: path.basename(htmlPath).toLowerCase() === "index.html",
    sourcePath: toPosix(path.relative(sourceRoot, htmlPath)),
    stylesheets,
    inlineStyles,
    sections: result.body.map((node) =>
      toRawNode(node, counter, pageDir, sourceRoot, templateId)
    ),
  };
}

async function main() {
  fs.mkdirSync(outputRoot, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  try {
    for (const [fileName, exportName, templateId, folder, entry] of definitions) {
      const sourceRoot = path.join(assetsRoot, folder);
      const pageRoot = path.dirname(path.join(sourceRoot, entry));
      const htmlFiles = fs
        .readdirSync(pageRoot, { withFileTypes: true })
        .filter(
          (item) =>
            item.isFile() &&
            item.name.toLowerCase().endsWith(".html") &&
            !ignoredPageNames.has(item.name.toLowerCase())
        )
        .map((item) => path.join(pageRoot, item.name))
        .sort((a, b) => {
          const aHome = path.basename(a).toLowerCase() === "index.html";
          const bHome = path.basename(b).toLowerCase() === "index.html";
          return Number(bHome) - Number(aHome) || a.localeCompare(b);
        });

      const pages = [];
      for (const htmlPath of htmlFiles) {
        const html = fs.readFileSync(htmlPath, "utf8");
        pages.push(
          await extractPage(
            browser,
            html,
            htmlPath,
            path.relative(sourceRoot, path.dirname(htmlPath)),
            sourceRoot,
            templateId
          )
        );
      }

      const output = `import type { RawTemplatePage } from "@/templates";\n\nexport function ${exportName}(): RawTemplatePage[] {\n  return ${JSON.stringify(pages, null, 2)};\n}\n`;
      fs.writeFileSync(path.join(outputRoot, fileName), output, "utf8");
      console.log(`${templateId}: ${pages.length} page(s) -> ${fileName}`);
    }
  } finally {
    await browser.close();
  }
}

await main();
