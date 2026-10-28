import { useMemo, useState } from 'react';
import { FunctionPlot } from '../FunctionPlot';
import { LabeledSlider } from '../LabeledSlider';
import { WidgetFrame } from '../WidgetFrame';
import { cholesky, gpPosterior, linspace, matVecLowerTri, seededRandn } from '../linalg';

const GRID = linspace(0, 1, 61);
const NOISE_VAR = 0.01;
const MAX_POINTS = 12;
const START = [
    { x: 0.2, y: 0.8 },
    { x: 0.62, y: -0.9 }
];

export default function PriorToPosterior() {
    const [points, setPoints] = useState(START);
    const [ell, setEll] = useState(0.15);
    const [seed, setSeed] = useState(7);

    const { mean, cov } = useMemo(
        () =>
            gpPosterior(
                GRID,
                points.map((p) => p.x),
                points.map((p) => p.y),
                ell,
                NOISE_VAR
            ),
        [points, ell]
    );

    const samples = useMemo(() => {
        const L = cholesky(cov.map((row, i) => row.map((v, j) => v + (i === j ? 1e-6 : 0))));
        return [0, 1, 2].map((k) => {
            const f = matVecLowerTri(L, seededRandn(seed * 31 + k, GRID.length));
            return { points: GRID.map((x, i) => ({ x, y: mean[i] + f[i] })), color: 'var(--text-soft)', strokeWidth: 1, dashed: true };
        });
    }, [mean, cov, seed]);

    const sd = cov.map((row, i) => Math.sqrt(Math.max(row[i], 0)));
    const band = [{ points: GRID.map((x, i) => ({ x, upper: mean[i] + 2 * sd[i], lower: mean[i] - 2 * sd[i] })) }];
    const meanLine = { points: GRID.map((x, i) => ({ x, y: mean[i] })), color: 'var(--ink)', strokeWidth: 2.5 };

    return (
        <WidgetFrame
            title="Click to add data"
            description="Click anywhere on the plot to add an observation. The thick line is the posterior mean, the band is ±2 standard deviations, and the dashed curves are random functions that are still plausible given what you've shown it."
        >
            <LabeledSlider label="length-scale ℓ" value={ell} onChange={setEll} min={0.04} max={0.5} />
            <FunctionPlot
                xDomain={[0, 1]}
                yDomain={[-3, 3]}
                xLabel="input x"
                yLabel="f(x)"
                series={[...samples, meanLine]}
                bands={band}
                dots={points}
                onPlotClick={(x, y) => setPoints((ps) => [...ps, { x, y }].slice(-MAX_POINTS))}
            />
            <div className="widget-actions">
                <span className="muted">
                    {points.length} {points.length === 1 ? 'point' : 'points'}
                </span>
                <button type="button" onClick={() => setSeed((s) => s + 1)}>
                    redraw samples
                </button>
                <button type="button" onClick={() => setPoints([])} disabled={points.length === 0}>
                    clear (back to the prior)
                </button>
            </div>
        </WidgetFrame>
    );
}
