# Build Moodle UX+ with your AI assistant

Copy the prompt below into an AI coding assistant. You can adapt the feature list before starting.

---

## Reusable prompt

You are helping me build **Moodle UX+**, a small, local-first browser userscript tailored to **my own Moodle installation**. I am the human operator. I will approve each feature and test it in my browser.

**Goal:** reduce friction in Moodle navigation and routine tasks without modifying server code. Potential starting features:

1. A compact, dismissible floating **User Lookup** launcher. It should accept a name or email, default to **Auto** (email-shaped input → Email; otherwise → Full name), show a live hint of the effective field, and allow manual selection of Email, Full name, First name, or Last name. It should apply filters through the existing Moodle interface, not invent an undocumented API.
2. A compact **Course Launcher** accepting numeric IDs and, if a permitted course list is available, locally searching course short names and full names. If a local index is used, refresh it **only when I explicitly request** and display its last update time.

**Critical workflow rules:**

- **Do not generate a full userscript immediately.** Start by asking what Moodle version (if known), browser/userscript manager, permissions, theme, and features I actually need. Ask whether institutional policy allows browser userscripts and local storage of course metadata.
- Discover the structure of *my* pages incrementally using read-only DevTools snippets. Ask for **field names, element attributes, and counts**, not real user records, account IDs, emails, session tokens, cookies, CSRF tokens, course names, or screenshots containing sensitive information. If a snippet might reveal these, redesign it first.
- Never request credentials or ask me to paste authenticated HTML/network responses wholesale. Never transmit institutional data to external services.
- Treat Moodle version, theme, and plugin differences as unknown until verified. Do not assume particular selectors, report URLs, form submission methods, or APIs will work.
- Use ordinary same-origin pages and user-authorised actions. No privilege escalation, security bypasses, hidden scraping, or attempts to circumvent server restrictions.
- Prefer minimal Tampermonkey permissions and narrow `@match` rules. Explain what any `GM_*` permission does. Keep all data on-device unless I explicitly approve another architecture.
- Avoid polling or MutationObservers unless the behaviour demonstrably requires them; bound retries and clean up timers. Prefer event-driven UI.
- Escape or safely render untrusted text (use `textContent` instead of interpolating Moodle data into HTML). Validate inputs and response structure. Do not overwrite a working cache when a refresh fails.
- Before submitting any Moodle form, verify the intended action and prevent repeated accidental submissions. For any state-changing action (enrolments, deletes, bulk edits), require an explicit separate design review and confirmation; begin with read-only or navigational features.
- Provide a complete, versioned script after discovery and a small test checklist. Include an easy disable/rollback procedure. Distinguish verified facts from assumptions.

**Discovery sequence:**

**A. Environment:** Ask the minimum necessary questions and confirm permissions and desired scope.

**B. User lookup:** Inspect the user-management page's filter controls and submit mechanism using read-only snippets. Determine which fields exist and how Moodle applies filters. Design an Auto detector with a deliberately simple email-shape check and a manual override. Ensure a failed pending search is cleared after a bounded retry period.

**C. Course navigation:** Confirm the standard course URL pattern in my installation. Investigate permitted sources for course metadata, in this order as appropriate: existing UI, approved export, approved report, or supported web service. Do not assume SQL-report access. If using a report, verify column names, row counts, paging/limits, and whether an authenticated same-origin fetch actually returns the expected table. A missing table, login redirect, empty result, or malformed response must preserve the old cache.

**D. Implementation:** Agree on UI placement, keyboard shortcuts, accessibility, index storage, and refresh behaviour. Generate the smallest useful script, clearly marking configuration values specific to my installation.

**E. Test:** Test on a non-production or low-risk page first where possible; then test user search, manual override, course ID, course-name matching, cache persistence, refresh failure, navigation, keyboard handling, and disable/rollback. Review any unexpected network requests.

**F. Iterate:** Ask what still feels awkward. Propose only improvements that address observed needs; do not expand scope automatically.

Begin with the environment and permission questions. Do not ask me to disclose private Moodle data.

---

## Notes for the human operator

The AI assistant cannot know your Moodle's DOM or permissions without your help. Inspect any proposed DevTools code **before** running it. Keep screenshots, logs, and prompts free of real student/staff information. If unsure, stop and ask your Moodle/security team.

The reference architecture in [REFERENCE.md](REFERENCE.md) explains why the original prototype used a userscript, a short-lived pending-search key, and an optional cached course directory. It is background information, **not** a requirement to reproduce those exact choices.
