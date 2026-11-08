// Builds public/apple-touch-icon.png (180x180) from the favicon's mark, full-bleed so iOS
// can round the corners itself. Run after changing public/favicon.svg.
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="180" height="180"><rect width="32" height="32" fill="#171717"/><path d="M11 8.5h10v3h-3.25v9h3.25v3H11v-3h3.25v-9H11z" fill="#F4F2EC"/><circle cx="24" cy="22" r="2.3" fill="#E14E4D"/></svg>`;
await writeFile(new URL("../public/apple-touch-icon.png", import.meta.url), await sharp(Buffer.from(svg)).png().toBuffer());
console.log("apple-touch-icon.png written");
