// Servidor del sitio (Elysia + Bun): la API de la solicitud de demo (stub que
// valida y registra en consola; el destino real, correo o CRM, está pendiente)
// y, en producción, el sitio estático que deja `astro build` en dist/. Así un
// solo proceso atiende la página y /api (en desarrollo, Vite sirve el sitio y
// reenvía /api aquí).
import { existsSync } from "node:fs";
import { join, normalize, resolve } from "node:path";
import { Elysia, t } from "elysia";
import { intereses } from "../src/data/contacto";

const PUERTO = Number(process.env.PORT ?? process.env.API_PORT ?? 3001);
// Por defecto 0.0.0.0 (IPv4). HOST=:: escucha también en IPv6, donde lo haya.
const HOST = process.env.HOST ?? "0.0.0.0";
// Carpeta del sitio estático; sin ella (o sin build) solo se sirve la API.
const SITIO = resolve(process.env.SITE_DIR ?? join(import.meta.dir, "..", "dist"));
const HAY_SITIO = existsSync(join(SITIO, "index.html"));

// Traduce una ruta del navegador al archivo de dist/ (build.format: "file"):
// «/» → index.html, «/softrix/rrhh» → softrix/rrhh.html, «/_astro/x.css» → tal cual.
function archivoDe(ruta: string) {
  const limpia = normalize(decodeURIComponent(ruta)).replaceAll("\\", "/");
  if (limpia.includes("..")) return null;
  const candidatos =
    limpia === "/"
      ? ["index.html"]
      : [`${limpia.slice(1)}.html`, limpia.slice(1), `${limpia.slice(1)}/index.html`];
  for (const c of candidatos) {
    const absoluto = resolve(SITIO, c);
    if (!absoluto.startsWith(SITIO)) return null;
    if (existsSync(absoluto) && Bun.file(absoluto).size > 0) return absoluto;
  }
  return null;
}

// `\S` exige al menos un carácter que no sea espacio.
const texto = (max: number) => t.String({ minLength: 1, maxLength: max, pattern: "\\S" });

export const app = new Elysia()
  .post(
    "/api/demo",
    ({ body, request, set, redirect }) => {
      // Stub: aquí irá el aviso a ventas. Por ahora solo queda en el log.
      console.info("[demo] nueva solicitud", { ...body, recibida: new Date().toISOString() });

      // Sin JavaScript el formulario llega como envío normal: se vuelve a la página.
      if (!request.headers.get("accept")?.includes("application/json")) {
        return redirect("/?demo=enviada#demo", 303);
      }
      set.status = 201;
      return { ok: true };
    },
    {
      body: t.Object({
        nombre: texto(120),
        contacto: texto(160),
        interes: t.Union(intereses.map((i) => t.Literal(i))),
      }),
    },
  )
  .get("/api/salud", () => ({ ok: true }))
  .get("/*", ({ request, set }) => {
    if (!HAY_SITIO) {
      set.status = 404;
      return { error: "Sin sitio: falta el build (bun run build)" };
    }
    const ruta = new URL(request.url).pathname;
    const archivo = archivoDe(ruta);
    if (!archivo) {
      set.status = 404;
      const pagina404 = join(SITIO, "404.html");
      return existsSync(pagina404) ? Bun.file(pagina404) : "No encontrado";
    }
    // Lo de /_astro/ lleva hash en el nombre: cacheable para siempre; el HTML, no.
    set.headers["cache-control"] = ruta.startsWith("/_astro/")
      ? "public, max-age=31536000, immutable"
      : "no-cache";
    return Bun.file(archivo);
  });

if (import.meta.main) {
  app.listen({ port: PUERTO, hostname: HOST });
  const modo = HAY_SITIO ? `sitio: ${SITIO} + /api` : "solo /api";
  console.info(`RCG Softrix en http://localhost:${PUERTO} (${modo})`);
}
