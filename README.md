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
  - La tarjeta de producto se eleva 2 px y el icono de la tarjeta hace zoom.
- **Formulario**: el estado de éxito entra animado.
- **Titular del hero**: entra palabra por palabra y la línea roja crece desde la izquierda.
- **Puntero** (solo con `pointer: fine`): los botones grandes se acercan unos píxeles
  cuando está cerca, las tarjetas muestran un foco de luz que lo sigue (`--mx`/`--my`) y
  la captura del hero de las páginas de producto se inclina hacia el cursor.
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

## Hero de la portada: el fondo 3D de `/rc-group`

La portada conserva su contenido (servicios legales, los tres productos, gobierno, equipos
y contacto) y toma de `/rc-group` el fondo interactivo con las tres esferas: `Hero.astro`
ofrece la ranura `fondo` y `index.astro` mete ahí `FondoHero` (abajo), con la columna
derecha vacía marcada como `data-fondo3d-ancla` para que las redes floten en ella. El hero
es opaco (`.hero-3d`) para que la retícula de la página no se mezcle con el campo de
partículas. La vitrina de capturas que rotaba ahí se retiró; las capturas siguen en las
páginas de producto.

## Landing corporativa `/rc-group` (cinco animaciones GSAP)

Página independiente del design system RCG Softrix, con paleta azul marino +
esmeralda/cian: `src/pages/rc-group.astro`, layout `src/layouts/Corporativa.astro` y
secciones en `src/components/corporativa/`. Cada sección trae su markup, su CSS y su
`<script>` con GSAP (`gsap.registerPlugin(ScrollTrigger)` donde hace falta):

| Sección | Animación |
|---|---|
| `HeroCascada` | Timeline con `ease: "power4.out"`: eyebrow, título, subtítulo, los dos botones y el panel |
| `EquipoPos` | El terminal FYJ-F1 gira en Y y se desliza de izquierda a derecha ligado al scroll (`scrub: true`) |
| `SelloDigital` | El sello «Certificado por la DGI» cae sobre el PDF simulado con `ease: "bounce.out"`; al impacto, onda, vibración y estado «Aprobado» |
| `ServiciosGrid` | Tarjetas Legal · Tributario · Contable · Licencias fiscales desde `y: 50` con `stagger: 0.15` |
| `Metricas` | Contadores de 0 al valor en 2 s con `snap: { textContent: 1 }` |

**Fondo 3D del hero** (`FondoHero.astro`, Three.js; lo usan la portada y `/rc-group`):
cubre toda la sección. Un campo de partículas con profundidad que ondula en 3D y, flotando
sobre él, tres redes de puntos enlazados, una por producto y cada una en su familia de
color: Softrix Facturación en rojos, Softrix RRHH en verdes y SmartGate Control en azules,
unidas entre sí (la suite). Las redes flotan dentro del elemento hermano marcado con
`data-fondo3d-ancla` (la columna vacía del hero), así siguen al layout de cada página: a la
derecha del texto en escritorio y debajo de él cuando la rejilla se apila; el velo blanco
que mantiene legible el texto cambia de horizontal a vertical con ellas. El puntero
interactúa con el fondo: aparta y enciende las partículas que toca, empuja las redes
cercanas y desplaza la cámara (paralaje); sin puntero, o en táctil, un punto virtual recorre
la zona de las redes. Las etiquetas de producto son enlaces a su página y siguen a su red
proyectándola a pantalla cada cuadro. La prop `paleta` es `productos` (cada red con su
color) o una sola familia para todo (`rojos` | `verdes` | `azules`); `/?paleta=azules`
previsualiza. Three.js se carga en un chunk aparte y solo cuando el navegador está libre
(`requestIdleCallback`). Sin WebGL quedan las etiquetas en posiciones fijas; con «reducir
movimiento» se pinta un solo cuadro quieto; se pausa fuera de pantalla y con la pestaña
oculta.

**Anti-FOUC**: los elementos que GSAP anima llevan la clase `g-oculto`; el `<head>` añade
`g-anima` al `<html>` (solo con JavaScript y sin «reducir movimiento») y `.g-anima .g-oculto`
los esconde. Cada script fija el estado inicial en línea, quita la clase y anima; al final
limpia los estilos. Sin JavaScript o con movimiento reducido todo se ve de inmediato.

⚠ Las cifras de `Metricas` y las características del FYJ-F1 son **de ejemplo**: el handoff
pide no publicar contadores sin números reales. La ilustración del equipo es un SVG propio;
una foto real entra por el slot `foto` de `EquipoPos`.

## Propuesta «Suite» `/propuesta`

Otra dirección visual para la portada, pedida a partir de una landing SaaS clara:
`src/pages/propuesta.astro`, layout `src/layouts/Propuesta.astro` y secciones en
`src/components/propuesta/`. Mismo contenido que `/` (productos, servicios legales,
gobierno, equipos, contacto y el formulario de demo contra `/api/demo`), con la letra
Plus Jakarta Sans, el rojo de la marca en degradado y los colores de los tres productos.

- **Hero en tarjeta** redondeada con retícula de puntos y halos cálidos abajo, barra de
  navegación flotante en píldora (menú móvil con hamburguesa animada, panel que baja con
  fundido y velo), titular grande con «Softrix» resaltado y chips-cursor con los productos;
  debajo, la ventana del panel real, el teléfono con SmartGate y tarjetas flotantes.
- **Transiciones**: todo lo marcado con `data-reveal` sube y aparece al entrar en pantalla
  (CSS, 0,7 s, escalonado con `data-reveal-delay`; el `<head>` lo esconde antes del primer
  pintado y lo muestra si el script no corre en 3 s); marquesina de capacidades; tarjetas
  flotantes con paralaje al desplazarse (`data-paralaje`, con tope); tarjetas que crecen
  al pasar el cursor y botones que se hunden; pestañas por segmento que atenúan con
  fundido los productos que no corresponden. Sin GSAP ni Three.js; con «reducir
  movimiento» nada se mueve.
- **Sin cifras inventadas**: la franja de logos de clientes se reemplazó por una marquesina
  de capacidades, no hay precios ni testimonios, y los valores de las tarjetas flotantes son
  ilustraciones de interfaz.

## Pendientes del handoff (no inventar)

- Los módulos de Softrix RRHH llevan la nota «[CONFIRMAR CON PRODUCTO]».
- Páginas de servicios legales, sector gobierno, equipos, blog y contacto: migrar los textos
  del WordPress actual.
- «Iniciar sesión», «Ver equipos» y «Blog» todavía apuntan a `#`.
