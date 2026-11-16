<script>
  import { t } from './i18n.svelte.js';
  import { DEMO_ID, openSavedApplication } from './application.svelte.js';
  // Icons from the Lucide icon library (lucide.dev)
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
  import CircleAlert from '@lucide/svelte/icons/circle-alert';
  import KeyRound from '@lucide/svelte/icons/key-round';
  import LoaderCircle from '@lucide/svelte/icons/loader-circle';
  import Plus from '@lucide/svelte/icons/plus';
  import CircleCheck from '@lucide/svelte/icons/circle-check';

  let { goTo } = $props();

  // What the person has typed in the Application ID box
  let applicationId = $state('');

  // Where the search is at: 'idle', 'searching', 'not-found' or 'found'
  let status = $state('idle');

  // Application IDs are exactly 10 letters and numbers, like AA00ABCDEF
  const ID_LENGTH = 10;

  let searchTimer;

  // Upper-case as they type, drop spaces/dashes, and never allow more than 10.
  // As soon as all 10 are in, look the application up.
  function cleanUp(event) {
    const cleaned = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, ID_LENGTH);
    applicationId = cleaned;
    event.target.value = cleaned; // keep the box in sync even if the value didn't change

    clearTimeout(searchTimer);
    if (cleaned.length === ID_LENGTH) {
      status = 'searching';
      searchTimer = setTimeout(search, 700);
    } else {
      status = 'idle';
    }
  }

  // This prototype isn't connected to a database, so only the demo ID
  // (shown under the box) "finds" a saved application.
  function search() {
    status = applicationId === DEMO_ID ? 'found' : 'not-found';
  }

  // Identity check answers, filled in so the demo can be clicked through
  let surnameStart = $state('DOE');
  let birthYear = $state('1996');
  let securityAnswer = $state('Luna');

  const identityComplete = $derived(
    surnameStart.trim().length > 0 && birthYear.trim().length === 4 && securityAnswer.trim().length > 0
  );

  // The forward arrow only works once an application has been found
  function retrieve(event) {
    event.preventDefault();
    if (status !== 'found' || !identityComplete) return;
    openSavedApplication(applicationId);
    goTo('form');
  }

  function useDemoId() {
    applicationId = DEMO_ID;
    status = 'searching';
    clearTimeout(searchTimer);
    searchTimer = setTimeout(search, 700);
  }
</script>

<div class="container">
  <button class="back-link" onclick={() => goTo('home')}>
    <ArrowLeft size={18} />
    {t('common.back')}
  </button>

  <h1 class="page-title">{t('retrieve.title')}</h1>
  <p class="page-intro">{t('retrieve.intro')}</p>

  <!-- Main card on the left, help panel on the right (stacks on small screens) -->
  <div class="layout">
    <form class="card card-accent" onsubmit={retrieve} novalidate>
      <h2 class="card-heading">{t('retrieve.cardTitle')}</h2>

      <div class="fields">
        <div class="field">
          <label class="field-label" for="application-id">{t('retrieve.label')}</label>
          <p class="hint" id="id-hint">{t('retrieve.hint')}</p>

          <div class="input-box" class:has-error={status === 'not-found'}>
            <KeyRound size={20} />
            <input
              id="application-id"
              type="text"
              value={applicationId}
              oninput={cleanUp}
              placeholder="AA00ABCDEF"
              maxlength={ID_LENGTH}
              autocomplete="off"
              spellcheck="false"
              aria-describedby="id-hint"
              aria-invalid={status === 'not-found'}
            />
            {#if status === 'searching'}
              <span class="counter searching"><LoaderCircle size={16} /> {t('retrieve.searching')}</span>
            {:else}
              <span class="counter">{applicationId.length}/{ID_LENGTH}</span>
            {/if}
          </div>
        </div>

        <p class="demo-note">
          {t('retrieve.demoNote')}
          <button type="button" class="text-button demo-button" onclick={useDemoId}>{DEMO_ID}</button>
        </p>

        {#if status === 'found'}
          <div class="alert success" role="status">
            <CircleCheck size={22} />
            <div>
              <h3>{t('retrieve.found', applicationId)}</h3>
              <p>{t('retrieve.foundText')}</p>
            </div>
          </div>

          <fieldset class="identity">
            <legend class="field-label">{t('retrieve.identityTitle')}</legend>
            <label class="small-field">
              <span>{t('retrieve.surnameStart')}</span>
              <input type="text" maxlength="5" bind:value={surnameStart} />
            </label>
            <label class="small-field">
              <span>{t('retrieve.birthYear')}</span>
              <input type="text" inputmode="numeric" maxlength="4" bind:value={birthYear} />
            </label>
            <label class="small-field wide">
              <span>{t('retrieve.securityQuestion')}</span>
              <input type="text" bind:value={securityAnswer} />
            </label>
          </fieldset>
        {/if}

        {#if status === 'not-found'}
          <div class="alert" role="alert">
            <CircleAlert size={22} />
            <div>
              <h3>{t('retrieve.notFound', applicationId)}</h3>
              <p>{t('retrieve.notFoundText')}</p>
              <button type="button" class="text-button" onclick={() => goTo('terms')}>
                <Plus size={16} />
                {t('retrieve.startInstead')}
              </button>
            </div>
          </div>
        {/if}

        {#if status !== 'found'}
          <p class="next-note">{t('retrieve.nextNote')}</p>
        {/if}
      </div>

      <div class="form-actions bottom">
        <button type="button" class="square-button outline-button" onclick={() => goTo('home')} aria-label={t('common.back')}>
          <ArrowLeft size={24} />
        </button>
        <button type="submit" class="square-button primary-button" disabled={status !== 'found' || !identityComplete} aria-label={t('retrieve.continue')}>
          <ArrowRight size={24} />
        </button>
      </div>
    </form>

    <aside class="help-panel">
      <h3>{t('retrieve.helpTitle')}</h3>
      <p>{t('retrieve.helpText')}</p>
      <hr />
      <p>{t('retrieve.helpLost')}</p>
      <a class="resource-link" href="https://ceac.state.gov/genniv/" target="_blank">
        {t('common.readInstructions')}
        <ArrowUpRight size={16} />
      </a>
    </aside>
  </div>
</div>

<style>
  /* Same two-column layout as the terms page */
  .layout {
    margin-top: 32px;
    display: grid;
    grid-template-columns: 1fr 320px;
    align-items: start;
    gap: 32px;
  }

  @media (max-width: 900px) {
    .layout {
      grid-template-columns: 1fr;
    }
  }

  .fields {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 560px;
  }

  .field-label {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--text-dark);
  }

  .hint {
    font-size: 14px;
    line-height: 1.6;
  }

  /* Text box with a key icon on the left and a character count on the right */
  .input-box {
    margin-top: 4px;
    min-height: 54px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    background: white;
    border: 1px solid #8797a1;
    border-radius: 4px;
    color: var(--text);
  }

  .input-box:focus-within {
    outline: 2px solid var(--blue);
    outline-offset: 1px;
  }

  .input-box.has-error {
    border-color: #b3261e;
  }

  .input-box input {
    flex: 1;
    min-width: 0;
    height: 52px;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 2px;
    color: var(--text-dark);
  }

  .input-box input::placeholder {
    color: #aab5bc;
  }

  .counter {
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }

  .searching {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--blue);
  }

  /* Spinning loader while "searching" */
  .searching :global(svg) {
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* "Not found" message: tinted box with a red bar, like the terms notice */
  .alert {
    padding: 18px 20px;
    display: flex;
    gap: 14px;
    background: #fdf1f0;
    border-inline-start: 3px solid #b3261e;
    color: #b3261e;
  }

  .alert h3 {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--text-dark);
  }

  .alert p {
    margin-top: 6px;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text);
  }

  .text-button {
    margin-top: 12px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    font-size: 14px;
    font-weight: 600;
    color: var(--blue);
    text-decoration: underline;
  }

  .demo-note {
    margin-top: -8px;
    font-size: 13px;
    color: var(--text);
  }

  .demo-button {
    margin: 0 0 0 4px;
    letter-spacing: 1px;
  }

  .alert.success {
    background: #eef7ef;
    border-inline-start-color: #2e7d32;
    color: #2e7d32;
  }

  /* Identity check: three short fields */
  .identity {
    margin: 0;
    padding: 0;
    border: none;
    max-width: 560px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px 20px;
  }

  .identity legend {
    margin-bottom: 14px;
    padding: 0;
  }

  .small-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-dark);
  }

  .small-field.wide {
    grid-column: 1 / -1;
  }

  .small-field input {
    min-height: 46px;
    padding: 0 14px;
    border: 1px solid #8797a1;
    border-radius: 4px;
    font-family: inherit;
    font-size: 16px;
    font-weight: 400;
    color: var(--text-dark);
  }

  .small-field input:focus {
    outline: 2px solid var(--blue);
    outline-offset: 1px;
  }

  .next-note {
    font-size: 14px;
    line-height: 1.6;
  }

  .bottom {
    padding: 0 32px 32px;
  }

  /* Help panel, same look as "What happens next?" on the terms page */
  .help-panel {
    padding: 28px;
    background: var(--tint);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 14px;
    line-height: 1.65;
  }

  .help-panel h3 {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--heading);
  }

  .help-panel .resource-link {
    align-self: flex-start;
  }

  @media (max-width: 700px) {
    .fields {
      padding: 24px 16px;
    }

    .bottom {
      padding: 0 16px 24px;
    }
  }
</style>
