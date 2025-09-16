import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  {
    files: ["server/**/*.js", "app.js", "env.js"], // adjust to your actual node files
    languageOptions: {
      globals: globals.node,  // enable node globals
      env: {
        node: true,
      },
    },
  },
]);
