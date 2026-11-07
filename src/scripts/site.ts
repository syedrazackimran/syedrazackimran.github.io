// Motion only: every word and final number is already in the HTML. No cursor-following effects.
// With reduced motion everything stays in its final state.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;

/* Entrance */
const ready = () => requestAnimationFrame(() => document.body.classList.add("loaded"));
if (document.fonts?.ready) document.fonts.ready.then(ready);
else window.addEventListener("load", ready);

/* Count-up, started when a figure scrolls into view */
const countUp = (el: HTMLElement) => {
  const target = Number(el.dataset.count);
  const dec = Number(el.dataset.dec ?? 0);
  if (reduce || !Number.isFinite(target)) return;
  const dur = 1600;
  let t0 = 0;
  const frame = (t: number) => {
    if (!t0) t0 = t;
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 4);
    el.textContent = (p >= 1 ? target : target * e).toFixed(dec);
    if (p < 1) requestAnimationFrame(frame);
  };
  el.textContent = (0).toFixed(dec);
  requestAnimationFrame(frame);
};

/* Scroll reveals */
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("in");
      e.target.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
      io.unobserve(e.target);
    }
  },
  { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
);
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

/* Header background after the hero top, and the active section in the nav */
const bar = document.getElementById("top-bar");
const links = [...document.querySelectorAll<HTMLAnchorElement>(".top nav a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href") ?? ""));
let queued = false;
const onScroll = () => {
  queued = false;
  bar?.classList.toggle("scrolled", window.scrollY > 40);
  const line = window.innerHeight * 0.35;
  let current = -1;
  sections.forEach((sec, i) => {
    if (sec && sec.getBoundingClientRect().top < line) current = i;
  });
  links.forEach((a, i) => {
    a.classList.toggle("active", i === current);
    if (i === current) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  });
};
window.addEventListener(
  "scroll",
  () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true },
);
onScroll();

/* Process steps: highlight moves through the steps while they are on screen;
   hovering or focusing a step takes over. */
const steps = [...document.querySelectorAll<HTMLElement>("#steps .step")];
if (steps.length) {
  let index = 0;
  let timer = 0;
  let paused = false;
  const show = (i: number) => {
    index = i;
    steps.forEach((s, n) => s.classList.toggle("on", n === i));
  };
  const start = () => {
    if (reduce || timer) return;
    timer = window.setInterval(() => {
      if (!paused) show((index + 1) % steps.length);
    }, 2400);
  };
  const stop = () => {
    window.clearInterval(timer);
    timer = 0;
  };
  steps.forEach((s, i) => {
    s.addEventListener("pointerenter", () => {
      paused = true;
      show(i);
    });
    s.addEventListener("focus", () => {
      paused = true;
      show(i);
    });
  });
  steps[0]?.parentElement?.addEventListener("pointerleave", () => (paused = false));
  new IntersectionObserver(([e]) => (e?.isIntersecting ? start() : stop()), { threshold: 0.4 }).observe(steps[0]!.parentElement!);
}

/* Copy email */
for (const btn of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
  const note = btn.parentElement?.querySelector<HTMLElement>(".copied");
  let t = 0;
  btn.addEventListener("click", async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? "");
      ok = true;
    } catch {}
    if (!note) return;
    note.textContent = ok ? "Email copied" : btn.dataset.copy ?? "";
    note.classList.add("show");
    window.clearTimeout(t);
    t = window.setTimeout(() => note.classList.remove("show"), 1800);
  });
}

/* Theme: two states, always flips what is on screen; follows the device until used */
type Theme = "light" | "dark";
const toggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
const stored = (): Theme | null => {
  try {
    const v = localStorage.getItem("theme");
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
};
const shown = (): Theme => stored() ?? (systemDark.matches ? "dark" : "light");
const renderTheme = () => {
  const theme = shown();
  root.dataset.shown = theme;
  toggle?.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
};
const choose = (theme: Theme) => {
  root.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  renderTheme();
};
toggle?.addEventListener("click", () => {
  const next: Theme = shown() === "dark" ? "light" : "dark";
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !reduce) doc.startViewTransition(() => choose(next));
  else choose(next);
});
systemDark.addEventListener("change", renderTheme);
renderTheme();
