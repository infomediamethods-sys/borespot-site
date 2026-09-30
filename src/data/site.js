// Dados que não mudam com o idioma. Os textos de cada idioma ficam em src/i18n/ (en.js, es.js, pt.js).
// Regra do projeto: toda informação tem que bater com o site atual (borespot.com). Nada inventado, nada importante de fora.

export const site = {
  name: 'Bore Spot',
  legalName: 'BoreSpot LLC',
  url: 'https://borespot.com',
  // Contatos: iguais ao rodapé do site atual.
  phone: '+1 (321) 237-3200',
  phoneHref: 'tel:+13212373200',
  email: 'office@borespot.com',
  // PROVISÓRIO: link de agendamento ainda não definido. Enquanto isso, o CTA leva ao formulário.
  bookingUrl: '#contact',
  // DECISÃO FINAL (Armin, 27/09): a intro roda em toda visita, para todo mundo. Não trocar para false antes de publicar.
  // (Com false, voltaria a rodar só uma vez por sessão.)
  introAlways: true,
};

// Idiomas do site, na mesma estrutura de endereços do site atual (/en, /es, /pt).
export const LANGS = ['en', 'es', 'pt'];
export const DEFAULT_LANG = 'en';
export const LANG_LABELS = { en: 'EN', es: 'ES', pt: 'PT' };
export const HTML_LANG = { en: 'en', es: 'es', pt: 'pt-BR' };
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const withBase = (p) => (typeof p === 'string' && p.startsWith('/') && !p.startsWith('//') ? BASE + p : p);

// Os 24 logos do site atual (mesmos nomes de empresa do site atual; a Lumen lá aparece como "Lumen Energy" no texto alternativo, mas o logo é o da Lumen de telecom).
export const logos = [
  'att', 'verizon', 'comcast', 'spectrum', 'google-fiber', 'charter', 'frontier', 'cox', 'zayo',
  'lumen', 'brightspeed', 'metronet', 'altafiber', 'gigapower', 'tillman-fiber', 'live-oak-fiber',
  'omni-fiber', 'mastec', 'mears', 'pike-electric', 'duke-energy', 'fpl', 'fiber-technologies-solutions',
  'city-of-palm-coast',
];
export const logoNames = {
  att: 'AT&T', verizon: 'Verizon', comcast: 'Comcast', spectrum: 'Spectrum', 'google-fiber': 'Google Fiber',
  charter: 'Charter Communications', frontier: 'Frontier Communications', cox: 'Cox', zayo: 'Zayo', lumen: 'Lumen',
  brightspeed: 'Brightspeed', metronet: 'Metronet', altafiber: 'altafiber', gigapower: 'GigaPower',
  'tillman-fiber': 'Tillman Fiber', 'live-oak-fiber': 'Live Oak Fiber', 'omni-fiber': 'Omni Fiber', mastec: 'MasTec',
  mears: 'Mears', 'pike-electric': 'Pike Electric', 'duke-energy': 'Duke Energy', fpl: 'FPL',
  'fiber-technologies-solutions': 'Fiber Technologies Solutions', 'city-of-palm-coast': 'City of Palm Coast',
};

// Tipos de projeto do formulário do site atual. O valor enviado é sempre este (em inglês); o rótulo muda com o idioma.
export const PROJECT_TYPES = ['HDD', 'Fiber Installation', 'Plow', 'Missile', 'Aerial', 'Plumbing', 'Other'];

// Números públicos do site atual.
export const proof = {
  // PROVISÓRIO: o número de clientes ainda não chegou. Quando chegar, preencher clientCount e a cena 3 troca sozinha.
  clientCount: null,
  feet: { value: 3.5, decimals: 1, suffix: 'M+' },
};

// Imagens por bloco (os textos alternativos ficam em cada idioma).
// 27/09: as fotos de IA foram trocadas por fotos reais de bancos gratuitos (Pexels e Unsplash, uso comercial
// permitido, crédito não obrigatório). Origem de cada uma em imagens.md do projeto. As ia-*.webp antigas
// continuam em public/img/photos/ sem uso.
export const images = {
  problem: ['foto-problema-equipe-parada', 'foto-problema-marcacao-locate', 'foto-problema-escritorio-telefone', 'foto-problema-dono-telefone'],
  roles: {
    owner: { src: 'foto-cargo-owner', w: [960, 1920] },
    // 27/09 (Armin): na aba Project Manager vai só o mockup da hero (tablet e celular, sem os cards), com o fundo transparente.
    pm: { src: 'bore-spot-mockup-tablet-iphone', dir: 'product', w: [800, 1200], size: [1200, 837], mockup: true },
    office: { src: 'foto-cargo-office-team', w: [960, 1920] },
    foreman: { src: 'foto-cargo-field-foreman', w: [960, 1920] },
  },
  why: 'foto-diferenciais-escavacao',
};

// Endereço de uma página num idioma. path: '' (landing), '/referral', '/legal/terms-and-conditions'...
export const href = (lang, path = '') => withBase(`/${lang}${path}`);

// Resolve um link de menu. item.to = âncora da landing ('#services'); item.page = outra página ('/referral').
// Na landing as âncoras ficam locais (rolagem suave); nas outras páginas apontam para a landing do idioma.
export const linkTo = (lang, item, isHome) => {
  if (item.url) return item.url;
  if (item.page) return withBase(`/${lang}${item.page}`);
  if (item.to === '#top') return isHome ? '#top' : withBase(`/${lang}/`);
  if (item.to && item.to.startsWith('#')) return isHome ? item.to : withBase(`/${lang}/${item.to}`);
  return item.to;
};
export const bookingHref = (lang, isHome) => linkTo(lang, site.bookingUrl.startsWith('#') ? { to: site.bookingUrl } : { url: site.bookingUrl }, isHome);
