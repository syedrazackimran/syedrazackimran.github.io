// Colour grade only (no retouching): desaturate blues (the shirt and wall) by 45%, warm the image slightly and
// pull the shadows toward the site's deep green so the photo sits in the palette.
// Usage: node scripts/grade-photo.mjs <in.jpg> <out.jpg>
import sharp from "sharp";

const [input, output] = process.argv.slice(2);
if (!input || !output) throw new Error("usage: node scripts/grade-photo.mjs <in.jpg> <out.jpg>");

const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const px = new Uint8ClampedArray(data.length);
for (let i = 0; i < data.length; i += 3) {
  let r = data[i] / 255;
  let g = data[i + 1] / 255;
  let b = data[i + 2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  // Hue in degrees; blues (190-250) lose 45% of their saturation, with soft edges.
  const d = max - min;
  let hue = 0;
  if (d > 0) {
    if (max === r) hue = 60 * (((g - b) / d) % 6);
    else if (max === g) hue = 60 * ((b - r) / d + 2);
    else hue = 60 * ((r - g) / d + 4);
    if (hue < 0) hue += 360;
  }
  const inBlue = hue >= 170 && hue <= 270 ? Math.min(1, (hue - 170) / 20, (270 - hue) / 20) : 0;
  const grey = 0.299 * r + 0.587 * g + 0.114 * b;
  const k = 0.45 * inBlue;
  r += (grey - r) * k;
  g += (grey - g) * k;
  b += (grey - b) * k;
  // Gentle warmth overall.
  r *= 1.03;
  g *= 1.005;
  b *= 0.965;
  // Shadows toward deep green #06110C, fading out by mid-tones.
  const shadow = Math.max(0, 1 - l / 0.45) * 0.22;
  r += (0.024 - r) * shadow;
  g += (0.067 - g) * shadow;
  b += (0.047 - b) * shadow;
  px[i] = r * 255;
  px[i + 1] = g * 255;
  px[i + 2] = b * 255;
}
await sharp(Buffer.from(px.buffer), { raw: { width: info.width, height: info.height, channels: 3 } })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(output);
const meta = await sharp(output).metadata();
console.log({ output, width: meta.width, height: meta.height, exif: !!meta.exif });
