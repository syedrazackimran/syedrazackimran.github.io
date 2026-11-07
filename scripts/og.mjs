// Builds public/og.png (1200x630) in the site's style: deep green, photo on the right,
// serif greeting, bold title. Kept to one gradient-free tree (satori clips later siblings
// of background-clip text, so there is none here).
import { readFile, writeFile } from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";

const file = (p) => readFile(new URL(`../node_modules/${p}`, import.meta.url));
const photo = await sharp(new URL("../src/assets/portrait-hero.jpg", import.meta.url).pathname)
  .resize(560, 747, { fit: "cover", position: "top" })
  .jpeg({ quality: 82 })
  .toBuffer();

const h = (type, style, children) => ({ type, props: { style, children } });

const tree = h("div", { width: 1200, height: 630, display: "flex", position: "relative", backgroundColor: "#06110C", color: "#F4F2EC", fontFamily: "Jakarta" }, [
  { type: "img", props: { src: `data:image/jpeg;base64,${photo.toString("base64")}`, width: 560, height: 747, style: { position: "absolute", right: 0, top: 0 } } },
  h("div", { position: "absolute", inset: 0, display: "flex", backgroundImage: "linear-gradient(90deg, #06110C 48%, rgba(6,17,12,0.75) 62%, rgba(6,17,12,0.1) 85%)" }, ""),
  h("div", { position: "absolute", left: 0, right: 0, bottom: 0, height: 260, display: "flex", backgroundImage: "linear-gradient(0deg, #06110C 10%, rgba(6,17,12,0))" }, ""),
  h("div", { position: "absolute", left: 72, top: 64, display: "flex", fontFamily: "Serif", fontSize: 38 }, "Imran"),
  h("div", { position: "absolute", left: 72, top: 210, display: "flex", flexDirection: "column" }, [
    h("div", { display: "flex", fontFamily: "Serif", fontSize: 44, color: "#E14E4D" }, "Hey, I'm Imran,"),
    h("div", { display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95, marginTop: 10 }, "Senior iOS"),
    h("div", { display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95 }, "Developer"),
  ]),
  h("div", { position: "absolute", left: 72, bottom: 56, display: "flex", gap: 40, fontSize: 24, color: "rgba(244,242,236,0.8)" }, [
    h("div", { display: "flex" }, "iOS + Android"),
    h("div", { display: "flex" }, "Offline-first"),
    h("div", { display: "flex" }, "Syed Razack Imran Thajudeen"),
  ]),
]);

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Jakarta", data: await file("@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff"), weight: 400, style: "normal" },
    { name: "Jakarta", data: await file("@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff"), weight: 700, style: "normal" },
    { name: "Serif", data: await file("@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff"), weight: 400, style: "normal" },
  ],
});
await writeFile(new URL("../public/og.png", import.meta.url), await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer());
console.log("og: public/og.png written");
