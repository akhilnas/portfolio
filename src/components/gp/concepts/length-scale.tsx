import { useMemo } from "react"
import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"
import { WidgetFrame } from "../WidgetFrame"
import { FunctionPlot } from "../FunctionPlot"

export const meta = { slug: "length-scale", term: "length-scale" }

function LengthScaleCompareWidget() {
  const series = useMemo(() => {
    const make = (ell: number) => {
      const pts = []
      for (let x = -5; x <= 5; x += 0.05) {
        const d = x / ell
        pts.push({ x, y: Math.exp(-0.5 * d * d) })
      }
      return pts
    }
    return [
      { points: make(0.5), color: "var(--red)" },
      { points: make(2), color: "var(--ink)" },
    ]
  }, [])

  return (
    <WidgetFrame
      title="Short vs. long length-scale"
      description="Red: ℓ = 0.5 — correlation dies off quickly, so the function can wiggle a lot over a short distance. Accent: ℓ = 2 — correlation stays high much farther out, so the function changes only slowly."
    >
      <FunctionPlot
        xDomain={[-5, 5]}
        yDomain={[0, 1.1]}
        xLabel="distance, |x − x′|"
        yLabel="k(x, x′)"
        series={series}
      />
    </WidgetFrame>
  )
}

export default function LengthScaleContent() {
  return (
    <div className="stack">
      <p>
        Roughly: how far you have to move along the input axis before the
        function value can change appreciably. It's a{" "}
        <ConceptLink slug="hyperparameter" /> of a{" "}
        <ConceptLink slug="covariance-function" /> — most directly visible in
        the <ConceptLink slug="squared-exponential-kernel" />, where a small{" "}
        <InlineMath tex="\ell" /> means nearby points quickly become nearly
        uncorrelated (so sample functions look wiggly and wander fast) and a
        large <InlineMath tex="\ell" /> means correlation stays strong over
        long distances (so sample functions look slowly-varying and smooth).
      </p>
      <LengthScaleCompareWidget />
      <p>
        A GP can even use a different length-scale per input dimension, which
        lets it effectively ignore input dimensions whose length-scale grows
        very large — an idea sometimes called automatic relevance
        determination.
      </p>
    </div>
  )
}
