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
Vite reenvía `/api` al puerto 3001.

## Producción (un solo proceso)

El sitio es **estático**: `bun run build` deja los HTML en `dist/` (no hay
`dist/server/entry.mjs`, eso es de un sitio SSR). En producción el mismo proceso de la
API sirve `dist/` y atiende `/api`:

```bash
bun install --frozen-lockfile && bun run build
PORT=4330 bun run start        # o: bun api/index.ts
```

- `PORT` (o `API_PORT`): puerto de escucha. `SITE_DIR`: otra carpeta del sitio (por
  defecto `dist/` junto al repo). Sin build, responde solo `/api` y 404 en el resto.
- **Solicitudes de demo**: cada solicitud válida se añade como una línea JSON a
  `SOLICITUDES_FILE` (por defecto `data/solicitudes-demo.jsonl`, fuera de git) y queda también
  en el log (`journalctl -u landing`). Si la unidad de systemd usa `ProtectSystem=strict`, hay
  que permitir esa carpeta con `ReadWritePaths=/opt/landing/data`.
- **Aviso por correo** (`api/correo.ts`): con `SMTP_HOST` configurado, cada solicitud llega
  por correo a `DEMO_CORREO_PARA` (por defecto `rcgsoftrix@rcgpty.com`), con
  «Responder a» el correo del visitante y un enlace a su WhatsApp. Si dejó correo, el visitante
  recibe además una confirmación cuyas respuestas llegan al equipo; una sola por dirección cada
  24 h, para que el formulario no sirva para mandarle correos a un tercero. Salen después de responder
  y, si el SMTP falla, la solicitud igual queda guardada y el error en el log. Las variables
  están en `.env.example`: se copian a `/opt/landing/.env` (Bun lo lee al arrancar desde
  `WorkingDirectory`; `chmod 600`). Al arrancar, el log dice «aviso por correo activo» o por
  qué no. El ejemplo viene listo para el SMTP de Resend (`smtp.resend.com:465`, usuario
  `resend`, API key como contraseña); el remitente, `DEMO_CORREO_DE`, tiene que ser de un
  dominio verificado en Resend. Para probarlo sin el formulario:
  `sudo -u softrix bun run correo:probar [correo]` (en `/opt/landing`) muestra la configuración que ve,
  envía el aviso y la confirmación de prueba (al correo indicado) y, si falla, el error del
  servidor en una línea.
- **Iniciar sesión** (`/iniciar-sesion`): una tarjeta por cada producto con `acceso` en
  `src/data/productos.ts` (hoy Facturación y RRHH), que lleva a su sistema en la misma pestaña.
- **Correo y WhatsApp** van en campos separados y basta con uno (`erroresContacto` en
  `src/data/demo.ts`, la misma regla en el formulario y en la API). Una pestaña de antes que
  todavía manda el campo único `contacto` se acepta y se reparte por el «@».
- **Defensas del formulario**: correo con formato y WhatsApp de al menos 7 dígitos, límites
  de longitud, campo trampa contra bots, hasta 5 solicitudes por IP cada 10 minutos (429) y,
  sin JavaScript, vuelta a `/?demo=error#demo` ante un dato inválido. Las reglas viven en
  `src/data/demo.ts` y las comparten el formulario y la API.
- Las rutas se resuelven como las deja Astro (`build.format: "file"`): `/softrix/rrhh` →
  `dist/softrix/rrhh.html`; lo de `/_astro/` sale con caché larga y el HTML sin caché.

Unidad de systemd de ejemplo (`/etc/systemd/system/landing.service`), con el reverse
proxy (nginx, Caddy) apuntando al puerto:

```ini
[Service]
User=softrix
WorkingDirectory=/opt/landing
Environment=PORT=4330
ExecStart=/home/softrix/.bun/bin/bun /opt/landing/api/index.ts
Restart=always
```

Para actualizar: `git pull`, `bun install --frozen-lockfile`, `bun run build`,
`sudo systemctl restart landing`.

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

## Tema oscuro

El sitio va en el tema oscuro del design system: `tokens.css` ya trae
`[data-theme="dark"]` y `Base.astro` lo elige con la prop `tema` (`"dark"` por defecto;
`"light"` vuelve al claro). `tokens.css` no se toca. Con el tema oscuro:

- La barra usa el logo claro (`rcg-softrix-horizontal-inverse.png`).
- El pie y la franja superior usan `--fondo-barra` (casi negro, en `global.css`), porque en
  oscuro `--surface-inverse` es blanco.
- El fondo 3D del hero pasa su velo a negro cálido, las etiquetas a vidrio oscuro y las
  partículas a mezcla aditiva con los tonos claros de cada familia.

**Secciones alternas.** Debajo del hero (oscuro), las secciones se alternan clara y oscura
en la portada y en las páginas de producto. Cada `<section>` lleva su `data-theme`
(`tokens.css` resuelve los colores en ese elemento): la clara pinta su fondo blanco y sus
controles nativos en claro, y la oscura queda transparente para que se vea el fondo de
puntos. `SelloDgi`, `EquipoFiscal` y `CtaFranja` reciben la prop `tema`. La franja
superior, la barra y el pie siguen siempre en oscuro.

**Orden de la portada.** Hero → productos → sello DGI → equipos → servicios legales →
sector gobierno → distribuidores → demo. Facturación, su prueba ante la DGI y su terminal
van seguidos; lo legal y fiscal los respalda después, y las audiencias aparte (entes
públicos, revendedores) quedan al final, antes del formulario.

**Productos con pantalla.** Facturación, el producto insignia, ocupa una fila entera con su
pantalla a la derecha; RRHH y SmartGate le siguen en pareja con la suya arriba. No son
capturas enteras reducidas (a ese tamaño no se leen) sino un detalle de cada una
(`*-portada-640/1280.webp`, generado por `scripts/optimizar-imagenes.py` en `RECORTES`).

## Elementos de `/rc-group` en la portada

- **Sello DGI** (`SelloDgi.astro`): la sección de facturación electrónica pone a la derecha
  una factura simulada que recibe el sello «Certificado por la DGI» con `bounce.out`, onda,
  vibración y estado «Aprobado por la DGI». El sello es rojo RCG; la factura es papel claro.
- **Terminal en 3D** (`EquipoFiscal.astro`): la sección Equipos gira el terminal FYJ-F1 en Y
  y lo desliza ligado al scroll (`scrub`). Sus características son **de ejemplo**.
- **Servicios legales**: las tarjetas suben desde 50 px una a una (`stagger: 0.15`) con
  `data-revelar-grupo="amplio"`.
- Los contadores de `/rc-group` no se trajeron: no hay cifras reales que publicar.

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

## Propuesta B «Video» `/propuesta-video`

Un solo archivo HTML autocontenido, sin build: `public/propuesta-video.html`, con el logo
al lado (`public/rcg-softrix-horizontal-inverse.png`). Astro lo copia tal cual a `dist/`,
y tanto nginx (`try_files $uri.html`) como `api/index.ts` lo sirven en `/propuesta-video`.
Una sola pantalla, sin scroll, con video de fondo en bucle y mudo (y su póster) desde
CloudFront, y la fuente Sora variable de Google Fonts.

- **Escritorio (≥ 1200 px)**: composición de 1536×1024 que solo escala con `--u`. Barra
  en `flex` con `padding: 0 221u`, menú con `gap: 34u` e «Iniciar sesión» empujado a la
  derecha; el hero centra en columna, sin coordenadas por letra.
- **Flujo (< 1200 px)**: teléfono, apaisado bajo y tableta, cada uno con su lienzo.
  El menú se recoge tras la hamburguesa solo con checkbox y CSS.
- **Legibilidad**: el velo baja el núcleo brillante del video y se re-apunta a la altura
  del titular en cada layout (`--vx`, `--vy`, `--cw`, `--ch`).
- **Entrada** de unos 2,1 s, solo con `translate`, `scale`, `opacity` y `clip-path`, con
  `fill-mode: backwards`; al terminar, `is-entered` la retira. Con «reducir movimiento» no
  hay entrada ni transición del panel, y el video queda en pausa en su primer fotograma.
- El rojo RCG aparece solo en el logotipo y en el resplandor del CTA al pasar el cursor.

## Imágenes optimizadas

Las páginas de producto no cargan los PNG de `public/screenshots/` sino sus versiones WebP
(`-640.webp` y `-1280.webp`, con `srcset` y `sizes`), recortadas a la misma proporción en
que se muestran (16:10, 4:3 o 16:11, desde arriba). El logo de la barra y del pie también
va en WebP. Tras cambiar o añadir una captura, regenerarlas con:

```bash
python3 -I scripts/optimizar-imagenes.py   # requiere Pillow
```

Los PNG originales se quedan como fuente; las propuestas (`/propuesta`) todavía los usan.

## Pendientes del handoff (no inventar)

- Los módulos de Softrix RRHH llevan la nota «[CONFIRMAR CON PRODUCTO]».
- Páginas de servicios legales, sector gobierno, equipos, blog y contacto: migrar los textos
  del WordPress actual.
- «Iniciar sesión», «Ver equipos» y «Blog» todavía apuntan a `#`.
