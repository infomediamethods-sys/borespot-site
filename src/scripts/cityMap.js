// Mapa real de Miami (OpenStreetMap) para o fundo da intro. Plano: plano-mapa-real-intro.md.
// Dados: public/intro/miami-map.json, gerado uma vez fora do site (pasta mapa-base/). Crédito obrigatório: "© OpenStreetMap contributors".
// Tudo em canvas 2D: o fundo é desenhado uma vez numa camada fora da tela; só a rota, o preenchimento e os pins são desenhados ao vivo.

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const MAP_URL = `${BASE}/intro/miami-map.json`;

// Carrega (ou reaproveita o download que o <head> já começou). A decodificação (decodeCityMap) fica para depois da entrada do texto.
export function loadCityMap() {
  const p = window.__bsMap || fetch(MAP_URL).then((r) => { if (!r.ok) throw new Error('map ' + r.status); return r.json(); });
  return p;
}

export function decodeCityMap(d) {
  const U = d.units;
  const line = (a) => {
    const out = new Float32Array(a.length);
    let x = 0, y = 0;
    for (let i = 0; i < a.length; i += 2) { x += a[i]; y += a[i + 1]; out[i] = x * U; out[i + 1] = y * U; }
    return out;
  };
  const polys = (list) => list.map((rings) => rings.map(line));
  const path = (lines, closed) => {
    const p = new Path2D();
    lines.forEach((l) => {
      p.moveTo(l[0], l[1]);
      for (let i = 2; i < l.length; i += 2) p.lineTo(l[i], l[i + 1]);
      if (closed) p.closePath();
    });
    return p;
  };
  const polyPath = (list) => path(polys(list).flat(), true);
  const chunks = (list, n) => { const out = []; for (let i = 0; i < list.length; i += n) out.push(list.slice(i, i + n)); return out; };

  // Segmentos do preenchimento, com o t (0 a 1) de cada ponta: distância pela malha a partir da rota
  const segs = [];
  d.fill.forEach(([cls, enc, ts]) => {
    const l = line(enc);
    for (let i = 0; i + 1 < ts.length; i++) {
      const ta = ts[i] / 1000, tb = ts[i + 1] / 1000;
      const a = ta <= tb;
      segs.push({
        x1: a ? l[i * 2] : l[i * 2 + 2], y1: a ? l[i * 2 + 1] : l[i * 2 + 3],
        x2: a ? l[i * 2 + 2] : l[i * 2], y2: a ? l[i * 2 + 3] : l[i * 2 + 1],
        t0: Math.min(ta, tb), t1: Math.max(ta, tb), art: cls === 'a',
      });
    }
  });
  const byEnd = segs.slice().sort((a, b) => a.t1 - b.t1);
  const byStart = segs.slice().sort((a, b) => a.t0 - b.t0);
  const maxSpan = segs.reduce((m, sg) => Math.max(m, sg.t1 - sg.t0), 0);

  // Rota com t pelo comprimento
  const route = d.route.map(([x, y]) => ({ x, y, t: 0 }));
  let acc = 0;
  for (let i = 1; i < route.length; i++) { acc += Math.hypot(route[i].x - route[i - 1].x, route[i].y - route[i - 1].y); route[i].t = acc; }
  route.forEach((r) => { r.t /= acc || 1; });

  return {
    raw: d,
    length: acc,
    anchor: d.anchor,
    city: d.city,
    out: [700, 150, 4800, 3800],
    land: polyPath(d.land),
    water: polyPath(d.water),
    parks: polyPath(d.parks),
    buildings: chunks(d.buildings, 700).map(polyPath),
    roads: Object.fromEntries(Object.entries(d.roads).map(([k, v]) => [k, path(v.map(line), false)])),
    rail: path(d.rail.map(line), false),
    route,
    utils: d.utils.map((u) => ({ color: u.color, pts: u.pts, t: u.t, x: u.x, y: u.y })),
    pins: d.pins,
    segs, byEnd, byStart, maxSpan,
  };
}

// Monta a vista para um tamanho de tela: câmera em repouso, camada de fundo e camada do preenchimento.
export function createCityView(map, { W, H, dpr, mobile, canWork = () => true }) {
  const portrait = H > W;
  // Largura visível do mapa em metros: paisagem mostra o trecho todo da rota e a baía; em pé, o centro da rota
  const widthM = portrait ? 1250 + Math.max(0, W - 390) * 1.2 : 2900;
  const S0 = W / widthM; // px de tela por metro, em repouso
  const M0 = portrait ? map.anchor.mobile : map.anchor.desktop;
  const R0 = portrait ? [W * 0.5, H * 0.72] : [W * 0.44, H * 0.7];

  // Duas camadas prontas:
  // - perto: só a tela (mais a folga do deslize), na resolução da tela, colada 1:1 em cada quadro (rápido e nítido);
  // - longe: área maior e mais leve, usada só quando a câmera afasta na cena 3 (tudo encolhe, não precisa de nitidez).
  const near = { x: -W * 0.03, y: 0, w: W * 1.06, h: H, r: dpr };
  const F = 1.15;
  const hw = Math.max(R0[0], W - R0[0]) * F + W * 0.03;
  const hh = Math.max(R0[1], H - R0[1]) * F;
  const far = { x: R0[0] - hw, y: R0[1] - hh, w: hw * 2, h: hh * 2 };
  far.r = Math.min(dpr, 1, Math.sqrt((mobile ? 2.5e6 : 4e6) / (far.w * far.h)));
  const [ox, oy, ex, ey] = map.out;
  const dataR = Math.min(M0[0] - ox, ex - M0[0], M0[1] - oy, ey - M0[1]) * S0;
  const maskR = Math.min(hw, hh, dataR) * 0.95;

  // O navegador adia o desenho de verdade de um canvas até ele ser usado. Colar a camada num canvas de 1 px força esse
  // desenho na hora, etapa por etapa; sem isso, todo o custo caía num quadro só (o primeiro em que o mapa aparece ou o afastamento começa).
  const flusher = document.createElement('canvas'); flusher.width = flusher.height = 1;
  const fx = flusher.getContext('2d');
  const flush = (c) => fx.drawImage(c, 0, 0, 1, 1);
  const toRest = (x, y) => [R0[0] + (x - M0[0]) * S0, R0[1] + (y - M0[1]) * S0];
  const px = (v) => v / S0; // largura em px de tela convertida para metros
  const canvasFor = (L) => { const c = document.createElement('canvas'); c.width = Math.ceil(L.w * L.r); c.height = Math.ceil(L.h * L.r); return c; };
  const toMap = (c, L) => c.setTransform(L.r * S0, 0, 0, L.r * S0, L.r * (R0[0] - L.x - M0[0] * S0), L.r * (R0[1] - L.y - M0[1] * S0));

  const RS = {
    minor: ['rgba(115,212,247,0.10)', 0.6],
    street: ['rgba(115,212,247,0.18)', mobile ? 0.8 : 0.9],
    arterial: ['rgba(68,164,238,0.30)', mobile ? 1.2 : 1.4],
    motorway: ['rgba(32,101,213,0.45)', mobile ? 2 : 2.4],
  };
  function drawBase(b, L, opaque, part = 'all') {
    const all = part === 'all';
    if (opaque && (all || part === 'ground')) {
      // Camada de perto é opaca e já traz o brilho azul em volta da rota: poupa dois preenchimentos de tela cheia por quadro
      b.setTransform(L.r, 0, 0, L.r, -L.x * L.r, -L.y * L.r);
      b.fillStyle = '#03102B'; b.fillRect(L.x, L.y, L.w, L.h);
    }
    toMap(b, L);
    b.lineCap = 'round'; b.lineJoin = 'round';
    if (all || part === 'ground') {
      // Água fica transparente (mostra o fundo #03102B); terra, parques e prédios por cima
      b.fillStyle = '#061C46'; b.fill(map.land, 'evenodd');
      b.fillStyle = '#03102B'; b.fill(map.water, 'evenodd');
      b.fillStyle = '#0A2556'; b.fill(map.parks, 'evenodd');
    }
    if (all || part.startsWith('buildings')) {
      const k = part.split(':')[1];
      (k === undefined ? map.buildings : [map.buildings[+k]]).forEach((bp) => {
        b.fillStyle = 'rgba(115,212,247,0.045)'; b.fill(bp, 'evenodd');
        b.strokeStyle = 'rgba(115,212,247,0.08)'; b.lineWidth = px(0.5); b.stroke(bp);
      });
    }
    // Ruas em 3 etapas (menores, locais, avenidas e expressas) e depois trilhos, utilidades e brilho
    const roadSets = { 'lines:minor': ['minor'], 'lines:street': ['street'], 'lines:big': ['arterial', 'motorway'] };
    const rs = all ? ['minor', 'street', 'arterial', 'motorway'] : roadSets[part];
    if (rs) rs.forEach((k) => { b.strokeStyle = RS[k][0]; b.lineWidth = px(RS[k][1]); b.stroke(map.roads[k]); });
    if (!all && part !== 'lines') return;
    b.setLineDash([px(3), px(3)]); b.strokeStyle = 'rgba(115,212,247,0.14)'; b.lineWidth = px(0.8); b.stroke(map.rail);
    // Utilidades apagadas (acendem quando a perfuração cruza)
    b.setLineDash([px(3), px(7)]); b.lineWidth = px(1.6);
    map.utils.forEach((u) => {
      b.strokeStyle = hexA(u.color, 0.26);
      b.beginPath(); u.pts.forEach(([x, y], i) => (i ? b.lineTo(x, y) : b.moveTo(x, y))); b.stroke();
    });
    b.setLineDash([]);
    if (opaque && (all || part === 'lines')) {
      b.setTransform(L.r, 0, 0, L.r, -L.x * L.r, -L.y * L.r);
      const gr = Math.max(W, H) * 0.6;
      const glow = b.createRadialGradient(R0[0], R0[1], 0, R0[0], R0[1], gr);
      glow.addColorStop(0, 'rgba(32,101,213,0.16)'); glow.addColorStop(1, 'rgba(32,101,213,0)');
      b.fillStyle = glow; b.fillRect(R0[0] - gr, R0[1] - gr, gr * 2, gr * 2);
    }
  }

  // Preenchimento azul em 4 faixas pela distância: a borda da área liberada some aos poucos
  const BANDS = [[0.62, 1], [0.78, 0.72], [0.9, 0.45], [1.01, 0.22]];
  const FILL = { street: ['rgba(68,164,238,0.55)', mobile ? 1.1 : 1.3], art: ['rgba(115,212,247,0.62)', mobile ? 1.6 : 2] };
  function drawFill(c, L, from, to) {
    toMap(c, L);
    c.lineCap = 'round';
    const bands = BANDS.map(() => [new Path2D(), new Path2D()]);
    for (let i = from; i < to; i++) {
      const sg = map.byEnd[i];
      const bi = BANDS.findIndex((bd) => sg.t1 <= bd[0]);
      const p = bands[bi < 0 ? BANDS.length - 1 : bi][sg.art ? 1 : 0];
      p.moveTo(sg.x1, sg.y1); p.lineTo(sg.x2, sg.y2);
    }
    bands.forEach(([ps, pa], i) => {
      c.globalAlpha = BANDS[i][1];
      c.strokeStyle = FILL.street[0]; c.lineWidth = FILL.street[1] / S0; c.stroke(ps);
      c.strokeStyle = FILL.art[0]; c.lineWidth = FILL.art[1] / S0; c.stroke(pa);
    });
    c.globalAlpha = 1;
  }

  const nearBase = canvasFor(near);
  const nb = nearBase.getContext('2d');
  const nearView = canvasFor(near); // fundo + azul já liberado
  const nv = nearView.getContext('2d');
  // Montagem da camada de perto em etapas (uma por quadro), para não travar a entrada da intro
  const bSteps = map.buildings.map((_, k) => () => { drawBase(nb, near, true, 'buildings:' + k); flush(nearBase); });
  const nearSteps = [
    () => { drawBase(nb, near, true, 'ground'); flush(nearBase); },
    ...bSteps,
    ...['lines:minor', 'lines:street', 'lines:big', 'lines'].map((pt) => () => { drawBase(nb, near, true, pt); flush(nearBase); }),
    () => { nv.drawImage(nearBase, 0, 0); flush(nearView); },
  ];
  let nearStep = 0;
  const isReady = () => nearStep >= nearSteps.length;
  function work(budget) {
    const t = performance.now();
    while (!isReady()) { nearSteps[nearStep++](); if (performance.now() - t > budget) break; }
    return isReady();
  }
  let done = 0, doneT = 0;

  // Pinta os trechos já cobertos (t1 <= T). Voltar a rolagem recopia o fundo limpo e repinta.
  function setFill(T) {
    if (T < doneT) {
      nv.setTransform(1, 0, 0, 1, 0, 0); nv.globalCompositeOperation = 'copy'; nv.drawImage(nearBase, 0, 0); nv.globalCompositeOperation = 'source-over';
      done = 0;
    }
    doneT = T;
    let to = done;
    while (to < map.byEnd.length && map.byEnd[to].t1 <= T) to++;
    if (to > done) { drawFill(nv, near, done, to); done = to; }
  }

  // Camadas de longe (cena 3): fundo + azul completo + perfuração e utilidades acesas, sem e com recorte redondo.
  // Na hora do afastamento tudo isso já está parado, então vai pronto na imagem. Montadas em etapas pequenas, nas folgas do navegador.
  let far1 = null, far2 = null, fc = null;
  const farSteps = [
    () => { far1 = canvasFor(far); fc = far1.getContext('2d'); drawBase(fc, far, false, 'ground'); flush(far1); },
    ...map.buildings.map((_, k) => () => { drawBase(fc, far, false, 'buildings:' + k); flush(far1); }),
    ...['lines:minor', 'lines:street', 'lines:big', 'lines'].map((pt) => () => { drawBase(fc, far, false, pt); flush(far1); }),
    () => { drawFill(fc, far, 0, map.byEnd.length); flush(far1); },
    () => {
      toMap(fc, far);
      fc.lineCap = 'round'; fc.lineJoin = 'round';
      map.utils.forEach((u) => {
        const pth = new Path2D(); u.pts.forEach(([x, y], i) => (i ? pth.lineTo(x, y) : pth.moveTo(x, y)));
        fc.strokeStyle = hexA(u.color, 0.1); fc.lineWidth = px(8); fc.stroke(pth);
        fc.strokeStyle = hexA(u.color, 0.35); fc.lineWidth = px(2); fc.stroke(pth);
      });
      const r = new Path2D(); map.route.forEach((q, i) => (i ? r.lineTo(q.x, q.y) : r.moveTo(q.x, q.y)));
      fc.strokeStyle = 'rgba(68,164,238,0.22)'; fc.lineWidth = px(mobile ? 12 : 14); fc.stroke(r);
      fc.strokeStyle = '#2065D5'; fc.lineWidth = px(mobile ? 4 : 5); fc.stroke(r);
      fc.strokeStyle = 'rgba(255,255,255,0.85)'; fc.lineWidth = px(1.2); fc.stroke(r);
      flush(far1);
    },
    () => {
      far2 = canvasFor(far);
      const c = far2.getContext('2d');
      c.drawImage(far1, 0, 0);
      c.setTransform(far.r, 0, 0, far.r, -far.x * far.r, -far.y * far.r);
      c.globalCompositeOperation = 'destination-in';
      const mk = c.createRadialGradient(R0[0], R0[1], maskR * 0.3, R0[0], R0[1], maskR);
      mk.addColorStop(0, 'rgba(0,0,0,1)'); mk.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = mk; c.fillRect(far.x, far.y, far.w, far.h);
      flush(far2);
    },
  ];
  let farStep = 0;
  const farReady = () => farStep >= farSteps.length;
  function buildFar(deadline) {
    while (!farReady() && (!deadline || deadline.timeRemaining() > 12)) farSteps[farStep++]();
    return farReady();
  }
  function getFar() { buildFar(null); }
  let dead = false;
  const dispose = () => { dead = true; };
  // Só monta quando o navegador está folgado e a intro não está animando (canWork); se a pessoa rolar direto até a cena 3, getFar() monta na hora
  (function idle() {
    if (dead || farReady()) return;
    const ric = window.requestIdleCallback;
    const go = (dl) => {
      if (!dead && isReady() && canWork()) {
        if (dl) buildFar(dl); else farSteps[farStep++]();
      }
      idle();
    };
    if (ric) ric(go); else setTimeout(() => go(null), 300); // Safari não tem requestIdleCallback: uma etapa por vez
  })();

  // Desenha o fundo na câmera atual. X/Y levam coordenadas de repouso para a tela; s é a escala; m é o quanto do recorte redondo vale; a é a opacidade.
  function drawBg(g, X, Y, s, dprNow, m, a) {
    if (!isReady()) work(1e9);
    if (s >= 0.999) {
      const x = Math.round(X(near.x) * dprNow) / dprNow, y = Math.round(Y(near.y) * dprNow) / dprNow;
      g.globalAlpha = a;
      g.drawImage(nearView, x, y, nearView.width / dprNow, nearView.height / dprNow);
      return true;
    }
    getFar();
    const x = X(far.x), y = Y(far.y), w = far.w * s, h = far.h * s;
    if (m < 1) { g.globalAlpha = a * (1 - m); g.drawImage(far1, x, y, w, h); }
    if (m > 0) { g.globalAlpha = a * m; g.drawImage(far2, x, y, w, h); }
    return false;
  }

  const route = map.route.map((r) => { const [x, y] = toRest(r.x, r.y); return { x, y, t: r.t }; });
  const utils = map.utils.map((u) => {
    const [cx, cy] = toRest(u.x, u.y);
    return { color: u.color, pts: u.pts.map(([x, y]) => toRest(x, y)), cross: { x: cx, y: cy, t: u.t } };
  });
  const pins = (portrait || mobile ? map.pins.mobile : map.pins.desktop).map((p, i) => {
    const [x, y] = toRest(p.x, p.y);
    return { x, y, t: p.t, i, up: i % 2 === 0, last: null, changed: 0 };
  });

  // A perfuração começa fora da tela: tIn é o ponto da rota onde ela entra pela esquerda
  const enter = route.find((r) => r.x >= -W * 0.03);
  const tIn = enter ? enter.t : 0;

  return { S0, M0, R0, maskR, setFill, drawBg, getFar, dispose, isReady, work, route, utils, pins, toRest, portrait, tIn, lengthPx: map.length * S0 };
}

export function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
