import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const pages = [
  { path: "/", file: "home" },
  { path: "/adventure", file: "adventure" },
  { path: "/youtube", file: "youtube" },
  { path: "/contact", file: "contact" },
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const baseUrl = process.env.SHOT_URL ?? "http://localhost:3000";

await mkdir(".screenshots", { recursive: true });

const browser = await chromium.launch();
try {
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    for (const p of pages) {
      const url = `${baseUrl}${p.path}`;
      console.log(`[${vp.name}] ${url}`);
      await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `.screenshots/${p.file}-${vp.name}.png`,
        fullPage: true,
      });
    }

    await context.close();
  }
} finally {
  await browser.close();
}

console.log("Screenshots saved to .screenshots/");
