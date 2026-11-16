<script>
  import { onMount } from 'svelte';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import HomePage from './HomePage.svelte';
  import TermsPage from './TermsPage.svelte';
  import StartApplicationPage from './StartApplicationPage.svelte';

  // Which screen is showing: 'home', 'terms' or 'start'
  let page = $state('home');

  // A refresh always shows the home page again, so always start at the top:
  // don't let the browser jump back to where you were, or to a #link in the address.
  history.scrollRestoration = 'manual';
  onMount(() => {
    if (location.hash) history.replaceState(null, '', location.pathname);
    window.scrollTo(0, 0);
  });

  function goTo(newPage) {
    page = newPage;
    window.scrollTo(0, 0);
  }
</script>

<div class="site">
  <Header />

  <main>
    {#if page === 'home'}
      <HomePage {goTo} />
    {:else if page === 'terms'}
      <TermsPage {goTo} />
    {:else if page === 'start'}
      <StartApplicationPage {goTo} />
    {/if}
  </main>

  <Footer />
</div>

<style>
  /* Header on top, footer at the bottom, page content fills the middle */
  .site {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }
</style>
