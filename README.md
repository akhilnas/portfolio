# portfolio-notebook

Personal site of Akhil Nasser: a static Astro site with a paper-notebook look (Caveat Brush + EB Garamond, cream paper, navy ink).

```bash
npm run dev       # localhost:4321/portfolio
npm run build     # static output in ./dist
npm run preview
```

- Content: `src/content/{blog,projects,pages}` (Markdown, KaTeX math supported)
- Site text, nav and social links: `src/data/site.ts`
- All styling: `src/styles/global.css` (CSS variables at the top; dark mode under `html.dark`)
- The only JS shipped is the inline script in `src/layouts/Base.astro` (theme toggle, notebook-cover intro, page-turn direction)
- Page turns are native cross-document view transitions (Motion section of `global.css`); browsers without support navigate normally
- Old `/blog/<slug>` URLs redirect to `/writing/<slug>`
