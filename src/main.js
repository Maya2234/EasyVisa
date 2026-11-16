import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';

// Make smaller screens look like a scaled-down copy of a MacBook screen.
// Windows laptops (e.g. a 1080p Dell at 150% display scaling) give the browser
// only about 1280×650, so everything looks oversized there. We shrink the whole
// page by the same amount instead, so it keeps the same proportions as on a Mac.
const DESIGN_WIDTH = 1440;  // roughly a 13–14" MacBook browser window
const DESIGN_HEIGHT = 800;
const SMALLEST_ZOOM = 0.75; // never shrink text further than this

function fitToScreen() {
  const root = document.documentElement;
  // Phones and tablets have their own layouts, so leave them alone
  if (window.innerWidth < 900) {
    root.style.zoom = '';
    root.style.setProperty('--zoom', 1);
    return;
  }
  const zoom = Math.max(
    SMALLEST_ZOOM,
    Math.min(1, window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT)
  );
  root.style.zoom = zoom;
  root.style.setProperty('--zoom', zoom);
}

fitToScreen();
window.addEventListener('resize', fitToScreen);

mount(App, { target: document.getElementById('app') });
