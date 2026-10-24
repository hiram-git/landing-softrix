// Reglas de la solicitud de demo, compartidas por el formulario (DemoForm.astro)
// y la API (api/index.ts): si cambian aquí, cambian en los dos lados.
export const LIMITES = { nombre: 120, correo: 160, whatsapp: 40 } as const;

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFONO = /^[+\d\s().-]+$/;

export const correoValido = (valor: string) => CORREO.test(valor.trim());

/** Al menos 7 dígitos, y solo lo que se escribe en un número: +, espacios, guiones, paréntesis. */
export function whatsappValido(valor: string): boolean {
  const v = valor.trim();
  return TELEFONO.test(v) && (v.match(/\d/g) ?? []).length >= 7;
}

export type CampoContacto = "correo" | "whatsapp";

/** Correo y WhatsApp son opcionales por separado, pero hace falta uno. Devuelve el error de cada campo. */
export function erroresContacto(correo = "", whatsapp = ""): Record<CampoContacto, string | null> {
  const c = correo.trim();
  const w = whatsapp.trim();
  if (!c && !w) {
    const falta = "Deja al menos uno: correo o WhatsApp";
    return { correo: falta, whatsapp: falta };
  }
  return {
    correo: c && !correoValido(c) ? "Escribe un correo válido, como nombre@empresa.com" : null,
    whatsapp: w && !whatsappValido(w) ? "Escribe un número de al menos 7 dígitos" : null,
  };
}
