import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const viewports = [
  { name: "phone-390", width: 390, height: 900 },
  { name: "tablet-900", width: 900, height: 900 },
  { name: "tablet-991", width: 991, height: 900 },
  { name: "desktop-1024", width: 1024, height: 900 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

const baseUrl = process.env.SHOT_URL ?? "http://localhost:3000";
await mkdir(".screenshots", { recursive: true });

const browser = await chromium.launch();
try {
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    console.log(`[${vp.name}] ${baseUrl}`);
    await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 60_000 });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `.screenshots/hero-${vp.name}.png`,
      fullPage: false,
      clip: { x: 0, y: 0, width: vp.width, height: vp.height },
    });
    await context.close();
  }
} finally {
  await browser.close();
}

console.log("Hero responsive screenshots saved.");
