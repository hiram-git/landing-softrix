# Plan — Landing page de Softrix (RC Group)

> **Nota (13 oct 2026):** el handoff de diseño `docs/handoff/` (sitio rcgpty.com, sistema
> RCG Softrix) reemplaza la dirección «Ruta Softrix» y las rutas de este documento. Los
> productos son Softrix Facturación, Softrix RRHH y SmartGate Control. La fuente de verdad
> es ahora `docs/handoff/HANDOFF.md` y `docs/handoff/design-system/BRAND.md`.


> Documento de planificación. Define qué productos se presentan, cómo se organiza el
> sitio, qué dice cada sección, con qué se construye y en qué orden. Todavía no hay
> código: este documento es el punto de partida del repositorio.

---

## Decisiones tomadas (12 oct 2026)

Estas decisiones prevalecen sobre lo que diga el resto del documento:

- **Productos y nombres comerciales**: Softrix Facturación, Softrix Planilla y
  **Softrix Control de Entrada** (el producto técnico SmartGate Control).
- **Softrix Citas (AttendanceSoft) no va** en la landing. Tampoco Innova Analítica ni
  Plataforma.
- **Todo se vende «a cotizar»**: no se publican precios, ni siquiera los bundles de
  distribuidores.
- **Dominio, WhatsApp y correo**: marcadores en `src/config/site.ts` hasta que se
  confirmen.
- **Respaldo**: hay testimonios pendientes de entregar; no hay clientes ni cifras
  publicables.
- **Identidad**: más llamativa que la app, con el mismo logo. Dirección elegida:
  **«Ruta Softrix»**: lenguaje de los diablos rojos (pintura negra con rojo
  aerografiado, cromo, filetes, letreros de ruta con letra de rótulo), con el
  contenido sobre papel blanco. Esto reemplaza la §6.
- **Rutas**: `/facturacion`, `/planilla`, `/control-de-entrada`, `/distribuidores`,
  `/contacto` (`/demo` se fusiona con `/contacto?producto=`).
- **Fase 1: hecha** (base Astro + Bun, tokens, cabecera con menú de productos, pie,
  tema claro/oscuro, portada y páginas de producto en esqueleto).

---

## 1. Objetivo

Un sitio que, en menos de 10 segundos, le diga a una pyme o institución de Panamá
**qué resuelve Softrix y cuál de sus productos necesita**, y que convierta esa visita
en una **solicitud de demo o contacto** (formulario o WhatsApp).

Objetivos secundarios:

- Dar a cada producto una página propia, indexable y enlazable desde campañas.
- Captar **distribuidores** (el sistema de licencias ya está pensado para ellos).
- Proyectar a Softrix como **una suite**, no como productos sueltos: misma marca,
  misma calidad, mismos principios (multi-empresa, multi-sucursal, hecho para Panamá).

### Públicos

| Público | Qué busca | A dónde lo llevamos |
|---|---|---|
| Dueño o administrador de pyme | Facturar conforme a la DGI, controlar inventario y caja, pagar planilla | Facturación, Planilla |
| Joyerías, talleres, veterinarias | Un sistema que entienda su negocio | Facturación (secciones por vertical) |
| Edificios, empresas, entes públicos | Controlar quién entra y sale | SmartGate Control |
| Negocios de servicios (clínicas, salones, consultorios) | Agenda de citas sin choques | Citas (AttendanceSoft) |
| Revendedores / integradores | Vender software con margen y gestionar licencias | Programa de distribuidores |

---

## 2. Inventario de productos

Levantado a partir de los repositorios de la cuenta `hiram-git`. Los marcados
**⚠ por confirmar** necesitan validación antes de publicarse (ver §12).

### 2.1 Softrix Facturación — ERP comercial · *producto insignia*
Repo: `inventsoft_bun`

**Pitch:** El ERP para pymes multi-sucursal de Panamá: vende, factura ante la DGI,
controla inventario y caja en un solo sistema.

- **Facturación electrónica DGI Panamá**: CAFE vía PAC, CUFE, QR, desglose ITBMS,
  ticket 80 mm y A4/Carta.
- **Ventas**: cotizaciones, pedidos con reserva de stock, facturas, notas de crédito y
  débito, vendedores y comisiones, cuentas por cobrar y anticipos.
- **Inventario**: stock en tiempo real por almacén, variantes, kits, transferencias,
  alertas de mínimo, historial de movimientos.
- **Compras**: proveedores, órdenes de compra, recepciones, cuentas por pagar.
- **Caja**: apertura, cobros, movimientos, cierre, supervisor de caja.
- **Servicios / taller**: órdenes de servicio con técnicos, avance por pieza, entregas
  parciales.
- **Reportes gerenciales** exportables a PDF y Excel.
- **Multi-empresa y multi-sucursal** con permisos por módulo, sucursal y usuario.
- **Funciona en la nube o instalado localmente** (app de escritorio) sin internet.

**Diferenciales (confirmados en `PRODUCT.md`):**
1. *Hecho para joyerías y talleres*: precio por peso de oro, órdenes de servicio con
   varias piezas y prioridad, certificados de regalo al portador.
2. *Modo veterinaria*: mascotas por cliente, atendidas en la orden de servicio.
3. *Todo en uno* para negocios con varios locales.

### 2.2 Softrix Planilla — nómina para Panamá
Repo: `payrollsoft` (nombre comercial ⚠ por confirmar: «PayrollSoft» o «Softrix Planilla»)

**Pitch:** Planilla multi-empresa para Panamá, con fórmulas que tú controlas.

- **Motor de fórmulas propio** para cada ingreso y deducción, con acumulados
  históricos (`ACUMULADOS("SUELDO", 6)`).
- **Ciclo de planilla controlado**: generar, regenerar, revertir, cerrar, reabrir.
- **Préstamos y acreedores**: cuotas semanales, quincenales o mensuales; la deducción
  se crea sola al registrar el acreedor.
- **Asistencia integrada**: 4 marcaciones diarias, horarios con tolerancias; tardanzas
  y horas extra alimentan la planilla.
- **Estructura organizativa**: posiciones, cargos, funciones, departamentos.
- **Roles** (consulta, RR. HH., administrador) y datos aislados por empresa.
- Disponible también como **app de escritorio** (Windows).

### 2.3 SmartGate Control — control de visitantes y accesos
Repo: `SmartGateControl`

**Pitch:** Sepa quién entra, a qué hora y a ver a quién — incluso si se cae la red.

- **Puesto de Control en tablet** que decide **sin conexión** (modo oscuro 24/7).
- **Portal del visitante** y **app del anfitrión / residente**: pre-registro e
  invitaciones.
- **Credenciales QR firmadas** (no falsificables).
- **Reconocimiento facial** opcional, con privacidad por diseño (no se guardan fotos).
- **Salas de reunión** con reserva sin solapes.
- **Multi-sucursal**, flujos de aprobación configurables y **formularios a medida**.
- Migración asistida desde el sistema anterior.
- Integración con barreras/torniquetes ZKTeco — ⚠ en curso, mostrar como «próximamente».

### 2.4 Softrix Citas — agenda de citas · ⚠ por confirmar
Repo: `AttendanceSoft` (el nombre del repo sugiere asistencia, pero el producto es
**agendamiento de citas**; conviene un nombre comercial claro).

**Pitch:** Agenda tus servicios sin dobles reservas.

- Personal, servicios, clientes y disponibilidad semanal por persona.
- **Detección de choques** de personal y sala al agendar.
- Vista de calendario por día y rango, backoffice y **app móvil**.

### 2.5 Programa de distribuidores (Softrix Licencias)
Repo: `licenciamiento`

No se vende al cliente final: es la **puerta para revendedores**.

- Panel del distribuidor con su **pool de licencias**, vencimientos y renovaciones.
- **Compra de bundles** (10 / 25 / 50 licencias) con pago vía PayPal.
- Alertas de vencimiento y renovación automática.

En la landing va como una sección «¿Quieres vender Softrix?» y una página
`/distribuidores` con formulario propio. Los precios de bundles no se publican
hasta confirmarlo (§12).

### 2.6 Complementos / legado · ⚠ por confirmar si se publican
- **Toma de Inventario** (`toma_inventario`): conteo físico con PIN y diferencias.
  Candidato a mostrarse como *módulo complementario* de Facturación.
- **Innova Analítica** (`innova_analitica`) y **Plataforma** (`plataforma`, activador
  de licencias NM Service / pagos Yappy): sistemas PHP anteriores. Propuesta: **no**
  publicarlos como productos; a lo sumo, mencionar «migramos desde tu sistema actual».

### Fuera de alcance
- **EVE Ledger** (`eve-ledger`): app personal para EVE Online, no es de Softrix.

---

## 3. Mapa del sitio

```
/                       Home (suite completa)
/facturacion            Softrix Facturación
   /facturacion/joyerias     (landing de vertical — fase 2)
   /facturacion/talleres     (fase 2)
   /facturacion/veterinarias (fase 2)
/planilla               Softrix Planilla
/smartgate              SmartGate Control
/citas                  Softrix Citas          (si se confirma)
/distribuidores         Programa de distribuidores
/contacto               Formulario + WhatsApp + datos
/demo                   Solicitud de demo (preselecciona producto vía ?producto=)
/legal/privacidad       Política de privacidad
/legal/terminos         Términos
```

Navegación superior: **Productos ▾** (megamenú con los 4 productos) · Distribuidores ·
Contacto · botón **Solicitar demo**. Selector de tema claro/oscuro.

---

## 4. Home — sección por sección

| # | Sección | Contenido | Objetivo |
|---|---|---|---|
| 1 | **Hero** | Titular + subtítulo + CTA «Solicitar demo» y «Ver productos». Captura real de Facturación en un marco de dispositivo. | Decir qué es Softrix en una línea |
| 2 | **Franja de confianza** | Logos de clientes o cifras (empresas, sucursales, comprobantes emitidos). | Credibilidad |
| 3 | **Suite de productos** | 4 tarjetas (Facturación, Planilla, SmartGate, Citas): ícono, nombre, pitch de una línea, 3 viñetas, enlace «Conocer más». Facturación ocupa la tarjeta grande. | Que cada visitante encuentre su producto |
| 4 | **¿Qué necesitas?** | Selector por necesidad: «Facturar y controlar inventario», «Pagar planilla», «Controlar visitantes», «Agendar citas» → lleva al producto. | Atajo para quien no conoce los nombres |
| 5 | **Hecho para Panamá** | DGI / facturación electrónica, ITBMS, planilla local, soporte en español y en horario local. | Diferencial frente a software extranjero |
| 6 | **Hecho para tu industria** | Pestañas: Joyerías · Talleres · Veterinarias · Edificios y entes. Cada una con 3 capacidades concretas y una captura. | Mostrar especialización real |
| 7 | **Una sola forma de trabajar** | Lo común a toda la suite: multi-empresa y multi-sucursal, permisos finos, nube o instalación local, tema claro/oscuro, datos aislados por empresa. | Vender la suite, no piezas |
| 8 | **Testimonios** | 2–3 citas con nombre, cargo, empresa y producto. | Prueba social |
| 9 | **Distribuidores** | Banda con «¿Vendes software? Únete como distribuidor» → `/distribuidores`. | Captar canal |
| 10 | **Preguntas frecuentes** | Precio, instalación local vs. nube, migración de datos, soporte, capacitación, facturación electrónica. | Quitar objeciones |
| 11 | **CTA final** | «Agenda una demo de 30 minutos» + formulario corto + botón WhatsApp. | Conversión |
| 12 | **Pie** | Productos, empresa (RC Group), contacto, redes, legales. | Navegación |

### Borrador de copy del hero

> **Software de gestión hecho para las empresas de Panamá.**
> Factura ante la DGI, controla tu inventario, paga tu planilla y gestiona tus
> visitantes con Softrix — una sola suite para todas tus sucursales.
>
> [Solicitar demo] [Ver productos]

Alternativas para probar: «Todo tu negocio, en una sola suite.» / «Factura, vende y
crece — conforme a la DGI desde el primer día.»

---

## 5. Plantilla de página de producto

Todas las páginas de producto comparten estructura (un solo componente con datos):

1. **Hero del producto**: nombre, pitch, CTA demo (con `?producto=` preseleccionado),
   captura principal.
2. **Problema → solución**: 3 dolores del cliente y cómo los resuelve.
3. **Módulos / funcionalidades**: grilla de 6–9 bloques con ícono y descripción breve.
4. **Recorrido visual**: 3–4 capturas alternadas con texto (claro y oscuro).
5. **Diferenciales**: lo que este producto hace y otros no (§2).
6. **Para quién es**: industrias y tamaños de empresa.
7. **Integraciones / se combina con**: enlaces cruzados a los otros productos
   (p. ej. Planilla ↔ asistencia; Facturación ↔ Toma de Inventario).
8. **Planes y precios** (o «Cotiza según sucursales/usuarios» si no se publican).
9. **FAQ del producto**.
10. **CTA final**.

El contenido de cada producto vive en `src/content/productos/*.md` (colecciones de
Astro), así añadir un producto no requiere tocar componentes.

---

## 6. Identidad visual

Se reutiliza el sistema de diseño ya definido para la marca:

- **Tokens**: `design-tokens.css` compartido «RC Group / Softrix (InventSoft ↔
  Licencias)» — copiarlo desde `licenciamiento/project/design-tokens.css` como fuente
  única. Azul de acción `#0066cc`, tinta `#1d1d1f`, fondo pergamino `#f5f5f7`,
  semánticos verde/ámbar/rojo. Nunca colores fijos en componentes.
- **Tipografía**: Inter (display y texto) + JetBrains Mono para cifras y códigos.
- **Estética**: sobria, inspirada en Apple; mucho aire, capturas reales grandes,
  sin ilustraciones genéricas de stock.
- **Tema claro y oscuro** con `data-theme` en `<html>` y script síncrono en `<head>`
  para evitar el destello (mismo patrón que Planilla).
- **Logotipo**: `logo-rcg-softrix.png` y la «R» (`brand-r.png`) y favicons ya
  derivados en `licenciamiento/apps/web/public/`.
- **Color por producto** (solo acento de ícono/etiqueta, sobre la base común):
  Facturación azul, Planilla verde, SmartGate ámbar/índigo, Citas violeta — a validar.

---

## 7. Stack técnico

Alineado con el resto de los proyectos de la empresa:

| Capa | Elección | Por qué |
|---|---|---|
| Runtime / paquetes | **Bun** | Igual que todos los productos |
| Framework | **Astro** (salida estática) | Rápido, SEO nativo, cero JS por defecto; el equipo ya lo usa |
| Interactividad | Islas mínimas (megamenú, pestañas, selector de tema, formulario) | Sin framework pesado |
| Estilos | CSS con los tokens compartidos (+ Tailwind v4 opcional) | Consistencia con la suite |
| Contenido | Colecciones de contenido de Astro (Markdown) | Editar productos sin tocar código |
| Imágenes | `astro:assets` (AVIF/WebP, tamaños responsivos) | Rendimiento |
| Formularios | Endpoint propio (Elysia en Railway) o servicio tipo Formspree; aviso a correo/WhatsApp | Captar leads |
| Hosting | Railway (ya usado) o hosting estático (Cloudflare Pages / Netlify) | Simple y barato |
| Calidad | Biome (formato + lint), Playwright para humo, Lighthouse CI | Igual que los demás repos |

### Estructura propuesta del repositorio

```
src/
  components/      Header, MegaMenu, Hero, ProductCard, FeatureGrid,
                   IndustryTabs, Testimonial, FAQ, CTA, Footer, ThemeToggle
  content/
    productos/     facturacion.md, planilla.md, smartgate.md, citas.md
    industrias/    joyerias.md, talleres.md, veterinarias.md, edificios.md
  layouts/         BaseLayout.astro, ProductLayout.astro
  pages/           index.astro, [producto].astro, distribuidores.astro,
                   contacto.astro, demo.astro, legal/*
  styles/          design-tokens.css, global.css
public/            logos, favicons, capturas, og-images
```

---

## 8. SEO, rendimiento y accesibilidad

- **SEO**: un `<title>` y meta descripción por página; Open Graph con imagen por
  producto; `sitemap.xml` y `robots.txt`; datos estructurados `Organization` y
  `SoftwareApplication` por producto; palabras clave locales («facturación
  electrónica Panamá», «sistema de planilla Panamá», «control de visitantes»).
- **Rendimiento**: objetivo Lighthouse ≥ 95 en móvil; LCP < 2 s; fuentes
  autoalojadas con `font-display: swap`.
- **Accesibilidad**: contraste AA en ambos temas, navegación por teclado del
  megamenú y pestañas, textos alternativos en capturas.
- **Analítica**: Plausible o GA4 con eventos de conversión (clic en demo, envío de
  formulario, clic en WhatsApp) y UTM por producto.
- **Idioma**: español (es-PA) en la fase 1; inglés en una fase posterior si hace falta.

---

## 9. Captación de leads

Formulario corto: nombre, empresa, correo, teléfono/WhatsApp, **producto de
interés** (multiselección), número de sucursales, mensaje. Con validación, honeypot
anti-spam y mensaje de confirmación. El lead llega por correo (y opcionalmente a un
CRM). Botón flotante de **WhatsApp** en todas las páginas.

`/distribuidores` usa un formulario propio: empresa, país, cartera de clientes,
productos que le interesan.

---

## 10. Fases

| Fase | Entregables | Estimado |
|---|---|---|
| **0 · Contenido** | Confirmar productos y nombres (§12), textos por producto, capturas reales en claro/oscuro, logos de clientes, testimonios | 1 semana (depende del negocio) |
| **1 · Base** | Proyecto Astro + Bun, tokens, layout, header/megamenú, footer, tema claro/oscuro, despliegue de vista previa | 2–3 días |
| **2 · Home** | Las 12 secciones de §4 | 3–4 días |
| **3 · Productos** | Plantilla de §5 + páginas de Facturación, Planilla, SmartGate (y Citas si se confirma) | 3–4 días |
| **4 · Conversión** | `/demo`, `/contacto`, `/distribuidores`, envío de formularios, WhatsApp, analítica | 2 días |
| **5 · Pulido** | SEO, OG images, accesibilidad, Lighthouse, pruebas Playwright, legales | 2 días |
| **6 · Verticales** | Landings de joyerías, talleres, veterinarias, edificios | Posterior |

---

## 11. Criterios de éxito

- Cada producto es alcanzable en **1 clic** desde la home.
- Lighthouse móvil ≥ 95 en rendimiento, accesibilidad y SEO.
- Tasa de conversión a demo/contacto medible desde el primer día.
- Añadir un producto nuevo = añadir un archivo Markdown y sus capturas.

---

## 12. Preguntas abiertas (para decidir antes de la fase 1)

1. **Nombres comerciales**: ¿«Softrix Facturación», «Softrix Planilla» (o
   PayrollSoft), «SmartGate Control», «Softrix Citas» (o AttendanceSoft)?
2. **¿Citas (AttendanceSoft) ya se vende** o es todavía un desarrollo interno?
3. **Toma de Inventario**: ¿se presenta como módulo de Facturación o no se menciona?
4. **Innova Analítica / Plataforma**: ¿se descartan de la landing como propongo?
5. **Precios**: ¿se publican planes o todo va a «cotizar»? ¿Se muestran los precios
   de bundles a distribuidores?
6. **Dominio** y correo de recepción de leads; número de WhatsApp.
7. **Clientes y testimonios** que se puedan mostrar con permiso.
8. ¿Relación de marca **RC Group ↔ Softrix** en el sitio (Softrix como marca
   principal y «un producto de RC Group» en el pie)?
9. ¿Integración ZKTeco de SmartGate se anuncia como «próximamente»?
