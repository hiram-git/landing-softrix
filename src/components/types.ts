// Tipos de components.d.ts adaptados a Astro: lo que en React era ReactNode
// (children, icon, title) llega aquí por slots; className es `class`.

export type ButtonVariant = "primary" | "secondary" | "secondary-inverse" | "ghost" | "whatsapp";
export type BadgeTone = "brand" | "neutral" | "success" | "warning" | "danger" | "info";

export interface Accion {
  label: string;
  href: string;
}

export interface NavChild {
  label: string;
  href: string;
  hint?: string;
  current?: boolean;
}

export interface NavLink {
  label: string;
  href?: string;
  current?: boolean;
  children?: NavChild[];
}
