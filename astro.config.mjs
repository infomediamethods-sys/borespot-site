import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://borespot.com',
  base: process.env.BASE_PATH || '/',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  // Mesma estrutura de endereços do site atual: /en, /es, /pt. A raiz (src/pages/index.astro) leva para /en/.
});
