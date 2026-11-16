<script>
  import { t } from './i18n.svelte.js';
  // Icons from the Lucide icon library (lucide.dev)
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import Check from '@lucide/svelte/icons/check';

  let { goTo } = $props();

  // true once the person ticks "I agree to the terms"
  let agreed = $state(false);
</script>

<div class="container">
  <button class="back-link" onclick={() => goTo('home')}>
    <ArrowLeft size={18} />
    {t('common.back')}
  </button>

  <h1 class="page-title">{t('terms.title')}</h1>
  <p class="page-intro">{t('terms.intro')}</p>

  <!-- Main card on the left, help panel on the right (stacks on small screens) -->
  <div class="layout">
    <section class="card card-accent terms-card">
      <h2 class="card-heading">{t('terms.cardTitle')}</h2>

      <div class="terms">
        <div class="notice">{t('terms.notice')}</div>
        <p>{t('terms.p1')}</p>
        <p>{t('terms.p2')}</p>
        <p>{t('terms.p3')}</p>
        <p>{t('terms.p4')}</p>
        <ul>
          <li>{t('terms.li1')}</li>
          <li>{t('terms.li2')}</li>
        </ul>
      </div>

      <div class="actions">
        <label class="agree">
          <input type="checkbox" bind:checked={agreed} />
          <span class="box">
            {#if agreed}
              <Check size={14} color="#2e7d32" strokeWidth={3} />
            {/if}
          </span>
          {t('terms.agree')}
        </label>

        <div class="form-actions">
          <button class="square-button outline-button" onclick={() => goTo('home')} aria-label={t('common.back')}>
            <ArrowLeft size={24} />
          </button>
          <button
            class="square-button primary-button"
            disabled={!agreed}
            onclick={() => goTo('start')}
            aria-label={t('common.continue')}
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>

    <aside class="next-steps">
      <h3>{t('terms.nextTitle')}</h3>
      <p>{t('terms.nextText')}</p>
      <hr />
      <p>{t('terms.nextInstructions')}</p>
      <a class="resource-link" href="https://ceac.state.gov/genniv/" target="_blank">
        {t('common.readInstructions')}
      </a>
    </aside>
  </div>
</div>

<style>
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

  /* The scrolling box with the legal text */
  .terms {
    max-height: 60vh;
    overflow-y: auto;
    padding: 32px;
    border-bottom: 1px solid var(--border);
    font-size: 15px;
    line-height: 1.65;
  }

  .terms p {
    margin-top: 24px;
  }

  .terms ul {
    margin: 0;
    padding-inline-start: 22px;
  }

  .notice {
    padding: 16px;
    background: var(--tint);
    border-inline-start: 3px solid var(--blue);
    font-size: 24px;
    font-weight: 600;
    color: var(--heading);
  }

  /* Let the checkbox bar stick to the page (a hidden overflow would stop it) */
  .terms-card {
    overflow: visible;
  }

  /* Checkbox and arrows stay pinned to the bottom of the screen
     until you scroll past the end of the card */
  .actions {
    position: sticky;
    bottom: 0;
    z-index: 1;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: white;
    box-shadow: 0 -6px 16px rgba(10, 49, 78, 0.06);
  }

  .agree {
    position: relative;
    align-self: center;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    font-weight: 600;
    color: var(--text-dark);
    cursor: pointer;
  }

  /* The real checkbox is hidden; .box draws the square we see.
     Gray when empty, green with a check mark when ticked. */
  .agree input {
    position: absolute;
    opacity: 0;
  }

  .box {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #8797a1;
    border-radius: 2px;
    background: white;
  }

  .agree input:checked + .box {
    border: 1.7px solid #2e7d32;
    background: #e8f5e9;
  }

  /* Show a focus ring when using the keyboard */
  .agree input:focus-visible + .box {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
  }

  /* Help panel stays in view while you scroll the terms */
  .next-steps {
    position: sticky;
    top: 24px;
    padding: 28px;
    background: var(--tint);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 14px;
    line-height: 1.65;
  }

  .next-steps h3 {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--heading);
  }
</style>
