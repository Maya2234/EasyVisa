<script>
  import { t, i18n } from './i18n.svelte.js';
  import { application } from './application.svelte.js';
  // Icons from the Lucide icon library (lucide.dev)
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import Check from '@lucide/svelte/icons/check';
  import Save from '@lucide/svelte/icons/save';
  import UserRound from '@lucide/svelte/icons/user-round';
  import BookUser from '@lucide/svelte/icons/book-user';
  import Plane from '@lucide/svelte/icons/plane';
  import Mail from '@lucide/svelte/icons/mail';
  import KeyRound from '@lucide/svelte/icons/key-round';
  import LoaderCircle from '@lucide/svelte/icons/loader-circle';

  let { goTo } = $props();

  // Short names so the markup stays readable
  const a = application.answers;

  // Where "Back" goes depends on which path the person came from
  const backTo = application.source === 'saved' ? 'retrieve' : 'start';

  // Autosave: after every edit show "Saving…" with a spinner, then "Saved".
  // (Nothing is really stored; it just shows how autosave would feel.)
  // 'idle' = nothing changed yet, 'saving' = spinner, 'saved' = check mark
  let saveStatus = $state(application.lastSaved ? 'saved' : 'idle');
  let saveTimer;

  function save() {
    saveStatus = 'saving';
    clearTimeout(saveTimer);
    // Wait until they pause typing, then "finish" saving
    saveTimer = setTimeout(() => {
      application.lastSaved = new Date();
      saveStatus = 'saved';
    }, 900);
  }

  function continueToReview(event) {
    event.preventDefault();
    application.lastSaved = new Date();
    goTo('submit');
  }

  function formatTime(date) {
    return date.toLocaleString(i18n.lang === 'es' ? 'es' : 'en-US', {
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
    });
  }

  // The four sections, used for the little contents list on the side
  const sections = [
    { id: 'personal', key: 'form.personal', icon: UserRound },
    { id: 'passport', key: 'form.passport', icon: BookUser },
    { id: 'travel', key: 'form.travel', icon: Plane },
    { id: 'contact', key: 'form.contact', icon: Mail }
  ];
</script>

<!-- The autosave indicator, shown next to the Save button -->
{#snippet autosave(announce = false)}
  <span class="autosave {saveStatus}" role={announce ? 'status' : undefined} aria-hidden={announce ? undefined : 'true'}>
    {#if saveStatus === 'saving'}
      <LoaderCircle size={16} class="spin" />
      {t('form.saving')}
    {:else if saveStatus === 'saved'}
      <Check size={16} />
      {t('form.lastSaved', formatTime(application.lastSaved))}
    {:else}
      {t('form.autosaveOn')}
    {/if}
  </span>
{/snippet}

<div class="container">
  <button class="back-link" onclick={() => goTo(backTo)}>
    <ArrowLeft size={18} />
    {t('common.back')}
  </button>

  <!-- Same columns as the form below, so Save lines up with the right edge
       of the form cards (not the side panel) -->
  <div class="title-row">
    <div class="title-main">
      <div>
        <h1 class="page-title">{t('form.title')}</h1>
        <p class="page-intro">{application.source === 'saved' ? t('form.introSaved') : t('form.introNew')}</p>
      </div>
      <div class="save-area">
        {@render autosave(true)}
        <button type="button" class="outline-button save-button" onclick={save} aria-label={t('form.save')} title={t('form.save')}>
          <Save size={20} />
        </button>
      </div>
    </div>
  </div>

  <div class="layout">
    <form class="sections" onsubmit={continueToReview} oninput={save} onchange={save}>
      <!-- Personal information -->
      <section class="card card-accent" id="personal">
        <h2 class="card-heading"><UserRound size={22} /> {t('form.personal')}</h2>
        <div class="grid">
          <label class="field">
            <span>{t('form.surname')}</span>
            <input type="text" bind:value={a.surname} required />
          </label>
          <label class="field">
            <span>{t('form.givenNames')}</span>
            <input type="text" bind:value={a.givenNames} required />
          </label>
          <label class="field">
            <span>{t('form.sex')}</span>
            <select bind:value={a.sex}>
              <option value="F">{t('form.female')}</option>
              <option value="M">{t('form.male')}</option>
            </select>
          </label>
          <label class="field">
            <span>{t('form.birthDate')}</span>
            <input type="date" bind:value={a.birthDate} required />
          </label>
          <label class="field">
            <span>{t('form.birthCity')}</span>
            <input type="text" bind:value={a.birthCity} />
          </label>
          <label class="field">
            <span>{t('form.birthCountry')}</span>
            <input type="text" bind:value={a.birthCountry} />
          </label>
          <label class="field">
            <span>{t('form.nationality')}</span>
            <input type="text" bind:value={a.nationality} />
          </label>
        </div>
      </section>

      <!-- Passport -->
      <section class="card card-accent" id="passport">
        <h2 class="card-heading"><BookUser size={22} /> {t('form.passport')}</h2>
        <div class="grid">
          <label class="field">
            <span>{t('form.passportNumber')}</span>
            <input type="text" bind:value={a.passportNumber} required />
          </label>
          <label class="field">
            <span>{t('form.passportCountry')}</span>
            <input type="text" bind:value={a.passportCountry} />
          </label>
          <label class="field">
            <span>{t('form.passportIssued')}</span>
            <input type="date" bind:value={a.passportIssued} />
          </label>
          <label class="field">
            <span>{t('form.passportExpires')}</span>
            <input type="date" bind:value={a.passportExpires} />
          </label>
        </div>
      </section>

      <!-- Travel -->
      <section class="card card-accent" id="travel">
        <h2 class="card-heading"><Plane size={22} /> {t('form.travel')}</h2>
        <div class="grid">
          <label class="field wide">
            <span>{t('form.purpose')}</span>
            <select bind:value={a.purpose}>
              <option value="B1/B2">{t('form.purposeB')}</option>
              <option value="F1">{t('form.purposeF')}</option>
              <option value="J1">{t('form.purposeJ')}</option>
              <option value="H1B">{t('form.purposeH')}</option>
            </select>
          </label>
          <label class="field">
            <span>{t('form.arrivalDate')}</span>
            <input type="date" bind:value={a.arrivalDate} />
          </label>
          <label class="field">
            <span>{t('form.stayDays')}</span>
            <input type="number" min="1" bind:value={a.stayDays} />
          </label>
          <label class="field wide">
            <span>{t('form.usAddress')}</span>
            <input type="text" bind:value={a.usAddress} />
          </label>
        </div>
      </section>

      <!-- Contact -->
      <section class="card card-accent" id="contact">
        <h2 class="card-heading"><Mail size={22} /> {t('form.contact')}</h2>
        <div class="grid">
          <label class="field">
            <span>{t('form.email')}</span>
            <input type="email" bind:value={a.email} required />
          </label>
          <label class="field">
            <span>{t('form.phone')}</span>
            <input type="tel" bind:value={a.phone} />
          </label>
          <label class="field wide">
            <span>{t('form.homeAddress')}</span>
            <input type="text" bind:value={a.homeAddress} />
          </label>
        </div>
      </section>

      <div class="actions">
        <button type="submit" class="button primary-button continue">
          {t('form.continue')}
          <ArrowRight size={19} />
        </button>
      </div>
    </form>

    <!-- Side panel: the Application ID and a list of sections -->
    <aside class="side">
      <div class="id-box">
        <div class="id-label"><KeyRound size={16} /> {t('form.yourId')}</div>
        <div class="id-value">{application.id}</div>
        <p>{application.source === 'saved' ? t('form.idSavedNote') : t('form.idNewNote')}</p>
      </div>

      <nav class="contents" aria-label={t('form.sections')}>
        <p class="contents-title">{t('form.sections')}</p>
        {#each sections as item}
          <a href={'#' + item.id}>
            <item.icon size={16} />
            {t(item.key)}
          </a>
        {/each}
      </nav>

      <p class="location">{t('form.location')}: <strong>{application.embassy}</strong></p>
    </aside>
  </div>
</div>

<style>
  .layout {
    margin-top: 32px;
    display: grid;
    grid-template-columns: 1fr 300px;
    align-items: start;
    gap: 32px;
  }

  @media (max-width: 900px) {
    .layout {
      grid-template-columns: 1fr;
    }

    .side {
      order: -1;
    }
  }

  .sections {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .sections section {
    scroll-margin-top: 24px;
  }

  .card-heading {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .card-heading :global(svg) {
    color: var(--blue);
  }

  /* Two fields per row; .wide fields take the whole row */
  .grid {
    padding: 28px 32px 32px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px 24px;
  }

  @media (max-width: 700px) {
    .grid {
      grid-template-columns: 1fr;
      padding: 24px 16px;
    }
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field.wide {
    grid-column: 1 / -1;
  }

  .field span {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-dark);
  }

  .field input,
  .field select {
    min-height: 48px;
    padding: 0 14px;
    background: white;
    border: 1px solid #8797a1;
    border-radius: 4px;
    font-family: inherit;
    font-size: 16px;
    color: var(--text-dark);
  }

  .field input:focus,
  .field select:focus {
    outline: 2px solid var(--blue);
    outline-offset: 1px;
  }

  .title-row {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 32px;
  }

  @media (max-width: 900px) {
    .title-row {
      grid-template-columns: 1fr;
    }
  }

  .title-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 16px 32px;
  }

  .save-area {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* Status text sits right up against the icon */
  .save-area .autosave {
    justify-content: flex-end;
  }

  /* Icon-only Save button, same height as the status text beside it */
  .save-button {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .continue {
    margin-inline-start: auto;
  }

  /* Autosave indicator: grey when idle, blue spinner while saving, green when saved */
  .autosave {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
  }

  .autosave.saving {
    color: var(--blue);
  }

  .autosave.saved {
    color: #2e7d32;
  }

  .autosave :global(.spin) {
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Side panel stays in view while scrolling the form */
  .side {
    position: sticky;
    top: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .id-box {
    padding: 24px;
    background: var(--tint);
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.6;
  }

  .id-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: var(--heading);
  }

  .id-value {
    margin: 8px 0 10px;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 2px;
    color: var(--heading);
  }


  .contents {
    padding: 8px 0;
    display: flex;
    flex-direction: column;
    border-inline-start: 2px solid var(--border);
  }

  .contents-title {
    padding: 0 16px 8px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .contents a {
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
  }

  .contents a:hover {
    background: var(--tint);
  }

  .location {
    font-size: 14px;
    line-height: 1.6;
  }

  .location strong {
    color: var(--text-dark);
  }
</style>
