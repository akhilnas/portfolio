import { useMemo, useState } from "react"
import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"
import { WidgetFrame } from "../WidgetFrame"
import { LabeledSlider } from "../LabeledSlider"
import { FunctionPlot } from "../FunctionPlot"

export const meta = {
  slug: "squared-exponential-kernel",
  term: "squared exponential kernel",
}

function SEKernelShapeWidget() {
  const [ell, setEll] = useState(1)
  const points = useMemo(() => {
    const pts = []
    for (let x = -5; x <= 5; x += 0.05) {
      const d = x / ell
      pts.push({ x, y: Math.exp(-0.5 * d * d) })
    }
    return pts
  }, [ell])

  return (
    <WidgetFrame
      title="k(x, 0) as the length-scale changes"
      description="Drag ℓ to see how far apart two points need to be before the kernel — and so the correlation between f(x) and f(0) — drops off."
    >
      <LabeledSlider label="ℓ" value={ell} onChange={setEll} min={0.2} max={3} />
      <FunctionPlot
        xDomain={[-5, 5]}
        yDomain={[0, 1.1]}
        xLabel="x"
        yLabel="k(x, 0)"
        series={[{ points }]}
      />
    </WidgetFrame>
  )
}

export default function SquaredExponentialKernelContent() {
  return (
    <div className="stack">
      <p>
        The default, most widely used{" "}
        <ConceptLink slug="covariance-function" /> for a{" "}
        <ConceptLink slug="gaussian-process" />:
      </p>
      <BlockMath tex="k(x,x') = \sigma_f^2 \exp\left(-\frac{(x-x')^2}{2\ell^2}\right)" />
      <p>
        It says two function values are highly correlated when their inputs
        are close together, with the correlation dying off smoothly as the
        distance <InlineMath tex="|x-x'|" /> grows — never negative, maximal
        (equal to <InlineMath tex="\sigma_f^2" />) exactly when{" "}
        <InlineMath tex="x=x'" />. The{" "}
        <ConceptLink slug="length-scale" /> <InlineMath tex="\ell" /> sets how
        fast that decay happens, and the signal variance{" "}
        <InlineMath tex="\sigma_f^2" /> sets the overall vertical scale
        (amplitude) of typical function values. Both are{" "}
        <ConceptLink slug="hyperparameter">hyperparameters</ConceptLink> you
        choose or fit, not parameters the model learns as "weights."
      </p>
      <p>
        Because this kernel is infinitely smooth in <InlineMath tex="x" />,
        functions drawn from a GP with this covariance function are
        themselves infinitely differentiable — very smooth, gently wiggling
        curves, unlike the rougher paths you'd get from other kernel choices.
      </p>
      <SEKernelShapeWidget />
    </div>
  )
}
