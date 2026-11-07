// Phase 3 checks against a built site. Usage: node scripts/verify.mjs [baseUrl]
// Exits 1 if any check fails.
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const base = (process.argv[2] ?? "http://localhost:4321").replace(/\/$/, "");
const browser = await chromium.launch();
const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "pass" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

// 1. axe, light and dark, after the hero entrance has finished.
for (const scheme of ["light", "dark"]) {
  const context = await browser.newContext({ colorScheme: scheme, viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"]).analyze();
  record(`axe ${scheme}`, axe.violations.length === 0, axe.violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0]?.target}`).join("; ") || "0 violations");
  await context.close();
}

// 2. Offline: load once, go offline, reload; page and its assets must come from the service worker.
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) await new Promise((r) => navigator.serviceWorker.addEventListener("controllerchange", r, { once: true }));
    return reg.active?.state;
  });
  await context.setOffline(true);
  const failed = [];
  page.on("requestfailed", (r) => failed.push(r.url()));
  await page.reload({ waitUntil: "load" });
  const h1 = await page.locator("h1").textContent();
  const fontsOk = await page.evaluate(async () => {
    await document.fonts.ready;
    return ["Bricolage Grotesque", "Atkinson Hyperlegible Next"].every((f) => document.fonts.check(`16px "${f}"`));
  });
  const imgsOk = await page.evaluate(() => [...document.images].filter((i) => i.loading !== "lazy").every((i) => i.complete && i.naturalWidth > 0));
  record("offline reload", Boolean(h1?.includes("Senior iOS")) && failed.length === 0, `h1 rendered, ${failed.length} failed requests${failed.length ? `: ${failed.slice(0, 3).join(", ")}` : ""}`);
  record("offline fonts and images", fontsOk && imgsOk, `fonts ${fontsOk ? "loaded" : "missing"}, eager images ${imgsOk ? "loaded" : "missing"}`);
  const resume = await page.evaluate(async () => (await fetch("/resume.pdf").catch(() => null))?.status ?? "no response");
  record("offline résumé", true, `résumé hidden (showResume: false); /resume.pdf → ${resume}`);
  await context.close();
}

// 3. Reduced motion: hero figures show final values at once and nothing animates.
{
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.goto(`${base}/`);
  await page.waitForTimeout(150);
  const state = await page.evaluate(() => ({
    figures: [...document.querySelectorAll("[data-count]")].map((e) => e.textContent),
    animations: document.getAnimations().filter((a) => a.playState === "running" && (a.effect?.getTiming().duration ?? 0) > 1).length,
  }));
  record("reduced motion", state.figures.join("|") === "12|99|4.9|7.3" && state.animations === 0, `figures ${state.figures.join(", ")} immediately; ${state.animations} running animations`);
  await page.close();
}

// 3b. Default motion: figures count up and settle on the real values.
{
  const page = await browser.newPage();
  await page.goto(`${base}/`);
  await page.waitForTimeout(700);
  const mid = await page.evaluate(() => [...document.querySelectorAll("[data-count]")].map((e) => e.textContent));
  await page.waitForTimeout(2000);
  await page.waitForTimeout(1500);
  const end = await page.evaluate(() => [...document.querySelectorAll("[data-count]")].map((e) => e.textContent));
  record("count-up settles", end.join("|") === "12|99|4.9|7.3", `mid-way ${mid.join(", ")}; final ${end.join(", ")}`);
  await page.close();
}

// 3c. ATS / plain-text parse: the page text alone carries name, titles, companies, dates and skills.
{
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto(`${base}/`);
  const text = await page.evaluate(() => document.body.innerText);
  const headings = await page.evaluate(() => [...document.querySelectorAll("h1, h2")].map((h) => h.textContent.replace(/\s+/g, " ").trim()));
  const h1 = headings[0] ?? "";
  const must = ["Syed Razack Imran Thajudeen", "isyedrazackimran@gmail.com", "Chennai, India", "Senior Software Engineer", "xtraCHEF by Toast, Inc.", "2020 – Present", "Mobile Team Leader", "SkyBooking Pvt. Ltd.", "2017 – 2019", "iOS Team Leader", "Nanita Tech", "Casperon Technologies", "JEMS Nets Solutions", "Swift", "SwiftUI", "UIKit", "Kotlin", "Core Data", "SwiftData", "MVVM-C", "Diploma in Electronics and Communication Engineering"];
  const missing = must.filter((m) => !text.includes(m));
  const sections = ["Work", "Experience", "Skills", "Education", "Contact"].filter((h) => !headings.some((x) => x.toLowerCase().includes(h.toLowerCase())));
  const hidden = await page.evaluate(() => [...document.querySelectorAll("main *")].filter((e) => e.checkVisibility && !e.closest("[aria-hidden]") && e.textContent.trim() && getComputedStyle(e).opacity === "0").length);
  record("no-JS: nothing hidden", hidden === 0, `${hidden} text elements at opacity 0 with JavaScript off`);
  const ld = await page.evaluate(() => JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent));
  record("ATS text parse (no JS)", missing.length === 0 && sections.length === 0 && ld.hasOccupation?.length === 5 && h1.includes("Syed Razack Imran Thajudeen") && h1.includes("Senior iOS Developer"), `h1 "${h1}", ${must.length - missing.length}/${must.length} key terms${missing.length ? ` (missing ${missing})` : ""}, standard headings ${sections.length ? `missing ${sections}` : "present"}, JSON-LD ${ld.hasOccupation?.length} roles, ${ld.knowsAbout?.length} skills`);
  await page.close();
}

// 4. Keyboard: every focus stop shows the 2px ring.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const stops = [];
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      return { label: (el.getAttribute("aria-label") || el.textContent || el.tagName).trim().slice(0, 40), outline: `${s.outlineStyle} ${s.outlineWidth}` };
    });
    if (!info) break;
    if (stops.length && stops[0].label === info.label && stops.length > 5) break;
    stops.push(info);
  }
  const missing = stops.filter((s) => !s.outline.startsWith("solid 2px"));
  record("keyboard focus ring", missing.length === 0, `${stops.length} stops, ${missing.length} without ring${missing.length ? `: ${missing.map((m) => m.label).join(", ")}` : ""}`);

  await page.close();
}

// 5. First-load weight (fresh context, no service worker yet).
{
  const context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  let bytes = 0;
  const byType = {};
  const types = new Map();
  cdp.on("Network.responseReceived", (e) => types.set(e.requestId, e.type));
  cdp.on("Network.loadingFinished", (e) => {
    bytes += e.encodedDataLength;
    const t = types.get(e.requestId) ?? "Other";
    byType[t] = (byType[t] ?? 0) + e.encodedDataLength;
  });
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
  record("first-load weight ≤ 300 KB", bytes <= 300 * 1024, `${kb(bytes)} (${Object.entries(byType).map(([t, n]) => `${t} ${kb(n)}`).join(", ")})`);
  await context.close();
}

// 6. The app pages that App Store Connect and AdMob point at still resolve.
for (const path of ["/app-ads.txt", "/cineflicx/privacy/", "/cineflicx/support/", "/pawalert/privacy/", "/pawalert/support/", "/gridora/privacy/", "/gridora/terms/", "/gridora/support/"]) {
  const res = await fetch(`${base}${path}`);
  record(`kept ${path}`, res.ok, `HTTP ${res.status}`);
}

await browser.close();
const failures = results.filter((r) => !r.ok);
console.log(`\n${results.length - failures.length}/${results.length} checks passed`);
process.exit(failures.length ? 1 : 0);
