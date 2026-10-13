// Datos reales de RC Group (HANDOFF.md → «Datos reales»).
export const contacto = {
  direccion: "PH Obarrio 60, Panamá, Panamá",
  direccionCorta: "PH Obarrio 60, Panamá",
  oficina: "+(507) 399-2627",
  whatsappVisible: "+507 6196-6047",
  whatsapp:
    "https://wa.me/50761966047?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20RCG%20Softrix",
  correo: "zrivera@rcgpty.com",
  horario: "Lunes a viernes, 8:00 a. m. – 5:00 p. m.",
  instagram: { usuario: "@rcgroup_pty", url: "https://instagram.com/rcgroup_pty" },
} as const;

export const intereses = [
  "Softrix Facturación",
  "Softrix RRHH",
  "SmartGate Control",
  "Servicios legales o asesoría fiscal",
  "Equipos",
  "Ser distribuidor",
] as const;

export type Interes = (typeof intereses)[number];
