RCG Softrix es la línea de software de RC Group (rcgpty.com) para pymes e instituciones de Panamá: **Facturación** (ERP comercial, producto insignia), **RRHH** (planilla y colaboradores) y **Control de accesos** (SmartGate Control). Convive en el mismo sitio con los servicios legales, la asesoría fiscal y la venta de equipos de RC Group. Este sistema cubre el sitio rcgpty.com y las páginas de cada producto. Los principios que toda pieza debe transmitir: *una sola suite*, *hecho para Panamá*, *multi-empresa y multi-sucursal*, *funciona en la nube o instalado localmente*.

## Fundamentos de contenido

- Escribe en español neutro, en segunda persona del singular de confianza («tú») hacia el dueño o administrador de la empresa. Nunca «usted», nunca voseo.
- Encabeza con lo que el producto resuelve, no con lo que es: «Vende, factura ante la DGI y controla inventario y caja en un solo sistema», no «Software ERP modular».
- La marca de software es **RCG Softrix** (así en titulares y menú); los productos van como `Softrix` + módulo: Softrix Facturación, Softrix RRHH, SmartGate Control. «RC Group» nombra la empresa y sus servicios legales y fiscales.
- Siglas panameñas tal cual, sin explicar en los titulares: DGI, CAFE, CUFE, ITBMS, PAC. Explícalas una vez en `caption` la primera vez que aparecen en una página.
- Mayúsculas solo de oración; las etiquetas `label` se transforman a mayúsculas por CSS, no en el texto.
- Sin emojis ni signos de exclamación en la interfaz. Las listas de características son frases nominales cortas: «Stock en tiempo real por almacén», «Cierre de caja con supervisor».
- Una sola conversión por pantalla: «Solicitar demo» es la primaria (48 px, `brand`); «Escribir por WhatsApp» la acompaña como `ghost`, nunca con el mismo peso. No hay botón «Comprar». El formulario de demo pide solo nombre, contacto y producto de interés; el resto se pregunta en la llamada.
- Las cifras técnicas van en `code`: números de factura, CUFE, claves de licencia.

## Color

Dos temas, `light` y `dark`; la landing usa `light` y la tablet del puesto de control de SmartGate usa `dark`. Los productos comparten los mismos tokens.

- Fondo de página: `surface-000`. Alterna secciones con `surface-100`; nunca dos secciones consecutivas del mismo fondo.
- Texto: `ink` para titulares y cuerpo, `ink-muted` para descripciones y leyendas. Ambos están definidos para leer sobre `surface-000`, `surface-100` y `surface-200`.
- El rojo RCG es `brand` (#e5231a), el mismo en los dos temas. Úsalo como **fondo** (botón primario, línea de acento de 4px bajo el titular de sección, indicador de pestaña activa) con texto `on-brand`. Como **texto** usa `brand-text`: `brand` solo alcanza 4.6:1 sobre `surface-000` en claro y no alcanza 4.5:1 en oscuro.
- `brand-deep` reproduce el extremo oscuro del degradado del logotipo. Franja de CTA y pie de página: fondo `brand-deep` o `surface-inverse`, texto `on-brand` o `ink-inverse`; el texto secundario sobre esos fondos usa `on-brand-muted`, nunca opacidad. Nunca reconstruyas el degradado del logotipo con CSS: el degradado es del logotipo, el resto de la interfaz es de color plano.
- `brand-soft` resalta el producto insignia y aloja iconos de característica; su texto es `brand-text`.
- Estados: `success`, `warning`, `danger`, `info`, cada uno con su `-soft`. El estado siempre lleva palabra o icono además del color. `danger` es el mismo rojo que `brand-text`: en la suite el rojo significa marca *y* error, por eso un error va siempre dentro de `danger-soft` con un icono y un texto que lo nombre.
- Bordes decorativos: `border`. Bordes que cargan significado (campos, controles): `border-strong`, 3:1 o más en ambos temas.
- Foco: anillo sólido de 2px en `focus`, con desplazamiento de 2px, en todo elemento interactivo. No se quita nunca.

## Tipografía

Dos familias alojadas en Google Fonts, sin archivos locales:

- `display` — **Exo 2** (700 y 600) para titulares y cifras. Es una sans técnica de trazo geométrico que acompaña al rotulado del logotipo sin imitarlo. El logotipo es una imagen y nunca se compone con texto.
- `sans` — **IBM Plex Sans** (400 y 600) para todo el texto corrido, botones y formularios.
- `mono` — **IBM Plex Mono** (400) para `code`.

Carga: `<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@600;700&family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Mono&display=swap" rel="stylesheet">`.

Escala: `display-xl` solo en el hero, `display-lg` en el titular de cada página de producto, `heading-md` en secciones y tarjetas, `heading-sm` en módulos. Cuerpo en `body` (16/24), bajadas en `body-lg`, apoyo en `body-sm`. Un eyebrow en `label` + `brand-text` encima de cada titular de sección («PRODUCTO INSIGNIA», «PARA JOYERÍAS Y TALLERES»). Ancho máximo de texto corrido: `measure`.

## Espaciado y retícula

Base de 4px. Contenido centrado en `container` (1200px) con márgenes laterales de `space-6` en móvil y `space-8` en escritorio. Secciones separadas por `space-16`; hero y franja de CTA con `space-24` arriba y abajo. Dentro de una tarjeta, `space-6` de relleno y `space-3` entre líneas de lista. Rejilla de productos: 4 columnas en escritorio, 2 en tableta, 1 en móvil, con hueco `space-6`.

## Esquinas, bordes y sombras

Las esquinas del logotipo son cuadrados redondeados y la interfaz las sigue: `radius-md` en botones y campos, `radius-lg` en tarjetas y capturas, `radius-xl` en la franja de CTA, `radius-sm` en etiquetas. Píldora (`radius-pill`) solo en estados y en el botón de WhatsApp.

La jerarquía se construye con `border` y con el cambio `surface-000`/`surface-100`, no con sombra. `shadow-sm` aparece únicamente al pasar el cursor sobre una tarjeta de producto; `shadow-md` en menús, diálogos y la barra de navegación cuando se vuelve pegajosa.

## Imágenes

Capturas de pantalla reales de los productos, en `radius-lg` con borde `border`, sobre `surface-100`. Sin ilustraciones de personas ni fotografías de stock. Las capturas en tema oscuro (tablet de SmartGate) van sobre `surface-inverse`.

## Iconografía

Iconos de línea de **Lucide** (`lucide` en npm o SVG inline), trazo de 1.75px, tamaño 20px en texto y 24px en tarjetas de característica, donde van dentro de un cuadrado de 40px con fondo `brand-soft`, color `brand-text` y `radius-md`. Color del icono = color del texto que acompaña. Sin emojis.

## Navegación

La barra conserva los menús de rcgpty.com: **Servicios Legales** (submenú), **RCG Softrix** (submenú con Facturación, RRHH y Control de accesos), **Sector Gobierno**, **Equipos**, **Blog** y **Contáctenos**, más «Iniciar sesión» y «Solicitar demo» a la derecha. Un submenú se abre al pasar el cursor o con foco de teclado (`Navbar` con `children`), cada entrada con una línea de ayuda en `caption`. En móvil los submenús se muestran como grupos con encabezado en `label`.

## Logotipo

Tres archivos en `assets/Logos`; mira su README para las reglas de uso. Nunca se recolorea, se estira, se rota ni se reconstruye con tipografía.

## Movimiento

Transiciones de 150ms con `ease-out` en color de fondo, borde y sombra. La **primera pantalla** de cada página tiene una entrada escalonada y una sola vez: eyebrow, titular, línea de acento, bajada, botones y captura aparecen con `sx-enter` (16px hacia arriba + opacidad, 480ms, `cubic-bezier(0.2, 0.7, 0.2, 1)`) y retrasos `sx-enter--2` … `--5` (100–420ms); la línea roja bajo el titular crece desde la izquierda con `sx-enter--rule`. Nada más se anima al hacer scroll, y todo se desactiva con `prefers-reduced-motion`. En Astro, aplicar las clases en el componente del hero y dejar que el CSS del bundle haga el resto; sin librerías de animación.

## Componentes

`Navbar`, `Hero`, `ProductCard`, `FeatureCard`, `Button`, `Badge` e `Input` cubren la landing y las páginas de producto. `ProductCard` solo en la rejilla de la suite; cualquier otra tarjeta es `FeatureCard`. Cada uno tiene guía y vista previa. El consumidor aporta los textos, los enlaces y las capturas; los componentes aportan tokens, estados y foco.
