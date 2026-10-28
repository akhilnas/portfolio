import { BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "conditional-probability", term: "conditional probability" }

export default function ConditionalProbabilityContent() {
  return (
    <div className="stack">
      <p>
        The probability that a <ConceptLink slug="random-variable" /> takes
        some value, given that you already know the value of another one.
        Written p(A | B), read "the probability of A given B," and defined as
        the fraction of B's probability that also has A true:
      </p>
      <BlockMath tex="p(A\mid B) = \frac{p(A, B)}{p(B)}" />
      <p>
        Almost everything Bayesian in GP work is a conditional probability
        of some kind — a <ConceptLink slug="likelihood" /> is p(data |
        parameters), a <ConceptLink slug="posterior-distribution" /> is
        p(parameters | data).
      </p>
    </div>
  )
}
