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

## Animaciones (GSAP)

`src/scripts/animaciones.ts`, cargado en `Base.astro`, usa GSAP 3 con ScrollTrigger y
ScrollToPlugin. **Se aparta a propósito de la regla 3 de HANDOFF.md** («animación solo en la
primera pantalla, sin librerías»): se pidió explícitamente mejorar transiciones, navegación y
botones con GSAP. Se conserva el lenguaje del brand: entradas de 16 px con la curva de
`sx-enter`, sin rebotes largos.

- **Secciones**: `data-revelar` (un bloque) y `data-revelar-grupo` (sus hijos, en cascada)
  aparecen al entrar en pantalla, una sola vez. El `<head>` los oculta antes del primer
  pintado (`.anima`) y los muestra solo si el script no corre en 2,5 s.
- **Navegación**:
  - Barra fija con sombra solo al desplazarse.
  - Submenús que se deslizan.
  - Desplazamiento suave a anclas, descontando la barra.
  - Menú móvil que se despliega en cascada.
  - Fundido de salida al cambiar de página.
- **Botones**:
  - La flecha avanza al pasar el cursor.
  - El botón se hunde al pulsar.
  - El icono de WhatsApp se balancea.
  - La tarjeta de producto se eleva 2 px.
- **Formulario**: el estado de éxito entra animado.
- **Titular del hero**: entra palabra por palabra y la línea roja crece desde la izquierda.
- **Puntero** (solo con `pointer: fine`): la captura del hero se inclina hacia el cursor,
  los botones grandes se acercan unos píxeles cuando está cerca, y las tarjetas muestran
  un foco de luz que lo sigue (`--mx`/`--my`).
- **Movimiento reducido**: con `prefers-reduced-motion: reduce` no se anima nada. El hero
  sigue usando las clases CSS `sx-enter` del design system.

## Fondo interactivo (canvas)

`src/scripts/fondo.ts` pinta cada `<canvas data-fondo>` (`FondoInteractivo.astro`): una
retícula de puntos, como papel técnico, que se aparta, se tiñe de `brand` y se enlaza en
malla alrededor del puntero, con un halo suave debajo. Sin puntero (o en pantallas
táctiles) un punto virtual recorre el campo despacio. Con movimiento reducido la retícula
se pinta quieta.

- `modo="pagina"` (en `Base.astro`): fijo detrás de todo el documento. Para que se vea, el
  cuerpo y el hero claro son transparentes (`global.css`); las secciones `surface-100`, las
  tarjetas y el pie siguen opacos.
- `modo="local" tono="oscuro"` (en el hero de las páginas de producto): dentro del hero
  `brand-deep`, con puntos en `on-brand-muted`.
- Los colores se leen de los tokens en tiempo de ejecución; no hay hex en el script.
- Se detiene cuando la pestaña está oculta o el canvas sale de pantalla.

## Vitrina del hero (portada)

Las capturas reales de los tres productos rotan en el hero (5 s, dos vueltas y se detiene;
se pausa con el puntero o el foco encima). Las pestañas de abajo eligen el producto.

## Pendientes del handoff (no inventar)

- Los módulos de Softrix RRHH llevan la nota «[CONFIRMAR CON PRODUCTO]».
- Páginas de servicios legales, sector gobierno, equipos, blog y contacto: migrar los textos
  del WordPress actual.
- «Iniciar sesión», «Ver equipos» y «Blog» todavía apuntan a `#`.
