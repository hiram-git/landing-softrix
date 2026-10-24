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
  /** Detalle legible de una pantalla real (`*-portada-*.webp`), con el ancho real del archivo grande. */
  captura: { base: string; anchoGrande: number; alt: string };
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
    captura: {
      base: "/screenshots/facturacion-panel-portada",
      anchoGrande: 1136,
      alt: "Panel de Softrix Facturación con las ventas del día y del mes y las cuentas por cobrar",
    },
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
    captura: {
      base: "/screenshots/rrhh-panel-portada",
      anchoGrande: 740,
      alt: "Panel de Softrix RRHH con la planilla quincenal en curso y sus indicadores",
    },
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
    captura: {
      base: "/screenshots/smartgate-accesos-portada",
      anchoGrande: 760,
      alt: "Departamento de Accesos de SmartGate Control: una visita verificada lista para autorizar o denegar",
    },
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
