import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const productos = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/productos" }),
  schema: z.object({
    nombre: z.string(),
    destino: z.string(),
    titular: z.string(),
    resumen: z.string(),
    descripcion: z.string(),
    modulos: z.array(z.object({ titulo: z.string(), texto: z.string() })).min(3),
    paraQuien: z.array(z.string()).min(1),
    proximamente: z.array(z.string()).default([]),
  }),
});

export const collections = { productos };
