// Painel da hero: desenha as rotas e troca um status de ticket de tempos em tempos (dados de exemplo).
let started = false;

export function startHeroPanel(reduced = false) {
  const panel = document.querySelector('[data-tpanel]');
  if (!panel || started) return;
  started = true;
  panel.classList.add('is-live');
  if (reduced) return;

  const counts = {};
  panel.querySelectorAll('[data-count]').forEach((el) => (counts[el.dataset.count] = el));
  const setCount = (st, delta) => {
    const el = counts[st];
    if (el) el.textContent = String(Number(el.textContent) + delta);
  };
  const retag = (sel, from, to) => {
    panel.querySelectorAll(sel).forEach((p) => {
      p.classList.remove(`st-${from}`);
      p.classList.add(`st-${to}`);
    });
  };
  const layer = (from, to) => {
    const li = panel.querySelector(`[data-layer-status="${from}"]`);
    if (!li) return;
    li.dataset.layerStatus = to;
    const dot = li.querySelector('.dot');
    dot.classList.remove(`st-${from}`);
    dot.classList.add(`st-${to}`);
  };

  // Sequência: ticket aguardando locate é liberado; ticket com renovação vencendo é renovado; depois volta ao início.
  const steps = [
    () => { retag('[data-cycle="a"]', 'waiting', 'cleared'); setCount('waiting', -1); setCount('cleared', 1); layer('waiting', 'cleared'); },
    () => { retag('[data-cycle="b"]', 'renewal', 'active'); setCount('renewal', -1); setCount('active', 1); layer('renewal', 'active'); },
    () => {
      retag('[data-cycle="a"]', 'cleared', 'waiting'); setCount('waiting', 1); setCount('cleared', -1); layer('cleared', 'waiting');
      retag('[data-cycle="b"]', 'active', 'renewal'); setCount('renewal', 1); setCount('active', -1); layer('active', 'renewal');
    },
  ];
  let i = 0;
  let timer = null;
  const run = () => {
    if (timer) return;
    timer = setInterval(() => { steps[i % steps.length](); i++; }, 3800);
  };
  const stop = () => { clearInterval(timer); timer = null; };
  new IntersectionObserver(([e]) => (e.isIntersecting ? run() : stop()), { threshold: 0.2 }).observe(panel);
}
