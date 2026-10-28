import type { ReactNode } from 'react';

/** An index card taped into the notebook. */
export function WidgetFrame({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
    return (
        <div className="widget">
            <p className="widget-title">{title}</p>
            {description && <p className="widget-desc">{description}</p>}
            {children}
        </div>
    );
}
