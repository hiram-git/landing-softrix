import type { NavLink } from "@/components/types";

export type Seccion = "inicio" | "facturacion" | "rrhh" | "smartgate";

const rutasSoftrix = {
  facturacion: "/softrix/facturacion",
  rrhh: "/softrix/rrhh",
  smartgate: "/softrix/smartgate",
} as const;

// El array navLinks de screens/inicio.html, con las rutas reales del sitio.
export function navLinks(actual: Seccion): NavLink[] {
  const enSoftrix = actual !== "inicio";
  return [
    {
      label: "Servicios Legales",
      children: [
        { label: "Firma electrónica y digital", href: "/#legal" },
        { label: "Asesoría tributaria", href: "/#legal" },
        { label: "Registro de marca y propiedad intelectual", href: "/#legal" },
        { label: "Constitución y gestión de sociedades", href: "/#legal" },
        { label: "Contratos de compraventa y escrituras", href: "/#legal" },
      ],
    },
    {
      label: "RCG Softrix",
      current: enSoftrix,
      children: [
        {
          label: "Softrix Facturación",
          href: rutasSoftrix.facturacion,
          hint: "Vende, factura ante la DGI y controla caja",
          current: actual === "facturacion",
        },
        {
          label: "Softrix RRHH",
          href: rutasSoftrix.rrhh,
          hint: "Planilla y colaboradores",
          current: actual === "rrhh",
        },
        {
          label: "SmartGate Control",
          href: rutasSoftrix.smartgate,
          hint: "Control de accesos",
          current: actual === "smartgate",
        },
      ],
    },
    { label: "Sector Gobierno", href: "/#gobierno" },
    { label: "Equipos", href: "/#equipos" },
    { label: "Blog", href: "#" },
    { label: "Contáctenos", href: "/#contacto" },
  ];
}

export const navPrimary = { label: "Solicitar demo", href: "/#demo" };
export const navSecondary = { label: "Iniciar sesión", href: "#" };
