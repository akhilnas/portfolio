import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "ridge-regression", term: "ridge regression" }

export default function RidgeRegressionContent() {
  return (
    <div className="stack">
      <p>
        Ordinary linear regression with a penalty added for large weights —
        the classic example of <ConceptLink slug="regularization" />. Instead
        of just minimizing squared error on the{" "}
        <ConceptLink slug="training-set" />, you minimize
      </p>
      <BlockMath tex="\sum_i (y_i - x_i^\top w)^2 \;+\; \lambda\, w^\top w," />
      <p>
        where the second term grows with the size of <InlineMath tex="w" />{" "}
        and <InlineMath tex="\lambda" /> controls how strongly large weights
        are discouraged. This keeps the fit from swinging wildly to chase
        noise in the data.
      </p>
      <p>
        It's the non-Bayesian mirror image of the{" "}
        <ConceptLink slug="weight-space-view" />'s Bayesian linear model: the
        exact same penalized fit falls out of putting a zero-mean Gaussian{" "}
        <ConceptLink slug="prior-distribution" /> on <InlineMath tex="w" />{" "}
        and taking the <ConceptLink slug="map-estimate" /> of the resulting{" "}
        <ConceptLink slug="posterior-distribution" /> — same formula, arrived
        at either by bolting on a penalty term by hand or by doing proper
        Bayesian inference with a skeptical prior.
      </p>
    </div>
  )
}
