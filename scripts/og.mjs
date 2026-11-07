// Builds public/og.png (1200x630) in the site's style: name, title, headline, portrait.
import { readFile, writeFile } from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";

const font = (weight) =>
  readFile(new URL(`../node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-${weight}-normal.woff`, import.meta.url));
const portrait = await sharp(new URL("../src/assets/portrait.jpg", import.meta.url).pathname).resize(220, 220).jpeg({ quality: 85 }).toBuffer();

const h = (type, style, children) => ({ type, props: { style, children } });

const tree = h("div", { width: 1200, height: 630, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#E9EDF0", color: "#18222B", fontFamily: "Bricolage" }, [
  h("div", { display: "flex", alignItems: "center", gap: 28 }, [
    { type: "img", props: { src: `data:image/jpeg;base64,${portrait.toString("base64")}`, width: 120, height: 120, style: { borderRadius: 28 } } },
    h("div", { display: "flex", flexDirection: "column" }, [
      h("div", { fontSize: 40, fontWeight: 700, letterSpacing: -0.6 }, "Syed Razack Imran Thajudeen"),
      h("div", { fontSize: 28, color: "#56636E", marginTop: 6 }, "Senior iOS Developer, Mobile Team Lead"),
    ]),
  ]),
  h("div", { display: "flex", flexDirection: "column", fontSize: 62, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.2 }, [
    h("div", {}, "I build iOS apps that keep working"),
    h("div", {}, "when the kitchen Wi-Fi doesn't."),
  ]),
  h("div", { display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#0B6A63" }, [
    h("div", { width: 16, height: 16, borderRadius: 8, background: "#0B6A63" }, ""),
    "syedrazackimran.github.io",
  ]),
]);

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Bricolage", data: await font(400), weight: 400, style: "normal" },
    { name: "Bricolage", data: await font(700), weight: 700, style: "normal" },
  ],
});
await writeFile(new URL("../public/og.png", import.meta.url), await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer());
console.log("og: public/og.png written");
