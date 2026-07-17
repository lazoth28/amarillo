# Amarillo

Página web para mostrar el poema **"Amarillo"** de forma elegante y cinematográfica, con fotografías de fondo que van cambiando lentamente detrás del texto.

Hecha en HTML, CSS y JavaScript puro — sin frameworks ni dependencias que instalar.

## Estructura

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── img/              ← tus fotos van acá
└── audio/            ← tu canción (opcional) va acá
```

## Cómo agregar tus fotos

1. Copiá tus fotografías dentro de la carpeta `img/`.
2. Nombralas `foto1.jpg`, `foto2.jpg`, `foto3.jpg`, etc. (también acepta `.jpeg`, `.png` y `.webp`).
3. No hace falta tocar el código: la página detecta automáticamente cuántas fotos hay (prueba hasta `foto20`) y arma el slideshow sola.
4. Cada foto queda entre 8 y 12 segundos en pantalla, con una transición suave de aparición y desaparición.

Si no cargás ninguna foto, la página igual funciona: se ve con un fondo oscuro con un leve resplandor dorado.

## Cómo agregar música (opcional)

1. Poné tu canción en formato `.mp3` dentro de la carpeta `audio/`, por ejemplo `audio/cancion.mp3`.
2. Abrí `index.html`, buscá el bloque comentado cerca del final del `<body>` y sacale los comentarios:

```html
<audio autoplay loop>
    <source src="audio/cancion.mp3" type="audio/mpeg">
</audio>
```

> Nota: la mayoría de los navegadores bloquean el autoplay con sonido hasta que el usuario interactúa con la página (por ejemplo al tocar el botón "reproducir" de la portada), así que es normal que la música arranque recién después de ese primer click.

## Cómo publicarlo en GitHub Pages

1. Creá un repositorio en GitHub y subí todos estos archivos manteniendo la misma estructura de carpetas.
2. Andá a **Settings → Pages** en el repositorio.
3. En "Source" elegí la rama `main` (o `master`) y la carpeta `/ (root)`.
4. Guardá. En un par de minutos tu página va a estar publicada en:
   `https://tu-usuario.github.io/nombre-del-repositorio/`

No necesita build, ni Node, ni ningún paso extra: es HTML, CSS y JS plano, listo para servir tal cual.

## Detalles técnicos

- **Responsive**: probado para celular, tablet y escritorio.
- **Accesibilidad**: respeta `prefers-reduced-motion` (si el usuario tiene desactivadas las animaciones en su sistema, la página reduce el movimiento) y tiene foco visible en el botón principal.
- **Sin dependencias externas** más allá de la tipografía (Google Fonts: Cormorant Garamond + Jost), que se puede descargar y alojar localmente si preferís no depender de una CDN.
