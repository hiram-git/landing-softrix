// Datos de contacto y de marca en UN solo lugar.
// ⚠ MARCADORES: dominio, WhatsApp y correo todavía no están confirmados.
// Reemplázalos aquí y todo el sitio (enlaces, metadatos, sitemap) se actualiza.

export const sitio = {
  nombre: "Softrix",
  empresa: "RC Group",
  url: "https://softrix.com.pa", // MARCADOR
  correo: "ventas@softrix.com.pa", // MARCADOR
  whatsapp: {
    numero: "50760000000", // MARCADOR · solo dígitos, con código de país
    visible: "+507 6000-0000", // MARCADOR · como se lee en pantalla
  },
  descripcion:
    "Software de gestión hecho para Panamá: facturación electrónica DGI, planilla y control de entrada en una sola suite.",
  idioma: "es-PA",
} as const;

export const enlaceWhatsApp = (mensaje = "Hola, quiero una cotización de Softrix.") =>
  `https://wa.me/${sitio.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;

export type ProductoNav = {
  slug: string;
  nombre: string;
  destino: string;
  linea: string;
};

// El orden es el del letrero de ruta: insignia primero.
export const productos: ProductoNav[] = [
  {
    slug: "facturacion",
    nombre: "Softrix Facturación",
    destino: "FACTURACIÓN",
    linea: "Ventas, inventario, caja y facturación electrónica DGI para todas tus sucursales.",
  },
  {
    slug: "planilla",
    nombre: "Softrix Planilla",
    destino: "PLANILLA",
    linea: "Planilla para Panamá con fórmulas propias, préstamos, acreedores y asistencia.",
  },
  {
    slug: "control-de-entrada",
    nombre: "Softrix Control de Entrada",
    destino: "CONTROL DE ENTRADA",
    linea: "Visitantes, credenciales QR y puestos de control que siguen operando sin red.",
  },
];
