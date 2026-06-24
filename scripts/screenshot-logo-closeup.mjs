import { chromium } from "playwright";

const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 200 },
    deviceScaleFactor: 2,
  });
  // Disable HTTP cache so we always pull a fresh image from the dev server
  await context.route("**/*", (route) => {
    route.continue({
      headers: { ...route.request().headers(), "cache-control": "no-cache" },
    });
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/?bust=" + Date.now(), {
    waitUntil: "networkidle",
    timeout: 60_000,
  });
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: ".screenshots/header-logo-closeup.png",
    clip: { x: 0, y: 0, width: 360, height: 110 },
  });
  console.log("done");
} finally {
  await browser.close();
}
