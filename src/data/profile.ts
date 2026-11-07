// Every fact on the site comes from this file. Edit here, not in components.

export const config = {
  showPhone: false,
  showResume: false, // flip to true only after adding a public résumé (no phone, no "Additional details") as public/resume.pdf
  openToWork: false,
  showInDevelopment: false,
  showPortrait: true,
};

export const identity = {
  name: "Syed Razack Imran Thajudeen",
  shortName: "Imran",
  title: "Senior iOS Developer, Mobile Team Lead",
  location: "Chennai, India",
  email: "isyedrazackimran@gmail.com",
  linkedin: "https://www.linkedin.com/in/isyedrazackimran",
  github: "https://github.com/syedrazackimran",
  current: {
    role: "Senior Software Engineer",
    company: "xtraCHEF by Toast, Inc.",
    since: 2020,
    team: "Retail Inventory",
  },
};

export const hero = {
  headline: "I build iOS apps that keep working when the kitchen Wi-Fi doesn't.",
  supporting:
    "Senior iOS Developer at xtraCHEF by Toast. 12+ years shipping native Swift apps, including team-lead roles in Chennai and Phnom Penh.",
  recognition: "Toast hackathons: 2nd in India and 8th company-wide (2026), runner-up (2024).",
};

// Hero "at a glance" figures. Each one traces to the résumé facts below.
// The App Store rating is the app's, filled from apps.json at build time.
export const glance = {
  years: { value: 12, suffix: "+", label: "years building native iOS apps" },
  crashFree: { low: 98, high: 99, label: "crash-free rate maintained on Toast Now" },
  countries: { value: 2, label: "countries leading mobile teams: India and Cambodia" },
  rating: { label: "Toast Now's App Store rating" },
};

export const summary =
  "Senior iOS Developer with 12+ years of native iOS experience, including team-lead roles in India and Cambodia. I build production apps in Swift and SwiftUI (UIKit where it fits) with clean, layered architecture, offline-first storage and secure authentication. I own features end to end, from design to App Store release, and mentor developers in Agile teams. I recently started contributing to the Toast Now Android app in Kotlin.";

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

export const metaDescription =
  "Senior iOS Developer with 12+ years of native iOS experience and team-lead roles in India and Cambodia. Swift, SwiftUI, offline-first apps, MVVM-C and Clean Architecture.";

export type CaseStudy = {
  key: "toastNow" | "xtrachef";
  name: string;
  company: string;
  url: string;
  role: string;
  problem: string;
  built: string[];
  how: string;
  result: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    key: "toastNow",
    name: "Toast Now",
    company: "Toast, Inc.",
    url: "https://apps.apple.com/us/app/toast-now/id6444586410",
    role: "iOS engineer on the Retail Inventory team for Toast's restaurant management app.",
    problem:
      "Restaurant managers need to know what's in stock, mark items in or out, and have that stay in sync across every location they run.",
    built: [
      "Inventory features in Swift and SwiftUI that let managers mark items in or out of stock and keep availability in sync across locations.",
      "Inventory API integrations, shipped through regular App Store releases.",
    ],
    how: "Swift and SwiftUI with a layered MVVM-C architecture, unit tests, and CI/CD on GitHub Actions (previously Jenkins).",
    result: ["A 98–99% crash-free rate, maintained through unit testing and CI/CD."],
  },
  {
    key: "xtrachef",
    name: "xtraCHEF",
    company: "Toast, Inc.",
    url: "https://apps.apple.com/in/app/xtrachef/id988380179",
    role: "iOS engineer on the xtraCHEF app for restaurant operators.",
    problem:
      "Operators handle paper invoices and stock counts in kitchens where the connection drops. The work can't wait for the network.",
    built: [
      "Invoice upload in Swift: operators capture invoices with the camera and track processing status in the app.",
      "Inventory features that let operators manage stock counts from their phone.",
    ],
    how: "Offline-first storage, so inventory and invoice work continues in low-connectivity kitchens and syncs when the device is back online. Firebase Crashlytics and other Firebase services for stability monitoring.",
    result: [
      "Inventory and invoice work keeps going without a connection and syncs when it returns.",
      "Stability tracked with Firebase Crashlytics.",
    ],
  },
];

export type Hackathon = { year: number; result: string; project?: string; problem?: string; idea?: string };

// Confirmed by Imran: the year and result of each. Project details for 2026 are still to be confirmed,
// so only the result is shown. 2024 is described as an idea; it is not claimed to have shipped.
export const hackathons: Hackathon[] = [
  { year: 2026, result: "2nd in India, 8th across all of Toast" },
  {
    year: 2024,
    result: "Runner-up",
    project: "Voice-to-inventory counting",
    problem: "Counting stock means typing numbers into a phone while standing in a walk-in cooler with your hands full.",
    idea: "Count stock by speaking instead of typing, so staff can keep their hands on the shelves.",
  },
];

export const strengths = [
  "Secure authentication with Auth0 and biometrics (Face ID / Touch ID); a 98–99% crash-free rate backed by unit tests, Firebase Crashlytics and CI/CD",
  "Offline-first data with SwiftData and Core Data (plus SQLite) for reliable performance in low-connectivity conditions",
  "End-to-end App Store submission: review preparation, versioning, handling reviewer feedback",
  "AI-assisted development with Claude Code and Codex in daily work, guided by AGENTS.md / CLAUDE.md conventions I wrote",
  "Mentoring junior developers and leading teams through full project lifecycles",
];

export type Role = { years: string; role: string; company: string; place: string; summary: string; notes?: string[] };

export const experience: Role[] = [
  {
    years: "2020 – present",
    role: "Senior Software Engineer",
    company: "xtraCHEF by Toast, Inc.",
    place: "Chennai, India",
    summary:
      "Retail Inventory team, building inventory features for the Toast Now iOS app. Lead cross-functional work with developers, designers and product managers to deliver roadmap features, and coordinate with other teams to keep releases consistent and on time. Recently started contributing to the Toast Now Android app in Kotlin.",
    notes: ["Toast hackathons: 2nd in India and 8th company-wide (2026), runner-up (2024)."],
  },
  {
    years: "2017 – 2019",
    role: "Mobile Team Leader",
    company: "SkyBooking Pvt. Ltd.",
    place: "Phnom Penh, Cambodia",
    summary:
      "Led mobile development for SkyBooking, a Cambodian online booking platform for flights and hotels. Built new iOS apps and kept improving them with new features and fixes.",
  },
  {
    years: "2016 – 2017",
    role: "iOS Team Leader",
    company: "Nanita Tech Co., Pvt. Ltd.",
    place: "Phnom Penh, Cambodia",
    summary: "Led the team that developed and released an iOS app on the App Store.",
  },
  {
    years: "2015 – 2016",
    role: "iOS Developer",
    company: "Casperon Technologies Pvt. Ltd.",
    place: "Chennai, India",
    summary: "Owned end-to-end delivery of iOS features: component design, implementation and maintenance.",
  },
  {
    years: "2014 – 2015",
    role: "iOS Developer",
    company: "JEMS Nets Solutions",
    place: "Chennai, India",
    summary: "Worked with lead developers to analyse, design, build and optimise apps for performance.",
  },
];

export type OwnApp = {
  key: "cineflicx" | "pawalert" | "moviez";
  name: string;
  year: number;
  url: string;
  line: string;
  usesTmdb: boolean;
  support: { privacy: string; support: string };
};

export const featuredApp = {
  key: "cineflicx" as const,
  platforms: "iPhone, iPad, Mac and Apple Vision Pro",
  problem: "Deciding what to watch, finding where it's streaming and remembering when the next episode is out, without creating yet another account.",
  built:
    "A film and TV discovery and tracking app built in Swift and SwiftUI. Natural-language search processed on device, mood- and time-based picks, where-to-watch info, next-episode reminders, and a diary with ratings, stats and Letterboxd / IMDb / Trakt import.",
  how: "Native Swift and SwiftUI across iPhone, iPad, Mac and Vision Pro. Search runs on device, and there's no account to create.",
};

export const ownApps: OwnApp[] = [
  {
    key: "cineflicx",
    name: "CineFlicx",
    year: 2026,
    url: "https://apps.apple.com/us/app/cineflicx-film-tv-tracker/id6762333634",
    line: "Film and TV discovery and tracking, with on-device natural-language search.",
    usesTmdb: true,
    support: { privacy: "/cineflicx/privacy/", support: "/cineflicx/support/" },
  },
  {
    key: "pawalert",
    name: "PawAlert",
    year: 2026,
    url: "https://apps.apple.com/us/app/pawalert-rescue-alerts-nearby/id6767496810",
    line: "Photograph an injured street animal, drop a pin, and nearby volunteers get a real-time alert.",
    usesTmdb: false,
    support: { privacy: "/pawalert/privacy/", support: "/pawalert/support/" },
  },
  {
    key: "moviez",
    name: "Moviez",
    year: 2020,
    url: "https://apps.apple.com/us/app/moviez/id1511472908",
    line: "Movie and TV companion on the TMDb API: reminders, watchlist with cloud sync, trailers and showtimes.",
    usesTmdb: true,
    support: { privacy: "", support: "" },
  },
];

export const inDevelopment = [
  "Offline-first Sudoku for iPhone and iPad (SwiftUI, Swift 6): multiple board sizes, notes, undo, stats, timed modes",
  "Personal inventory app with VisionKit barcode scanning and Firebase",
];

export const tmdbAttribution = "This product uses the TMDB API but is not endorsed or certified by TMDB.";

export const principles = [
  { name: "Architecture", text: "MVVM-C and Clean Architecture, with clear presentation, domain, data, networking and persistence layers." },
  { name: "Dependency injection", text: "Production-grade injection. No preview singletons, and no fake API mocks just to make SwiftUI previews work." },
  { name: "Offline-first", text: "The local store is the source of truth (SwiftData, Core Data or SQLite). Writes queue and sync when the network is back." },
  { name: "Concurrency", text: "Swift 6 and async/await." },
  { name: "Quality", text: "XCTest unit tests, Crashlytics monitoring and CI/CD on GitHub Actions (previously Jenkins). 98–99% crash-free." },
  { name: "Security", text: "Auth0, Firebase Auth and Face ID / Touch ID." },
  { name: "Release", text: "App Store submission end to end: versioning, review preparation and handling reviewer feedback." },
  {
    name: "AI-assisted, with guardrails",
    text: "Claude Code and Codex every day, steered by AGENTS.md and CLAUDE.md files I wrote so agents follow the codebase's architecture and conventions.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "iOS", items: ["Swift", "SwiftUI", "UIKit", "Swift Concurrency (async/await)", "MapKit", "Core Location"] },
  { group: "Android", items: ["Kotlin (recently started, on the Toast Now Android app)"] },
  { group: "AI-assisted development", items: ["Claude Code", "Codex", "AGENTS.md / CLAUDE.md agent guidelines"] },
  { group: "Architecture", items: ["MVVM", "MVVM-C", "Clean Architecture", "Dependency Injection"] },
  { group: "Data and offline", items: ["SwiftData", "Core Data", "SQLite", "Offline-first sync"] },
  { group: "Networking", items: ["REST", "GraphQL"] },
  { group: "Security and monitoring", items: ["Auth0", "Firebase Auth", "Face ID / Touch ID", "Firebase Crashlytics"] },
  { group: "Testing and CI/CD", items: ["XCTest", "GitHub Actions", "Jenkins"] },
  { group: "Tools and process", items: ["Git / GitHub", "Xcode", "App Store releases", "Agile / Scrum"] },
];

export const education = {
  qualification: "Diploma in Electronics and Communication Engineering (ECE)",
  school: "Shanmuga Polytechnic College",
  years: "2007 – 2010",
};

export const availabilityLine = "Open to senior iOS roles in India and the Gulf region.";
