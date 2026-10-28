import { BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "map-estimate", term: "MAP estimate" }

export default function MapEstimateContent() {
  return (
    <div className="stack">
      <p>
        Short for "maximum a posteriori." Instead of reporting the whole{" "}
        <ConceptLink slug="posterior-distribution" /> over an unknown
        quantity, the MAP estimate collapses it to a single number: whichever
        value the posterior considers most probable, i.e. its peak.
      </p>
      <BlockMath tex="w_{\text{MAP}} = \underset{w}{\arg\max}\ p(w \mid X, y)" />
      <p>
        It's the point estimate you'd get from minimizing{" "}
        <ConceptLink slug="expected-loss" /> under a loss that only cares
        whether you landed exactly right. For a Gaussian posterior the mode
        and the mean happen to coincide, so in that special case the MAP
        estimate is also the posterior average — but that's a coincidence of
        symmetry, not a general fact. It also has a non-Bayesian shadow:
        because the posterior is, up to a constant, likelihood times prior,
        maximizing it is the same as maximizing the likelihood with an extra
        term subtracted off — exactly what <ConceptLink slug="regularization" />{" "}
        does. That's why a penalized-likelihood fit and a MAP estimate so
        often turn out to be the identical formula, reached from two
        different starting philosophies.
      </p>
    </div>
  )
}
