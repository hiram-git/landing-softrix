# rcgpty.com — entrega para implementación en Astro

Sitio de RC Group Panamá con su línea de software **RCG Softrix** (Facturación, RRHH, Control de accesos), más servicios legales, asesoría fiscal, equipos y sector gobierno. Reemplaza el WordPress actual (tema Corpiva + Elementor) por un frontend Astro con el mismo mapa de navegación.

## Qué hay en este paquete

| Carpeta | Contenido | Cómo usarlo |
|---|---|---|
| `design-system/tokens.json` | Fuente de verdad de colores (temas `light`/`dark`), tipografía, espaciado, radios, sombras y tamaños | Generar `tokens.css` a partir de él, o copiar el `tokens.css` incluido tal cual a `src/styles/tokens.css` |
| `design-system/tokens.css` | Los tokens compilados como variables CSS (`--brand`, `--space-4`, `--font-display`…) | Importar global; el tema oscuro se activa con `[data-theme="dark"]` |
| `design-system/components.css` | Estilos de todos los componentes (`.sx-btn`, `.sx-card`, `.sx-nav`, `.sx-hero`, `.sx-feature`, `.sx-field`) y las clases de animación `sx-enter` | Importar global después de `tokens.css`. **No reescribir**: los componentes `.astro` solo emiten este markup |
| `design-system/components.reference.js` | Implementación React de referencia de cada componente (markup exacto, clases, atributos ARIA) | Traducir uno a uno a `.astro`; no se usa React en el sitio |
| `design-system/components.d.ts` | Props de cada componente | Son las `Props` de cada `.astro` |
| `design-system/components/*.md` | Guía de uso de cada componente (cuándo, qué aporta el consumidor, qué no hacer) | Leer antes de usar uno |
| `design-system/BRAND.md` | Brand book: tono, color, tipografía, navegación, movimiento, logotipo | Reglas de contenido y de estilo para toda página nueva |
| `screens/*.html` | Las cinco pantallas diseñadas, en HTML con las clases del sistema. Los `<x-import component-from-global-scope="Softrix.X" …>` son el componente `X` con esas props; `{{ … }}` referencia datos del bloque `renderVals()` al pie de cada archivo | Son la especificación de layout y copy. Convertir cada una en página Astro |
| `assets/logos/` | Logotipo horizontal (claro e inverso) e isotipo, PNG con transparencia | `public/logos/` |
| `assets/screenshots/` | Capturas reales de los tres productos | `public/screenshots/` (optimizar con `astro:assets` si se quiere) |

## Mapa del sitio y rutas

| Ruta | Pantalla de referencia | Notas |
|---|---|---|
| `/` | `screens/inicio.html` (escritorio) y `screens/inicio-movil.html` (390 px) | Una sola página responsive; el archivo móvil muestra cómo colapsa el menú y el orden de secciones |
| `/softrix/facturacion` | `screens/softrix-facturacion.html` | Producto insignia |
| `/softrix/rrhh` | `screens/softrix-rrhh.html` | Antes «Planilla»; el nombre comercial es **Softrix RRHH** |
| `/softrix/smartgate` | `screens/smartgate-control.html` | **SmartGate Control** |
| `/servicios-legales/*`, `/sector-gobierno`, `/equipos`, `/blog`, `/contacto` | Sin pantalla propia aún | Conservan el contenido del WordPress actual; usar `Hero` + `FeatureCard` con la misma plantilla de producto |

Navegación (idéntica al sitio actual, con RCG Softrix en lugar de «Facturación Electrónica»):

- **Servicios Legales** ▾ Firma electrónica y digital · Asesoría tributaria · Registro de marca y propiedad intelectual · Constitución y gestión de sociedades · Contratos de compraventa y escrituras
- **RCG Softrix** ▾ Softrix Facturación · Softrix RRHH · SmartGate Control (cada entrada con su `hint`)
- Sector Gobierno · Equipos · Blog · Contáctenos
- Derecha: «Iniciar sesión» (secundario) · «Solicitar demo» (primario)

## Estructura Astro propuesta

```
src/
  styles/tokens.css            ← design-system/tokens.css
  styles/components.css        ← design-system/components.css
  styles/global.css            ← reset mínimo + body{font-family:var(--font-sans)} + enlaces
  layouts/Base.astro           ← <head> con Google Fonts, data-theme, TopBar + Navbar + slot + Footer
  components/
    TopBar.astro               ← franja superior con dirección, teléfonos, correo, horario, Instagram
    Navbar.astro               ← props de NavbarProps; submenús con :hover/:focus-within (ya en CSS)
    MobileMenu.astro           ← panel colapsable (ver inicio-movil.html); <button aria-expanded> + <details> o 10 líneas de JS
    Hero.astro                 ← HeroProps; clases sx-enter en eyebrow/título/línea/bajada/botones/captura
    Button.astro               ← variant: primary | secondary | secondary-inverse | ghost | whatsapp
    Badge.astro
    ProductCard.astro
    FeatureCard.astro
    Input.astro
    DemoForm.astro             ← 3 campos (nombre, WhatsApp o correo, interés) + estado de éxito
    Footer.astro
  pages/
    index.astro
    softrix/facturacion.astro
    softrix/rrhh.astro
    softrix/smartgate.astro
  data/
    nav.ts                     ← el array navLinks de screens/inicio.html
    productos.ts               ← pitch, features, hrefs de las 3 ProductCard
public/logos/, public/screenshots/
```

## Reglas que no se negocian

1. **Todo color, tamaño y radio sale de `tokens.css`.** Nada de hex en los componentes. Si falta un token, se añade a `tokens.json` primero.
2. **Una sola conversión por pantalla**: «Solicitar demo» en `primary` 48 px; WhatsApp acompaña en `ghost` (o `secondary-inverse` sobre fondos oscuros). Nunca dos botones de 48 px con el mismo peso.
3. **Animación solo en la primera pantalla**: clases `sx-enter`, `sx-enter--2…5`, `sx-enter--rule` sobre el hero; nada al hacer scroll; respeta `prefers-reduced-motion` (ya en el CSS). Sin librerías de animación.
4. **Fuentes**: Exo 2 (600, 700) e IBM Plex Sans (400, 600) e IBM Plex Mono desde Google Fonts con `display=swap`; un solo `<link>` en el layout.
5. **Texto secundario sobre fondos de marca** usa `--on-brand-muted`, nunca `opacity`.
6. **Accesibilidad**: `<a href>` y `<button>` reales, `aria-current="page"` en el enlace activo, `aria-expanded` en el menú móvil, etiquetas visibles en todo campo, foco visible con `--focus` (ya en CSS), objetivos táctiles ≥ 44 px, `alt` descriptivo en capturas y logos.
7. **Responsive sin breakpoints a medida**: las secciones son `flex-wrap` con `flex: 1 1 480px` / `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`, como en los HTML. Solo el menú necesita un breakpoint (≈ 960 px) para pasar a `MobileMenu`.
8. **Copy**: español neutro, «tú», sin emojis ni signos de exclamación; siglas DGI, CAFE, CUFE, ITBMS, PAC tal cual (glosario en `caption` la primera vez por página). Marca: **RCG Softrix** para la línea; `Softrix Facturación`, `Softrix RRHH`, `SmartGate Control` para los productos; «RC Group» para la empresa.

## Datos reales

- Dirección: PH Obarrio 60, Panamá, Panamá
- Oficina: +(507) 399-2627 · WhatsApp: +507 6196-6047 → `https://wa.me/50761966047?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20RCG%20Softrix`
- Correo: zrivera@rcgpty.com · Horario: lunes a viernes, 8:00 a. m. – 5:00 p. m. · Instagram: @rcgroup_pty
- Formulario de demo: POST a la API Elysia (endpoint a definir) con `nombre`, `contacto`, `interes` (Softrix Facturación | Softrix RRHH | SmartGate Control | Servicios legales o asesoría fiscal | Equipos | Ser distribuidor); respuesta → estado de éxito del diseño, con botón de WhatsApp.

## Pendientes conocidos (no inventar)

- Los módulos listados en Softrix RRHH llevan la nota «[CONFIRMAR CON PRODUCTO]» en la pantalla: validar el alcance antes de publicar.
- Páginas de servicios legales, sector gobierno, equipos y blog: migrar textos del WordPress actual.
- Los contadores «+ clientes asesorados / tramitados» del sitio actual no tienen cifra: no incluirlos hasta tener números reales.
- Las tres aplicaciones usan azul como primario; el sitio usa el rojo RCG. Es una decisión de marca pendiente, no un error del sitio.
