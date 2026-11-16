# EasyVisa

**A usability-focused redesign of the U.S. Government's Nonimmigrant Visa Application (DS-160) site.**

Original site: [ceac.state.gov/GenNIV/Default.aspx](https://ceac.state.gov/GenNIV/Default.aspx)

**Live prototype:** [ADD HOSTED LINK] · **Source code:** [ADD GITHUB LINK] · **Demo video:** [ADD VIDEO LINK]

## Team

- Luke Brogee
- Maya Tomarchio
- Austin Heiss
- Kene Anosike
- Annalise Smith

## Project Overview

The DS-160 is the online form almost everyone applying for a temporary U.S. visa (tourism, study, work, exchange) has to complete. Its users are, by definition, a broad and international group: many are non-native English speakers, many will only ever use the site once, and the stakes of a mistake are high, since errors can delay or derail a visa interview.

Despite that, the entry point to the application (the Consular Electronic Application Center landing page) is dense, text-heavy and difficult to navigate. Important instructions are hidden behind unrelated-looking links, the page does not use the full browser width, and the controls needed to start or resume an application are surrounded by legal notices and small print.

We classify this as a **Category A redesign**: the current UI has significant usability and design-principle problems (learnability, layout, text hierarchy, link affordances and error handling) rather than a flawed underlying goal. Our aim with EasyVisa was to keep the same purpose — getting an applicant started on the DS-160 correctly — while making the path there clear, readable and hard to get wrong.

## Research Methods

To ground the redesign in evidence rather than our own impressions, we used two methods from the project list:

1. **Observational study with a think-aloud protocol (method d)**, followed by a short post-task interview with each participant.
2. **Survey with Likert rating scales (method h)**, capturing self-reported impressions of the current site.

We also performed our own critique of the site's layout, instructions and navigation, which is summarized in *Usability Issues* below and which the study and survey were designed to test.

## Usability Issues (Initial Critique)

### Layout & Readability

- **Doesn't fill the screen.** The site says it's meant for Chrome, Edge, or Firefox only, but it doesn't use the full browser width; roughly half of a standard laptop screen is left as empty grey space.
- **Too much small text.** Pages are text-heavy, and nearly all of it is small, with little visual hierarchy separating what matters from fine print.
- **Important information is buried.** Key details about the application (write down your Application ID, save frequently, the 20-minute timeout) sit at the bottom of the page under "Additional Information," while the application button is near the middle, so users can easily miss them.

### Instructions & Help

- **Instructions are hard to find.** The instructions for filling out the form are behind an unrelated-looking link in a numbered list.
- **Instructions are hard to read.** Once opened, they're tightly spaced and in small text, so important information is easy to miss.
- **"Gather your documents" goes nowhere useful.** The link opens the general DS-160 FAQ page on travel.state.gov instead of opening or jumping to the relevant question about required documents.

### Navigation & Links

- **Unclear "OK" button.** The button for returning to the application page just says "OK", and the same label is used for several different links.
- **Links look like other text.** Links are shown only with italics and underlining, and the browser disclaimer ("This website is designed to be accessed using Chrome, Edge, or Firefox only") uses the same style, so it looks clickable.
- **No guidance on "Retrieve Application."** Nothing tells users when to use Retrieve Application rather than Start an Application. Some people will figure it out, but not everyone will.

## Research Findings

### Observational Study (Think-Aloud)

**Participants.** We ran three participants of college students with no prior DS-160 experience. Each session was run on a team member's laptop in Chrome and screen-recorded with the participant's think-aloud audio. Participants were told they were being recorded, that only our team would view the recordings, that all materials would be de-identified, and that they could stop at any time.

**Tasks.** Participants were asked to:

1. Find out what documents they would need before starting a DS-160.
2. Find the instructions for filling out the application.
3. Start a new application for a chosen location and reach the first page of the form (Personal Information 1).

**Results at a glance.**

| | Participant 1 | Participant 2 | Participant 3 |
|---|---|---|---|
| Session length | ~2.7 min | ~3.7 min | ~3.6 min |
| Reached Personal Information 1? | Yes | Yes, after restarting | Yes |
| CAPTCHA / required-field errors | 1 | 2 | 2 |
| Left the DS-160 site by mistake? | Only via "Gather your documents" link | Yes – ended on an error page, a 404 page, a consulate page and the separate visa *scheduling* portal | Only via FAQ link |
| Found document requirements? | Had to scan the general FAQ page | No [CONFIRM] | Had to scan the general FAQ page |

**Difficulty points observed**

*1. Every participant hit the CAPTCHA error at least once.* The "Enter the code as shown" field sits between the location dropdown and the photo notice and is easy to skip. All three participants pressed **Start an Application** with it empty or mistyped and got the red error box ("Please correct all areas in error… Enter the code as shown is required" / "The code entered does not match the code displayed"). Each failure generates a new code, so participants had to re-read a distorted image and try again. Participant 2 hit this twice in a row; Participant 3 also hit it twice.

*2. "Gather your documents" and "instructions" dump users into the general FAQ.* When Participant 1 and Participant 3 looked for the required documents or instructions, the link opened the travel.state.gov DS-160 FAQ page, a long accordion list ("Where can I find the DS-160?", "I am having problems accessing the DS-160"...). Participants had to scroll and open questions one by one to find the one about documents, and then navigate back to the application page.

*3. A participant got completely lost outside the application.* After the CAPTCHA errors, Participant 2 ended up on an "Error: There was an error processing the request" page with no way back except the browser. From there they went to a travel.state.gov 404 page, then the general U.S. Visas page, then the U.S. Consulate Sydney page, then **usvisascheduling.com** (a Cloudflare bot check), and finally the *Apply for a U.S. Visa* login portal, which is a different system for scheduling interviews. Only after this detour did they return to ceac.state.gov and restart with a new location. This shows how easily the DS-160 can be confused with the other visa sites it links to.

*4. The location dropdown is long, and its search shortcut is invisible.* The "Select a location where you will be applying for this visa" dropdown is a single alphabetical list of every embassy and consulate in "COUNTRY, CITY" format. Participant 2 scrolled through dozens of entries (Lithuania… Mexico… Uruguay) before choosing. Participant 1 found they could type "GER" to jump to Germany and called it the one thing they liked, so typing to search helps, but only users who already know it exists.

*5. Reading the landing page takes a long time.* Participant 3 spent well over a minute on the landing page without clicking anything before making a selection. In the interview they explained that they had read the whole homepage, so the page's volume of text costs time even for users who do read it.

*6. The page shifts and hides controls.* Choosing a location inserts a new photo notice above the Start/Retrieve buttons, pushing them down the page. Combined with the error box appearing after a failed CAPTCHA, the layout moves several times while the user is trying to act.

*7. A dense legal page blocks the start.* After clicking Start, every participant landed on the *Computer Fraud and Abuse Act Notices* page, a wall of small legal text with the required "I AGREE" checkbox at the very bottom, before reaching the Application ID page and the security question.

*8. Language settings are confusing.* During Participant 1's session the Tooltip Language was changed to German (Deutsch), translating the help banner while the rest of the page stayed in English. The "Select Tooltip Language" control in the header looks like a site language selector but only affects hover tooltips.

### Post-Task Interviews

After the tasks, we asked each participant open follow-up questions about the site's look, how much they read, what confused them and anything they liked. The recordings were transcribed and are summarized below.

- **Participant 1 (Recording 10):** Disliked the color scheme: red and maroon draw the eye to unimportant things like the translation banner and "Welcome." Found the CAPTCHA on the same page confusing and wished it were a separate pop-up. Felt there was no clear path, and wanted the "before you start" steps to be separate, sequential pages instead of everything on one page; also wanted the site to fill the screen on a laptop. Read almost none of the text, only Get Started and the start/retrieve panel, because "it's in paragraph form, and I'm very bullet point slash like visual person." Said the dark text on dark blue in the Start box was hard to see, and treated it as an optional guideline. Copied the Application ID without knowing what it was for, and set a security question without knowing why. The one thing they liked was the location dropdown, where typing "GER" jumped straight to Germany.
- **Participant 2 (Recording 11):** Found the site poorly organized: "my eyes don't know where to jump to." Said it sent them to a random site and the Start button wasn't working, which matches the error page and detour in their session. Was so overwhelmed they skipped all reading and went straight to wherever it asked them to type. Main complaints were that it's not easy to navigate and has too much information. On the positive side, once they reached the actual form (surname, given name), it felt self-explanatory. Didn't know what the Computer Fraud and Abuse Act had to do with a visa, and never saw the instruction to record their Application ID; their eyes went straight to the security question.
- **Participant 3 (Recording 12):** The most positive participant, and the only one who read the landing page in full. Found it official-looking and not overwhelming, and liked the time estimate, the concise hyperlinked "before you start" list, the help notes and the progress indicators inside the form. Still flagged several problems: the CAPTCHA felt outdated; the "select a location" wording could confuse non-native English speakers; and the note to write down the Application ID, placed under "Additional Information," read as optional ("it's just like, oh, by the way"). Suggested that truly important notes be highlighted or shown in a pop-up before the application starts. Liked having the legal notice and security question together because it signaled that the content mattered.

**Common themes**

- **Most people don't read the text.** Two of three participants skipped nearly everything and jumped to the first thing that looked like an action. Long paragraphs and low-contrast text were treated as optional.
- **Critical information doesn't look critical.** None of the three understood why the Application ID mattered: Participant 1 copied it without knowing why, Participant 2 never saw it, and Participant 3 saw it but took it as an aside because it sat under "Additional Information."
- **There's no clear path.** Participants wanted a step-by-step flow rather than everything on one page, and the CAPTCHA confused or annoyed all three.
- **Not everyone is overwhelmed.** Participant 3, a careful reader, found the amount of text manageable. The redesign should simplify the page without removing information careful readers rely on.

### Survey Results

We collected **10 responses** to our 14-item "Visa Application Ease of Use Survey" on Google Forms, asking people who had used or tried the DS-160 site to rate each statement on a 5-point scale (1 Strongly disagree, 2 Disagree, 3 Neutral, 4 Agree, 5 Strongly agree). Some statements were worded positively and some negatively, so a good experience shows up as high scores on positive items and low scores on negative items.

| Statement | Mean | Agree (4–5) | Disagree (1–2) |
|---|---|---|---|
| I was overwhelmed with the amount of information on the screen | 4.3 | 9 / 10 | 1 / 10 |
| I found the product unnecessarily complex | 4.1 | 8 / 10 | 1 / 10 |
| I was very frustrated while applying | 4.0 | 7 / 10 | 2 / 10 |
| I made multiple mistakes while applying | 3.8 | 6 / 10 | 2 / 10 |
| I found the text to be difficult to read | 3.3 | 5 / 10 | 3 / 10 |
| I struggled to find the instructions to fill out an application | 3.0 | 3 / 10 | 4 / 10 |
| I was able to accomplish everything I set out to do on this website | 2.9 | 4 / 10 | 3 / 10 |
| I was able to read all text on the page easily | 2.4 | 4 / 10 | 6 / 10 |
| I found completing my objectives to be accessible and straightforward | 2.4 | 3 / 10 | 6 / 10 |
| I knew how to find the instructions to fill out an application right away | 2.3 | 1 / 10 | 7 / 10 |
| I easily followed all the steps to apply with no mistakes | 2.1 | 2 / 10 | 6 / 10 |
| I found it intuitive to apply for a visa | 1.9 | 1 / 10 | 8 / 10 |
| I think that I would use this product frequently | 1.7 | 1 / 10 | 8 / 10 |
| I found the site aesthetically pleasing | 1.5 | 1 / 10 | 9 / 10 |

**What the survey tells us**

- **Information overload is the strongest signal.** 9 of 10 respondents felt overwhelmed by the amount of information on screen (mean 4.3), and 8 of 10 found the site unnecessarily complex. This directly supports simplifying the landing page.
- **The site is not intuitive and causes errors.** Only 1 respondent found applying intuitive (mean 1.9), 6 of 10 reported making multiple mistakes, and only 2 felt they followed every step without mistakes. This lines up with the CAPTCHA and navigation errors we saw in the observational study.
- **Instructions are not discoverable.** Only 1 respondent knew right away where to find the instructions (7 of 10 disagreed). The related item "I struggled to find the instructions" was more mixed (mean 3.0), suggesting people *could* eventually find them, but not quickly or confidently.
- **Readability is a problem for most, but not all.** 6 of 10 could not read all the text easily and half found the text difficult to read. Responses here were more split than on overload, so text size is one problem among several rather than the main one.
- **Users can usually get there, but it costs them.** Ability to accomplish their goals was middling (mean 2.9), while frustration was high (mean 4.0, median 5). People generally complete the task, but the experience is stressful.
- **Visual design is almost universally disliked.** 9 of 10 did not find the site aesthetically pleasing (mean 1.5), the most one-sided result in the survey.

*Note:* the sample is small (n = 10) and not random, so we treat these results as directional evidence that supports and prioritizes the issues found in the observational study rather than as precise measurements.

## Design Goals

Combining the critique, the observational study and the survey, we focused the redesign on these goals:

| Goal | Evidence |
|---|---|
| **Reduce what's on the landing page to one clear decision: start or resume.** | 9/10 overwhelmed; 8/10 found it unnecessarily complex; Participant 3's long hesitation |
| **Explain *Start* vs *Retrieve* in plain language** so users know which to choose. | No guidance on Retrieve Application in current UI; participants unsure where to begin |
| **Bring the "before you start" information forward** (documents needed, save your Application ID, 20-minute timeout) instead of burying it at the bottom. | Key info sits below the fold; participants left the site to find document requirements; none of the 3 understood why the Application ID mattered |
| **Link help directly to the relevant answer,** not the general FAQ. | Participants 1 and 3 had to scan the full FAQ to find documents |
| **Make the location picker visibly searchable.** | Participant 2 scrolled through dozens of entries; Participant 1 liked typing to jump to a country but found it by accident |
| **Make required fields and errors obvious before submission,** and keep the layout stable. | All 3 participants triggered the CAPTCHA error; buttons moved as notices appeared |
| **Keep users inside the DS-160 flow** and make clear which site they're on. | Participant 2 ended up on an error page, a 404 and the separate scheduling portal |
| **Use the full screen, larger text and a clear visual hierarchy,** with links that look like links and buttons with descriptive labels. | 6/10 couldn't read all text easily; 9/10 found the site unattractive; italic-underline links and generic "OK" buttons |

## Sketches, Wireframes & Feedback

We planned the redesign in Figma, starting from low-fidelity wireframes of the landing page and the pages the old landing-page content was moved to.

[ADD SCREENSHOTS: hand sketches and/or Figma wireframes, with a one-line caption under each]

**Feedback on the design plans.** [ADD: how you gathered feedback before building (e.g. showing the Figma wireframes to classmates or study participants), what they said, and anything you changed as a result]

## The EasyVisa Redesign

### Changes in the Redesign

**Simplified landing page.** The landing page now offers only two choices: **Start** a new application or **Resume** an existing one. The large amount of information that used to sit on the landing page has been broken out into appropriate pages, removed, or condensed, whichever fit each piece of content best.

[ADD each other change you implemented, in the same pattern: **Name of change.** What it does, and which finding it addresses. For example:]

- [**Before-you-start page.** …]
- [**Searchable location selection.** …]
- [**Clearer help and instructions.** …]
- [**Descriptive buttons and visible links.** …]

### Interface Walkthrough

[For each screen: a screenshot, then 2–4 sentences on what the user can do there and which controls they use.]

1. **Landing page** – [screenshot] [description]
2. **[Next page]** – [screenshot] [description]
3. **[Next page]** – [screenshot] [description]

### Before & After

[OPTIONAL BUT RECOMMENDED: side-by-side screenshots of the original landing page and the EasyVisa landing page]

## Implementation

The prototype is a front-end-only web application built with **Svelte / SvelteKit** and JavaScript, with no backend or database; form data is not submitted anywhere.

- **Design tools:** Figma (wireframes and layout)
- **Framework:** [Svelte or SvelteKit + version]
- **Libraries:** [ADD any UI or styling libraries]
- **Code structure:** [ADD a short description, e.g. `src/routes/` holds one route per page; shared components such as the header and buttons live in `src/lib/components/`]
- **Hosting:** [ADD platform, e.g. GitHub Pages / Vercel / Netlify] at [ADD LINK]
- **Source code:** [ADD GITHUB LINK]

## Use of AI

AI was used to assist in parts of the wireframe construction and to help us become familiar with Figma itself. AI was also used to assist in converting the Figma wireframe to code.

## Future Work

No project is ever fully done. Based on our research, these are the next steps we would take:

- **Redesign the rest of the DS-160 flow.** Our prototype focuses on the entry experience. The pages after it — the Computer Fraud and Abuse Act notice, the Application ID and security question page, and the form sections themselves — share the same dense layout and would benefit from the same treatment (for example, a short plain-language summary of the legal notice with the full text expandable).
- **Rethink the CAPTCHA step.** Every study participant failed it at least once. A clearer required-field indicator, inline validation, or a less error-prone verification method would remove one of the most common errors we observed.
- **Full language support.** The current site only translates hover tooltips. Since many DS-160 applicants are non-native English speakers, a true page-level language option would be a meaningful improvement.
- **Clearer connections to related sites.** Better signposting between the DS-160, travel.state.gov and the separate interview-scheduling portal, so users always know which site they're on and what it's for.
- **Evaluate the redesign.** Run the same three tasks and the same survey with new participants on EasyVisa and compare errors, completion and self-reported scores against the original site.
- [ADD anything you started but couldn't finish, with screenshots]

## Demo Video

[EMBED OR LINK 2–3 MINUTE DEMO VIDEO — include project name, team members, project components and a walkthrough of the interface]
