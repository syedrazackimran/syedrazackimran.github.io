// Refreshes src/data/apps.json and the icons/screenshots in src/assets/appstore.
// Never fails the build: on any network error the committed cache is kept.
import { readFile, writeFile, mkdir } from "node:fs/promises";

const APPS = [
  { key: "toastNow", id: "6444586410", icon: false, screenshots: 0 },
  { key: "xtrachef", id: "988380179", icon: false, screenshots: 0 },
  { key: "cineflicx", id: "6762333634", icon: true, screenshots: 3 },
  { key: "pawalert", id: "6767496810", icon: true, screenshots: 0 },
  { key: "moviez", id: "1511472908", icon: true, screenshots: 0 },
];
const DATA = new URL("../src/data/apps.json", import.meta.url);
const ASSETS = new URL("../src/assets/appstore/", import.meta.url);

async function lookup(id) {
  for (const country of ["us", "in"]) {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${id}&country=${country}`, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`lookup ${id}: HTTP ${res.status}`);
    const json = await res.json();
    if (json.resultCount > 0) return json.results[0];
  }
  throw new Error(`lookup ${id}: no result in us or in`);
}

async function download(url, file) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`download ${url}: HTTP ${res.status}`);
  await writeFile(new URL(file, ASSETS), Buffer.from(await res.arrayBuffer()));
}

let cache = {};
try {
  cache = JSON.parse(await readFile(DATA, "utf8"));
} catch {}

await mkdir(ASSETS, { recursive: true });
const fetchedAt = new Date().toISOString().slice(0, 10);

for (const app of APPS) {
  try {
    const r = await lookup(app.id);
    if (app.icon) await download(r.artworkUrl512, `${app.key}-icon.jpg`);
    const shots = (r.screenshotUrls ?? []).slice(0, app.screenshots);
    // The lookup returns 320x480 thumbnails; mzstatic serves a sharper rendition when the size segment changes.
    for (const [i, url] of shots.entries()) {
      await download(url.replace(/\/\d+x\d+bb\.(jpg|png)$/, "/460x0w.jpg"), `${app.key}-shot-${i + 1}.jpg`);
    }
    cache[app.key] = {
      id: app.id,
      name: r.trackName,
      seller: r.sellerName,
      version: r.version,
      releaseDate: r.releaseDate.slice(0, 10),
      rating: r.userRatingCount > 0 ? Math.round(r.averageUserRating * 10) / 10 : null,
      ratingCount: r.userRatingCount ?? 0,
      screenshots: shots.length,
      fetchedAt,
    };
    console.log(`appstore: ${app.key} ok (${r.trackName})`);
  } catch (error) {
    console.log(`appstore: ${app.key} kept cached data (${error.message})`);
  }
}

await writeFile(DATA, JSON.stringify(cache, null, 2) + "\n");
