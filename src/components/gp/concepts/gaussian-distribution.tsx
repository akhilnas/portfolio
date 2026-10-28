import { useMemo, useState } from "react"
import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"
import { WidgetFrame } from "../WidgetFrame"
import { LabeledSlider } from "../LabeledSlider"
import { FunctionPlot } from "../FunctionPlot"

export const meta = { slug: "gaussian-distribution", term: "Gaussian distribution" }

function GaussianShapeWidget() {
  const [mu, setMu] = useState(0)
  const [sigma, setSigma] = useState(1)
  const points = useMemo(() => {
    const pts = []
    for (let x = -6; x <= 6; x += 0.1) {
      const y =
        Math.exp(-((x - mu) * (x - mu)) / (2 * sigma * sigma)) /
        (sigma * Math.sqrt(2 * Math.PI))
      pts.push({ x, y })
    }
    return pts
  }, [mu, sigma])

  return (
    <WidgetFrame
      title="Mean and spread"
      description="Drag either slider to see how μ shifts the bell curve and σ reshapes it."
    >
      <LabeledSlider label="μ" value={mu} onChange={setMu} min={-4} max={4} />
      <LabeledSlider label="σ" value={sigma} onChange={setSigma} min={0.3} max={3} />
      <FunctionPlot
        xDomain={[-6, 6]}
        yDomain={[0, 1.4]}
        xLabel="x"
        yLabel="density"
        series={[{ points }]}
      />
    </WidgetFrame>
  )
}

export default function GaussianDistributionContent() {
  return (
    <div className="stack">
      <p>
        The classic bell-shaped <ConceptLink slug="probability-distribution" />,
        completely described by just two numbers: its mean{" "}
        <InlineMath tex="\mu" /> (where the bump is centered) and its{" "}
        <ConceptLink slug="variance" /> <InlineMath tex="\sigma^2" /> (how
        wide the bump is).
      </p>
      <BlockMath tex="p(x) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)" />
      <p>
        Most values fall close to <InlineMath tex="\mu" />, with the chance
        of a value dropping off quickly the farther it lands — governed by
        the <ConceptLink slug="standard-deviation" /> <InlineMath tex="\sigma" />.
        It shows up constantly because sums of many small, independent
        random effects tend toward this shape. When several Gaussian random
        variables are considered together, the natural extension is the{" "}
        <ConceptLink slug="multivariate-gaussian-distribution" />, which is
        what a <ConceptLink slug="gaussian-process" /> uses at every finite
        set of input points.
      </p>
      <GaussianShapeWidget />
    </div>
  )
}
