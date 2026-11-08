// Motion only: every word and final number is already in the HTML. No cursor-following effects.
// With reduced motion everything stays in its final state.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;

/* Entrance, after the intro curtain lifts on a first visit */
const introDelay = root.classList.contains("intro") ? 1150 : 0;
const ready = () => window.setTimeout(() => requestAnimationFrame(() => document.body.classList.add("loaded")), introDelay);
if (document.fonts?.ready) document.fonts.ready.then(ready);
else window.addEventListener("load", ready);

/* Count-up, started when a figure scrolls into view. The real number never leaves the text,
   so crawlers, link previews and screen readers always read the final value; the counting
   digits are drawn over it from data-shown (see [data-count].counting in the CSS). */
const countUp = (el: HTMLElement) => {
  const target = Number(el.dataset.count);
  const dec = Number(el.dataset.dec ?? 0);
  const format = (n: number) => n.toFixed(dec);
  if (reduce || !Number.isFinite(target)) return;
  const dur = 1600;
  let t0 = 0;
  const frame = (t: number) => {
    if (!t0) t0 = t;
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 4);
    if (p < 1) {
      el.dataset.shown = format(target * e);
      requestAnimationFrame(frame);
    } else {
      el.classList.remove("counting");
      delete el.dataset.shown;
    }
  };
  el.dataset.shown = format(0);
  el.classList.add("counting");
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
document.querySelectorAll("[data-reveal]").forEach((el) => {
  // Order for the cascade inside each revealed card (CSS staggers by --i).
  el.querySelectorAll<HTMLElement>(".points li, .chip, .path li").forEach((item, i) => item.style.setProperty("--i", String(i)));
  io.observe(el);
});

/* Header background after the hero top, and the active section in the nav */
const bar = document.getElementById("top-bar");
const hero = document.querySelector<HTMLElement>(".hero");
const links = [...document.querySelectorAll<HTMLAnchorElement>(".top nav a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href") ?? ""));
// The photo lags the scroll and the glass badges lead it, so they read as two layers.
const depthLayers = [...document.querySelectorAll<HTMLElement>(".hero-photo, .glass-badges")];
const cases = [...document.querySelectorAll<HTMLElement>(".case")];
const stacking = window.matchMedia("(min-width: 901px)");
let queued = false;
const onScroll = () => {
  queued = false;
  const y = window.scrollY;
  bar?.classList.toggle("scrolled", y > 40);
  // The hero has its own colour in light mode, so the band behind the bar starts below it.
  bar?.classList.toggle("past-hero", !!hero && hero.getBoundingClientRect().bottom < (bar?.offsetHeight ?? 0));
  if (!reduce && y < window.innerHeight * 1.2) depthLayers.forEach((el) => el.style.setProperty("--py", `${(y * 0.18).toFixed(1)}px`));
  if (!reduce && stacking.matches) {
    cases.forEach((card, i) => {
      const next = cases[i + 1];
      if (!next) return;
      const a = card.getBoundingClientRect();
      const b = next.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, 1 - (b.top - a.top - 24) / Math.max(1, a.height - 24)));
      card.style.setProperty("--stack-scale", (1 - 0.04 * p).toFixed(4));
      card.style.setProperty("--stack-fade", Math.max(0, 1 - p * 1.6).toFixed(3));
    });
  }
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
  if (doc.startViewTransition && !reduce) {
    // The new theme opens as a circle from the toggle itself.
    const r = toggle.getBoundingClientRect();
    root.style.setProperty("--vt-x", `${r.left + r.width / 2}px`);
    root.style.setProperty("--vt-y", `${r.top + r.height / 2}px`);
    doc.startViewTransition(() => choose(next));
  }
  else choose(next);
});
systemDark.addEventListener("change", renderTheme);
renderTheme();
