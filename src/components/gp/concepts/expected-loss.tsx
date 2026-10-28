import { useMemo, useState } from "react"
import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"
import { WidgetFrame } from "../WidgetFrame"
import { LabeledSlider } from "../LabeledSlider"

export const meta = { slug: "expected-loss", term: "expected loss (risk)" }

const DATA = [1, 2, 2, 3, 3, 3, 4, 4, 5, 15]

function LossMinimizerWidget() {
  const mean = useMemo(() => DATA.reduce((a, b) => a + b, 0) / DATA.length, [])
  const median = useMemo(() => {
    const sorted = [...DATA].sort((a, b) => a - b)
    return (sorted[4] + sorted[5]) / 2
  }, [])
  const [guess, setGuess] = useState(4)

  const squaredLoss = useMemo(
    () => DATA.reduce((sum, v) => sum + (v - guess) ** 2, 0) / DATA.length,
    [guess]
  )
  const absLoss = useMemo(
    () => DATA.reduce((sum, v) => sum + Math.abs(v - guess), 0) / DATA.length,
    [guess]
  )

  return (
    <WidgetFrame
      title="Which guess minimizes the risk?"
      description="Ten outcomes our model thinks are plausible, one of them an outlier near 15. Drag your guess and watch the two average losses move."
    >
      <LabeledSlider
        label="your guess"
        value={guess}
        onChange={setGuess}
        min={0}
        max={10}
        step={0.1}
      />
      <p className="aside">
        expected squared loss:{" "}
        <span className="accent">{squaredLoss.toFixed(2)}</span>
        {" · "}expected absolute loss:{" "}
        <span className="accent">{absLoss.toFixed(2)}</span>
      </p>
      <p className="aside muted">
        Squared loss bottoms out at the mean ({mean.toFixed(1)}) — the outlier
        drags it up. Absolute loss bottoms out at the median ({median.toFixed(1)}
        ), which only cares that the outlier is on the high side, not how far.
      </p>
    </WidgetFrame>
  )
}

export default function ExpectedLossContent() {
  return (
    <div className="stack">
      <p>
        You don't know the true outcome <InlineMath tex="y_*" /> before you
        commit to a guess — only your model's{" "}
        <ConceptLink slug="probability-distribution" /> over what it might
        be. So instead of minimizing the <ConceptLink slug="loss-function" />{" "}
        directly (impossible, since you don't know the truth), you minimize
        its average over every outcome you find plausible, weighted by how
        plausible each one is. That average is the expected loss, or risk:
      </p>
      <BlockMath tex="\tilde R_L(y_{\text{guess}}) = \int L(y_*, y_{\text{guess}})\, p(y_* \mid x_*, D)\, dy_*" />
      <p>
        Which single number minimizes this depends entirely on which loss you
        picked: minimizing squared loss lands you on the mean of the
        predictive distribution, while minimizing absolute loss lands you on
        its median. If the loss function only asks "did I get it exactly
        right, yes or no," the minimizer is the mode instead — the{" "}
        <ConceptLink slug="map-estimate" /> is exactly this idea, applied to a
        posterior over parameters rather than a prediction about one number.
      </p>
      <LossMinimizerWidget />
    </div>
  )
}
