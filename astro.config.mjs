import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const appPages = /\/(cineflicx|pawalert|gridora)\//;

export default defineConfig({
  site: "https://syedrazackimran.github.io",
  trailingSlash: "ignore",
  integrations: [sitemap({ filter: (page) => !appPages.test(page) && !page.endsWith("/404/") })],
  build: { inlineStylesheets: "always" },
});
