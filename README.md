# rcgpty.com: sitio de RC Group Panamá y RCG Softrix

Frontend en **Astro 7** con **Bun**, construido a partir del handoff de diseño que está en
`docs/handoff/`. Sin React y sin Tailwind: los componentes `.astro` solo emiten el markup
del design system.

```bash
bun install
bun run dev        # API (Elysia, :3001) + sitio (Astro, :4321) juntos
bun run build      # sitio estático en dist/
bun run preview    # sirve dist/ (con /api reenviado a la API)
bun run api        # solo la API
bun run check      # tipos (astro check)
bun run lint       # Biome
```

Compilar requiere Node ≥ 22.12, porque el CLI de Astro corre con Node.

## Estructura (la de `docs/handoff/HANDOFF.md`)

```
src/
  styles/tokens.css        copia literal de design-system/tokens.css (no editar)
  styles/components.css    copia literal de design-system/components.css (no editar)
  styles/global.css        reset, enlaces, secciones de página y el breakpoint del menú
  layouts/Base.astro       <head> con Google Fonts, TopBar + Navbar + MobileMenu + slot + Footer
  components/              Button, Badge, ProductCard, FeatureCard, Input, Navbar, Hero,
                           TopBar, MobileMenu, DemoForm, Footer, CtaFranja, Icon
  pages/index.astro                 ← screens/inicio.html + inicio-movil.html
  pages/softrix/facturacion.astro   ← screens/softrix-facturacion.html
  pages/softrix/rrhh.astro          ← screens/softrix-rrhh.html
  pages/softrix/smartgate.astro     ← screens/smartgate-control.html
  data/nav.ts, data/productos.ts, data/contacto.ts
api/index.ts               stub Elysia: POST /api/demo
public/logos/, public/screenshots/
```

Los componentes traducen `components.reference.js` uno a uno, con las props de
`components.d.ts`. Lo que en React era `ReactNode` (`children`, `icon`) llega por slots, y
`className` es `class`.

## Formulario de demo

`DemoForm` hace `POST /api/demo` con `nombre`, `contacto` e `interes`.
- **Con JavaScript:** envía JSON, valida en el campo y muestra el estado de éxito del diseño.
- **Sin JavaScript:** es un envío normal del formulario; la API responde con 303 y vuelve a `/#demo`.

`api/index.ts` es un **stub**: valida el cuerpo (422 si no cumple) y lo registra en
consola. Falta decidir a dónde va la solicitud (correo, CRM). En desarrollo y en preview,
Vite reenvía `/api` al puerto 3001. En producción, el servidor que sirva el sitio tiene que
hacer lo mismo.

## Pendientes del handoff (no inventar)

- Los módulos de Softrix RRHH llevan la nota «[CONFIRMAR CON PRODUCTO]».
- Páginas de servicios legales, sector gobierno, equipos, blog y contacto: migrar los textos
  del WordPress actual.
- «Iniciar sesión», «Ver equipos» y «Blog» todavía apuntan a `#`.
