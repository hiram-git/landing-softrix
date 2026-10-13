export {};

// Levanta la API (Elysia) y el sitio (Astro) juntos; Ctrl+C detiene los dos.
//
// Se usa process.execPath (el mismo bun que corre este script) en vez de "bun" o
// "bunx" por nombre: en Windows, Bun.spawn no encuentra "bunx" en el PATH
// (ENOENT, uv_spawn 'bunx'). `bun x` es el equivalente de `bunx`.
const bun = process.execPath;

const procesos = [
  Bun.spawn([bun, "--watch", "api/index.ts"], { stdout: "inherit", stderr: "inherit" }),
  Bun.spawn([bun, "x", "astro", "dev", ...process.argv.slice(2)], {
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit",
    // Astro 7 se va a segundo plano si detecta un agente; aquí tiene que quedarse.
    env: { ...process.env, ASTRO_DEV_BACKGROUND: "0" },
  }),
];

const detener = () => {
  for (const p of procesos) p.kill();
  process.exit(0);
};
process.on("SIGINT", detener);
process.on("SIGTERM", detener);

await Promise.race(procesos.map((p) => p.exited));
detener();
