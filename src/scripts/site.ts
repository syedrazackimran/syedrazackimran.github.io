// Ported from portfolio-preview.html. The markup already contains every word and final number,
// so this only adds motion; with reduced motion it leaves everything in its final state.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const root = document.documentElement;

/* Page-load sequence */
const startCounters = (scope: ParentNode) => {
  for (const el of scope.querySelectorAll<HTMLElement>("[data-count]")) {
    const target = Number(el.dataset.count);
    const dec = Number(el.dataset.dec ?? 0);
    if (reduce) continue;
    let t0 = 0;
    const dur = 1800;
    const delay = 700;
    el.textContent = (0).toFixed(dec);
    const frame = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, Math.max(0, (t - t0 - delay) / dur));
      const e = 1 - Math.pow(2, -10 * p);
      el.textContent = (p >= 1 ? target : target * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
};
const ready = () =>
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
    const creds = document.getElementById("creds");
    if (creds) startCounters(creds);
  });
if (document.fonts?.ready) document.fonts.ready.then(ready);
else window.addEventListener("load", ready);

/* Scroll reveals */
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
);
document.querySelectorAll("[data-reveal], #flow").forEach((el) => io.observe(el));

/* All scroll work batched into one animation frame */
const bar = document.getElementById("progress");
const tl = document.getElementById("timeline");
const tbar = document.getElementById("tbar");
const items = tl ? [...tl.querySelectorAll("li")] : [];
const links = [...document.querySelectorAll<HTMLAnchorElement>(".nav-pill nav a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href") ?? ""));
const qEl = document.getElementById("quote");
const qWords = qEl ? [...qEl.querySelectorAll(".qw")] : [];
let scrollQueued = false;

const onScrollFrame = () => {
  scrollQueued = false;
  const h = document.documentElement;
  const vh = window.innerHeight;
  const max = h.scrollHeight - h.clientHeight;
  if (bar) bar.style.transform = `scaleX(${(max > 0 ? h.scrollTop / max : 0).toFixed(4)})`;
  if (tl && tbar) {
    const r = tl.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (vh * 0.65 - r.top) / r.height));
    tbar.style.setProperty("--p", reduce ? "1" : p.toFixed(4));
    for (const li of items) li.classList.toggle("lit", reduce || li.getBoundingClientRect().top < vh * 0.65);
  }
  let current = -1;
  sections.forEach((sec, i) => {
    if (sec && sec.getBoundingClientRect().top < vh * 0.4) current = i;
  });
  links.forEach((a, i) => {
    a.classList.toggle("active", i === current);
    if (i === current) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  });
  if (qEl) {
    const r = qEl.getBoundingClientRect();
    const p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5)));
    const n = Math.round(p * qWords.length);
    qWords.forEach((w, i) => w.classList.toggle("on", i < n));
  }
};
const requestScroll = () => {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(onScrollFrame);
  }
};
window.addEventListener("scroll", requestScroll, { passive: true });
window.addEventListener("resize", requestScroll, { passive: true });
onScrollFrame();

if (!reduce && fine) {
  /* Spotlight follows the cursor on glass cards */
  for (const card of document.querySelectorAll<HTMLElement>(".glass")) {
    let queued = false;
    let ex = 0;
    let ey = 0;
    card.addEventListener("pointermove", (e) => {
      ex = e.clientX;
      ey = e.clientY;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${ex - r.left}px`);
        card.style.setProperty("--my", `${ey - r.top}px`);
      });
    });
  }

  /* Gentle 3D tilt on app cards */
  for (const card of document.querySelectorAll<HTMLElement>(".tilt")) {
    let queued = false;
    let ex = 0;
    let ey = 0;
    card.addEventListener("pointermove", (e) => {
      ex = e.clientX;
      ey = e.clientY;
      card.classList.add("moving");
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const r = card.getBoundingClientRect();
        const x = (ex - r.left) / r.width - 0.5;
        const y = (ey - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translate3d(0,-4px,0)`;
      });
    });
    card.addEventListener("pointerleave", () => {
      card.classList.remove("moving");
      card.style.transform = "";
    });
  }

  /* Hero cards drift with the mouse, eased every frame */
  const hero = document.querySelector<HTMLElement>(".hero");
  const pxs = [...document.querySelectorAll<HTMLElement>(".cred")].map((c) => ({
    el: c.querySelector<HTMLElement>(".px")!,
    d: Number(c.dataset.depth) * 0.7,
    x: 0,
    y: 0,
  }));
  let tx = 0;
  let ty = 0;
  let running = false;
  const tick = () => {
    let still = true;
    for (const o of pxs) {
      const gx = -tx * o.d;
      const gy = -ty * o.d;
      o.x += (gx - o.x) * 0.08;
      o.y += (gy - o.y) * 0.08;
      if (Math.abs(gx - o.x) > 0.05 || Math.abs(gy - o.y) > 0.05) still = false;
      o.el.style.transform = `translate3d(${o.x.toFixed(2)}px,${o.y.toFixed(2)}px,0)`;
    }
    if (still) {
      running = false;
      return;
    }
    requestAnimationFrame(tick);
  };
  const kick = () => {
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  };
  hero?.addEventListener("pointermove", (e) => {
    tx = e.clientX / window.innerWidth - 0.5;
    ty = e.clientY / window.innerHeight - 0.5;
    kick();
  });
  hero?.addEventListener("pointerleave", () => {
    tx = 0;
    ty = 0;
    kick();
  });

  /* Magnetic buttons */
  for (const b of document.querySelectorAll<HTMLElement>(".magnetic")) {
    let queued = false;
    let ex = 0;
    let ey = 0;
    b.addEventListener("pointermove", (e) => {
      ex = e.clientX;
      ey = e.clientY;
      b.classList.add("moving");
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const r = b.getBoundingClientRect();
        b.style.transform = `translate3d(${((ex - r.left - r.width / 2) * 0.15).toFixed(2)}px,${((ey - r.top - r.height / 2) * 0.2).toFixed(2)}px,0)`;
      });
    });
    b.addEventListener("pointerleave", () => {
      b.classList.remove("moving");
      b.style.transform = "";
    });
  }
}

/* Copy email */
for (const btn of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
  const note = btn.parentElement?.querySelector<HTMLElement>(".copied");
  let timer = 0;
  btn.addEventListener("click", async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? "");
      ok = true;
    } catch {}
    if (!note) return;
    note.textContent = ok ? "Email copied" : btn.dataset.copy ?? "";
    note.classList.add("show");
    window.clearTimeout(timer);
    timer = window.setTimeout(() => note.classList.remove("show"), 1800);
  });
}

/* Theme: two states, always flips what is on screen; follows the device until used */
type Theme = "light" | "dark";
const toggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
const barColour: Record<Theme, string> = { light: "#f4f7fc", dark: "#0a0f1e" };
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
  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) meta.content = barColour[theme];
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
