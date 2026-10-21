#!/usr/bin/env node
/**
 * Refresh the portfolio screenshots in /public/projects.
 *
 * Uses the Microsoft Edge or Google Chrome already installed on your computer
 * (no big browser download). Reads every project slug + url from src/data/projects.ts.
 *
 *   npm run capture                 → capture all projects
 *   npm run capture -- the-que-guy  → capture one project (by slug)
 *
 * Output: public/projects/<slug>.jpg (1440×900) and <slug>-mobile.jpg (585×1170).
 * After capturing a new mobile shot, set `mobile: true` on that project.
 */
import { chromium } from "playwright-core";
import { readFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public/projects");
mkdirSync(outDir, { recursive: true });

const source = readFileSync(resolve(root, "src/data/projects.ts"), "utf8");
const projects = [...source.matchAll(/slug:\s*"([^"]+)",\s*\n\s*name:\s*"[^"]*",\s*\n\s*url:\s*"([^"]+)"/g)].map((m) => ({ slug: m[1], url: m[2] }));
const only = process.argv[2];
const list = only ? projects.filter((p) => p.slug === only) : projects;
if (!list.length) {
  console.error(only ? `No project with slug "${only}"` : "No projects found in src/data/projects.ts");
  process.exit(1);
}

async function launch() {
  for (const channel of ["msedge", "chrome"]) {
    try {
      return await chromium.launch({ channel });
    } catch {}
  }
  throw new Error("Couldn't find Microsoft Edge or Google Chrome. Install one of them and try again.");
}

async function shoot(browser, { slug, url }, mobile) {
  const ctx = await browser.newContext(
    mobile
      ? { viewport: { width: 390, height: 780 }, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true }
      : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  );
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 }).catch(() => {});
  await page.waitForTimeout(1500);
  // Scroll through the page so lazy images & scroll animations run, then return to the top
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < Math.min(document.body.scrollHeight, 6000); y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(3500);
  const file = resolve(outDir, `${slug}${mobile ? "-mobile" : ""}.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: 84 });
  await ctx.close();
  return file;
}

const browser = await launch();
for (const p of list) {
  try {
    const a = await shoot(browser, p, false);
    const b = await shoot(browser, p, true);
    console.log(`✓ ${p.slug}\n  ${a}\n  ${b}`);
  } catch (e) {
    console.error(`✗ ${p.slug}: ${e.message}`);
  }
}
await browser.close();
