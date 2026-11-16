<script>
  // Icons from the Lucide icon library (lucide.dev)
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
  import NotebookTabs from '@lucide/svelte/icons/notebook-tabs';
  import SquareUserRound from '@lucide/svelte/icons/square-user-round';
  import ShieldCheck from '@lucide/svelte/icons/shield-check';
  import FileCheckCorner from '@lucide/svelte/icons/file-check-corner';

  // goTo lets this page switch to another screen
  let { goTo } = $props();
</script>

<div class="container page">
  <div>
    <h1 class="page-title">Apply For a Nonimmigrant Visa</h1>
    <p class="page-intro">Complete Form DS-160 to apply for a U.S. nonimmigrant visa.</p>
  </div>

  <section class="before">
    <div class="before-heading">
      <h2>Before you begin</h2>
      <a class="resource-link" href="https://ceac.state.gov/genniv/" target="_blank">
        Read the full DS-160 instructions
        <ArrowUpRight size={16} />
      </a>
    </div>

    <div class="card checklist">
      <div class="checklist-item">
        <div class="item-heading">
          <NotebookTabs size={24} />
          <h3>Gather your information</h3>
        </div>
        <p>Have your passport, travel plans (if available), and details of previous U.S. travel, education and work ready.</p>
      </div>
      <div class="checklist-item">
        <div class="item-heading">
          <SquareUserRound size={24} />
          <h3>Prepare a digital photo</h3>
        </div>
        <p>Review the visa photo requirements before uploading. Your photo must meet the stated format and quality standards.</p>
      </div>
      <div class="checklist-item">
        <div class="item-heading">
          <ShieldCheck size={24} />
          <h3>Keep your access details safe</h3>
        </div>
        <p>Record your Application ID when it appears. Keep your chosen security question and answer securely so you can return.</p>
      </div>
    </div>
  </section>

  <!-- The two option cards, stacked -->
  <div class="options">
    <section class="card option">
      <h2>Start a new application</h2>
      <button class="button primary-button" onclick={() => goTo('terms')}>
        Start an application
        <ArrowRight size={19} />
      </button>
    </section>

    <section class="card option">
      <div>
        <h2>Already started?</h2>
        <p class="option-text">Continue a saved application or access an application you have already submitted.</p>
        <p class="small-text">Have your Application ID ready. You’ll be asked for personal and security details later on.</p>
      </div>
      <button class="button outline-button">
        Retrieve an application
        <ArrowRight size={19} />
      </button>
    </section>
  </div>

  <!-- What happens after you submit -->
  <div class="after-submit">
    <FileCheckCorner size={21} />
    <div>
      <h3>After you submit your DS-160</h3>
      <p>Save and print your confirmation page. Follow the instructions from your U.S. embassy or consulate for the next steps in your visa application.</p>
    </div>
  </div>
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 10px;
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

  .small-text {
    margin-top: 6px;
    font-size: 14px;
    line-height: 1.6;
  }

  .before {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .before-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .before-heading h2 {
    font-size: 24px;
    font-weight: 600;
    color: var(--heading);
  }

  /* Three equal columns with a thin line between them */
  .checklist {
    padding: 28px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }

  .checklist-item {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-inline-end: 28px;
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
      padding-bottom: 28px;
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
    font-size: 17px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--heading);
  }

  .checklist-item p {
    font-size: 14px;
    line-height: 1.65;
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
