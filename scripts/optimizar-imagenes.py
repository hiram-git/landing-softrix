"""Genera las versiones WebP de las capturas y del logo que sirve el sitio.

Uso (desde la raíz del repo; requiere Pillow):  python3 -I scripts/optimizar-imagenes.py

Cada captura se muestra con object-fit: cover anclado arriba y una proporción fija
(16:10, 4:3, 16:11). Aquí se recorta a esa misma proporción, se reduce a 640 y 1280 px
de ancho y se guarda en WebP: la página se ve igual y descarga una fracción. Los PNG
originales se quedan como fuente (y los usan las propuestas).
"""

from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
CAPTURAS = RAIZ / "public" / "screenshots"
LOGOS = RAIZ / "public" / "logos"
ANCHOS = (640, 1280)
CALIDAD = 82

# captura → proporción (ancho / alto) con que la muestran las páginas de producto.
PROPORCIONES = {
    "facturacion-panel": 16 / 10,
    "facturacion-factura": 4 / 3,
    "rrhh-panel": 16 / 10,
    "rrhh-empleado": 16 / 10,
    "smartgate-tablero": 16 / 10,
    "smartgate-accesos": 16 / 11,
    "smartgate-visitante": 16 / 11,
}


def recortar(img: Image.Image, proporcion: float) -> Image.Image:
    """El mismo recorte que object-fit: cover con object-position: 50% 0%."""
    ancho, alto = img.size
    if ancho / alto > proporcion:
        nuevo = round(alto * proporcion)
        izquierda = (ancho - nuevo) // 2
        return img.crop((izquierda, 0, izquierda + nuevo, alto))
    return img.crop((0, 0, ancho, round(ancho / proporcion)))


def guardar(img: Image.Image, destino: Path) -> None:
    img.save(destino, "WEBP", quality=CALIDAD, method=6)
    print(f"{destino.relative_to(RAIZ)}  {img.size[0]}×{img.size[1]}  {destino.stat().st_size // 1024} KB")


for nombre, proporcion in PROPORCIONES.items():
    with Image.open(CAPTURAS / f"{nombre}.png") as original:
        base = recortar(original.convert("RGB"), proporcion)
        for ancho in ANCHOS:
            ancho_final = min(ancho, base.size[0])
            alto_final = round(ancho_final / proporcion)
            guardar(base.resize((ancho_final, alto_final), Image.LANCZOS), CAPTURAS / f"{nombre}-{ancho}.webp")

# Recortes de la portada: un detalle de cada captura a un tamaño en que se lee, no la
# pantalla entera reducida. Caja (izquierda, arriba, derecha, abajo) en px del PNG original,
# siempre en 16:10, que es la proporción del marco de las tarjetas de producto.
RECORTES = {
    "facturacion-panel": (418, 118, 1554, 828),  # saludo y los indicadores del día y del mes
    "rrhh-panel": (390, 80, 1130, 543),  # planilla en curso y sus indicadores
    "smartgate-accesos": (112, 100, 872, 575),  # Departamento de Accesos: Autorizar / Denegar
}

for nombre, caja in RECORTES.items():
    with Image.open(CAPTURAS / f"{nombre}.png") as original:
        detalle = original.convert("RGB").crop(caja)
        for ancho in ANCHOS:
            ancho_final = min(ancho, detalle.size[0])
            alto_final = round(ancho_final * 10 / 16)
            guardar(detalle.resize((ancho_final, alto_final), Image.LANCZOS), CAPTURAS / f"{nombre}-portada-{ancho}.webp")

# Logo de la barra y del pie: se pinta a 28–34 px de alto; 480 px de ancho cubre 2x.
for nombre in ("rcg-softrix-horizontal-inverse", "rcg-softrix-horizontal"):
    with Image.open(LOGOS / f"{nombre}.png") as original:
        logo = original.convert("RGBA")
        alto = round(logo.size[1] * 480 / logo.size[0])
        guardar(logo.resize((480, alto), Image.LANCZOS), LOGOS / f"{nombre}.webp")
