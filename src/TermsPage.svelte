<script>
  // Icons from the Lucide icon library (lucide.dev)
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import Check from '@lucide/svelte/icons/check';

  let { goTo } = $props();

  // true once the person ticks "I agree to the terms"
  let agreed = $state(false);
</script>

<div class="container">
  <h1 class="page-title">Review the terms</h1>
  <p class="page-intro">Review the information below before continuing. Next, you’ll choose your application location and complete security verification.</p>

  <!-- Main card on the left, help panel on the right (stacks on small screens) -->
  <div class="layout">
    <section class="card card-accent">
      <h2 class="card-heading">Review before continuing</h2>

      <div class="terms">
        <div class="notice">Computer Fraud and Abuse Act Notices</div>
        <p>For site management, information is collected for statistical purposes. The Department of State Web Site uses software programs to create summary statistics for such purposes as assessing what information is of most and least interest or identifying system performance or problem areas. The following is the type of information collected about your visit to the web site: the name of the Internet domain from which you access State Department web sites (for example, "aol.com" if you are connecting from America Online) and the date and time you access our site.</p>
        <p>For site security purposes and to ensure that this service remains available to all users, the State Department uses software programs to monitor network traffic to identify unauthorized attempts to upload or change information or otherwise cause damage. Unauthorized attempts to upload information or change information on this service are strictly prohibited and may be punishable under the Computer Fraud and Abuse Act of 1986. Information also may be used for authorized law enforcement investigations. Except for the above purposes, no other attempts are made to identify individual users or their usage habits.</p>
        <p>Unauthorized attempts to upload information and/or change information on these web sites are strictly prohibited and are subject to prosecution under the Computer Fraud and Abuse Act of 1986 and Title 18 U.S.C. Sec.1001 and 1030.</p>
        <p>Furthermore, the Department of State assures that it will not</p>
        <ul>
          <li>obtain personal identifying information about you through your use of this system, unless you choose to provide such information</li>
          <li>share any information it receives with any outside parties, except where permitted by Section 222(f) of the Immigration and Nationality Act or, where applicable, the Privacy Act.</li>
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
          I agree to the terms
        </label>

        <div class="form-actions">
          <button class="square-button outline-button" onclick={() => goTo('home')} aria-label="Back">
            <ArrowLeft size={24} />
          </button>
          <button
            class="square-button primary-button"
            disabled={!agreed}
            onclick={() => goTo('start')}
            aria-label="Continue"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>

    <aside class="next-steps">
      <h3>What happens next?</h3>
      <p>On the next screen, choose the U.S. embassy or consulate where you will apply and complete the security verification.</p>
      <hr />
      <p>Review the instructions for guidance on completing Form DS-160.</p>
      <a class="resource-link" href="https://ceac.state.gov/genniv/" target="_blank">
        Read the DS-160 instructions
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

  .actions {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
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
