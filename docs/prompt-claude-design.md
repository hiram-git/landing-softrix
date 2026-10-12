# Prompt para continuar en Claude Design — Landing Softrix (fase 2)

> Copia todo lo que está debajo de la línea y pégalo en Claude Design.
> Adjunta también: `public/brand/logo-rcg-softrix.png`, `public/brand/logo-rcg-softrix-claro.png`,
> `public/brand/brand-r.png`, `DESIGN.md` y capturas de la portada actual (escritorio y celular).

---

Vas a continuar el diseño de la landing page de **Softrix** (marca de RC Group, Panamá). La
fase 1 ya está construida en código (Astro). Necesito que diseñes la **fase 2**: las
secciones que faltan en la portada y el refinamiento de las páginas de producto, **dentro del
mismo mundo visual**. No propongas una identidad nueva: extiende la que ya existe.

## 1. Qué es Softrix

Una suite de software de gestión hecha para empresas de Panamá. Se vende **a cotizar** (no se
publican precios). Tres productos, con estos nombres comerciales exactos:

1. **Softrix Facturación** (producto insignia): ERP comercial multi-empresa y multi-sucursal.
   - Facturación electrónica DGI Panamá vía PAC, con CUFE, QR y desglose de ITBMS.
   - Ventas, cotizaciones, pedidos, notas de crédito, cuentas por cobrar.
   - Inventario por almacén y sucursal, compras y costos de importación.
   - Caja con arqueo a ciegas contado por monedas y billetes.
   - Taller y órdenes de servicio con varias piezas y avance por pieza.
   - Joyerías: precio por peso de oro según quilate y precio del día; certificados de regalo.
   - Modo veterinaria. Reportes a PDF y Excel. En la nube o instalado en el local sin internet.
   - Impresión en ticket de 80 mm y A4/Carta.
2. **Softrix Planilla**: planilla para Panamá.
   - Motor de fórmulas propio para cada ingreso y deducción, con acumulados históricos.
   - Ciclo de planilla: generar, regenerar, revertir, cerrar, reabrir.
   - Préstamos y acreedores (la deducción se crea sola), asistencia con 4 marcaciones y
     tolerancias, estructura organizativa, roles y empresas aisladas.
3. **Softrix Control de Entrada**: control de visitantes y accesos para edificios, PH,
   hoteles, condominios y entidades públicas.
   - Puesto de control en tablet que **sigue funcionando sin red**.
   - Credenciales QR firmadas que vencen a las 24 h y se invalidan al salir.
   - Anfitriones que invitan y portal del visitante para el pre-registro.
   - Flujos de autorización; en el sector público, verificación de antecedentes y decisión
     del Departamento de Accesos.
   - Reconocimiento facial opcional sin guardar fotos. Salas de reunión.
   - **Próximamente**: apertura de barreras/torniquetes ZKTeco con el QR.

Además hay un **programa de distribuidores** para revendedores (panel de licencias, paquetes,
renovaciones). Fuera de la landing: Softrix Citas y cualquier otro producto.

**Públicos:** dueño o administrador de una pyme con una o varias sucursales (muchas veces
evalúa desde el celular); responsable de seguridad o administración de edificios y entidades
públicas; revendedores.

## 2. El mundo visual ya decidido: «Ruta Softrix»

El lenguaje de los **diablos rojos** panameños llevado a software serio. Softrix es una
*ruta*, no un catálogo: los productos son **destinos** y **paradas**.

- **Pintura (carrocería)**: negro `#0b0808` con el rojo del logo `#e3231a` aerografiado
  (focos radiales en las esquinas, una banda diagonal suave y grano fino), rojo profundo
  `#6e0d0a`. Se usa en portada, cabecera, cierres y pie. **No cambia con el tema.**
- **Cromo**: `#f6f5f5` / `#b4b0b0` / `#5d5858` en marcos, molduras y **filetes** (líneas finas
  con remate en espiral y un rombo rojo).
- **Amarillo de cabina** `#ffc41f` (texto encima `#1a1203`): solo sobre pintura, para el botón
  primario, la letra del letrero y el estado activo. **Nunca sobre papel.**
- **Papel** para el contenido: blanco `#ffffff` y `#f3f2f2`, tinta `#161313`, secundaria
  `#463f3e`, rojo para texto `#b3170f`, líneas `rgba(22,19,19,.12)`. En tema oscuro el papel
  pasa a `#120f0f` / `#1c1716` con tinta `#f4eeed`, y el rojo para texto a `#ff6a5f`.
- Sobre pintura, el texto secundario va teñido de rojo (`#dccbc8`), **nunca gris**.
- **Sin azul.** El azul `#0066cc` de las apps no aparece en la landing.
- **Tipografía**:
  - **Bungee** solo para el *letrero de ruta* y etiquetas cortas en cromo.
  - **Archivo** ancho (wdth 118–122, peso 800) para titulares.
  - **Inter** para leer (1.0625rem / 1.55).
  - JetBrains Mono solo para datos reales (CUFE, montos), nunca como adorno.
- **Botones**: píldora. Primario amarillo de cabina, secundario con contorno cromado sobre
  pintura, o tinta sobre papel.
- **Sobre papel no hay tarjetas**: listas con regla superior de 2 px en tinta, título en
  Archivo y texto en Inter. Nada de rejillas de tarjetas iguales con ícono.

**Pieza firma: el letrero de ruta.**
- Es un panel negro con marco cromado. Arriba lleva «SOFTRIX →» y «RUTA». Abajo, el destino
  en Bungee amarillo con sombra roja desplazada, por ejemplo «FACTURACIÓN».
- Cambia de destino como un rótulo de enrollar: la tira sale por arriba y entra la siguiente.
- Da dos vueltas y se detiene. Con movimiento reducido no gira.
- Sigue la parada que el visitante señala en la **línea de ruta**: una línea cromada vertical
  con tres paradas circulares, cada una con nombre, flecha roja y una línea de descripción.

**Lo que ya existe** (respétalo, no lo rediseñes):
- **Cabecera**: logo, «Productos ▾» (abre un panel con el letrero y las paradas), Distribuidores,
  Contacto, selector de tema y «Solicitar cotización».
- **Portada**: letrero a todo el ancho; abajo, a la izquierda, el titular «Software de gestión
  hecho para Panamá.», la bajada y dos botones; a la derecha, «Elige tu parada» con la ruta.
- **Páginas de producto**: letrero con el destino, titular, «Qué incluye» (lista con reglas),
  «Para quién es» y un cierre en pintura.
- **Otras piezas**: contacto (canales WhatsApp y correo), distribuidores, 404 «FUERA DE RUTA»,
  pie con filetes y botón flotante de WhatsApp.

## 3. Lo que necesito que diseñes (fase 2)

Diseña la **portada completa** con estas secciones nuevas debajo del hero, en este orden.
Alterna pintura y papel con ritmo: una zona densa se gana una tranquila después.

1. **Hecho para Panamá**: facturación electrónica DGI con ITBMS, planilla local, términos
   fiscales panameños (RUC con DV), soporte en español. Demuéstralo con un objeto, no con
   viñetas. Por ejemplo, un comprobante electrónico (CAFE) en ticket de 80 mm con CUFE y QR,
   marcado como ejemplo.
2. **Hecho para tu industria**: pestañas Joyerías · Talleres · Veterinarias · Edificios y
   entidades. Cada una con 3 capacidades concretas sacadas de la lista de arriba y una pantalla
   de ejemplo.
3. **Una sola forma de trabajar**: lo común a la suite. Multi-empresa y multi-sucursal,
   permisos finos, nube o instalación local sin internet, datos aislados por empresa.
4. **Testimonios**: 2 o 3 espacios **claramente marcados como pendientes**. Hay testimonios
   reales, pero aún no se han entregado. **No inventes nombres, empresas ni citas.**
5. **¿Vendes software?**: banda hacia `/distribuidores`.
6. **Preguntas frecuentes**: cómo se cotiza, nube o instalación local, migración desde mi
   sistema actual, soporte y capacitación, facturación electrónica con mi PAC.
7. **Cierre**: «Solicita tu cotización» con botón amarillo y WhatsApp.

Además:
- Propón cómo mostrar **pantallas de producto** dentro de este mundo, por ejemplo enmarcadas
  como el letrero o como el parabrisas. Las capturas reales llegarán después; diseña con
  maquetas de ejemplo rotuladas como tales.
- Diseña la sección «Hecho para tu industria» también en su versión de página propia
  (`/facturacion/joyerias`), como plantilla reutilizable.

## 4. Reglas que no se negocian

- **Nada inventado**: ni clientes, ni logos de clientes, ni cifras de uso, ni precios, ni
  funciones que no estén en la lista de arriba. Lo pendiente se marca como pendiente.
- Todo llamado a la acción es «Solicitar cotización» o WhatsApp. No hay «Prueba gratis» ni
  «Comprar».
- Textos en español de Panamá, con tuteo («Escríbenos», «Cuéntanos»), nunca voseo.
- Contraste AA en ambos temas, todo operable con teclado, y diseño pensado primero para el
  celular a 390 px sin scroll horizontal.
- El rojo se ancla en las esquinas y bandas de la pintura; no lo uses como fondo pleno detrás
  de texto secundario.
- Dominio, WhatsApp y correo siguen como marcadores: `softrix.com.pa`, `+507 6000-0000`,
  `ventas@softrix.com.pa`.

## 5. Cómo entregarlo

- Escritorio (1440) y celular (390) para cada sección, en tema claro y oscuro donde haya papel.
- Usa estos nombres de variables CSS para que el paso a código sea directo: `--pintura`,
  `--rojo`, `--rojo-profundo`, `--cabina`, `--cabina-tinta`, `--cromo-claro`, `--cromo-medio`,
  `--cromo-oscuro`, `--sobre-pintura`, `--sobre-pintura-2`, `--papel`, `--papel-2`, `--tinta`,
  `--tinta-2`, `--rojo-tinta`, `--hilo`, `--f-letrero`, `--f-display`, `--f-texto`, `--f-mono`.
- Al final, una lista de lo que hay que reemplazar por material real: capturas, testimonios y
  datos de contacto.
