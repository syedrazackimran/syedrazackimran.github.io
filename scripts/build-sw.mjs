// Writes dist/sw.js after `astro build`. The precache list is the portfolio's own files
// (not the app privacy/support pages), and the cache name is a hash of their contents,
// so every deploy that changes a file rolls out a fresh cache.
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const dist = new URL("../dist/", import.meta.url).pathname;
const skip = /^(cineflicx|pawalert|gridora)\/|^_astro\/.*\.jpg$|^(app-ads\.txt|robots\.txt|sitemap.*\.xml|og\.png|sw\.js)$/;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const files = (await walk(dist)).map((f) => relative(dist, f).split(sep).join("/")).filter((f) => !skip.test(f)).sort();
const hash = createHash("sha256");
for (const f of files) hash.update(f).update(await readFile(join(dist, f)));
const version = hash.digest("hex").slice(0, 12);
const urls = files.map((f) => (f === "index.html" ? "/" : `/${f}`));

const sw = `const CACHE = "site-${version}";
const PRECACHE = ${JSON.stringify(urls)};
const PRECACHED = new Set(PRECACHE);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("site-") && key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(request, { ignoreSearch: true })) ?? (await caches.match("/404.html")) ?? Response.error()),
    );
    return;
  }

  if (PRECACHED.has(url.pathname)) {
    event.respondWith(caches.match(url.pathname).then((hit) => hit ?? fetch(request)));
  }
});
`;

await writeFile(join(dist, "sw.js"), sw);
console.log(`sw: ${urls.length} files precached, cache site-${version}`);
