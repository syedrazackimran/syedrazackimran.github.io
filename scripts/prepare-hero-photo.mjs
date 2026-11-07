// Turns a photo into src/assets/portrait-hero.jpg: 3:4 crop from the top, no retouching.
// sharp writes no EXIF/XMP/ICC/GPS metadata unless asked to.
import sharp from "sharp";

const [input] = process.argv.slice(2);
if (!input) throw new Error("usage: node scripts/prepare-hero-photo.mjs <photo>");
const output = new URL("../src/assets/portrait-hero.jpg", import.meta.url).pathname;

const { width = 0, height = 0 } = await sharp(input).metadata();
const cropHeight = Math.min(height, Math.round((width * 4) / 3));
await sharp(input)
  .extract({ left: 0, top: 0, width, height: cropHeight })
  .flatten({ background: "#ffffff" })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(output);

const meta = await sharp(output).metadata();
console.log({ width: meta.width, height: meta.height, exif: !!meta.exif, xmp: !!meta.xmp, icc: !!meta.icc });
