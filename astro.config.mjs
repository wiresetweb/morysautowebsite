// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs and sitemap. Update to the production domain at launch.
  site: 'https://morysautoparts.com',
  integrations: [
    sitemap({
      // Keep the staff area out of the sitemap.
      filter: (page) => !page.includes('/admin'),
      // Per-URL hreflang alternates in sitemap.xml — strongest signal to Google
      // that /es/<path> and /<path> are the same page in different languages.
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-US' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
