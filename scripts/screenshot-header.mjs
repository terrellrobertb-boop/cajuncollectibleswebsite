import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir(".screenshots", { recursive: true });

const baseUrl = process.env.SHOT_URL ?? "http://localhost:3000";
const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 240 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(800);
  const header = await page.$("header");
  if (!header) throw new Error("header element not found");
  await header.screenshot({ path: ".screenshots/header-desktop.png" });

  // Mobile
  const mctx = await browser.newContext({
    viewport: { width: 390, height: 240 },
    deviceScaleFactor: 2,
  });
  const mpage = await mctx.newPage();
  await mpage.goto(`${baseUrl}/`, { waitUntil: "networkidle", timeout: 60_000 });
  await mpage.waitForTimeout(800);
  const mheader = await mpage.$("header");
  await mheader.screenshot({ path: ".screenshots/header-mobile.png" });

  console.log("done");
} finally {
  await browser.close();
}
