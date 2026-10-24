// Reglas de la solicitud de demo, compartidas por el formulario (DemoForm.astro)
// y la API (api/index.ts): si cambian aquí, cambian en los dos lados.
export const LIMITES = { nombre: 120, contacto: 160 } as const;

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Un correo o un número con al menos 7 dígitos (WhatsApp o teléfono). */
export function contactoValido(valor: string): boolean {
  const v = valor.trim();
  if (v.includes("@")) return CORREO.test(v);
  return (v.match(/\d/g) ?? []).length >= 7;
}
