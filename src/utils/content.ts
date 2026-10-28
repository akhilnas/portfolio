import { type CollectionEntry, getCollection } from 'astro:content';
import { slugify } from './slugify';

export function sortItemsByDateDesc(itemA: CollectionEntry<'blog' | 'projects'>, itemB: CollectionEntry<'blog' | 'projects'>) {
    return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}

export function getAllTags(posts: CollectionEntry<'blog'>[]) {
    const tags = new Map<string, string>();
    for (const tag of posts.flatMap((post) => post.data.tags)) {
        const slug = slugify(tag);
        if (slug && !tags.has(slug)) tags.set(slug, tag);
    }
    return [...tags].map(([slug, name]) => ({ name, slug }));
}

export function getPostsByTag(posts: CollectionEntry<'blog'>[], tagSlug: string) {
    return posts.filter((post) => post.data.tags.map(slugify).includes(tagSlug));
}

export function readingTime(body: string) {
    const words = body
        .replace(/```[\s\S]*?```/g, '')
        .replace(/\$\$[\s\S]*?\$\$/g, '')
        .split(/\s+/)
        .filter(Boolean).length;
    return Math.max(1, Math.round(words / 230));
}

export function formatDate(date: Date) {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/** Prefix an internal path with the site base, e.g. url('writing') -> '/portfolio/writing/'. */
export function url(path = '') {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const clean = path.replace(/^\/|\/$/g, '');
    return clean ? `${base}/${clean}/` : `${base}/`;
}

/** The notebook's page for a path, numbered in reading order: home, each section followed by its entries (oldest first), then the rest. */
export async function pageNumber(pathname: string) {
    const oldestFirst = (a: CollectionEntry<'blog' | 'projects'>, b: CollectionEntry<'blog' | 'projects'>) => sortItemsByDateDesc(b, a);
    const projects = (await getCollection('projects')).sort(oldestFirst);
    const posts = (await getCollection('blog')).sort(oldestFirst);
    const pages = [
        url(),
        url('projects'),
        ...projects.map((p) => url(`projects/${p.slug}`)),
        url('writing'),
        ...posts.map((p) => url(`writing/${p.slug}`)),
        url('about'),
        url('clippings'),
        ...getAllTags(posts).map((t) => url(`tags/${t.slug}`)),
        url('contact')
    ];
    const index = pages.indexOf(pathname.replace(/\/?$/, '/'));
    return index === -1 ? undefined : index + 1;
}
