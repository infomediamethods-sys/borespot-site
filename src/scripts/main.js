import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initIntro } from './intro.js';

gsap.registerPlugin(ScrollTrigger);
// Textos do idioma da página (definidos em Base.astro a partir de src/i18n/)
let UI = { openMenu: 'Open menu', closeMenu: 'Close menu', form: {} };
try { UI = { ...UI, ...JSON.parse(document.getElementById('i18n-ui')?.textContent || '{}') }; } catch (e) {}
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Suavização em dois estágios (29/09). O Lenis segue o alvo com um filtro só: cada evento da roda ou do trackpad muda
   a velocidade de uma vez, e como os eventos não chegam alinhados com os quadros, a velocidade oscilava alguns por cento
   de um quadro para o outro (as micro travadas no corpo do site; a intro não sentia porque o scrub do GSAP suaviza de
   novo). Aqui a posição segue um alvo intermediário, que por sua vez segue o alvo real: a velocidade muda sem degrau.
   Cada estágio tem o dobro da rapidez, então o atraso total fica igual ao de antes (mesma sensação de rolagem). */
function smoothTwice(l) {
  const an = l.animate;
  if (!an || typeof an.advance !== 'function') return;
  const advance = an.advance.bind(an), fromTo = an.fromTo.bind(an);
  let mid = null;
  an.fromTo = (from, to, opts) => {
    const wasRunning = an.isRunning;
    fromTo(from, to, opts);
    if (!wasRunning || mid === null || !opts || !opts.lerp || opts.duration) mid = from;
  };
  an.advance = (dt) => {
    if (!an.isRunning || !an.lerp || (an.duration && an.easing)) return advance(dt);
    const k = 1 - Math.exp(-an.lerp * 120 * dt);
    mid += (an.to - mid) * k;
    an.value += (mid - an.value) * k;
    let done = false;
    if (Math.abs(an.to - mid) < 0.5 && Math.abs(an.to - an.value) < 0.5) { an.value = an.to; mid = an.to; done = true; }
    if (done) an.stop();
    if (an.onUpdate) an.onUpdate(an.value, done);
  };
}

/* Rolagem suave (desligada com "reduzir movimento") */
let lenis = null;
if (!reduced) {
  // 29/09: o Lenis roda no próprio requestAnimationFrame, com o horário exato do quadro. Antes rodava no relógio do
  // GSAP (Date.now: milissegundos inteiros, medidos na hora em que o código roda), e o passo de cada quadro variava.
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, autoRaf: true });
  smoothTwice(lenis);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.lagSmoothing(0);
}

initIntro(lenis);

/* Links internos */
const scrollToHash = (hash) => {
  const el = document.querySelector(hash);
  if (!el) return;
  const offset = -(document.querySelector('[data-nav]')?.offsetHeight || 0) + 1;
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.2 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduced ? 'auto' : 'smooth' });
};
document.querySelectorAll('a[href^="#"]:not([href="#top"])').forEach((a) => {
  a.addEventListener('click', (e) => {
    const hash = a.getAttribute('href');
    if (hash.length < 2) return;
    e.preventDefault();
    closeMenu();
    scrollToHash(hash);
  });
});
if (!document.documentElement.classList.contains('intro-on')) {
  document.querySelectorAll('a[href="#top"]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 }); else window.scrollTo({ top: 0, behavior: 'smooth' });
  }));
}

/* Menu no celular */
const nav = document.querySelector('[data-nav]');
const toggle = document.querySelector('[data-nav-toggle]');
const menu = document.querySelector('[data-nav-menu]');
function closeMenu() {
  if (!menu || menu.hidden) return;
  menu.hidden = true;
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', UI.openMenu);
}
toggle?.addEventListener('click', () => {
  const open = menu.hidden;
  menu.hidden = !open;
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? UI.closeMenu : UI.openMenu);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

/* Fotos (29/09): carregar e decodificar antes de entrarem na tela. Com a rolagem suave, cada quadro espera a imagem
   nova ficar pronta; decodificar na hora de aparecer segurava a rolagem por vários quadros (medido: seção Por cargo). */
const warmImages = () => document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
  img.loading = 'eager';
  if (img.decode) img.decode().catch(() => {});
});
if ('requestIdleCallback' in window) requestIdleCallback(warmImages, { timeout: 3000 }); else setTimeout(warmImages, 2000);

/* Faixa de logos para de andar fora da tela (29/09) */
document.querySelectorAll('.logos__viewport').forEach((vp) => {
  new IntersectionObserver(([e]) => vp.classList.toggle('is-off', !e.isIntersecting)).observe(vp);
});

/* Reveal ao entrar na tela */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
document.querySelectorAll('.reveal, [data-cycle], .contact').forEach((el) => io.observe(el));
// Itens em sequência dentro de listas
document.querySelectorAll('.why__list, .people__grid').forEach((list) => {
  [...list.children].forEach((li, i) => (li.style.transitionDelay = `${i * 60}ms`));
});

/* Accordion (desde 28/09 só a FAQ da landing e a do Referral; Problema e Serviços ficaram abertos) */
document.querySelectorAll('[data-acc]').forEach((acc) => {
  const items = [...acc.querySelectorAll('.acc__item')];
  const section = acc.closest('section');
  const swaps = section.querySelectorAll('[data-swap-item]');
  const map = acc.dataset.mapTarget ? document.getElementById(acc.dataset.mapTarget) : null;
  items.forEach((item) => {
    const btn = item.querySelector('[data-acc-btn]');
    btn.addEventListener('click', () => {
      // Accordion livre (perguntas frequentes): abre e fecha à vontade
      if ('accFree' in acc.dataset) {
        const open = !item.classList.contains('is-open');
        item.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
        setTimeout(() => ScrollTrigger.refresh(), 500);
        return;
      }
      // Sempre fica um item aberto: a imagem ou o mapa ao lado precisa de um estado
      if (item.classList.contains('is-open')) return;
      items.forEach((it) => {
        it.classList.toggle('is-open', it === item);
        it.querySelector('[data-acc-btn]').setAttribute('aria-expanded', String(it === item));
      });
      const idx = Number(btn.dataset.index);
      swaps.forEach((s) => s.classList.toggle('is-active', Number(s.dataset.swapItem) === idx));
      if (map && btn.dataset.state) map.dataset.state = btn.dataset.state;
      setTimeout(() => ScrollTrigger.refresh(), 500);
    });
  });
});

/* Serviços (30/09): ticket carimbado em loop. Entra na fase 01, recebe os carimbos de cada fase, anda até a 02 e a 03
   (no computador, por cima das colunas da linha do tempo), leva o carimbo de fechamento, sai e entra um novo.
   Só roda com a seção na tela. Com "reduzir movimento": cartão parado, já fechado, com todos os carimbos. */
const ticketRoot = document.querySelector('[data-ticket]');
if (ticketRoot) initTicket(ticketRoot);
function initTicket(root) {
  const card = root.querySelector('[data-tcard]');
  const paper = root.querySelector('[data-tpaper]');
  const dot = root.querySelector('[data-tchip]');
  const label = root.querySelector('[data-tchip-text]');
  const stamps = [...root.querySelectorAll('.tstamp')];
  const steps = [...document.querySelectorAll('#services .tl__step')];
  const STATUS = [['Waiting on Locate', 'var(--st-waiting)'], ['Cleared', 'var(--st-cleared)'], ['Active', 'var(--st-active)'], ['Closed out', 'var(--text)']];
  const setStatus = (n) => { label.textContent = STATUS[n][0]; dot.style.background = STATUS[n][1]; };
  const setCurrent = (n) => steps.forEach((s, j) => s.classList.toggle('is-current', j === n));
  const travels = () => false; // 30/09: o cartão não anda mais; no computador fica ao lado do título (Services.astro)
  // Alinha o cartão com o começo da coluna da fase, sem passar da borda direita do conteúdo
  const xOf = (n) => (travels() ? Math.min(steps[n].getBoundingClientRect().left - root.getBoundingClientRect().left, root.clientWidth - card.offsetWidth) : 0);
  let station = 0;
  const place = (x, opacity, animate) => {
    card.style.transition = animate ? 'transform 1s cubic-bezier(.65, 0, .35, 1), opacity .6s ease' : 'none';
    card.style.transform = `translateX(${x}px)`;
    card.style.opacity = opacity;
  };
  const stamp = (n) => {
    stamps[n].classList.add('is-on');
    paper.classList.remove('is-hit'); void paper.offsetWidth; paper.classList.add('is-hit');
  };

  if (reduced || !('IntersectionObserver' in window)) {
    stamps.forEach((s) => s.classList.add('is-static'));
    setStatus(3); place(xOf(2), 1, false); station = 2;
    window.addEventListener('resize', () => place(xOf(station), 1, false));
    return;
  }

  let timers = [];
  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  const side = () => (travels() ? 60 : 36);
  function cycle() {
    stop();
    stamps.forEach((s) => s.classList.remove('is-on'));
    setStatus(0); setCurrent(-1); station = 0;
    place(xOf(0) - side(), 0, false);
    at(80, () => { place(xOf(0), 1, true); setCurrent(0); });
    at(1100, () => stamp(0));
    at(1850, () => { stamp(1); setStatus(1); });
    at(2600, () => stamp(2));
    at(3300, () => { station = 1; place(xOf(1), 1, true); });
    at(3900, () => setCurrent(1));
    at(4700, () => { stamp(3); setStatus(2); });
    at(5450, () => stamp(4));
    at(6200, () => { station = 2; place(xOf(2), 1, true); });
    at(6800, () => setCurrent(2));
    at(7600, () => stamp(5));
    at(8350, () => stamp(6));
    at(9300, () => { stamp(7); setStatus(3); });
    at(11200, () => { place(xOf(2) + side(), 0, true); setCurrent(-1); });
    at(12300, cycle);
  }
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!timers.length) cycle(); }
    else { stop(); setCurrent(-1); }
  }, { threshold: 0.25 }).observe(root);
  window.addEventListener('resize', () => place(xOf(station), card.style.opacity || 0, false));
}

/* Por que a Bore Spot (30/09): a central. A equipe da Bore Spot no meio; à esquerda quem é do cliente, à direita quem
   ela aciona por ele. Em loop: um pedido chega num idioma, a equipe aciona alguém, a resposta volta. Pontinhos de luz
   correm pelos fios o tempo todo. Só anima com a seção na tela. Esboço aprovado: Claude outputs/elemento-why-central.html */
const whyHub = document.querySelector('[data-whyhub]');
if (whyHub) initWhyHub(whyHub);
function initWhyHub(root) {
  let copy; try { copy = JSON.parse(root.dataset.copy); } catch (e) { return; }
  const NS = 'http://www.w3.org/2000/svg';
  const VW = 460, VH = 495;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${VW} ${VH}`);
  root.appendChild(svg);
  const el = (n, a = {}, p = svg) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
  const MONO = 'Geist Mono, ui-monospace, monospace';
  const HUB = { x: 230, y: 250, r: 58 };
  const NODES = {
    crew: { x: 64, y: 112, side: 'L' }, office: { x: 64, y: 250, side: 'L' }, owner: { x: 64, y: 388, side: 'L' },
    center: { x: 396, y: 112, side: 'R' }, utility: { x: 396, y: 250, side: 'R' }, locator: { x: 396, y: 388, side: 'R' },
  };
  const ICONS = {
    crew: '<path d="M2.5 18h19"/><path d="M4.5 18v-2.5a7.5 7.5 0 0 1 15 0V18"/><path d="M10 8.3V5.5h4v2.8"/><path d="M8 12.5v-2M16 12.5v-2"/>',
    office: '<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M9 8h1.5M13.5 8H15M9 12h1.5M13.5 12H15M10.5 20v-3.5h3V20"/>',
    owner: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6"/><path d="M12 14.5l-1 2.5 1 2 1-2z"/>',
    center: '<path d="M6.5 4.5h3l1.5 4-2 1.3a10 10 0 0 0 5.2 5.2l1.3-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6.5a2 2 0 0 1 2-2z"/>',
    utility: '<path d="M13 3 5.5 13.5H11l-1 7.5 7.5-10.5H12z"/>',
    locator: '<path d="M6 21V4M6 4.5h11l-2.5 4 2.5 4H6"/>',
  };
  const defs = el('defs');
  defs.innerHTML = '<filter id="hubglow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>'
    + '<pattern id="hubdots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="rgba(115,212,247,.08)"/></pattern>';
  el('rect', { width: VW, height: VH, fill: 'url(#hubdots)' });

  const wires = {};
  Object.entries(NODES).forEach(([k, n]) => {
    const sx = n.side === 'L' ? n.x + 30 : n.x - 30;
    const ang = Math.atan2(n.y - HUB.y, (n.side === 'L' ? -1 : 1) * 60);
    const ex = HUB.x + Math.cos(ang) * (HUB.r + 4), ey = HUB.y + Math.sin(ang) * (HUB.r + 4), mx = (sx + ex) / 2;
    wires[k] = el('path', { d: `M ${sx} ${n.y} C ${mx} ${n.y}, ${mx} ${ey}, ${ex} ${ey}`, fill: 'none', stroke: n.side === 'L' ? '#73D4F7' : '#44A4EE', 'stroke-opacity': .28, 'stroke-width': 1.5, 'stroke-dasharray': '4 5', class: 'wire' });
  });

  const core = el('g', { class: 'core' });
  el('circle', { cx: HUB.x, cy: HUB.y, r: HUB.r + 22, fill: 'rgba(68,164,238,.10)', filter: 'url(#hubglow)', class: 'core-halo' }, core);
  el('circle', { cx: HUB.x, cy: HUB.y, r: HUB.r + 12, fill: 'none', stroke: 'rgba(115,212,247,.35)', 'stroke-width': 1.2, 'stroke-dasharray': '2 7', class: 'spin' }, core);
  el('circle', { cx: HUB.x, cy: HUB.y, r: HUB.r, fill: '#0B2A62', stroke: '#44A4EE', 'stroke-width': 2 }, core);
  el('g', { transform: `translate(${HUB.x - 14} ${HUB.y - 40}) scale(2)` }, core).innerHTML =
    '<path d="M7 15.5C4.5 12.3 1 9.1 1 6a6 6 0 0 1 12 0c0 3.1-3.5 6.3-6 9.5Z" fill="#44A4EE"/><path d="M4.6 6.2l1.7 1.7L9.6 4.6" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  [-18, 0, 18].forEach((dx, i) => {
    const g = el('g', { transform: `translate(${HUB.x + dx} ${HUB.y + 20 + (i === 1 ? -3 : 0)})` }, core);
    const c = i === 1 ? '#FFFFFF' : '#73D4F7';
    el('circle', { cx: 0, cy: 0, r: 5, fill: c }, g);
    el('path', { d: 'M -9 15 a 9 8 0 0 1 18 0 z', fill: c }, g);
  });
  el('text', { x: HUB.x, y: HUB.y + HUB.r + 40, 'text-anchor': 'middle', fill: '#FFFFFF', 'font-family': MONO, 'font-size': 12, 'font-weight': 800, 'letter-spacing': '.14em' }).textContent = copy.core.toUpperCase();

  const nodeEls = {};
  Object.entries(NODES).forEach(([k, n]) => {
    const g = el('g', { class: 'node' });
    el('circle', { cx: n.x, cy: n.y, r: 40, fill: 'rgba(115,212,247,.14)', filter: 'url(#hubglow)', class: 'node-halo' }, g);
    el('circle', { cx: n.x, cy: n.y, r: 30, fill: '#0A2350', stroke: 'rgba(199,218,235,.35)', 'stroke-width': 1.5, class: 'node-ring' }, g);
    el('g', { transform: `translate(${n.x - 12} ${n.y - 12})`, fill: 'none', stroke: n.side === 'L' ? '#73D4F7' : '#FFFFFF', 'stroke-width': 1.7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g).innerHTML = ICONS[k];
    const t = el('text', { x: n.x, y: n.y + 50, 'text-anchor': 'middle', fill: 'rgba(255,255,255,.8)', 'font-family': MONO, 'font-size': 11, 'font-weight': 700, 'letter-spacing': '.08em', 'data-fit': 11 }, g);
    String(copy.nodes[k]).toUpperCase().split('|').forEach((line, i) => { const ts = el('tspan', { x: n.x, dy: i ? 13 : 0 }, t); ts.textContent = line; });
    nodeEls[k] = g;
  });
  copy.sides.forEach((txt, i) => { el('text', { x: i ? 396 : 64, y: 46, 'text-anchor': 'middle', fill: 'rgba(115,212,247,.75)', 'font-family': MONO, 'font-size': 10.5, 'font-weight': 700, 'letter-spacing': '.12em', 'data-fit': 10.5 }).textContent = txt.toUpperCase(); });
  // Rótulos longos (ES e PT) diminuem até caber entre a ponta e a borda do desenho
  const fitLabels = () => svg.querySelectorAll('[data-fit]').forEach((t) => {
    let fs = Number(t.dataset.fit); t.setAttribute('font-size', fs);
    const cx = Number(t.getAttribute('x')), room = 2 * Math.min(cx, VW - cx) - 10;
    let w = t.getBBox().width;
    while (w > room && fs > 7.5) { fs -= 0.25; t.setAttribute('font-size', fs); w = t.getBBox().width; }
  });
  fitLabels();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitLabels);

  // Etiqueta branca perto de uma ponta (criada na hora, para medir o texto já com a fonte carregada)
  const DOTS = { Cleared: '#2065D5' };
  function chip(k, text, dotColor) {
    const n = NODES[k];
    const g = el('g', { class: 'hubchip' });
    const r = el('rect', { height: 22, rx: 11, fill: '#FFFFFF' }, g);
    const t = el('text', { fill: '#0F1729', 'font-family': MONO, 'font-size': 10.5, 'font-weight': 800, 'letter-spacing': '.06em' }, g);
    t.textContent = text.toUpperCase();
    const w = t.getComputedTextLength() + (dotColor ? 30 : 18);
    const x = Math.max(8, Math.min(VW - 8 - w, n.x - w / 2));
    const y = n.y + (n.y > 300 ? 76 : -46);
    r.setAttribute('x', x); r.setAttribute('y', y - 11); r.setAttribute('width', w);
    if (dotColor) { el('circle', { cx: x + 12, cy: y, r: 4, fill: dotColor }, g); t.setAttribute('x', x + 21); } else t.setAttribute('x', x + 9);
    t.setAttribute('y', y + 3.8);
    requestAnimationFrame(() => g.classList.add('is-on'));
    return () => { g.classList.remove('is-on'); setTimeout(() => g.remove(), 320); };
  }

  let visible = false, running = false;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  function send(k, toHub, ms = 750, faint = false) {
    return new Promise((res) => {
      const path = wires[k], len = path.getTotalLength();
      const dot = el('circle', { r: faint ? 2.2 : 4, fill: faint ? 'rgba(115,212,247,.6)' : '#FFFFFF' });
      const halo = faint ? null : el('circle', { r: 9, fill: 'rgba(115,212,247,.45)', filter: 'url(#hubglow)' });
      if (!faint) path.classList.add('is-hot');
      const t0 = performance.now();
      const step = (now) => {
        let u = Math.min(1, (now - t0) / ms); u = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
        const pt = path.getPointAtLength((toHub ? u : 1 - u) * len);
        dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
        if (halo) { halo.setAttribute('cx', pt.x); halo.setAttribute('cy', pt.y); }
        if (u < 1) requestAnimationFrame(step);
        else { dot.remove(); if (halo) halo.remove(); if (!faint) path.classList.remove('is-hot'); res(); }
      };
      requestAnimationFrame(step);
    });
  }
  const hot = (k, on) => nodeEls[k].classList.toggle('is-hot', on);
  const coreHot = (on) => core.classList.toggle('is-hot', on);

  async function loop() {
    if (running) return;
    running = true;
    while (visible) {
      for (const s of copy.stories) {
        if (!visible) break;
        hot(s.from, true); let off = chip(s.from, s.lang);
        await wait(500); await send(s.from, true);
        off(); hot(s.from, false); coreHot(true);
        await wait(250); await send(s.to, false);
        coreHot(false); hot(s.to, true); off = chip(s.to, s.action);
        await wait(900); await send(s.to, true, 650);
        off(); hot(s.to, false); coreHot(true);
        await wait(200); await send(s.from, false, 650);
        coreHot(false); hot(s.from, true); off = chip(s.from, s.back, DOTS[s.back] || '#2ECC71');
        await wait(1300);
        off(); hot(s.from, false);
        await wait(250);
      }
    }
    running = false;
  }
  if (reduced || !('IntersectionObserver' in window)) { chip(copy.stories[0].from, copy.stories[0].back, DOTS[copy.stories[0].back] || '#2ECC71'); return; }
  const ambient = () => { if (!visible) return; const ks = Object.keys(wires); send(ks[Math.floor(Math.random() * ks.length)], Math.random() < .5, 1400, true); };
  let amb = null;
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    root.classList.toggle('is-off', !visible);
    if (visible) { if (!amb) amb = setInterval(ambient, 700); loop(); }
    else if (amb) { clearInterval(amb); amb = null; }
  }, { threshold: 0.2 }).observe(root);
}

/* Chips de tipo de projeto preenchem o formulário */
const select = document.querySelector('[data-project-select]');
document.querySelectorAll('[data-project-chip]').forEach((chip) => {
  chip.addEventListener('click', () => {
    if (select) {
      select.value = chip.dataset.projectChip;
      select.closest('.field')?.classList.remove('is-invalid');
    }
    scrollToHash('#contact');
    setTimeout(() => document.getElementById('f-name')?.focus({ preventScroll: true }), 1300);
  });
});

/* Formulário */
// PROVISÓRIO: definir o destino (e-mail, CRM ou webhook). Enquanto FORM_ENDPOINT for vazio, nada é enviado.
const FORM_ENDPOINT = '';
document.querySelectorAll('[data-form]').forEach((form) => {
  const status = form.querySelector('[data-form-status]');
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const check = (field) => {
    const input = field.querySelector('input, select, textarea');
    if (!input || !input.required) return true;
    const v = input.value.trim();
    const ok = input.type === 'checkbox' ? input.checked : input.type === 'email' ? emailOk(v) : v.length > 0;
    field.classList.toggle('is-invalid', !ok);
    input.setAttribute('aria-invalid', String(!ok));
    return ok;
  };
  form.querySelectorAll('.field').forEach((f) => {
    const input = f.querySelector('input, select, textarea');
    input?.addEventListener('blur', () => { if (f.classList.contains('is-invalid')) check(f); });
    input?.addEventListener('input', () => { if (f.classList.contains('is-invalid')) check(f); });
    input?.addEventListener('change', () => { if (f.classList.contains('is-invalid')) check(f); });
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('.field')];
    const results = fields.map(check);
    if (results.includes(false)) {
      status.className = 'form__status is-error';
      status.textContent = UI.form.invalid;
      fields[results.indexOf(false)].querySelector('input, select, textarea')?.focus();
      return;
    }
    if (!FORM_ENDPOINT) {
      status.className = 'form__status is-error';
      status.textContent = UI.form.notConnected;
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.className = 'form__status';
    status.textContent = UI.form.sending;
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      status.className = 'form__status is-ok';
      status.textContent = UI.form.ok;
    } catch (err) {
      status.className = 'form__status is-error';
      status.textContent = UI.form.error;
    } finally {
      btn.disabled = false;
    }
  });
});

window.addEventListener('load', () => ScrollTrigger.refresh());
