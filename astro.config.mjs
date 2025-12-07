import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://smaitra.com",
  integrations: [mdx(), sitemap()],
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
  adapter: process.env.VERCEL === "1" ? vercel() : undefined,
});
