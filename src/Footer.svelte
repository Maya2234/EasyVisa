<script>
  import { t } from './i18n.svelte.js';
  // Icons from the Lucide icon library (lucide.dev)
  import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
</script>

<footer>
  <div class="wrap">
    <div class="top-row">
      <div>
        <p class="department">{t('footer.department')}</p>
        <p class="bureau">{t('footer.bureau')}</p>
      </div>

      <div class="external-links">
        <a href="https://travel.state.gov" target="_blank">
          Travel.State.Gov
          <ArrowUpRight size={16} />
        </a>
        <a href="https://www.usembassy.gov" target="_blank">
          {t('footer.embassies')}
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>

    <hr />

    <div class="bottom-row">
      <div class="policy-links">
        <a href="#privacy">{t('footer.privacy')}</a>
        <a href="#accessibility">{t('footer.accessibility')}</a>
        <a href="#paperwork">{t('footer.paperwork')}</a>
      </div>
      <p>{t('footer.disclaimer')}</p>
    </div>
  </div>
</footer>

<style>
  footer {
    background: var(--navy);
    padding: 50px 0;
    color: #c3cfd6;
  }

  .top-row,
  .bottom-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  .department {
    color: white;
    font-size: 16px;
    font-weight: 600;
  }

  .bureau {
    margin-top: 8px;
    font-size: 13px;
  }

  .external-links {
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
  }

  .external-links a {
    display: flex;
    align-items: center;
    gap: 12px;
    color: white;
    font-size: 14px;
    text-decoration: none;
  }

  /* Darker divider line for the navy footer */
  hr {
    background: #385064;
    margin: 26px 0;
  }

  .bottom-row {
    align-items: center;
    font-size: 12px;
  }

  .policy-links {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  .policy-links a {
    color: #c3cfd6;
    text-decoration: none;
  }

  @media (max-width: 700px) {
    footer {
      padding: 32px 0;
    }
  }
</style>
