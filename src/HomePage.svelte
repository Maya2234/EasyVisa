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
  import Info from '@lucide/svelte/icons/info';
  import X from '@lucide/svelte/icons/x';

  // goTo lets this page switch to another screen
  let { goTo } = $props();

  // The "What to have ready" popup. A <dialog> closes itself with Escape.
  let documentsDialog;

  // Clicking the dark area outside the popup also closes it
  function closeIfOutside(event) {
    if (event.target === documentsDialog) documentsDialog.close();
  }
</script>

<div class="container page">
  <div>
    <h1 class="page-title">{t('common.applyTitle')}</h1>
    <p class="page-intro">{t('home.intro')}</p>
  </div>

  <section class="before">
    <div class="before-heading">
      <h2>{t('home.beforeTitle')}</h2>
      <a class="resource-link" href="https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/forms/ds-160-online-nonimmigrant-visa-application/ds-160-faqs.html" target="_blank">
        {t('home.fullInstructions')}
        <ArrowUpRight size={16} />
      </a>
    </div>

    <div class="card checklist">
      <div class="checklist-item">
        <div class="item-heading">
          <NotebookTabs size={20} />
          <h3>{t('home.gatherTitle')}</h3>
          <button class="info-button" onclick={() => documentsDialog.showModal()} aria-label={t('home.gatherInfoLabel')}>
            <Info size={20} />
          </button>
        </div>
        <p>{t('home.gatherText')}</p>
      </div>
      <div class="checklist-item">
        <div class="item-heading">
          <SquareUserRound size={20} />
          <h3>{t('home.photoTitle')}</h3>
        </div>
        <p>
          <a href="https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html" target="_blank">{t('home.photoLink')} <span class="no-wrap">{t('home.photoLinkEnd')}<span class="link-arrow"><ArrowUpRight size={14} /></span></span></a>{t('home.photoText')}
        </p>
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

  <!-- Popup opened by the (i) button next to "Gather your information" -->
  <dialog class="documents-dialog" bind:this={documentsDialog} onclick={closeIfOutside} aria-labelledby="documents-title">
    <div class="dialog-content">
      <div class="dialog-header">
        <h2 id="documents-title">{t('docs.title')}</h2>
        <button class="close-button" onclick={() => documentsDialog.close()} aria-label={t('docs.close')}>
          <X size={22} />
        </button>
      </div>

      <p>{t('docs.intro')}</p>
      <ul>
        <li>{t('docs.passport')}</li>
        <li>{t('docs.itinerary')}</li>
        <li>{t('docs.trips')}</li>
        <li>{t('docs.resume')}</li>
        <li>{t('docs.other')}</li>
      </ul>

      <p>{t('docs.extraIntro')}</p>
      <ul>
        <li><strong>{t('docs.studentsLabel')}</strong> {t('docs.studentsText')}</li>
        <li><strong>{t('docs.petitionLabel')}</strong> {t('docs.petitionText')}</li>
        <li><strong>{t('docs.workersLabel')}</strong> {t('docs.workersText')}</li>
      </ul>
    </div>
  </dialog>

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

  /* The small (i) button next to "Gather your information" */
  .info-button {
    display: flex;
    padding: 2px;
    background: none;
    border: none;
    border-radius: 50%;
    color: var(--blue);
  }

  .info-button:hover {
    background: var(--tint);
  }

  /* The popup: centered, scrolls if the text is taller than the screen */
  .documents-dialog {
    width: min(640px, calc(100% - 32px));
    max-height: 85vh;
    padding: 0;
    border: none;
    border-top: 4px solid var(--blue);
    color: var(--text);
  }

  .documents-dialog::backdrop {
    background: rgba(10, 49, 78, 0.5);
  }

  .dialog-content {
    padding: 28px;
    font-size: 15px;
    line-height: 1.6;
  }

  .dialog-header {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .dialog-header h2 {
    font-size: 22px;
    font-weight: 600;
    color: var(--heading);
  }

  .close-button {
    display: flex;
    padding: 4px;
    background: none;
    border: none;
    color: var(--text-dark);
  }

  .dialog-content ul {
    margin: 10px 0 20px;
    padding-inline-start: 22px;
  }

  .dialog-content li + li {
    margin-top: 8px;
  }

  .dialog-content strong {
    color: var(--text-dark);
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

  /* Keeps the last word and the arrow together on one line */
  .no-wrap {
    white-space: nowrap;
  }

  /* Small arrow after a link in a sentence, so it reads as a link */
  .link-arrow {
    display: inline-block;
    margin-inline-start: 4px;
    vertical-align: -2px;
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
