Cabecera de la landing y de cada página de producto: etiquetas opcionales, eyebrow en `label`, titular en `display-xl` con línea de acento `brand`, bajada en `body-lg` y dos acciones. Lo que haya en `children` ocupa la columna derecha (una captura real del producto) y baja debajo del texto a menos de 960 px.

- Titular de una frase que diga qué resuelve; máximo dos líneas a 1200 px.
- La landing usa el fondo claro; las páginas de producto usan `dark` (fondo `brand-deep`) con `badges` para el alcance.
- `primary` es la única conversión y va en 48 px; `secondary` se renderiza en `ghost` en claro y en `secondary-inverse` en oscuro, nunca con el mismo peso que la primaria. `secondaryVariant="whatsapp"` solo si WhatsApp es la conversión principal.
- `note` aclara el compromiso: «Sin tarjeta. Demo guiada de 30 minutos».
- El logotipo no se repite dentro del hero: ya está en la `Navbar`.
