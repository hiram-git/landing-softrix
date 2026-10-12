# Landing de Softrix

Sitio público de Softrix (RC Group): Softrix Facturación, Softrix Planilla y Softrix
Control de Entrada. Sitio estático con **Astro 7** y **Bun**.

```bash
bun install
bun run dev       # desarrollo en http://localhost:4321
bun run build     # genera dist/ (sitio estático)
bun run preview   # sirve dist/
bun run check     # tipos (astro check)
bun run lint      # Biome
```

Compilar requiere Node ≥ 22.12, porque el CLI de Astro corre con Node.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Dominio, WhatsApp y correo (**marcadores**) | `src/config/site.ts` |
| Nombres y frase de cada producto en menús | `src/config/site.ts` (`productos`) |
| Contenido de cada página de producto | `src/content/productos/*.md` |
| Colores, tipografías y ritmo | `src/styles/tokens.css` |
| Logotipo y favicons | `public/brand/` |
| Plan del sitio y decisiones | `PLAN.md` |
| Contexto del producto | `PRODUCT.md` |

Las páginas se generan como `/facturacion.html`, etc. El hosting tiene que servir las
URL sin la extensión, como hacen Cloudflare Pages, Netlify y `astro preview`.
