# Reference design: a working local prototype

This describes patterns demonstrated in a single Moodle environment. **No site-specific URL, report identifier, personal data, or copied production markup is included.**

## Component 1 — Floating launchers

A browser userscript adds compact **User** and **Course** buttons on Moodle pages. Each opens a small panel; the original UI used a fixed position, but placement and shortcuts should be configurable in other implementations.

- Use `@match` scoped to the institution's Moodle origin.
- Avoid global CSS selectors that interfere with Moodle.
- Avoid injecting the toolbar twice.
- Keep the panel keyboard-operable, labelled, dismissible, and usable at narrow widths.

## Component 2 — User lookup

The prototype's User panel offers **Auto**, Email, Full name, First name, and Last name.

Auto resolves **when submitted**, without changing the selected dropdown item:

```js
function looksLikeEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
function resolveField(selected, value) {
    return selected !== 'auto'
        ? selected
        : (looksLikeEmail(value) ? 'email' : 'fullname');
}
```

The UI shows `Auto → Email` or `Auto → Full name`, updated on input. Explicit selection always wins. This is an **email-shape heuristic**, not a complete email validator; `name@host` without a dot will be treated as Full name unless the user selects Email manually.

For cross-page navigation, a userscript may store a **short-lived pending search** containing the chosen field and entered query, navigate to the existing user page, wait briefly for the form, populate the verified controls, and submit. Clear the pending value on success **and** after a bounded number of failed attempts. **Caution:** a user query may contain personal data; use short retention, never log it, and confirm the institution permits such local storage. Where possible, prefer a design that avoids persisting the query altogether.

Do not copy the original site's form selectors blindly. Moodle versions and themes can differ.

## Component 3 — Course launcher

A numeric ID can open the verified course page directly. For names, the prototype used a manually refreshed local index of `{id, shortname, fullname}` objects obtained from an **approved, authenticated, same-origin reporting page**.

- Only fetch after the operator clicks **Reindex**.
- Confirm response status, expected page, expected table/columns, valid numeric IDs, and no duplicates.
- Verify paging/row limits; a successful parse does **not** prove the report is complete.
- Preserve the old index on errors or empty results.
- Store update time and show count/age in the UI.
- Match both names case-insensitively, rank exact and prefix matches ahead of substring matches, and cap displayed results.
- Render all course names via `textContent`.
- Allow direct ID navigation even when the index is missing.

**Not all installations have a reporting plugin.** Alternatives include approved exports, supported Moodle web services, or existing course-search UI. The best option depends on permissions and local policy.

## State and performance

- A small persistent course index is reasonable where local storage is permitted; its contents may still be institution-sensitive.
- Use a separate key for ephemeral navigation state and a versioned key for persistent index data.
- Manual refresh avoids background traffic; no timer is needed for course-name search.
- Already-open tabs may retain a previously loaded index until reload; this is an acceptable simplification for some teams.

## Known limits and non-goals

The prototype was tested locally, not across Moodle versions. Browser popup policies, form implementations, language packs, CSP rules, session expiry, and report rendering may affect portability. The reference design does not include enrolment changes, bulk edits, API tokens, or automatic background monitoring.

## Verification checklist

- [ ] User has permission to install/run a userscript.
- [ ] Site origin and form controls are verified locally.
- [ ] Auto hint matches the effective search field.
- [ ] Manual field selection is never overridden.
- [ ] Pending searches expire on failure and do not unexpectedly repeat.
- [ ] Course ID works without an index.
- [ ] Name search works with approved metadata only.
- [ ] Refresh failure preserves the existing index.
- [ ] No unexpected network calls or telemetry.
- [ ] Keyboard, focus, escape, and narrow-screen behaviour checked.
- [ ] Script can be disabled immediately.
