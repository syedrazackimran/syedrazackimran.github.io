// WCAG AA check for every text/background and UI pair the site uses. Exits 1 on any failure.
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../src/styles/tokens.css", import.meta.url), "utf8");
const block = (selector) => {
  const start = css.indexOf(selector);
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
};
const themes = { light: block(":root {"), dark: block(':root[data-theme="dark"]') };

const TEXT = 4.5;
const UI = 3;
// [foreground, background, minimum, where it is used]
const pairs = [
  ["ink", "steel", TEXT, "body text and headings"],
  ["ink", "paper", TEXT, "text on panels and the hero card"],
  ["graphite", "steel", TEXT, "metadata on the page"],
  ["graphite", "paper", TEXT, "metadata on panels"],
  ["sync", "steel", TEXT, "links on the page"],
  ["sync", "paper", TEXT, "links on panels"],
  ["paper", "sync", TEXT, "primary button label"],
  ["on-queue", "queue", TEXT, "text on amber fills"],
  ["queue", "paper", UI, "amber status dot on panels"],
  ["sync", "paper", UI, "focus ring, rails and bars"],
  ["graphite", "paper", UI, "copy-email button border"],
];

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

let failures = 0;
for (const [theme, tokens] of Object.entries(themes)) {
  for (const [fg, bg, min, use] of pairs) {
    const r = ratio(tokens[fg], tokens[bg]);
    const ok = r >= min;
    if (!ok) failures++;
    console.log(`${ok ? "pass" : "FAIL"}  ${theme.padEnd(5)} ${`${fg} on ${bg}`.padEnd(26)} ${r.toFixed(2).padStart(5)}:1 (needs ${min}:1) ${use}`);
  }
}
if (failures) {
  console.error(`\n${failures} pair(s) below WCAG AA`);
  process.exit(1);
}
console.log("\nAll pairs meet WCAG AA.");
