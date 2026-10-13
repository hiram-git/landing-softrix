import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// La API (Elysia, api/index.ts) corre aparte; en desarrollo y en preview Vite
// le reenvía /api para que el formulario use la misma ruta que en producción.
const API = `http://localhost:${process.env.API_PORT ?? 3001}`;

export default defineConfig({
  site: "https://rcgpty.com",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  // Con "class", una clase pasada a un componente hijo conserva el ámbito del padre.
  scopedStyleStrategy: "class",
  // Con el modo "jsx" (default de Astro 7) se pierde el espacio entre un texto y
  // una expresión escritos en líneas distintas («llama al+(507)…»).
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    server: { proxy: { "/api": API } },
    preview: { proxy: { "/api": API } },
  },
});
