<script>
  // Icons from the Lucide icon library (lucide.dev)
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
  import Check from '@lucide/svelte/icons/check';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import FolderOpen from '@lucide/svelte/icons/folder-open';
  import MapPin from '@lucide/svelte/icons/map-pin';

  let { goTo } = $props();

  // The embassy or consulate the person picks
  let embassy = $state('');

  // true once the person clicks the "Verify you are human" box
  let verified = $state(false);

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
  <div class="intro-row">
    <div>
      <h1 class="page-title">Apply For a Nonimmigrant Visa</h1>
      <p class="page-intro">Complete the location and verification steps below.</p>
    </div>
    <button class="returning" onclick={() => goTo('home')}>
      <FolderOpen size={20} />
      Returning applicant?
    </button>
  </div>

  <section class="card card-accent form-card">
    <h2 class="card-heading">Start a new application</h2>

    <div class="steps">
      <div class="step">
        <label class="step-title" for="location">Select the U.S. embassy or consulate for your visa application.</label>

        <div class="select-box">
          <MapPin size={20} />
          <select id="location" bind:value={embassy}>
            <option value="">Select an embassy or consulate</option>
            {#each embassies as place}
              <option value={place}>{place}</option>
            {/each}
          </select>
          <ChevronDown size={20} />
        </div>

        <a class="resource-link" href="https://www.usembassy.gov" target="_blank">
          Find a U.S. embassy or consulate
          <ArrowUpRight size={16} />
        </a>
      </div>

      <hr />

      <div class="step">
        <p class="step-title">Complete the security verification</p>

        {#if verified}
          <div class="verify-box done">
            <span class="check-circle">
              <Check size={18} color="#2e7d32" />
            </span>
            Verification Complete
          </div>
        {:else}
          <button class="verify-box" onclick={() => (verified = true)}>
            <span class="empty-square"></span>
            Verify you are human
          </button>
        {/if}
      </div>
    </div>

    <div class="form-actions bottom">
      <button class="square-button outline-button" onclick={() => goTo('terms')} aria-label="Back">
        <ArrowLeft size={24} />
      </button>
      <button class="square-button primary-button" disabled={!verified} aria-label="Continue">
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
    margin-top: -8px;
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
