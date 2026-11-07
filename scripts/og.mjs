// Builds public/og.png (1200x630) in the site's style: name, title, headline, portrait.
// The footer row comes before the gradient headline in the tree: satori's text clip masks later siblings.
import { readFile, writeFile } from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";

const font = (weight) =>
  readFile(new URL(`../node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-${weight}-normal.woff`, import.meta.url));
const portrait = await sharp(new URL("../src/assets/portrait.jpg", import.meta.url).pathname).resize(220, 220).jpeg({ quality: 85 }).toBuffer();

const h = (type, style, children) => ({ type, props: { style, children } });

const tree = h("div", { width: 1200, height: 630, display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: 72, color: "#EDF2F8", fontFamily: "Bricolage", backgroundColor: "#0A0F1E", backgroundImage: "radial-gradient(circle at 8% 0%, rgba(62,214,193,0.30), transparent 45%), radial-gradient(circle at 100% 20%, rgba(99,168,255,0.26), transparent 45%), radial-gradient(circle at 60% 120%, rgba(160,140,255,0.22), transparent 50%)" }, [
  h("div", { display: "flex", alignItems: "center", gap: 16, padding: "8px 22px 8px 8px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", backgroundColor: "rgba(255,255,255,0.05)", alignSelf: "flex-start" }, [
    { type: "img", props: { src: `data:image/jpeg;base64,${portrait.toString("base64")}`, width: 64, height: 64, style: { borderRadius: 32 } } },
    h("div", { width: 12, height: 12, borderRadius: 6, backgroundColor: "#3ED6C1" }, ""),
    h("div", { fontSize: 26, color: "#9AA8BC" }, "Senior iOS Developer at xtraCHEF by Toast"),
  ]),
  h("div", { position: "absolute", left: 72, bottom: 64, display: "flex", width: 1056, justifyContent: "space-between", alignItems: "center", fontSize: 28, color: "#9AA8BC" }, [
    h("div", { display: "flex", color: "#EDF2F8", fontWeight: 700 }, "Syed Razack Imran Thajudeen"),
    h("div", { display: "flex" }, "syedrazackimran.github.io"),
  ]),
  h("div", { display: "flex", flexDirection: "column", marginTop: 118, fontSize: 88, fontWeight: 700, lineHeight: 1.04, letterSpacing: -3 }, [
    h("div", {}, "I build iOS apps"),
    h("div", { backgroundImage: "linear-gradient(110deg, #3ED6C1 0%, #63A8FF 50%, #A08CFF 100%)", backgroundClip: "text", color: "transparent" }, "people rely on."),
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
