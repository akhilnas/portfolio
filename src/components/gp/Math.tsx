import katex from 'katex';
import { useMemo } from 'react';

// Concept cards were written against MathJax; KaTeX is already on the site for the Markdown maths.
function render(tex: string, displayMode: boolean) {
    return katex.renderToString(tex, { displayMode, throwOnError: false });
}

export function InlineMath({ tex }: { tex: string }) {
    const html = useMemo(() => render(tex, false), [tex]);
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function BlockMath({ tex }: { tex: string }) {
    const html = useMemo(() => render(tex, true), [tex]);
    return <div className="block-math" dangerouslySetInnerHTML={{ __html: html }} />;
}
