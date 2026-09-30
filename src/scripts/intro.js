// Intro cinemática: 4 cenas controladas pela rolagem + saída que vira a hero.
// Roteiro e tempos: plano-intro-cinematica.md. Sem botão de pular (pedido de Armin em 24/09). Sem som, sem vídeo: tudo em canvas.
// Fundo: mapa real de Miami (cityMap.js, plano-mapa-real-intro.md). Se o mapa não carregar, roda o fundo desenhado por código (plano B).
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { US_OUTLINE, COVERAGE, pointInPolygon } from './usa.js';
import { loadCityMap, decodeCityMap, createCityView } from './cityMap.js';

const APWA = ['#E8412C', '#F5B800', '#FF7A1A', '#2E7BFF', '#2ECC71']; // elétrica, gás, telecom, água, esgoto
const STATUS = {
  waiting: { color: '#F5B800', label: 'WAITING ON LOCATE' },
  cleared: { color: '#3C82EB', label: 'CLEARED' },
  renewal: { color: '#73D4F7', label: 'RENEWAL DUE' },
  active: { color: '#2ECC71', label: 'ACTIVE' },
};

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p, a, b) => clamp((p - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

export function initIntro(lenis) {
  const root = document.documentElement;
  const stage = document.querySelector('[data-stage]');
  if (!stage) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!root.classList.contains('intro-on')) {
    // Sem intro: hero já no estado final (as imagens do produto são estáticas).
    return;
  }

  try {
    build(stage, lenis);
  } catch (err) {
    console.error('Intro failed, showing hero directly.', err);
    root.classList.remove('intro-on');
    gsap.set('[data-nav], [data-hero-copy] > *, [data-hero-product]', { clearProps: 'all' });
  }
}

function build(stage, lenis) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const q = (s) => stage.querySelector(s);
  const qa = (s) => [...stage.querySelectorAll(s)];
  const nav = document.querySelector('[data-nav]');
  const navLockup = document.querySelector('[data-nav-lockup]');
  const canvasWrap = q('[data-intro-canvas-wrap]');
  const canvas = q('[data-intro-canvas]');
  const ctx = canvas.getContext('2d');
  const ctxMain = ctx;
  const scenes = qa('.scene');
  const brandLockup = q('[data-brand-lockup]');
  const brandPin = q('[data-brand-pin]');
  const brandWord = q('[data-brand-word]');
  const tagline = q('[data-brand-tagline]');
  const ui = q('[data-intro-ui]');
  const steps = qa('[data-intro-steps] li');
  const cue = q('[data-intro-cue]');
  const heroCopy = qa('[data-hero-copy] > *');
  const introLangs = q('[data-intro-langs]'); // seletor de idioma da intro
  const product = q('[data-hero-product]'); // imagens do produto na hero (entram no fim da intro)
  const pinEl = q('[data-stage-pin]');
  const proofEl = q('[data-proof-value]');
  const proofBox = q('[data-proof-target]');
  const proofTarget = Number(proofBox.dataset.proofTarget);
  const proofDec = Number(proofBox.dataset.proofDecimals);
  const proofLocale = proofBox.dataset.proofLocale || 'en-US';
  const fmt = (v) => v.toLocaleString(proofLocale, { minimumFractionDigits: proofDec, maximumFractionDigits: proofDec });
  const credit = q('[data-intro-credit]');

  /* ---------------- Canvas: mundo ---------------- */
  let W = 0, H = 0, dpr = 1, mobile = false;
  let base = null; // ruas e utilidades pré-renderizadas
  let world = null;
  let usDots = [];
  let converge = [];
  const particles = [];
  let flashT = -1;
  let usBox = null, usMiami = null;

  // Fundo: 'wait' (mapa baixando), 'map' (mapa real) ou 'proc' (plano B desenhado por código)
  let mode = 'wait', mapRaw = null, cityMap = null, view = null, worldT0 = performance.now(), mapShown = false;
  function setMode(m) {
    if (mode !== 'wait') return;
    mode = m; worldT0 = performance.now();
    if (W) { makeWorld(); makeBase(); }
    wake();
  }
  loadCityMap().then((m) => { mapRaw = m; setMode('map'); }).catch((err) => { console.warn('City map unavailable, using drawn background.', err); setMode('proc'); });
  setTimeout(() => setMode('proc'), 6000);

  function makeWorld() {
    if (mode === 'wait') { world = null; return; }
    if (mode === 'map') {
      if (!cityMap) { world = null; return; } // ainda não decodificado (acontece depois da entrada do texto)
      if (view) view.dispose();
      // A camada de longe (cena 3) só é montada com a intro parada, 2,5 s depois do mapa aparecer
      view = createCityView(cityMap, { W, H, dpr, mobile, canWork: () => !running && mapShown && performance.now() - worldT0 > 2500 });
      if (mapShown) view.work(1e9); // mudança de tamanho de tela: remonta na hora, sem piscar
      world = { path: view.route, utils: view.utils, pins: view.pins, center: { x: view.R0[0], y: view.R0[1] } };
      return;
    }
    const r = rng(811);
    const streets = [];
    const nH = mobile ? 5 : 6, nV = mobile ? 4 : 7;
    for (let i = 0; i < nH; i++) {
      const y0 = (0.1 + (i / (nH - 1)) * 0.85) * H + (r() - 0.5) * 40;
      const A = 8 + r() * 30, f = (1 + r() * 1.6) * Math.PI * 2 / W, ph = r() * 6;
      const pts = [];
      for (let x = -60; x <= W + 60; x += 24) pts.push([x, y0 + A * Math.sin(x * f + ph)]);
      streets.push(pts);
    }
    for (let j = 0; j < nV; j++) {
      const x0 = (0.05 + (j / (nV - 1)) * 0.9) * W + (r() - 0.5) * 50;
      const A = 8 + r() * 26, f = (1 + r() * 1.4) * Math.PI * 2 / H, ph = r() * 6;
      const pts = [];
      for (let y = -60; y <= H + 60; y += 24) pts.push([x0 + A * Math.sin(y * f + ph), y]);
      streets.push(pts);
    }
    const culs = [];
    for (let k = 0; k < (mobile ? 4 : 8); k++) {
      const s = streets[Math.floor(r() * streets.length)];
      const p = s[Math.floor(s.length * (0.2 + r() * 0.6))];
      const ang = r() * Math.PI * 2, len = 40 + r() * 40;
      culs.push({ x: p[0], y: p[1], ex: p[0] + Math.cos(ang) * len, ey: p[1] + Math.sin(ang) * len });
    }

    // Trajetória HDD (esquerda para a direita, terço inferior da tela)
    const P0 = [-0.05 * W, (mobile ? 0.8 : 0.74) * H];
    const P1 = [0.3 * W, (mobile ? 0.88 : 0.84) * H];
    const P2 = [0.62 * W, (mobile ? 0.66 : 0.6) * H];
    const P3 = [1.05 * W, (mobile ? 0.74 : 0.68) * H];
    const raw = [];
    for (let i = 0; i <= 320; i++) {
      const t = i / 320, u = 1 - t;
      raw.push([
        u * u * u * P0[0] + 3 * u * u * t * P1[0] + 3 * u * t * t * P2[0] + t * t * t * P3[0],
        u * u * u * P0[1] + 3 * u * u * t * P1[1] + 3 * u * t * t * P2[1] + t * t * t * P3[1],
      ]);
    }
    const acc = [0];
    for (let i = 1; i < raw.length; i++) acc.push(acc[i - 1] + Math.hypot(raw[i][0] - raw[i - 1][0], raw[i][1] - raw[i - 1][1]));
    const total = acc[acc.length - 1];
    const path = raw.map((p, i) => ({ x: p[0], y: p[1], t: acc[i] / total }));
    const at = (t) => {
      let i = path.findIndex((p) => p.t >= t);
      if (i <= 0) return path[Math.max(0, i)];
      const a = path[i - 1], b = path[i], k = (t - a.t) / (b.t - a.t || 1);
      return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), t };
    };

    // Utilidades: linhas quase verticais que a perfuração cruza, nas cores APWA
    const utils = [];
    const xs = mobile ? [0.16, 0.38, 0.6, 0.82] : [0.18, 0.34, 0.5, 0.66, 0.82];
    xs.forEach((fx, i) => {
      const x0 = fx * W, A = 10 + r() * 14, f = (1.2 + r()) * Math.PI * 2 / H, ph = r() * 6;
      const fn = (y) => x0 + A * Math.sin(y * f + ph);
      const pts = [];
      for (let y = 0.42 * H; y <= H + 30; y += 12) pts.push([fn(y), y]);
      let cross = null;
      for (let k = 1; k < path.length; k++) {
        const a = path[k - 1], b = path[k];
        if ((a.x - fn(a.y)) * (b.x - fn(b.y)) <= 0) { cross = b; break; }
      }
      utils.push({ color: APWA[i % APWA.length], pts, cross });
    });

    const pinTs = mobile ? [0.16, 0.4, 0.63, 0.86] : [0.1, 0.23, 0.36, 0.49, 0.62, 0.75, 0.88];
    const pins = pinTs.map((t, i) => ({ ...at(t), i, up: i % 2 === 0, last: null, changed: 0 }));

    world = { streets, culs, path, utils, pins, at, center: at(0.5) };
  }

  function makeBase() {
    if (mode !== 'proc') return;
    base = document.createElement('canvas');
    base.width = W * dpr; base.height = H * dpr;
    const b = base.getContext('2d');
    b.scale(dpr, dpr);
    b.lineCap = 'round'; b.lineJoin = 'round';
    b.strokeStyle = 'rgba(115,212,247,0.055)'; b.lineWidth = mobile ? 9 : 12;
    world.streets.forEach((s) => { b.beginPath(); s.forEach(([x, y], i) => (i ? b.lineTo(x, y) : b.moveTo(x, y))); b.stroke(); });
    world.culs.forEach((c) => { b.beginPath(); b.moveTo(c.x, c.y); b.lineTo(c.ex, c.ey); b.stroke(); b.beginPath(); b.arc(c.ex, c.ey, 11, 0, Math.PI * 2); b.fillStyle = 'rgba(115,212,247,0.05)'; b.fill(); });
    b.strokeStyle = 'rgba(115,212,247,0.13)'; b.lineWidth = 1;
    world.streets.forEach((s) => { b.beginPath(); s.forEach(([x, y], i) => (i ? b.lineTo(x, y) : b.moveTo(x, y))); b.stroke(); });
    b.setLineDash([3, 7]); b.lineWidth = 1.6;
    world.utils.forEach((u) => { b.strokeStyle = hexA(u.color, 0.26); b.beginPath(); u.pts.forEach(([x, y], i) => (i ? b.lineTo(x, y) : b.moveTo(x, y))); b.stroke(); });
    b.setLineDash([]);
  }

  function makeUS() {
    const cosLat = Math.cos((38 * Math.PI) / 180);
    const proj = (lon, lat) => [(lon + 96) * cosLat, -(lat - 37.5)];
    const step = mobile ? 1.05 : 0.78;
    const pts = [];
    for (let lat = 24.5; lat <= 49.5; lat += step) for (let lon = -125; lon <= -66.5; lon += step / cosLat * 0.92) {
      if (pointInPolygon(lon, lat, US_OUTLINE)) pts.push({ lon, lat, p: proj(lon, lat) });
    }
    // Caixa do mapa na tela
    const minX = proj(-125, 0)[0], maxX = proj(-66.5, 0)[0], minY = proj(0, 49.5)[1], maxY = proj(0, 24.5)[1];
    const bw = mobile ? W * 0.9 : W * 0.5, bh = mobile ? H * 0.32 : H * 0.6;
    const s = Math.min(bw / (maxX - minX), bh / (maxY - minY));
    const cx = mobile ? W * 0.5 : W * 0.7, cy = mobile ? H * 0.74 : H * 0.54;
    const ox = cx - ((maxX + minX) / 2) * s, oy = cy - ((maxY + minY) / 2) * s;
    usBox = { cx, cy };
    const mp = proj(-80.1937, 25.7743); // Miami: onde a cidade do mapa vira um ponto
    usMiami = { x: ox + mp[0] * s, y: oy + mp[1] * s };
    usDots = pts.map((d) => {
      let lit = -1;
      COVERAGE.forEach(([lo, la], k) => {
        if (lit < 0 && Math.hypot((d.lon - lo) * cosLat, d.lat - la) < 1.5) lit = k;
      });
      return { x: ox + d.p[0] * s, y: oy + d.p[1] * s, lit, cx, cy };
    });
    const r = rng(33);
    const litDots = usDots.filter((d) => d.lit >= 0);
    const others = usDots.filter((d) => d.lit < 0);
    const n = mobile ? 90 : 150;
    converge = [];
    for (let i = 0; i < n; i++) {
      const src = i < litDots.length ? litDots[i] : others[Math.floor(r() * others.length)];
      converge.push({ src, delay: r() * 0.3, tu: r(), tv: r(), size: 1.2 + r() * 1.6 });
    }
    // Alvos dentro da silhueta do pin (círculo no topo + ponta embaixo)
    converge.forEach((c) => {
      let u, v, ok = false, guard = 0;
      while (!ok && guard++ < 60) {
        u = r(); v = r();
        const inCircle = Math.hypot(u - 0.5, (v - 0.37) * (840 / 624)) < 0.5;
        const inTip = v > 0.5 && Math.abs(u - 0.5) < 0.42 * (1 - (v - 0.5) / 0.5);
        ok = inCircle || inTip;
      }
      c.tu = u; c.tv = v;
    });
  }

  function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  function resize(force) {
    const w = canvasWrap.clientWidth, h = canvasWrap.clientHeight;
    if (!force && Math.abs(w - W) < 2 && Math.abs(h - H) < 120) return;
    W = w; H = h; dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2) * quality);
    mobile = W < 768;
    canvas.width = W * dpr; canvas.height = H * dpr;
    makeUS(); makeWorld(); makeBase();
    wake();
  }

  /* ---------------- Canvas: desenho por progresso ---------------- */
  const t0 = performance.now();
  let prevP = 0;

  function drawPin(x, y, color, a, s = 1, ctx = ctxMain) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.translate(x, y);
    ctx.scale(s, s);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-4, -6, -8, -10, -8, -15);
    ctx.arc(0, -15, 8, Math.PI, 0);
    ctx.bezierCurveTo(8, -10, 4, -6, 0, 0);
    ctx.fillStyle = color; ctx.fill();
    ctx.beginPath(); ctx.arc(0, -15, 3, 0, Math.PI * 2); ctx.fillStyle = '#03102B'; ctx.fill();
    ctx.restore();
  }

  function drawChip(x, y, text, color, a, ctx = ctxMain) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.font = `700 ${mobile ? 9 : 10}px "Geist Mono", ui-monospace, monospace`;
    const w = ctx.measureText(text).width + 14, h = mobile ? 18 : 20;
    x = clamp(x, w / 2 + 8, W - w / 2 - 8);
    const rx = x - w / 2, ry = y - h / 2;
    ctx.fillStyle = 'rgba(3,16,43,0.9)';
    ctx.strokeStyle = color; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(rx, ry, w, h, 3) : ctx.rect(rx, ry, w, h); ctx.fill(); ctx.stroke();
    ctx.fillStyle = color; ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
    ctx.fillText(text, x, y + 0.5);
    ctx.restore();
  }

  function pinStatus(i, p) {
    const few = world.pins.length <= 4;
    const f = 0.27 + i * (few ? 0.024 : 0.013);
    const special = few ? 2 : 4;
    if (p < f) return 'waiting';
    if (i === special) { if (p < 0.345) return 'cleared'; if (p < 0.372) return 'renewal'; return 'active'; }
    return 'cleared';
  }

  // Plano B: fundo desenhado por código (o de antes do mapa real)
  function renderProc(p, now, wt) {
    const c = world.center;
    // Brilho de fundo perto da perfuração
    const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, Math.max(W, H) * 0.7);
    g.addColorStop(0, 'rgba(32,101,213,0.20)'); g.addColorStop(1, 'rgba(3,16,43,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    // Câmera: afasta na cena 3
    const zoom = easeInOut(seg(p, 0.395, 0.475));
    const worldA = (1 - zoom) * clamp(wt / 1.2);
    const sc = lerp(1, 0.42, zoom);
    ctx.save();
    ctx.translate(c.x, c.y); ctx.scale(sc, sc); ctx.translate(-c.x, -c.y);
    ctx.globalAlpha = worldA;
    ctx.drawImage(base, 0, 0, W, H);

    if (worldA > 0.01) {
      // Perfuração HDD (desenha sozinha um pouco no carregamento e segue com a rolagem)
      const auto = easeOut(clamp((wt - 0.6) / 1.6)) * 0.1;
      const d = Math.max(auto, seg(p, 0.015, 0.16));
      const path = world.path;
      const n = path.findIndex((pt) => pt.t >= d);
      const upto = n < 0 ? path.length : n;

      // Utilidades cruzadas acendem na cor certa
      world.utils.forEach((u) => {
        if (!u.cross || d < u.cross.t) return;
        const k = clamp((d - u.cross.t) / 0.05);
        ctx.save();
        ctx.globalAlpha = worldA * (0.35 + 0.55 * (1 - k));
        ctx.strokeStyle = u.color; ctx.lineWidth = 2 + 2 * (1 - k); ctx.shadowColor = u.color; ctx.shadowBlur = 14 * (1 - k) + 4;
        ctx.beginPath(); u.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke();
        ctx.restore();
        if (k < 1) {
          ctx.save(); ctx.globalAlpha = worldA * (1 - k);
          ctx.strokeStyle = u.color; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(u.cross.x, u.cross.y, 6 + 34 * k, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }
      });

      if (upto > 1) {
        ctx.save();
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.strokeStyle = '#2065D5'; ctx.lineWidth = mobile ? 4 : 5; ctx.shadowColor = '#44A4EE'; ctx.shadowBlur = 16;
        ctx.beginPath(); for (let i = 0; i < upto; i++) (i ? ctx.lineTo(path[i].x, path[i].y) : ctx.moveTo(path[i].x, path[i].y)); ctx.stroke();
        ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 1.2; ctx.stroke();
        const h = path[upto - 1];
        if (d < 0.999) {
          const hg = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 26);
          hg.addColorStop(0, 'rgba(255,255,255,0.9)'); hg.addColorStop(0.25, 'rgba(115,212,247,0.5)'); hg.addColorStop(1, 'rgba(115,212,247,0)');
          ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(h.x, h.y, 26, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }

      // Cena 2: pins de ticket mudando de status
      world.pins.forEach((pin, i) => {
        const a = easeOut(seg(p, 0.205 + i * (world.pins.length <= 4 ? 0.02 : 0.011), 0.225 + i * (world.pins.length <= 4 ? 0.02 : 0.011)));
        if (a <= 0) return;
        const st = pinStatus(i, p);
        if (pin.last !== st) { if (pin.last) pin.changed = now; pin.last = st; }
        const S = STATUS[st];
        const pulse = clamp((now - pin.changed) / 650);
        if (pin.changed && pulse < 1) {
          ctx.save(); ctx.globalAlpha = worldA * (1 - pulse); ctx.strokeStyle = S.color; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(pin.x, pin.y - 15, 10 + 22 * pulse, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
        }
        drawPin(pin.x, pin.y - (1 - a) * 18, S.color, worldA * a, mobile ? 0.9 : 1);
        const ly = pin.up ? pin.y - 44 : pin.y + 22;
        drawChip(pin.x, ly, S.label, S.color, worldA * a);
      });
    }
    ctx.restore();

  }

  // Perfuração e utilidades sobre o mapa (coordenadas de repouso -> tela). Sem shadowBlur: o brilho é um traço largo e transparente, bem mais leve.
  function drawDrill(g, X, Y, d) {
    const path = world.path;
    const n = path.findIndex((pt) => pt.t >= d);
    const upto = n < 0 ? path.length : n;
    // Ponta exatamente em d (entre dois pontos da rua): sem isso a ponta pulava de esquina em esquina
    let h = path[Math.max(0, upto - 1)];
    if (upto > 0 && upto < path.length) {
      const a = path[upto - 1], b = path[upto], f = (d - a.t) / (b.t - a.t || 1);
      h = { x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f) };
    }
    g.save();
    g.lineCap = 'round'; g.lineJoin = 'round';
    world.utils.forEach((u) => {
      if (d < u.cross.t) return;
      const k = clamp((d - u.cross.t) / 0.05);
      g.beginPath(); u.pts.forEach(([x, y], i) => (i ? g.lineTo(X(x), Y(y)) : g.moveTo(X(x), Y(y))));
      g.strokeStyle = u.color;
      g.globalAlpha = 0.1 + 0.25 * (1 - k); g.lineWidth = 8 + 10 * (1 - k); g.stroke();
      g.globalAlpha = 0.35 + 0.55 * (1 - k); g.lineWidth = 2 + 2 * (1 - k); g.stroke();
      if (k < 1) {
        g.globalAlpha = 1 - k; g.lineWidth = 2;
        g.beginPath(); g.arc(X(u.cross.x), Y(u.cross.y), 6 + 34 * k, 0, Math.PI * 2); g.stroke();
      }
    });
    if (upto > 0) {
      g.globalAlpha = 1;
      g.beginPath(); for (let i = 0; i < upto; i++) (i ? g.lineTo(X(path[i].x), Y(path[i].y)) : g.moveTo(X(path[i].x), Y(path[i].y)));
      g.lineTo(X(h.x), Y(h.y));
      g.strokeStyle = 'rgba(68,164,238,0.22)'; g.lineWidth = mobile ? 12 : 14; g.stroke();
      g.strokeStyle = '#2065D5'; g.lineWidth = mobile ? 4 : 5; g.stroke();
      g.strokeStyle = 'rgba(255,255,255,0.85)'; g.lineWidth = 1.2; g.stroke();
      if (d < 0.999) {
        const hx = X(h.x), hy = Y(h.y);
        const hg = g.createRadialGradient(hx, hy, 0, hx, hy, 26);
        hg.addColorStop(0, 'rgba(255,255,255,0.9)'); hg.addColorStop(0.25, 'rgba(115,212,247,0.5)'); hg.addColorStop(1, 'rgba(115,212,247,0)');
        g.fillStyle = hg; g.fillRect(hx - 26, hy - 26, 52, 52);
      }
    }
    g.restore();
  }

  function drawPins(g, X, Y, p, now, alpha, size) {
    const few = world.pins.length <= 4;
    world.pins.forEach((pin, i) => {
      const a = easeOut(seg(p, 0.205 + i * (few ? 0.02 : 0.011), 0.225 + i * (few ? 0.02 : 0.011)));
      if (a <= 0 || alpha <= 0.01) return;
      const st = pinStatus(i, p);
      if (pin.last !== st) { if (pin.last) pin.changed = now; pin.last = st; }
      const S = STATUS[st];
      const x = X(pin.x), y = Y(pin.y);
      const pulse = clamp((now - pin.changed) / 650);
      if (pin.changed && pulse < 1) {
        g.save(); g.globalAlpha = alpha * (1 - pulse); g.strokeStyle = S.color; g.lineWidth = 2;
        g.beginPath(); g.arc(x, y - 15 * size, (10 + 22 * pulse) * size, 0, Math.PI * 2); g.stroke(); g.restore();
      }
      drawPin(x, y - (1 - a) * 18, S.color, alpha * a, size, g);
      const ly = pin.up ? y - 44 * size : y + 22 * size;
      if (size > 0.75) drawChip(x, ly, S.label, S.color, alpha * a, g);
    });
  }

  // Mapa real: fundo pronto + preenchimento azul + perfuração + pins; na cena 3 a cidade encolhe até o ponto de Miami.
  // Em repouso, o fundo (com o brilho) é uma imagem opaca colada 1:1; no afastamento, uma imagem pronta com rota, azul e recorte redondo.
  let creditA = '';
  function renderCity(p, now, wt) {
    const v = view;
    const appear = easeOut(clamp(wt / 1.2));
    const zoom = easeInOut(seg(p, 0.395, 0.48));
    const sEnd = 12 / v.lengthPx;
    const s = Math.exp(Math.log(sEnd) * zoom);
    const mapIn = easeOut(seg(p, 0.43, 0.49));
    const ms = lerp(1.16, 1, mapIn);
    const tgt = usMiami ? [usBox.cx + (usMiami.x - usBox.cx) * ms, usBox.cy + (usMiami.y - usBox.cy) * ms] : v.R0;
    const drift = W * 0.025 * (1 - 2 * seg(p, 0, 0.39));
    const A = [lerp(v.R0[0] + drift, tgt[0], zoom), lerp(v.R0[1], tgt[1], zoom)];
    const X = (x) => A[0] + (x - v.R0[0]) * s, Y = (y) => A[1] + (y - v.R0[1]) * s;
    const cityA = appear * (1 - seg(zoom, 0.85, 1));
    const m = clamp((1 - s) / 0.12); // recorte redondo: esconde as bordas do mapa quando a câmera afasta
    const ca = (cityA * (1 - seg(zoom, 0, 0.3))).toFixed(2);
    if (credit && ca !== creditA) { credit.style.opacity = ca; creditA = ca; }
    if (cityA <= 0.005) return;

    const g = ctx;
    g.save();
    // Fundo do mapa e área já liberada (azul)
    const T = seg(p, 0.215, 0.375);
    v.setFill(T);
    const atRest = v.drawBg(g, X, Y, s, dpr, m, cityA);
    g.globalAlpha = cityA;

    if (atRest) {
      // Frente do preenchimento: trechos sendo pintados agora, mais claros
      if (T > 0 && T < 1) {
        const k = v.S0 * s;
        g.setTransform(dpr * k, 0, 0, dpr * k, dpr * (A[0] - v.M0[0] * k), dpr * (A[1] - v.M0[1] * k));
        const front = new Path2D();
        const list = cityMap.byStart;
        let lo = 0, hi = list.length; // primeiro trecho com t0 >= T - maior trecho
        const from = T - cityMap.maxSpan;
        while (lo < hi) { const mid = (lo + hi) >> 1; if (list[mid].t0 < from) lo = mid + 1; else hi = mid; }
        for (let i = lo; i < list.length && list[i].t0 <= T; i++) {
          const sg = list[i];
          if (sg.t1 <= T) continue;
          const f = sg.t1 > sg.t0 ? (T - sg.t0) / (sg.t1 - sg.t0) : 1;
          front.moveTo(sg.x1, sg.y1); front.lineTo(lerp(sg.x1, sg.x2, f), lerp(sg.y1, sg.y2, f));
        }
        g.lineCap = 'round'; g.strokeStyle = 'rgba(115,212,247,0.9)'; g.lineWidth = (mobile ? 1.5 : 1.8) / k;
        g.stroke(front);
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      const auto = easeOut(clamp((wt - 0.6) / 1.6)) * 0.12;
      const d = lerp(v.tIn, 1, Math.max(auto, seg(p, 0.015, 0.16)));
      drawDrill(g, X, Y, d);
    } else {
      // Afastando: brilho azul em volta da cidade, só na área do brilho
      const gr = Math.max(W, H) * 0.6 * Math.max(s, 0.05);
      const glow = g.createRadialGradient(A[0], A[1], 0, A[0], A[1], gr);
      glow.addColorStop(0, `rgba(32,101,213,${0.16 + 0.3 * zoom})`); glow.addColorStop(1, 'rgba(32,101,213,0)');
      g.fillStyle = glow; g.fillRect(A[0] - gr, A[1] - gr, gr * 2, gr * 2);
    }
    const pinK = seg(zoom, 0, 0.25);
    drawPins(g, X, Y, p, now, cityA * (1 - pinK), (mobile ? 0.9 : 1) * lerp(1, 0.6, pinK));
    g.restore();

    // Escala gráfica e norte (somem quando a câmera começa a afastar)
    const ua = appear * (1 - seg(zoom, 0, 0.12)) * 0.8;
    if (ua > 0.01) {
      const bx = mobile ? 16 : 28, by = H - (mobile ? 30 : 34);
      const L = 152.4 * v.S0; // 500 pés
      ctx.save();
      ctx.globalAlpha = ua;
      ctx.strokeStyle = 'rgba(199,218,235,0.6)'; ctx.fillStyle = 'rgba(199,218,235,0.6)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(bx, by - 4); ctx.lineTo(bx, by); ctx.lineTo(bx + L, by); ctx.lineTo(bx + L, by - 4); ctx.stroke();
      ctx.font = `700 ${mobile ? 9 : 10}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
      ctx.fillText('500 FT', bx + L + 8, by - 1);
      const nx = bx + 4, ny = by - 26;
      ctx.beginPath(); ctx.moveTo(nx, ny - 7); ctx.lineTo(nx + 4, ny + 3); ctx.lineTo(nx, ny + 1); ctx.lineTo(nx - 4, ny + 3); ctx.closePath(); ctx.fill();
      ctx.fillText('N', nx + 9, ny - 1);
      ctx.restore();
    }
  }

  function render(now) {
    const p = tl.progress();
    const wt = (now - worldT0) / 1000;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalAlpha = 1;
    // Com o mapa parado na tela, a camada opaca dele já cobre tudo: não precisa pintar o fundo antes
    // Mapa: a camada de perto é montada aos poucos (uma etapa por quadro) depois que o texto da cena 1 entrou.
    // Quando fica pronta, o mapa aparece e a perfuração começa a andar (worldT0).
    // Tudo isso só começa quando a entrada do texto da cena 1 terminou (nada se mexe na tela nesse momento)
    const mapReady = mode === 'map' && view && view.isReady();
    if (mode === 'map' && !mapReady && now - t0 > 1700) {
      if (!cityMap) { cityMap = decodeCityMap(mapRaw); makeWorld(); }
      else if (view && view.work(6) && !mapShown) { mapShown = true; worldT0 = now; }
    }
    const covered = mapReady && wt >= 1.2 && p <= 0.395;
    if (!covered) { ctx.fillStyle = '#03102B'; ctx.fillRect(0, 0, W, H); }

    if (mapReady && mapShown) renderCity(p, now, (now - worldT0) / 1000);
    else if (mode === 'proc' && world) renderProc(p, now, wt);
    else if (credit && creditA !== '0') { credit.style.opacity = '0'; creditA = '0'; }

    // Cena 3: mapa dos EUA em pontos, cobertura acendendo
    const mapIn = easeOut(seg(p, 0.43, 0.49));
    const mapOut = seg(p, 0.63, 0.7);
    const conv = seg(p, 0.635, 0.715);
    if (mapIn > 0 && converge.length) {
      const ms = lerp(1.16, 1, mapIn);
      const cx = usDots[0].cx, cy = usDots[0].cy;
      const tx = (x) => cx + (x - cx) * ms, ty = (y) => cy + (y - cy) * ms;
      const r0 = mobile ? 1.2 : 1.5;
      ctx.save();
      ctx.globalAlpha = mapIn * (1 - mapOut);
      ctx.fillStyle = 'rgba(115,212,247,0.36)';
      usDots.forEach((d) => { ctx.fillRect(tx(d.x) - r0, ty(d.y) - r0, r0 * 2, r0 * 2); });
      // Pontos de cobertura
      usDots.forEach((d) => {
        if (d.lit < 0) return;
        const l = easeOut(seg(p, 0.47 + d.lit * 0.0055, 0.49 + d.lit * 0.0055));
        if (l <= 0) return;
        ctx.globalAlpha = mapIn * (1 - mapOut) * l;
        ctx.fillStyle = '#44A4EE'; ctx.shadowColor = '#44A4EE'; ctx.shadowBlur = 10;
        ctx.fillRect(tx(d.x) - r0 * 1.4, ty(d.y) - r0 * 1.4, r0 * 2.8, r0 * 2.8);
      });
      // Mapa real: a cidade chega como um ponto aceso no lugar de Miami
      if (mode === 'map' && usMiami) {
        const l = easeOut(seg(p, 0.455, 0.475));
        if (l > 0) {
          const mx = tx(usMiami.x), my = ty(usMiami.y), base = mapIn * (1 - mapOut) * l;
          ctx.globalAlpha = base;
          ctx.fillStyle = '#FFFFFF'; ctx.shadowColor = '#73D4F7'; ctx.shadowBlur = 14;
          ctx.beginPath(); ctx.arc(mx, my, r0 * 1.8, 0, Math.PI * 2); ctx.fill();
          const rp = seg(p, 0.46, 0.5);
          if (rp < 1) {
            ctx.shadowBlur = 0; ctx.globalAlpha = base * (1 - rp);
            ctx.strokeStyle = '#73D4F7'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(mx, my, r0 * 2 + 22 * rp, 0, Math.PI * 2); ctx.stroke();
          }
        }
      }
      ctx.shadowBlur = 0;
      ctx.restore();

      // Cena 4: pontos voam e formam o pin da logo
      if (conv > 0) {
        const pr = brandPin.getBoundingClientRect();
        const sr = pinEl.getBoundingClientRect();
        const fade = 1 - seg(p, 0.7, 0.735);
        ctx.save();
        converge.forEach((cv) => {
          const k = easeInOut(clamp((conv * 1.35 - cv.delay)));
          const sx = tx(cv.src.x), sy = ty(cv.src.y);
          const ex = pr.left - sr.left + cv.tu * pr.width, ey = pr.top - sr.top + cv.tv * pr.height;
          const x = lerp(sx, ex, k), y = lerp(sy, ey, k);
          ctx.globalAlpha = fade * clamp(conv * 4);
          ctx.fillStyle = k > 0.9 ? '#FFFFFF' : '#73D4F7';
          const s = cv.size * (1 - 0.3 * k);
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        });
        ctx.restore();
      }
    }

    // Brilho da logo: flash curto e partículas quando a rolagem passa por 78%
    if (prevP < 0.78 && p >= 0.78) burst();
    prevP = p;
    if (flashT > 0) {
      const f = clamp((now - flashT) / 260);
      if (f < 1) {
        const pr = brandPin.getBoundingClientRect(), sr = pinEl.getBoundingClientRect();
        const x = pr.left - sr.left + pr.width / 2, y = pr.top - sr.top + pr.height * 0.4;
        const fg = ctx.createRadialGradient(x, y, 0, x, y, Math.max(W, H) * 0.6);
        fg.addColorStop(0, `rgba(160,210,255,${0.28 * (1 - f)})`); fg.addColorStop(1, 'rgba(160,210,255,0)');
        ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H);
      }
    }
    if (particles.length) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        const dt = 1 / 60;
        pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.vx *= 0.955; pt.vy = pt.vy * 0.955 + 30 * dt; pt.life -= dt * 0.9;
        if (pt.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = pt.life; ctx.fillStyle = pt.c;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.s * pt.life, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  function burst() {
    const pr = brandPin.getBoundingClientRect(), sr = pinEl.getBoundingClientRect();
    const x = pr.left - sr.left + pr.width / 2, y = pr.top - sr.top + pr.height * 0.4;
    flashT = performance.now();
    const r = rng(Math.floor(flashT));
    const n = mobile ? 60 : 96;
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2, v = 120 + r() * 420;
      particles.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, s: 1 + r() * 2.4, c: r() < 0.35 ? '#FFFFFF' : '#73D4F7' });
    }
    wake();
  }

  let raf = 0, running = false;
  // Qualidade automática: se os quadros ficarem lentos (abaixo de ~40 por segundo), o canvas baixa a resolução uma ou duas vezes
  let quality = 1, qualityT = 0, lastNow = 0;
  const gaps = [];
  function checkQuality(now) {
    if (lastNow) { const dt = now - lastNow; if (dt < 200) gaps.push(dt); }
    lastNow = now;
    if (gaps.length < 45) return;
    gaps.sort((a, b) => a - b);
    const med = gaps[22], spread = gaps[40] - gaps[4];
    gaps.length = 0;
    // 30 quadros certinhos por segundo é limite do aparelho (ex.: modo de economia de bateria), não lentidão: não mexe
    const capped = Math.abs(med - 33.3) < 2 && spread < 4;
    const native = Math.min(window.devicePixelRatio || 1, 2);
    if (med > 24 && !capped && quality > 0.5 && native * quality > 1 && now - qualityT > 2500) {
      quality = quality > 0.75 ? 0.75 : 0.5;
      qualityT = now;
      resize(true);
    }
  }
  // Algo animando por tempo (entrada do mapa, pulso dos pins, brilho da logo)?
  function busy(now) {
    if (particles.length || (flashT > 0 && now - flashT < 300)) return true;
    if (mode === 'wait') return false;
    if (mode === 'map' && (!view || !view.isReady())) return true;
    if (now - worldT0 < 3500) return true;
    return !!(world && world.pins && world.pins.some((pn) => pn.changed && now - pn.changed < 700));
  }
  function loop(now) {
    render(now);
    checkQuality(now);
    // Para de desenhar quando a animação alcançou a rolagem e nada anima por tempo (antes ficava desenhando parado no meio da intro)
    const settled = !tl.scrollTrigger || Math.abs(tl.progress() - tl.scrollTrigger.progress) < 0.0005;
    if (settled && !busy(now)) { running = false; return; }
    raf = requestAnimationFrame(loop);
  }
  function wake() {
    if (running || !tl) return;
    running = true;
    lastNow = 0;
    raf = requestAnimationFrame(loop);
  }

  /* ---------------- Texto e marca (GSAP) ---------------- */
  const words = (i) => scenes[i].querySelectorAll('.w');
  const reality = (i) => scenes[i].querySelector('.scene__reality');
  gsap.set([scenes[1], scenes[2]], { autoAlpha: 1 });
  gsap.set([...words(1), reality(1), scenes[2].querySelector('.scene__num'), ...words(2), scenes[2].querySelector('.scene__small')], { autoAlpha: 0 });
  gsap.set(brandWord, { autoAlpha: 0, letterSpacing: '0.3em' });
  gsap.set(brandPin, { autoAlpha: 0 });
  gsap.set(tagline, { autoAlpha: 0, y: 12 });
  gsap.set(nav, { y: 0, yPercent: -100, autoAlpha: 0 });
  gsap.set(navLockup, { autoAlpha: 0 });
  gsap.set(heroCopy, { autoAlpha: 0, y: 30 });
  gsap.set(product, { autoAlpha: 0, y: 30 });
  gsap.set(brandLockup, { transformOrigin: '0 0' });

  // Com "reduzir movimento" (27/09): a intro roda igual, mas o texto entra e sai só com fade, sem deslocamento nem blur.
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Entrada da cena 1 no carregamento (antes de qualquer rolagem)
  gsap.from(words(0), RM ? { autoAlpha: 0, duration: 0.9, stagger: 0.07, delay: 0.15 } : { y: 40, autoAlpha: 0, filter: 'blur(10px)', duration: 0.9, stagger: 0.07, ease: 'power3.out', delay: 0.15 });
  gsap.from(reality(0), { y: 16, autoAlpha: 0, duration: 0.8, delay: 0.75, ease: 'power3.out' });
  gsap.from(ui, { autoAlpha: 0, duration: 0.6, delay: 1 });
  if (introLangs) gsap.from(introLangs, { autoAlpha: 0, duration: 0.5, delay: 0.2 });

  // Medidas para os cortes casados (offsets ignoram transformações)
  const M = { lock: { x: 0, y: 0, s: 1 } };
  function offsetIn(el, ancestor) {
    let x = 0, y = 0, n = el;
    while (n && n !== ancestor) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x, y };
  }
  function measure() {
    const bo = offsetIn(brandLockup, pinEl);
    const no = offsetIn(navLockup, nav);
    const ls = navLockup.offsetHeight / brandLockup.offsetHeight;
    M.lock = { s: ls, x: no.x - bo.x, y: no.y - bo.y };
  }

  // Comprimento da rolagem da intro (além dos 100vh da tela fixa). Mais comprido = mais lento.
  // Desktop 2250vh (total 2350vh), celular 1650vh (total 1750vh). 3x mais lenta que a v2.4, a pedido de Armin (24/09).
  const scrollLen = () => window.innerHeight * (window.innerWidth < 768 ? 16.5 : 22.5);
  const OUT = RM ? { autoAlpha: 0, stagger: 0.25, duration: 2.5, ease: 'power2.in' } : { y: -50, autoAlpha: 0, filter: 'blur(8px)', stagger: 0.25, duration: 2.5, ease: 'power2.in' };
  const IN0 = RM ? { autoAlpha: 0 } : { y: 40, autoAlpha: 0, filter: 'blur(10px)' };
  const IN1 = RM ? { autoAlpha: 1, stagger: 0.35, duration: 3, ease: 'power3.out' } : { y: 0, autoAlpha: 1, filter: 'blur(0px)', stagger: 0.35, duration: 3, ease: 'power3.out' };
  const proxy = { v: 0 };
  const INTRO_WHEEL = 0.7;
  const setWheel = (m) => {
    if (!lenis) return;
    lenis.options.wheelMultiplier = m;
    if (lenis.virtualScroll && lenis.virtualScroll.options) lenis.virtualScroll.options.wheelMultiplier = m;
  };
  setWheel(INTRO_WHEEL);
  let seen = false;
  measure();

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => '+=' + scrollLen(),
      pin: pinEl,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefreshInit: measure,
      onUpdate: (self) => {
        const p = self.progress;
        const idx = p < 0.19 ? 0 : p < 0.41 ? 1 : p < 0.63 ? 2 : 3;
        steps.forEach((s, i) => s.classList.toggle('is-on', i === idx));
        cue.style.opacity = p < 0.03 ? '' : '0';
        wake();
        // Roda do mouse mais lenta enquanto a intro está na tela
        // 29/09: sobe da velocidade da intro para a do site aos poucos, nos últimos 8% (antes era um degrau a 0,5% do fim)
        const k = Math.min(1, Math.max(0, (p - 0.92) / 0.08));
        setWheel(INTRO_WHEEL + (0.95 - INTRO_WHEEL) * k * k * (3 - 2 * k));
        if (!seen && p > 0.97) { seen = true; try { sessionStorage.setItem('bs-intro-seen', '1'); } catch (e) {} }
      },
    },
  });

  // Cena 1 sai
  tl.to(words(0), OUT, 16).to(reality(0), { y: -30, autoAlpha: 0, duration: 2, ease: 'power2.in' }, 17)
    // Cena 2
    .fromTo(words(1), IN0, IN1, 20.5)
    .fromTo(reality(1), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 2.5, ease: 'power3.out' }, 23)
    .to(words(1), OUT, 37.5).to(reality(1), { y: -30, autoAlpha: 0, duration: 2, ease: 'power2.in' }, 38.5)
    // Cena 3: prova
    .fromTo(scenes[2].querySelector('.scene__num'), { y: 30, autoAlpha: 0, scale: 0.92, transformOrigin: '0 100%' }, { y: 0, autoAlpha: 1, scale: 1, duration: 3, ease: 'power3.out' }, 42.5)
    .to(proxy, { v: proofTarget, duration: 11, ease: 'power2.out', onUpdate: () => { proofEl.textContent = fmt(proofDec ? proxy.v : Math.round(proxy.v)); } }, 44.5)
    .fromTo(words(2), IN0, { ...IN1, stagger: 0.25 }, 45)
    .fromTo(scenes[2].querySelector('.scene__small'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 2.5, ease: 'power3.out' }, 49)
    .to([scenes[2].querySelector('.scene__num'), ...words(2), scenes[2].querySelector('.scene__small')], { ...OUT, stagger: 0.15 }, 60)
    // Cena 4: marca
    .to(brandWord, { autoAlpha: 1, letterSpacing: '0.03em', duration: 5, ease: 'power3.out' }, 66)
    .fromTo(brandWord, { filter: RM ? 'blur(0px)' : 'blur(12px)' }, { filter: 'blur(0px)', duration: 4, ease: 'power3.out' }, 66)
    .to(brandPin, { autoAlpha: 1, duration: 3 }, 70)
    .fromTo(brandWord, { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', duration: 5.5, ease: 'power1.inOut' }, 72.5)
    .fromTo(brandPin, { '--glow': 0 }, { '--glow': 1, duration: 1.5, ease: 'power4.out' }, 78)
    .to(brandPin, { scale: 1.12, duration: 1, ease: 'power2.out' }, 78)
    .to(brandPin, { scale: 1, duration: 2, ease: 'power2.inOut' }, 79)
    .to(brandPin, { '--glow': 0.5, duration: 5 }, 80)
    .to(tagline, { autoAlpha: 1, y: 0, duration: 3, ease: 'power3.out' }, 80.5)
    // Saída: a marca vai para a navbar e as imagens do produto aparecem no lugar do antigo painel do mapa
    .to(ui, { autoAlpha: 0, duration: 3 }, 86)
    .to(tagline, { autoAlpha: 0, duration: 2 }, 86)
    .to(canvasWrap, { autoAlpha: 0, duration: 5 }, 86)
    .to(product, { autoAlpha: 1, y: 0, duration: 5, ease: 'power3.out' }, 91)
    .to(brandPin, { '--glow': 0, duration: 4 }, 88)
    .to(brandLockup, { x: () => M.lock.x, y: () => M.lock.y, scale: () => M.lock.s, duration: 7, ease: 'power2.inOut' }, 88)
    .to(nav, { yPercent: 0, autoAlpha: 1, duration: 3.5, ease: 'power2.out' }, 91.5)
    .to(introLangs, { autoAlpha: 0, duration: 2 }, 91.5) // seletor de idioma sai quando o menu do site desce
    .to(navLockup, { autoAlpha: 1, duration: 1 }, 95)
    .to(brandLockup, { autoAlpha: 0, duration: 1 }, 95.5)
    .to(heroCopy, { y: 0, autoAlpha: 1, stagger: 0.6, duration: 3.5, ease: 'power3.out' }, 94.5)
    .set({}, {}, 100);

  // Trava da hero (29/09, pedido de Armin): depois que a intro termina, a pessoa "cai" no site, na hero
  // ("Your 811 tickets, handled end-to-end."). Rolar para cima a partir dali não volta para a animação
  // até a pessoa fazer 3 gestos de rolagem para cima seguidos. Evita que o texto suma quando alguém
  // só quer ler e rola um pouco para cima sem querer.
  // Estados: 'free' (dentro da intro), 'locked' (chegou na hero, trava ligada), 'released' (destravou;
  // volta a 'free' quando entra de novo na intro, e trava outra vez quando chegar de novo na hero).
  // Correção de 29/09: (1) conta todo gesto para cima que BATE no topo da hero, venha de onde vier (antes só contava
  // gesto que começava já no topo, e o embalo da descida deixa a página ~700 px abaixo dele); (2) reconhece um deslize
  // novo do trackpad mesmo no meio da inércia do anterior (salto no tamanho do passo), em vez de juntar os dois.
  const UNLOCK_GESTURES = 3;   // quantos gestos para cima destravam
  const GESTURE_GAP = 220;     // ms sem evento que separam um gesto do outro
  const RESET_AFTER = 4000;    // ms sem bater no topo: a contagem recomeça
  let lockState = 'free', gestures = 0, lastCountAt = 0;
  let cur = { id: 0, dir: 0, counted: false, start: 0, last: 0, abs: 0 }; // gesto atual (roda, trackpad, toque ou tecla)
  // Pouso: ao sair da intro descendo, a página para no topo da hero; o resto do embalo daquele gesto é descartado.
  let landing = false, landingId = -1, landingAt = 0;
  const LANDING_MAX = 2000; // ms: depois disso o pouso acaba mesmo sem gesto novo (inércia do toque)
  let touchY = null, touching = false;
  const now = () => performance.now();
  const scrollY = () => (lenis ? lenis.scroll : window.scrollY);
  const targetY = () => (lenis ? lenis.targetScroll : window.scrollY);
  // Posição da hero: 1 px depois do fim do pin, para a página parar fora do pin (no limite exato, o pin liga e desliga
  // e isso dava uma micro travada ao voltar para a hero).
  const endY = () => Math.ceil(tl.scrollTrigger.end) + 1;
  const atHeroTop = () => targetY() <= endY() + 0.5;
  const newGesture = (t, dir = 0) => { cur = { id: cur.id + 1, dir, counted: false, start: t, last: t, abs: 0 }; };
  // Conta o gesto atual uma vez só; devolve true quando destrava
  const countCurrent = () => {
    if (cur.counted) return false;
    cur.counted = true;
    const t = now();
    if (t - lastCountAt > RESET_AFTER) gestures = 0;
    lastCountAt = t;
    gestures += 1;
    if (gestures >= UNLOCK_GESTURES) { lockState = 'released'; gestures = 0; return true; }
    return false;
  };
  const stopAtHero = () => {
    if (lenis) lenis.scrollTo(endY(), { immediate: true, force: true });
    else window.scrollTo(0, endY());
  };
  const block = (e) => { if (e.cancelable) e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); };
  // Segmenta os eventos de roda/trackpad em gestos
  const trackWheel = (dy) => {
    const t = now(), abs = Math.abs(dy), dir = Math.sign(dy);
    const jump = t - cur.start > 300 && abs > cur.abs * 1.5 + 3; // deslize novo no meio da inércia do anterior
    if (t - cur.last > GESTURE_GAP || jump || dir !== cur.dir) newGesture(t, dir);
    cur.last = t; cur.abs = abs;
    return dir;
  };

  const updateLock = () => {
    const y = scrollY(), end = endY();
    if (lockState === 'free' && y >= end - 1) {
      // Chegou na hero por um caminho que não é a roda com Lenis (toque, teclado, link): trava e pousa
      lockState = 'locked'; gestures = 0;
      landing = true; landingId = cur.id; landingAt = now();
      if (!lenis || touching || now() - cur.last > 400) stopAtHero();
      return;
    }
    if (landing) {
      if (now() - landingAt > LANDING_MAX) landing = false;
      else if (!lenis && y > end + 1) { stopAtHero(); return; }
      else if (lenis && y > end + 1 && !lenis.isScrolling) { stopAtHero(); return; }
    }
    else if (lockState === 'released' && y < end - 40) lockState = 'free';
    else if (lockState === 'locked' && y < end - 1) {
      // Passou do topo da hero sem ser pela roda (inércia do toque, barra de rolagem): o gesto em curso conta
      if ((touching || now() - cur.last < 900) && countCurrent()) return;
      stopAtHero();
    }
  };
  if (lenis) lenis.on('scroll', updateLock); else window.addEventListener('scroll', updateLock, { passive: true });

  if (lenis) {
    // Roda do mouse e trackpad com Lenis (29/09): em vez de bloquear e dar um salto de volta, o passo de cada evento é
    // encurtado antes de o Lenis aplicar, e a rolagem desacelera suave até parar exatamente na hero. Sem trancos.
    lenis.options.virtualScroll = (data) => {
      const ev = data.event;
      if (!ev || !ev.type.includes('wheel') || !data.deltaY) return true;
      const dy = data.deltaY, dir = trackWheel(dy), end = endY(), tgt = lenis.targetScroll;
      // Descendo pela intro: pousa suave no topo da hero
      if (lockState === 'free' && dir > 0 && tgt < end && tgt + dy >= end) {
        lockState = 'locked'; gestures = 0;
        landing = true; landingId = cur.id; landingAt = now();
        data.deltaY = end - tgt;
        return true;
      }
      if (landing) {
        if (cur.id === landingId && dir > 0) { // resto do embalo da descida
          const room = end - tgt;
          if (room > 0.5) { data.deltaY = Math.min(dy, room); return true; }
          if (ev.cancelable) ev.preventDefault();
          return false;
        }
        if (cur.id !== landingId) landing = false;
      }
      if (lockState !== 'locked' || dir > 0) return true;
      // Subindo
      if (tgt + dy >= end) return true;                 // ainda abaixo da hero: rola normal
      if (tgt > end + 0.5) { data.deltaY = end - tgt; return true; } // chega na hero desacelerando
      if (countCurrent()) return true;                  // 3º gesto no topo: volta para a animação
      if (ev.cancelable) ev.preventDefault();           // 1º e 2º: fica na hero
      return false;
    };
  } else {
    // Sem Lenis ("reduzir movimento"): rolagem nativa; bloqueia o evento e segura na hero
    window.addEventListener('wheel', (e) => {
      if (!e.deltaY) return;
      const dir = trackWheel(e.deltaY);
      if (landing) {
        if (cur.id === landingId && dir > 0) { block(e); return; }
        if (cur.id !== landingId) landing = false;
      }
      if (lockState !== 'locked' || dir > 0) return;
      if (atHeroTop()) {
        if (countCurrent()) return;
        block(e);
      }
    }, { capture: true, passive: false });
  }

  // Toque (celular): dedo descendo = rolar para cima
  window.addEventListener('touchstart', (e) => { touching = true; landing = false; touchY = e.touches[0].clientY; newGesture(now()); }, { capture: true, passive: true });
  window.addEventListener('pointerdown', () => { landing = false; }, { capture: true, passive: true }); // clique em link do menu etc.
  window.addEventListener('touchend', () => { touching = false; cur.last = now(); }, { capture: true, passive: true });
  window.addEventListener('touchmove', (e) => {
    if (lockState !== 'locked' || touchY === null) return;
    const dy = e.touches[0].clientY - touchY;
    cur.last = now();
    if (dy <= 4 || window.scrollY > endY() + 4) return;
    if (countCurrent()) return;
    if (lockState === 'locked') block(e);
  }, { capture: true, passive: false });

  // Teclado
  window.addEventListener('keydown', (e) => {
    landing = false;
    if (lockState !== 'locked' || !atHeroTop()) return;
    const up = e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Home' || (e.key === ' ' && e.shiftKey);
    if (!up || /input|textarea|select/i.test(e.target.tagName)) return;
    newGesture(now());
    if (countCurrent()) return;
    block(e);
  }, { capture: true });

  // Links para #top durante a intro levam ao fim do pin, não ao começo da animação
  document.querySelectorAll('a[href="#top"]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const end = tl.scrollTrigger.end + 2;
    if (lenis) lenis.scrollTo(end, { duration: 1 }); else window.scrollTo({ top: end, behavior: 'smooth' });
  }));

  resize(true);
  window.addEventListener('resize', () => resize(false));
  document.fonts && document.fonts.ready.then(() => { ScrollTrigger.refresh(); wake(); });
  wake();
}
