// Builds the résumé PDF with the site's fonts and colours. Single column, real text, standard
// headings, so applicant tracking systems parse it cleanly.
//
//   npm run resume                                   → public/resume.pdf (public copy)
//   node scripts/resume.mjs --private details.json --out ~/resume.pdf
//
// The public copy never has a phone number or the "Additional details" line. A private copy
// for applications takes them from a JSON file kept outside the repo:
//   { "phone": "+91 …", "details": [["Notice period", "60 days (negotiable)"], …] }
// Needs Playwright's Chromium (see README); set CHROMIUM_PATH to use a different Chrome binary.
import { readFile, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { chromium } from "playwright";
import { identity, education, ownApps, publisherNote } from "../src/data/profile.ts";

const root = new URL("../", import.meta.url);
const apps = JSON.parse(await readFile(new URL("src/data/apps.json", root), "utf8"));
const { values: args } = parseArgs({ options: { private: { type: "string" }, out: { type: "string" } } });
const extra = args.private ? JSON.parse(await readFile(args.private, "utf8")) : {};
const out = args.out ?? new URL("public/resume.pdf", root).pathname;

const site = "https://syedrazackimran.github.io/";
const rating = `${apps.toastNow.rating.toFixed(1)}★, ${Math.floor(apps.toastNow.ratingCount / 1000)}K+ App Store ratings`;
const moviez = ownApps.find((a) => a.key === "moviez").downloads;
const moviezK = `${(Math.floor(moviez.total / 100) / 10).toFixed(1)}K+`;
const url = (key) => ownApps.find((a) => a.key === key)?.url;

const font = async (pkg, file) =>
  `data:font/woff2;base64,${(await readFile(new URL(`node_modules/${pkg}/files/${file}`, root))).toString("base64")}`;
const fonts = {
  body: await font("@fontsource-variable/atkinson-hyperlegible-next", "atkinson-hyperlegible-next-latin-wght-normal.woff2"),
  bodyItalic: await font("@fontsource-variable/atkinson-hyperlegible-next", "atkinson-hyperlegible-next-latin-wght-italic.woff2"),
  head: await font("@fontsource-variable/manrope", "manrope-latin-wght-normal.woff2"),
  serif: await font("@fontsource/playfair-display", "playfair-display-latin-400-italic.woff2"),
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// **bold** in content strings.
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
const bare = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// Two lines: how to reach me, then where to see the work.
const contacts = [
  [
    `<a href="mailto:${identity.email}">${identity.email}</a>`,
    extra.phone && `<span>${esc(extra.phone)}</span>`,
    `<span>${identity.location}</span>`,
  ],
  [
    `<a href="${site}">${bare(site)}</a>`,
    `<a href="${identity.linkedin}">${bare(identity.linkedin)}</a>`,
    `<a href="${identity.github}">${bare(identity.github)}</a>`,
  ],
].map((line) => line.filter(Boolean));

const profile =
  "Senior iOS Developer with **12+ years** of native iOS experience, including team-lead roles in India and Cambodia. Build production apps in **Swift** and **SwiftUI** (UIKit where it fits) on **MVVM-C** and **Clean Architecture**, with offline-first storage and secure sign-in. Own features end to end, from design to App Store release, and mentor developers in Agile teams. Recently started contributing to the Toast Now Android app in **Kotlin**.";

const highlights = [
  `**98–99% crash-free** on Toast Now (${rating}), backed by XCTest, Firebase Crashlytics and CI/CD`,
  "**Toast Hackathon 2026: 2nd in India, 8th across Toast** with an AI inventory agent; runner-up in 2024",
  "**Offline-first** apps on SwiftData, Core Data and SQLite that keep working in low-connectivity kitchens",
  `Three personal apps shipped on the App Store; **Moviez reached ${moviezK} downloads**`,
  "**AI-assisted development** with Claude Code and Codex daily, guided by AGENTS.md / CLAUDE.md rules I authored",
];

const experience = [
  {
    role: "Senior Software Engineer",
    company: "xtraCHEF by Toast, Inc.",
    when: "2020 – Present",
    where: "Chennai, India",
    points: [
      "Build inventory features for the **Toast Now** iOS app on the Retail Inventory team: managers mark items in or out of stock and availability stays in sync across locations, online or offline. Swift, SwiftUI, inventory APIs, regular App Store releases.",
      "Keep a **98–99% crash-free** rate with unit tests (XCTest) and CI/CD on **GitHub Actions** (previously Jenkins).",
      "Built **xtraCHEF** camera invoice upload with processing status tracked in the app, and stock counts from the phone that work offline and sync later; stability monitored with Firebase Crashlytics.",
      "Lead cross-functional work with developers, designers and product managers on roadmap features, and coordinate with other Product Development teams so releases ship consistently and on time.",
      "**Hackathon 2026, 2nd in India and 8th at Toast:** Inventory Scan Agent. The iOS app reads a bottle or shelf from one photo; an AI agent checks catalog and stock and recommends one action, asks when unsure and only drafts purchase orders. **Runner-up 2024** with voice-to-inventory counting.",
      "Recently started contributing to the Toast Now **Android** app in **Kotlin**. Use Claude Code and Codex daily, and wrote the AGENTS.md / CLAUDE.md guidelines that keep agents within our architecture.",
    ],
  },
  {
    role: "Mobile Team Leader",
    company: "SkyBooking Pvt. Ltd.",
    when: "2017 – 2019",
    where: "Phnom Penh, Cambodia",
    points: [
      "Led mobile development for a Cambodian online booking platform for flights and hotels. Built new iOS apps and drove continuous improvement through new features and issue resolution.",
    ],
  },
  {
    role: "iOS Team Leader",
    company: "Nanita Tech Co., Pvt. Ltd.",
    when: "2016 – 2017",
    where: "Phnom Penh, Cambodia",
    points: ["Led the team that developed and released an iOS app on the App Store, delivering on quality and performance."],
  },
  {
    role: "iOS Developer",
    company: "Casperon Technologies Pvt. Ltd.",
    when: "2015 – 2016",
    where: "Chennai, India",
    points: [
      "Owned end-to-end delivery of iOS features: design, implementation and maintenance. Worked on **Cabily**, a taxi dispatch app, building its real-time messaging over **sockets and XMPP**.",
    ],
  },
  {
    role: "iOS Developer",
    company: "JEMS Nets Solutions",
    when: "2014 – 2015",
    where: "Chennai, India",
    points: ["Worked with lead developers to analyse, design, develop and optimise apps for performance."],
  },
];

const projects = [
  {
    name: "CineFlicx: Movie & TV Tracker",
    url: url("cineflicx"),
    meta: "2026 · iPhone, iPad, Mac, Vision Pro · Swift, SwiftUI",
    text: "Film and TV discovery and tracking with natural-language search processed on device, mood- and time-based picks, where to watch, next-episode reminders and a diary with ratings and stats. Imports from Letterboxd, IMDb and Trakt; no account needed.",
  },
  {
    name: "PawAlert: Rescue Alerts Nearby",
    url: url("pawalert"),
    meta: "2026 · Swift, SwiftUI",
    text: "Photograph an injured street animal and drop a pin; nearby volunteers get a real-time alert and the rescue can be tracked live.",
  },
  {
    name: "Moviez",
    url: url("moviez"),
    meta: `2020, through v3.0 · **${moviezK} downloads** (${moviez.source}, ${moviez.asOf})`,
    text: "Movie and TV companion on the TMDb API: release reminders, watchlist and favourites with cloud sync, actor profiles, trailers and local showtimes.",
  },
];

const skills = [
  ["iOS", "Swift, SwiftUI, UIKit, Swift Concurrency (async/await), MapKit, Core Location"],
  ["Architecture", "MVVM, MVVM-C, Clean Architecture, Dependency Injection"],
  ["Data and offline", "SwiftData, Core Data, SQLite, offline-first sync"],
  ["Networking", "REST, GraphQL, sockets (real-time), XMPP"],
  ["Security and quality", "Auth0, Firebase Auth, Face ID / Touch ID, Firebase Crashlytics, XCTest"],
  ["Delivery", "GitHub Actions, Jenkins, Git / GitHub, Xcode, App Store releases, Agile / Scrum"],
  ["Android", "Kotlin (recently started, on the Toast Now Android app)"],
  ["AI-assisted development", "Claude Code, Codex, AGENTS.md / CLAUDE.md agent guidelines"],
];

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${identity.name}, Senior iOS Developer, Résumé</title>
<style>
@font-face { font-family: Body; src: url(${fonts.body}) format("woff2"); font-weight: 200 800; }
@font-face { font-family: Body; src: url(${fonts.bodyItalic}) format("woff2"); font-weight: 200 800; font-style: italic; }
@font-face { font-family: Head; src: url(${fonts.head}) format("woff2"); font-weight: 200 800; }
@font-face { font-family: Accent; src: url(${fonts.serif}) format("woff2"); font-style: italic; }
@page { size: A4; margin: 15mm 16mm 14mm; }
* { box-sizing: border-box; margin: 0; padding: 0; }
:root { --ink: #1a1a1a; --muted: #55524c; --accent: #a31c1b; --line: #e3ded4; }
body { font: 9.6pt/1.45 Body, sans-serif; color: var(--ink); }
a { color: inherit; text-decoration: none; }
b { font-weight: 700; }
header { padding-bottom: 10pt; border-bottom: 1.5pt solid var(--ink); }
h1 { font: 800 24pt/1.05 Head, sans-serif; letter-spacing: -0.02em; }
.title { margin-top: 3pt; margin-bottom: 5pt; font: italic 13pt/1.2 Accent, serif; color: var(--accent); }
.contacts { margin-top: 2pt; display: flex; flex-wrap: wrap; gap: 2pt 0; font-size: 8.8pt; color: var(--muted); }
.contacts > * + *::before { content: "·"; margin: 0 6pt; color: var(--accent); }
.contacts a { color: var(--ink); }
section { margin-top: 13pt; }
h2 { display: flex; align-items: center; gap: 8pt; margin-bottom: 6pt; font: 800 10.5pt/1 Head, sans-serif; letter-spacing: 0.08em; text-transform: uppercase; }
h2::after { content: ""; flex: 1; height: 0.75pt; background: var(--line); }
p { color: #2b2a27; }
ul { list-style: none; }
li.pt { position: relative; padding-left: 11pt; margin-top: 2.5pt; color: #2b2a27; }
li.pt::before { content: ""; position: absolute; left: 0; top: 0.62em; width: 5pt; height: 1.2pt; background: var(--accent); }
.job, .proj, .keep { break-inside: avoid; }
h2 { break-after: avoid; }
.job + .job, .proj + .proj { margin-top: 9pt; }
.job-head { display: flex; justify-content: space-between; gap: 12pt; align-items: baseline; }
.job-head h3 { font: 700 10.5pt/1.3 Head, sans-serif; }
.job-head .co { font-family: Accent, serif; font-style: italic; font-weight: 400; color: var(--accent); font-size: 10.5pt; }
.job-head .when { flex: none; font-size: 8.8pt; color: var(--muted); text-align: right; }
.job-head .when b { color: var(--ink); font-weight: 700; }
.meta { font-size: 8.6pt; color: var(--muted); }
.skills { display: grid; grid-template-columns: 118pt 1fr; gap: 3pt 10pt; }
.skills dt { font-weight: 700; }
.skills dd { color: #2b2a27; }
.note { margin: -2pt 0 7pt; font-style: italic; }
.edu { display: flex; justify-content: space-between; align-items: baseline; }
</style></head><body>
<header>
  <h1>${identity.name}</h1>
  <p class="title">Senior iOS Developer · Mobile Team Lead</p>
  ${contacts.map((line) => `<p class="contacts">${line.join("")}</p>`).join("")}
</header>

<section><h2>Profile</h2>
  <p>${md(profile)}</p>
  <ul>${highlights.map((h) => `<li class="pt">${md(h)}</li>`).join("")}</ul>
</section>

<section><h2>Experience</h2>
${experience
  .map(
    (j) => `<div class="job">
  <div class="job-head"><h3>${j.role}, <span class="co">${j.company}</span></h3><p class="when"><b>${j.when}</b> · ${j.where}</p></div>
  <ul>${j.points.map((p) => `<li class="pt">${md(p)}</li>`).join("")}</ul>
</div>`,
  )
  .join("\n")}
</section>

<section class="keep"><h2>Personal apps</h2>
  <p class="meta note">${esc(publisherNote)}</p>
${projects
  .map(
    (p) => `<div class="proj">
  <div class="job-head"><h3><a href="${p.url}">${p.name}</a></h3><p class="when"><a href="${p.url}">App Store ↗</a></p></div>
  <p class="meta">${md(p.meta)}</p>
  <p>${md(p.text)}</p>
</div>`,
  )
  .join("\n")}
</section>

<section><h2>Skills</h2>
  <dl class="skills">${skills.map(([g, s]) => `<dt>${g}</dt><dd>${esc(s)}</dd>`).join("")}</dl>
</section>

<section><h2>Education</h2>
  <div class="job-head"><h3>${education.qualification}</h3><p class="when"><b>${education.years}</b></p></div>
  <p class="meta">${education.school}</p>
</section>
${
  extra.details?.length
    ? `<section><h2>Additional details</h2><p>${extra.details.map(([k, v]) => `<b>${esc(k)}:</b> ${esc(v)}`).join(" · ")}</p></section>`
    : ""
}
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await writeFile(out, await page.pdf({ format: "A4", preferCSSPageSize: true, printBackground: true, tagged: true, outline: true }));
await browser.close();
console.log(`résumé → ${out}${args.private ? " (private copy)" : ""}`);
