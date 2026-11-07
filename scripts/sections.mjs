// Element screenshots of each section, for close design review.
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
const [url = "http://localhost:4321/", out = "design-review/sections", width = "1440", scheme = "light"] = process.argv.slice(2);
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 }, colorScheme: scheme });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
for (const sel of [".hero", "#summary", "#work .studies", "#work .hackathons", "#work .own", "#how-i-build", "#experience", "#skills", "#contact", ".footer"]) {
  const name = sel.replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
  await page.locator(sel).first().screenshot({ path: `${out}/${width}-${scheme}-${name}.png` });
}
await browser.close();
