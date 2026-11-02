// Generic in-memory search. Provide only a permitted course array.
// Expected items: { id: number, shortname: string, fullname: string }
export function findCourses(courses, rawQuery, limit = 20) {
    const query = String(rawQuery).trim().toLocaleLowerCase();
    if (!query) return [];
    const rank = (course) => {
        const short = String(course.shortname).toLocaleLowerCase();
        const full = String(course.fullname).toLocaleLowerCase();
        if (String(course.id) === query) return 0;
        if (short === query) return 1;
        if (full === query) return 2;
        if (short.startsWith(query)) return 3;
        if (full.startsWith(query)) return 4;
        if (short.includes(query)) return 5;
        if (full.includes(query)) return 6;
        return -1;
    };
    return courses
        .map(course => ({ course, score: rank(course) }))
        .filter(item => item.score >= 0)
        .sort((a, b) => a.score - b.score ||
            a.course.fullname.localeCompare(b.course.fullname))
        .slice(0, Math.max(0, limit))
        .map(item => item.course);
}
