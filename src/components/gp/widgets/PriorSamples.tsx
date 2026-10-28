import { useMemo, useState } from 'react';
import { FunctionPlot } from '../FunctionPlot';
import { LabeledSlider } from '../LabeledSlider';
import { WidgetFrame } from '../WidgetFrame';
import { cholesky, linspace, matVecLowerTri, seKernel, seededRandn } from '../linalg';

const GRID = linspace(-5, 5, 81);
// The random numbers stay fixed and only the covariance changes, so the same three curves morph as you drag.
const Z = [1, 2, 3].map((seed) => seededRandn(seed * 97 + 13, GRID.length));

export default function PriorSamples() {
    const [ell, setEll] = useState(1);
    const [sigmaF2, setSigmaF2] = useState(1);
    const sigmaF = Math.sqrt(sigmaF2);

    const series = useMemo(() => {
        const K = GRID.map((a, i) => GRID.map((b, j) => seKernel(a, b, ell, sigmaF) + (i === j ? 1e-6 : 0)));
        const L = cholesky(K);
        return Z.map((z, s) => {
            const f = matVecLowerTri(L, z);
            return { points: GRID.map((x, i) => ({ x, y: f[i] })), color: ['var(--ink)', 'var(--green)', 'var(--red)'][s] };
        });
    }, [ell, sigmaF]);

    const band = [{ points: GRID.map((x) => ({ x, upper: 2 * sigmaF, lower: -2 * sigmaF })) }];

    return (
        <WidgetFrame
            title="Reshape the prior"
            description="Three random functions drawn from the same Gaussian process. The shaded band is ±2 standard deviations: where the prior expects functions to live."
        >
            <div className="slider-row">
                <LabeledSlider label="length-scale ℓ" value={ell} onChange={setEll} min={0.1} max={3} />
                <LabeledSlider label="signal variance σf²" value={sigmaF2} onChange={setSigmaF2} min={0.1} max={4} />
            </div>
            <FunctionPlot xDomain={[-5, 5]} yDomain={[-5.5, 5.5]} xLabel="input x" yLabel="f(x)" series={series} bands={band} />
        </WidgetFrame>
    );
}
