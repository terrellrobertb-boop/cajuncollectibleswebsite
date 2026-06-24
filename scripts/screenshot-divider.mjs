import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const viewports = [
  { name: "phone-390", width: 390, height: 1700 },
  { name: "tablet-900", width: 900, height: 1700 },
  { name: "desktop-1440", width: 1440, height: 1700 },
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
    const el = await page.$("#categories");
    if (!el) {
      console.warn("No #categories element found, skipping");
      continue;
    }
    const box = await el.boundingBox();
    if (!box) continue;
    // Capture the area from ~200px above the divider down to 200px into
    // the categories section so we can see the teeth + the icons clearly.
    const top = Math.max(0, box.y - 220);
    const height = Math.min(420, vp.height - top);
    await page.screenshot({
      path: `.screenshots/divider-${vp.name}.png`,
      clip: { x: 0, y: top, width: vp.width, height },
    });
    await context.close();
  }
} finally {
  await browser.close();
}

console.log("Divider screenshots saved.");
