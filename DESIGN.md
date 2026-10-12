---
name: Softrix · Ruta Softrix
description: Landing de la suite Softrix (RC Group). La portada es el letrero de destino de un diablo rojo; el contenido va en papel limpio.
colors:
  pintura: "#0b0808"
  pintura-oscuro: "#070505"
  rojo: "#e3231a"
  rojo-profundo: "#6e0d0a"
  cabina: "#ffc41f"
  cabina-hover: "#ffd75c"
  cabina-tinta: "#1a1203"
  cromo-claro: "#f6f5f5"
  cromo-medio: "#b4b0b0"
  cromo-oscuro: "#5d5858"
  sobre-pintura: "#fbf6f5"
  sobre-pintura-2: "#dccbc8"
  hilo-pintura: "rgba(246, 245, 245, 0.16)"
  papel: "#ffffff"
  papel-2: "#f3f2f2"
  tinta: "#161313"
  tinta-2: "#463f3e"
  rojo-tinta: "#b3170f"
  hilo: "rgba(22, 19, 19, 0.12)"
  hilo-fuerte: "rgba(22, 19, 19, 0.24)"
  papel-oscuro: "#120f0f"
  papel-2-oscuro: "#1c1716"
  tinta-oscuro: "#f4eeed"
  tinta-2-oscuro: "#cbbfbd"
  rojo-tinta-oscuro: "#ff6a5f"
typography:
  rotulo:
    fontFamily: "Bungee, Archivo Variable, system-ui, sans-serif"
    fontSize: "min(5.5rem, calc(100cqi / (var(--largo) * 0.78)))"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.01em"
  rotulo-etiqueta:
    fontFamily: "Bungee, Archivo Variable, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    letterSpacing: "0.08em"
  display:
    fontFamily: "Archivo Variable, Inter Variable, system-ui, sans-serif"
    fontSize: "clamp(2.35rem, 5.2vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 122"
  headline:
    fontFamily: "Archivo Variable, Inter Variable, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.8vw, 4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Archivo Variable, Inter Variable, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 3.6vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  item:
    fontFamily: "Archivo Variable, Inter Variable, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 750
    lineHeight: 1.2
    fontVariation: "'wdth' 112"
  body:
    fontFamily: "Inter Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "'cv11', 'ss03'"
  lead:
    fontFamily: "Inter Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.1
rounded:
  radio: "10px"
  radio-grande: "18px"
  pildora: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  ancho: "76rem"
  alto-cabecera: "4rem"
  seccion: "clamp(4rem, 9vw, 7.5rem)"
  acciones: "0.75rem"
components:
  button-cabina:
    backgroundColor: "{colors.cabina}"
    textColor: "{colors.cabina-tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.pildora}"
    padding: "0.75rem 1.35rem"
    height: "3rem"
  button-cabina-hover:
    backgroundColor: "{colors.cabina-hover}"
    textColor: "{colors.cabina-tinta}"
  button-cromo:
    backgroundColor: "transparent"
    textColor: "{colors.sobre-pintura}"
    typography: "{typography.label}"
    rounded: "{rounded.pildora}"
    padding: "0.75rem 1.35rem"
    height: "3rem"
  button-chico:
    rounded: "{rounded.pildora}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
  nav-vinculo:
    backgroundColor: "transparent"
    textColor: "{colors.sobre-pintura}"
    rounded: "{rounded.pildora}"
    padding: "0.4rem 0.8rem"
    height: "2.5rem"
  letrero:
    backgroundColor: "{colors.pintura}"
    textColor: "{colors.cabina}"
    typography: "{typography.rotulo}"
    rounded: "{rounded.radio-grande}"
  canal:
    textColor: "{colors.sobre-pintura}"
    rounded: "{rounded.radio-grande}"
    padding: "1.15rem 1.35rem"
---

# Design System: Softrix · Ruta Softrix

## Overview

**Creative North Star: "Ruta Softrix"**

Softrix es una ruta, no un catálogo. La portada es el letrero de destino de un diablo rojo panameño, que anuncia a dónde lleva la suite (FACTURACIÓN, PLANILLA, CONTROL DE ENTRADA). El sitio está hecho de dos materiales. La **pintura** es la carrocería negra con el rojo del logotipo aerografiado y grano, con cromo en marcos, carriles y filetes. Va en la portada, la cabecera, los menús, las cabezas de página, los cierres y el pie. El **papel** es blanco y limpio, y en él va el contenido que se lee: los módulos de cada producto, «Para quién es» y «Cómo funciona».

La letra de rótulo (Bungee) en amarillo de cabina, con sombra roja desplazada, solo aparece dentro de un letrero. Los titulares van en Archivo ancho y pesado, y la lectura en Inter. La densidad es baja y los bloques son pocos y grandes. Cada página arranca en pintura y termina en pintura: cabeza, papel y luego un cierre con «Solicitar cotización».

Se rechaza el hero SaaS genérico, con degradado de fondo, captura flotante y tres tarjetas iguales debajo. Los tres productos se presentan como paradas sobre un carril cromado, nunca como tres tarjetas paralelas.

**Key Characteristics:**
- Dos materiales: pintura (carrocería, fija) y papel (contenido, sigue al tema).
- El letrero de ruta es la pieza firma: marco cromado, vidrio negro y rótulo amarillo con doble sombra roja.
- Amarillo de cabina como única luz sobre la pintura. El azul de acción de las apps (#0066cc) no existe en la landing.
- Cromo para bordes, carriles y filetes con remate en espiral. Nunca gris plano sobre la pintura.
- Listas con filete en vez de tarjetas en el papel.
- Movimiento corto y con salida suave. El letrero se detiene solo y nunca se mueve con movimiento reducido.

## Colors

La paleta es una carrocería: negro teñido de rojo, el rojo del logo, cromo y una sola luz amarilla. El papel es casi blanco puro y la tinta es casi negra.

### Primary
- **Rojo Softrix** (rojo): es el rojo del logotipo. Sirve de pigmento, no de texto: el aerografiado de la pintura, la sombra del rótulo, el remate rombo del filete, la flecha de las paradas, el subrayado de la página actual en la cabecera y el anillo de foco sobre el papel claro. Sobre la pintura no alcanza 4.5:1 como texto, así que solo pinta iconos, bordes y sombras.
- **Rojo Profundo** (rojo-profundo): la segunda capa de la sombra del rótulo y los halos oscuros de las esquinas de la pintura.
- **Rojo de Tinta** (rojo-tinta / rojo-tinta-oscuro): el rojo para texto sobre papel, como la etiqueta «Próximamente». En el tema oscuro sube a un coral claro, que además es el anillo de foco sobre el papel oscuro.

### Secondary
- **Luz de Cabina** (cabina): el amarillo del vidrio de cabina. Es la única luz sobre la pintura: el botón primario, la letra de rótulo y el halo detrás de ella, el anillo de foco dentro de la pintura, la parada activa o señalada, el nombre del producto sobre su cabeza, los iconos de los canales de contacto y el hover de los enlaces del pie y del panel de productos.
- **Cabina Encendida** (cabina-hover): el hover del botón primario.
- **Tinta de Cabina** (cabina-tinta): el texto sobre el amarillo, casi negro con un tinte cálido.

### Tertiary
- **Cromo Claro / Medio / Oscuro** (cromo-claro, cromo-medio, cromo-oscuro): siempre en degradado lineal de oscuro a claro a medio, que se lee como metal pulido. Se usa en el marco del letrero, el carril de las paradas, los filetes, la moldura inferior de la cabecera y el contorno del botón secundario. El cromo claro solo, sin degradado, se usa en las etiquetas de rótulo pequeñas («Elige tu parada», columnas del pie, el origen «SOFTRIX» del letrero).

### Neutral
- **Pintura de Carrocería** (pintura): el negro de fondo de toda superficie pintada. En el tema oscuro baja un paso (pintura-oscuro) para que siga separándose del papel oscuro. Es el único cambio que el tema le hace a la carrocería.
- **Sobre Pintura** (sobre-pintura): el texto principal sobre la pintura, un blanco cálido.
- **Sobre Pintura Secundario** (sobre-pintura-2): bajadas, notas y la frase de cada parada. Es un rosado teñido de rojo, nunca un gris neutro.
- **Hilo de Pintura** (hilo-pintura): los divisores y contornos finos dentro de la pintura (pie, panel, canales, selector de tema).
- **Papel / Papel 2** (papel, papel-2; oscuros: papel-oscuro, papel-2-oscuro): el fondo del contenido. Papel 2 alterna una sección por página («Para quién es»).
- **Tinta / Tinta 2** (tinta, tinta-2; oscuros: tinta-oscuro, tinta-2-oscuro): títulos y texto sobre papel. Tinta 2 es para las descripciones de los módulos.
- **Hilo / Hilo Fuerte** (hilo, hilo-fuerte): divisores sobre papel. El hilo fuerte separa los renglones de «Para quién es».

### Named Rules
**The Carrocería Rule.** La pintura no sigue al tema. Rojo, rojo profundo, cabina y cromo son fijos. Del lado de la pintura, el tema claro/oscuro solo baja un paso el negro de fondo (`:root[data-theme="dark"]` en `tokens.css`). Todo lo demás que cambia con el tema es papel, tinta e hilo.

**The Una Luz Rule.** El amarillo de cabina solo vive sobre la pintura, y ahí es la luz: el botón primario, el rótulo, el foco y lo activo o señalado. Nunca va como fondo ni como texto sobre el papel. Hay un botón amarillo por bloque: el secundario a su lado es de cromo.

**The Sin Azul Rule.** El azul de acción de las apps de Softrix no se usa en la landing. Aquí la acción es amarilla sobre la pintura y roja de tinta sobre el papel.

**The Rojo en las Esquinas Rule.** El aerografiado rojo se ancla fuera de la caja, en las esquinas (abajo a la derecha, arriba a la derecha y abajo a la izquierda), con una banda diagonal tenue. El centro de la pintura queda negro, que es donde va el texto.

## Typography

**Display Font:** Archivo Variable, ancho (wdth 112–122) y de peso 750–800 (con Inter Variable y system-ui)
**Body Font:** Inter Variable (con Inter, -apple-system, Segoe UI)
**Letrero Font:** Bungee 400 (con Archivo Variable)

**Character:** Bungee es la letra pintada del bus, Archivo ancho es la rotulación de la carrocería e Inter es el texto que se lee. Las tres se cargan locales con @fontsource, sin CDN.

### Hierarchy
- **Rótulo** (Bungee 400; el tamaño se ajusta al ancho del letrero hasta un tope de 5.5rem grande, 3.25rem medio o 1.75rem chico; 1.05): solo dentro del letrero. Amarillo de cabina con doble sombra desplazada (0.045em/0.055em en rojo, 0.09em/0.11em en rojo profundo). El tamaño sale de la consulta de contenedor y del destino más largo, así que el destino nunca se parte.
- **Rótulo Etiqueta** (Bungee 400, 0.7–0.95rem, interletrado 0.08em, cromo claro): rótulos cortos sobre la pintura, como el origen «SOFTRIX → Ruta» del letrero, «Elige tu parada» y los encabezados de columna del pie.
- **Display** (Archivo 800, wdth 122, clamp(2.35rem, 5.2vw, 4.5rem), 0.98, −0.025em): solo el h1 de la portada.
- **Headline** (Archivo 800, wdth 118, clamp(2.1rem, 4.8vw, 4rem), 1): el h1 de las cabezas interiores (producto, distribuidores, contacto y 404 con variantes de clamp cercanas) y el h2 del cierre (clamp(2rem, 4.4vw, 3.5rem)).
- **Title** (Archivo 800, wdth 118, clamp(1.8rem, 3.6vw, 2.75rem)): el h2 de cada sección sobre papel.
- **Item** (Archivo 750, wdth 112, 1.2rem, 1.2): el título de cada módulo o punto. Los nombres de las paradas usan la misma familia más grande (800, wdth 118, 1.3rem).
- **Body** (Inter 400, 1.0625rem, 1.55, rasgos cv11 y ss03): todo el texto corrido. Se mide en `ch` entre 34 y 52 según el bloque.
- **Lead** (Inter 400, clamp(1.05rem, 1.5vw, 1.25rem) o 1.125rem, 1.5): las bajadas bajo un titular, en sobre-pintura-2.
- **Label** (Inter 700, 1rem, 1.1): botones. El botón chico va a 0.9375rem y la navegación a Inter 600 0.975rem.

### Named Rules
**The Rótulo Enmarcado Rule.** Bungee grande en amarillo con sombra roja solo se usa dentro de un letrero con marco de cromo. Fuera del letrero, Bungee aparece únicamente como etiqueta pequeña en cromo claro.

**The Ancho Rule.** Todos los titulares h1–h4 llevan Archivo ancho (wdth 118 por defecto y 122 en la portada) y `text-wrap: balance`. Un titular en Inter o en Archivo de ancho normal se sale del sistema.

## Layout

El contenedor tiene un ancho máximo de 76rem más dos márgenes. El margen es fluido, clamp(1rem, 4vw, 2.5rem). Las secciones sobre papel tienen un respiro vertical de clamp(4rem, 9vw, 7.5rem). La cabecera es pegajosa, de 4rem, y el scroll a un ancla la descuenta.

- **Portada:** ocupa el alto de la ventana menos la cabecera. El letrero va a todo el ancho y debajo hay una rejilla de 1.35fr / 1fr: a la izquierda el titular, la bajada, los botones y un filete, y a la derecha «Elige tu parada» con las tres paradas en vertical. Bajo 900px todo se apila (letrero, texto, paradas) y el filete se oculta.
- **Cabezas interiores:** el letrero en un tamaño medio (máximo 40rem de ancho) arriba y el texto debajo (máximo 50–52rem).
- **Contenido sobre papel:** son listas, no tarjetas. Los módulos se reparten en `auto-fill` de columnas de mínimo 22rem (18rem en distribuidores), cada una encabezada por un filete de 2px en tinta. «Para quién es» usa dos columnas (1fr / 1.3fr) que se apilan bajo 760px.
- **Cierre:** el texto a la izquierda y las acciones abajo a la derecha, con `flex-wrap`.
- **Pie:** cuatro columnas (1.6fr y tres de 1fr), que pasan a dos bajo 820px y a una bajo 480px.
- **Cabecera:** bajo 940px la navegación y el botón de cotización ceden su lugar a un menú de pantalla completa.
- Entre botones juntos siempre hay 0.75rem.

## Elevation & Depth

La profundidad viene del material, no de una escala de sombras. La pintura tiene volumen propio, con degradados radiales y grano de aerógrafo (ruido fractal en overlay al 22%). El cromo crea bordes con anillos interiores (`box-shadow` inset) en lugar de `border`. El papel es plano: separa con filetes y con el tono de papel-2, nunca con sombras.

### Shadow Vocabulary
- **Letrero suspendido** (`box-shadow: 0 18px 40px -18px rgb(0 0 0 / 0.8)`): el letrero cuelga sobre la pintura.
- **Vidrio del letrero** (`box-shadow: 0 0 0 1px rgb(0 0 0 / 0.6) inset, 0 0 0 4px var(--pintura) inset, 0 0 0 5px rgb(246 245 245 / 0.18) inset`): un doble bisel dentro del marco cromado.
- **Botón de cabina** (`box-shadow: 0 1px 0 rgb(255 255 255 / 0.55) inset, 0 -2px 0 rgb(0 0 0 / 0.18) inset, 0 6px 18px -6px rgb(255 196 31 / 0.55)`): una pieza en relieve con halo amarillo propio.
- **Contorno de cromo** (`box-shadow: 0 0 0 1.5px var(--cromo-medio) inset`): el botón secundario y la píldora del producto elegido. En el hover sube a cromo claro.
- **Panel desplegado** (`box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.75)`): el menú de productos y el menú móvil.
- **Flotante** (`box-shadow: 0 0 0 3px var(--pintura), 0 10px 24px -8px rgb(0 0 0 / 0.55)`): el botón de WhatsApp, con su aro de pintura.

### Named Rules
**The Papel Plano Rule.** Sobre el papel no hay sombras ni tarjetas elevadas. La jerarquía se marca con un filete de 2px en tinta encima de cada ítem y con papel-2 en una sección alterna.

## Shapes

- **Píldora** (999px): todos los botones, los vínculos de la navegación y la píldora del producto elegido. Los botones de icono (tema, menú, WhatsApp) son círculos.
- **Placa** (radio-grande, 18px): el letrero y las tarjetas de canal de contacto. El marco interior del letrero resta el grueso del borde de cromo (2px) para que las curvas queden concéntricas.
- **Esquina suave** (radio, 10px): el enlace de cada parada, que se nota en el foco, y el enlace «Saltar al contenido».
- **Filete:** una línea fina de cromo que remata en una espiral y un rombo rojo (SVG de 260×44), puesta en espejo con `voltear`. Aparece en la portada, junto a los botones, y como par enfrentado en el pie.
- **Carril y paradas:** un carril de cromo de 3px con paradas circulares de 1.05rem. Cada parada es un aro de cromo claro sobre la pintura que se llena de amarillo, con un aro rojo exterior, cuando está activa.
- El subrayado de la página actual es una línea roja inferior de 2px, y la píldora pierde su radio cuando está activa.

## Components

### Buttons
Son piezas de cabina: confiadas, gruesas y de esquina completa.
- **Shape:** píldora (999px), alto mínimo de 3rem, Inter 700 a 1rem, icono a 1.15em con 0.6rem de separación.
- **Primary (cabina):** fondo amarillo de cabina con tinta de cabina y la sombra de relieve. Su texto es siempre «Solicitar cotización». En el hover cambia a cabina-hover y sube 1px.
- **Secondary (cromo):** transparente, con contorno de cromo medio y texto sobre-pintura. En el hover tiene un velo blanco al 8% y el contorno pasa a cromo claro. Es el par natural del primario, casi siempre con el icono de WhatsApp.
- **Chico:** alto de 2.5rem, relleno de 0.5rem 1rem y 0.9375rem. Se usa en la cabecera.
- **Focus:** contorno de 3px con un desfase de 3px. Es amarillo dentro de la pintura y rojo o coral sobre el papel.

### Navigation
- **Cabecera:** una barra de pintura en reposo (solo dos halos, sin la banda diagonal) con una moldura de cromo de 1px abajo. Lleva el logo claro (1.35rem de alto), los vínculos en píldora (Inter 600 0.975rem) con un velo blanco al 10% en el hover, el selector de tema y el botón de cabina chico.
- **Panel de productos:** se despliega con un `clip-path` de arriba hacia abajo en 420ms. A la izquierda tiene un letrero medio y a la derecha la ruta vertical sincronizada, más un pie hacia el programa de distribuidores. Se cierra con Escape (devuelve el foco), con un clic fuera o al tabular fuera de él.
- **Menú móvil (≤940px):** a pantalla completa, con letrero chico, la ruta, los enlaces y el botón de cabina. Bloquea el scroll del documento mientras está abierto.

### Letrero de ruta (firma)
Es el rótulo de destino del parabrisas.
- **Estructura:** un marco con borde de cromo de 2px (degradado a 100deg), vidrio negro con un brillo superior, la línea de origen «SOFTRIX → Ruta» y una ventana con el destino en letra de rótulo sobre un halo de cabina.
- **Tamaños:** grande en la portada, medio en las cabezas interiores y el panel, chico en el menú móvil.
- **Accesibilidad:** el letrero es decorativo (`aria-hidden`) y repite sus destinos en un texto oculto. Los destinos reales siempre existen también como enlaces.
- **Movimiento:** un rótulo de enrollar. El destino sale hacia arriba (240ms, curva de aceleración) y el siguiente entra desde abajo (520ms, la curva de salida). Con `rotar`, cambia cada 3200ms, da **dos vueltas completas y se detiene**. Se pausa con el puntero o el foco dentro de su zona y con la pestaña oculta. **Nunca rota con movimiento reducido**: ahí el cambio de destino es instantáneo.
- **Sincronía:** pasar el puntero o el foco por una parada de la ruta enlazada pone su destino en el letrero, también después de que la rotación terminó.

### Ruta de productos
Es una lista ordenada de tres paradas: Facturación, Planilla y Control de Entrada, en el orden del letrero con el producto insignia primero. Cada una lleva su punto, su nombre en Archivo ancho con una flecha roja y su línea en sobre-pintura-2 (máximo 34ch). En el hover o el foco la parada se enciende en amarillo, la flecha avanza 4px y el nombre se subraya en rojo. La página actual queda encendida con `aria-current`. Se usa en vertical en todas las vistas del build.

### Cards / Containers
- **Canal de contacto:** es la única tarjeta del sitio, y vive en la pintura. Tiene una placa de 18px, un velo blanco al 6%, un contorno de hilo-pintura que pasa a cromo claro en el hover, el icono amarillo a 1.75rem y una etiqueta fuerte con el dato en sobre-pintura-2.
- **Módulo o punto (papel):** no es una tarjeta. Es un renglón con un filete superior de 2px en tinta, el título Item y una descripción en tinta-2.
- **Cierre:** una banda de pintura completa con un titular, una bajada, el botón de cabina y el de cromo a WhatsApp. El mensaje de WhatsApp nombra el producto cuando lo hay.

### Botón flotante de WhatsApp
Es un círculo de 3.5rem en el verde de la marca de WhatsApp, con un aro de pintura de 3px, fijo abajo a la derecha y respetando el área segura del dispositivo. **Se oculta mientras cualquier zona `[data-oculta-wa]` esté a la vista** (la portada, la cabeza de contacto y cada cierre, que ya tienen su propio WhatsApp). Al ocultarse se desvanece, baja 1.5rem y sale del orden de tabulación y del árbol de accesibilidad.

### Convención de estilos con ámbito
`astro.config.mjs` usa `scopedStyleStrategy: "class"`. Una clase que el padre le pasa a un componente hijo (por ejemplo `class="portada__letrero"` o la clase de un `Icono`) conserva el ámbito del padre, y el padre puede estilizarla directamente. Un selector descendente que apunta al SVG de un `Icono` al que **no** se le pasó clase tiene que escribirse con `:global(svg)` (`.wa :global(svg)`, `.pie__columna :global(svg)`, `.canal :global(svg)`).

## Do's and Don'ts

### Do:
- **Do** abrir cada página en pintura (cabeza con letrero) y cerrarla en pintura con «Solicitar cotización». El contenido que se lee va en papel entre las dos.
- **Do** poner un solo botón de cabina por bloque y acompañarlo, si hace falta, con el de cromo (casi siempre WhatsApp).
- **Do** dibujar bordes y carriles de cromo como degradado oscuro → claro → medio, o como anillo interior (`box-shadow` inset), en lugar de un `border` gris.
- **Do** usar rojo-tinta para el texto rojo sobre papel, y reservar el rojo del logo para pigmento, iconos, sombras y el anillo de foco.
- **Do** separar el contenido del papel con filetes de 2px en tinta y alternar papel-2 en una sección.
- **Do** detener todo movimiento automático: el letrero da dos vueltas y para, y con `prefers-reduced-motion` no rota.
- **Do** escribir `:global(svg)` cuando un padre estiliza el icono de un hijo que no recibió clase.

### Don't:
- **Don't** construir la portada como el hero SaaS: degradado de fondo genérico, captura flotante y tres tarjetas iguales debajo. Los productos son paradas sobre un carril.
- **Don't** hacer que la pintura siga al tema. Rojo, cabina y cromo no cambian, y el negro de carrocería solo baja un paso en oscuro.
- **Don't** usar el amarillo de cabina sobre el papel, ni como fondo ni como texto.
- **Don't** usar el azul de acción de las apps (#0066cc) en la landing.
- **Don't** usar el rojo del logo (#e3231a) como color de texto sobre la pintura: no alcanza 4.5:1.
- **Don't** usar grises neutros para el texto secundario sobre la pintura. Es sobre-pintura-2, teñido de rojo.
- **Don't** poner letra de rótulo grande (Bungee amarilla con sombra roja) fuera de un letrero enmarcado en cromo.
- **Don't** elevar el contenido del papel con sombras o tarjetas flotantes.
