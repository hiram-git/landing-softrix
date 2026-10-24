// Servidor del sitio (Elysia + Bun): la API de la solicitud de demo y, en
// producción, el sitio estático que deja `astro build` en dist/. Así un solo
// proceso atiende la página y /api (en desarrollo, Vite sirve el sitio y reenvía
// /api aquí).
//
// Cada solicitud de demo válida se añade como una línea JSON a SOLICITUDES_FILE
// (por defecto data/solicitudes-demo.jsonl), queda en el log y, con SMTP
// configurado, llega por correo (api/correo.ts).
import { existsSync } from "node:fs";
import { appendFile, mkdir } from "node:fs/promises";
import { dirname, join, normalize, resolve } from "node:path";
import { Elysia, t } from "elysia";
import { intereses } from "../src/data/contacto";
import { contactoValido, LIMITES } from "../src/data/demo";
import { avisarSolicitud, comprobarCorreo } from "./correo";

const PUERTO = Number(process.env.PORT ?? process.env.API_PORT ?? 3001);
// Por defecto 0.0.0.0 (IPv4). HOST=:: escucha también en IPv6, donde lo haya.
const HOST = process.env.HOST ?? "0.0.0.0";
// Carpeta del sitio estático; sin ella (o sin build) solo se sirve la API.
const SITIO = resolve(process.env.SITE_DIR ?? join(import.meta.dir, "..", "dist"));
const HAY_SITIO = existsSync(join(SITIO, "index.html"));
const SOLICITUDES = resolve(
  process.env.SOLICITUDES_FILE ?? join(import.meta.dir, "..", "data", "solicitudes-demo.jsonl"),
);

// Guarda la solicitud sin bloquear la respuesta. Si el disco falla, la solicitud
// sigue en el log del servicio (journalctl): nunca se pierde en silencio.
async function guardarSolicitud(solicitud: Record<string, string>) {
  try {
    await mkdir(dirname(SOLICITUDES), { recursive: true });
    await appendFile(SOLICITUDES, `${JSON.stringify(solicitud)}\n`);
  } catch (error) {
    console.error("[demo] no se pudo guardar la solicitud en", SOLICITUDES, error);
  }
}

// Freno a envíos en ráfaga: hasta 5 solicitudes por IP cada 10 minutos.
const VENTANA_MS = 10 * 60 * 1000;
const MAXIMO_POR_VENTANA = 5;
const envios = new Map<string, number[]>();
function demasiadas(ip: string) {
  const ahora = Date.now();
  const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  envios.set(ip, recientes);
  if (envios.size > 5000) {
    for (const [clave, marcas] of envios) {
      if (marcas.every((t) => ahora - t >= VENTANA_MS)) envios.delete(clave);
    }
  }
  return recientes.length > MAXIMO_POR_VENTANA;
}

// La IP real llega del proxy (nginx pone X-Real-IP y X-Forwarded-For).
function ipDe(
  request: Request,
  server: { requestIP(r: Request): { address: string } | null } | null,
) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    server?.requestIP(request)?.address ??
    "desconocida"
  );
}

const quiereJson = (request: Request) =>
  Boolean(request.headers.get("accept")?.includes("application/json"));

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
  // Sin JavaScript el formulario llega como envío normal: ante un dato inválido
  // se vuelve a la página en lugar de mostrar un JSON de error.
  .onError(({ code, request, redirect }) => {
    if (code === "VALIDATION" && !quiereJson(request)) return redirect("/?demo=error#demo", 303);
  })
  .post(
    "/api/demo",
    async ({ body, request, server, set, redirect }) => {
      const json = quiereJson(request);
      const listo = () => {
        if (!json) return redirect("/?demo=enviada#demo", 303);
        set.status = 201;
        return { ok: true };
      };

      // Trampa para bots: si llenó el campo oculto, se responde como si nada.
      if (body.sitio_web?.trim()) return listo();

      if (demasiadas(ipDe(request, server))) {
        set.status = 429;
        return json
          ? { error: "Demasiadas solicitudes. Inténtalo en unos minutos." }
          : redirect("/?demo=error#demo", 303);
      }
      if (!contactoValido(body.contacto)) {
        set.status = 422;
        return json
          ? { error: "El contacto debe ser un WhatsApp o un correo." }
          : redirect("/?demo=error#demo", 303);
      }

      const solicitud = {
        recibida: new Date().toISOString(),
        nombre: body.nombre.trim(),
        contacto: body.contacto.trim(),
        interes: body.interes,
      };
      console.info("[demo] nueva solicitud", solicitud);
      await guardarSolicitud(solicitud);
      // El correo sale después de responder: un SMTP lento no hace esperar al visitante.
      void avisarSolicitud(solicitud);
      return listo();
    },
    {
      body: t.Object({
        nombre: texto(LIMITES.nombre),
        contacto: texto(LIMITES.contacto),
        interes: t.Union(intereses.map((i) => t.Literal(i))),
        sitio_web: t.Optional(t.String({ maxLength: 500 })),
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
  void comprobarCorreo();
}
