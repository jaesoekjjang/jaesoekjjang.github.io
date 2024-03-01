import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      experimentalThemes: {
        light: "dracula",
        dark: "github-dark",
      },
    },
  },
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
    }),
    tailwind(),
  ],
  site: "https://www.my-site.dev",
});
