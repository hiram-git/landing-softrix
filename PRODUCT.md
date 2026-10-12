# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Visitantes del sitio público de Softrix (RC Group), sobre todo de Panamá:

- **Dueño o administrador de una pyme** (a menudo con varias sucursales) que
  necesita facturar ante la DGI, controlar inventario y caja o pagar la planilla.
  Evalúa desde el celular o la PC de la oficina y decide si pide una demo.
- **Responsable de seguridad o administración de un edificio, PH, hotel o ente
  público** que necesita controlar quién entra.
- **Revendedores e integradores** que quieren distribuir los productos Softrix.

## Product Purpose

La landing presenta la suite Softrix y convierte la visita en una **solicitud de
cotización o demo** (formulario o WhatsApp). Todo se vende «a cotizar»: no se
publican precios.

Productos (nombres comerciales confirmados el 2026-10-12):

1. **Softrix Facturación**: ERP comercial multi-empresa y multi-sucursal:
   facturación electrónica DGI Panamá, ventas, inventario, compras, caja, taller y
   reportes. Producto insignia.
2. **Softrix Planilla**: nómina para Panamá con motor de fórmulas propio,
   préstamos, acreedores y asistencia.
3. **Softrix Control de Entrada**: control de visitantes y accesos
   (técnicamente, SmartGate Control): puesto de control en tablet que funciona sin
   red, credenciales QR firmadas y reconocimiento facial opcional.

Además, un **programa de distribuidores** (licencias por bundle) para revendedores.

Fuera de la landing: Softrix Citas (AttendanceSoft), EVE Ledger y los sistemas PHP
anteriores (Innova Analítica, Plataforma).

## Positioning

- Hecho para Panamá: facturación electrónica DGI con ITBMS, planilla local,
  términos fiscales panameños.
- Especialización real en joyerías (precio por peso de oro), talleres (órdenes de
  servicio por pieza) y veterinarias.
- Una suite para empresas con varios locales: multi-empresa, multi-sucursal,
  permisos finos, en la nube o instalada localmente sin internet.
- Control de Entrada sigue funcionando cuando se cae la red.

## Capabilities and Constraints

- Sin precios publicados: toda llamada a la acción es «Solicitar cotización» o
  «Solicitar demo».
- Dominio, número de WhatsApp y correo de recepción: **pendientes**. Viven como
  marcadores en un único archivo de configuración (`src/config/site.ts`).
- La integración de Control de Entrada con barreras ZKTeco está en curso: solo
  puede anunciarse como «próximamente».

## Brand Commitments

- Marca: **RC Group · Softrix**. Logotipo en `public/brand/` (degradado de negro a
  rojo, con la «R» como marca corta).
- Las apps comparten tokens (azul de acción `#0066cc`, Inter, JetBrains Mono).
  El usuario pidió que la landing sea **más llamativa que la app**, con el mismo logo.
- Textos en español de Panamá, con tuteo y nunca voseo.

## Evidence on Hand

- Hay **testimonios** de clientes, pero todavía no se han entregado: quedan como
  marcadores claramente señalados.
- **No hay** nombres ni logos de clientes publicables, ni cifras de uso. No
  inventarlos.
- Hay capturas de pantalla reales que se pueden producir desde los repos de cada producto.

## Product Principles

1. Que el visitante encuentre su producto en un clic.
2. Demostrar con funciones concretas y pantallas reales, no con adjetivos.
3. Toda página termina en una forma directa de pedir cotización.
4. Nada inventado: ni clientes, ni cifras, ni precios.

## Accessibility & Inclusion

Contraste AA en tema claro y oscuro, navegación completa por teclado y uso
cómodo en celular (muchos dueños evalúan desde el teléfono).
