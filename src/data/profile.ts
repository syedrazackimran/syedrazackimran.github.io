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
  greeting: "Hey, I'm Imran,",
  title: ["Senior iOS", "Developer"],
  quote: "Think like a user. Do like a developer.",
  sub: "12+ years of native Swift, now Android in Kotlin too. I build inventory apps for restaurants that keep working offline and sync when the network returns.",
  services: [
    { n: "01", t: "iOS, Swift and SwiftUI" },
    { n: "02", t: "Android, Kotlin" },
    { n: "03", t: "Offline-first apps" },
    { n: "04", t: "Mobile team lead" },
  ],
};

// Section headings: a bold phrase plus one serif-italic accent phrase.
export const headings = {
  about: { label: "Behind the apps", plain: "Building apps that keep working", accent: "when the Wi-Fi doesn't" },
  work: { label: "Selected work", plain: "Apps restaurants run on,", accent: "online or off" },
  awards: { label: "Hackathons and recognition", plain: "Proud moments at", accent: "Toast hackathons" },
  apps: { label: "My own apps", plain: "Built and shipped on", accent: "my own time" },
  how: { label: "How I work", plain: "Built to last,", accent: "not just to demo" },
  experience: { label: "Experience", plain: "12+ years,", accent: "two countries" },
  skills: { label: "Skills", plain: "The", accent: "toolkit" },
};

// The About card that replaces a second copy of the photo.
export const journey = [
  { year: "2014", place: "Chennai", what: "iOS developer" },
  { year: "2016", place: "Phnom Penh", what: "iOS team lead, then mobile team lead" },
  { year: "2020", place: "Chennai", what: "Senior engineer, xtraCHEF by Toast" },
];

// Plain text names, no logos.
export const companies = ["xtraCHEF by Toast", "SkyBooking", "Nanita Tech", "Casperon Technologies", "JEMS Nets Solutions"];

// The two platforms, stated honestly: iOS is the 12-year core, Android is recent.
export const tracks = [
  {
    platform: "iOS",
    since: "12+ years",
    text: "Production apps in Swift and SwiftUI, UIKit where it fits. MVVM-C and Clean Architecture, offline-first storage, secure sign-in and App Store releases owned end to end.",
    stack: ["Swift", "SwiftUI", "UIKit", "SwiftData", "Core Data", "XCTest"],
  },
  {
    platform: "Android",
    since: "Recently started",
    text: "Contributing to the Toast Now Android app in Kotlin, so the inventory work I do on iOS now reaches both mobile platforms.",
    stack: ["Kotlin", "Toast Now Android"],
  },
];

export const about =
  "I'm a senior iOS developer and mobile team lead. I build clean, layered apps that keep working offline, and I own them from first design to App Store release.";

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
  "Android",
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
      "Toast's restaurant management app. I build the inventory features that let managers mark items in or out of stock and keep availability in sync across every location, online or offline.",
    points: [
      "Inventory keeps working offline and syncs when the connection returns",
      "Built in Swift and SwiftUI, integrated with the inventory APIs",
      "Shipped through regular App Store releases",
      "98–99% crash-free, backed by unit tests and CI/CD on GitHub Actions",
      "Now also contributing to the Android app in Kotlin",
    ],
    chips: ["Swift", "SwiftUI", "Offline-first", "GitHub Actions"],
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
      "Works offline: invoices and counts carry on in low-connectivity kitchens and sync later",
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
  { group: "Android", items: ["Kotlin (recently started, on the Toast Now Android app)"] },
  { group: "AI-assisted development", items: ["Claude Code", "Codex", "AGENTS.md / CLAUDE.md agent guidelines"] },
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
