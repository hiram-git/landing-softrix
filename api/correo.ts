// Aviso por correo de cada solicitud de demo. Se enciende con SMTP_HOST; sin él la
// solicitud solo se guarda (data/solicitudes-demo.jsonl) y queda en el log.
//
//   SMTP_HOST, SMTP_PORT (587), SMTP_SECURE (true con 465), SMTP_USER, SMTP_PASS
//   DEMO_CORREO_PARA   a quién llega (por defecto, rcgsoftrix@rcgpty.com)
//   DEMO_CORREO_DE     remitente (por defecto, SMTP_USER si es un correo). En Resend
//                      el usuario es «resend»: el remitente va aquí, de un dominio verificado.
import nodemailer, { type Transporter } from "nodemailer";

export interface Solicitud {
  recibida: string;
  nombre: string;
  contacto: string;
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

const esCorreo = (valor: string) => valor.includes("@");
// Panamá: un número de 7 u 8 dígitos sin prefijo es local (+507).
function enlaceWhatsapp(valor: string) {
  const digitos = valor.replace(/\D/g, "");
  return `https://wa.me/${digitos.length <= 8 ? `507${digitos}` : digitos}`;
}
const unaLinea = (valor: string) => valor.replace(/[\r\n]+/g, " ");

export function mensajeDe(s: Solicitud) {
  const fecha = new Date(s.recibida).toLocaleString("es-PA", {
    timeZone: "America/Panama",
    dateStyle: "long",
    timeStyle: "short",
  });
  const responder = esCorreo(s.contacto)
    ? `Responder a: ${s.contacto}`
    : `WhatsApp: ${enlaceWhatsapp(s.contacto)}`;
  return {
    from: de,
    to: para,
    replyTo: esCorreo(s.contacto) ? s.contacto : undefined,
    subject: unaLinea(`Solicitud de demo: ${s.interes} · ${s.nombre}`),
    text: [
      "Llegó una solicitud de demo desde el sitio.",
      "",
      `Nombre: ${unaLinea(s.nombre)}`,
      `Contacto: ${unaLinea(s.contacto)}`,
      `Le interesa: ${s.interes}`,
      `Recibida: ${fecha}`,
      "",
      responder,
    ].join("\n"),
  };
}

// No lanza: un fallo de SMTP nunca le cuesta la solicitud al visitante (ya está guardada).
export async function avisarSolicitud(s: Solicitud) {
  if (!transporte) return;
  try {
    await transporte.sendMail(mensajeDe(s));
  } catch (error) {
    console.error("[demo] no se pudo enviar el aviso por correo a", para, error);
  }
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
    console.error(`[demo] el SMTP ${host}:${puerto} no responde o rechaza las credenciales`, error);
  }
}
