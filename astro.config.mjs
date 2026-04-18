import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://curlupclub.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/client-intake') && !page.includes('/thank-you'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: true,
  },
});
