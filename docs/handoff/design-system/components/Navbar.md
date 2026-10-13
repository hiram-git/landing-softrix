Barra de navegación principal de 72px con el logotipo horizontal a 32px, los menús de rcgpty.com y hasta dos acciones a la derecha. Un enlace con `children` se convierte en submenú que abre al pasar el cursor o con foco de teclado; en la landing va fija (`sticky`) y entonces lleva `shadow-md`.

- `logoSrc` es `assets/Logos/rcg-softrix-horizontal.png` en tema claro y el inverso en tema oscuro; el consumidor aporta la ruta.
- Menús: Servicios Legales (submenú), RCG Softrix (submenú: Facturación, RRHH, Control de accesos), Sector Gobierno, Equipos, Blog, Contáctenos. El enlace actual lleva `aria-current="page"` y la barra `brand` inferior.
- Cada entrada de submenú admite `hint`: una línea en `caption` que dice qué resuelve («Vende, factura ante la DGI y controla caja»).
- `primary` es «Solicitar demo»; `secondary`, «Iniciar sesión».
- En móvil el consumidor colapsa los menús en un panel con grupos; este componente cubre tableta y escritorio.
