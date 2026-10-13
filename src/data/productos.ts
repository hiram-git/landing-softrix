import type { IconName } from "@/components/Icon.astro";
import type { BadgeTone } from "@/components/types";

export interface Producto {
  id: "fact" | "rrhh" | "gate";
  title: string;
  eyebrow: string;
  pitch: string;
  features: string[];
  href: string;
  cta: string;
  icon: IconName;
  featured?: boolean;
  badge?: string;
  badgeTone?: BadgeTone;
}

// Las tres ProductCard de screens/inicio.html.
export const productos: Producto[] = [
  {
    id: "fact",
    featured: true,
    icon: "box",
    eyebrow: "Producto insignia",
    title: "Softrix Facturación",
    pitch:
      "El ERP para pymes multi-sucursal: vende, factura ante la DGI, controla inventario y caja en un solo sistema.",
    features: [
      "Facturación electrónica DGI (CAFE, CUFE, QR)",
      "Stock en tiempo real por almacén",
      "Caja con apertura, cierre y supervisor",
      "Órdenes de servicio y taller",
    ],
    badge: "Nube o local",
    badgeTone: "info",
    cta: "Ver Facturación",
    href: "/softrix/facturacion",
  },
  {
    id: "rrhh",
    icon: "users",
    eyebrow: "Recursos humanos",
    title: "Softrix RRHH",
    pitch: "Planilla, colaboradores y portal del empleado conforme a la legislación panameña.",
    features: [
      "Planilla y deducciones de ley",
      "Ficha y contrato del colaborador",
      "Portal del colaborador",
      "Multi-empresa",
    ],
    cta: "Ver RRHH",
    href: "/softrix/rrhh",
  },
  {
    id: "gate",
    icon: "gate",
    eyebrow: "Control de accesos",
    title: "SmartGate Control",
    pitch: "Controla quién entra y sale de edificios, empresas y entes públicos.",
    features: [
      "Invitaciones y aprobaciones",
      "Acceso por QR",
      "Puesto de control en tableta",
      "Empresas públicas y privadas",
    ],
    cta: "Ver SmartGate",
    href: "/softrix/smartgate",
  },
];

// Selector «Elige lo que eres» de la sección de productos.
export const segmentos = [
  { id: "pyme", label: "Pyme o comercio", targets: ["fact", "rrhh"] },
  { id: "joyeria", label: "Joyería o taller", targets: ["fact"] },
  { id: "edificio", label: "Edificio o PH", targets: ["gate"] },
  { id: "gobierno", label: "Ente público", targets: ["gate", "rrhh"] },
  { id: "revendedor", label: "Revendedor", targets: ["fact", "rrhh", "gate"] },
] as const;
