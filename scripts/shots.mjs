// Full-page screenshots at iPhone, iPad and desktop sizes, light and dark.
// Usage: node scripts/shots.mjs <url> <outDir>
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const [url = "http://localhost:4321/", out = "design-review"] = process.argv.slice(2);
const sizes = [
  ["iphone", 390, 844],
  ["ipad", 834, 1194],
  ["desktop", 1440, 900],
];
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
for (const scheme of ["light", "dark"]) {
  for (const [name, width, height] of sizes) {
    const page = await browser.newPage({ viewport: { width, height }, colorScheme: scheme, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(2600);
    await page.screenshot({ path: `${out}/${name}-${scheme}-fold.png` });
    // Scroll like a visitor so scroll-triggered reveals run, then capture the whole page.
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(height * 0.6)) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      await page.waitForTimeout(140);
    }
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/${name}-${scheme}.png`, fullPage: true });
    await page.close();
  }
}
await browser.close();
console.log(`screenshots in ${out}/`);
