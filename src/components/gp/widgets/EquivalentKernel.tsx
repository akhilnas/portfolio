import { useMemo, useState } from 'react';
import { FunctionPlot } from '../FunctionPlot';
import { LabeledSlider } from '../LabeledSlider';
import { WidgetFrame } from '../WidgetFrame';
import { mulberry32, seKernel, solveSPD } from '../linalg';

const ELL = Math.sqrt(0.004);
const X_STAR = 0.5;
const POOL_SIZE = 100;
const POOL = (() => {
    const rng = mulberry32(4242);
    return Array.from({ length: POOL_SIZE }, () => rng()).sort((a, b) => a - b);
})();

function subsample(n: number): number[] {
    if (n >= POOL_SIZE) return POOL;
    const idx = new Set<number>();
    for (let i = 0; i < n; i++) idx.add(Math.round((i * (POOL_SIZE - 1)) / (n - 1)));
    return [...idx].sort((a, b) => a - b).map((i) => POOL[i]);
}

export default function EquivalentKernel() {
    const [noiseVar, setNoiseVar] = useState(0.1);
    const [n, setN] = useState(50);

    const { weights, kernel } = useMemo(() => {
        const xs = subsample(n);
        // h(x*) = (K + σn²I)⁻¹ k(x*): the weight each training target gets in the prediction at x*.
        const K = xs.map((a, i) => xs.map((b, j) => seKernel(a, b, ELL) + (i === j ? noiseVar : 0)));
        const h = solveSPD(
            K,
            xs.map((x) => seKernel(x, X_STAR, ELL))
        );
        const peak = Math.max(...h, 0.001);
        const grid = Array.from({ length: 201 }, (_, i) => i / 200);
        return {
            weights: xs.map((x, i) => ({ x, y: h[i] })),
            kernel: grid.map((x) => ({ x, y: peak * seKernel(x, X_STAR, ELL) }))
        };
    }, [n, noiseVar]);

    const ys = [...weights, ...kernel].map((p) => p.y);
    const yMax = Math.max(0.05, ...ys) * 1.25;
    const yMin = Math.min(0, ...ys) * 1.25;

    return (
        <WidgetFrame
            title="Where does the prediction come from?"
            description="Solid: the weight each training point gets when predicting at x* = 0.5. Dashed: the kernel itself, scaled to the same height. More noise or fewer points makes the GP average more widely."
        >
            <div className="slider-row">
                <LabeledSlider label="noise variance σn²" value={noiseVar} onChange={setNoiseVar} min={0.01} max={5} />
                <LabeledSlider label="training points n" value={n} onChange={(v) => setN(Math.round(v))} min={10} max={POOL_SIZE} step={1} format={(v) => v.toFixed(0)} />
            </div>
            <FunctionPlot
                xDomain={[0, 1]}
                yDomain={[yMin, yMax]}
                xLabel="input x"
                yLabel="weight h(x*)"
                series={[
                    { points: kernel, dashed: true, color: 'var(--text-soft)' },
                    { points: weights, color: 'var(--ink)' }
                ]}
            />
        </WidgetFrame>
    );
}
