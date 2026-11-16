<script>
  import { t, i18n, languages, setLanguage } from './i18n.svelte.js';
  // Icons from the Lucide icon library (lucide.dev)
  import Languages from '@lucide/svelte/icons/languages';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import CircleQuestionMark from '@lucide/svelte/icons/circle-question-mark';

  // English and Spanish work; the rest are listed but greyed out for now.
  function changeLanguage(event) {
    setLanguage(event.target.value);
  }
</script>

<header>
  <div class="top-bar">
    <div class="wrap top-inner">
      <img class="logo" src="images/badge-title.png" alt={t('header.logoAlt')} />

      <!-- Language picker: a real dropdown with the icons drawn on top -->
      <label class="language-picker">
        <Languages size={20} />
        <select aria-label={t('header.language')} value={i18n.lang} onchange={changeLanguage}>
          {#each languages as language}
            <option value={language.code} disabled={!language.enabled}>
              {language.name}
            </option>
          {/each}
        </select>
        <ChevronDown size={16} />
      </label>
    </div>
  </div>

  <nav>
    <div class="wrap nav-inner">
      <span class="current-service">{t('header.service')}</span>

      <a href="#help" class="help-link">
        <CircleQuestionMark size={18} />
        {t('header.help')}
      </a>
    </div>
  </nav>
</header>

<style>
  .top-bar {
    background: var(--navy);
    padding: 32px 0;
  }

  .top-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  .logo {
    width: 560px;
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

  .language-picker option:disabled {
    color: #8797a1;
  }

  nav {
    border-bottom: 1px solid var(--border);
  }

  .nav-inner {
    min-height: 56px;
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
