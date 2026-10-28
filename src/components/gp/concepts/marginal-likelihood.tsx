import { BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "marginal-likelihood", term: "marginal likelihood" }

export default function MarginalLikelihoodContent() {
  return (
    <div className="stack">
      <p>
        The normalizing constant on the bottom of{" "}
        <ConceptLink slug="bayes-rule" />, p(y | X) — the number that makes
        the <ConceptLink slug="posterior-distribution" /> integrate to 1. It's
        computed by averaging the <ConceptLink slug="likelihood" /> over
        every possible parameter setting, weighted by how plausible the{" "}
        <ConceptLink slug="prior-distribution" /> already thought each
        setting was:
      </p>
      <BlockMath tex="p(y \mid X) = \int p(y \mid X, w)\, p(w)\, dw" />
      <p>
        It's called "marginal" because the parameters w have been integrated
        out (marginalized away) — what's left depends only on the data, not
        on any one parameter value. That makes it exactly the right quantity
        for comparing entire models or <ConceptLink slug="hyperparameter" />{" "}
        settings against each other, rather than comparing individual
        parameter values within a single fixed model.
      </p>
    </div>
  )
}
