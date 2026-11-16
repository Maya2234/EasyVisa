<script>
  import { t } from './i18n.svelte.js';
  // Icons from the Lucide icon library (lucide.dev)
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
  import NotebookTabs from '@lucide/svelte/icons/notebook-tabs';
  import SquareUserRound from '@lucide/svelte/icons/square-user-round';
  import ShieldCheck from '@lucide/svelte/icons/shield-check';
  import FileCheckCorner from '@lucide/svelte/icons/file-check-corner';
  import KeyRound from '@lucide/svelte/icons/key-round';
  import UserRound from '@lucide/svelte/icons/user-round';
  import Calendar from '@lucide/svelte/icons/calendar';
  import ShieldQuestion from '@lucide/svelte/icons/shield-question-mark';

  // goTo lets this page switch to another screen
  let { goTo } = $props();
</script>

<div class="container page">
  <div>
    <h1 class="page-title">{t('common.applyTitle')}</h1>
    <p class="page-intro">{t('home.intro')}</p>
  </div>

  <section class="before">
    <div class="before-heading">
      <h2>{t('home.beforeTitle')}</h2>
      <a class="resource-link" href="https://ceac.state.gov/genniv/" target="_blank">
        {t('home.fullInstructions')}
        <ArrowUpRight size={16} />
      </a>
    </div>

    <div class="card checklist">
      <div class="checklist-item">
        <div class="item-heading">
          <NotebookTabs size={20} />
          <h3>{t('home.gatherTitle')}</h3>
        </div>
        <p>{t('home.gatherText')}</p>
      </div>
      <div class="checklist-item">
        <div class="item-heading">
          <SquareUserRound size={20} />
          <h3>{t('home.photoTitle')}</h3>
        </div>
        <p>{t('home.photoText')}</p>
      </div>
      <div class="checklist-item">
        <div class="item-heading">
          <ShieldCheck size={20} />
          <h3>{t('home.safeTitle')}</h3>
        </div>
        <p>{t('home.safeText')}</p>
      </div>
    </div>
  </section>

  <!-- The two option cards, stacked -->
  <div class="options">
    <section class="card option">
      <h2>{t('home.startTitle')}</h2>
      <button class="button primary-button" onclick={() => goTo('terms')}>
        {t('home.startButton')}
        <ArrowRight size={19} />
      </button>
    </section>

    <section class="card option">
      <div>
        <h2>{t('home.startedTitle')}</h2>
        <p class="option-text">{t('home.startedText')}</p>
      </div>

      <!-- What you'll be asked for, as a tidy list -->
      <div class="need">
        <p class="need-title">{t('home.needTitle')}</p>
        <ul>
          <li><KeyRound size={17} /> {t('home.needId')}</li>
          <li><UserRound size={17} /> {t('home.needSurname')}</li>
          <li><Calendar size={17} /> {t('home.needYear')}</li>
          <li><ShieldQuestion size={17} /> {t('home.needSecurity')}</li>
        </ul>
      </div>
      <button class="button outline-button" onclick={() => goTo('retrieve')}>
        {t('home.retrieveButton')}
        <ArrowRight size={19} />
      </button>
    </section>
  </div>

  <!-- What happens after you submit -->
  <div class="after-submit">
    <FileCheckCorner size={21} />
    <div>
      <h3>{t('home.afterTitle')}</h3>
      <p>{t('home.afterText')}</p>
    </div>
  </div>
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .option {
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .option h2 {
    font-size: 23px;
    font-weight: 600;
    line-height: 1.3;
    color: var(--heading);
  }

  .option-text {
    margin-top: 10px;
    font-size: 15px;
    line-height: 1.6;
  }

  /* "Have these ready" box: light blue, items in two columns */
  .need {
    padding: 16px 20px;
    background: var(--tint);
    border-radius: 6px;
  }

  .need-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-dark);
  }

  .need ul {
    margin: 10px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 24px;
    font-size: 14px;
  }

  .need li {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .need li :global(svg) {
    flex-shrink: 0;
    color: var(--blue);
  }

  @media (max-width: 700px) {
    .need ul {
      grid-template-columns: 1fr;
    }
  }

  .before {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .before-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .before-heading h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--heading);
  }

  /* Three equal columns with a thin line between them */
  .checklist {
    padding: 28px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .checklist-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-inline-end: 24px;
    border-inline-end: 1px solid var(--border);
  }

  .checklist-item:last-child {
    padding-inline-end: 0;
    border-inline-end: none;
  }

  /* On phones: one column, with the lines going across instead */
  @media (max-width: 800px) {
    .checklist {
      grid-template-columns: 1fr;
    }

    .checklist-item {
      padding-inline-end: 0;
      padding-bottom: 20px;
      border-inline-end: none;
      border-bottom: 1px solid var(--border);
    }

    .checklist-item:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }
  }

  /* Icon and title side by side on one line (the icon uses this blue) */
  .item-heading {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--blue);
  }

  .checklist-item h3 {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--heading);
  }

  .checklist-item p {
    font-size: 13.5px;
    line-height: 1.55;
  }

  /* The icon uses the blue; the text below sets its own colors */
  .after-submit {
    padding: 0 4px;
    display: flex;
    gap: 14px;
    font-size: 14px;
    color: var(--blue);
  }

  .after-submit h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-dark);
  }

  .after-submit p {
    margin-top: 5px;
    color: var(--text);
    line-height: 1.6;
  }
</style>
