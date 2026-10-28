import type { ComponentType } from 'react';
import { papers } from '../papers';

export interface CardEntry {
    kind: 'concept' | 'paper';
    title: string;
    /** Shown under the title, e.g. authors and year for a paper. */
    byline?: string;
    href?: string;
    Content: ComponentType;
}

const conceptModules = import.meta.glob<{ meta: { slug: string; term: string }; default: ComponentType }>('../concepts/*.tsx', { eager: true });

export const cardRegistry: Record<string, CardEntry> = {};

for (const mod of Object.values(conceptModules)) {
    cardRegistry[`concept:${mod.meta.slug}`] = { kind: 'concept', title: mod.meta.term, Content: mod.default };
}
for (const p of papers) {
    cardRegistry[`paper:${p.id}`] = { kind: 'paper', title: p.title, byline: `${p.authors} · ${p.venue} ${p.year}`, href: p.href, Content: p.Content };
}
