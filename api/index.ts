// Stub de la API del sitio (Elysia + Bun). Valida la solicitud de demo y la
// registra en consola; el destino real (correo, CRM) está pendiente de definir.
import { Elysia, t } from "elysia";
import { intereses } from "../src/data/contacto";

const PUERTO = Number(process.env.API_PORT ?? 3001);

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
  .get("/api/salud", () => ({ ok: true }));

if (import.meta.main) {
  app.listen(PUERTO);
  console.info(`API de RCG Softrix en http://localhost:${PUERTO}`);
}
