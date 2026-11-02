// Generic, pure functions; no Moodle selectors or institutional data.
export function looksLikeEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

export function resolveUserField(selected, value) {
    if (selected !== 'auto') return selected;
    return looksLikeEmail(value) ? 'email' : 'fullname';
}

export function fieldHint(selected, value) {
    const labels = {
        email: 'Email',
        fullname: 'Full name',
        firstname: 'First name',
        lastname: 'Last name'
    };
    const field = resolveUserField(selected, value);
    return selected === 'auto'
        ? `Auto → ${labels[field] ?? field}`
        : `Searching: ${labels[field] ?? field}`;
}
