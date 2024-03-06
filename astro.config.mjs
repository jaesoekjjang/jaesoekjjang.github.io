import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
const SERVER_PORT = 3000;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
const LIVE_URL = "https://jaesoekjjang.github.io/";
const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");
const SITE = isBuild ? LIVE_URL : LOCALHOST_URL;


// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true
  },
  server: {
    port: SERVER_PORT
  },
  markdown: {
    shikiConfig: {
      experimentalThemes: {
        light: "dracula",
        dark: "github-dark"
      }
    }
  },
  integrations: [mdx({
    syntaxHighlight: "shiki"
  }), tailwind(), preact()],
  site: SITE,
  experimental: {
    contentCollectionCache: true
  }
});