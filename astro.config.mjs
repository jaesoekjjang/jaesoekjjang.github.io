/* eslint-disable turbo/no-undeclared-env-vars */
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
/* 
  We are doing some URL mumbo jumbo here to tell Astro what the URL of your website will be.
  In local development, your SEO meta tags will have localhost URL.
  In built production websites, your SEO meta tags should have your website URL.
  So we give our website URL here and the template will know what URL to use 
  for meta tags during build.
  If you don't know your website URL yet, don't worry about this
  and leave it empty or use localhost URL. It won't break anything.
*/
import mdx from "@astrojs/mdx";
const SERVER_PORT = 3000;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
const LIVE_URL = "https://jaesoekjjang.github.io/";
// this is the astro command your npm script runs
const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");

const SITE = isBuild ? LIVE_URL : LOCALHOST_URL;
const BASE = isBuild ? "blog" : "/";

// https://astro.build/config
export default defineConfig({
  server: {
    port: SERVER_PORT,
  },
  site: SITE,
  base: BASE,
  integrations: [
    sitemap(),
    preact(),
    tailwind({
      nesting: true,
      // applyBaseStyles: false,
      configFile: "./tailwind.config.cjs",
    }),
    mdx({
      syntaxHighlight: "prism",
    }),
  ],
});
