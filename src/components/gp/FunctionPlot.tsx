import { useMemo, type MouseEvent, type ReactNode } from 'react';
import { scaleLinear } from 'd3-scale';
import { area as d3area, curveMonotoneX, line as d3line } from 'd3-shape';

export interface PlotSeries {
    points: { x: number; y: number }[];
    color?: string;
    strokeWidth?: number;
    dashed?: boolean;
}

export interface PlotBand {
    /** Upper/lower bounds sharing the same x values, e.g. a GP ±2σ band. */
    points: { x: number; upper: number; lower: number }[];
    color?: string;
    opacity?: number;
}

const DEFAULT_COLORS = ['var(--ink)', 'var(--green)', 'var(--red)', 'var(--mustard)'];

export function FunctionPlot({
    width = 420,
    height = 240,
    xDomain,
    yDomain,
    series = [],
    bands = [],
    dots = [],
    xLabel,
    yLabel,
    onPlotClick,
    children
}: {
    width?: number;
    height?: number;
    xDomain: [number, number];
    yDomain: [number, number];
    series?: PlotSeries[];
    bands?: PlotBand[];
    /** Observed data, drawn as ink dots on top of everything else. */
    dots?: { x: number; y: number }[];
    xLabel?: string;
    yLabel?: string;
    /** Called with data coordinates when the plotting area is clicked. */
    onPlotClick?: (x: number, y: number) => void;
    children?: ReactNode;
}) {
    const margin = { top: 10, right: 10, bottom: xLabel ? 30 : 14, left: yLabel ? 34 : 20 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const x = useMemo(() => scaleLinear().domain(xDomain).range([0, innerW]), [xDomain[0], xDomain[1], innerW]);
    const y = useMemo(() => scaleLinear().domain(yDomain).range([innerH, 0]), [yDomain[0], yDomain[1], innerH]);

    const lineGen = d3line<{ x: number; y: number }>()
        .x((d) => x(d.x))
        .y((d) => y(d.y))
        .curve(curveMonotoneX);
    const areaGen = d3area<{ x: number; upper: number; lower: number }>()
        .x((d) => x(d.x))
        .y0((d) => y(d.lower))
        .y1((d) => y(d.upper))
        .curve(curveMonotoneX);

    function handleClick(e: MouseEvent<SVGRectElement>) {
        if (!onPlotClick) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * innerW;
        const py = ((e.clientY - rect.top) / rect.height) * innerH;
        onPlotClick(x.invert(px), y.invert(py));
    }

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="plot" role="img" aria-label={xLabel && yLabel ? `Plot of ${yLabel} against ${xLabel}` : 'Function plot'}>
            <defs>
                <clipPath id={`clip-${innerW}-${innerH}`}>
                    <rect width={innerW} height={innerH} />
                </clipPath>
            </defs>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <line x1={0} y1={innerH} x2={innerW} y2={innerH} className="axis" />
                <line x1={0} y1={0} x2={0} y2={innerH} className="axis" />

                <g clipPath={`url(#clip-${innerW}-${innerH})`}>
                    {bands.map((b, i) => (
                        <path key={i} d={areaGen(b.points) ?? undefined} fill={b.color ?? 'var(--ink)'} opacity={b.opacity ?? 0.13} />
                    ))}
                    {series.map((s, i) => (
                        <path
                            key={i}
                            d={lineGen(s.points) ?? undefined}
                            fill="none"
                            stroke={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                            strokeWidth={s.strokeWidth ?? 2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray={s.dashed ? '4 4' : undefined}
                        />
                    ))}
                </g>
                {dots.map((d, i) => (
                    <circle key={i} cx={x(d.x)} cy={y(d.y)} r={4.5} className="data-dot" />
                ))}
                {children}

                {onPlotClick && <rect width={innerW} height={innerH} fill="transparent" className="plot-hit" onClick={handleClick} />}

                {xLabel && (
                    <text x={innerW / 2} y={innerH + 24} textAnchor="middle" className="plot-label">
                        {xLabel}
                    </text>
                )}
                {yLabel && (
                    <text x={-innerH / 2} y={-20} transform="rotate(-90)" textAnchor="middle" className="plot-label">
                        {yLabel}
                    </text>
                )}
            </g>
        </svg>
    );
}
