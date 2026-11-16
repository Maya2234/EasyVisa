import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  // GitHub Pages serves the site from /EasyVisa/, not from the root
  base: '/EasyVisa/'
});
