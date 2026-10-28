import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "linear-predictor", term: "linear predictor" }

export default function LinearPredictorContent() {
  return (
    <div className="stack">
      <p>
        The idea that an output is built as a weighted sum of inputs — each
        input <InlineMath tex="x_j" /> gets multiplied by its own weight{" "}
        <InlineMath tex="w_j" />, and the results are added up:
      </p>
      <BlockMath tex="f(\mathbf{x}) = \mathbf{x}^\top \mathbf{w} = \sum_j x_j w_j." />
      <p>
        Nothing here is squared, multiplied together, or passed through a
        curve — just scale and add. That "sum of weighted pieces" pattern is
        what "linear" means in this context, and it underlies both the{" "}
        <ConceptLink slug="weight-space-view" />'s{" "}
        <ConceptLink slug="regression" /> model and, once the inputs are
        replaced by <ConceptLink slug="basis-function">basis functions</ConceptLink>,{" "}
        <ConceptLink slug="polynomial-regression" /> and{" "}
        <ConceptLink slug="ridge-regression" /> too — all of them are linear
        predictors in their <em>parameters</em>, even when the resulting
        function of <InlineMath tex="x" /> curves.
      </p>
    </div>
  )
}
