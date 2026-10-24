// Correos de cada solicitud de demo: el aviso al equipo (DEMO_CORREO_PARA) y, si el
// visitante dejó correo, su confirmación. Se encienden con SMTP_HOST; sin él la
// solicitud solo se guarda (data/solicitudes-demo.jsonl) y queda en el log.
//
//   SMTP_HOST, SMTP_PORT (587), SMTP_SECURE (true con 465), SMTP_USER, SMTP_PASS
//   DEMO_CORREO_PARA   a quién llega (por defecto, rcgsoftrix@rcgpty.com)
//   DEMO_CORREO_DE     remitente (por defecto, SMTP_USER si es un correo). En Resend
//                      el usuario es «resend»: el remitente va aquí, de un dominio verificado.
import nodemailer, { type SendMailOptions, type Transporter } from "nodemailer";
import { contacto } from "../src/data/contacto";

export interface Solicitud {
  recibida: string;
  nombre: string;
  correo?: string;
  whatsapp?: string;
  interes: string;
}

const host = process.env.SMTP_HOST?.trim();
const puerto = Number(process.env.SMTP_PORT ?? 587);
const usuario = process.env.SMTP_USER?.trim();
const para = process.env.DEMO_CORREO_PARA?.trim() || "rcgsoftrix@rcgpty.com";
const de = process.env.DEMO_CORREO_DE?.trim() || (usuario?.includes("@") ? usuario : undefined);

const transporte: Transporter | null =
  host && de
    ? nodemailer.createTransport({
        host,
        port: puerto,
        secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : puerto === 465,
        auth: usuario ? { user: usuario, pass: process.env.SMTP_PASS ?? "" } : undefined,
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 20_000,
      })
    : null;

export const correoActivo = transporte !== null;

// Panamá: un número de 7 u 8 dígitos sin prefijo es local (+507).
function enlaceWhatsapp(valor: string) {
  const digitos = valor.replace(/\D/g, "");
  return `https://wa.me/${digitos.length <= 8 ? `507${digitos}` : digitos}`;
}
const unaLinea = (valor: string) => valor.replace(/[\r\n]+/g, " ");

// El error de nodemailer en una línea: código y respuesta del servidor, que es lo que explica
// la causa (clave rechazada, dominio sin verificar, puerto cerrado…).
function detalle(error: unknown) {
  const e = error as { code?: string; response?: string; message?: string };
  return [e.code, e.response ?? e.message].filter(Boolean).join(": ");
}

/** El aviso al equipo, con lo necesario para contestar desde el mismo correo. */
export function avisoInterno(s: Solicitud) {
  const fecha = new Date(s.recibida).toLocaleString("es-PA", {
    timeZone: "America/Panama",
    dateStyle: "long",
    timeStyle: "short",
  });
  return {
    from: de,
    to: para,
    replyTo: s.correo,
    subject: unaLinea(`Solicitud de demo: ${s.interes} · ${s.nombre}`),
    text: [
      "Llegó una solicitud de demo desde el sitio.",
      "",
      `Nombre: ${unaLinea(s.nombre)}`,
      `Correo: ${s.correo ?? "—"}`,
      `WhatsApp: ${s.whatsapp ? `${unaLinea(s.whatsapp)} · ${enlaceWhatsapp(s.whatsapp)}` : "—"}`,
      `Le interesa: ${s.interes}`,
      `Recibida: ${fecha}`,
      "",
      s.correo
        ? "Responder a este correo le escribe al visitante."
        : "No dejó correo: escríbele por WhatsApp.",
    ].join("\n"),
  };
}

/** La confirmación al visitante. Las respuestas llegan al equipo (replyTo). */
export function confirmacionVisitante(s: Solicitud & { correo: string }) {
  return {
    from: de,
    to: s.correo,
    replyTo: para,
    subject: "Recibimos tu solicitud de demo · RCG Softrix",
    text: [
      `Hola, ${unaLinea(s.nombre)}:`,
      "",
      `Recibimos tu solicitud de demo de ${s.interes}. Te contactamos en un día hábil${
        s.whatsapp ? ` por WhatsApp al ${unaLinea(s.whatsapp)} o` : ""
      } a este correo.`,
      "",
      `Si prefieres no esperar, escríbenos al WhatsApp ${contacto.whatsappVisible} o llama al ${contacto.oficina}. También puedes responder a este correo.`,
      "",
      "RCG Softrix · RC Group Panamá",
      contacto.direccionCorta,
      "",
      "Si no pediste esta demo, ignora este mensaje.",
    ].join("\n"),
  };
}

// Freno a que el formulario sirva para mandarle correos a un tercero: una confirmación
// por dirección cada 24 h (el aviso al equipo sale siempre).
const DIA_MS = 24 * 60 * 60 * 1000;
const confirmadas = new Map<string, number>();
function puedeConfirmar(correo: string) {
  const ahora = Date.now();
  for (const [clave, cuando] of confirmadas)
    if (ahora - cuando >= DIA_MS) confirmadas.delete(clave);
  const clave = correo.toLowerCase();
  if (confirmadas.has(clave)) return false;
  confirmadas.set(clave, ahora);
  return true;
}

async function enviar(que: string, mensaje: SendMailOptions) {
  if (!transporte) return;
  try {
    const envio = await transporte.sendMail(mensaje);
    console.info(`[demo] correo «${que}» enviado a ${mensaje.to} (${envio.response})`);
  } catch (error) {
    console.error(`[demo] no se pudo enviar el correo «${que}» a ${mensaje.to}: ${detalle(error)}`);
  }
}

// No lanza: un fallo de SMTP nunca le cuesta la solicitud al visitante (ya está guardada).
export async function avisarSolicitud(s: Solicitud) {
  if (!transporte) {
    console.info("[demo] correo apagado: la solicitud solo quedó guardada");
    return;
  }
  const { correo } = s;
  await Promise.all([
    enviar("aviso", avisoInterno(s)),
    correo &&
      (puedeConfirmar(correo)
        ? enviar("confirmación", confirmacionVisitante({ ...s, correo }))
        : Promise.resolve(
            console.info(`[demo] confirmación a ${correo} omitida: ya se envió una hoy`),
          )),
  ]);
}

// Al arrancar, deja dicho en el log si el SMTP responde: es lo primero que se mira.
export async function comprobarCorreo() {
  if (!transporte) {
    console.info(
      host
        ? "[demo] aviso por correo apagado: falta DEMO_CORREO_DE (el remitente)"
        : "[demo] aviso por correo apagado: falta SMTP_HOST",
    );
    return;
  }
  try {
    await transporte.verify();
    console.info(`[demo] aviso por correo activo: ${host}:${puerto} → ${para}`);
  } catch (error) {
    console.error(`[demo] el SMTP ${host}:${puerto} falló: ${detalle(error)}`);
  }
}
