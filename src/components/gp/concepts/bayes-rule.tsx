import { useMemo, useState } from "react"
import { BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"
import { WidgetFrame } from "../WidgetFrame"
import { LabeledSlider } from "../LabeledSlider"

export const meta = { slug: "bayes-rule", term: "Bayes' rule" }

function DiagnosticTestWidget() {
  const [prevalence, setPrevalence] = useState(0.01)
  const [accuracy, setAccuracy] = useState(0.95)

  const posterior = useMemo(() => {
    const truePositive = accuracy * prevalence
    const falsePositive = (1 - accuracy) * (1 - prevalence)
    return truePositive / (truePositive + falsePositive)
  }, [prevalence, accuracy])

  return (
    <WidgetFrame
      title="A positive test result"
      description="A rare disease affects some fraction of people; a test flags it correctly at some accuracy rate (and misfires at the same rate). Given a positive result, how likely is the disease, really?"
    >
      <LabeledSlider
        label="disease prevalence (the prior)"
        value={prevalence}
        onChange={setPrevalence}
        min={0.001}
        max={0.3}
        step={0.001}
        format={(v) => `${(v * 100).toFixed(1)}%`}
      />
      <LabeledSlider
        label="test accuracy"
        value={accuracy}
        onChange={setAccuracy}
        min={0.8}
        max={0.999}
        step={0.001}
        format={(v) => `${(v * 100).toFixed(1)}%`}
      />
      <p className="aside">
        P(disease | positive test) ={" "}
        <span className="accent">
          {(posterior * 100).toFixed(1)}%
        </span>
      </p>
    </WidgetFrame>
  )
}

export default function BayesRuleContent() {
  return (
    <div className="stack">
      <p>
        A rule for flipping a <ConceptLink slug="conditional-probability" />{" "}
        around: it turns "how likely is B, given A" into "how likely is A,
        given B."
      </p>
      <BlockMath tex="p(A\mid B) = \frac{p(B\mid A)\,p(A)}{p(B)}" />
      <p>
        In GP work, A is an unknown — parameters, or a whole function — and
        B is the data we observed. Renamed accordingly, this is exactly how a{" "}
        <ConceptLink slug="posterior-distribution" /> is built out of a{" "}
        <ConceptLink slug="prior-distribution" /> and a{" "}
        <ConceptLink slug="likelihood" />, with the{" "}
        <ConceptLink slug="marginal-likelihood" /> in the denominator just
        keeping everything normalized:
      </p>
      <BlockMath tex="\text{posterior} = \frac{\text{likelihood} \times \text{prior}}{\text{marginal likelihood}}" />
      <p>
        The classic illustration is a rare disease and an imperfect test.
        Even a fairly accurate test can leave a positive result meaning
        "probably still fine" if the disease is rare enough — the prior
        matters just as much as the test itself. Try it below.
      </p>
      <DiagnosticTestWidget />
    </div>
  )
}
