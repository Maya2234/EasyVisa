<script>
  import { t } from './i18n.svelte.js';
  import { startNewApplication } from './application.svelte.js';
  // Icons from the Lucide icon library (lucide.dev)
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
  import Check from '@lucide/svelte/icons/check';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import FolderOpen from '@lucide/svelte/icons/folder-open';
  import Info from '@lucide/svelte/icons/info';
  import MapPin from '@lucide/svelte/icons/map-pin';

  let { goTo } = $props();

  // The embassy or consulate the person picks
  let embassy = $state('');

  // true once the person clicks the "Verify you are human" box
  let verified = $state(false);

  // true while the "Returning applicant?" warning is showing
  let showReturningAlert = $state(false);

  const embassies = [
    'Bogotá, Colombia',
    'Frankfurt, Germany',
    'London, United Kingdom',
    'Manila, Philippines',
    'Mexico City, Mexico',
    'Mumbai, India',
    'São Paulo, Brazil',
    'Tokyo, Japan'
  ];
</script>

<div class="container">
  <button class="back-link" onclick={() => goTo('terms')}>
    <ArrowLeft size={18} />
    {t('common.back')}
  </button>

  <div class="intro-row">
    <div>
      <h1 class="page-title">{t('common.applyTitle')}</h1>
      <p class="page-intro">{t('start.intro')}</p>
    </div>
    <button class="returning" onclick={() => (showReturningAlert = true)}>
      <FolderOpen size={20} />
      {t('start.returning')}
    </button>
  </div>

  <!-- Shown after clicking "Returning applicant?" -->
  {#if showReturningAlert}
    <div class="returning-alert" role="alert">
      <Info size={22} />
      <div class="alert-body">
        <p class="alert-title">{t('start.returningAlertTitle')}</p>
        <p>{t('start.returningAlertText')}</p>
        <div class="alert-buttons">
          <button class="button primary-button" onclick={() => goTo('retrieve')}>
            {t('start.returningAlertGo')}
          </button>
          <button class="button outline-button" onclick={() => (showReturningAlert = false)}>
            {t('start.returningAlertStay')}
          </button>
        </div>
      </div>
    </div>
  {/if}

  <section class="card card-accent form-card">
    <h2 class="card-heading">{t('home.startTitle')}</h2>

    <div class="steps">
      <div class="step">
        <label class="step-title" for="location">{t('start.locationLabel')}</label>

        <div class="select-box">
          <MapPin size={20} />
          <select id="location" bind:value={embassy}>
            <option value="">{t('start.locationPlaceholder')}</option>
            {#each embassies as place}
              <option value={place}>{place}</option>
            {/each}
          </select>
          <ChevronDown size={20} />
        </div>

        <a class="resource-link" href="https://www.usembassy.gov" target="_blank">
          {t('start.findEmbassy')}
          <ArrowUpRight size={16} />
        </a>
      </div>

      <hr />

      <div class="step">
        <p class="step-title">{t('start.verifyTitle')}</p>

        {#if verified}
          <div class="verify-box done">
            <span class="check-circle">
              <Check size={18} color="#2e7d32" />
            </span>
            {t('start.verifyDone')}
          </div>
        {:else}
          <button class="verify-box" onclick={() => (verified = true)}>
            <span class="empty-square"></span>
            {t('start.verifyButton')}
          </button>
        {/if}
      </div>
    </div>

    <div class="form-actions bottom">
      <button class="square-button outline-button" onclick={() => goTo('terms')} aria-label={t('common.back')}>
        <ArrowLeft size={24} />
      </button>
      <button
        class="square-button primary-button"
        disabled={!verified || !embassy}
        onclick={() => { startNewApplication(embassy); goTo('form'); }}
        aria-label={t('common.continue')}
      >
        <ArrowRight size={24} />
      </button>
    </div>
  </section>
</div>

<style>
  /* Title on the left, "Returning applicant?" pushed to the right */
  .intro-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 16px;
  }

  .returning {
    display: flex;
    align-items: center;
    gap: 9px;
    background: none;
    border: none;
    padding: 4px 0;
    font-size: 15px;
    font-weight: 600;
    color: var(--blue);
  }

  .form-card {
    margin-top: 24px;
  }

  /* Light blue warning box with a blue line on the left */
  .returning-alert {
    margin-top: 24px;
    padding: 20px 24px;
    display: flex;
    gap: 14px;
    background: var(--tint);
    border-inline-start: 4px solid var(--blue);
    color: var(--blue);
  }

  .alert-body {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 15px;
    line-height: 1.6;
    color: var(--text);
  }

  .alert-title {
    font-size: 17px;
    font-weight: 600;
    color: var(--heading);
  }

  .alert-buttons {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .steps {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .step {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .step-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--text-dark);
  }

  /* The dropdown: a real <select> with icons on either side */
  .select-box {
    position: relative;
    min-height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border: 1px solid #8797a1;
    border-radius: 4px;
  }

  /* The select covers the whole box so clicking anywhere opens it */
  .select-box select {
    position: absolute;
    inset: 0;
    padding: 0 46px;
    appearance: none;
    border: none;
    background: transparent;
    font-size: 16px;
    color: var(--text);
    cursor: pointer;
  }

  .resource-link {
    align-self: flex-start;
  }

  .verify-box {
    width: 100%;
    padding: 18px;
    display: flex;
    align-items: center;
    gap: 16px;
    background: #f5f7f8;
    border: 1px dashed var(--border);
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-dark);
    text-align: start;
  }

  .verify-box.done {
    border-style: solid;
  }

  .empty-square {
    width: 30px;
    height: 30px;
    background: white;
    border: 1px solid #8797a1;
    border-radius: 2px;
  }

  .check-circle {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background: #e8f5e9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bottom {
    padding: 0 32px 32px;
  }

  @media (max-width: 700px) {
    .steps {
      padding: 24px 16px;
    }

    .bottom {
      padding: 0 16px 24px;
    }
  }
</style>
