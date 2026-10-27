export function slugify(input?: string) {
    if (!input) return '';
    return input
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s-]/g, ' ')
        .trim()
        .replace(/[\s-]+/g, '-');
}
