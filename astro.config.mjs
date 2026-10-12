import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { sitio } from "./src/config/site.ts";

if (sitio.marcadores) {
  console.warn(
    "\n⚠ Softrix: dominio, WhatsApp y correo siguen como marcadores (src/config/site.ts). " +
      "El sitio sale con noindex hasta que se reemplacen.\n",
  );
}

export default defineConfig({
  site: sitio.url,
  output: "static",
  // Con "class", una clase pasada a un componente hijo conserva el ámbito del padre.
  scopedStyleStrategy: "class",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap()],
});
