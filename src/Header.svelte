<script>
  // Icons from the Lucide icon library (lucide.dev)
  import Languages from '@lucide/svelte/icons/languages';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import CircleQuestionMark from '@lucide/svelte/icons/circle-question-mark';

  // The language dropdown is only for show: picking an option does nothing.
  const languages = ['English', 'Español', '中文', 'हिन्दी', 'العربية', 'Português', 'Français', 'Tiếng Việt', '한국어'];
</script>

<header>
  <div class="top-bar">
    <div class="wrap top-inner">
      <img class="logo" src="/images/badge-title.png" alt="Consular Electronic Application Center, U.S. Department of State" />

      <!-- Language picker: a real dropdown with the icons drawn on top -->
      <label class="language-picker">
        <Languages size={20} />
        <select aria-label="Language">
          {#each languages as name}
            <option>{name}</option>
          {/each}
        </select>
        <ChevronDown size={16} />
      </label>
    </div>
  </div>

  <nav>
    <div class="wrap nav-inner">
      <span class="current-service">DS-160 · Online Nonimmigrant Visa</span>

      <a href="#help" class="help-link">
        <CircleQuestionMark size={18} />
        Help &amp; FAQs
      </a>
    </div>
  </nav>
</header>

<style>
  .top-bar {
    background: var(--navy);
    padding: 40px 0;
  }

  .top-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  .logo {
    width: 760px;
    max-width: 100%;
    height: auto;
  }

  .language-picker {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border: 1px solid #6b8292;
    border-radius: 4px;
    color: white;
  }

  .language-picker select {
    appearance: none;
    background: transparent;
    border: none;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }

  /* Keep the menu items readable (dark text on white) */
  .language-picker option {
    color: black;
  }

  nav {
    border-bottom: 1px solid var(--border);
  }

  .nav-inner {
    min-height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 14px;
  }

  .current-service {
    align-self: stretch;
    display: flex;
    align-items: center;
    color: var(--heading);
    border-bottom: 3px solid var(--blue);
  }

  .help-link {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    text-decoration: none;
  }

  @media (max-width: 700px) {
    .top-bar {
      padding: 24px 0;
    }

    .nav-inner {
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .current-service {
      border-bottom: none;
    }
  }
</style>
