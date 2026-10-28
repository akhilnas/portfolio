import { BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "marginal-probability", term: "marginal probability" }

export default function MarginalProbabilityContent() {
  return (
    <div className="stack">
      <p>
        The plain probability of one <ConceptLink slug="random-variable" />,
        recovered from a <ConceptLink slug="joint-probability" /> by adding up
        (or, for continuous variables, integrating) over every possible value
        of the other variable — effectively asking "how likely is X, ignoring
        what Y did?"
      </p>
      <BlockMath tex="p(X = x) = \sum_{y} p(X = x, Y = y)" />
      <p>
        It's called "marginal" because, in an old-fashioned table of joint
        probabilities, these row/column totals were written in the margins.
        Marginal, joint, and{" "}
        <ConceptLink slug="conditional-probability" /> are the three ways of
        slicing up the same underlying distribution over two variables.
      </p>
    </div>
  )
}
