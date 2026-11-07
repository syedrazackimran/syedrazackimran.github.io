// Turns a photo into src/assets/portrait.jpg: square crop from the top, slight cool grade.
// The original is never modified. sharp drops all EXIF/XMP/ICC metadata by default.
import sharp from "sharp";

const [input] = process.argv.slice(2);
if (!input) throw new Error("usage: node scripts/prepare-portrait.mjs <photo.jpg>");
const output = new URL("../src/assets/portrait.jpg", import.meta.url).pathname;

const { width = 0 } = await sharp(input).metadata();
await sharp(input)
  .extract({ left: 0, top: 0, width, height: width })
  .linear([0.985, 1, 1.02], [0, 0, 1])
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(output);

const meta = await sharp(output).metadata();
console.log({ width: meta.width, height: meta.height, exif: !!meta.exif, xmp: !!meta.xmp, icc: !!meta.icc, iptc: !!meta.iptc });
