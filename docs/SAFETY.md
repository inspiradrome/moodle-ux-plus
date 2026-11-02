# Safety, privacy, and responsible use

Moodle may contain student, staff, assessment, and enrolment information. A browser userscript runs in an authenticated session and must be treated as code with access to whatever its browser context can see.

## Before starting

1. Obtain permission under your institution's IT/security policies.
2. Start with navigation and read-only inspection, not modifications to records.
3. Restrict userscript matches to the intended Moodle site and use the minimum grants.
4. Review every AI-generated DevTools snippet before executing it.
5. Use synthetic example names/emails and redacted structural output in AI chats or issue reports.
6. Never share cookies, session IDs, CSRF/sesskey values, access tokens, full authenticated HTML, student/staff data, or raw network captures.
7. Do not store personal queries longer than necessary. A persistent course index also requires local policy approval.
8. Use `textContent` for course/user labels from Moodle; do not inject unsanitised HTML.
9. Do not bypass access restrictions or use undocumented endpoints to obtain data outside your role.
10. Test and keep a rollback: disabling the userscript must restore normal Moodle behaviour.

## Safer debugging

Ask an AI assistant for **read-only metadata** such as input `name` attributes, select option values, table IDs, column headings, and row counts. Even these can occasionally reveal sensitive information: inspect and redact before sharing.

## Operational boundaries

- No external telemetry, analytics, or AI API calls from the userscript by default.
- No automated scraping of user records or high-frequency polling.
- No state-changing operations without explicit review and confirmation.
- No assumption that an existing authenticated session authorises unrestricted extraction or reuse of data.

## Reporting issues

Use synthetic values and describe behaviour, browser, Moodle version if known, and **redacted** DOM structure. Do not post real institutional URLs or screenshots with identifying records.
