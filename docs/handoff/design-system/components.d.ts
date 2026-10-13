import type { ReactNode, MouseEvent, ChangeEvent } from "react";

/** Botón o enlace. Con `href` renderiza un <a>; sin él, un <button>. */
export interface ButtonProps {
  /** primary = fondo `brand`; secondary = borde `border-strong`; ghost = texto `brand-text`; whatsapp = píldora verde con icono. */
  variant?: "primary" | "secondary" | "secondary-inverse" | "ghost" | "whatsapp";
  /** secondary-inverse = borde y texto `on-brand`, solo sobre `brand-deep` o `surface-inverse`. */
  /** lg (48px) solo en hero y franja de CTA. */
  size?: "md" | "lg";
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Añade la flecha al final (llamadas a la acción). */
  arrow?: boolean;
  onClick?: (e: MouseEvent) => void;
  className?: string;
  children?: ReactNode;
}

/** Etiqueta de estado o categoría en `label` mayúsculas. */
export interface BadgeProps {
  tone?: "brand" | "neutral" | "success" | "warning" | "danger" | "info";
  /** Forma de píldora (estados). */
  pill?: boolean;
  icon?: "check" | "alert";
  className?: string;
  children?: ReactNode;
}

/** Tarjeta de producto de la suite para la rejilla de la landing. */
export interface ProductCardProps {
  title: string;
  /** Frase de qué resuelve el producto (`body`, `ink-muted`). */
  pitch?: string;
  /** Eyebrow en `label` + `brand-text`, p. ej. "Producto insignia". */
  eyebrow?: string;
  /** SVG de Lucide de 24px; va dentro del cuadrado `brand-soft`. */
  icon?: ReactNode;
  /** 3 a 5 frases nominales cortas. */
  features?: string[];
  href?: string;
  /** Texto del enlace al pie; por defecto "Ver producto". */
  cta?: string;
  badge?: string;
  badgeTone?: BadgeProps["tone"];
  /** Producto insignia: borde y línea superior `brand`. Solo uno por rejilla. */
  featured?: boolean;
  className?: string;
}

/** Campo de formulario con etiqueta, ayuda y error accesibles. */
export interface InputProps {
  name: string;
  id?: string;
  label?: string;
  type?: "text" | "email" | "tel" | "number" | "password";
  multiline?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  hint?: string;
  /** Mensaje de error: borde `danger`, icono y texto en `danger`. */
  error?: string;
  optional?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

/** Tarjeta de característica, vertical o módulo: icono o etiqueta, título, texto y lista opcional. */
export interface FeatureCardProps {
  title: string;
  /** SVG de Lucide de 24px dentro del cuadrado `brand-soft`. Excluyente con `badge`. */
  icon?: ReactNode;
  /** Etiqueta en lugar del icono (vertical: "Joyerías"). */
  badge?: string;
  badgeTone?: BadgeProps["tone"];
  /** 2 a 5 frases nominales. */
  items?: string[];
  /** Texto de apoyo (`body-sm`, `ink-muted`). */
  children?: ReactNode;
  className?: string;
}

export interface NavChild { label: string; href: string; hint?: string; current?: boolean; }
/** Un enlace de primer nivel; con `children` se vuelve un submenú (abre al pasar el cursor o con foco). */
export interface NavLink { label: string; href?: string; current?: boolean; children?: NavChild[]; }

/** Barra de navegación con logotipo horizontal a 32px. */
export interface NavbarProps {
  /** `assets/Logos/rcg-softrix-horizontal.png` en claro; el inverso en oscuro. */
  logoSrc: string;
  /** Por defecto "RCG Softrix". */
  logoAlt?: string;
  homeHref?: string;
  links?: NavLink[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Pegajosa con `shadow-md`. */
  sticky?: boolean;
  className?: string;
}

/** Cabecera de página: eyebrow, titular `display-xl`, bajada y dos acciones. */
export interface HeroProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  primary?: { label: string; href: string };
  /** En claro renderiza `ghost` (o `secondaryVariant`); en oscuro, `secondary-inverse`. */
  secondary?: { label: string; href: string };
  secondaryVariant?: ButtonProps["variant"];
  /** Etiquetas sobre el eyebrow (páginas de producto). */
  badges?: { label: string; tone?: BadgeProps["tone"] }[];
  /** Línea `caption` bajo los botones ("Sin tarjeta. Demo guiada de 30 minutos."). */
  note?: string;
  /** Fondo `brand-deep` con texto `on-brand` (páginas de producto). */
  dark?: boolean;
  /** Columna derecha (flex 1 1 440px): captura de pantalla real del producto. */
  children?: ReactNode;
  className?: string;
}

export declare const Button: (props: ButtonProps) => JSX.Element;
export declare const Badge: (props: BadgeProps) => JSX.Element;
export declare const ProductCard: (props: ProductCardProps) => JSX.Element;
export declare const Input: (props: InputProps) => JSX.Element;
export declare const FeatureCard: (props: FeatureCardProps) => JSX.Element;
export declare const Navbar: (props: NavbarProps) => JSX.Element;
export declare const Hero: (props: HeroProps) => JSX.Element;
