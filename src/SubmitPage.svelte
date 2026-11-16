<script>
  import { t, i18n } from './i18n.svelte.js';
  import { application } from './application.svelte.js';
  // Icons from the Lucide icon library (lucide.dev)
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import Check from '@lucide/svelte/icons/check';
  import CircleCheck from '@lucide/svelte/icons/circle-check';
  import Pencil from '@lucide/svelte/icons/pencil';
  import Printer from '@lucide/svelte/icons/printer';
  import Send from '@lucide/svelte/icons/send';
  import House from '@lucide/svelte/icons/house';

  let { goTo } = $props();

  const a = application.answers;

  // true once the person ticks the certification box
  let certified = $state(false);

  function formatDate(value) {
    if (!value) return '—';
    const date = value instanceof Date ? value : new Date(value + 'T12:00:00');
    return date.toLocaleDateString(i18n.lang === 'es' ? 'es' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  const purposeKey = { 'B1/B2': 'form.purposeB', F1: 'form.purposeF', J1: 'form.purposeJ', H1B: 'form.purposeH' };

  // The review summary: each section lists label/value pairs.
  // A function so it re-reads the answers (and language) every time it's shown.
  function summary() {
    return [
      {
        title: t('form.personal'),
        rows: [
          [t('form.fullName'), `${a.givenNames} ${a.surname}`],
          [t('form.sex'), a.sex === 'F' ? t('form.female') : t('form.male')],
          [t('form.birthDate'), formatDate(a.birthDate)],
          [t('form.birthPlace'), `${a.birthCity}, ${a.birthCountry}`],
          [t('form.nationality'), a.nationality]
        ]
      },
      {
        title: t('form.passport'),
        rows: [
          [t('form.passportNumber'), a.passportNumber],
          [t('form.passportCountry'), a.passportCountry],
          [t('form.passportIssued'), formatDate(a.passportIssued)],
          [t('form.passportExpires'), formatDate(a.passportExpires)]
        ]
      },
      {
        title: t('form.travel'),
        rows: [
          [t('form.purpose'), t(purposeKey[a.purpose])],
          [t('form.arrivalDate'), formatDate(a.arrivalDate)],
          [t('form.stayDays'), String(a.stayDays)],
          [t('form.usAddress'), a.usAddress]
        ]
      },
      {
        title: t('form.contact'),
        rows: [
          [t('form.email'), a.email],
          [t('form.phone'), a.phone],
          [t('form.homeAddress'), a.homeAddress]
        ]
      }
    ];
  }

  function submit() {
    application.submittedAt = new Date();
    window.scrollTo(0, 0);
  }
</script>

<div class="container">
  {#if !application.submittedAt}
    <button class="back-link" onclick={() => goTo('form')}>
      <ArrowLeft size={18} />
      {t('common.back')}
    </button>

    <h1 class="page-title">{t('submit.title')}</h1>
    <p class="page-intro">{t('submit.intro')}</p>

    <div class="layout">
      <div class="review">
        {#each summary() as section}
          <section class="card review-section">
            <div class="review-heading">
              <h2>{section.title}</h2>
              <button class="edit-button" onclick={() => goTo('form')}>
                <Pencil size={15} />
                {t('submit.edit')}
              </button>
            </div>
            <dl>
              {#each section.rows as [label, value]}
                <div class="row">
                  <dt>{label}</dt>
                  <dd>{value || '—'}</dd>
                </div>
              {/each}
            </dl>
          </section>
        {/each}
      </div>

      <!-- Sign and submit -->
      <aside class="card card-accent sign">
        <h2 class="card-heading">{t('submit.signTitle')}</h2>
        <div class="sign-body">
          <dl class="mini">
            <div><dt>{t('form.yourId')}</dt><dd>{application.id}</dd></div>
            <div><dt>{t('form.location')}</dt><dd>{application.embassy}</dd></div>
          </dl>

          <label class="agree">
            <input type="checkbox" bind:checked={certified} />
            <span class="box">
              {#if certified}
                <Check size={14} color="#2e7d32" strokeWidth={3} />
              {/if}
            </span>
            <span>{t('submit.certify')}</span>
          </label>

          <button class="button primary-button" disabled={!certified} onclick={submit}>
            <Send size={18} />
            {t('submit.submit')}
          </button>
          <p class="fine-print">{t('submit.finePrint')}</p>
        </div>
      </aside>
    </div>
  {:else}
    <!-- Confirmation after submitting -->
    <section class="card card-accent done">
      <div class="done-top">
        <span class="done-icon"><CircleCheck size={40} /></span>
        <div>
          <h1 class="page-title">{t('submit.doneTitle')}</h1>
          <p class="page-intro">{t('submit.doneIntro', a.email)}</p>
        </div>
      </div>

      <dl class="confirmation">
        <div><dt>{t('submit.confirmationNumber')}</dt><dd class="big">{application.id}</dd></div>
        <div><dt>{t('form.fullName')}</dt><dd>{a.givenNames} {a.surname}</dd></div>
        <div><dt>{t('submit.submittedOn')}</dt><dd>{formatDate(application.submittedAt)}</dd></div>
        <div><dt>{t('form.location')}</dt><dd>{application.embassy}</dd></div>
      </dl>

      <div class="next">
        <h2>{t('submit.nextTitle')}</h2>
        <ol>
          <li>{t('submit.next1')}</li>
          <li>{t('submit.next2')}</li>
          <li>{t('submit.next3')}</li>
        </ol>
      </div>

      <div class="done-actions">
        <button class="button primary-button" onclick={() => window.print()}>
          <Printer size={19} />
          {t('submit.print')}
        </button>
        <button class="button outline-button" onclick={() => goTo('home')}>
          <House size={19} />
          {t('submit.home')}
        </button>
      </div>
    </section>
  {/if}
</div>

<style>
  .layout {
    margin-top: 32px;
    display: grid;
    grid-template-columns: 1fr 340px;
    align-items: start;
    gap: 32px;
  }

  @media (max-width: 900px) {
    .layout {
      grid-template-columns: 1fr;
    }
  }

  .review {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .review-section {
    padding: 24px 28px;
  }

  .review-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--border);
  }

  .review-heading h2 {
    font-size: 19px;
    font-weight: 600;
    color: var(--heading);
  }

  .edit-button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    background: none;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    color: var(--blue);
  }

  .edit-button:hover {
    border-color: var(--border);
  }

  dl {
    margin: 0;
  }

  dd {
    margin: 0;
  }

  /* Label on the left, answer on the right */
  .row {
    padding: 12px 0;
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 16px;
    font-size: 15px;
    border-bottom: 1px solid #edf1f2;
  }

  .row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (max-width: 600px) {
    .row {
      grid-template-columns: 1fr;
      gap: 2px;
    }
  }

  .row dd {
    font-weight: 500;
    color: var(--text-dark);
  }

  /* Sign panel stays in view while scrolling the summary */
  .sign {
    position: sticky;
    top: 24px;
  }

  .sign-body {
    padding: 24px 28px 28px;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .mini {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 14px;
  }

  .mini dd {
    margin-top: 2px;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-dark);
  }

  /* Same checkbox look as the terms page */
  .agree {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 14px;
    line-height: 1.55;
    color: var(--text-dark);
    cursor: pointer;
  }

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

  .agree input:focus-visible + .box {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
  }

  .fine-print {
    font-size: 13px;
    line-height: 1.55;
  }

  /* Confirmation screen */
  .done {
    max-width: 880px;
  }

  .done-top {
    padding: 32px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    border-bottom: 1px solid var(--border);
  }

  .done-icon {
    flex-shrink: 0;
    color: #2e7d32;
  }

  .confirmation {
    padding: 28px 32px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 32px;
    font-size: 14px;
    border-bottom: 1px solid var(--border);
  }

  .confirmation dd {
    margin-top: 4px;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-dark);
  }

  .confirmation .big {
    font-size: 26px;
    letter-spacing: 2px;
    color: var(--heading);
  }

  .next {
    padding: 28px 32px 8px;
  }

  .next h2 {
    font-size: 19px;
    font-weight: 600;
    color: var(--heading);
  }

  .next ol {
    margin: 14px 0 0;
    padding-inline-start: 22px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 15px;
    line-height: 1.6;
  }

  .done-actions {
    padding: 24px 32px 32px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  @media (max-width: 700px) {
    .done-top,
    .confirmation,
    .next,
    .done-actions {
      padding-left: 16px;
      padding-right: 16px;
    }

    .confirmation {
      grid-template-columns: 1fr;
    }
  }

  /* Printing the confirmation: hide the buttons */
  @media print {
    .done-actions {
      display: none;
    }
  }
</style>
