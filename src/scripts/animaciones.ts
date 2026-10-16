// Movimiento del sitio con GSAP. Sigue BRAND.md: entradas cortas que suben 16 px
// con la curva del design system, sin rebotes ni efectos que tapen el contenido.
// Con prefers-reduced-motion no se anima nada y el contenido aparece tal cual.
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// cubic-bezier(0.2, 0.7, 0.2, 1) de sx-enter ≈ power2.out
const SALIDA = "power2.out";
const raiz = document.documentElement;

/** Lo que el <head> escondió para revelarlo (ver Base.astro). */
const REVELAR = "[data-revelar], [data-revelar-grupo] > *";

/** Alto de la barra fija que se ve (Navbar en escritorio, MobileMenu en móvil). */
function alturaCabecera() {
  const barra = [...document.querySelectorAll<HTMLElement>(".sx-nav, .movil__barra")].find(
    (n) => n.offsetParent !== null,
  );
  return barra?.offsetHeight ?? 0;
}

// ── Cabecera fija: la sombra aparece solo al desplazarse ─────────────────
function cabeceraFija() {
  const barras = document.querySelectorAll<HTMLElement>(".sx-nav--sticky, .movil");
  let pendiente = false;
  const actualizar = () => {
    pendiente = false;
    const desplazada = window.scrollY > 8;
    for (const b of barras) b.toggleAttribute("data-desplazada", desplazada);
  };
  window.addEventListener(
    "scroll",
    () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(actualizar);
    },
    { passive: true },
  );
  actualizar();
}

// ── Desplazamiento suave a anclas, descontando la cabecera fija ──────────
function anclas(animar: boolean) {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const enlace = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
    if (!enlace) return;
    const url = new URL(enlace.href, location.href);
    if (url.pathname !== location.pathname || !url.hash || url.hash === "#") return;
    const destino = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!destino) return;
    e.preventDefault();
    history.pushState(null, "", url.hash);
    const y = destino.getBoundingClientRect().top + window.scrollY - alturaCabecera() - 16;
    if (animar) gsap.to(window, { scrollTo: y, duration: 0.7, ease: "power3.inOut" });
    else window.scrollTo(0, y);
    // El foco viaja con la vista (lectores de pantalla y teclado).
    if (!destino.hasAttribute("tabindex")) destino.setAttribute("tabindex", "-1");
    destino.focus({ preventScroll: true });
  });
}

// ── Revelado de secciones al entrar en pantalla ─────────────────────────
function revelar() {
  for (const el of document.querySelectorAll<HTMLElement>("[data-revelar]")) {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.48,
        ease: SALIDA,
        // Sin estilos en línea al terminar: el CSS vuelve a mandar (p. ej. la
        // opacidad de un producto atenuado por el selector de segmento).
        clearProps: "transform,opacity,visibility",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    );
  }
  for (const grupo of document.querySelectorAll<HTMLElement>("[data-revelar-grupo]")) {
    // «amplio»: las tarjetas suben desde 50 px una a una (stagger 0,15 s), como en /rc-group.
    const amplio = grupo.dataset.revelarGrupo === "amplio";
    gsap.fromTo(
      grupo.children,
      { autoAlpha: 0, y: amplio ? 50 : 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: amplio ? 0.85 : 0.48,
        ease: amplio ? "power3.out" : SALIDA,
        stagger: amplio ? 0.15 : 0.08,
        clearProps: "transform,opacity,visibility",
        scrollTrigger: { trigger: grupo, start: "top 85%", once: true },
      },
    );
  }
}

// ── Captura del hero: un leve desfase al desplazarse ────────────────────
function paralaje() {
  for (const aside of document.querySelectorAll<HTMLElement>(".sx-hero__aside")) {
    gsap.to(aside, {
      y: -32,
      ease: "none",
      scrollTrigger: {
        trigger: aside.closest(".sx-hero"),
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  }
}

// ── Submenús de la Navbar: aparecen deslizando en lugar de saltar ───────
function submenus() {
  for (const item of document.querySelectorAll<HTMLElement>(".sx-nav__item")) {
    const menu = item.querySelector<HTMLElement>(".sx-nav__menu");
    if (!menu) continue;
    let abierto = false;
    const abrir = () => {
      if (abierto) return;
      abierto = true;
      gsap.fromTo(
        menu,
        { autoAlpha: 0, y: -6 },
        { autoAlpha: 1, y: 0, duration: 0.18, ease: SALIDA },
      );
      gsap.fromTo(
        menu.querySelectorAll("li"),
        { autoAlpha: 0, x: -4 },
        { autoAlpha: 1, x: 0, duration: 0.2, ease: SALIDA, stagger: 0.03, delay: 0.04 },
      );
    };
    const cerrar = () => {
      // El CSS lo oculta con display:none; solo hay que olvidar el estado.
      if (!item.matches(":hover, :focus-within")) abierto = false;
    };
    item.addEventListener("pointerenter", abrir);
    item.addEventListener("focusin", abrir);
    item.addEventListener("pointerleave", cerrar);
    item.addEventListener("focusout", () => requestAnimationFrame(cerrar));
  }
}

// ── Botones y tarjetas ───────────────────────────────────────────────────
function botones() {
  for (const boton of document.querySelectorAll<HTMLElement>(".sx-btn")) {
    const flecha = boton.querySelector<SVGElement>(".sx-btn__flecha");
    const chat = boton.classList.contains("sx-btn--whatsapp") ? boton.querySelector("svg") : null;
    boton.addEventListener("pointerenter", () => {
      if (flecha) gsap.to(flecha, { x: 4, duration: 0.2, ease: SALIDA });
      if (chat)
        gsap.fromTo(chat, { rotate: -14 }, { rotate: 0, duration: 0.5, ease: "back.out(3)" });
    });
    boton.addEventListener("pointerleave", () => {
      if (flecha) gsap.to(flecha, { x: 0, duration: 0.2, ease: SALIDA });
      gsap.to(boton, { scale: 1, duration: 0.2, ease: SALIDA });
    });
    // Respuesta al pulsar: se hunde un poco y vuelve.
    boton.addEventListener("pointerdown", () => gsap.to(boton, { scale: 0.97, duration: 0.08 }));
    const soltar = () => gsap.to(boton, { scale: 1, duration: 0.3, ease: "back.out(2.5)" });
    boton.addEventListener("pointerup", soltar);
    boton.addEventListener("pointercancel", soltar);
  }

  // La tarjeta de producto se eleva 2 px; la sombra la pone components.css.
  for (const tarjeta of document.querySelectorAll<HTMLElement>(".sx-card")) {
    tarjeta.addEventListener("pointerenter", () =>
      gsap.to(tarjeta, { y: -2, duration: 0.2, ease: SALIDA }),
    );
    tarjeta.addEventListener("pointerleave", () =>
      gsap.to(tarjeta, { y: 0, duration: 0.2, ease: SALIDA }),
    );
  }

  // El icono de la tarjeta hace zoom al pasar el cursor por ella.
  for (const tarjeta of document.querySelectorAll<HTMLElement>(".sx-card, .sx-feature")) {
    const icono = tarjeta.querySelector<HTMLElement>(".sx-card__icon, .sx-feature__icon");
    if (!icono) continue;
    tarjeta.addEventListener("pointerenter", () =>
      gsap.to(icono, { scale: 1.15, duration: 0.35, ease: "back.out(2.5)" }),
    );
    tarjeta.addEventListener("pointerleave", () =>
      gsap.to(icono, { scale: 1, duration: 0.25, ease: SALIDA }),
    );
  }
}

// ── Titular del hero: las palabras entran una a una y la línea roja crece ─
function titular() {
  for (const h1 of document.querySelectorAll<HTMLElement>(".sx-hero__title")) {
    const palabras = h1.querySelectorAll(".sx-hero__palabra");
    if (!palabras.length) continue;
    gsap.fromTo(
      palabras,
      { autoAlpha: 0, y: 18 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: SALIDA,
        stagger: 0.05,
        delay: 0.1,
        clearProps: "transform,opacity,visibility",
      },
    );
    gsap.fromTo(h1, { "--regla": 0 }, { "--regla": 1, duration: 0.56, ease: SALIDA, delay: 0.35 });
  }
}

// ── La captura del hero se inclina hacia el puntero ─────────────────────
function inclinacion() {
  const limitar = (v: number) => Math.max(-0.75, Math.min(0.75, v));
  for (const el of document.querySelectorAll<HTMLElement>("[data-tilt]")) {
    const zona = el.closest<HTMLElement>(".sx-hero") ?? el;
    gsap.set(el, { transformPerspective: 1200 });
    const rotX = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    const rotY = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    zona.addEventListener(
      "pointermove",
      (e) => {
        const r = el.getBoundingClientRect();
        const px = limitar((e.clientX - r.left) / r.width - 0.5);
        const py = limitar((e.clientY - r.top) / r.height - 0.5);
        rotY(px * 10);
        rotX(-py * 8);
      },
      { passive: true },
    );
    zona.addEventListener("pointerleave", () => {
      rotX(0);
      rotY(0);
    });
  }
}

// ── Botones grandes magnéticos: se acercan al puntero cuando está cerca ──
function magneticos() {
  const ALCANCE = 40;
  const TOPE = 10;
  const botones = [...document.querySelectorAll<HTMLElement>(".sx-btn--lg")].map((b) => ({
    b,
    x: gsap.quickTo(b, "x", { duration: 0.45, ease: "power3.out" }),
    y: gsap.quickTo(b, "y", { duration: 0.45, ease: "power3.out" }),
    cerca: false,
  }));
  if (!botones.length) return;
  window.addEventListener(
    "pointermove",
    (e) => {
      for (const m of botones) {
        const r = m.b.getBoundingClientRect();
        if (!r.width) continue;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const cerca = Math.abs(dx) < r.width / 2 + ALCANCE && Math.abs(dy) < r.height / 2 + ALCANCE;
        if (cerca) {
          // Proporcional a la distancia, con tope: un gesto, no un salto.
          m.x(Math.max(-TOPE, Math.min(TOPE, dx * 0.16)));
          m.y(Math.max(-TOPE, Math.min(TOPE, dy * 0.16)));
        } else if (m.cerca) {
          m.x(0);
          m.y(0);
        }
        m.cerca = cerca;
      }
    },
    { passive: true },
  );
}

// ── Foco de luz dentro de las tarjetas (ver .sx-card::before en global.css) ─
function focoEnTarjetas() {
  document.addEventListener(
    "pointermove",
    (e) => {
      const tarjeta = (e.target as HTMLElement).closest?.<HTMLElement>(".sx-card, .sx-feature");
      if (!tarjeta) return;
      const r = tarjeta.getBoundingClientRect();
      tarjeta.style.setProperty("--mx", `${e.clientX - r.left}px`);
      tarjeta.style.setProperty("--my", `${e.clientY - r.top}px`);
    },
    { passive: true },
  );
}

// ── Transición entre páginas: el contenido sale antes de navegar ────────
function transicionDePagina() {
  const main = document.querySelector("main");
  if (!main) return;
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    const enlace = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
    if (!enlace || enlace.target || enlace.hasAttribute("download")) return;
    const url = new URL(enlace.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    if (url.pathname.startsWith("/api/")) return;
    e.preventDefault();
    gsap.to(main, {
      autoAlpha: 0,
      y: -8,
      duration: 0.2,
      ease: "power1.in",
      onComplete: () => location.assign(url.href),
    });
  });
  // Al volver con «Atrás» la página puede salir del bfcache ya desvanecida.
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) gsap.set(main, { clearProps: "opacity,visibility,transform" });
  });
}

// ── Formulario de demo: el estado de éxito entra en lugar de aparecer ───
function demo() {
  document.addEventListener("demo:enviada", (e) => {
    const exito = (e as CustomEvent<HTMLElement>).detail;
    gsap.fromTo(
      exito,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.4, ease: SALIDA },
    );
    gsap.fromTo(
      exito.children,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.36, ease: SALIDA, stagger: 0.06, delay: 0.08 },
    );
  });
}

const mm = gsap.matchMedia();
mm.add(
  {
    animar: "(prefers-reduced-motion: no-preference)",
    reducir: "(prefers-reduced-motion: reduce)",
  },
  (ctx) => {
    if (ctx.conditions?.reducir) {
      gsap.set(REVELAR, { clearProps: "all" });
      return;
    }
    revelar();
    paralaje();
  },
);

const animar = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
const punteroFino = window.matchMedia("(pointer: fine)").matches;
cabeceraFija();
anclas(animar);
if (animar) {
  titular();
  submenus();
  botones();
  transicionDePagina();
  demo();
  if (punteroFino) {
    inclinacion();
    magneticos();
    focoEnTarjetas();
  }
}

// Las animaciones tomaron el control: el <head> ya no necesita su respaldo.
raiz.dataset.animListo = "";
raiz.classList.remove("anima");
