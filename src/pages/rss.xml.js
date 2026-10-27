import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site.ts';
import { sortItemsByDateDesc, url } from '../utils/content.ts';

export async function GET(context) {
    const posts = (await getCollection('blog')).sort(sortItemsByDateDesc);
    return rss({
        title: site.title,
        description: site.description,
        site: new URL(import.meta.env.BASE_URL, context.site),
        items: posts.map((item) => ({
            title: item.data.title,
            description: item.data.excerpt,
            link: url(`writing/${item.slug}`),
            pubDate: item.data.publishDate
        }))
    });
}
