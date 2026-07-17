/* ==========================================================================
   AMARILLO — script.js
   - Slideshow de fotografías de fondo (fade in/out, 8-12s por foto)
   - Revelado del poema estrofa por estrofa
   - Partículas / luces difuminadas suaves
   - Transición desde la portada al poema
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * 1. POEMA
   *    Cada elemento del array es una estrofa. El último es el cierre.
   * ------------------------------------------------------------------ */
  const ESTROFAS = [
    `Si hay que ser certero<br>Te pienso ser sincero<br>Cuando no estás<br>Te anhelo`,
    `Te prometí una rosa por cada vez que te piense<br>A quien engaño…<br>Te vivo pensando<br>No hay momento que no estés en mi cabeza`,
    `Esos ojos marrones<br>Y lo digo con certeza<br>Me fascinan cada vez más<br>No me voy a cansar de verlos, jamás`,
    `Tu flequillo mal cortado<br>El mismo que odias,<br>El que para vos, se puede arreglar<br>Para mí, sos perfecta tal cual`,
    `Tus cachetes rojos<br>Es lo que más me encanta<br>El lo que me llamo la atención<br>Un día los vi y nunca lo pienso dejar de hacer`,
    `Tu cintura<br>La cual mis manos le gusta recorrer<br>Aunque vos digas que no tenes<br>Yo siempre la miraré`,
    `Tu personalidad explosiva<br>Esa intensidad que te caracteriza<br>La cual me fascina desde nuestro punto de partida<br>La razón por la que me enamoré`,
    `Una pocas de las tantas razones para amarte<br>Como no puedo enumerarlas<br>Destacó las más importantes<br>Me fascina cada parte de vos`,
    `Quiero que nos conozcamos<br>Conocer tu vida<br>Que vos seas parte de la mía<br>No pensé que esto sería lo que sentiría`,
    `Conectamos desde el primer día que hablamos<br>Eso es algo que siempre destaco<br>Me fascinó como no había sentido nada<br>Hasta que estuve a tu lado`,
    `Ahí me percaté de lo que quería<br>Quería que conozcas mi vida<br>Quería que fueras parte de la misma<br>Que no seas una serie de una temporada`,
    `Que no seamos pochi y lombardo<br>Porque no terminan juntos<br>Quiero que seamos nosotros mismos<br>Hagamos juntos….`,
    `<span class="verso-final">La película de nuestras vidas</span>`
  ];

  const poemaEl = document.getElementById('poema');
  ESTROFAS.forEach(html => {
    const p = document.createElement('p');
    p.className = 'estrofa';
    p.innerHTML = html;
    poemaEl.appendChild(p);
  });

  /* ------------------------------------------------------------------ *
   * 2. SLIDESHOW DE FOTOGRAFÍAS
   *    Coloca tus imágenes foto1.jpg ... foto5.jpg (o las que quieras)
   *    en la MISMA carpeta que index.html. El script prueba
   *    automáticamente hasta 20 fotos y usa solo las que existan.
   * ------------------------------------------------------------------ */
  const CANTIDAD_MAXIMA_A_PROBAR = 20;
  const EXTENSIONES = ['jpg', 'jpeg', 'png', 'webp'];
  const DURACION_MIN = 8000;   // 8s
  const DURACION_MAX = 12000;  // 12s
  const fondoFotos = document.getElementById('fondo-fotos');

  function probarImagen(ruta) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(ruta);
      img.onerror = () => resolve(null);
      img.src = ruta;
    });
  }

  async function detectarFotos() {
    const candidatas = [];
    for (let i = 1; i <= CANTIDAD_MAXIMA_A_PROBAR; i++) {
      EXTENSIONES.forEach(ext => candidatas.push(`foto${i}.${ext}`));
    }
    const resultados = await Promise.all(candidatas.map(probarImagen));
    return resultados.filter(Boolean);
  }

  function duracionAleatoria() {
    return DURACION_MIN + Math.random() * (DURACION_MAX - DURACION_MIN);
  }

  function iniciarSlideshow(fotos) {
    if (!fotos.length) return;

    fotos.forEach(src => {
      const capa = document.createElement('div');
      capa.className = 'foto-capa';
      capa.style.backgroundImage = `url("${src}")`;
      fondoFotos.appendChild(capa);
    });

    const capas = Array.from(fondoFotos.querySelectorAll('.foto-capa'));
    let indice = 0;
    capas[0].classList.add('activa');

    if (capas.length < 2) return; // una sola foto: se queda fija

    function siguiente() {
      const anterior = indice;
      indice = (indice + 1) % capas.length;
      capas[indice].classList.add('activa');
      capas[anterior].classList.remove('activa');
      setTimeout(siguiente, duracionAleatoria());
    }

    setTimeout(siguiente, duracionAleatoria());
  }

  detectarFotos().then(iniciarSlideshow);

  /* ------------------------------------------------------------------ *
   * 3. PARTÍCULAS / LUCES DIFUMINADAS
   * ------------------------------------------------------------------ */
  const canvas = document.getElementById('particulas');
  const ctx = canvas.getContext('2d');
  let particulas = [];
  let ancho, alto;

  function redimensionar() {
    ancho = canvas.width = window.innerWidth;
    alto = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', redimensionar);
  redimensionar();

  function crearParticulas(cantidad) {
    particulas = [];
    for (let i = 0; i < cantidad; i++) {
      particulas.push({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        r: 1 + Math.random() * 2.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.05 - Math.random() * 0.14,
        alpha: 0.08 + Math.random() * 0.22,
        fase: Math.random() * Math.PI * 2
      });
    }
  }

  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CANTIDAD_PARTICULAS = reducirMovimiento ? 0 : 34;
  crearParticulas(CANTIDAD_PARTICULAS);

  function dibujarParticulas(t) {
    ctx.clearRect(0, 0, ancho, alto);
    particulas.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      const parpadeo = 0.6 + 0.4 * Math.sin(t / 1400 + p.fase);

      if (p.y < -10) { p.y = alto + 10; p.x = Math.random() * ancho; }
      if (p.x < -10) p.x = ancho + 10;
      if (p.x > ancho + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 201, 138, ${p.alpha * parpadeo})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(216, 169, 78, 0.6)';
      ctx.fill();
    });
    if (!reducirMovimiento) requestAnimationFrame(dibujarParticulas);
  }
  if (!reducirMovimiento) requestAnimationFrame(dibujarParticulas);

  /* ------------------------------------------------------------------ *
   * 4. TRANSICIÓN PORTADA -> POEMA
   * ------------------------------------------------------------------ */
  const portada = document.getElementById('portada');
  const escenario = document.getElementById('escenario');
  const btnEntrar = document.getElementById('btn-entrar');

  function entrarAlPoema() {
    portada.classList.add('oculto');
    escenario.classList.remove('oculto');
    // forzar reflow para que la transición de opacidad se aplique
    void escenario.offsetWidth;
    escenario.classList.add('visible');
    revelarEstrofas();
  }

  btnEntrar.addEventListener('click', entrarAlPoema);

  /* ------------------------------------------------------------------ *
   * 5. REVELADO DE ESTROFAS AL HACER SCROLL
   * ------------------------------------------------------------------ */
  function revelarEstrofas() {
    const estrofas = document.querySelectorAll('.poema .estrofa');

    // Primera estrofa visible de inmediato
    estrofas.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 220 * i + 150);
    });

    const observador = new IntersectionObserver(
      entradas => {
        entradas.forEach(entrada => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    estrofas.forEach(el => observador.observe(el));
  }

})();
