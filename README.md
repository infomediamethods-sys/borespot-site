# Bore Spot Site

Landing page estática da Bore Spot em Astro 5, com versões em inglês, espanhol e português, páginas de Referral Program e documentos legais.

## Desenvolvimento

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Build para GitHub Pages

A prévia pública roda em uma subpasta do GitHub Pages:

```bash
BASE_PATH=/borespot-site PUBLIC_NOINDEX=true npm run build
```

O conteúdo gerado em `dist/` é publicado na branch `gh-pages`.

Prévia: `https://infomediamethods-sys.github.io/borespot-site/en/`

## Build para domínio raiz

Para gerar o site como raiz do domínio oficial, sem prefixo de subpasta:

```bash
npm run build
```
