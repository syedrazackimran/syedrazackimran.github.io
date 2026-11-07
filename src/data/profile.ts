// Every fact on the site comes from this file. Edit here, not in components.

export const config = {
  showPhone: false,
  showResume: false, // flip to true only after adding a public résumé (no phone, no "Additional details") as public/resume.pdf
  openToWork: false,
  showInDevelopment: false,
};

export const identity = {
  name: "Syed Razack Imran Thajudeen",
  shortName: "Imran",
  title: "Senior iOS Developer, Mobile Team Lead",
  location: "Chennai, India",
  email: "isyedrazackimran@gmail.com",
  linkedin: "https://www.linkedin.com/in/isyedrazackimran",
  github: "https://github.com/syedrazackimran",
  current: { role: "Senior Software Engineer", company: "xtraCHEF by Toast, Inc.", team: "Retail Inventory" },
};

export const hero = {
  badge: "Senior iOS Developer at xtraCHEF by Toast",
  line1: "I build iOS apps",
  line2: "people rely on.",
  lede: [
    "I'm ",
    { b: "Syed Razack Imran Thajudeen" },
    ", a Senior iOS Developer and mobile team lead with ",
    { b: "12+ years" },
    " of native Swift. I build inventory and invoicing apps for restaurants at Toast that keep working when the kitchen Wi-Fi doesn't.",
  ] as (string | { b: string })[],
};

export const summary =
  "Senior iOS Developer with 12+ years of native iOS experience, including team-lead roles in India and Cambodia. I build production apps in Swift and SwiftUI (UIKit where it fits) with clean, layered architecture, offline-first storage and secure authentication. I own features end to end, from design to App Store release, and mentor developers in Agile teams. I recently started contributing to the Toast Now Android app in Kotlin.";

export const metaDescription =
  "Senior iOS Developer with 12+ years of native iOS experience and team-lead roles in India and Cambodia. Swift, SwiftUI, offline-first apps, MVVM-C and Clean Architecture.";

export const keywords = [
  "Senior iOS Developer",
  "Mobile Team Lead",
  "Swift",
  "SwiftUI",
  "UIKit",
  "Kotlin",
  "Offline-first",
  "SwiftData",
  "Core Data",
  "MVVM-C",
  "Clean Architecture",
  "Chennai",
];

// Hero cards. The rating is Toast Now's (the app's, not mine), filled from apps.json at build time.
export const creds = {
  years: { tag: "Experience", value: 12, suffix: "+ yrs", label: "Native iOS. Swift, SwiftUI and UIKit." },
  rating: { tag: "Toast Now", label: "App Store rating" },
  countries: { tag: "Leadership", value: 2, label: "Countries where I've led iOS teams: India and Cambodia." },
  hackathon: { tag: "Toast Hackathon 2026", value: "2nd", label: "in India, and 8th across all of Toast." },
};

export const marquee = [
  "Swift",
  "SwiftUI",
  "UIKit",
  "Swift Concurrency",
  "SwiftData",
  "Core Data",
  "GraphQL",
  "Auth0",
  "Firebase",
  "XCTest",
  "GitHub Actions",
  "Kotlin",
  "Claude Code",
  "MapKit",
];

export type CaseStudy = {
  key: "toastNow" | "xtrachef";
  name: string;
  company: string;
  url: string;
  intro: string;
  points: string[];
  chips: string[];
  metric?: { value: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    key: "toastNow",
    name: "Toast Now",
    company: "Toast, Inc. Retail Inventory team",
    url: "https://apps.apple.com/us/app/toast-now/id6444586410",
    intro:
      "Toast's restaurant management app. I build the inventory features that let managers mark items in or out of stock and keep availability in sync across every location.",
    points: [
      "Built in Swift and SwiftUI, integrated with the inventory APIs",
      "Shipped through regular App Store releases",
      "98–99% crash-free, backed by unit tests and CI/CD on GitHub Actions",
      "Now also contributing to the Android app in Kotlin",
    ],
    chips: ["Swift", "SwiftUI", "GitHub Actions"],
  },
  {
    key: "xtrachef",
    name: "xtraCHEF",
    company: "Toast, Inc.",
    url: "https://apps.apple.com/in/app/xtrachef/id988380179",
    intro:
      "Back-of-house software for restaurant operators. I built the features they use to handle invoices and count stock from their phones.",
    points: [
      "Camera invoice upload with processing status tracked in the app",
      "Stock counts managed from the phone",
      "Offline-first storage, so work continues in low-connectivity kitchens",
      "Stability monitored with Firebase Crashlytics",
    ],
    chips: ["Swift", "Offline-first", "Firebase"],
    metric: { value: "Offline", label: "first, syncs when back online" },
  },
];

// Toast hackathon entries. Kept at the level of the problem and the approach:
// no internal tools, vendors, APIs or screenshots.
export const hackathon = {
  name: "Inventory Scan Agent",
  tagline: "One photo becomes an inventory decision.",
  result: "2nd in India, 8th at Toast",
  meta: "Hackathon 2026, two-person team",
  steps: [
    { title: "Snap", text: "Photo of a bottle or a whole shelf", colour: "sky", icon: "camera" },
    { title: "Read", text: "iOS reads brand, size and fill level", colour: "teal", icon: "phone" },
    { title: "Reason", text: "An AI agent checks the real catalog and stock", colour: "violet", icon: "target" },
    { title: "Decide", text: "One action: reorder, save count or add item", colour: "gold", icon: "check" },
  ],
  problem:
    "Bar inventory is counted by hand. Staff tally bottles sheet by sheet, judge open bottles by eye, and can't see par levels or reorder amounts while they're at the shelf.",
  built:
    "The iOS app reads the label from a photo. An AI agent matches the item to the restaurant's catalog, reads its stock, estimates when it will run out and recommends one action. A whole shelf is identified in a single request, and if the operator confirms, the agent drafts a purchase order for review.",
  guardrails: [
    { title: "Never guesses", text: "Below a confidence bar it asks “Did you mean?” instead of matching.", icon: "shield" },
    { title: "Drafts only", text: "Prepares purchase orders but never sends one or moves money.", icon: "doc" },
    { title: "User's own access", text: "Reads data with the operator's sign-in, no separate credentials.", icon: "user" },
    { title: "Real numbers", text: "Every figure on screen comes from code and data, not the model.", icon: "lines" },
  ],
  honest: "Validated end to end in a test environment. There's no labeled accuracy benchmark yet, so I don't quote an accuracy figure.",
  voice: {
    name: "Voice-to-inventory counting",
    text: "Count stock by speaking instead of typing, so staff keep their hands free.",
    result: "Runner-up, 2024",
  },
};

export type OwnApp = {
  key: "cineflicx" | "pawalert" | "moviez";
  name: string;
  meta: string;
  text: string;
  url: string;
  featured?: boolean;
  links?: { privacy: string; support: string };
};

export const ownApps: OwnApp[] = [
  {
    key: "cineflicx",
    name: "CineFlicx",
    meta: "Film & TV Tracker. 2026. iPhone, iPad, Mac, Vision Pro",
    text: "Discovery and tracking with natural-language search processed on device, mood- and time-based picks, where to watch, next-episode reminders and a diary with ratings and stats. Imports from Letterboxd, IMDb and Trakt. No account needed.",
    url: "https://apps.apple.com/us/app/cineflicx-film-tv-tracker/id6762333634",
    featured: true,
    links: { privacy: "/cineflicx/privacy/", support: "/cineflicx/support/" },
  },
  {
    key: "pawalert",
    name: "PawAlert",
    meta: "Rescue Alerts Nearby. 2026",
    text: "Photograph an injured street animal and drop a pin. Nearby volunteers get a real-time alert, and the rescue can be tracked live.",
    url: "https://apps.apple.com/us/app/pawalert-rescue-alerts-nearby/id6767496810",
    links: { privacy: "/pawalert/privacy/", support: "/pawalert/support/" },
  },
  {
    key: "moviez",
    name: "Moviez",
    meta: "Movie & TV companion. 2020, through v3.0",
    text: "Release reminders, watchlist and favourites with cloud sync, actor profiles, trailers and local showtimes, on the TMDb API.",
    url: "https://apps.apple.com/us/app/moviez/id1511472908",
  },
];

export const inDevelopment = [
  "Offline-first Sudoku for iPhone and iPad (SwiftUI, Swift 6): multiple board sizes, notes, undo, stats, timed modes",
  "Personal inventory app with VisionKit barcode scanning and Firebase",
];

export const tmdbAttribution = "CineFlicx and Moviez use the TMDB API but are not endorsed or certified by TMDB.";

export const motto = { l1: "Think like a user.", l2: "Do like a developer.", caption: "My rule for every feature I build" };

export const pillars = [
  { title: "Clean layers", text: "MVVM-C and Clean Architecture with real dependency injection, not singletons.", icon: "layers" },
  { title: "Offline-first", text: "The device stays the source of truth. Changes queue and sync when the network returns.", icon: "wifi" },
  { title: "Tested and shipped", text: "XCTest, Crashlytics and CI/CD, with App Store releases owned end to end.", icon: "check" },
  { title: "AI with guardrails", text: "Claude Code and Codex daily, steered by the AGENTS.md and CLAUDE.md rules I wrote.", icon: "spark" },
];

export type Role = { from: string; to: string; role: string; company: string; place: string; text: string; honour?: string };

export const experience: Role[] = [
  {
    from: "2020",
    to: "Present",
    role: "Senior Software Engineer",
    company: "xtraCHEF by Toast, Inc.",
    place: "Chennai, India",
    text: "Lead cross-functional work with developers, designers and product managers on roadmap features, and keep releases consistent and on time. On the Retail Inventory team building Toast Now for iOS, and now contributing to the Android app in Kotlin.",
    honour: "Hackathons: 2nd in India and 8th at Toast (2026), runner-up (2024)",
  },
  {
    from: "2017",
    to: "2019",
    role: "Mobile Team Leader",
    company: "SkyBooking Pvt. Ltd.",
    place: "Phnom Penh, Cambodia",
    text: "Led mobile development for a Cambodian online booking platform for flights and hotels. Built new iOS apps and drove continuous improvement.",
  },
  {
    from: "2016",
    to: "2017",
    role: "iOS Team Leader",
    company: "Nanita Tech Co., Pvt. Ltd.",
    place: "Phnom Penh, Cambodia",
    text: "Led the team that developed and released an iOS app on the App Store.",
  },
  {
    from: "2015",
    to: "2016",
    role: "iOS Developer",
    company: "Casperon Technologies Pvt. Ltd.",
    place: "Chennai, India",
    text: "Owned end-to-end delivery of iOS features: design, implementation and maintenance.",
  },
  {
    from: "2014",
    to: "2015",
    role: "iOS Developer",
    company: "JEMS Nets Solutions",
    place: "Chennai, India",
    text: "Worked with lead developers to analyse, design, develop and optimise apps for performance.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "iOS", items: ["Swift", "SwiftUI", "UIKit", "Swift Concurrency (async/await)", "MapKit", "Core Location"] },
  { group: "Architecture", items: ["MVVM", "MVVM-C", "Clean Architecture", "Dependency Injection"] },
  { group: "Data and offline", items: ["SwiftData", "Core Data", "SQLite", "Offline-first sync", "REST", "GraphQL"] },
  { group: "Security and quality", items: ["Auth0", "Firebase Auth", "Face ID / Touch ID", "Firebase Crashlytics", "XCTest"] },
  { group: "Delivery", items: ["GitHub Actions", "Jenkins", "Git / GitHub", "Xcode", "App Store releases", "Agile / Scrum"] },
  { group: "Also", items: ["Kotlin (Android)", "Claude Code", "Codex", "AGENTS.md / CLAUDE.md"] },
];

export const education = {
  qualification: "Diploma in Electronics and Communication Engineering (ECE)",
  school: "Shanmuga Polytechnic College",
  years: "2007 – 2010",
};

export const contact = {
  line1: "Let's build",
  line2: "something solid.",
  text: "Have a role or a project in mind? Email is the fastest way to reach me.",
};

export const availabilityLine = "Open to senior iOS roles in India and the Gulf region.";
