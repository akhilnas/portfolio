import { useMemo, useState } from "react"
import { ConceptLink } from "../tooltip"
import { WidgetFrame } from "../WidgetFrame"
import { LabeledSlider } from "../LabeledSlider"
import { FunctionPlot } from "../FunctionPlot"

export const meta = { slug: "overfitting", term: "overfitting" }

// Fixed, noisy samples from a smooth underlying function — deterministic
// so the widget doesn't reshuffle on every re-render.
const TRUE_FN = (x: number) => 1.1 + 0.8 * Math.sin(0.9 * x) + 0.08 * x
const NOISE = [0.32, -0.38, 0.22, -0.45, 0.4, -0.28, 0.35, -0.2, -0.4, 0.3]
const DATA_X = [0.6, 1.5, 2.4, 3.3, 4.2, 5.1, 6.0, 6.9, 7.8, 8.7]
const DATA = DATA_X.map((x, i) => ({ x, y: TRUE_FN(x) + NOISE[i] }))

function kernelFit(x: number, bandwidth: number) {
  let num = 0
  let den = 0
  for (const d of DATA) {
    const w = Math.exp(-((x - d.x) ** 2) / (2 * bandwidth * bandwidth))
    num += w * d.y
    den += w
  }
  return den > 1e-8 ? num / den : 0
}

function OverfittingWidget() {
  const [flexibility, setFlexibility] = useState(3)

  const { fitSeries, trueSeries, tickSeries, regime } = useMemo(() => {
    const bandwidth = Math.max(0.08, 2.6 / flexibility)
    const grid: number[] = []
    for (let x = 0; x <= 9.3; x += 0.1) grid.push(x)

    const fitPts = grid.map((x) => ({ x, y: kernelFit(x, bandwidth) }))
    const truePts = grid.map((x) => ({ x, y: TRUE_FN(x) }))

    const ticks = DATA.map((d) => ({
      points: [
        { x: d.x - 0.05, y: d.y },
        { x: d.x + 0.05, y: d.y },
      ],
      color: "var(--red)",
      strokeWidth: 5,
    }))

    let regime: string
    if (flexibility <= 3) regime = "underfitting — too rigid to follow the pattern"
    else if (flexibility <= 10) regime = "a reasonable fit to the underlying pattern"
    else regime = "overfitting — chasing individual data points' noise"

    return {
      fitSeries: { points: fitPts, color: "var(--ink)", strokeWidth: 2.5 },
      trueSeries: { points: truePts, color: "var(--text-soft)", dashed: true, strokeWidth: 1.5 },
      tickSeries: ticks,
      regime,
    }
  }, [flexibility])

  return (
    <WidgetFrame
      title="Fitting the same 10 points, more or less flexibly"
      description="Red ticks are noisy training observations; the dashed gray curve is the true (unknown, smooth) function they came from; the solid curve is what a model fits given the current flexibility."
    >
      <LabeledSlider
        label="model flexibility"
        value={flexibility}
        onChange={setFlexibility}
        min={1}
        max={25}
        step={1}
        format={(v) => v.toFixed(0)}
      />
      <FunctionPlot
        xDomain={[0, 9.3]}
        yDomain={[-0.5, 3]}
        xLabel="x"
        yLabel="y"
        series={[trueSeries, fitSeries, ...tickSeries]}
      />
      <p className="aside">
        Currently: <span className="accent">{regime}</span>
      </p>
    </WidgetFrame>
  )
}

export default function OverfittingContent() {
  return (
    <div className="stack">
      <p>
        A model that has become too flexible for the amount of data it was
        given, so it starts fitting the specific noise in the{" "}
        <ConceptLink slug="training-set" /> rather than the general pattern
        underneath. It looks great on the training data itself — often
        near-perfect — but makes poor predictions on new inputs, because it
        has effectively memorized quirks that won't repeat.
      </p>
      <p>
        The fix isn't simply "use a more flexible model" or "use a less
        flexible one" — it's finding the amount of flexibility that matches
        how much data (and noise) is actually there. Drag the slider below:
        too little flexibility misses the real curve entirely, too much
        wiggles through every data point.
      </p>
      <OverfittingWidget />
    </div>
  )
}
