// WCAG AA check for every text/background pair the site uses, in both themes.
// Semi-transparent surfaces are composited over the page background first. Exits 1 on any failure.
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../src/styles/site.css", import.meta.url), "utf8");
const block = (selector) => {
  const start = css.indexOf(selector);
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
};
const light = block(":root {");
const themes = { light, dark: { ...light, ...block(':root[data-theme="dark"]') } };

const parse = (v) => {
  if (v.startsWith("#")) return [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16)).concat(1);
  const m = v.match(/rgba?\(([^)]+)\)/);
  if (!m) throw new Error(`can't parse colour ${v}`);
  const [r, g, b, a = "1"] = m[1].split(",").map((s) => s.trim());
  return [Number(r), Number(g), Number(b), Number(a)];
};
const over = (top, base) => {
  const [r, g, b, a] = parse(top);
  const [R, G, B] = base;
  return [r * a + R * (1 - a), g * a + G * (1 - a), b * a + B * (1 - a)];
};
const lum = ([r, g, b]) => {
  const lin = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const TEXT = 4.5;
const LARGE = 3;
// [foreground token, surface token (composited over bg), minimum, where]
const pairs = [
  ["ink", "bg", TEXT, "headings and body"],
  ["muted", "bg", TEXT, "secondary text on the page"],
  ["muted", "card", TEXT, "secondary text in cards"],
  ["muted", "panel", TEXT, "company strip and skill panels"],
  ["accent-text", "bg", TEXT, "serif section labels"],
  ["accent-text", "card", TEXT, "labels inside cards"],
  ["accent-text", "panel", TEXT, "skill group titles"],
  ["on-accent", "accent", TEXT, "crimson buttons and tiles"],
  ["on-deep", "deep", TEXT, "text on the deep green panels"],
  ["on-deep-muted", "deep", TEXT, "secondary text on deep green"],
  ["accent-on-deep", "deep", TEXT, "red labels on deep green"],
];

let failures = 0;
for (const [theme, t] of Object.entries(themes)) {
  const bg = parse(t.bg).slice(0, 3);
  for (const [fg, surface, min, use] of pairs) {
    const back = surface === "bg" ? bg : over(t[surface], bg);
    const front = over(t[fg], back);
    const r = ratio(front, back);
    const ok = r >= min;
    if (!ok) failures++;
    console.log(`${ok ? "pass" : "FAIL"}  ${theme.padEnd(5)} ${`${fg} on ${surface}`.padEnd(24)} ${r.toFixed(2).padStart(5)}:1 (needs ${min}:1) ${use}`);
  }
}
if (failures) {
  console.error(`\n${failures} pair(s) below WCAG AA`);
  process.exit(1);
}
console.log("\nAll pairs meet WCAG AA.");
