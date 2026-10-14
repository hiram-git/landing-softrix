// Fondo interactivo: una retícula de puntos (papel técnico) que se aparta,
// se tiñe de `brand` y se enlaza alrededor del puntero. Sin puntero (o en
// pantallas táctiles) un punto virtual recorre el campo despacio para que el
// fondo siga vivo. Con prefers-reduced-motion se pinta la retícula quieta.
//
// Los colores salen de tokens.css (--ink, --brand, --on-brand…): ningún hex aquí.
// Cada <canvas data-fondo> es una instancia; `data-tono` elige la paleta.

type RGB = [number, number, number];

interface Paleta {
  base: RGB; // punto en reposo
  acento: RGB; // punto bajo el puntero y malla
  brillo: RGB; // halo bajo el puntero
  alfaBase: number;
  alfaMax: number;
  alfaBrillo: number;
}

const ESPACIO = 28; // px entre puntos
const RADIO = 1.1; // radio en reposo
const RADIO_MAX = 2.4; // radio bajo el puntero
const ALCANCE = 190; // radio de influencia del puntero
const EMPUJE = 14; // cuánto se aparta un punto
const RIGIDEZ = 0.14; // muelle de vuelta
const AMORTIGUACION = 0.76;
const UMBRAL_MALLA = 0.22; // influencia mínima para enlazar dos puntos
const CUBETAS = 12; // niveles de influencia para pintar por lotes
const TAU = Math.PI * 2;

function token(nombre: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(nombre).trim();
}

function rgbDeToken(nombre: string, respaldo: RGB): RGB {
  const v = token(nombre);
  const hex = /^#([0-9a-f]{6})$/i.exec(v);
  if (hex) {
    const n = Number.parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const rgb = /rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/.exec(v);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  return respaldo;
}

function paleta(tono: string): Paleta {
  if (tono === "oscuro") {
    // Sobre brand-deep: puntos en on-brand-muted, acento blanco, halo rojo.
    return {
      base: rgbDeToken("--on-brand-muted", [243, 217, 215]),
      acento: rgbDeToken("--on-brand", [255, 255, 255]),
      brillo: rgbDeToken("--brand", [229, 35, 26]),
      alfaBase: 0.16,
      alfaMax: 0.85,
      alfaBrillo: 0.22,
    };
  }
  return {
    base: rgbDeToken("--ink", [26, 20, 20]),
    acento: rgbDeToken("--brand", [229, 35, 26]),
    brillo: rgbDeToken("--brand", [229, 35, 26]),
    alfaBase: 0.11,
    alfaMax: 0.8,
    alfaBrillo: 0.08,
  };
}

const mezclar = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const rgba = (c: RGB, a: number) =>
  `rgba(${c[0].toFixed(0)},${c[1].toFixed(0)},${c[2].toFixed(0)},${a.toFixed(3)})`;

// Puntero compartido por todas las instancias (coordenadas de ventana).
const puntero = { x: 0, y: 0, activo: false };
const tactil = window.matchMedia("(pointer: coarse)").matches;
const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!tactil) {
  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType === "touch") return;
      puntero.x = e.clientX;
      puntero.y = e.clientY;
      puntero.activo = true;
    },
    { passive: true },
  );
  // Al salir de la ventana, el campo vuelve a su recorrido ambiental.
  document.documentElement.addEventListener("mouseleave", () => {
    puntero.activo = false;
  });
  window.addEventListener("blur", () => {
    puntero.activo = false;
  });
}

class Campo {
  private ctx: CanvasRenderingContext2D;
  private pal: Paleta;
  private ancho = 0;
  private alto = 0;
  private cols = 0;
  private filas = 0;
  private origenX = 0;
  private origenY = 0;
  // Desplazamiento y velocidad de cada punto, e influencia del último cuadro.
  private dx = new Float32Array(0);
  private dy = new Float32Array(0);
  private vx = new Float32Array(0);
  private vy = new Float32Array(0);
  private inf = new Float32Array(0);
  // Puntero suavizado, en coordenadas del canvas.
  private px = -1e4;
  private py = -1e4;
  private cuadro = 0;
  private visible = true;
  private semilla = Math.random() * 1000;

  constructor(
    private canvas: HTMLCanvasElement,
    tono: string,
  ) {
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("canvas 2d no disponible");
    this.ctx = ctx;
    this.pal = paleta(tono);
    this.medir();

    const remedir = () => this.medir();
    if (canvas.parentElement && getComputedStyle(canvas).position === "absolute") {
      new ResizeObserver(remedir).observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", remedir);
    }
    // Un canvas fuera de pantalla no gasta cuadros.
    new IntersectionObserver(
      ([e]) => {
        this.visible = e.isIntersecting;
        if (this.visible) this.arrancar();
      },
      { threshold: 0 },
    ).observe(canvas);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) this.arrancar();
    });
    sinMovimiento.addEventListener("change", () => {
      this.medir();
      this.arrancar();
    });
    this.arrancar();
  }

  private medir() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.ancho = Math.max(1, Math.round(rect.width));
    this.alto = Math.max(1, Math.round(rect.height));
    this.canvas.width = Math.round(this.ancho * dpr);
    this.canvas.height = Math.round(this.alto * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.cols = Math.ceil(this.ancho / ESPACIO) + 2;
    this.filas = Math.ceil(this.alto / ESPACIO) + 2;
    // La retícula queda centrada: los puntos sobrantes se reparten en los bordes.
    this.origenX = (this.ancho - (this.cols - 1) * ESPACIO) / 2;
    this.origenY = (this.alto - (this.filas - 1) * ESPACIO) / 2;
    const n = this.cols * this.filas;
    this.dx = new Float32Array(n);
    this.dy = new Float32Array(n);
    this.vx = new Float32Array(n);
    this.vy = new Float32Array(n);
    this.inf = new Float32Array(n);
    this.dibujar();
  }

  private arrancar() {
    if (this.cuadro || sinMovimiento.matches || !this.visible || document.hidden) return;
    const paso = (t: number) => {
      this.cuadro = 0;
      if (!this.visible || document.hidden) return;
      this.simular(t);
      this.dibujar();
      this.cuadro = requestAnimationFrame(paso);
    };
    this.cuadro = requestAnimationFrame(paso);
  }

  /** A dónde quiere ir el puntero: el real, o el recorrido ambiental. */
  private objetivo(t: number): [number, number] {
    if (puntero.activo) {
      const r = this.canvas.getBoundingClientRect();
      return [puntero.x - r.left, puntero.y - r.top];
    }
    const s = (t + this.semilla * 1000) / 1000;
    return [
      this.ancho * (0.5 + 0.4 * Math.sin(s * 0.21) * Math.cos(s * 0.05)),
      this.alto * (0.5 + 0.34 * Math.sin(s * 0.17 + 1.3)),
    ];
  }

  private simular(t: number) {
    const [ox, oy] = this.objetivo(t);
    // El puntero suavizado sigue al objetivo con un pequeño retraso.
    const suavidad = puntero.activo ? 0.22 : 0.035;
    this.px += (ox - this.px) * suavidad;
    this.py += (oy - this.py) * suavidad;

    const { cols, filas, dx, dy, vx, vy, inf } = this;
    for (let f = 0; f < filas; f++) {
      const y0 = this.origenY + f * ESPACIO;
      for (let c = 0; c < cols; c++) {
        const i = f * cols + c;
        const x0 = this.origenX + c * ESPACIO;
        const ddx = x0 - this.px;
        const ddy = y0 - this.py;
        const d = Math.hypot(ddx, ddy);
        let tx = 0;
        let ty = 0;
        let fuerza = 0;
        if (d < ALCANCE) {
          const k = 1 - d / ALCANCE;
          fuerza = k * k;
          const inv = (EMPUJE * fuerza) / (d || 1);
          tx = ddx * inv;
          ty = ddy * inv;
        }
        inf[i] = fuerza;
        vx[i] = (vx[i] + (tx - dx[i]) * RIGIDEZ) * AMORTIGUACION;
        vy[i] = (vy[i] + (ty - dy[i]) * RIGIDEZ) * AMORTIGUACION;
        dx[i] += vx[i];
        dy[i] += vy[i];
      }
    }
  }

  private dibujar() {
    const { ctx, cols, filas, dx, dy, inf, pal } = this;
    ctx.clearRect(0, 0, this.ancho, this.alto);
    const animado = !sinMovimiento.matches;

    // Halo bajo el puntero.
    if (animado && this.px > -ALCANCE) {
      const g = ctx.createRadialGradient(this.px, this.py, 0, this.px, this.py, ALCANCE * 1.15);
      g.addColorStop(0, rgba(pal.brillo, pal.alfaBrillo));
      g.addColorStop(1, rgba(pal.brillo, 0));
      ctx.fillStyle = g;
      ctx.fillRect(this.px - ALCANCE * 1.2, this.py - ALCANCE * 1.2, ALCANCE * 2.4, ALCANCE * 2.4);
    }

    // Puntos, agrupados por nivel de influencia para cambiar de color pocas veces.
    const trazos: Path2D[] = [];
    for (let b = 0; b < CUBETAS; b++) trazos.push(new Path2D());
    for (let f = 0; f < filas; f++) {
      const y0 = this.origenY + f * ESPACIO;
      for (let c = 0; c < cols; c++) {
        const i = f * cols + c;
        const k = animado ? inf[i] : 0;
        const b = Math.min(CUBETAS - 1, Math.round(k * (CUBETAS - 1)));
        const r = RADIO + (RADIO_MAX - RADIO) * k;
        const x = this.origenX + c * ESPACIO + dx[i];
        const y = y0 + dy[i];
        trazos[b].moveTo(x + r, y);
        trazos[b].arc(x, y, r, 0, TAU);
      }
    }
    for (let b = 0; b < CUBETAS; b++) {
      const k = b / (CUBETAS - 1);
      ctx.fillStyle = rgba(
        mezclar(pal.base, pal.acento, k),
        pal.alfaBase + (pal.alfaMax - pal.alfaBase) * k,
      );
      ctx.fill(trazos[b]);
    }

    // Malla: los puntos bajo el puntero se enlazan con sus vecinos.
    if (!animado) return;
    const lineas: Path2D[] = [];
    const NL = 6;
    for (let b = 0; b < NL; b++) lineas.push(new Path2D());
    let hayLineas = false;
    for (let f = 0; f < filas; f++) {
      for (let c = 0; c < cols; c++) {
        const i = f * cols + c;
        if (inf[i] < UMBRAL_MALLA) continue;
        const x = this.origenX + c * ESPACIO + dx[i];
        const y = this.origenY + f * ESPACIO + dy[i];
        const vecinos = [c + 1 < cols ? i + 1 : -1, f + 1 < filas ? i + cols : -1];
        for (const j of vecinos) {
          if (j < 0 || inf[j] < UMBRAL_MALLA) continue;
          const k = Math.min(inf[i], inf[j]);
          const b = Math.min(NL - 1, Math.floor(((k - UMBRAL_MALLA) / (1 - UMBRAL_MALLA)) * NL));
          const cj = j % cols;
          const fj = (j - cj) / cols;
          lineas[b].moveTo(x, y);
          lineas[b].lineTo(
            this.origenX + cj * ESPACIO + dx[j],
            this.origenY + fj * ESPACIO + dy[j],
          );
          hayLineas = true;
        }
      }
    }
    if (!hayLineas) return;
    ctx.lineWidth = 1;
    for (let b = 0; b < NL; b++) {
      const k = (b + 1) / NL;
      ctx.strokeStyle = rgba(pal.acento, 0.5 * k);
      ctx.stroke(lineas[b]);
    }
  }
}

for (const canvas of document.querySelectorAll<HTMLCanvasElement>("canvas[data-fondo]")) {
  try {
    new Campo(canvas, canvas.dataset.tono ?? "claro");
  } catch {
    // Sin canvas 2d el fondo simplemente no se pinta.
  }
}
