// Builds public/apple-touch-icon.png (180x180) from public/favicon.svg, full-bleed so iOS
// can round the corners itself. Run after changing public/favicon.svg.
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const favicon = await readFile(new URL("../public/favicon.svg", import.meta.url), "utf8");
const svg = favicon.replace(/(<rect[^>]*?) rx="[\d.]+"/, "$1").replace("<svg ", '<svg width="180" height="180" ');
await writeFile(new URL("../public/apple-touch-icon.png", import.meta.url), await sharp(Buffer.from(svg)).png().toBuffer());
console.log("apple-touch-icon.png written");
