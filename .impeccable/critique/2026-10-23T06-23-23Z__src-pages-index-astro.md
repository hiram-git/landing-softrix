---
target: portada y páginas de producto
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
timestamp: 2026-10-23T06-23-23Z
slug: src-pages-index-astro
---
Method: dual-agent (A: revisión de diseño · B: detector + navegador)

## Design Health Score (Persuade; 7 y 10 n/a)

| # | Heurística | Puntaje | Hallazgo clave |
|---|---|---|---|
| 1 | Visibilidad del estado | 3 | Envío deshabilitado mientras carga y éxito con foco; el «señalamiento» por segmento es solo un atenuado al 40 % |
| 2 | Coincidencia con el mundo real | 3 | Vocabulario panameño; «Sin tarjeta» es jerga SaaS; «certificada por la DGI» choca con «a través del PAC» |
| 3 | Control y libertad | 3 | Esc, «Enviar otra solicitud»; el CTA de producto saca al visitante a la portada |
| 4 | Consistencia | 2 | «Contáctenos» (usted) sobre tuteo; franja de demo oscura sin padding superior en Facturación |
| 5 | Prevención de errores | 2 | El interés arranca en «Softrix Facturación» aunque venga de RRHH; el contacto acepta «abc»; Blog e Iniciar sesión van a «#» |
| 6 | Reconocer en vez de recordar | 3 | Sin CTA persistente en el celular en una página de 9 000 px |
| 7 | Flexibilidad | n/a | Página de persuasión |
| 8 | Estética y minimalismo | 2 | 8 secciones y 6 CTA distintos en la portada; insignias-adjetivo |
| 9 | Recuperación de errores | 3 | Errores en el campo con icono y texto; error de red sin enlace directo |
| 10 | Ayuda | n/a | El glosario CAFE/CUFE basta |
| **Total** | | **21/32** | **Acceptable-alto (66 %)** |

## Design Specificity Verdict
Mixto. Auténtico en el centro (sello DGI con ITBMS y B/., pantallas reales de SmartGate con leyendas de gobernanza); genérico arriba (esferas 3D de «plataforma tecnológica», sin una sola pantalla de producto en la portada) y las tres páginas de producto son la misma plantilla. El detector CLI no encontró nada que llegue a las cuatro páginas (sus 3 hallazgos son de /rc-group y de las propuestas). En el navegador marcó sombras anchas con borde fino en menús y chips (cierto, tratamiento estándar de flotantes), mosaico de icono sobre h3 en Servicios legales (cierto) y «cramped-padding» en botones (falso positivo: alto fijo de 40/48 px).

## Priority Issues
- [P0] Bloqueos de honestidad previos al lanzamiento: «[CONFIRMAR CON PRODUCTO]» visible en RRHH; /api/demo solo escribe en consola mientras el éxito promete respuesta en un día hábil; ficha del FYJ-F1 de ejemplo como si fuera real. → harden
- [P1] Del audit: lo que está debajo de la primera pantalla queda con visibility:hidden hasta el scroll, así que el teclado salta del hero al pie y no llega al formulario. → harden
- [P1] La portada no muestra producto y las capturas reales están vacías e ilegibles a 550 px. → layout
- [P1] El camino de conversión se rompe entre páginas: el CTA de producto lleva a /#demo con el interés por defecto equivocado; sin CTA fijo en el celular. → onboard
- [P2] Arquitectura de la portada diluida (legal entre productos y la prueba DGI; Gobierno y Distribuidores seguidos). → distill
- [P2] Sello DGI: tapa el total, el arco corta «CE», 10 px de scroll horizontal en el celular. → polish

## Persona Red Flags
- Jordan: capas de marca confusas; nunca se dice que el precio se cotiza por empresa o sucursal.
- Riley: enlaces muertos a «#»; contacto acepta «abc»; sin enlace para saltar al contenido; chips 3D en movimiento antes del CTA en el orden de Tab.
- Casey: portada de 9 038 px; primer producto bajo el pliegue; botones de 40 px; sin CTA persistente.
- Dueño de joyería en el celular: la tarjeta «Precio por peso de oro» no habla de oro; no se menciona que funciona sin internet.

## Minor Observations
Talleres repite el módulo de taller; CUFE en ceros; «tema oscuro» listado como beneficio; pie compacto sin WhatsApp ni correo; el chip del terminal tapa la pantalla.

## Questions
1. ¿Qué perdería un joyero si las esferas desaparecieran, y qué ganaría si ahí viera el precio por peso de oro?
2. ¿Por qué la página de producto manda a su visitante más motivado a otra página para convertir?
3. ¿Los servicios legales son la razón de compra? Si sí, van dentro de la prueba DGI; si no, ¿van en la portada?
4. ¿Qué prueba honesta reemplaza a clientes y cifras antes del lanzamiento: el PAC homologado, años operando, un asesor con nombre y cara?
